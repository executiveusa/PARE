# Grill Mode protocol

Grill Mode exists to remove hidden assumptions before visual work begins. It is inspired by the high-leverage interviewing pattern popularized by Matt Pocock's Grill Me skill, but this implementation is specific to landing-page strategy.

## Operating rule

Do not build while critical strategy is unresolved. Ask the single highest-leverage question whose answer changes the page. Prefer repository evidence, attached sources, analytics, brand systems, and the live product over asking the user to repeat facts that can be inspected.

Do not turn Grill Mode into a long questionnaire. Ask one question at a time unless a short related pair is clearly easier to answer together. Challenge vague answers with concrete alternatives. `I don't know` is valid; record uncertainty rather than manufacturing certainty.

## Resolution order

Resolve these in dependency order:

1. **Outcome** — What measurable thing should become more likely because this page exists?
2. **Visitor** — Who arrives, from where, in what awareness state, and after what trigger?
3. **Offer/product truth** — What actually exists today? What can be demonstrated?
4. **Primary action** — What one action should the visitor take?
5. **Post-click state** — What happens immediately after the action?
6. **Belief gap** — What must the visitor understand or believe first?
7. **Objection** — What risk, cost, confusion, or distrust most blocks action?
8. **Evidence** — What real proof can resolve the belief gap or objection?
9. **Brand constraints** — What identity, product UI, language, assets, and behaviors are protected?
10. **Technical constraints** — Stack, deployment, data, forms, analytics, performance, accessibility, legal, and integration limits.
11. **Failure condition** — What would make the page unsuccessful even if it looked excellent?

## Exit criteria

Leave Grill Mode only when the Project Lock can state, without guessing:

- target visitor;
- desired outcome;
- one primary CTA and its destination/state;
- product/offer truth;
- strongest objection;
- usable evidence and missing evidence;
- protected brand/system constraints;
- technical constraints;
- success metric or observable success condition.

If the user has already supplied enough evidence, do not continue questioning for ceremony. Write the Project Lock and proceed.

## Brownfield exception

For an existing page or app, inspect first. The highest-leverage question may only become clear after reading the code, page structure, current CTA, product behavior, analytics hooks, and existing design system.
