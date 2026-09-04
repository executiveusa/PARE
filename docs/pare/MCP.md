# PARÉ Model Context Protocol (MCP)

## Architecture

PARÉ supports two MCP paths with different maturity and trust boundaries:

```text
Claude Code / local agent
        |
     stdio MCP
        |
       od mcp
        |
  PARÉ daemon :7456

ChatGPT developer/private agent
        |
 HTTPS + Bearer
        |
  pare-mcp :7457
        |
 authenticated daemon API
        |
  PARÉ daemon :7456
```

## 1. Existing stdio MCP

Implementation: `apps/daemon/src/mcp-live-artifacts-server.ts`.

Launch shape:

```bash
od mcp --daemon-url http://127.0.0.1:7456
```

Current bounded tool set:
- `live_artifacts_create`
- `live_artifacts_list`
- `live_artifacts_update`
- `live_artifacts_refresh`
- `connectors_list`
- `connectors_execute`

The stdio server calls daemon tool endpoints using a run/tool authorization grant (`OD_TOOL_TOKEN`). It is intended for local coding agents and controlled operator environments.

## 2. Remote PARÉ MCP gateway

Implementation: `apps/daemon/src/pare-mcp-http-server.ts`.

Compose service: `pare-mcp`, internal port `7457`, host published only to `127.0.0.1:7457`.

Initial tools:
- `pare_health`
- `pare_list_projects`
- `pare_get_project`

This first remote gateway is intentionally read-heavy. It authenticates requests with `PARE_MCP_TOKEN` (falling back to the daemon API token only when explicitly configured that way) and calls the daemon over the private Compose network.

Recommended public route after Caddy wiring:

```text
POST https://api.thepaulieffect.com/pare/mcp
```

Recommended gateway health route:

```text
GET https://api.thepaulieffect.com/pare/mcp/health
```

These URLs are **deployment targets, not verified production claims**, until the VPS Loop gates are green.

## Security

### Private/developer mode
- keep 7456 and 7457 loopback-only on the host;
- terminate TLS at Caddy;
- use a separate high-entropy `PARE_MCP_TOKEN` where possible;
- never place MCP/API/provider/Infisical tokens in browser `NEXT_PUBLIC_*` variables;
- do not log reusable bearer tokens;
- preserve daemon project authorization and path validation.

### Public marketplace mode
A single static bearer token is not sufficient for a public multi-user marketplace app. Before ChatGPT/OpenAI public distribution, add user/workspace identity, least-privilege project grants, the current approved OAuth/auth flow, audit/rate limits, and negative authorization tests.

## Claude Code

The repository marketplace/plugin remains stdio-first for compatibility. The package id can remain `open-design` where changing it would break existing installations, while the display/product brand is PARÉ.

## Personal Hermes / Cosmos

Use API/MCP/CLI instead of browser automation whenever a semantic interface exists. Personal Hermes must run the repository/project ICM walk test before consequential actions and must not inherit MACS Digital Media / Agent Max authority.

## Verification gate

Do not say MCP is production-ready until all of the following have evidence from one exact release revision:
1. `pare-daemon` healthy;
2. `pare-mcp` healthy;
3. unauthorized remote MCP call returns 401;
4. initialize succeeds with valid auth;
5. `tools/list` returns the expected tool set;
6. `pare_list_projects` succeeds against a disposable/authorized context;
7. Caddy public route works over TLS;
8. no secret appears in response/logs;
9. Claude Code clean-install stdio test succeeds;
10. ChatGPT Developer Mode remote MCP test succeeds before any directory submission claim.
