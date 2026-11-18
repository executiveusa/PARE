# Validate delivery evidence

## Sub-features
SHA-256 file manifest, ZIP central directory, Python ZIP library verification and actual file readback.

## How to get to it (user POV)
Run the CLI then inspect output manifest.json, ZIP and generated HTML/SVG files.

## Driving it with Node CLI
node tools/brand-package/verify.mjs; open tools/brand-package/evidence/brand-package-proof.json

## Gotchas
Proof file is intentionally untracked to avoid committing environment-specific evidence. Visual screenshots, browser integration and print output require separate evidence.
