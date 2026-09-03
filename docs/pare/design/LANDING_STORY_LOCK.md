# PARÉ Landing Story Lock

Status: LOCKED DESIGN DIRECTION

## Governing idea

The public landing experience demonstrates PARÉ through subtraction.

The visitor begins inside a sparse typographic letter field. A hidden word is gradually revealed as unnecessary letters fade, blur, drift, or otherwise leave the composition. The surviving word is **PARÉ**.

This is not a decorative puzzle copied from another site. The interaction is the product thesis: noise becomes recognition, recognition becomes meaning, meaning becomes the Studio.

## Hero sequence

1. Full-viewport letter field with restrained peripheral navigation.
2. PARÉ is present inside the field but not immediately dominant.
3. Scroll progressively removes non-essential letters.
4. PARÉ remains.
5. Definition appears with editorial restraint:

   **pare** /per/  
   *verb*  
   to remove what is unnecessary.

6. Saint-Exupéry principle is introduced as the philosophical bridge, attributed accurately.
7. The definition itself begins to pare away.
8. The page resolves to the operating principle:

   **That is how we design.**

9. The marketing surface transitions into the PARÉ Studio experience rather than stopping for a conventional feature grid.

## Story arc

Curiosity → recognition → meaning → philosophy → proof → product.

## Visual laws

- Full-bleed / full-viewport opening.
- Typography is the hero.
- Negative space is structural, not decorative.
- Motion must reveal meaning, not decorate the page.
- No generic SaaS hero, feature-card wall, model-logo strip, gradient blob, or dashboard screenshot dropped into a floating card.
- Peripheral copy stays quiet and minimal.
- Black/white or near-monochrome foundation until a later brand system intentionally changes it.
- Respect `prefers-reduced-motion`.
- Mobile preserves the reveal idea with a smaller, legible letter matrix rather than collapsing into a static slogan.

## Technical direction

The hero should be implemented as live HTML/CSS/JS/SVG typography, not a pre-rendered image or video. This keeps it responsive, accessible, fast, and editable.

Use the existing landing-page reveal/IntersectionObserver infrastructure before adding dependencies. Pull only the useful interaction principles from `executiveusa/pauli-scroll-world`; do not copy another site's skin.

No generated imagery is required for the hero. Generated or photographic media may be introduced later only if a later story beat benefits from it.

## Boundary

This work is isolated to the public landing-page/design-template lane. Do not modify daemon, API, MCP, agent runtime, secrets, Cosmos wiring, or VPS deployment code as part of this design branch.

## Reference bar

The supplied Aki Create screenshot/site is a taste reference for restraint, typographic confidence, spatial composition, and the letter-field reveal mechanic. PARÉ must have its own composition, timing, typography, and narrative logic.
