# Baseline

## Revision
`dc86c9deddace2d273673db2c3c00fd11c6797c0` on `zte/ZTE-20260903-0007/pare-full-rebrand-release`.

## Brownfield fingerprint
- Monorepo with Next.js/React web Studio and Node/Express daemon runtime.
- Real chat path is daemon-backed and uses `/api/runs` with SSE/provider adapters.
- Netlify hosts the browser surface; owner-controlled VPS is intended execution plane.
- Caddy is the public reverse proxy; PARÉ runtime target port is `7456`.
- Persistent runtime data is intended at `/data/pare` -> `/app/.od`.
- Provider secrets are intended to resolve server-side through Infisical/bootstrap env + existing runtime environment.

## Verified repository evidence
- PR #5 head at intake: `dc86c9deddace2d273673db2c3c00fd11c6797c0`.
- Latest commit streamlines `deploy/Dockerfile` to package daemon without building the full web app inside the runtime image.
- `deploy/pare-compose.yml` exposes only `127.0.0.1:7456:7456`, persists `/data/pare`, limits daemon memory to 1024m, and includes a healthcheck against `/api/health`.
- Studio branch includes the diffusion component and Netlify rewrite configuration from prior slices.

## Human-reported evidence (not release proof)
- Monorepo build/typecheck and diffusion focused tests reportedly passed during prior agent work.
- VPS reportedly suffered extreme load/swap pressure while daemon startup was attempted.
- Caddy reportedly has a `/pare/*` route toward `127.0.0.1:7456`.

These reports are useful leads but remain below direct runtime evidence in the Loop Engineering hierarchy.

## Missing proof / current truth gap
- No current exact-head proof that VPS checkout matches GitHub head.
- No direct exact-head proof that `pare-daemon` is active and listening on `127.0.0.1:7456`.
- No direct local/public/Netlify health 200 evidence.
- No real Gemini + second-provider streamed completion evidence.
- No browser/device evidence that the diffusion switch is visible and affects actual streamed assistant prose.
- No independent gauntlet score against the locked bar.

## Blast radius
High if runtime/resource work is done carelessly: shared VPS hosts other services. Browser-side changes are lower blast radius but can break every Studio route because the diffusion overlay is mounted at the SPA root.

## Rollback baseline
- Git rollback target before this run: `dc86c9deddace2d273673db2c3c00fd11c6797c0`.
- PR remains unmerged, so main is protected from this run.
- Runtime rollback must preserve `/data/pare` and existing Caddy/other services; only PARÉ-specific service/config should be reverted.

## Riskiest assumptions
1. Shared VPS resource pressure can be resolved without moving PARÉ or disrupting critical co-located services.
2. Netlify -> Caddy -> daemon path preserves authenticated POST/SSE semantics.
3. Diffusion overlay remains reliable once real model streaming/markdown behavior is present.

## Falsifiers
- Host cannot keep daemon healthy under normal co-located load.
- Public/proxy health or SSE repeatedly fails while local daemon is healthy.
- Provider credentials resolve but real requests fail.
- Diffusion corrupts final text, blocks interaction, leaks observers/rAF, or disappears in real Studio.
