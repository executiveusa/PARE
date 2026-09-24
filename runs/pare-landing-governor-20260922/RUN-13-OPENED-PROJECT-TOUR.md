# PARÉ Studio — Run 13: Opened Project Walkthrough
Date: 2026-09-23

## DECISION
Carry the first-entry tour into the user's first opened project as a one-shot walkthrough.

## HANDOFF
Finishing the Studio entry tour sets:
- pare:project-tour-pending=1

The first ProjectView consumes that marker.

## PROJECT TOUR
1. Direct — chat composer
2. Context — plus menu
3. Files — Design Files tab
4. Work — live file workspace
5. Revise — chat composer
6. Finish — file workspace / deliverable controls

## TRUTHFULNESS
Preview/share/download controls are deliverable-specific and may not exist before a file is created.
The tour therefore points at the live workspace and explains that those controls appear with the opened deliverable rather than rendering fake controls.

## END STATE
Completion:
- clears pare:project-tour-pending
- sets pare:project-tour-seen
- returns focus to the project composer

## ACCEPTANCE
- no repeat tour on ordinary project visits
- no invented export control
- stable testids only
- skip available
- reduced-motion safe
