# Spec — Slice 1: Sovereign runtime activation proof

## Goal
Prove the shortest real end-to-end runtime path from the current release branch to a healthy owner-controlled daemon without changing product architecture.

## Entry
VPS checkout of `zte/ZTE-20260903-0007/pare-full-rebrand-release` at the exact current branch head.

## Action
Diagnose resource pressure, start PARÉ with the existing daemon packaging/service path, and verify local health.

## Result
`127.0.0.1:7456/api/health` returns HTTP 200 while protected co-located services remain healthy and PARÉ data remains persistent.

## Error / recovery
- If host is still thrashing, identify top resource consumers and orphaned PARÉ build/test processes first.
- Only terminate clearly abandoned PARÉ-owned processes without an additional gate.
- If an unrelated service is clearly runaway, record evidence and stop before mutating it unless the owner has already authorized that service intervention.
- If daemon starts but health fails, inspect PARÉ logs and fix only the smallest proven source/config defect.
- If PARÉ itself destabilizes the host, stop/disable PARÉ and return to the recorded baseline.

## Exact requirements
1. Record current GitHub head and VPS `git rev-parse HEAD`; they must match before test evidence is accepted.
2. Capture `uptime`, `free -h`, `swapon --show`, `vmstat 1 5`, top RAM/CPU processes, `docker stats --no-stream`.
3. Confirm no orphaned `pnpm/node/tsc/vitest/docker build/buildkit` processes from PARÉ deployment remain.
4. Confirm `/data/pare` exists and is not replaced/deleted.
5. Start PARÉ using one declared authority (existing compose OR systemd wrapper, not two competing daemon instances).
6. Confirm exactly one daemon owns port 7456.
7. Port 7456 must be host-loopback only.
8. Local health request must return HTTP 200 within a bounded timeout.
9. Do not print secret values in logs/evidence.
10. Record service/container memory and restart behavior after health passes.

## Security
- No client-side secret changes.
- No public `0.0.0.0:7456` host bind.
- No disabling API auth merely to make health pass unless health endpoint is intentionally unauthenticated by existing contract.
- No deleting persistent state.

## Performance/reliability
- PARÉ must not reintroduce pathological swap/load behavior during the bounded health test.
- If the 1 GiB daemon memory limit is incompatible with startup, measure before changing it; any increase must be minimal and justified against available host memory.

## Evidence oracles
- Revision: GitHub PR head + VPS `git rev-parse HEAD`.
- Host: resource commands before/after.
- Process authority: `systemctl status`, `docker ps`, `ps`, `ss -ltnp`.
- Health: `curl --max-time 10 -i http://127.0.0.1:7456/api/health`.
- Persistence: mount/compose/service config + `/data/pare` existence.

## Pass condition
All Slice 1 requirements pass from the exact revision, with no protected-service regression and no unsupported claim.

## Out of scope for Slice 1
- Public Caddy proof.
- Netlify proxy proof.
- Provider/model smoke tests.
- Browser diffusion signoff.
- Production merge/promotion.

Those become subsequent graph nodes only after local runtime health passes.
