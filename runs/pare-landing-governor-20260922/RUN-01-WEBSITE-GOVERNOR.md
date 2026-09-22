# PARÉ Landing — Website Governor Run 01
Date: 2026-09-22
Branch: governor/pare-landing-run-01-20260922
Baseline main SHA: eef8533088b28b18f36471a8141edeae126611fc
Production host: Netlify pauli-para
Production deploy: 6ab24c8ede24350008c13d48
Production commit_ref: eef8533088b28b18f36471a8141edeae126611fc

## DECISION
REVISE

This is the first governed pass. No public landing copy, layout, routing, runtime, data, or production behavior is changed in this run. The purpose is to lock the outcome, truth state, conversion path, protected assets, P0/P1/P2 findings, rollback, and the next verified slice before implementation.

## PROJECT LOCK
- Mode: BROWNFIELD
- Site type: SaaS / product / agentic studio
- Classification: SELL + USE
- Product: PARÉ
- Primary audience: builders, founders, agencies, operators, and teams who want to create serious digital work with AI without manually managing a fragmented stack of models, agents, prompts, files, and infrastructure.
- Awareness: problem-aware to solution-aware; most visitors will not know PARÉ by name.
- Visitor trigger: wants to build or operate something with AI but does not want tool fragmentation, lock-in, or technical orchestration overhead.
- Problem: AI capability is fragmented across products and infrastructure layers; the current landing asks visitors to decode brand philosophy before understanding the product.
- Desired outcome: visitor understands PARÉ quickly, sees credible product proof, and tries the real Studio.
- Offer: one owner-controlled AI Studio over projects, files, agents, models, tools, and infrastructure.
- Primary action: TRY PARÉ.
- Post-click result: visitor passes through the PARÉ effect and enters a usable Studio session.
- Secondary action: See how it works / product proof. Journal and source are lower priority.
- Existing proof: real PARÉ Studio code; mandatory landing-entry gate; crossword/Fusion effect code; Studio diffusion component; API/MCP/CLI architecture in repository; open-source repository.
- Protected assets: PARÉ name, reduction/subtraction concept, crossword/Fusion doorway, real Studio, diffusion behavior, ownership/sovereignty principle, owner-controlled runtime architecture, repository history and rollback.
- Constraints: preserve brownfield architecture; no replacement framework; no fake product proof; no fabricated social accounts; no browser secrets; no production change without release evidence.
- Primary KPI for this redesign: successful Studio-entry starts from the landing page, with comprehension/proof tests as release gates.
- Definition of success: within the first meaningful viewport/interaction a stranger can answer what PARÉ is, why it matters, and how to try it; product proof appears immediately after orientation; the primary CTA is real and verified.

## JOB STATEMENT
When a person wants to create or operate serious digital work with AI, they need one clear place to start and continue because the underlying model/agent/tool stack changes constantly, but fragmented tools and infrastructure create cognitive load and lock-in, so they can focus on the work while keeping ownership of projects, files, agents, and infrastructure.

## POSITIONING — WORKING
For builders and teams using AI to make digital products and brand systems, PARÉ is an owner-controlled AI Studio that removes the machinery between intention and finished work. Unlike a single-model workspace or closed AI wrapper, PARÉ keeps the project layer durable while models, agents, and interfaces remain replaceable.

Evidence level: working strategic statement. Public wording must be reduced and limited to capabilities verified in product/runtime evidence.

## GOVERNING IDEA
Pare away the machinery between intention and finished work.

The crossword/Fusion interaction is protected because it expresses the product truth: unnecessary complexity disappears until PARÉ remains. The effect must operate as a short doorway, not as a long explanation visitors must decode.

## CURRENT EXPERIENCE MAP
Current sequence:
1. Crossword/Fusion hero
2. PARÉ definition
3. Saint-Exupéry manifesto
4. “What are we making?”
5. Stylized Studio representation
6. Ownership promise
7. Studio/API/MCP/CLI explanation
8. Final PARÉ CTA

Current primary path:
Visitor -> long brand/philosophy sequence -> stylized product representation -> final Enter Studio link -> Studio gate -> real product

Target path:
Visitor -> PARÉ effect -> plain product orientation -> Try PARÉ -> real product demonstration/proof -> ownership/difference -> secondary philosophy -> repeat Try PARÉ

## TWO-SECOND TEST
Current:
- What is this? FAIL
- Why should I care? FAIL/PARTIAL
- What should I do next? FAIL/PARTIAL

Target:
- What is this? “An AI Studio for turning ideas into finished digital work.”
- Why care? “It removes model/agent/infrastructure complexity while keeping the work owner-controlled.”
- Next action? “Try PARÉ.”

## WIRING / TRUTH MAP

| Surface | Handler / route | Destination | Status | Finding |
|---|---|---|---|---|
| Public root | Next/redirect layer | /pare-preview/ | VERIFIED IN SOURCE | Landing is intended doorway. Production browser proof still required per release cycle. |
| Landing Studio nav | anchor | #studio-entry | VERIFIED IN SOURCE | Does not bypass effect. |
| Try/Enter Studio | sessionStorage gate + /projects?pare-entry=1 | Studio | VERIFIED IN SOURCE | Real conversion path exists but appears too late and is labeled weakly. |
| Direct Studio hard entry | ClientApp entry gate | /pare-preview/#studio-entry | VERIFIED IN SOURCE | Preserves doorway contract. |
| Journal | /pare-preview/blog/ | Journal | PARTIAL | Valid route in source, but should not compete in primary nav. |
| GitHub source | github.com/executiveusa/PARE | repository | VERIFIED | Useful lower-page proof/utility action. |
| Instagram | instagram.com root | generic platform root | BROKEN AS BRAND DESTINATION | Remove until verified canonical profile exists. |
| Facebook | facebook.com root | generic platform root | BROKEN AS BRAND DESTINATION | Remove until verified canonical profile exists. |
| Dribbble | dribbble.com root | generic platform root | BROKEN AS BRAND DESTINATION | Remove until verified canonical profile exists. |
| Behance | behance.net root | generic platform root | BROKEN AS BRAND DESTINATION | Remove until verified canonical profile exists. |
| Netlify production | pauli-para.netlify.app | deploy 6ab24c8ede24350008c13d48 | VERIFIED HOST STATE | READY on exact main SHA eef8533; rendered UX not verified in this run. |
| Vercel daemon | pauli-open-design-daemon | legacy/secondary deployment | NON-CANONICAL FOR LANDING | Do not let it become a second landing authority. |

## EVIDENCE / CLAIMS LEDGER

| Claim | Status | Public use |
|---|---|---|
| PARÉ is open source | VERIFIED by public repository | Yes |
| PARÉ has a real Studio | VERIFIED in repository | Yes |
| PARÉ exposes API/MCP/CLI concepts | VERIFIED in repository architecture | Yes, but lower in narrative |
| PARÉ lets people keep projects/files/agents/infrastructure | PARTIAL as positioning + architecture intent | Use carefully; runtime/export specifics must stay evidence-backed |
| “One Studio. Infinite possibilities.” | BRAND LINE | Yes, not a substitute for product category |
| Generic social profiles | UNVERIFIED | No |
| Stylized “LESS NOISE” artifact as real product output | STATIC/DEMO | Must not be presented as proof |
| Production deploy is READY | VERIFIED by Netlify | Yes internally; does not prove UX/product flow |
| Current landing passes two-second comprehension | NOT VERIFIED / audit says fail | No |

## P0 / P1 / P2

### P0
None established from source/deploy inspection in this run. Live browser interaction is still required before release claims.

### P1 — must fix before redesign can ship
1. Product/category meaning arrives too late.
2. Primary action appears too late and is labeled “Enter Studio” instead of outcome language.
3. First sequence overweights brand philosophy relative to product orientation.
4. Current product section is a stylized static representation, not strong real product proof.
5. Generic social platform roots behave like brand links without verified account destinations.
6. Navigation spends attention on Journal and tagline before the primary product action.
7. Internal editorial labels (“01 / recognition”, “04 / product”, etc.) describe the design system more than they help the visitor.
8. The hero runway is too long for a mandatory doorway (285svh desktop / 245svh mobile in source).

### P2 — polish after P1 repair
- Rebalance typography and section spacing after content reduction.
- Re-evaluate manifesto placement after the conversion slice is locked.
- Refine crossword timing and mobile footprint after the static hierarchy passes.
- Confirm exact social/design-network destinations if accounts are created.
- Review SEO/indexing: landing currently carries noindex,nofollow and must be intentionally resolved before public launch.

## CONTENT INVENTORY
KEEP VERBATIM
- PARÉ
- “to reduce by removing what is unnecessary.”
- “One Studio. Infinite possibilities.”
- “Your projects. Your files. Your agents. Your infrastructure.”

KEEP + REPOSITION
- Saint-Exupéry quote
- “What are we making?”
- Open-source statement
- API/MCP/CLI explanation
- Journal

REDUCE / REWRITE IN NEXT GOVERNED COPY SLICE
- long product explanation
- hero instructional meta copy
- internal numbered labels
- final entry-note meta copy

REPLACE WITH EVIDENCE
- stylized product proof/demo

REMOVE
- generic social root links until verified
- redundant navigation/meta labels that do not improve orientation or action

MISSING AND REQUIRED
- plain-English product category on first screen
- immediate “Try PARÉ” CTA
- real product proof sequence: INPUT -> PARÉ ACTION -> RESULT
- verified success/confirmation state after Studio entry

## REDUCTION TARGET
Current narrative:
BRAND -> PHILOSOPHY -> PHILOSOPHY -> QUESTION -> PRODUCT -> OWNERSHIP -> ARCHITECTURE -> ACTION

Target narrative:
EFFECT -> PRODUCT TRUTH -> ACTION -> REAL DEMONSTRATION -> DIFFERENCE/OWNERSHIP -> PHILOSOPHY -> ACTION

The goal is not a shorter page by itself. The goal is fewer required interpretations before value is obvious.

## FIRST VERIFIED SLICE
The next implementation slice is intentionally small:

1. Shorten the crossword doorway so product orientation appears in the first meaningful viewport/interaction.
2. Add one plain-English product-category statement.
3. Make “Try PARÉ” the dominant primary CTA.
4. Reduce primary nav to PARÉ + one product-oriented secondary link at most + Try PARÉ.
5. Remove unverified generic social root links.
6. Move Journal/source to lower utility navigation.
7. Keep the rest of the page structurally intact for this slice.
8. Do not yet redesign all sections or create AI imagery.
9. Do not replace the Studio product-proof block until a real product demonstration source is chosen and verified.

## ACCEPTANCE CRITERIA FOR SLICE 01
At 390px and 1440px:
- PARÉ effect remains recognizable and native-scroll-safe.
- Product category is understandable before a visitor is forced through multiple philosophy screens.
- “Try PARÉ” is visible and unambiguous.
- No generic social root link remains.
- Primary nav has no competing Journal action.
- Direct hard Studio entry still re-gates through PARÉ correctly.
- Reduced-motion state remains readable.
- No horizontal overflow.
- No regression in Studio entry contract.
- Exact preview revision is browser-tested before merge.

## MOBILE CONTRACT — PRELIMINARY
- The mandatory effect cannot consume 245svh simply to establish brand recognition.
- Product orientation and primary CTA must be reachable early without scroll-jacking.
- Native scroll only.
- Body copy >= 16px unless true metadata.
- Controls >= 44x44 CSS px where essential.
- The crossword can simplify on phone but must preserve the product-specific subtraction idea.
- Reduced motion must show a legible final state immediately.

## MOTION LEDGER — CURRENT
- Crossword subtraction/convergence: KEEP, but reduce runway; communicates product meaning.
- Quote reveal: DEFER/REPOSITION; narrative purpose exists, but current placement delays product clarity.
- Social hover lift: REMOVE with generic links.
- Studio diffusion: separate product interaction; keep out of marketing-page motion decisions.

## OWNERSHIP / DELIVERY
- Repository: executiveusa/PARE
- Baseline: main eef8533088b28b18f36471a8141edeae126611fc
- Audit branch: governor/pare-landing-run-01-20260922
- Netlify site: 0ced1721-795b-4c9c-8499-91a9e4db1091 / pauli-para
- Production deploy: 6ab24c8ede24350008c13d48
- Production URL: https://pauli-para.netlify.app
- Rollback: baseline main SHA / immutable Netlify deploy above
- Vercel pauli-open-design-daemon is not canonical landing hosting and must not be treated as a second product front door.

## DEFERRED TO LATER SKILLS
- Art of Reduction: full copy/section subtraction after Landing Page Director locks category/promise/proof/CTA.
- Collins: composition/art direction after clarity is locked.
- Mobile Polish V2: full viewport/touch/performance proof after structural reduction.
- fal.ai: connected and model discovery is available, but no generation is justified during the audit. Product proof should prefer real interface/output before generated decoration.
- Gauntlet: after first implementation slice reaches preview.

## STATUS
Strategy: AUDITED / REVISION REQUIRED
Content: AUDITED / NOT LOCKED
Information architecture: AUDITED / REVISION REQUIRED
Implementation: UNCHANGED IN THIS RUN
Preview: NOT CREATED FOR AUDIT-ONLY BRANCH
Production: existing READY deploy on baseline SHA; UX not re-certified here
Independent review: NOT YET RUN
Production verification: NOT CLAIMED

## NEXT
Run Landing Page Director Run 01 on the locked audit:
CATEGORY -> PROMISE -> PRODUCT PROOF -> PRIMARY CTA.

Do not broaden to full visual redesign until those four are locked.

## HUMAN APPROVAL
No additional approval is required to perform the next reversible strategy/copy-spec run on this branch. Public production changes remain separately gated by preview evidence and owner release approval.
