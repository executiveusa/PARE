import { afterEach, describe, expect, it } from 'vitest';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import {
  createPareMcpHttpServer,
  handlePareMcpRpc,
  PARE_MCP_TOOLS,
  safeProjectId,
  type PareMcpConfig,
} from '../src/pare-mcp-http-server.js';

const servers: Server[] = [];
afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => new Promise<void>((resolve) => server.close(() => resolve()))));
});

function config(fetchImpl?: typeof fetch): PareMcpConfig {
  return {
    daemonUrl: 'http://pare-daemon.test:7456',
    mcpToken: 'mcp-secret',
    daemonToken: 'daemon-secret',
    fetchImpl,
  };
}

async function listen(server: Server): Promise<string> {
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address() as AddressInfo;
  return `http://127.0.0.1:${address.port}`;
}

describe('PARÉ remote MCP gateway', () => {
  it('returns the PARÉ tool catalog', async () => {
    const response = await handlePareMcpRpc(config(), { jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} });
    expect(response?.result).toEqual({ tools: PARE_MCP_TOOLS });
    expect(PARE_MCP_TOOLS.map((tool) => tool.name)).toEqual([
      'pare_health',
      'pare_list_projects',
      'pare_get_project',
    ]);
  });

  it('rejects unsafe project ids before daemon access', () => {
    expect(() => safeProjectId('../etc/passwd')).toThrow('invalid projectId');
    expect(() => safeProjectId('project/child')).toThrow('invalid projectId');
    expect(safeProjectId('project_01')).toBe('project_01');
  });

  it('keeps health public but requires bearer auth for MCP', async () => {
    const base = await listen(createPareMcpHttpServer(config()));
    const health = await fetch(`${base}/mcp/health`);
    expect(health.status).toBe(200);
    expect(await health.json()).toEqual({ ok: true, service: 'pare-mcp' });

    const unauthorized = await fetch(`${base}/mcp`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }),
    });
    expect(unauthorized.status).toBe(401);
    expect(unauthorized.headers.get('www-authenticate')).toContain('Bearer');
  });

  it('initializes over authenticated HTTP without touching the daemon', async () => {
    const base = await listen(createPareMcpHttpServer(config()));
    const response = await fetch(`${base}/mcp`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer mcp-secret',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 7, method: 'initialize', params: {} }),
    });
    expect(response.status).toBe(200);
    const body = await response.json() as any;
    expect(body.result.serverInfo.name).toBe('pare-sovereign-mcp');
    expect(body.result.capabilities).toEqual({ tools: {} });
  });

  it('forwards project reads with the daemon token', async () => {
    const calls: Array<{ url: string; auth: string | null }> = [];
    const fetchImpl = (async (input: string | URL | Request, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      calls.push({ url: String(input), auth: headers.get('authorization') });
      return new Response(JSON.stringify([{ id: 'project_01' }]), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }) as typeof fetch;

    const response = await handlePareMcpRpc(config(fetchImpl), {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: { name: 'pare_list_projects', arguments: {} },
    });

    expect(calls).toEqual([
      { url: 'http://pare-daemon.test:7456/api/projects', auth: 'Bearer daemon-secret' },
    ]);
    expect((response?.result as any).isError).not.toBe(true);
  });

  it('returns daemon failures as MCP tool errors without leaking tokens', async () => {
    const fetchImpl = (async () => new Response(JSON.stringify({ error: 'denied' }), { status: 403 })) as typeof fetch;
    const response = await handlePareMcpRpc(config(fetchImpl), {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: { name: 'pare_list_projects', arguments: {} },
    });
    const result = response?.result as any;
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('HTTP 403');
    expect(JSON.stringify(response)).not.toContain('mcp-secret');
    expect(JSON.stringify(response)).not.toContain('daemon-secret');
  });
});
