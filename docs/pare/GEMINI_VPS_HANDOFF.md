# PARÉ — Final Gemini / VPS Activation Handoff

Use this instruction with the authorized Gemini/Antigravity operator that already has the owner-approved Hostinger SSH and Infisical access.

---

You are the VPS/runtime operator for the final PARÉ release candidate.

## Mission
Take the existing PARÉ release branch from code-side readiness to **PREVIEW VERIFIED**. Do not redesign the product, create another architecture, or merge production. Work through the repository's Loop Engineering state and collect direct evidence.

Repository: `executiveusa/PARE`

Branch: `zte/ZTE-20260903-0007/pare-full-rebrand-release`

PR: `#5`

VPS: `31.220.58.212`

Expected repo checkout: `/root/PARE`

Public Studio preview: `https://deploy-preview-5--pauli-para.netlify.app`

Public API target: `https://api.thepaulieffect.com/pare`

Local daemon host port: `127.0.0.1:7456`

Local private MCP host port: `127.0.0.1:7457`

## Rule zero — exact head
Do not use a stale SHA from this document. At the start, query the remote release branch and record its **current HEAD**. Then on the VPS:

```bash
cd /root/PARE
git fetch origin
git checkout zte/ZTE-20260903-0007/pare-full-rebrand-release
git reset --hard origin/zte/ZTE-20260903-0007/pare-full-rebrand-release
git rev-parse HEAD
```

The VPS SHA and GitHub release-branch HEAD must match exactly before runtime evidence is accepted. If HEAD moves during this run, mark dependent evidence stale, resync and rerun affected gates.

## Read before changing
Read:
- `runs/pare-runtime-hardening-20260904/STATE.md`
- `BAR.md`
- `GATES.md`
- `ROLLBACK.md`
- `BUILD-NOTES.md`
- `deploy/Dockerfile`
- `deploy/pare-compose.yml`
- `.env.example`
- `docs/pare/AGENT_GATEWAY.md`
- `docs/pare/MCP.md`
- `docs/pare/API.md`
- `docs/pare/integrations/CLAUDE_READINESS.md`
- `docs/pare/integrations/CHATGPT_READINESS.md`

Use the Loop sequence:

`INTENT -> BAR -> LOCK -> EVIDENCE -> GRAPH -> SPEC -> SLICE -> BUILD -> VERIFY -> GAUNTLET -> RELEASE -> LEARN`

Evidence outranks claims.

Allowed end-state language only:
- NOT READY
- READY FOR PREVIEW
- PREVIEW VERIFIED
- PRODUCTION VERIFIED

Maximum status in this run is **PREVIEW VERIFIED**.

## 1. Host resource baseline
Previous evidence reported severe load/swap pressure. Do not wait for it to “settle” and do not kill unrelated workloads blindly.

Capture:

```bash
uptime
free -h
swapon --show
vmstat 1 5
ps aux --sort=-%mem | head -30
ps aux --sort=-%cpu | head -30
docker stats --no-stream
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}'
systemctl --type=service --state=running
journalctl -p err -n 150 --no-pager
```

Find abandoned PARÉ build/test processes. Terminate only clearly orphaned PARÉ-owned processes automatically. Classify other large consumers as CRITICAL ACTIVE / KNOWN IDLE / UNKNOWN. Do not stop Supabase, Coolify, Hermes, Omniroute, MinIO, Logflare or another shared service without evidence that it is the blocker and a bounded safe action.

Record before/after resource evidence.

## 2. One PARÉ service authority
PARÉ must have exactly one long-running daemon authority.

Use **Docker Compose** for this release unless fresh evidence proves it cannot satisfy the existing contract.

Inspect:

```bash
systemctl status pare-daemon --no-pager || true
docker ps
ss -ltnp | grep -E '7456|7457' || true
```

If the experimental `pare-daemon.service` from earlier diagnosis exists, stop and disable it before Compose owns port 7456. Preserve the unit file for rollback/forensics; do not delete owner data.

Never run systemd and Compose PARÉ daemon processes simultaneously.

## 3. Preserve persistent data

```bash
mkdir -p /data/pare
ls -ld /data/pare
```

Do not delete, recreate or wipe `/data/pare`, `~/.od`, databases or project files. If permissions need adjustment for the container user, make the smallest reversible change and record it.

## 4. Resolve real environment values securely
Use the already-authorized Infisical/server secret registry. Do not paste secret values into chat, logs, GitHub, screenshots or your report.

The `.env.example` is the names-only contract. Populate `/root/PARE/.env` or another Compose-approved private env file with actual server-side values.

Required runtime values/availability to resolve:
- `PARE_API_TOKEN` / compatibility `OD_API_TOKEN`
- **separate** `PARE_MCP_TOKEN` if possible; generate a high-entropy token if no existing approved value exists
- `PARE_BOOTSTRAP_SECRET` / `INFISCAL_API_TOKEN`
- `INFISICAL_WORKSPACE_ID` if resolver requires it
- provider credentials available in Infisical or fallback env for configured agents/models
- public base `OD_PUBLIC_BASE_URL=https://api.thepaulieffect.com/pare`
- allowed browser origins including production Netlify and PR #5 preview

Verify availability only as `AVAILABLE / MISSING / INVALID`. Never print values.

Provider target list to inspect, without assuming every one is configured:
- Gemini / Google
- OpenAI
- Anthropic
- OpenRouter
- Azure OpenAI
- Bedrock/AWS
- other provider/CLI adapters already registered by the repository

Do not copy provider secrets into Netlify public variables.

## 5. Build and start both Compose services
From `/root/PARE` exact release head:

```bash
docker compose -f deploy/pare-compose.yml config
docker compose -f deploy/pare-compose.yml up -d --build
```

Then capture:

```bash
docker ps
docker inspect pare-daemon
docker inspect pare-mcp
docker logs --tail 200 pare-daemon
docker logs --tail 200 pare-mcp
```

No secret values in the report.

Required architecture:
- `pare-daemon` host publication: `127.0.0.1:7456`
- `pare-mcp` host publication: `127.0.0.1:7457`
- `pare-mcp` reaches daemon internally at `http://pare-daemon:7456`
- `/data/pare:/app/.od` persists project state

If build/type/runtime fails, identify the smallest code/config defect. Fix only that bounded defect on the release branch, push it, resync exact head, rerun affected gates. Do not patch untracked production code and call it done.

## 6. Local daemon gate
Do not advance until:

```bash
ss -ltnp | grep 7456
curl --max-time 10 -i http://127.0.0.1:7456/api/health
```

Expected HTTP 200 and loopback host publication.

Also prove readiness/version if available:

```bash
curl --max-time 10 -i http://127.0.0.1:7456/api/ready
curl --max-time 10 -i http://127.0.0.1:7456/api/version
```

Test one authenticated project read using the server token without echoing it.

## 7. Local private MCP gate

```bash
ss -ltnp | grep 7457
curl --max-time 10 -i http://127.0.0.1:7457/mcp/health
```

Expected health 200.

Unauthenticated MCP must fail:

```bash
curl -i http://127.0.0.1:7457/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

Expected 401.

With the private token loaded securely in the shell, run:

initialize -> tools/list -> `pare_health` -> `pare_list_projects` -> one safe `pare_get_project` against an authorized disposable/existing project.

Expected tool list for this private gateway:
- `pare_health`
- `pare_list_projects`
- `pare_get_project`

No raw shell/admin/destructive tools belong in this first remote gateway.

## 8. Caddy routing
Back up first:

```bash
cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.pre-pare-$(date +%Y%m%d-%H%M%S)
```

Merge the PARÉ routes into the **existing** Caddyfile; do not overwrite unrelated services.

Required semantics:
- `/pare/mcp*` strips only `/pare`, then proxies to `127.0.0.1:7457`
  - `/pare/mcp` -> backend `/mcp`
  - `/pare/mcp/health` -> backend `/mcp/health`
- `/pare/*` proxies to `127.0.0.1:7456` with the existing expected daemon path stripping behavior
- SSE must not be buffered; use `flush_interval -1` on the daemon reverse proxy as appropriate

Use `docs/pare/AGENT_GATEWAY.md` as intent, then validate the actual syntax for the installed Caddy version.

```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
systemctl is-active caddy
```

If validation fails, restore the backup immediately.

## 9. Public API + private MCP proof

```bash
curl --max-time 15 -i https://api.thepaulieffect.com/pare/api/health
curl --max-time 15 -i https://api.thepaulieffect.com/pare/mcp/health
```

Expected 200.

Public MCP unauthenticated call must be 401; authenticated private initialize/tools/list/project list must succeed.

Confirm ports 7456/7457 are not directly exposed publicly.

## 10. Netlify Studio proxy
Test:

```bash
curl --max-time 15 -i https://deploy-preview-5--pauli-para.netlify.app/api/health
```

Expected 200.

If Caddy works but Netlify proxy fails, diagnose exact redirect/path/auth behavior. Do not add a browser-visible reusable API token as a workaround.

## 11. Real provider proof
Use the same daemon run path the Studio uses.

Gemini first. Prompt exactly:

`Reply with exactly: PARÉ MODEL TEST OK`

Require evidence:
- run accepted
- exact provider/model recorded
- real provider request started
- SSE connection opened
- text delta arrived incrementally
- terminal success arrived
- final content contains exactly the requested proof text

Then run one **second real provider** (prefer OpenAI or Anthropic if authorized/available):

`Reply with exactly: PARÉ SECOND MODEL TEST OK`

Secret presence is not provider proof. A real successful request is required.

## 12. Real Studio + diffusion proof
Open the actual PR #5 Netlify preview in a browser, not the standalone diffusion mock.

Verify:
1. PARÉ Studio loads.
2. Diffusion switch is visible.
3. Model selector shows only configured/meaningfully available choices or clear unavailable state.
4. Select Gemini.
5. Send: `Reply with exactly: PARÉ STUDIO TEST OK`
6. Real text streams incrementally.
7. With Diffusion ON, streamed assistant prose visibly diffuses while final semantic text remains exact.
8. Turn Diffusion OFF.
9. Send another real prompt and verify ordinary streaming.
10. Turn it back ON and verify next response.
11. Check reduced-motion behavior.
12. Check mobile responsive layout and errors; no silent failure.

Do not claim diffusion based only on unit tests.

## 13. Persistence + machine access
Use a bounded disposable test project/artifact where possible.

Prove the same durable state is reachable through:
- Studio
- REST API
- `od` CLI
- existing stdio `od mcp`
- private remote `pare-mcp`

Restart only the PARÉ Compose services, not the entire shared VPS unless a reboot is explicitly justified and safe. Verify the project/artifact survives.

## 14. Claude Code plugin proof
The repository includes PARÉ-first marketplace metadata while keeping compatibility package id `open-design`.

In a clean disposable Claude Code environment if available:
- add/install the repository marketplace/plugin using the current supported Claude Code workflow;
- verify the stdio MCP process starts;
- verify tools/list;
- perform a harmless artifact/project read test;
- verify missing daemon/auth produces a useful error;
- verify uninstall/rollback;
- never bake reusable tokens into `.mcp.json` or plugin metadata.

If the environment cannot perform this test, mark the gate **NOT VERIFIED** rather than inferring success.

## 15. ChatGPT/OpenAI private developer proof
The release branch includes a private/developer remote MCP transport; public Plugins Directory auth is a separate future hardening slice.

If ChatGPT Developer Mode is available to you, test the authenticated private MCP URL against the exact preview runtime. Prove initialize/tools/list and one read operation.

Do **not** submit PARÉ to the public Plugins Directory in this run. Public distribution still requires user/workspace identity, least-privilege public authorization, privacy/support/legal URLs and a reviewed submission packet.

## 16. Homepage / Journal / social verification
Verify rendered preview:
- luxury/quiet visual treatment
- glyph convergence hero
- `One Studio. Infinite possibilities.`
- ownership stack includes projects / files / agents / infrastructure
- Studio/API/MCP/CLI story
- Journal loads and RSS exists
- mobile and reduced-motion behavior
- no legacy public One Hands/OpenDesign brand leakage outside explicit compatibility/technical context

The current preview social icons intentionally use platform roots because no verified PARÉ/The Pauli Effect profile handles were found in code-side research. Search only owner-authorized sources (Infisical/project notes/known public records) for the actual brand URLs for:
- Instagram
- Facebook
- Dribbble
- Behance

If verified URLs exist, update them on the release branch, resync and rerun landing CI. If they do not exist, **do not invent handles**; record that social profile creation/owner selection is a launch blocker or hide those outbound icons before production.

## 17. Security verification
Prove:
- no provider/API/MCP/Infisical secret in client JS, static HTML, plugin manifests, Git diff or tool results;
- ports 7456/7457 loopback-only at host;
- unauthorized MCP mutation/read is denied as designed;
- Caddy TLS valid;
- `/data/pare` persists;
- unrelated VPS workloads remain healthy;
- API/MCP logs do not contain reusable tokens;
- public marketplace surfaces do not advertise capabilities not actually verified.

## 18. Tests / CI
Run relevant exact-head checks locally on VPS or another capable build runner, plus inspect GitHub Actions:
- daemon typecheck
- daemon focused `pare-mcp-http-server.test.ts`
- daemon affected tests
- web typecheck
- diffusion engine + overlay tests
- workspace typecheck where practical
- Docker build
- landing-page CI
- catalog/marketplace validation

Record command, exit code and revision. Do not say “full suite passed” unless the full suite actually ran.

Ignore the legacy Vercel daemon deployment rate-limit failure as a release gate only if the intended Hostinger runtime and Netlify frontend are independently proven; document why rather than silently hiding it.

## 19. Fresh verifier + Gauntlet
After builder evidence looks green, switch to a fresh verification context and rerun G1–G13 from `runs/pare-runtime-hardening-20260904/GATES.md` without trusting builder conclusions.

Then run the locked Gauntlet.

Minimum floors:
- overall >= 8.5
- correctness >= 9.0
- security >= 9.0
- reliability >= 9.0
- critical failures = 0
- unsupported completion claims = 0

If a floor fails, create the smallest repair slice, fix, retest, reverify and rerun Gauntlet.

## 20. Update repository evidence
On the release branch update:
- `STATE.md`
- `GATES.md`
- `BUILD-NOTES.md`
- `ROLLBACK.md`
- add/update `VERIFY.md`
- add/update `GAUNTLET.md`
- add/update `RELEASE.md`

Do not put secrets in evidence files.

## 21. Production gate
Do not merge PR #5, mark it production, publish marketplace listings or promote Netlify production from this instruction.

If every required preview/runtime gate is green, return exactly the maximum status:

**PREVIEW VERIFIED**

Then report the exact verified GitHub/VPS/frontend revisions and stop for owner approval.

The owner governance requires the exact word:

`approve`

before production merge/promotion.

## Final report
Return:

DECISION
LOOP STATUS
GITHUB HEAD
VPS HEAD
FRONTEND DEPLOY SHA
HOST HEALTH
DAEMON STATUS
MCP STATUS
CADDY/API STATUS
NETLIFY PROXY
PROVIDERS VERIFIED
REAL SSE
STUDIO
DIFFUSION
PERSISTENCE
CLI
STDIO MCP
CLAUDE CODE
CHATGPT DEVELOPER MODE
HOMEPAGE/JOURNAL
SOCIAL URL STATUS
SECURITY
TESTS/CI
GAUNTLET SCORE
RISKS
ROLLBACK
STATUS
NEXT
HUMAN APPROVAL

Never state PREVIEW VERIFIED without direct end-to-end evidence.
