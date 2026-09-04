# PARÉ — Claude Code Plugin / Marketplace Readiness

Status: **plugin metadata prepared; runtime verification still required; not claimed published**.

## Product position
Claude Code is one worker interface into PARÉ. PARÉ remains the project/runtime authority.

> Bring Claude Code into the project. Do not move the project into Claude Code.

## Existing implementation
PARÉ already ships:
- a Claude Code marketplace manifest at `.claude-plugin/marketplace.json`;
- compatibility plugin package `plugins/open-design/`;
- stdio MCP config in `plugins/open-design/.mcp.json`;
- `od mcp` CLI support;
- `od mcp install <agent>` installation planning in the daemon CLI;
- a stdio MCP server exposing bounded live-artifact and connector tools.

The compatibility package id remains `open-design` to avoid breaking existing install/CLI contracts. The user-facing marketplace brand is **PARÉ**.

## Local Claude Code contract
The bundled plugin currently launches:

```json
{
  "type": "stdio",
  "command": "od",
  "args": ["mcp", "--daemon-url", "http://127.0.0.1:7456"]
}
```

That is appropriate for a machine where PARÉ/`od` is installed and the daemon is reachable locally. It is not evidence that a remote marketplace user can call the owner VPS without an authenticated remote access contract.

## Remote-owner mode
For the owner/team use case, the same stdio MCP process can target a remote daemon via `OD_DAEMON_URL`/`--daemon-url`, but tool authorization must be supplied securely. Do not bake `PARE_API_TOKEN`, `OD_TOOL_TOKEN`, provider keys, or Infisical credentials into the plugin manifest.

## Marketplace proof gate
Before public marketplace promotion:
1. install the repository marketplace in a clean Claude Code environment;
2. install the PARÉ plugin;
3. verify MCP server starts without manual path edits;
4. verify `tools/list` returns the advertised bounded tools;
5. run a real artifact list/create test against a disposable project;
6. verify missing daemon/auth gives a useful error;
7. verify no credential appears in logs/output;
8. document uninstall/rollback;
9. capture clean screenshots/short demo;
10. owner approves public listing/promotion.

## Future richer plugin
Once the public PARÉ API/MCP gateway is proven, add PARÉ-first skills/commands around:
- project intake and walk test;
- Loop Engineering bounded slices;
- artifact review;
- independent verification;
- handoff back to Studio.

The plugin should route into canonical PARÉ/ICM contracts rather than duplicate them.
