# PARÉ Landing — Run 10: Resolving Crossword Hero
Date: 2026-09-23

## DECISION
Make the crossword the hero's signature product behavior.

## INTERACTION
The four focal cells cycle through:

IDEA → MAKE → EDIT → FORM → PARÉ

Each transition flips individual letter cells. After PARÉ appears, the word freezes. The existing scroll-driven reduction behavior resumes from the resolved state.

## HERO HIERARCHY
Centered beneath the crossword:

**Design without a design team.**
From idea to finished digital work.

Primary CTA: Try PARÉ
Secondary CTA: See how it works

## WHY NATIVE DOM/CSS/JS
- remains responsive;
- remains sharp at every viewport;
- can be tested;
- reduced motion can resolve instantly;
- no video payload;
- no generated-media dependency;
- interaction belongs to the product rather than acting as decoration.

## DIRECTOR FIT
Motion communicates causality and state transition. The page does not require visitors to decode the motion to understand the product.

## ACCESSIBILITY
prefers-reduced-motion resolves immediately to PARÉ and disables the flip animation.

## ACCEPTANCE
- no 01–04 markers;
- target cells begin as IDEA;
- cycle through the locked sequence;
- settle on PARÉ within five seconds;
- hero promise remains readable throughout;
- centered layout works on desktop and mobile;
- no horizontal overflow;
- reduced motion starts resolved.

## ROLLBACK
Revert Run 10 branch commits. main/production unchanged.
