# Run state

status: NOT READY
next_stage: 05_slice
mode: brownfield
main_merge_revision: c0e65919a54e2a7331d33ce256a2ea2960be6b6b
active_entry_diffusion_pr: 6
active_entry_diffusion_revision: 2366d3f38ba8423ea861375bbdc3dfca16efcb5d
active_runtime_code_payload_revision: 234f4b8d5bfe1d94834a3dfacf3370a61b37f018
netlify_preview_deploy: 6a9b32a1008f94000851311a
bar_status: locked-by-owner-context
lock_status: recorded
graph_status: admitted
spec_status: entry-diffusion-preview-verification-active
latest_verified_slice: PR #6 runtime-code payload deployed to Netlify preview; independent review and CI still pending
production_verified: false

## Current evidence
PR #5 is merged to main. PR #6 is the bounded corrective slice for the two owner-observed experience failures: bypassing the PARÉ effect on human entry and diffusion becoming invisible/inconsistent during a streamed response.

Netlify preview deploy `6a9b32a1008f94000851311a` is READY for runtime-code payload `234f4b8d5bfe1d94834a3dfacf3370a61b37f018`; Netlify reports the redirect/header rules processed successfully. Current PR head `2366d3f38ba8423ea861375bbdc3dfca16efcb5d` adds test/evidence coverage after that runtime payload. GitHub CI for the current head is queued on the repository runner fleet, not yet green. CodeRabbit independent review was manually triggered and is still processing.

## Active slice
Slice 1B — Mandatory PARÉ effect doorway + real Studio diffusion continuity.

### Entry contract
- public `/` -> `/pare-preview/`;
- landing navigation does not bypass the story;
- every hard human Studio boot (reload, direct/deep link, bookmark, fresh tab/window) must return through the PARÉ landing first;
- landing grants exactly one Studio boot and Studio consumes the grant immediately;
- internal SPA navigation after admission stays uninterrupted;
- intended deep link is restored after the landing handoff;
- machine API/MCP/CLI callers are not subjected to visual navigation.

### Crossword / PARÉ effect contract
- real static crossword markup is present before JavaScript;
- PARÉ is the target row;
- supporting concept letters form PROJECT / AGENTS / REDUCE / ÉPURE;
- scroll pares supporting structure away and converges the target letters;
- resize/pageshow/visibility/font-ready hooks rebuild geometry;
- reduced motion has a stable fallback;
- the previous random 9×7/63-glyph matrix is absent.

### Diffusion contract
- the real `ClientApp` mounts `DiffusionOverlay` after the human entry gate;
- overlay follows the last active `.prose-block[data-stream-cursor="true"]`, avoiding a stale earlier stream;
- paragraph/heading/list/quote prose is eligible;
- code/tool surfaces and semantic source text remain untouched;
- on every new text delta, including after a provider pause, the presentation layer is re-armed so the source does not double-render and diffusion does not disappear;
- on/off and reduced-motion controls remain authoritative;
- deterministic DOM state exists for browser proof.

## Mandatory walk-test receipt

WALK TEST
repo: executiveusa/PARE
identity: PARÉ sovereign AI studio/runtime; owner product, separate from MACS Digital Media / Agent Max
router: `runs/pare-runtime-hardening-20260904/` + repository agent instructions
architecture: human -> PARÉ effect landing -> Studio -> HTTPS/Caddy -> PARÉ daemon :7456; agent/private MCP -> Caddy -> pare-mcp :7457 -> authenticated daemon API; durable owner state in `/data/pare`
material dependencies checked: personal Hermes ICM governance; PARÉ main; PR #6; Netlify preview; actual `AssistantMessage` streaming cursor; actual markdown renderer; actual `DiffusionOverlay`
protected resources: `/data/pare`, unrelated VPS workloads, reusable secrets, production deploy until exact proof, personal-Hermes/MACS identity separation
proof gate: runtime payload preview -> independent review + focused/static checks -> merge approval -> production exact payload -> root/effect/deep-link entry -> real streamed diffusion exact-text proof -> VPS/model/runtime gates
rollback: revert PR #6 or restore prior Netlify production deploy; preserve owner data and runtime services
human gate: PR #6 merge/production promotion still requires a fresh exact owner `approve`; marketplace/public submissions remain separately gated
result: implementation admitted; runtime payload preview READY; CI/review/browser/provider evidence still incomplete

## Single next action
Finish independent review and available CI evidence for PR #6. Repair only bounded findings. Once the code slice is clean, stop at the fresh owner `approve` gate before merging PR #6. After merge, verify Netlify production serves the merged runtime payload and continue the sovereign VPS/model/MCP Gauntlet.