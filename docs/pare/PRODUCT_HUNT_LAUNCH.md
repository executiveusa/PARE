# PARÉ — Product Hunt Launch Kit

Status: **draft launch kit; do not publish until production is verified and owner approves.**

Prepared from Product Hunt's current Launch Guide (checked 2026-09-04): makers may post their own product, a personal account is required, and the product's direct URL should be the primary link. Product Hunt's guide recommends launching when prepared; for planned launches it notes 12:01 a.m. Pacific as the canonical start time.

Official references:
- https://www.producthunt.com/launch
- https://help.producthunt.com/en/articles/479557-how-to-post-a-product

## Name
PARÉ

## Tagline options
Primary:
> One Studio. Infinite possibilities.

Alternative product-specific line:
> The sovereign AI studio your company owns.

## Short description
PARÉ gives teams one owner-controlled studio for projects, files, agents and infrastructure. Connect the AI models and coding agents you already use, keep the durable project state on your infrastructure, and run work through proof-first execution instead of another locked-in AI workspace.

## Product Hunt description
AI changes constantly. Your company should not have to rebuild itself around every new model.

PARÉ is a sovereign AI studio that sits above the model layer. A project keeps its files, memory, artifacts, operating rules and infrastructure while Gemini, Claude, GPT, Codex, local models and other workers can be used where they fit best.

PARÉ combines:
- a minimal project Studio;
- owner-controlled persistent project state;
- API / CLI / MCP machine access;
- model and agent adapters;
- ICM project intelligence;
- Loop Engineering for bounded build → verify → gauntlet → release work;
- a presentation layer including PARÉ Fusion / diffusion for streamed responses.

The thesis is simple: intelligence can be rented. The work should remain yours.

## Maker first comment
We built PARÉ because our own work had started to spread across too many AI tools. Every new model was better at something, but every new workspace also wanted to become the place where the project lived.

We wanted the opposite architecture.

PARÉ keeps the durable project on infrastructure we control and lets models/agents enter as workers. The Studio is the human surface; API, CLI and MCP are the machine surfaces. We are also building the operating discipline around it: ICM for project intelligence and Loop Engineering for proof-first delivery.

The first public proof is our own workflow and MACS Digital Media: showing how a small team can use several agents without surrendering the underlying files, memory or system.

What we most want feedback on: where ownership, portability and multi-agent work matter enough that you would choose this over a closed AI workspace.

## Gallery storyboard
1. **Cover** — PARÉ / One Studio. Infinite possibilities. Minimal off-white/near-black composition.
2. **Studio** — real project conversation + artifact canvas, no fake provider state.
3. **Choice without lock-in** — model/agent selector with a short caption: “Use the intelligence that fits the job.”
4. **Ownership** — Your projects. Your files. Your agents. Your infrastructure.
5. **Proof-first** — visual Loop Engineering path from intent to verified release.
6. **Machine access** — Studio for people / API + CLI + MCP for agents.
7. **MACS proof** — one real request moving through PARÉ to a verified deliverable.

## Demo video — 60–90 seconds
Opening: “AI changes every week. Your company shouldn't have to.”

Sequence:
1. open PARÉ Studio;
2. open a real project;
3. select a real configured provider;
4. submit a concise task;
5. show genuine SSE response and diffusion;
6. show resulting project/artifact state;
7. show the same project reachable through a machine interface;
8. finish on the ownership stack.

Never use a mock model response in the launch video.

## Launch URL
Production target: `https://pauli-para.netlify.app`

Replace with the final canonical branded domain if one is assigned before launch.

## Product categories / themes to evaluate during Product Hunt submission
- Artificial Intelligence
- Developer Tools
- Productivity
- Design Tools

Use only the categories Product Hunt actually offers at submission time.

## Launch gate
Do not post until:
- production is `PRODUCTION VERIFIED`;
- public homepage is indexable and final;
- real provider + Studio + diffusion demo is captured;
- privacy/terms/support URLs are live;
- social accounts/profile links are verified;
- maker personal Product Hunt account is ready;
- launch assets have no unsupported claims;
- owner says `approve` for the public launch.
