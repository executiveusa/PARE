# Agent Context: PARÉ Production Architecture & Runtime

## 1. Repository Purpose
PARÉ is the owner-controlled, persistent design and application runtime in the Pauli Effect Ecosystem. It provides:
- A persistent daemon executing on the Hostinger VPS (`31.220.58.212`).
- A portable file/folder-backed project repository (`/data/pare` -> `/app/.od`).
- Universal Agent Gateway powered by an Infisical One-Secret Bootstrap (`PARE_BOOTSTRAP_SECRET`).
- Remote MCP server endpoints for LLM orchestration (Cosmos, Claude Code, ChatGPT, Gemini, Codex, OpenCode, Hermes, Pi).
- Interchangeable frontend hosting (Netlify at `https://pauli-para.netlify.app`, Vercel, or sovereign VPS).

## 2. Tech Stack & Infrastructure
- **Execution Plane**: Hostinger VPS (`31.220.58.212`), Ubuntu Linux x86_64.
- **Runtime**: Node.js 22 LTS, Docker Compose, Caddy Reverse Proxy with HTTP/2 + HTTP/3, automated TLS via Let's Encrypt / ZeroSSL, and SSE unbuffered streaming (`flush_interval -1`).
- **Core Packages**:
  - `apps/daemon`: Fastify REST API, SSE streaming channels, MCP stdio/SSE server, SQLite project metadata.
  - `apps/web`: Next.js 16 (Turbopack) UI client.
  - `packages/contracts`: Shared TypeScript schemas and RPC definitions.
  - `packages/components`: Design system & Canvas primitives.
- **Secrets Management**: Infisical v3 API via `PARE_BOOTSTRAP_SECRET` / `INFISCAL_API_TOKEN` in `SecretRegistry`.

## 3. Directory Layout & Conventions
- `apps/daemon/src/secrets/`: `InfisicalClient` and `SecretRegistry` implementing one-secret resolution.
- `apps/daemon/src/runtimes/`: Agent execution runtime and secret injection (`env.ts`).
- `apps/daemon/src/api-token-auth.ts`: Bearer token authentication supporting `PARE_API_TOKEN` and `OD_API_TOKEN`.
- `deploy/`:
  - `Dockerfile`: Multi-stage pnpm monorepo container build.
  - `pare-compose.yml`: Production container specification with `/data/pare` persistent volume.
- `docs/pare/`:
  - `COSMOS_INTEGRATION.md`: Orchestrator protocol, tool catalog, SSE streams, approval gates.
  - `MCP.md`: Remote MCP & stdio specifications.
  - `API.md`: Authenticated REST & SSE API contract.
  - `SECRETS.md`: Zero-leak Infisical architecture.
  - `SERVER_RUNBOOK.md`: VPS operational commands & backup/restore runbook.
  - `PARE_CLOUD.md`: Future cloud tenancy and billing architecture.

## 4. Secret Resolution Hierarchy
When any agent (Cosmos, One Hands, Codex, Claude Code, Gemini, OpenCode, Hermes) requests provider credentials (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `OPEN_ROUTER_API`, `HERMES_AGENT_API`, `GH_PAT`), `SecretResolver.getSecret()` resolves in this order:
1. **Runtime Override** (ephemeral per-request memory injection)
2. **Infisical Secret Registry** (fetched via `PARE_BOOTSTRAP_SECRET` with 5-minute TTL caching)
3. **Container Environment** (`process.env`)
4. **Undefined** (fails safe without leaking keys)

## 5. Build & Test Commands
- Local secret resolver validation:
  `pnpm --filter @open-design/daemon test` (or standalone TypeScript runner)
- Daemon build:
  `pnpm --filter @open-design/daemon build`
- Web build:
  `pnpm --filter @open-design/web build`
- Deploy on VPS:
  `docker compose -f deploy/pare-compose.yml --env-file .env up -d --build`
- Ingress health check:
  `curl https://pare-api.thepaulieffect.com/api/health`
  `curl https://api.thepaulieffect.com/pare/api/health`

## 6. Known Status & Verification
- **Hostinger VPS**: Configured, Caddy reverse proxy active and tested (`https://api.thepaulieffect.com/pare` / `https://pare-api.thepaulieffect.com`).
- **One-Secret Bootstrap**: Verified against live Infisical token; keys successfully resolved.
- **Diffusion Mode**: Mounted in `apps/web/app/[[...slug]]/client-app.tsx`, verified 8/8 Vitest tests passing (`tests/diffusion.test.ts`, `tests/DiffusionOverlay.test.tsx`).
- **Netlify Routing & API Proxy**: Configured via `apps/web/public/_redirects` and `netlify.toml` forwarding `/api/*`, `/artifacts/*`, and `/frames/*` to `https://api.thepaulieffect.com/pare/:splat`.
- **CORS Ingress**: Configured for `https://pauli-para.netlify.app`.
