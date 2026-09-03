---
name: pare-design-guardian
description: Independently review a candidate brand/design for strategy fidelity, taste, usability, anti-slop, accessibility, responsive behavior, rights and provenance before Gauntlet validation.
triggers:
  - "run guardian"
  - "design guardian"
  - "validate the design"
  - "quality review"
od:
  mode: utility
  category: creative-direction
  upstream: "https://github.com/executiveusa/brand-kit-builder-"
---

# Design Guardian Skill

Purpose: run the canonical design-quality review before Gauntlet validation.

## Inputs
Approved strategy/manifest, current design outputs, applicable design-system rules, typography references, and provenance records.

## Review order
1. Strategy fidelity — design expresses the approved positioning and governing idea.
2. Taste — reject generic, derivative, decorative, or trend-stacked work.
3. Krug usability — purpose, hierarchy, action clarity, recovery, scanability.
4. Anti-slop — reject release-blocking AI/design slop.
5. Accessibility/responsive — keyboard, contrast, mobile, reduced motion, readable line lengths.
6. Rights/provenance — fonts, imagery, claims, and source material are licensed/traceable.

## Rules
- Guardian is independent of the creator.
- Guardian judges; it does not silently repair.
- Any hard blocker fails the review regardless of average score.
- Return the smallest actionable repair packet: one biggest gap first, then blocking evidence.
- Use the active project/release thresholds; do not invent a lower bar.

## Output
Write a guardian report and PASS/FAIL verdict into the assigned `30_validate/guardian-reports/` location.
