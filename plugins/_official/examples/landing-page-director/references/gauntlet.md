# Landing Page Director adversarial Gauntlet

The builder cannot approve its own work. Run these as independent review roles against the rendered page and current Project Lock. Review behavior and evidence, not source-code intent.

## Severity

- `P0` — broken conversion, deceptive/unsupported claim, destructive defect, inaccessible core action, unusable mobile layout, security/privacy violation.
- `P1` — major comprehension, credibility, usability, responsive, performance, or visual-authorship failure that materially weakens the page.
- `P2` — meaningful polish issue that should be repaired but does not block basic use.
- `P3` — optional refinement.

## Review council

### 1. Conversion Prosecutor
Attack category clarity, audience relevance, offer comprehension, CTA language, CTA destination, time-to-value, proof order, funnel friction, and the two-second test.

### 2. Krug Reviewer
Ask: What is this? Where am I? What can I do? What happens next? Identify every moment that forces unnecessary interpretation, hunting, remembering, or choice.

### 3. Creative Director
Attack the governing idea, composition, hierarchy, typography, imagery, rhythm, signature moment, and distinctiveness. Run the interchangeability test. Penalize decoration without concept.

### 4. Slop Hunter
Run `anti-slop.md`. Search specifically for template residue, AI copy clichés, fake proof, generic feature architecture, unjustified effects, component-library fingerprints, and visual imitation.

### 5. Mobile Director
Review 320, 375, 390, and 430 CSS-pixel widths plus tablet. Attack reading order, overflow, crops, safe areas, type measure, CTA reach, touch targets, sticky elements, forms, nav reduction, keyboard behavior, and motion on constrained devices.

### 6. Accessibility Reviewer
Review semantic structure, headings, labels, alt behavior, contrast, keyboard access, visible focus, target size, reflow/zoom, reduced motion, form errors, status messaging, and non-pointer operation.

### 7. Production Engineer
Attack broken links/routes/forms, loading and error states, hydration/runtime errors, asset weight, image sizing, font loading, layout shift, responsive regressions, analytics wiring, and performance budget.

### 8. Sovereignty Reviewer
Attack ownership and rollback risk: unnecessary dependencies, external lock-in, hidden data collection, credential exposure, opaque hosted requirements, destructive migrations, source-of-truth drift, and missing rollback instructions.

## Required output per reviewer

```md
## <ROLE>
Score: X/10
Decision: PASS | FAIL
P0: <count>
P1: <count>

### Findings
- [severity] evidence -> impact -> required fix

### Strongest counterargument
<best case for leaving the design as-is>

### Verdict
<why it passes or fails despite that counterargument>
```

## Repair loop

1. Aggregate findings without averaging away severe failures.
2. Deduplicate only genuinely identical findings; preserve disagreement.
3. Fix every P0 and P1.
4. Rerun the reviewer(s) that found the failure.
5. Rerun the complete eight-role release Gauntlet.
6. Stop only when hard gates and score thresholds pass.

## Release thresholds

- overall >= 8.5/10
- usability >= 8.5
- visual design >= 8.5
- originality >= 8.5
- accessibility >= 8.5
- conversion path >= 9.0
- two-second test = PASS
- one primary conversion = PASS
- Slop Hunter = PASS
- production/mobile evidence = PASS
- 0 P0
- 0 broken controls
- 0 mobile overflow
- 0 unsupported claims
- CTA destination and success state verified
- rollback documented

A beautiful page with a broken CTA fails. A technically perfect page with an interchangeable concept fails. A desktop masterpiece that collapses badly on a phone fails.
