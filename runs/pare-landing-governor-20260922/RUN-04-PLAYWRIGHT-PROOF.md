# Playwright Proof — PARÉ Landing Run 01
Date: 2026-09-22
Branch: governor/pare-landing-run-01-20260922
Verified head: c1ab49e616a55ed502fe964f271d909705718c5e
Workflow run: 35721981243
Artifact: pare-landing-playwright-35721981243-1
Artifact ID: 10692266215

## Result
PASS — 4/4 Playwright Chromium tests passed against the Netlify PR #11 preview.

## Browser contract proven
1. Desktop 1440×900:
   - product category visible
   - primary product statement visible
   - Try PARÉ visible
   - See how it works visible
   - no horizontal overflow
   - crossword transform changes during native scroll
   - product section precedes manifesto
   - no captured page/console errors attributable to the tested page

2. Mobile 390×844:
   - product category visible
   - Try PARÉ visible
   - no horizontal overflow
   - product proof reachable/readable

3. Reduced motion:
   - readable resolved doorway
   - Try PARÉ remains visible
   - no horizontal overflow

4. Conversion:
   - Try PARÉ grants one admission
   - navigation reaches /projects with pare-entry=1

## Failure repaired during proof
The first run found a test-harness bug:
`ReferenceError: Node is not defined`
because DOM `Node.DOCUMENT_POSITION_FOLLOWING` was referenced in the Node.js test process rather than inside the browser context.

This did not identify a product defect. The assertion was moved into `page.evaluate`, the suite was rerun, and all four tests passed.

## Evidence hierarchy
This is real-browser preview evidence, stronger than source inspection or a successful deploy alone. It does not prove:
- production revision
- real model response
- real diffusion streaming
- VPS/runtime health
- final visual art direction

## Status
Landing structure/browser contract: VERIFIED FOR PREVIEW
Production: UNCHANGED
Collins art direction: NEXT
