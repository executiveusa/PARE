# PARÉ Studio deployment model

Status: owner-use release architecture for `ZTE-20260902-0002`.

## Short answer

PARÉ is **installable software**, not a Vercel-only SaaS.

Use Vercel for a fast browser preview of the web surface. Run the real daemon/execution plane on an owner-controlled VPS when PARÉ needs persistent projects, local files, agent CLIs, long-running sessions, exports and authenticated machine access.

```text
phone / desktop browser
        |
        v
Vercel web preview OR private web origin
        |
        v
HTTPS reverse proxy
        |
        v
PARÉ/Open Design daemon :7456
  |       |        |        |
  |       |        |        +-- MCP / HTTP / od CLI
  |       |        +----------- agent adapters
  |       +-------------------- ICM project folders
  +---------------------------- live chat / artifacts / SSE
```

## What Vercel is for

- previewing the React/Next.js interface;
- visual review from phone or desktop;
- pull-request previews;
- public/static marketing surfaces when desired.

Vercel is **not** the canonical agent runtime for PARÉ. The daemon owns long-lived filesystem/process/session capabilities that do not fit an ephemeral serverless execution model.

## What the VPS is for

The owner-controlled VPS runs the repository's existing Docker/daemon path with:

- persistent `OD_DATA_DIR` / Docker volume;
- persistent folder-backed ICM projects;
- approved agent CLIs installed server-side;
- model/provider credentials in runtime secret storage;
- authenticated HTTPS reverse proxy;
- SSE/websocket-safe proxy settings;
- restart/health policy;
- backups and rollback.

The upstream deployment contract already binds the daemon internally to port `7456`, supports `OD_API_TOKEN`, publishes the Docker port on loopback by default, and persists application data in a named volume. PARÉ should reuse that contract rather than add another service framework.

## Agent connection

Agents connect to the **same project** through existing semantic machine doors:

1. `od` CLI for scripts and operators;
2. Open Design MCP for coding/assistant agents;
3. daemon `/api/*` for authenticated integrations;
4. folder-backed project files when the agent is authorized on the same host/workspace.

One Hands is the human-facing orchestration policy. It routes work to the installed Open Design agent/runtime adapters; it is not a second agent framework.

## Owner-use release

The clean first production shape is one private installation:

- one VPS;
- one PARÉ/Open Design daemon container;
- one persistent data volume;
- one authenticated HTTPS hostname;
- one canonical ICM project tree per durable brand/project;
- Vercel retained only as optional preview/showroom infrastructure.

A separate agent worker host can be added later if process isolation or load requires it. Do not split services before there is evidence the single-host owner release needs it.

## SaaS later, not now

Multi-tenant billing and hosted SaaS are optional future packaging. They are not required to use PARÉ today and should not become the only copy of project truth.

A client installation can be sold as software + setup/customization + optional maintenance while the client keeps the source, runtime, ICM files and approved brand assets.

## Production gate

A production VPS installation changes privileged infrastructure and therefore requires the project's explicit production approval gate. Until that approval is recorded, keep deployment work to preview, branch, documentation, configuration and non-production verification.
