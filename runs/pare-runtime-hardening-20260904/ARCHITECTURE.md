# Architecture

## Decision
Keep the existing sovereign topology. Do not add another runtime framework or move model execution into Netlify/browser code.

```text
Netlify Studio
  -> same-origin /api/* rewrite
  -> https://api.thepaulieffect.com/pare/*
  -> Caddy
  -> 127.0.0.1:7456
  -> PARÉ daemon
  -> existing provider adapters
  -> model APIs / local agents

Persistent truth:
  /data/pare -> daemon OD_DATA_DIR
Secrets:
  runtime-only resolver -> Infisical/bootstrap env -> provider process/API
Presentation:
  DiffusionOverlay -> assistant prose only -> no content authority
```

## Essential path
1. Studio loads from Netlify preview.
2. User selects an existing configured model/provider.
3. Studio posts a run through `/api/runs`.
4. Netlify rewrite forwards to the public PARÉ gateway.
5. Caddy strips `/pare` and reverse-proxies to local daemon port 7456.
6. Daemon authenticates the request, resolves provider credentials server-side, and starts the existing provider adapter.
7. SSE/text deltas return through the same path.
8. Existing AssistantMessage/ProseBlock renders the canonical response.
9. Diffusion is a visual layer only; final canonical text remains the daemon/model output.

## Canonical sources of truth
- Project/artifact state: owner-controlled persistent PARÉ data directory (`/data/pare`).
- Provider credentials: server-side secret registry/runtime environment; never browser state.
- Run state: daemon run/session persistence and event stream.
- Model selection: Studio request + daemon/provider registry validation.
- Diffusion preference: local presentation preference only; no effect on model/run semantics.
- Release revision: GitHub commit SHA + deployed runtime/preview revision evidence.

## Minimum-ladder decision
- Reuse current daemon/provider architecture: YES.
- Reuse Caddy: YES.
- Reuse Netlify static host/rewrite: YES.
- Reuse Infisical resolver: YES, subject to runtime proof.
- Add another orchestration/runtime framework: NO.
- Add browser-direct provider SDK calls: NO.
- Add another VPS service solely for proxying: NO unless Caddy/path evidence proves impossible.

## Resource isolation
The shared VPS is the highest-risk boundary. PARÉ must be constrained before broader optimization:
- bind daemon only to loopback;
- retain container/systemd-level memory/process limits where compatible;
- avoid building the full web app on the VPS runtime path;
- keep persistent data outside ephemeral image layers;
- diagnose co-located workload pressure before stopping unrelated services;
- prefer stopping PARÉ itself over degrading protected services if host pressure recurs.

## Failure behavior
- Daemon unavailable -> Studio shows explicit runtime/provider error, never silent empty chat.
- Provider unavailable -> surface provider error and keep conversation/project state intact.
- SSE interrupted -> preserve completed deltas/run id and expose retry/reconnect path already supported by runtime.
- Diffusion failure -> fall back to normal canonical text immediately.
- Resource pressure -> stop/restart only PARÉ first; do not kill unknown/critical co-located workloads.

## Security boundary
- No provider or API secret in `NEXT_PUBLIC_*`, static export, browser storage, or rendered responses.
- Public traffic reaches daemon only through TLS reverse proxy/authenticated route.
- Host port 7456 remains loopback-bound.
- Secret resolver may cache in memory but must not log values.

## Observability
Required release evidence:
- host resource snapshot before/after daemon start;
- service/container status;
- local/public/Netlify health probes;
- provider run id + terminal status without secret values;
- browser-visible Studio primary journey;
- exact Git/Netlify/VPS revision mapping.

## Ownership
Owner retains GitHub repo, Netlify project, domain/Caddy, VPS, persistent volume, Infisical registry, and export/rollback path.

## Rejected alternatives
1. Browser-direct provider API calls — rejected: secret/authority leakage and fractured provider routing.
2. Netlify Functions as new model gateway — rejected: unnecessary additional authority/runtime and current daemon already owns execution.
3. New orchestration framework (LoopX/Burr/Pydantic/PocketFlow) — rejected: no architecture need; Loop Engineering is process control, not another production runtime.
4. Rewriting provider subsystem — rejected: existing adapters are already the intended path; current failure is deployment/runtime proof.
5. Moving PARÉ immediately to a new VPS — deferred: only justified if measured co-location pressure cannot be made reliable after bounded diagnosis.

## Consequential architecture changes
None in this stage. This preserves the already-approved sovereign architecture and owner-control boundary.
