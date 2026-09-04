# PARÉ REST & Streaming API

Status: **release contract under verification**. This document describes the public surface we intend to prove on the sovereign VPS; it does not turn an unverified route into a production claim.

## Base URLs
- public target: `https://api.thepaulieffect.com/pare`
- local daemon: `http://127.0.0.1:7456`
- Netlify Studio reaches the daemon through same-origin `/api/*` rewrites.

## Authentication
When `OD_API_TOKEN` / `PARE_API_TOKEN` is enabled, non-loopback API requests require the daemon bearer token unless a narrower server-minted/run-scoped authorization path applies.

The daemon deliberately leaves health/readiness/version probes open for monitoring:
- `/api/health`
- `/api/ready`
- `/api/version`

Do not put the daemon bearer token in browser `NEXT_PUBLIC_*` variables or public plugin manifests.

## Projects
The current daemon and Studio use the daemon project API as the canonical project surface. The release gateway must prove at minimum:
- `GET /api/projects`
- `GET /api/projects/:id`

Additional project file, artifact, workspace and mutation routes are implementation surfaces and must be advertised publicly only after their exact route, authorization and negative cases are verified from the deployed route inventory.

## Runs & streaming
The real Studio provider is a fetch/SSE client for **`/api/runs`**. A run can emit typed agent events, plain stdout-derived text, or terminal/error events depending on the selected runtime. The daemon's SSE helper sets:
- `Content-Type: text/event-stream`
- `Cache-Control: no-cache, no-transform`
- `Connection: keep-alive`
- `X-Accel-Buffering: no`

The release must prove the exact create/stream/cancel semantics used by the current Studio before this document publishes request examples as a stable external API.

## MCP
MCP is documented separately in `docs/pare/MCP.md`:
- existing local/stdio `od mcp` compatibility surface;
- private/developer remote MCP gateway on port 7457;
- public marketplace auth/identity remains a separate hardening slice.

## Machine-interface rule
Agents should prefer API/MCP/CLI over React/browser automation whenever a semantic interface exists. All surfaces must address the same durable PARÉ project state.

## Verification gate
Do not call the API production-ready until one exact release revision proves:
1. local health/readiness/version;
2. project list/read with expected auth behavior;
3. unauthorized request rejection;
4. real run creation and incremental SSE;
5. terminal success/error event handling;
6. cancellation behavior;
7. Caddy path stripping and SSE flushing;
8. Netlify Studio proxy behavior;
9. secrets absent from client bundles/responses;
10. rollback to the prior daemon/config is mechanically credible.
