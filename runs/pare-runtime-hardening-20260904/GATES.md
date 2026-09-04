# Acceptance gates

## G1 — Exact revision parity
CLAIM: GitHub release branch, VPS checkout, and tested preview/runtime refer to the same intended revision.
ORACLE: `git rev-parse HEAD` on VPS + GitHub PR head + Netlify deploy commit.
EXPECTED: Exact SHA match or explicitly documented frontend/runtime split with both exact SHAs.
EVIDENCE: pending for final post-build head.
STATUS: pending

## G2 — Host stability
CLAIM: The shared VPS can start and sustain PARÉ without pathological resource pressure or disruption to protected services.
ORACLE: `uptime`, `free -h`, `vmstat`, top processes, `docker stats`, service state before/after PARÉ start.
EXPECTED: No runaway load/swap thrash attributable to PARÉ; critical existing services remain healthy.
EVIDENCE: prior agent reported load >400 and swap saturation; stale/incomplete.
STATUS: fail

## G3 — Local daemon health
CLAIM: PARÉ daemon is active on local port 7456.
ORACLE: Docker service state, `ss -ltnp`, `curl http://127.0.0.1:7456/api/health`.
EXPECTED: exactly one selected daemon authority, loopback publication and HTTP 200.
EVIDENCE: Docker launch defect repaired in repo; VPS proof pending.
STATUS: pending

## G4 — Local private MCP health & auth
CLAIM: The private/developer remote MCP gateway is active on loopback port 7457 and fails closed without auth.
ORACLE: Docker service state; `ss -ltnp`; `GET http://127.0.0.1:7457/mcp/health`; unauthenticated and authenticated `POST /mcp` probes.
EXPECTED: health 200; host port loopback only; unauthorized MCP = 401; authenticated initialize + tools/list succeeds; advertised tools are exactly the deployed set.
EVIDENCE: gateway code + unit tests added on release branch; runtime proof pending.
STATUS: pending

## G5 — Public Caddy gateway health
CLAIM: Caddy exposes the daemon and private MCP gateway at their intended PARÉ paths without exposing 7456/7457 directly.
ORACLE: `curl https://api.thepaulieffect.com/pare/api/health`; MCP health/init/list probes; external port scan/bind inspection.
EXPECTED: API health 200; `/pare/mcp` URI semantics correct; MCP unauthorized = 401; valid private auth succeeds; TLS valid; direct public ports unavailable.
EVIDENCE: Caddy target documented; VPS configuration/proof pending.
STATUS: pending

## G6 — Netlify proxy health
CLAIM: Studio preview can reach the sovereign runtime through its configured rewrite.
ORACLE: `curl https://deploy-preview-5--pauli-para.netlify.app/api/health`.
EXPECTED: HTTP 200 and path semantics match daemon.
EVIDENCE: pending.
STATUS: pending

## G7 — Real provider execution
CLAIM: Provider routing works with real credentials and real model responses.
ORACLE: daemon run with `Reply with exactly: PARÉ MODEL TEST OK`.
EXPECTED: Gemini plus one second configured provider each create a run, stream text deltas, reach terminal success, and return expected content.
EVIDENCE: pending.
STATUS: pending

## G8 — Real Studio primary journey
CLAIM: A user can select a configured model and receive a real streamed answer in Studio.
ORACLE: rendered browser interaction on exact preview.
EXPECTED: model selector, send, streamed prose, completion, visible error handling if provider fails.
EVIDENCE: pending.
STATUS: pending

## G9 — Diffusion presentation correctness
CLAIM: Diffusion is model-agnostic presentation only and does not corrupt chat.
ORACLE: browser test with real streamed answer, toggle ON/OFF during separate runs.
EXPECTED: switch visible; ON diffuses assistant prose only; exact final text preserved; OFF normal stream; no user/tool/code corruption; reduced-motion respected.
EVIDENCE: component is mounted in the real client root; focused tests exist; real browser/runtime proof pending.
STATUS: pending

## G10 — Persistent project + agent access
CLAIM: Human and machine interfaces address the same durable project state.
ORACLE: create/read a bounded test project/artifact through Studio/API/CLI; list/read through stdio MCP and private remote MCP; restart selected PARÉ services; repeat reads.
EXPECTED: same project/artifact identity survives restart and is visible across authorized interfaces; no browser-only shadow state.
EVIDENCE: architecture/code supports the path; runtime proof pending.
STATUS: pending

## G11 — Distribution surface integrity
CLAIM: homepage, Journal, Claude plugin metadata, Product Hunt packet and OpenAI readiness docs describe only capabilities supported by evidence.
ORACLE: exact-head content review + rendered preview + clean plugin install test where applicable.
EXPECTED: luxury PARÉ brand; no legacy user-facing One Hands/OpenDesign claims except explicit compatibility context; no fabricated social handles; no claim of marketplace submission/approval before it occurs.
EVIDENCE: landing/Journal/distribution docs updated; rendered/final editorial verification pending.
STATUS: pending

## G12 — Security/sovereignty
CLAIM: Credentials and authority remain server-side and persistent project ownership remains on owner infrastructure.
ORACLE: inspect client bundle/config, Compose/env handling, daemon/MCP auth, bind/proxy config, persistent volume, secret-pattern diff scan.
EXPECTED: no provider/API/MCP/Infisical secret embedded in browser or plugin manifest; local services loopback-published; `/data/pare` persistent; owner-controlled export/rollback retained.
EVIDENCE: repo configuration enforces key boundaries; runtime confirmation and secret scan pending.
STATUS: pending

## G13 — Release/rollback readiness
CLAIM: Failed release can be reverted without losing owner data or harming other VPS workloads.
ORACLE: review and execute non-destructive rollback rehearsal where safe; exact target/config backups/service isolation.
EXPECTED: explicit prior revision, Caddy backup, selected daemon authority, data volume preserved, production rollback target recorded.
EVIDENCE: `ROLLBACK.md` exists; must be refreshed against final revision and MCP service.
STATUS: pending

## G14 — Fresh verifier + Gauntlet
CLAIM: Completion has been independently challenged against the locked bar after all upstream gates are green.
ORACLE: fresh-context rerun of revision/runtime/provider/Studio/diffusion/persistence/security/rollback claims plus Gauntlet score.
EXPECTED: overall >= 8.5; correctness/security/reliability >= 9.0; critical failures 0; unsupported completion claims 0.
EVIDENCE: pending.
STATUS: pending
