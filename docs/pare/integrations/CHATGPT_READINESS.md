# PARÉ — ChatGPT / OpenAI Plugin Directory Readiness

Status: **private/developer remote MCP is now implemented on the release branch; runtime proof and public marketplace auth remain incomplete; not submitted or approved**.

## Product position
PARÉ is a sovereign AI studio. The ChatGPT integration should let a user work with PARÉ projects and artifacts from ChatGPT while PARÉ remains the authority for project files, memory, permissions, execution, and infrastructure.

> Use ChatGPT as one intelligence surface inside PARÉ — without moving ownership of the project into the model vendor.

## Current OpenAI distribution model — checked 2026-09-04
OpenAI now uses the **Plugins Directory** as the primary discovery surface across ChatGPT and Codex. A plugin can include apps, skills, and app templates. Apps are MCP-backed, and the Apps SDK is the recommended packaging path for publishable in-chat experiences.

Official references:
- https://help.openai.com/en/articles/11487775
- https://help.openai.com/en/articles/12515353-build-with-the-apps-sdk
- https://help.openai.com/en/articles/20001256/

## What PARÉ has on the release branch
- sovereign daemon/API runtime;
- `od` compatibility CLI;
- stdio MCP implementation in `apps/daemon/src/mcp-live-artifacts-server.ts`;
- stdio tools for live-artifact create/list/update/refresh and approved connector list/execute;
- new private/developer HTTP MCP gateway in `apps/daemon/src/pare-mcp-http-server.ts` + `pare-mcp-http-main.ts`;
- private gateway tool names: `pare_health`, `pare_list_projects`, `pare_get_project`;
- separate `PARE_MCP_TOKEN` boundary with authenticated internal daemon calls;
- loopback-only Compose publication target on port 7457;
- persistent project data on owner-controlled infrastructure;
- Netlify Studio → Caddy → VPS runtime architecture.

## What this does NOT prove
The code existing in GitHub does not prove:
- the VPS has built or started the MCP gateway;
- the public Caddy path works;
- ChatGPT Developer Mode can connect;
- a shared static bearer token is appropriate for a public multi-user app;
- PARÉ is submitted, approved, listed, or installable from the OpenAI directory.

The current remote MCP gateway is deliberately a **private/developer integration surface** for proving transport and tool behavior. Public distribution still requires user/workspace identity and the current marketplace-approved authorization flow.

## Recommended first public app scope
Keep the first public app intentionally narrow:
1. read/list authorized project context;
2. list project live artifacts;
3. create/update a bounded live artifact only after explicit user intent;
4. later, start a bounded PARÉ run after its public authorization/approval contract is proven;
5. return concise project/artifact references back to PARÉ Studio.

Do not expose raw shell, secrets, broad filesystem access, server administration, production deployment, or destructive project controls in the first public app.

## Public hardening slice required before submission
- prove private MCP over the sovereign VPS and TLS gateway;
- add authenticated user/workspace identity instead of a shared static public token;
- map each MCP call to PARÉ project authorization and least-privilege grants;
- add live privacy, terms/support, export and deletion documentation;
- test from ChatGPT Developer Mode;
- generate the OpenAI submission/test packet from the exact deployed revision;
- prove negative cases: unauthenticated, unauthorized project, malformed input, runtime/provider failure;
- if an Apps SDK widget is added, keep it small and project/artifact focused rather than embedding the whole Studio.

## Public tool naming target
Use PARÉ-first names at the public boundary while compatibility ids may remain internal:
- `pare_list_projects`
- `pare_get_project`
- `pare_list_artifacts`
- `pare_create_artifact`
- `pare_update_artifact`
- later: `pare_start_run`

Only `pare_list_projects` and `pare_get_project` from that target list are implemented in the current private gateway. Do not advertise the rest as shipped until registered and verified.

## UX bar
Any Apps SDK UI should look like PARÉ: off-white paper, near-black ink, restrained typography, precise spacing, minimal chrome. The app should expose the useful project/artifact moment rather than recreate the entire Studio inside ChatGPT.

## Submission gate
Ready only when:
- remote MCP production URL is reachable;
- user/workspace authorization is proven;
- advertised tools work on the exact production SHA;
- privacy/support/legal URLs are live;
- negative tests pass;
- secrets never enter the browser/tool result;
- submission packet and screenshots are reviewed;
- owner explicitly approves publication.

Until then status is: **DEVELOPER PREVIEW / NOT SUBMITTED**.
