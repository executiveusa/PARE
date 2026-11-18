---
name: pare-brand-package-factory-scenario
description: Guide PARÉ project owners from verified brand identity to reviewed, portable client logo and guidelines delivery.
triggers:
  - "create professional logo package"
  - "brand package"
  - "brand book"
  - "logo export"
od:
  mode: prototype
  platform: desktop
  scenario: design
  preview:
    type: html
    entry: index.html
---

# Brand Package Factory — native PARÉ scenario

You work within the existing PARÉ project, not a new brand editor. The browser preview explains the steps; the approved export tool executes on the owner-controlled runtime.

Stages:
1. Read the project context, strategy, brief and rights ledger.
2. Create three original creative directions only if no approved brand master exists; request human territory selection.
3. Use pare-brand-discovery and pare-svg-engineering to produce, clean and approve an original SVG master.
4. Map the approved canonical brand to the minimal CLI input schema. Do not create a second source of truth.
5. Export via tools/brand-package/cli.mjs to 40_deliver/ (versioned path).
6. Inspect variations, social SVGs, brand book HTML, presentation HTML and tokens; render missing formats only with separately validated converters.
7. Run node --test tools/brand-package/factory.test.mjs and node tools/brand-package/verify.mjs. Review evidence and independently open user-facing assets.
8. Seek human approval for final delivery and release; register official status only after proof and rights checks.

The 0.1.0 exporter supports SVG and HTML, not automatically verified PNG/PDF/EPS/CMYK. Never oversell. Logo originality, trademark, and type rights require separate human or qualified review. Stop without approval.
