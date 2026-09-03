<div align="center">

# PARÉ

**Ask for the outcome. Keep the work.**

[Public experience](https://pauli-para.netlify.app/pare-preview/) · [Studio](https://pauli-para.netlify.app/) · [Product requirements](docs/pare/PRD.md) · [Deployment](docs/pare/DEPLOYMENT.md)

</div>

---

## pare /per/

*verb* — to reduce by removing what is unnecessary.

PARÉ applies that rule to the product itself.

A person can arrive with an outcome:

> Build the brand.

> Turn this brief into three real directions.

> Audit this page and fix the largest gap.

PARÉ handles project context, skills, runtime choice, creation, critique, evidence, approvals, and delivery underneath the request.

The interface reveals that machinery only when it helps the work.

---

## Studio

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

On a phone:

**Chat · Canvas · Project**

The Studio is one door into the project. Machines use semantic interfaces against the same files and receipts.

---

## Runtime-neutral

PARÉ can route work through supported runtimes such as Codex, Claude Code, Gemini, OpenCode, Hermes, Pi, DeepSeek Harness, or compatible endpoints.

OpenCode remains named **OpenCode** because it is a real third-party runtime.

**PARÉ is the product. The runtime is replaceable.**

---

## Ownership

**Your projects.**  
**Your files.**  
**Your agents.**  
**Your infrastructure.**

Projects are folder-backed and portable. Strategy, assets, approvals, and evidence do not have to exist only inside a proprietary database.

Hosted infrastructure may make PARÉ easier to operate. It does not become the only copy of the work.

---

## Project structure

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

Rules:

- one fact has one canonical home;
- one folder has one job;
- strategy explains why;
- design files explain how the selected visual system behaves;
- approvals and evaluations leave receipts;
- generated indexes are not project truth.

---

## From request to official work

```text
intake
  ↓
strategy
  ↓
governing idea
  ↓
creative directions
  ↓
human selection
  ↓
design
  ↓
application stress test
  ↓
independent critique
  ↓
validation
  ↓
proof
  ↓
delivery / publish
```

PARÉ can create, inspect, critique, repair, validate, and prepare. It does not silently promote its own work to official status.

| State | Meaning |
|---|---|
| **Draft** | Generated, not approved |
| **Candidate** | Creator checks passed |
| **Verified** | Evidence checks passed |
| **Approved** | Required human/gate accepted it |
| **Canonical** | Approved project truth |
| **Official** | Canonical, validated package |
| **Preview** | Non-production external view |
| **Published** | Externally released |
| **Production** | Live authoritative system |

---

## Human and machine access

```text
PARÉ Studio
    │
    ├── od CLI
    ├── MCP
    ├── authenticated daemon API
    └── authorized filesystem access
             │
             ▼
       SAME PROJECT
       SAME FILES
       SAME RECEIPTS
```

Compatibility names such as the `od` CLI, `@open-design/*` packages, legacy storage keys, and protocol contracts remain where changing them would break the runtime. They are implementation details, not the user-facing product name.

---

## Deployment

The browser and privileged runtime are separate responsibilities.

```text
browser / desktop
       │
       ▼
   PARÉ Studio
       │
 authenticated HTTPS
       │
       ▼
 persistent runtime
       │
 ┌─────┼──────────────┐
 │     │              │
files  agent CLIs   runtime state
 │     │              │
 └──── same project ──┘
```

Netlify, Vercel, or another host can serve the browser surface. Long-running sessions, process spawning, privileged filesystem access, exports, and server credentials belong on a persistent owner-controlled machine or managed runtime.

---

## Public experience

The landing page performs the product idea.

A field of letters contains **PARÉ**. Scrolling removes what does not belong until the word resolves. Definition, Saint-Exupéry, interface noise, and the Studio continue the same subtraction language.

Motion communicates change. If it only decorates the page, remove it.

---

## Run locally

Start with:

- [`QUICKSTART.md`](QUICKSTART.md)
- [`docs/pare/PRD.md`](docs/pare/PRD.md)
- [`docs/pare/DEPLOYMENT.md`](docs/pare/DEPLOYMENT.md)

The monorepo uses the existing pnpm workspace and `od` CLI/daemon compatibility path.

Do not expose the privileged runtime publicly without authentication.

---

## Upstream and license

PARÉ is derived from the Apache-2.0 **OpenDesign** project. The upstream name remains only where attribution, notices, or technical compatibility require it.

Upstream: [`nexu-io/open-design`](https://github.com/nexu-io/open-design)

License: [`Apache-2.0`](LICENSE)
