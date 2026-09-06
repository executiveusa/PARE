---
name: design-engineering-workflows
description: "Built-in design-chat workflow router for engineering work. Routes audit, reference lock, brownfield rescue, greenfield interface, and visual QA tasks through ADHD Elegant Simplicity + Refero Design + repository-local engineering and proof gates."
triggers:
  - audit and cut
  - reference lock
  - rescue this screen
  - redesign this screen
  - new interface
  - visual QA
  - design engineering
  - engineering workflow
od:
  mode: utility
  category: design-systems
---

# Design Engineering Workflows

## Role
This is the design-chat router. It does not replace specialist skills. It selects the smallest workflow, loads `adhd-elegant-simplicity` and `refero-design` when appropriate, and then hands implementation and validation to repository-local engineering skills.

Do not expose a workflow-builder UI unless the user explicitly asks for one. The human should be able to state an outcome in normal language or select one built-in workflow.

## Workflow 1 — Audit + Cut
Use for an existing interface that feels confusing, generic, bloated, or inconsistent.

1. Record current state and screenshots/evidence.
2. Identify the primary user outcome and action.
3. Mark P0–P3 usability/design issues.
4. Run the subtraction loop.
5. Separate product truth from decorative/duplicated UI.
6. Produce the smallest repair specification.
7. Do not code unless the user requested implementation or the current task authorizes it.

Output: baseline, ranked findings, removal list, repair slice, proof plan.

## Workflow 2 — Reference Lock
Use before a major redesign, new visual language, or high-visibility surface.

1. Build the smallest useful brief.
2. Research 3–5 directions.
3. Compare 3–4 strong references.
4. Choose one dominant foundation.
5. Borrow only narrow secondary details.
6. Lock typography, color roles, spacing, surface, imagery, motion, and interaction rules.
7. Record rejected traits so the implementation does not average back toward generic UI.

Output: reference lock + design decision ledger.

## Workflow 3 — Brownfield Rescue
Use when improving an existing product or screen.

1. Inspect repository rules and architecture before editing.
2. Record baseline and blast radius.
3. Run Audit + Cut.
4. Run Reference Lock only where the current system does not already provide a valid target.
5. Specify one verifiable repair slice.
6. Implement the smallest isolated change.
7. Preserve existing working behavior and ownership boundaries.
8. Render/test responsive, accessibility, loading/error/empty states as applicable.
9. Compare against the lock/current design system.
10. Run independent proof/quality gates.
11. Keep rollback explicit.

Output: implementation + evidence + unresolved risks + rollback.

## Workflow 4 — Greenfield Interface
Use for a new screen, flow, feature surface, landing page, or product shell.

1. Validate user, problem, trigger, outcome, smallest valuable scope, primary action, risky assumptions, ownership, proof, and commercial value.
2. Research references.
3. For high-visibility work, create three meaningfully different reference-locked directions; human selects one before expensive build.
4. Specify information hierarchy, interaction model, states, responsive behavior, accessibility, tokens, and acceptance proof.
5. Build one verifiable slice.
6. Run visual QA and independent proof.

Output: selected lock, specification, slice, evidence.

## Workflow 5 — Visual QA
Use after implementation or when checking a claimed-complete interface.

1. Capture rendered evidence at required breakpoints.
2. Compare to the locked reference/current design system.
3. Check hierarchy, spacing, typography, color roles, responsive ordering, overflow, touch targets, focus, keyboard, reduced motion, loading/error/empty states, and content truth.
4. Rank findings P0–P3.
5. Repair all actionable P0/P1/P2 findings within authorized scope.
6. Re-render and re-check.
7. Distinguish implemented/tested/preview-verified/production-verified status.

Output: evidence set + severity ledger + truthful status.

## Routing rules
- Existing system? Prefer Brownfield Rescue.
- Small visual fix with concrete source? Direct build inside Brownfield Rescue; do not force three concepts.
- New high-visibility surface? Greenfield Interface + Reference Lock.
- User asks only for critique? Audit + Cut; do not mutate.
- User asks "make it look better"? Treat as underspecified design work: inspect, infer the outcome from product truth, then Reference Lock before material styling changes.
- Consequential publishing/deploy/deletion/permissions remain human-gated.

## Status language
Never compress implementation and proof into one word. Use the most accurate state:
DESIGNED → IMPLEMENTED → TESTED → READY FOR PREVIEW → PREVIEW VERIFIED → PRODUCTION VERIFIED.
