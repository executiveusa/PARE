# PARÉ Model Context Protocol (MCP) Specification

## Architecture

PARÉ exposes its design runtime, project memory, and skills through the Model Context Protocol (MCP).

```text
[Cosmos / Claude Desktop / Cursor / ChatGPT]
                    |
              MCP Protocol
                    |
      +-------------+-------------+
      |                           |
   Local Stdio               Remote HTTP/SSE
  (CLI transport)         (pare-api.thepaulieffect.com)
      |                           |
      +-------------+-------------+
                    v
            PARÉ MCP Server
                    |
      +-------------+-------------+
      |             |             |
  Projects        Skills      Artifacts
  (ICM Tree)    (One Hands)  (Live Canvas)
```

## Security & Scoping
- **Authentication**: All remote MCP requests require Bearer token authorization matching `PARE_API_TOKEN`.
- **Project Isolation**: MCP tools are scoped strictly to the target project directory. Arbitrary system commands or path traversal outside `OD_DATA_DIR` are rejected.
- **Audit Logging**: Every tool invocation logs `runId`, `toolName`, `projectId`, and caller attribution.

## Transport Modes

### 1. Stdio Transport
Used by local agent harnesses, IDE extensions, and CLI operators:
```bash
od mcp --daemon-url http://127.0.0.1:7456
```

### 2. Remote SSE Transport
Used by cloud orchestrators (Cosmos, external agent runners):
```text
GET https://pare-api.thepaulieffect.com/api/mcp/sse
POST https://pare-api.thepaulieffect.com/api/mcp/message
```
