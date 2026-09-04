import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { timingSafeEqual } from 'node:crypto';

type JsonObject = Record<string, unknown>;
type JsonRpcRequest = { jsonrpc?: string; id?: string | number | null; method?: string; params?: JsonObject };

const HOST = process.env.PARE_MCP_BIND_HOST?.trim() || '0.0.0.0';
const PORT = Number(process.env.PARE_MCP_PORT || 7457);
const DAEMON_URL = (process.env.PARE_DAEMON_INTERNAL_URL || 'http://pare-daemon:7456').replace(/\/+$/u, '');
const MCP_TOKEN = process.env.PARE_MCP_TOKEN || process.env.PARE_API_TOKEN || process.env.OD_API_TOKEN || '';
const DAEMON_TOKEN = process.env.PARE_API_TOKEN || process.env.OD_API_TOKEN || '';
const MAX_BODY_BYTES = 1024 * 1024;

const tools = [
  {
    name: 'pare_health',
    description: 'Check whether the sovereign PARÉ daemon is reachable. This tool does not expose credentials or host internals.',
    inputSchema: { type: 'object', additionalProperties: false, properties: {} },
  },
  {
    name: 'pare_list_projects',
    description: 'List PARÉ projects visible to this authenticated PARÉ runtime.',
    inputSchema: { type: 'object', additionalProperties: false, properties: {} },
  },
  {
    name: 'pare_get_project',
    description: 'Read one PARÉ project by id. Use the exact project id returned by pare_list_projects.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      required: ['projectId'],
      properties: { projectId: { type: 'string', minLength: 1, maxLength: 200 } },
    },
  },
] as const;

function json(res: ServerResponse, status: number, body: unknown) {
  const payload = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Length', Buffer.byteLength(payload));
  res.end(payload);
}

function tokenMatches(candidate: string | undefined): boolean {
  if (!MCP_TOKEN || !candidate) return false;
  const expected = Buffer.from(MCP_TOKEN);
  const actual = Buffer.from(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function bearer(req: IncomingMessage): string | undefined {
  const raw = req.headers.authorization;
  if (!raw?.startsWith('Bearer ')) return undefined;
  return raw.slice(7).trim();
}

async function readJsonBody(req: IncomingMessage): Promise<JsonRpcRequest> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BODY_BYTES) throw new Error('request body too large');
    chunks.push(buffer);
  }
  const text = Buffer.concat(chunks).toString('utf8');
  if (!text) throw new Error('empty request body');
  return JSON.parse(text) as JsonRpcRequest;
}

function safeProjectId(value: unknown): string {
  if (typeof value !== 'string') throw new Error('projectId is required');
  const trimmed = value.trim();
  if (!/^[A-Za-z0-9._:-]{1,200}$/u.test(trimmed)) throw new Error('invalid projectId');
  return trimmed;
}

async function daemonRequest(pathname: string): Promise<unknown> {
  const response = await fetch(`${DAEMON_URL}${pathname}`, {
    headers: {
      Accept: 'application/json',
      ...(DAEMON_TOKEN ? { Authorization: `Bearer ${DAEMON_TOKEN}` } : {}),
    },
  });
  const text = await response.text();
  let body: unknown = text;
  if (text) {
    try { body = JSON.parse(text); } catch { body = { message: text }; }
  }
  if (!response.ok) throw new Error(`PARÉ daemon returned HTTP ${response.status}`);
  return body;
}

async function callTool(name: string, args: JsonObject): Promise<unknown> {
  if (name === 'pare_health') return daemonRequest('/api/health');
  if (name === 'pare_list_projects') return daemonRequest('/api/projects');
  if (name === 'pare_get_project') return daemonRequest(`/api/projects/${encodeURIComponent(safeProjectId(args.projectId))}`);
  throw new Error(`unknown tool: ${name}`);
}

async function handleRpc(request: JsonRpcRequest): Promise<JsonObject | undefined> {
  const id = request.id ?? null;
  if (request.method === 'notifications/initialized') return undefined;
  if (request.method === 'initialize') {
    return {
      jsonrpc: '2.0', id,
      result: {
        protocolVersion: '2025-03-26',
        capabilities: { tools: {} },
        serverInfo: { name: 'pare-sovereign-mcp', version: '0.1.0' },
      },
    };
  }
  if (request.method === 'tools/list') return { jsonrpc: '2.0', id, result: { tools } };
  if (request.method === 'tools/call') {
    const params = request.params ?? {};
    const name = typeof params.name === 'string' ? params.name : '';
    const args = params.arguments && typeof params.arguments === 'object' && !Array.isArray(params.arguments)
      ? params.arguments as JsonObject
      : {};
    try {
      const result = await callTool(name, args);
      return { jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(result) }] } };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'PARÉ tool failed';
      return { jsonrpc: '2.0', id, result: { isError: true, content: [{ type: 'text', text: message }] } };
    }
  }
  return { jsonrpc: '2.0', id, error: { code: -32601, message: `method not found: ${String(request.method)}` } };
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', 'http://pare.local');
    if (req.method === 'GET' && url.pathname === '/health') {
      return json(res, 200, { ok: true, service: 'pare-mcp' });
    }
    if (url.pathname !== '/mcp') return json(res, 404, { error: 'not found' });
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Allow', 'POST, OPTIONS');
      return res.end();
    }
    if (req.method !== 'POST') return json(res, 405, { error: 'method not allowed' });
    if (!tokenMatches(bearer(req))) {
      res.setHeader('WWW-Authenticate', 'Bearer realm="PARÉ MCP"');
      return json(res, 401, { error: 'authentication required' });
    }
    const request = await readJsonBody(req);
    const response = await handleRpc(request);
    if (response === undefined) {
      res.statusCode = 202;
      return res.end();
    }
    return json(res, 200, response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'request failed';
    return json(res, 400, { jsonrpc: '2.0', id: null, error: { code: -32600, message } });
  }
});

server.listen(PORT, HOST, () => {
  // Never log tokens or provider credentials.
  console.log(`[pare-mcp] listening on ${HOST}:${PORT}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
