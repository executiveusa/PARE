# Build Notes — PARÉ runtime hardening

## Slice 1A — container launch contract

### Observation
The release branch's `deploy/Dockerfile` packaged the daemon correctly but its runtime command was:

```text
node apps/daemon/dist/cli.js --no-open
```

Prior VPS investigation established that the persistent HTTP runtime is launched through:

```text
node apps/daemon/dist/cli.js daemon start --no-open
```

### Change
Commit `cf428b5c2a3fe06a5b584032970691a4d4626e44` changes only the Docker runtime command to include `daemon start`.

### Verification still required
Fresh VPS evidence must show exact-head parity, one daemon authority, stable host resources, loopback publication of 7456 and local `/api/health` HTTP 200.

---

## Slice 1B — always-on private agent gateway

### Intent
Give owner/team agents a semantic machine path into the same PARÉ project state without automating the React UI or exposing the daemon directly.

### Changes
- added testable remote HTTP MCP gateway module `apps/daemon/src/pare-mcp-http-server.ts`;
- added executable `pare-mcp-http-main.ts`;
- initial private tools: `pare_health`, `pare_list_projects`, `pare_get_project`;
- bearer auth uses `PARE_MCP_TOKEN` with daemon auth kept separately;
- added path/id validation, body limit, token-safe error behavior;
- added focused Vitest coverage for catalog, auth, initialization, daemon-token forwarding, path traversal rejection and daemon error handling;
- Compose now runs `pare-daemon` and `pare-mcp` as separate loopback-published services on host ports 7456/7457;
- `pare-mcp` depends on a healthy daemon and talks to it over the private Compose network;
- environment template documents MCP/API/Infisical/provider names without values;
- Agent Gateway/MCP docs define Caddy path behavior and private vs public-marketplace trust boundaries.

### Security boundary
This gateway is intentionally **private/developer mode**. A reusable static bearer token is not the final public multi-user ChatGPT marketplace authorization design. Public distribution still needs user/workspace identity, least privilege and the current approved marketplace auth flow.

### Verification still required
- daemon + MCP TypeScript/build tests on exact head;
- Docker image build;
- VPS `127.0.0.1:7456` + `:7457` health;
- MCP unauthenticated 401 and authenticated initialize/tools/list;
- Caddy path stripping/TLS;
- ChatGPT Developer Mode connection before any directory claim.

---

## Slice 1C — launch surface/productization

### Changes
- rebuilt the PARÉ landing into the locked luxury/subtraction story;
- restored `One Studio. Infinite possibilities.`;
- ownership now includes projects, files, **agents**, infrastructure;
- added Studio/API/MCP/CLI machine-interface story;
- added PARÉ Journal with three evidence-first essays and an agent editorial contract;
- added RSS feed;
- made Claude Code marketplace metadata PARÉ-first while preserving compatibility package id `open-design`;
- corrected ChatGPT/OpenAI readiness docs so private MCP code is not confused with public directory readiness;
- added Product Hunt launch packet and proof-first go-to-market plan;
- corrected public API/MCP docs to remove unsupported/legacy completion claims.

### Social links
No verified PARÉ/The Pauli Effect Instagram/Facebook/Dribbble/Behance profile handles were found in the repositories searched. Preview links therefore point only to platform roots and must be replaced with verified brand profiles (or intentionally hidden) before production. No handle was invented.

### Verification still required
- exact-head Netlify preview build/render;
- responsive/reduced-motion visual review;
- final editorial/legacy-brand sweep;
- real Studio/model/diffusion proof;
- social destination verification;
- production indexability/canonical/legal/support pass.

## Rollback
All changes are isolated on PR #5/release branch. Revert bounded commits or reset the branch to the previous known-good release head as appropriate. Do not remove `/data/pare`, expose 7456/7457 publicly, or overwrite unrelated Caddy services.
