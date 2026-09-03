<div align="center">

# PARÉ

### Brand systems, reduced to what matters.

**An open-source design operating system for humans and agents.**

[Studio](https://pauli-para.netlify.app/) · [Landing experience](https://pauli-para.netlify.app/pare-preview/) · [Product requirements](docs/pare/PRD.md) · [Deployment](docs/pare/DEPLOYMENT.md)

</div>

---

## Why PARÉ

**pare** /per/  
*verb* — to reduce by removing what is unnecessary.

PARÉ applies that principle to design software itself.

Most creative systems grow by addition: more panels, more models, more menus, more prompts, more dashboards, more layers between the person and the work. PARÉ starts from the opposite direction.

**Remove what does not serve the idea. Keep what helps the work become clearer, stronger, more useful, and easier to own.**

The philosophy is close to the Saint-Exupéry principle that a thing approaches perfection when there is nothing unnecessary left to remove.

That is not only the visual language of PARÉ. It is the operating model.

- strategy before styling;
- outcomes before infrastructure choices;
- evidence before claims;
- files before lock-in;
- human judgment where judgment matters;
- automation where repetition does not;
- fewer surfaces, with more capability underneath them.

PARÉ is designed to feel simple to the person using it while remaining powerful enough for serious agent-driven work behind the interface.

---

## What PARÉ is

PARÉ is an **installable, owner-controlled brand and design operating environment** built on the open-source OpenDesign runtime.

It keeps the strongest parts of that foundation — chat, live artifacts, design systems, skills, coding-agent adapters, CLI, MCP, filesystem-backed projects, and the local daemon — and adds a governed Pauli operating layer around them:

- **One Hands** — the human-facing operator that turns natural requests into routed work;
- **ICM** — a portable project-memory and filesystem architecture;
- **PARÉ skills** — brand discovery, creative direction, subtraction, humanization, SEO, SVG engineering, delivery, and more;
- **Guardian / Gauntlet / Proof** — independent critique, validation, and completion gates;
- **human approvals** — explicit gates for consequential creative, publishing, production, legal, and irreversible decisions;
- **sovereign deployment** — the UI can live on a web host while the privileged runtime and project truth stay on infrastructure you control.

PARÉ is **not** a new agent framework and it is **not** a closed AI design SaaS wrapped around a proprietary database.

It is the governed operating layer around a real design runtime.

---

## The core experience

A person should be able to open PARÉ and say:

> Build the official brand for this company.

or:

> Make this direction feel more institutional and less startup.

or:

> Audit this landing page and fix the largest gap.

PARÉ handles the machinery underneath.

The human experience is intentionally small:

```text
+---------------------------------------------------------------+
| PARÉ                     Company / Project                    |
+------------------------+--------------------------------------+
| ONE HANDS              | LIVE CANVAS                          |
| conversation           | HTML / SVG / deck / visual output   |
| attachments            | responsive preview                  |
| project context        | inspect / compare / refine           |
| run progress           | files / artifact tabs               |
+------------------------+--------------------------------------+
| Project · Strategy · Assets · Proof · Approvals · Export     |
+---------------------------------------------------------------+
```

On mobile, the system reduces further:

**Chat · Canvas · Project**

The goal is not to hide capability. The goal is to hide **unnecessary complexity**.

---

## One Hands

**One Hands** is the primary human-facing operator inside PARÉ.

It is a routing and policy layer, not another agent runtime.

One Hands can:

- inspect the active project;
- understand the requested outcome;
- assemble the smallest useful context;
- route to the appropriate skill and available agent runtime;
- create candidate work;
- stream progress into the Studio;
- request critique and validation;
- repair bounded failures;
- prepare previews, exports, and receipts;
- stop when a real human decision is required.

The user should not have to decide which internal tool, prompt chain, model provider, or filesystem path is necessary before asking for the work.

**Ask for the outcome. PARÉ coordinates the sequence.**

---

## One request. Many engines.

PARÉ is runtime-neutral by design.

It reuses the agent adapters already supported by the underlying OpenDesign architecture and can work with compatible runtimes such as:

- Codex;
- Claude Code;
- Gemini;
- OpenCode;
- Hermes;
- Pi;
- DeepSeek Harness;
- Cursor and other supported coding-agent CLIs;
- OpenAI-compatible endpoints through BYOK where appropriate.

The operating system stays consistent even when the execution engine changes.

That separation matters: **your design process should not belong to one model vendor.**

---

## Humans and agents use the same project

PARÉ is designed so the visual Studio is not the only way into the system.

A human can work through the browser or desktop interface while an external agent can operate on the same project through machine interfaces.

Canonical machine doors include:

```text
PARÉ Studio UI
      │
      ├── od CLI
      ├── MCP
      ├── daemon HTTP /api/*
      └── authorized filesystem access
              │
              ▼
        SAME PROJECT
        SAME FILES
        SAME RECEIPTS
```

This makes PARÉ useful as both a product and an infrastructure layer.

Cosmos, Codex, Claude, Gemini, OpenCode, Hermes, Pi, or another approved orchestrator should be able to call PARÉ without pretending to be PARÉ.

---

## Projects are portable by design

PARÉ uses folder-backed projects. The project filesystem is the durable source of truth.

A typical governed brand project looks like:

```text
project/
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

The rules are intentionally simple:

- one fact has one canonical home;
- one folder has one job;
- context is loaded only when needed;
- strategy explains *why*;
- `DESIGN.md` explains *how the visual system behaves*;
- approvals and evaluations leave receipts;
- generated indexes are not treated as truth;
- no proprietary database is the only copy of the project.

This is the ICM layer inside PARÉ.

---

## The PARÉ brand workflow

For governed identity and rebrand work, PARÉ follows a deliberate sequence:

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

PARÉ can research, generate, critique, repair, validate, and prepare.

It does **not** silently approve itself.

Human approval remains explicit for materially different creative directions, final canonical identity, external publishing, production promotion, irreversible actions, and legal/licensing/trademark judgment.

---

## Draft is not Official

PARÉ uses explicit status language because generated work and approved work are not the same thing.

| State | Meaning |
|---|---|
| **Draft** | Generated, not approved or canonical |
| **Candidate** | Creator checks passed |
| **Verified** | Evidence/validation passed |
| **Approved** | Human or required gate accepted it |
| **Canonical** | Approved project truth |
| **Official** | Canonical + validated + approved package |
| **Preview** | Non-production external view |
| **Published** | Externally released |
| **Production** | Live authoritative system |

AI alone cannot make work **Official**.

---

## Design philosophy

The public PARÉ experience follows the same rule as the product.

The landing page begins with a typographic field. The word **PARÉ** is hidden inside noise. As the visitor scrolls, unnecessary letters recede until only the meaningful word remains.

That interaction is not decoration. It is the thesis:

**noise → recognition → meaning → product**

The visual laws are equally strict:

- typography carries the idea;
- negative space is structural;
- motion reveals meaning rather than decorating the screen;
- no generic SaaS hero;
- no feature-card wall;
- no gradient-blob filler;
- no model-logo strip as a substitute for product value;
- mobile preserves the concept rather than shrinking desktop;
- generated media is added only when the story actually needs it.

See [`docs/pare/design/LANDING_STORY_LOCK.md`](docs/pare/design/LANDING_STORY_LOCK.md).

---

## Architecture

PARÉ separates the browser-facing experience from the privileged execution plane.

```text
                        PARÉ
                         │
          ┌──────────────┴──────────────┐
          │                             │
      WEB / STUDIO                 MACHINE ACCESS
      Netlify/Vercel             MCP · API · CLI
          │                             │
          └──────────── HTTPS ──────────┘
                         │
                         ▼
                OWNER-CONTROLLED VPS
                         │
                    PARÉ daemon
                         │
          ┌──────────────┼──────────────┐
          │              │              │
      One Hands      agent adapters     ICM
          │              │              │
          └────── same project/files ───┘
```

The web host is replaceable.

The daemon owns the responsibilities that actually require a persistent machine:

- long-running agent sessions;
- process spawning and CLI detection;
- streaming;
- filesystem access;
- artifact/export generation;
- persistent runtime state;
- server-side credentials.

The browser host should never become the canonical project store or privileged agent runtime.

---

## Open source, not hostageware

PARÉ is intended to remain genuinely useful when self-hosted.

The open-source edition is not a deliberately crippled lead-generation shell.

You should be able to:

- run it yourself;
- bring your own supported agents and model credentials;
- keep projects as ordinary files;
- use CLI/MCP/API interfaces;
- move your work to infrastructure you control.

A future **PARÉ Cloud** can add convenience — hosted runtime, accounts, teams, encrypted secret management, managed execution, collaboration, usage metering, hosted MCP, and subscriptions — without making cloud membership the condition for owning your work.

**Hosted should mean easier, not captive.**

---

## ChatGPT, Claude, and external assistants

A major direction for PARÉ is to expose the design operating system as a real external service, not merely as a folder of prompts.

The target experience is simple:

> Use PARÉ to build the brand system for this company.

An assistant should be able to call PARÉ through scoped semantic tools, operate on a real project, return artifacts and validation results, pause for approvals, and let the same project open visually inside PARÉ Studio.

The same runtime should support:

- the full Studio;
- self-hosted use;
- remote MCP;
- authenticated API access;
- ChatGPT integrations where supported;
- Claude integrations where supported;
- orchestrators such as Cosmos.

No second backend should be required just to become an integration.

---

## Development principles

PARÉ follows a few non-negotiable engineering rules.

### Reuse before addition

Before adding another service, framework, database, agent runtime, or abstraction, ask whether the capability already exists in the platform.

### Subtract before polishing

If a component, dependency, piece of copy, or workflow step does not materially improve the outcome, remove it.

### Truth stays portable

Runtime/session state may live in databases. Canonical strategy, assets, approvals, and project truth remain exportable files.

### No fake success

A running container is not the same as a working product. A generated artifact is not the same as approved work. A deploy is not done until it is verified.

### Creator and critic are different jobs

Serious design work runs through independent critique and the Gauntlet rather than letting the builder grade itself.

---

## Repository map

```text
apps/
├── web/                 # PARÉ / OpenDesign product UI
├── daemon/              # privileged persistent runtime
└── landing-page/        # standalone marketing surface where used

packages/                # shared contracts, components, tools
plugins/                 # scenario/plugin definitions
skills/                  # filesystem-based skills, including PARÉ skills

docs/pare/
├── PRD.md               # product architecture and acceptance criteria
├── DEPLOYMENT.md        # web / VPS deployment model
├── SERVER_RUNBOOK.md    # server operations when present
├── SECRETS.md           # secret/bootstrap model when present
└── design/              # locked design directions and evidence
```

Technical `@open-design/*` namespaces remain where they are part of the upstream architecture. PARÉ does not rename internals merely for cosmetic rebranding.

---

## Current public surfaces

- **Studio / current web build:** https://pauli-para.netlify.app/
- **PARÉ landing experience:** https://pauli-para.netlify.app/pare-preview/
- **Repository:** https://github.com/executiveusa/PARE

The public landing experience and Studio runtime can evolve independently. The design layer should never require rewriting the execution engine.

---

## Run locally

PARÉ inherits the OpenDesign monorepo and local-first runtime model.

Start by reading:

- [`QUICKSTART.md`](QUICKSTART.md)
- [`docs/pare/PRD.md`](docs/pare/PRD.md)
- [`docs/pare/DEPLOYMENT.md`](docs/pare/DEPLOYMENT.md)

Typical repository setup uses the existing pnpm workspace and the `od` daemon/CLI path. Do not expose the daemon unauthenticated to the public internet.

For external agents, prefer semantic CLI/MCP/API operations over automating the React interface.

---

## Security model

PARÉ treats the daemon as privileged infrastructure.

- never expose the daemon publicly without authentication;
- never commit provider credentials;
- never send server secrets to browser JavaScript;
- scope filesystem access to the active project/workspace;
- preserve sandbox and SSRF protections;
- separate read/write/publish/admin authority;
- record approval and consequential machine actions;
- require explicit authority for publish, production, irreversible, and legal-sensitive actions.

---

## Upstream and license

PARÉ is built from and remains indebted to the open-source **OpenDesign** project and its agent-native design runtime.

Upstream project: [`nexu-io/open-design`](https://github.com/nexu-io/open-design)

PARÉ preserves upstream technical architecture and attribution where applicable rather than pretending the underlying runtime was created from scratch.

Licensed under **Apache-2.0**. See [`LICENSE`](LICENSE) and existing upstream notices for details.

---

<div align="center">

## PARÉ

**Remove what does not serve the idea.**

Open source. Owner controlled. Agent compatible.

</div>
