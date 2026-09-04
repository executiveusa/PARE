import { createPareMcpHttpServer, pareMcpConfigFromEnv } from './pare-mcp-http-server.js';

const host = process.env.PARE_MCP_BIND_HOST?.trim() || '0.0.0.0';
const port = Number(process.env.PARE_MCP_PORT || 7457);
const config = pareMcpConfigFromEnv();
const server = createPareMcpHttpServer(config);

server.listen(port, host, () => {
  // Never log tokens, provider credentials, project data, or Infisical values.
  console.log(`[pare-mcp] listening on ${host}:${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
