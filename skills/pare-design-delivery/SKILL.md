---
name: pare-design-delivery
description: Package approved design truth into complete, portable, owner-controlled deliverables without changing strategy or hiding missing assets.
triggers:
  - "package the brand"
  - "brand delivery"
  - "developer handoff"
  - "export the approved brand"
od:
  mode: utility
  category: design-systems
  upstream: "https://github.com/executiveusa/brand-kit-builder-"
---

# Design Delivery Skill

Purpose: package approved design truth into complete, portable, owner-controlled deliverables.

## Inputs
Only approved validation output plus the approved brand manifest and tokens.

## Package
- brand book: HTML + print-ready PDF when required
- logo/identity assets: SVG, PNG and required variants
- design tokens: color, type, spacing and motion
- living style guide
- social/template assets defined by scope
- developer handoff: implementation notes, CSS/JSON tokens, responsive rules
- provenance/rights receipt
- version and rollback/recovery notes

## Laws
- Do not change brand strategy while packaging.
- Do not hide missing assets with placeholders.
- Preserve portable owner-controlled copies; cloud mirrors are not the only copy.
- Final package approval remains human-gated when the active ICM contract requires it.

## Output
Write only to `40_deliver/` and emit a handoff packet with package inventory, proof receipt, open risks, and publish readiness.
