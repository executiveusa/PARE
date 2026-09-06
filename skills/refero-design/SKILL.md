---
name: refero-design
description: "Research-first methodology for UI, product, web, landing-page, dashboard, redesign, visual polish, frontend styling, design systems, components, responsive design, typography, color, spacing, motion, icons, accessibility, copywriting, conversion, and anti-AI-slop work. Ground major design decisions in references before implementation, lock one dominant direction, and validate rendered output against the lock."
triggers:
  - design this
  - redesign this
  - improve this interface
  - visual polish
  - landing page
  - dashboard
  - UI audit
  - design system
  - typography
  - color system
  - responsive design
  - visual QA
od:
  mode: utility
  category: creative-direction
---

# Refero Design — extracted research-first workflow

## Purpose
Give engineering agents a design methodology that is based on evidence and reference locks instead of generic model taste.

## Non-negotiables
- Research before substantial visual design work.
- Study several strong references; never copy one reference.
- Do not average conflicting references into a safe middle. Choose one dominant direction and preserve its sharp traits.
- Major layout, visual, content, and interaction decisions must trace to the brief, a reference, existing product truth, or an explicit craft rule.
- Synthesize before implementation: concept → token direction → decision ledger → build.
- A brief alone is not a build target. Lock a user-provided source, existing system, selected visual direction, or explicit reference-locked direction first.
- Preserve the role of imagery. Do not replace image-dependent reference behavior with weak decorative CSS.
- Validate rendered work against the lock after implementation.
- Do not hand off unresolved P0/P1/P2 design drift unless blocked and documented.

## Research layers
Use the smallest set required:
1. **Styles** — visual direction, typography, palette, spacing, surfaces, section rhythm, imagery treatment.
2. **Screens** — concrete UI patterns, hierarchy, forms, tables, pricing, empty states, settings, dashboards, dialogs.
3. **Flows** — multi-step journey logic such as onboarding, checkout, billing, cancellation, account changes, and recovery.

When live Refero MCP is available, use it. When it is not, use project references, user-provided references, screenshots, existing design systems, and explicit craft rules while keeping the same reference-lock discipline.

## Discovery brief
Before research, establish only what materially changes the design:

```text
Designing [WHAT] for [WHO] on [PLATFORM].
Goal: [PRIMARY USER GOAL].
Tone: [DESIRED FEELING].
Main objection/risk: [OBJECTION].
Must remember: [DISTINCTIVE IDEA].
Constraints: [CONSTRAINTS].
Research needed: [styles/screens/flows].
Path: [direct build / visual exploration / audit / asset generation].
```

Do not turn discovery into a questionnaire when the repository or brief already answers the question.

## Workflow routing
### Direct build
For small UI fixes, clear production edits, existing design-system work, or concrete targets. Research enough to lock the direction, then make the smallest implementation.

### Visual exploration
For new visual languages, major redesigns, landing pages, or high-visibility surfaces with multiple plausible directions. Default to three meaningfully different, reference-locked options. A human chooses the direction before expensive implementation.

### Audit
Capture the actual current state first. Compare screenshots, behavior, content hierarchy, responsive behavior, accessibility, and product intent against relevant references and project rules.

### Asset generation
Use generated imagery only when the reference lock requires bitmap media that code, icons, or existing assets cannot faithfully provide.

## Reference research loop
1. Form the brief.
2. Research 3–5 different angles.
3. Open 3–4 strong references.
4. Record what each contributes.
5. Choose one primary foundation.
6. Borrow only 1–2 narrow details from secondary references.
7. Write a reference lock.
8. Build a decision ledger.
9. Implement.
10. Render and compare.
11. Repair drift.
12. Run independent quality gates.

## Reference lock format
```text
Primary reference/direction: [ONE DOMINANT FOUNDATION].
Preserve: [SIGNATURE TRAITS].
Borrow only: [NARROW SECONDARY DETAILS].
Role rules: [WHAT EACH TOKEN/COMPONENT/MEDIA TREATMENT IS FOR].
Media strategy: [REAL/GENERATED/PLACEHOLDER RULE].
Reject: [TRAITS THAT WOULD PULL THE WORK INTO A DIFFERENT DIRECTION].
Token commitments: [TYPE / COLOR / RADIUS / SPACING / SURFACE / MOTION].
```

## Design decision ledger
For each major choice record:
- area;
- decision;
- source;
- source rule/role;
- why it serves the user/business outcome.

This ledger is the guard against design-by-vibe and accidental averaging.

## Anti-AI-slop gate
Challenge:
- generic centered hero + gradient blob;
- interchangeable SaaS bento grids;
- endless rounded cards;
- glassmorphism without product reason;
- fake product screenshots;
- invented metrics/testimonials;
- arbitrary shadows and glow;
- excessive pills;
- random icon decoration;
- animations that delay use;
- vague copy and unsupported superlatives;
- stock-tech/AI-brain imagery;
- visual complexity that does not improve understanding.

Distinctiveness must come from product truth, positioning, culture, proprietary assets, language, behavior, meaningful constraints, and a governing creative idea.

## Craft checks
### Typography
Use a deliberate type hierarchy, readable body size/line length, disciplined weights, consistent optical spacing, and appropriate numerals/data treatment. Do not use typography as decoration that harms scanning.

### Color
Assign semantic roles. Preserve contrast. Use accent color deliberately. Do not change token meanings because another reference looks attractive.

### Motion
Motion communicates hierarchy, orientation, state, feedback, continuity, or brand behavior. Remove motion that communicates nothing. Support reduced motion.

### Icons
Use icons for recognition, action, state, or navigation. Maintain one coherent icon language. Avoid icons as filler.

### Copy
Prefer concrete human language, exact actions, evidence, and natural rhythm. Copy should reduce uncertainty, not advertise the intelligence of the system.

### Craft detail
Inspect spacing, alignment, hit areas, focus, hover/pressed/disabled states, overflow, truncation, responsive ordering, empty/loading/error states, and edge-case polish.

## Visual QA severity
- **P0** — broken task, unreadable/overlapping UI, severe accessibility problem.
- **P1** — major design drift or likely user-facing usability regression.
- **P2** — moderate visual mismatch, missing state, responsive problem, asset drift.
- **P3** — polish that may follow after handoff.

Do not claim visual work complete while known P0/P1/P2 items remain unresolved unless the missing evidence or external blocker is explicitly recorded.

## Relationship to other skills
This skill owns research methodology and reference locking. It does not replace repository architecture, security, accessibility, proof, rollback, engineering, or owner-control laws. Combine it with `adhd-elegant-simplicity` for human-interface reduction and with repository-local engineering/validation skills for implementation.

## Source provenance
Extracted and adapted from the uploaded `refero_skill-master` package (MIT-licensed upstream package) for native PARE functional-skill routing. The source package included dedicated modules for anti-AI-slop, color, copywriting, craft details, example workflow, icons, MCP tooling, motion, typography, and visual workflow; those concerns are consolidated here into one lazy-loadable runtime skill to avoid forcing a large reference pack into every design-chat turn.
