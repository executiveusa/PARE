# Mobile-first contract

Mobile is a distinct composition, not a compressed desktop implementation.

## Required review widths

Review at minimum:

- 320 CSS px
- 375 CSS px
- 390 CSS px
- 430 CSS px
- 768 CSS px
- 1024 CSS px
- 1440 CSS px

Do not treat these as screenshot-only checkpoints. Test interaction, keyboard/focus behavior where applicable, orientation-sensitive media, and real CTA/form states.

## Phone decisions that must be explicit

For every landing page, decide:

- reading order;
- hero composition and crop behavior;
- headline line breaks and maximum measure;
- body-copy measure;
- primary CTA location and repetition policy;
- thumb reach and minimum target size;
- safe-area handling;
- sticky/fixed UI behavior;
- navigation reduction;
- proof sequencing;
- form field order and keyboard ergonomics;
- how error/success states appear;
- whether motion should simplify or disappear;
- which desktop elements should be removed rather than stacked;
- image/video loading strategy on constrained networks.

## Behavioral quality bar

“Apple-like” means disciplined behavior when that level of restraint fits the brand. It never means copying Apple.com. Target:

- immediate and legible response to touch;
- calm visual hierarchy;
- excellent typography;
- consistent spacing and alignment;
- predictable state;
- deliberate, restrained motion;
- accessible controls;
- no surprise horizontal scrolling;
- no tiny controls or hover dependencies;
- no layout jump that moves the primary action;
- no sticky element that consumes the usable viewport.

## Mobile failure conditions

Any of the following blocks release:

- horizontal overflow at a required width;
- clipped or unreadable primary copy;
- CTA hidden, obscured, or requiring precision tapping;
- modal/dialog that cannot be dismissed or completed;
- text or controls rendered below practical legibility;
- hero media crop that destroys the product evidence;
- navigation that requires hover;
- fixed UI colliding with the software keyboard or safe areas;
- animation that prevents comprehension or ignores reduced-motion preferences;
- desktop information order preserved when it creates a nonsensical phone narrative.
