# Reject unsafe or unapproved work

## Sub-features
Human approval revision, reviewer, rights confirmation, unsafe SVG rejection.

## How to get to it (user POV)
Use the normal CLI with an unapproved brand or unsafe SVG; it must exit nonzero without writing a package.

## Driving it with Node CLI
node --test tools/brand-package/factory.test.mjs; node tools/brand-package/verify.mjs

## Gotchas
Static SVG safety checks are defense in depth, not a substitute for an audited SVG sanitizer and isolated rendering environment. Never accept arbitrary public SVG uploads to a privileged runtime.
