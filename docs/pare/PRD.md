# PARÉ Studio — Product Requirements Document

Status: Candidate architecture for ZTE-20260902-0002

## 1. Product

**PARÉ Studio** is Pauli's installable, owner-controlled brand and design operating environment. It keeps Open Design's artifact-first human experience and generic agent adapters, then adds ICM project memory, One Hands orchestration, Pauli brand-development law, independent quality gates, and sovereign deployment.

Tagline: **Brand systems, reduced to what matters.**

PARÉ is not a second design engine. It is the governed operating layer around the existing Open Design experience.

## 2. User promise

A human can open one Studio, talk naturally to One Hands, watch work appear on a live canvas, attach/reference real files, redirect the work, approve consequential decisions, and keep the resulting strategy/assets as normal files.

An external agent can connect to the same project through existing machine surfaces and operate on the same files without needing the visual UI.

No proprietary database is the only copy of brand truth.

## 3. Primary users

### Owner/operator
Needs a phone/desktop-accessible Studio that can create and operate brands without sitting at a development workstation.

### Creative collaborator
Needs to inspect projects, talk to the system, comment on artifacts, compare directions, and approve or reject work.

### External agent
Needs a stable CLI/MCP/API contract for reading project context, creating candidate work, validating it, and returning receipts.

### Client installation
Needs the ability to run the Studio on infrastructure the client or Pauli controls while retaining all canonical project files.

## 4. Core experience

### Home
- Recent projects.
- New project.
- Import folder/project.
- Design systems/resources.
- Minimal account/runtime state.

### Project Studio
Desktop layout retains the upstream interaction model:

```text
+---------------------------------------------------------------+
| PARÉ        Company / Project                     account     |
+------------------------+--------------------------------------+
| ONE HANDS              | LIVE CANVAS                          |
| chat/history           | HTML / SVG / deck / visual output   |
| attachments            | responsive preview                  |
| links/context          | comment/select/refine               |
| live tool/run stream   | files/artifact tabs                 |
| model only if needed   |                                      |
+------------------------+--------------------------------------+
| Project · Strategy · Assets · Proof · Approvals · Export     |
+---------------------------------------------------------------+
```

Mobile becomes three simple surfaces: **Chat | Canvas | Project**.

### Conversation
One Hands is the named human-facing operator in the chat surface. The user asks for outcomes, not infrastructure choices.

Examples:
- "Build the official brand for New World Kids."
- "Make this direction feel more institutional and less startup."
- "Create the social launch system from the approved identity."
- "Audit this landing page against our brand and fix the largest gap."

One Hands chooses the appropriate existing skill/agent route and exposes progress, evidence, and gates in ordinary language.

## 5. Canonical project model

PARÉ uses folder-backed Open Design projects whose base directory is the ICM project root.

```text
<project-root>/
├── AGENTS.md                 # small route map
├── CONTEXT.md                # project pipeline/context index
├── 00_intake/
│   ├── CONTEXT.md
│   ├── brief.md
│   ├── constraints.md
│   └── assets/
├── 10_strategy/
│   ├── CONTEXT.md
│   ├── research/
│   ├── positioning.md
│   ├── governing-idea.json
│   └── brand-manifest.json
├── 20_design/
│   ├── CONTEXT.md
│   ├── directions/
│   ├── tokens/
│   ├── assets/
│   ├── mockups/
│   └── html-lab/
├── 30_validate/
│   ├── CONTEXT.md
│   ├── guardian-reports/
│   ├── scorecard.json
│   └── verdict.md
├── 40_deliver/
│   ├── CONTEXT.md
│   ├── brand-book/
│   ├── asset-package/
│   ├── style-guide/
│   └── developer-handoff/
├── 50_publish/
│   └── CONTEXT.md
├── _shared/                  # stable project reference
└── _ledger/
    ├── work-orders/
    ├── approvals/
    ├── evaluations/
    └── events.jsonl
```

Rules:
- one folder, one job;
- root routing stays small;
- each working folder has an explicit contract;
- factory/reference is separated from run artifacts;
- one fact has one canonical home;
- status is derivable from files/receipts;
- generated indexes are not hand-maintained;
- agents load only the current step's contract + explicit inputs/references.

## 6. One Hands

One Hands is a routed skill/policy layer, not a new agent framework.

It may:
- inspect the active ICM project;
- normalize an outcome into a work order;
- compile smallest-sufficient context;
- route to existing Open Design skills and detected agent adapters;
- create draft/candidate artifacts;
- request independent validation;
- issue bounded repairs;
- prepare previews and exports;
- record receipts.

It may not:
- fabricate proof or research;
- silently approve its own work;
- write secrets into project truth;
- publish/promote without the required approval;
- bypass the active project scope.

## 7. Brand workflow

Canonical high-level sequence:

`00_intake -> 10_strategy -> 20_design -> 30_validate -> 40_deliver -> 50_publish`

Identity/rebrand work inserts the governed creative-direction bridge:

`positioning -> governing idea -> territories -> distinctiveness -> HUMAN TERRITORY SELECTION -> identity -> behavior -> application stress test -> commercial desirability -> Guardian -> Gauntlet -> Proof`

Human gates are visible, not hidden in agent reasoning.

## 8. Agent architecture

### Reuse
PARÉ reuses Open Design's agent adapter system. The detected coding-agent CLI remains the execution engine.

Target engines include the adapters already supported by upstream, such as Codex, Claude Code, OpenCode, Hermes, Pi, Gemini and other compatible CLIs.

### External agents
External agents do not automate React components. They use semantic machine surfaces.

Canonical machine doors:
- `od` CLI;
- Open Design MCP;
- daemon HTTP `/api/*`;
- folder-backed filesystem where appropriate.

All doors operate on the same active project and return machine-readable results/receipts.

### Required semantic operations
The finished PARÉ surface must make these possible through existing/upstream-compatible contracts:
- list/open project;
- inspect project context;
- read scoped files/artifacts;
- start work/run;
- stream run status;
- inspect artifact/result;
- request validation;
- inspect approval state;
- export/deliver.

Do not add a second MCP server when the existing Open Design MCP can be extended.

## 9. Skills strategy

Skills stay files.

PARÉ-specific skill set is the smallest useful set ported from the Brand Studio work:
- One Hands;
- ICM Architect;
- brand discovery;
- creative direction;
- Collins-level judgment lens;
- design guardian;
- gauntlet;
- design proof/completion gates;
- subtraction/Ponytail behavior;
- humanize;
- SEO;
- SVG engineering;
- delivery;
- optional social/publishing.

Open Design's existing skills remain available and are routed only when relevant.

## 10. Design systems

Open Design's `DESIGN.md` remains the visual design-system protocol.

PARÉ adds its own `DESIGN.md` package for the product shell and allows each client/project to carry a project-specific system. ICM strategy/manifest files explain *why*; `DESIGN.md` tells the renderer/agent *how the selected system behaves visually*.

No global PARÉ look is forced onto client brands.

## 11. Human identity and accounts

### Owner-use release
Accounts are not required to prove the Studio today if access is private and authenticated at the deployment edge.

### Multi-user release
Before adding Supabase or another provider, audit current Open Design workspace/account capabilities. Reuse them if they satisfy:
- identity;
- organization/workspace membership;
- project access;
- role-aware approvals;
- session continuity.

Only if there is a material gap should PARÉ adapt the existing Brand Studio Supabase Auth/RLS domain.

No second account system is introduced speculatively.

## 12. Deployment

### Web
Vercel hosts the Next.js web surface. It is a UI/SSR edge, not canonical project storage and not the agent execution plane.

### Daemon
The daemon is a long-running privileged process. For phone/cloud use it runs on an owner-controlled VPS with:
- persistent daemon data volume;
- persistent ICM project storage;
- installed approved agent CLIs;
- server-side model/provider credentials;
- authenticated HTTPS reverse proxy;
- SSE streaming with proxy buffering disabled;
- service restart/health policy;
- backups.

### Why the daemon is not Vercel serverless
It owns long-running sessions, files, process spawning, CLI detection, streaming events, exports and privileged local capabilities. Those are server/desktop responsibilities, not ephemeral serverless request handlers.

### Direct/browser-only mode
Retain upstream direct API/BYOK mode for demos/trials where appropriate, but mark it as degraded for canonical PARÉ work because it lacks the full filesystem/CLI execution plane.

## 13. Security

- Never expose the daemon unauthenticated to the public internet.
- Secrets remain in server/runtime secret stores, never ICM files.
- Project path access is scoped to the active project/workspace.
- Imported/folder-backed projects preserve provenance.
- External orchestrator scratch workspaces remain external-authority workspaces; OD/PARÉ does not infer permission to push/deploy source.
- Publish/deploy/irreversible actions require the correct approval gate.
- Maintain iframe sandbox boundaries.
- Preserve upstream SSRF protections and agent permission boundaries.

## 14. Migration from Brand Kit Builder

`brand-kit-builder-` becomes a migration source, not a dependency.

Port only capabilities that Open Design does not already provide.

| Brand Kit capability | PARÉ destination |
|---|---|
| ICM law | ICM skill + project folder contracts |
| One Hands | orchestration skill/policy |
| Guardian/Gauntlet/Proof | validation skills/workflow |
| creative direction | strategy/design skills + ICM outputs |
| SEO/humanize/SVG | routed skills |
| REST/MCP/CLI | do not port; use Open Design surfaces |
| old Vite web | do not port |
| project/session runtime | do not port unless a verified gap exists |
| Supabase auth/RLS | optional only after account-gap audit |
| Postiz | optional publishing adapter after core flow works |

`pauli-open-codesign` remains a reference for useful interaction patterns only; no second bundled design runtime is required.

## 15. Observability

Humans see:
- current run;
- current stage;
- active agent/skill when useful;
- tool/run progress;
- validation state;
- approval needed;
- last receipt/result.

Machines get structured run/result output through existing contracts/CLI JSON modes.

No fake success states.

## 16. Acceptance test: human

From a phone or desktop, the owner can:
1. open PARÉ Studio;
2. open/create/import a project;
3. enter a natural-language request in chat;
4. see One Hands route/execute it;
5. watch progress stream;
6. see an artifact on the live canvas;
7. comment/refine;
8. see project files/ICM state persist;
9. run validation;
10. approve/export a completed result.

## 17. Acceptance test: agent

A separate agent can:
1. connect using the existing machine interface;
2. discover/list a project;
3. inspect the project's scoped ICM context;
4. start or inspect work without rendering the UI;
5. observe the resulting artifact/receipt;
6. see the same files the human sees in Studio.

## 18. Non-goals

- Rewriting Open Design.
- Replacing every upstream name in technical/internal namespaces.
- Inventing a second agent framework.
- Converting ICM into database state.
- Shipping public multi-tenant billing before owner-use is proven.
- Porting duplicate legacy APIs.
- Making Vercel the agent runtime.

## 19. Release stages

### R0 — pristine baseline
Fork runs unchanged and is visually verified.

### R1 — PARÉ private Studio
Brand surface + One Hands + ICM skill/project mapping + existing chat/canvas + owner VPS daemon.

### R2 — agent parity
External MCP/CLI/API path verified against the same project.

### R3 — team access
Account/workspace/approval gap audit closed; add only what is actually missing.

### R4 — publishing
Optional social/SEO/publish adapters after core Studio is stable.

## 20. Definition of done

PARÉ is Done for the owner-use release when the existing Open Design experience remains intact, the UI is PARÉ-branded, the active project is a walkable ICM filesystem, One Hands can drive the real agent/runtime path, a separate agent can access the same project through machine interfaces, and the web + daemon are deployed in the correct Vercel/VPS split with verified rollback and no secret exposure.