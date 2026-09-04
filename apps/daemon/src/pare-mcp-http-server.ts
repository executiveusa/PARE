import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { timingSafeEqual } from 'node:crypto';

type JsonObject = Record<string, unknown>;
export type PareMcpJsonRpcRequest = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: JsonObject;
};

export type PareMcpConfig = {
  daemonUrl: string;
  mcpToken: string;
  daemonToken: string;
  fetchImpl?: typeof fetch;
};

export const PARE_MCP_TOOLS = [
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

const MAX_BODY_BYTES = 1024 * 1024;

function json(res: ServerResponse, status: number, body: unknown) {
  const payload = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Length', Buffer.byteLength(payload));
  res.end(payload);
}

export function tokenMatches(expectedToken: string, candidate: string | undefined): boolean {
  if (!expectedToken || !candidate) return false;
  const expected = Buffer.from(expectedToken);
  const actual = Buffer.from(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function bearer(req: IncomingMessage): string | undefined {
  const raw = req.headers.authorization;
  if (!raw?.startsWith('Bearer ')) return undefined;
  return raw.slice(7).trim();
}

async function readJsonBody(req: IncomingMessage): Promise<PareMcpJsonRpcRequest> {
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
  return JSON.parse(text) as PareMcpJsonRpcRequest;
}

export function safeProjectId(value: unknown): string {
  if (typeof value !== 'string') throw new Error('projectId is required');
  const trimmed = value.trim();
  if (!/^[A-Za-z0-9._:-]{1,200}$/u.test(trimmed)) throw new Error('invalid projectId');
  return trimmed;
}

function normalizeDaemonUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/u, '');
  if (!/^https?:\/\//iu.test(trimmed)) throw new Error('PARE_DAEMON_INTERNAL_URL must be http(s)');
  return trimmed;
}

export function pareMcpConfigFromEnv(env: NodeJS.ProcessEnv = process.env): PareMcpConfig {
  return {
    daemonUrl: normalizeDaemonUrl(env.PARE_DAEMON_INTERNAL_URL || 'http://pare-daemon:7456'),
    mcpToken: env.PARE_MCP_TOKEN || env.PARE_API_TOKEN || env.OD_API_TOKEN || '',
    daemonToken: env.PARE_API_TOKEN || env.OD_API_TOKEN || '',
  };
}

async function daemonRequest(config: PareMcpConfig, pathname: string): Promise<unknown> {
  const fetchImpl = config.fetchImpl ?? fetch;
  const response = await fetchImpl(`${normalizeDaemonUrl(config.daemonUrl)}${pathname}`, {
    headers: {
      Accept: 'application/json',
      ...(config.daemonToken ? { Authorization: `Bearer ${config.daemonToken}` } : {}),
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

async function callTool(config: PareMcpConfig, name: string, args: JsonObject): Promise<unknown> {
  if (name === 'pare_health') return daemonRequest(config, '/api/health');
  if (name === 'pare_list_projects') return daemonRequest(config, '/api/projects');
  if (name === 'pare_get_project') {
    return daemonRequest(config, `/api/projects/${encodeURIComponent(safeProjectId(args.projectId))}`);
  }
  throw new Error(`unknown tool: ${name}`);
}

export async function handlePareMcpRpc(
  config: PareMcpConfig,
  request: PareMcpJsonRpcRequest,
): Promise<JsonObject | undefined> {
  const id = request.id ?? null;
  if (request.method === 'notifications/initialized') return undefined;
  if (request.method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2025-03-26',
        capabilities: { tools: {} },
        serverInfo: { name: 'pare-sovereign-mcp', version: '0.1.0' },
      },
    };
  }
  if (request.method === 'tools/list') {
    return { jsonrpc: '2.0', id, result: { tools: PARE_MCP_TOOLS } };
  }
  if (request.method === 'tools/call') {
    const params = request.params ?? {};
    const name = typeof params.name === 'string' ? params.name : '';
    const args = params.arguments && typeof params.arguments === 'object' && !Array.isArray(params.arguments)
      ? params.arguments as JsonObject
      : {};
    try {
      const result = await callTool(config, name, args);
      return {
        jsonrpc: '2.0',
        id,
        result: { content: [{ type: 'text', text: JSON.stringify(result) }] },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'PARÉ tool failed';
      return {
        jsonrpc: '2.0',
        id,
        result: { isError: true, content: [{ type: 'text', text: message }] },
      };
    }
  }
  return {
    jsonrpc: '2.0',
    id,
    error: { code: -32601, message: `method not found: ${String(request.method)}` },
  };
}

export function createPareMcpHttpServer(config: PareMcpConfig): Server {
  if (!config.mcpToken) throw new Error('PARE_MCP_TOKEN (or API token fallback) is required');
  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', 'http://pare.local');
      if (req.method === 'GET' && (url.pathname === '/health' || url.pathname === '/mcp/health')) {
        return json(res, 200, { ok: true, service: 'pare-mcp' });
      }
      if (url.pathname !== '/mcp') return json(res, 404, { error: 'not found' });
      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.setHeader('Allow', 'POST, OPTIONS');
        return res.end();
      }
      if (req.method !== 'POST') return json(res, 405, { error: 'method not allowed' });
      if (!tokenMatches(config.mcpToken, bearer(req))) {
        res.setHeader('WWW-Authenticate', 'Bearer realm="PARÉ MCP"');
        return json(res, 401, { error: 'authentication required' });
      }
      const request = await readJsonBody(req);
      const response = await handlePareMcpRpc(config, request);
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
}
