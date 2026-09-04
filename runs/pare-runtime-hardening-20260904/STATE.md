# Run state

status: NOT READY
next_stage: 05_slice
mode: brownfield
main_merge_revision: c0e65919a54e2a7331d33ce256a2ea2960be6b6b
active_entry_diffusion_pr: 6
active_entry_diffusion_revision: 7bdb0fca937da451c10c714e05cac567afa69694
bar_status: locked-by-owner-context
lock_status: recorded
graph_status: admitted
spec_status: entry-diffusion-preview-verification-active
latest_verified_slice: PR #5 merged; PR #6 exact-head CI/preview pending
production_verified: false

## Current blocker
PR #5 is merged to main, but production cannot be called complete yet. The owner identified two concrete experience failures: public entry could bypass the PARÉ effect and go directly to Studio, and the Studio diffusion treatment was not reliably visible on the active streamed response. PR #6 is the bounded corrective slice. It routes fresh human entry through the real crossword/Fusion landing, gates direct Studio deep links through that landing once per browser session, preserves intended return paths, and hardens `DiffusionOverlay` to follow the newest actual streaming prose target. The shared VPS runtime still separately requires exact-revision host/daemon/MCP/provider proof.

## Active slice
Slice 1B — Mandatory PARÉ effect doorway + real Studio diffusion continuity.

### Entry contract
- public `/` -> `/pare-preview/`;
- landing navigation does not bypass the story;
- explicit Enter Studio action admits the Studio session;
- an un-gated direct/deep Studio URL is returned through `/pare-preview/#studio-entry` first;
- machine API/MCP/CLI callers are not subjected to visual navigation.

### Diffusion contract
- the real `ClientApp` mounts `DiffusionOverlay` after the human entry gate;
- the overlay follows the last active `.prose-block[data-stream-cursor="true"]`;
- paragraph/heading/list/quote prose is eligible;
- code, tables, tool cards and source semantic text remain untouched;
- on/off and reduced-motion controls remain authoritative;
- deterministic DOM state exists for browser proof.

## Mandatory walk-test receipt

WALK TEST
repo: executiveusa/PARE
identity: PARÉ sovereign AI studio/runtime; owner product, separate from MACS Digital Media / Agent Max
router: `runs/pare-runtime-hardening-20260904/` + repository agent instructions
architecture: human -> PARÉ effect landing -> Studio -> HTTPS/Caddy -> PARÉ daemon :7456; agent/private MCP -> Caddy -> pare-mcp :7457 -> authenticated daemon API; durable owner state in `/data/pare`
material dependencies checked: personal Hermes ICM governance; PARÉ main; PR #6; Netlify preview; actual `ChatPane` -> `AssistantMessage` streaming renderer; actual markdown renderer; actual `DiffusionOverlay`
protected resources: `/data/pare`, unrelated VPS workloads, reusable secrets, production deploy until exact proof, personal-Hermes/MACS identity separation
proof gate: exact PR6 preview -> root/effect/deep-link entry contract -> diffusion source/DOM tests -> real streamed browser proof -> merge approval -> production exact SHA -> VPS/model/runtime gates
rollback: revert PR #6 or restore prior Netlify production deploy; preserve owner data and runtime services
human gate: PR #6 merge/production promotion still requires a fresh exact owner `approve`; marketplace/public submissions remain separately gated
result: PASS for bounded implementation; preview/runtime proof still required

## Single next action
Wait for exact-head PR #6 CI and Netlify preview. Repair only bounded failures. Once green, perform browser/runtime evidence where available, mark PREVIEW VERIFIED only if supported, and stop at the fresh owner `approve` gate before merging PR #6. After merge, verify the exact production SHA and continue the sovereign VPS/model/MCP Gauntlet.