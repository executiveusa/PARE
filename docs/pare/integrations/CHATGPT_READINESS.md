# PARÉ — ChatGPT / OpenAI Plugin Directory Readiness

Status: **code-side readiness in progress; not submitted or approved**.

## Product position
PARÉ is a sovereign AI studio. The ChatGPT integration should let a user work with PARÉ projects and artifacts from ChatGPT while PARÉ remains the authority for project files, memory, permissions, execution, and infrastructure.

> Use ChatGPT as one intelligence surface inside PARÉ — without moving ownership of the project into the model vendor.

## Current OpenAI distribution model — checked 2026-09-04
OpenAI now uses the **Plugins Directory** as the primary discovery surface across ChatGPT and Codex. A plugin can include apps, skills, and app templates. Apps are MCP-backed, and the Apps SDK is the recommended packaging path for publishable in-chat experiences.

Official references:
- https://help.openai.com/en/articles/11487775
- https://help.openai.com/en/articles/12515353-build-with-the-apps-sdk
- https://help.openai.com/en/articles/20001256/

## What PARÉ actually has today
- sovereign daemon/API runtime;
- `od` compatibility CLI;
- a working **stdio MCP implementation** in `apps/daemon/src/mcp-live-artifacts-server.ts`;
- MCP tools for live-artifact create/list/update/refresh and approved connector list/execute;
- bearer-token enforcement on the MCP-to-daemon tool calls;
- persistent project data on owner-controlled infrastructure;
- Netlify Studio → Caddy → VPS runtime architecture.

## Important correction
The repository does **not yet prove a standards-compliant public remote MCP endpoint for ChatGPT**. The existing MCP transport is stdio. Do not describe PARÉ as submitted, approved, or remotely installable in ChatGPT until the remote transport and auth slice below is implemented and verified.

## Recommended first public app scope
Keep the first public app intentionally narrow:
1. read/list authorized project context;
2. list project live artifacts;
3. create/update a bounded live artifact only after explicit user intent;
4. later, start a bounded PARÉ run after its public authorization/approval contract is proven;
5. return concise project/artifact references back to PARÉ Studio.

Do not expose raw shell, secrets, broad filesystem access, server administration, production deployment, or destructive project controls in the first public app.

## Remote MCP slice required before submission
- expose Streamable HTTP MCP on the sovereign runtime, recommended path `https://api.thepaulieffect.com/pare/mcp`;
- authenticate an actual user/workspace, not a shared browser secret;
- map MCP calls to PARÉ project authorization;
- use least-privilege, action-oriented tool descriptions;
- add live privacy, terms/support, export and deletion documentation;
- test from ChatGPT Developer Mode;
- generate the OpenAI submission/test packet from the exact deployed revision;
- prove negative cases: unauthenticated, unauthorized project, malformed input, runtime/provider failure.

## Public tool naming target
Use PARÉ-first names at the public boundary while compatibility ids may remain internal:
- `pare_list_projects`
- `pare_get_project`
- `pare_list_artifacts`
- `pare_create_artifact`
- `pare_update_artifact`
- later: `pare_start_run`

These are target public names, **not shipped claims**, until the remote MCP implementation registers them.

## UX bar
Any Apps SDK UI should look like PARÉ: off-white paper, near-black ink, restrained typography, precise spacing, minimal chrome. The app should expose the useful project/artifact moment rather than recreate the entire Studio inside ChatGPT.

## Submission gate
Ready only when:
- remote MCP production URL is reachable;
- authorization is proven;
- advertised tools work on the exact production SHA;
- privacy/support/legal URLs are live;
- negative tests pass;
- secrets never enter the browser/tool result;
- submission packet and screenshots are reviewed;
- owner explicitly approves publication.

Until then status is: **DEVELOPER PREVIEW / NOT SUBMITTED**.
