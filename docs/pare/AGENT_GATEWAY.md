# PARÉ Agent Gateway

## Purpose
PARÉ must be usable without a human driving the browser. The Studio is the human surface; API, MCP and CLI are the machine surfaces over the same owner-controlled project state.

## Runtime map

```text
Human / Browser
    ↓
PARÉ Studio (Netlify)
    ↓ same-origin API rewrites
Caddy / TLS
    ↓
PARÉ daemon :7456  ←→  /data/pare
    ↑
    ├── REST / SSE API
    ├── od CLI
    └── stdio MCP

External agent / ChatGPT developer integration
    ↓ HTTPS + Bearer (developer/private mode)
Caddy /pare/mcp
    ↓
PARÉ remote MCP :7457
    ↓ authenticated internal API
PARÉ daemon :7456
```

## Services

### `pare-daemon`
- canonical runtime authority;
- internal port 7456;
- host publication `127.0.0.1:7456` only;
- persistent data `/data/pare:/app/.od`;
- provider/agent execution, projects, artifacts, SSE, CLI compatibility;
- protected by `PARE_API_TOKEN` / `OD_API_TOKEN` for non-loopback API access.

### `pare-mcp`
- small remote MCP gateway;
- internal port 7457;
- host publication `127.0.0.1:7457` only;
- uses a separate `PARE_MCP_TOKEN` where possible;
- talks to `pare-daemon` over the Compose network using the daemon bearer token;
- first tool set is intentionally read-heavy: health, project list, project read.

This remote gateway is a developer/private integration surface. A public multi-user marketplace app still requires user/workspace identity and stronger authorization (OAuth or the current marketplace-approved equivalent).

## Caddy target
Recommended route shape:

```caddyfile
api.thepaulieffect.com {
    handle /pare/mcp* {
        uri strip_prefix /pare
        reverse_proxy 127.0.0.1:7457
    }

    handle_path /pare/* {
        reverse_proxy 127.0.0.1:7456 {
            flush_interval -1
        }
    }
}
```

The MCP route deliberately strips only `/pare`, so:
- `/pare/mcp` reaches the gateway as `/mcp`;
- `/pare/mcp/health` reaches the gateway as `/mcp/health`.

Treat this as intent, not a blind replacement. The VPS operator must merge it into the existing Caddyfile, preserve unrelated routes, validate with `caddy validate`, and verify exact path behavior.

## Private remote MCP smoke test

Health:

```bash
curl -i https://api.thepaulieffect.com/pare/mcp/health
```

Initialize:

```bash
curl -sS https://api.thepaulieffect.com/pare/mcp \
  -H "Authorization: Bearer $PARE_MCP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}'
```

Tool list:

```bash
curl -sS https://api.thepaulieffect.com/pare/mcp \
  -H "Authorization: Bearer $PARE_MCP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'
```

Project list:

```bash
curl -sS https://api.thepaulieffect.com/pare/mcp \
  -H "Authorization: Bearer $PARE_MCP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"pare_list_projects","arguments":{}}}'
```

Never paste the real token into source, docs, screenshots, client JS, or issue/PR comments.

## Claude Code
The existing compatibility plugin remains stdio-first and runs `od mcp`. For an owner machine it may target either a local daemon or the sovereign remote daemon when secure tool authorization is present. The plugin manifest must never contain reusable secrets.

## Cosmos / personal Hermes
Personal Hermes should consume PARÉ semantically through API/MCP/CLI, not automate the React UI. Before acting in a project it runs the repository/project ICM walk test and records the exact proof/rollback/human gate.

## MACS Digital Media / Agent Max
Agent Max is a separate business/client agent identity. It may be granted access to specific PARÉ projects through the same semantic gateway, but it does not inherit personal-Hermes memory, credentials or owner-wide authority.

## Public marketplace hardening backlog
1. user/workspace identity for remote MCP;
2. least-privilege per-project grants;
3. OAuth/current approved marketplace auth flow;
4. public tool naming and schemas;
5. audit receipts and rate limits;
6. privacy/terms/support and deletion/export flows;
7. marketplace negative tests;
8. production exact-SHA verification.
