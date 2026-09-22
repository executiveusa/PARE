# Landing Page Director contracts

These records make the workflow resumable by humans and agents without relying on hidden context.

## Claims ledger

Every material factual claim used in copy or proof must be recorded as one of:

- `VERIFIED` — supported by inspected evidence.
- `USER PROVIDED` — explicitly supplied by the owner/user but not independently verified.
- `ASSUMPTION` — plausible working assumption; do not present as fact.
- `MISSING PROOF` — useful claim shape for which evidence is absent.
- `DO NOT CLAIM` — prohibited until evidence changes.

Recommended record:

```json
{
  "claim": "",
  "status": "VERIFIED",
  "evidence": "",
  "surface": "hero|proof|faq|cta|other",
  "notes": ""
}
```

## Reference ledger

```json
{
  "source": "URL or Refero id",
  "principle": "what is worth learning",
  "fit": "why it serves this product/audience",
  "do_not_copy": "distinctive expression to avoid",
  "imitation_risk": "low|medium|high",
  "application": "where the extracted principle may be used"
}
```

References authorize learning, not visual cloning.

## Conversion contract

Use exactly one primary conversion contract:

`VISITOR -> UNDERSTANDS -> BELIEVES -> ACTS -> CONFIRMATION`

Record:

```json
{
  "visitor": "",
  "understands": "",
  "believes": "",
  "action": "",
  "confirmation": "",
  "primary_cta_label": "",
  "primary_cta_destination": ""
}
```

Secondary links may support evaluation but may not compete with the primary action.

## Creative territory record

For each of three distinct territories record:

```json
{
  "name": "",
  "governing_idea": "",
  "hierarchy": "",
  "grid": "",
  "typography": "",
  "imagery_or_product_proof": "",
  "motion": "",
  "cta_treatment": "",
  "signature_moment": "",
  "mobile_transformation": "",
  "accessibility_risks": [],
  "performance_risks": [],
  "imitation_risk": "low|medium|high",
  "score_against_project_lock": 0
}
```

## Design Lock

The selected territory becomes a Design Lock containing:

- governing idea;
- reference principles;
- message hierarchy;
- section rhythm;
- grid and spacing;
- typography roles;
- color/accent budget;
- imagery/product-proof direction;
- CTA language and destination;
- interaction/motion rules;
- mobile composition rules;
- accessibility threshold;
- performance budget;
- project-specific anti-slop blacklist.

The implementation agent may refine craft but may not silently change the locked strategy.

## Proof record

Before `PRODUCTION_VERIFIED`, retain:

- build SHA;
- preview URL or artifact;
- tested viewport classes;
- CTA result proof;
- form/error/success proof where relevant;
- Gauntlet reports;
- unresolved P2/P3 findings;
- deployment target;
- rollback procedure.
