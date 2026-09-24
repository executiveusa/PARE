# PARÉ Studio — Run 12: Task-Guided Product Tour
Date: 2026-09-23

## DECISION
Turn the first-entry overlay into a task-guided walkthrough anchored to real controls.

## TOUR FLOW
1. Projects → spotlight real New Project control.
2. Find → automatically open rail and spotlight Search.
3. Brief → switch to Home and spotlight the real composer.
4. System → spotlight the real Design System trigger.
5. Make → return to the composer, dismiss the tour, and focus the prompt.

## BEHAVIOR
- Tour changes Studio view as needed.
- Rail opens only for the rail step and collapses afterward.
- Each step scrolls its real target into view.
- Capability microcopy responds to hover/focus.
- Skip remains available.
- Replay remains available through the persistent ? control.
- Final action places keyboard focus in the live prompt input.
- No fake controls or screenshots.

## ACCEPTANCE
- Projects target is real designs-new-project or empty-state equivalent.
- Search target is entry-nav-search.
- Composer target is home-hero-input.
- Design system target is home-hero-design-system-trigger.
- Tour completion focuses home-hero-input.
- Playwright traverses the full tour.
