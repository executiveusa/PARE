# PARÉ Brand Package Factory (preview module)

A deterministic, offline Node.js exporter for already-approved brand identity assets.

## Run

Tests: node --test tools/brand-package/factory.test.mjs

Export: node tools/brand-package/cli.mjs approved-brand.json approved-logo.svg ./40_deliver/brand-package-v1

Example approved-brand.json:

    {
      "name": "Example Studio",
      "description": "Identity rationale approved by reviewer",
      "colors": {"accent":"#396EA5","foreground":"#171714","background":"#F2EFE7"},
      "fonts": {"heading":"Inter","body":"Arial"},
      "approval": {"status":"approved","revision":"approved-identity-sha","reviewer":"actual-human-reviewer"},
      "rights": {"confirmed":true,"notes":"Verified source art, fonts, licenses and restrictions."}
    }

Output: approved SVG master, two background treatments, ten branded social SVG layouts, HTML guideline document, HTML concept presentation, JSON and CSS tokens, source master, rights record, checksummed manifest and ZIP.

## Missing from this slice

Automatic font outlining; production-grade vector editing; final optical review; CMYK, EPS, PNG, or PDF conversion; printable deck certification; responsive Studio integration; real approved client testing; and production deployment. None can be claimed ready based only on these files.

## Integration boundary

Use skills/pare-brand-package-factory/SKILL.md with existing pare-brand-discovery, pare-svg-engineering and pare-design-delivery. Output under existing project 40_deliver only. Do not add another brand database or code-agent runtime.

Independent implementation inspired by the workflow and architecture of the MIT-licensed Lerna Brand project. This is not a verbatim vendor source copy. Existing PARÉ Apache-2.0 notices and technical internals remain unchanged.

## Verification protocol

Use Lauren Tan pstack's create-verification-skill: verify the user outcome, not only the build. Test reject cases, load the assets in a browser, unzip them independently, verify manifest hashes, and keep screenshots and reproducible command evidence. Stop before merge without exact-head checks, visual proof and independent approval.
