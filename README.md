<div align="center">

# PARÉ

### Remove what does not serve the idea.

**Open-source design software for people who want the outcome without carrying the machinery.**

[Public experience](https://pauli-para.netlify.app/pare-preview/) · [Studio](https://pauli-para.netlify.app/) · [Architecture](docs/pare/PRD.md) · [Deployment](docs/pare/DEPLOYMENT.md)

</div>

---

## The concept

**pare** /per/  
*verb* — to reduce by removing what is unnecessary.

PARÉ applies that rule to the product itself.

A person should be able to arrive with an outcome:

> Build the brand.

> Turn this brief into three real directions.

> Audit this page and fix the largest gap.

PARÉ handles the route underneath: project context, skills, agent choice, creation, critique, evidence, approvals and delivery.

The interface does not need to expose all of that at once.

**Lead with the outcome. Reveal complexity only when it helps.**

---

## The Studio

The primary experience is intentionally small:

```text
+---------------------------------------------------------------+
| PARÉ                     Company / Project                    |
+------------------------+--------------------------------------+
| CONVERSATION           | LIVE CANVAS                          |
| request / history      | HTML / SVG / deck / visual output   |
| attachments            | responsive preview                  |
| project context        | inspect / compare / refine           |
| run progress           | files / artifact tabs               |
+------------------------+--------------------------------------+
| Project · Strategy · Assets · Proof · Approvals · Export     |
+---------------------------------------------------------------+
```

On a phone it reduces to:

**Chat · Canvas · Project**

The Studio is the human surface. The project remains usable by machines through semantic interfaces.

---

## One Studio. Infinite possibilities.

PARÉ does not depend on one execution engine.

Supported runtime paths include Codex, Claude Code, Gemini, OpenCode, Hermes, Pi, DeepSeek Harness and other compatible agent CLIs. BYOK and compatible model endpoints can be used where the runtime supports them.

OpenCode remains named **OpenCode** because it is a real third-party runtime. PARÉ branding does not rename external tools.

The product stays PARÉ. The engine can change.

---

## Your work stays yours

**Your projects.**  
**Your files.**  
**Your agents.**  
**Your infrastructure.**

Projects are folder-backed and portable. Strategy, assets, approvals and evidence do not have to live only inside a proprietary database.

You can host PARÉ yourself or use managed infrastructure when available. Hosted use is convenience, not ownership.

No lock-in. Export the project and its data.

---

## Project structure

A governed project can use the ICM layout:

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

The rules are simple:

- one fact has one canonical home;
- one folder has one job;
- context is loaded when needed;
- strategy explains why;
- `DESIGN.md` explains how the selected visual system behaves;
- approvals and evaluations leave receipts;
- generated indexes are not treated as project truth.

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

PARÉ can create, inspect, critique, repair and prepare. It does not silently promote its own work to official status.

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

The visual interface is one door into the project, not the project itself.

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

Technical compatibility names such as the `od` CLI, `@open-design/*` packages, legacy storage keys and protocol contracts remain where changing them would break the runtime. They are implementation details, not the user-facing product name.

---

## Architecture

The browser and the privileged execution plane are separate on purpose.

```text
browser / desktop
       │
       ▼
   PARÉ Studio
       │
 authenticated HTTPS
       │
       ▼
 persistent daemon
       │
 ┌─────┼──────────────┐
 │     │              │
files  agent CLIs   runtime state
 │     │              │
 └──── same project ──┘
```

The web surface can run on Netlify, Vercel or another host. Long-running sessions, process spawning, privileged filesystem access, exports and server credentials belong on a persistent owner-controlled machine or managed runtime.

The browser does not get raw shell authority or server secrets.

---

## Public experience

The landing page performs the same idea as the product.

A field of letters contains **PARÉ**. Scrolling removes what does not belong until the word resolves. The definition, Saint-Exupéry principle, complexity field and final Studio entrance continue the same subtraction language.

Motion must communicate change. If motion is only decoration, remove it.

The current public surfaces are:

- **Landing:** https://pauli-para.netlify.app/pare-preview/
- **Studio:** https://pauli-para.netlify.app/
- **Repository:** https://github.com/executiveusa/PARE

---

## Run locally

Start with:

- [`QUICKSTART.md`](QUICKSTART.md)
- [`docs/pare/PRD.md`](docs/pare/PRD.md)
- [`docs/pare/DEPLOYMENT.md`](docs/pare/DEPLOYMENT.md)

The monorepo uses the existing pnpm workspace and `od` CLI/daemon compatibility path.

Do not expose the privileged daemon to the public internet without authentication.

---

## Security

- no provider secrets in browser JavaScript;
- no raw public shell execution;
- project filesystem access is scoped;
- publish, production and irreversible actions require the appropriate approval;
- sandbox and SSRF boundaries stay intact;
- consequential actions leave evidence.

---

## Upstream and license

PARÉ is derived from the Apache-2.0 **OpenDesign** project. The upstream name remains in attribution, notices and technical compatibility surfaces where required.

Upstream: [`nexu-io/open-design`](https://github.com/nexu-io/open-design)

License: [`Apache-2.0`](LICENSE)

---

<div align="center">

# PARÉ

**Lead with the outcome.**

</div>
