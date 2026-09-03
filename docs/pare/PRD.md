# PARÉ Studio — Product Requirements

Status: release candidate for ZTE-20260903-0007

## Product

PARÉ is an owner-controlled design operating system.

A person asks for an outcome. PARÉ turns that request into project work, keeps the work in ordinary files, routes execution through an available agent/runtime, shows the artifact, runs critique and proof, and stops when a real human decision is required.

The interface should feel smaller than the machinery beneath it.

## Product promise

From phone or desktop, a person can:

1. open or create a project;
2. describe what they want in ordinary language;
3. attach files, links, references, or project context;
4. watch work appear on a live canvas;
5. redirect, compare, approve, reject, or continue;
6. keep the resulting project, assets, evidence, and approvals as portable files.

A separate agent can operate on the same project through machine interfaces without automating the visual UI.

## Core interface

### Home

Keep only what helps someone begin:

- recent projects;
- new project;
- import project/folder;
- prompt/composer;
- design systems, skills, plugins, connectors, and runtime choices only when needed.

### Studio

Desktop:

```text
+---------------------------------------------------------------+
| PARÉ                     Company / Project                    |
+------------------------+--------------------------------------+
| CONVERSATION           | LIVE CANVAS                          |
| request / history      | HTML / SVG / deck / visual output   |
| files / context        | responsive preview                  |
| progress / approvals   | inspect / compare / refine          |
+------------------------+--------------------------------------+
| Project · Strategy · Assets · Proof · Approvals · Export     |
+---------------------------------------------------------------+
```

Mobile:

**Chat · Canvas · Project**

No desktop shrink-wrap. The mobile product should be usable as a primary surface.

## Project truth

PARÉ uses folder-backed projects. Canonical project truth stays portable.

```text
<project-root>/
├── AGENTS.md
├── CONTEXT.md
├── 00_intake/
├── 10_strategy/
├── 20_design/
├── 30_validate/
├── 40_deliver/
├── 50_publish/
├── _shared/
└── _ledger/
```

Rules:

- one fact has one canonical home;
- one folder has one job;
- strategy explains why;
- design files explain how the system behaves;
- validation leaves evidence;
- approvals leave receipts;
- generated indexes are not truth;
- agents load only the context needed for the current step;
- a database may hold runtime/session state but must not become the only copy of project truth.

## Work states

PARÉ distinguishes generated work from approved work.

| State | Meaning |
|---|---|
| Draft | Generated; not approved or canonical |
| Candidate | Creator checks passed |
| Verified | Evidence/validation passed |
| Approved | Required human/gate accepted it |
| Canonical | Approved project truth |
| Official | Canonical + validated + approved package |
| Preview | Non-production external view |
| Published | Released externally |
| Production | Live authoritative system |

AI alone cannot make work Official.

## Execution

PARÉ is runtime-neutral.

It may use supported engines such as Codex, Claude Code, Gemini, OpenCode, Hermes, Pi, DeepSeek Harness, or compatible endpoints. These are execution choices, not product identity.

**PARÉ is the product. The runtime is replaceable.**

OpenCode is a real third-party runtime name and remains OpenCode wherever the user is selecting, installing, diagnosing, or configuring that runtime.

## Machine access

External agents use semantic machine interfaces rather than clicking React controls.

Supported compatibility doors include:

- `od` CLI;
- MCP;
- authenticated daemon HTTP `/api/*`;
- authorized folder-backed filesystem access.

All doors operate on the same project and should return structured results or receipts.

Required operations:

- list/open project;
- inspect scoped project context;
- read files/artifacts;
- start work;
- stream status;
- inspect output;
- request validation;
- inspect approval state;
- export/deliver.

## Human gates

PARÉ can research, generate, critique, repair, validate, and prepare.

Explicit human authority is required for:

- selecting materially different creative territories;
- final canonical identity;
- external publishing;
- production promotion;
- irreversible actions;
- legal, licensing, or trademark judgment.

## Brand workflow

For governed identity work:

```text
intake
  ↓
strategy
  ↓
governing idea
  ↓
creative territories
  ↓
distinctiveness
  ↓
HUMAN TERRITORY SELECTION
  ↓
identity
  ↓
behavior
  ↓
application stress test
  ↓
commercial desirability
  ↓
Guardian
  ↓
Gauntlet
  ↓
Proof
  ↓
delivery / publish
```

## Quality

The builder does not grade itself.

Serious work uses a fresh critic and direct comparison against a named, fetchable quality bar. The loop repairs the single largest gap, re-runs the evidence, and stops at a hard gate or owner decision.

No fake success states.

A running service is not proof that the product works. A generated artifact is not proof that the artifact is good. A deploy is not complete until the intended surface is verified.

## Public story

The landing experience demonstrates the product through subtraction.

A typographic field contains PARÉ inside visual noise. Scroll removes what is unnecessary until the word remains. The sequence then moves through definition, the Saint-Exupéry principle, removal of interface noise, and into the Studio.

No feature-card wall. No generic AI-platform language. No model-logo hero. No decorative motion without meaning.

See `docs/pare/design/LANDING_STORY_LOCK.md`.

## Deployment

The web surface and privileged runtime are separate responsibilities.

### Web

Netlify or Vercel may host the browser-facing Studio and public landing surface.

### Persistent runtime

An owner-controlled VPS runs the privileged daemon/execution plane when PARÉ needs:

- long-running agent sessions;
- process spawning and CLI detection;
- persistent project files;
- streaming;
- artifact/export generation;
- server-side credentials;
- authenticated machine access.

The browser host is replaceable. The project is not.

See `docs/pare/DEPLOYMENT.md`.

## Security

- Never expose the privileged daemon publicly without authentication.
- Never commit provider credentials.
- Never send server secrets to browser JavaScript.
- Scope filesystem access to the active project/workspace.
- Preserve sandbox, SSRF, and runtime permission boundaries.
- Record consequential machine actions and approvals.
- Require explicit authority for publish, production, irreversible, and legal-sensitive actions.

## Rebrand boundary

The user-facing product name is **PARÉ**.

Legacy product branding must not appear in rendered application copy, onboarding, dialogs, popovers, help text, invitations, loading states, or marketing surfaces.

Compatibility internals are not renamed merely for appearance. Package namespaces, storage keys, API contracts, CLI compatibility names, and third-party runtime names remain stable where changing them would break the system or misrepresent another project.

This is a product rebrand, not a destructive protocol rename.

## Acceptance — human

From phone and desktop, the owner can:

1. open PARÉ;
2. open/create/import a project;
3. enter a natural-language request;
4. see progress;
5. see an artifact on the live canvas;
6. refine it;
7. see project files persist;
8. run validation;
9. approve when required;
10. export or prepare the result for release.

## Acceptance — agent

A separate approved agent can:

1. connect through a machine interface;
2. discover a project;
3. inspect scoped context;
4. start or inspect work without rendering the UI;
5. observe the resulting artifact and receipt;
6. see the same canonical files the human sees in Studio.

## Non-goals

- a second agent framework;
- a second project truth store;
- mandatory cloud membership to own work;
- public multi-tenant billing before the owner-use runtime is proven;
- cosmetic renaming of compatibility identifiers that would break upstream behavior;
- making a serverless web host the privileged agent runtime.

## Definition of done

PARÉ is release-ready when:

- the rendered app is consistently PARÉ-branded;
- the landing story performs the subtraction concept;
- the Studio remains functional;
- projects remain portable;
- human and machine access resolve to the same project;
- mobile is usable, not merely responsive;
- critical flows pass automated checks;
- the exact release build has a browser-viewable preview;
- production promotion remains an explicit owner action.
