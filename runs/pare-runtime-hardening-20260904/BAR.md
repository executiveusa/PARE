# Quality bar

## Named bar
PARÉ Sovereign Studio Runtime Bar v1 + Collins-level product bar.

## Why it is comparable
This run is not judged by whether code exists or a preview deploy succeeds. It is judged against the actual job PARÉ is supposed to perform: a polished Studio UI that can select configured models, send a real request through the owner-controlled runtime, stream a real answer, preserve ownership/security boundaries, and optionally apply diffusion without corrupting the underlying response. The Collins protocol remains the product-surface taste/usability bar; the sovereign runtime acceptance ledger is the correctness/reliability bar.

## What the critic can fetch/inspect
- PR #5 exact head and changed files.
- Netlify deploy preview for the exact head.
- Public PARÉ API health route through Caddy.
- Netlify `/api/health` rewrite.
- Real model run/SSE output for at least Gemini plus one second provider.
- Studio diffusion ON/OFF behavior on a real streamed assistant response.
- Repository tests, typecheck, deployment configuration, rollback instructions.

## Measurable dimensions
- Exact revision parity across GitHub, VPS runtime, and preview.
- Local daemon health on `127.0.0.1:7456` = HTTP 200.
- Public gateway health = HTTP 200.
- Netlify proxy health = HTTP 200.
- At least two configured providers produce real streamed text and terminal completion.
- Diffusion ON visibly affects only assistant prose and final text is exact.
- Diffusion OFF restores normal streaming immediately.
- Secrets remain server-side; no browser credential exposure.
- Runtime survives restart and uses persistent project data.
- No broken controls, mobile overflow, or unsupported completion claims.

## Hard floors
- Universal release floor: overall >= 8.5; correctness/security/reliability >= 9.0; critical failures = 0; unsupported completion claims = 0; rollback documented.
- Web/product floor: overall >= 8.5; usability/visual/originality/accessibility >= 8.5; primary user action >= 9.0; broken controls/mobile overflow/unverified claims = 0.
- Runtime-specific: every health/model/diffusion gate above must pass from the exact revision before release.

## Owner selection
Approved by explicit owner instruction: use the established PARÉ/Collins bar and begin the Loop Engineering run.
