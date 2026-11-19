# Export approved identity

## Sub-features
Approved SVG masters, ten social/stationery SVGs, HTML guidelines/presentation, CSS/JSON tokens, source and ZIP.

## How to get to it (user POV)
Run: node tools/brand-package/cli.mjs tools/brand-package/fixtures/demo-brand.json tools/brand-package/fixtures/demo-master.svg PATH_TO_EMPTY_TEMP_OUTPUT

## Driving it with Node CLI
Run node tools/brand-package/verify.mjs and inspect exported folder + ZIP receipt. Run the CLI on a real approved project only with owner permission.

## Gotchas
No PNG, PDF, EPS, CMYK, font outlining, genuine artwork quality approval or web UI is proven. Synthetic approval is never client approval.
