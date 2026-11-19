---
name: pare-brand-package-factory
description: Create portable identity packages from approved PARÉ brand records and SVG masters, using existing brand quality gates.
triggers:
  - "make a logo package"
  - "complete brand package"
  - "brand kit export"
  - "create brand guidelines"
od:
  mode: utility
  category: design-systems
  upstream: "https://github.com/lerna-soft/lerna-brand"
---

# PARÉ Brand Package Factory

This is an export capability, not a competing brand engine, design editor or approval authority. It uses canonical PARÉ project truth, SVG engineering, Guardian/Gauntlet and design-delivery rules.

## Mandatory sequence

1. Read the project AGENTS.md and CONTEXT.md. Inspect the exact approved brand revision and original SVG master.
2. If no approved creative direction exists, run pare-brand-discovery and pare-svg-engineering, then secure human direction selection. Never self-approve.
3. Confirm actual human reviewer, exact revision, fonts, original art and rights ledger.
4. Map the canonical brand into a minimal export input; no second truth store. Required: name, description, colors (accent/background/foreground), fonts (heading/body), approval (status=approved, revision, reviewer), rights (confirmed=true, notes).
5. On the owner-controlled PARÉ runtime run: node tools/brand-package/cli.mjs approved-brand.json approved-logo.svg ./40_deliver/brand-package-v1
6. Visually inspect SVGs at multiple sizes, the HTML brand book/deck, and the ZIP. The current factory intentionally creates SVG assets and HTML. It does NOT produce verified PNG, PDF, EPS, or CMYK. Add those only through separately validated existing converters.
7. Run: node --test tools/brand-package/factory.test.mjs
8. Apply Lauren Tan/pstack create-verification-skill: script actual input → rejection gate → export → archive extraction → asset opening → visual evidence → cleanup. Document outcome and failures.
9. Run independent design critique, rights check, and human release approval before labeling the package Official. Record file hashes, approver, source revision and receipts in _ledger/.
10. Deliver a portable ZIP only with verified rights and approved release scope. Do not claim trademark clearance or print readiness without proof.

## Boundaries

- Lerna Brand influenced workflow analysis; no upstream module was copied into this implementation.
- No extra agent framework, database, or server.
- Existing PARÉ brand truth remains canonical; no new localStorage or IndexedDB source.
- Fail closed for unapproved revisions, missing rights, or unsafe SVG.
- Rollback by reverting isolated tools/brand-package and this skill; no existing engine migration.
