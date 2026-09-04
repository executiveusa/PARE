# Project lock

MODE: brownfield
OUTCOME: PARÉ Studio preview uses the sovereign owner-controlled runtime to deliver real multi-model streamed chat, with a visible model-agnostic diffusion presentation toggle, while preserving owner control, persistent files, security boundaries, and rollback.
TARGET: `executiveusa/PARE` PR #5 release branch and its owner-controlled Hostinger runtime + Netlify preview.
PRIMARY ACTION: User selects a configured model and sends a prompt; PARÉ returns a real streamed answer from the sovereign runtime.
CONSTRAINTS: No browser-side secrets; do not redesign provider architecture; do not merge to main or promote production without explicit owner approval; preserve existing services/data on the shared VPS; reuse current daemon/Caddy/Netlify architecture; exact-revision evidence required.
PROTECTED ASSETS: Existing VPS workloads, `/data/pare` project data, Infisical secret registry, GitHub repo history, Caddy configuration, Netlify project, model provider credentials, PR #5 rollback point.
PROOF: Exact SHA parity; daemon/public/proxy health; two real provider smoke tests; actual Studio SSE response; diffusion ON/OFF on real text; relevant automated checks; rollback recorded.
COMMERCIAL VALUE: Converts PARÉ from a static/design preview into a usable sovereign agentic Studio and validates the reusable model-agnostic diffusion primitive.
CLASSIFICATION: USE + SELL candidate once runtime and product gauntlet clear the bar.
WORKSTREAM: Shared platform / bounded runtime-hardening experiment.

## Known facts
- PR #5 is open, draft, mergeable, and unmerged.
- Current branch head at run start is `dc86c9deddace2d273673db2c3c00fd11c6797c0`.
- DiffusionOverlay is mounted in the SPA root on the release branch.
- Netlify rewrite configuration routes `/api/*` toward the PARÉ VPS gateway.
- `deploy/pare-compose.yml` binds host port `127.0.0.1:7456`, mounts `/data/pare`, sets a 1024m container memory limit, and defines an HTTP healthcheck.
- Human/Gemini reports indicate VPS load/swap pressure and incomplete daemon health proof; this remains lower-tier evidence until directly verified.

## Assumptions to falsify
- The shared VPS can reliably run PARÉ after resource cleanup/isolation without harming existing active services.
- Caddy path rewriting exactly matches the daemon route structure.
- Netlify rewrites preserve POST + SSE behavior correctly.
- Infisical/runtime secret resolution provides usable provider credentials without exposing them.
- The MutationObserver-based diffusion overlay remains stable on real multi-paragraph streamed markdown.

## Owner approvals
- Bar: approved by current instruction.
- Scope/lock: approved by current instruction and prior release constraints.
- Production: pending explicit owner approval.
