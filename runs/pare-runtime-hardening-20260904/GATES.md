# Acceptance gates

## G1 — Exact revision parity
CLAIM: GitHub release branch, VPS checkout, and tested preview/runtime refer to the same intended revision.
ORACLE: `git rev-parse HEAD` on VPS + GitHub PR head + Netlify deploy commit.
EXPECTED: Exact SHA match or explicitly documented frontend/runtime split with both exact SHAs.
EVIDENCE: pending for post-run head.
STATUS: pending

## G2 — Host stability
CLAIM: The shared VPS can start and sustain PARÉ without pathological resource pressure or disruption to protected services.
ORACLE: `uptime`, `free -h`, `vmstat`, top processes, `docker stats`, service state before/after PARÉ start.
EXPECTED: No runaway load/swap thrash attributable to PARÉ; critical existing services remain healthy.
EVIDENCE: prior agent reported load >400 and swap saturation; stale/incomplete.
STATUS: fail

## G3 — Local daemon health
CLAIM: PARÉ daemon is active on local port 7456.
ORACLE: `systemctl/docker status`, `ss -ltnp`, `curl http://127.0.0.1:7456/api/health`.
EXPECTED: active/listening and HTTP 200.
EVIDENCE: pending.
STATUS: pending

## G4 — Public gateway health
CLAIM: Caddy exposes the daemon safely at the PARÉ public path.
ORACLE: `curl https://api.thepaulieffect.com/pare/api/health`.
EXPECTED: HTTP 200 with TLS; no direct public exposure of port 7456.
EVIDENCE: pending.
STATUS: pending

## G5 — Netlify proxy health
CLAIM: Studio preview can reach the sovereign runtime through its configured rewrite.
ORACLE: `curl https://deploy-preview-5--pauli-para.netlify.app/api/health`.
EXPECTED: HTTP 200 and path semantics match daemon.
EVIDENCE: pending.
STATUS: pending

## G6 — Real provider execution
CLAIM: Provider routing works with real credentials and real model responses.
ORACLE: daemon run with `Reply with exactly: PARÉ MODEL TEST OK`.
EXPECTED: Gemini plus one second configured provider each create a run, stream text deltas, reach terminal success, and return expected content.
EVIDENCE: pending.
STATUS: pending

## G7 — Real Studio primary journey
CLAIM: A user can select a configured model and receive a real streamed answer in Studio.
ORACLE: rendered browser interaction on exact preview.
EXPECTED: model selector, send, streamed prose, completion, visible error handling if provider fails.
EVIDENCE: pending.
STATUS: pending

## G8 — Diffusion presentation correctness
CLAIM: Diffusion is model-agnostic presentation only and does not corrupt chat.
ORACLE: browser test with real streamed answer, toggle ON/OFF during separate runs.
EXPECTED: switch visible; ON diffuses assistant prose only; exact final text preserved; OFF normal stream; no user/tool/code corruption; reduced-motion respected.
EVIDENCE: focused tests reportedly passed; real browser/runtime proof pending.
STATUS: pending

## G9 — Security/sovereignty
CLAIM: Credentials and authority remain server-side and persistent project ownership remains on owner infrastructure.
ORACLE: inspect browser bundle/config, runtime env handling, bind/proxy config, persistent volume.
EXPECTED: no provider/API secret embedded in browser; local daemon bound through loopback proxy; `/data/pare` persistent; owner-controlled export/rollback retained.
EVIDENCE: repository configuration partially supports claim; runtime confirmation pending.
STATUS: pending

## G10 — Release/rollback readiness
CLAIM: Failed release can be reverted without losing owner data or harming other VPS workloads.
ORACLE: review rollback steps and exact target; mechanically credible service/Caddy/Git rollback.
EXPECTED: explicit target, config backup, service isolation, data volume preserved.
EVIDENCE: `ROLLBACK.md` in this run.
STATUS: pending
