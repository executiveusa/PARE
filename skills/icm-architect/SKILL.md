---
name: icm-architect
description: |
  Design or restructure a project into an ICM (Interpretable Context Methodology) workspace where folder structure, small CONTEXT contracts, and plain files carry sequencing, context and state. Use for agent-runnable workspaces, project restructuring, knowledge organization, or when asked to "ICM this".
triggers:
  - "ICM this"
  - "structure this for agents"
  - "build me a workspace"
  - "restructure this project"
  - "organize this into ICM"
od:
  mode: utility
  category: design-systems
  upstream: "https://github.com/RinDig/icm-architect"
---

# ICM Architect

Source method: **Interpretable Context Methodology** (Van Clief & McDermott, arXiv:2603.16021). This PARÉ integration is adapted from the user-supplied MIT-licensed `icm-architect` bundle. ICM is used here as a **filesystem contract**, not as a new runtime framework or database.

The workspace is a library. Routing files are the catalog: small, stable, and almost content-free. Stage folders and project files are the shelves. One agent walks only the shelves required for the current task.

## PARÉ/Open Design mapping

- The active Open Design **folder-backed project root is the ICM root**.
- Do not create a second project store or mirror unless a transport explicitly needs a cache/index.
- Open Design owns chat, preview, artifact rendering, daemon lifecycle, agent adapters, CLI/MCP/API transport and run streaming.
- ICM owns project structure, scoped context, canonical editable files and handoff state.
- Database/session indexes may point at project files; they do not become the only copy of project truth.

## Ten invariants

1. **One folder, one job.** Each folder performs one step or holds one kind of thing.
2. **Small stable entry file.** Root `AGENTS.md` answers where am I and where do I go. Target under ~60 lines. It routes; it does not carry project payload.
3. **Numbering encodes order.** Use numbered folders when sequence matters.
4. **Folder contracts are explicit.** Every working folder has `CONTEXT.md`: exact inputs, process, outputs and one human check.
5. **Factory vs product.** Stable rules/templates/voice/schemas live apart from run-specific drafts and outputs.
6. **Every output is an edit surface.** Intermediate state is a plain file a human or authorized agent can inspect and edit.
7. **Load only what the step needs.** Read the current contract plus explicitly named references and inputs; do not preload the whole project.
8. **Plain text, linkable, queryable.** Prefer Markdown/JSON/YAML and ordinary assets. One canonical home per fact; link instead of copy.
9. **Filesystem is the project state machine.** Status should be derivable from files and receipts. Generated indexes are rebuilt, never hand-maintained.
10. **Instantiate by copying a proven template.** Do not create speculative empty structure.

## PARÉ brand-project form

Use this form only when the actual work requires these stages. Remove unused stages rather than keeping empty architecture.

```text
<project-root>/
├── AGENTS.md
├── CONTEXT.md
├── 00_intake/
│   ├── CONTEXT.md
│   ├── brief.md
│   ├── constraints.md
│   └── assets/
├── 10_strategy/
│   ├── CONTEXT.md
│   ├── research/
│   ├── positioning.md
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
├── _shared/
└── _ledger/
    ├── work-orders/
    ├── approvals/
    ├── evaluations/
    └── events.jsonl
```

## Stage contract

Each working `CONTEXT.md` stays short:

```markdown
# 20_design — turn approved strategy into a working brand system

One job: create and stress-test the selected design direction.

## Inputs
- Working: ../10_strategy/brand-manifest.json
- Working: ../10_strategy/positioning.md
- Reference: ../_shared/rights-and-provenance.md

## Process
1. Read only the named inputs and routed design skills.
2. Create candidate work inside this stage.
3. Record evidence needed by validation.

## Outputs
- directions/selected/
- tokens/
- mockups/

## Human check
Inspect the selected direction and edit/approve the stage output before consequential promotion.
```

## Context hierarchy

- **L0 `AGENTS.md`** — where am I? routing only.
- **L1 root `CONTEXT.md`** — where do I go?
- **L2 stage `CONTEXT.md`** — what do I do? This is the control point.
- **L3 `_shared/`, references, rules** — stable factory context.
- **L4 stage artifacts** — current product/run state.

Healthy task context is roughly 2k–8k tokens. If a stage repeatedly exceeds that range, split the job or narrow its explicit inputs.

## Build mode

1. Extract the real repeating unit, stages, human gates, stable rules and definition of done from the user's workflow.
2. Choose the smallest useful form: pipeline, umbrella, record library, knowledge bundle or context map.
3. Scaffold only real stages.
4. Write routing and stage contracts.
5. Run the cold walk test.

## Restructure mode

1. Inventory before moving anything.
2. Find the hidden form already present in the workspace.
3. Classify existing files as catalog / contract / factory / product / dead.
4. Produce an old-path -> new-path migration map before destructive movement.
5. Move/copy with one-home-per-fact; archive rather than silently delete.
6. Run the cold walk test.

## Cold walk test

Act like an agent with no memory:

- From root `AGENTS.md` plus at most two routed reads, can you identify the project and correct current working area?
- Does each stage contract name exact input paths, one job, explicit outputs and one human check?
- Can project status be inferred from files/receipts?
- Is any routing file carrying payload that belongs on a shelf?
- Is the same fact manually duplicated?
- Is the loaded context bounded to the current task?

If not, fix the structure rather than adding explanatory prose elsewhere.

## Where ICM deliberately loses

Do not overclaim the method. Use the existing Open Design runtime/framework when the problem requires:
- real-time multi-agent collaboration;
- high-concurrency multi-user serving;
- queueing/process supervision;
- automated mid-pipeline branching;
- streaming tool execution.

ICM complements that runtime by keeping durable project truth inspectable and portable.

## Subtraction rule

Before adding an ICM folder, contract, script or adapter:
1. Does it need to exist?
2. Does this repository already solve it?
3. Can native filesystem/platform behavior solve it?
4. Can an installed Open Design capability solve it?
5. Only then add the minimum.

Never remove security, validation, accessibility, provenance, recovery or human authority merely to reduce structure.