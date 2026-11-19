---
name: verify-pare-brand-package
description: Drive the real PARÉ Brand Package CLI with synthetic approved assets, assert write results and failure gates, and persist evidence; use before merging or delivering a package.
---

# Verify PARÉ Brand Package

Surface: Node.js CLI in tools/brand-package/cli.mjs. The larger PARÉ SPA remains out of scope until the factory is wired into its native UI.

## Launch
No background service. Requires Node >=22 and Python 3 with zipfile (read-only standard library). From repository root, run node --test tools/brand-package/factory.test.mjs. This runs without pnpm dependencies.

## Doctor
Check node --version, python --version and existence of tools/brand-package/fixtures/demo-brand.json, demo-master.svg, cli.mjs.

## Drive
Run node tools/brand-package/verify.mjs. The script uses a unique temporary folder, calls the actual CLI with synthetic approved inputs, reads generated files and checks the real archive with an independent Python ZIP implementation. It changes the rights consent to false and proves the CLI refuses delivery.

## Evidence
Proof is stored at tools/brand-package/evidence/brand-package-proof.json (untracked runtime output). It contains individual checks, SHA256 validation results, timestamps, archive size, and failure details. Existence of the file alone is not proof; inspect passed=true and check outcomes. The proof is not a screenshot or browser appraisal.

## Cleanup
The verifier removes only the unique temp directory it created, including its ZIP. It retains evidence. Never remove client folders or kill unrelated processes.

## Limitations
This verifies a Node CLI path using synthetic fixtures, not the web/desktop Studio, OAuth, VPS daemon, mobile layout, visual identity quality, PNG/PDF/EPS/CMYK, production hosting, or live client delivery. Each remains a separate required gate.

## Feature map
See features/README.md. Apply to mapped features before widening functionality. A later UI integration must add real browser selectors and screenshots, not pretend the CLI proof covers UI.
