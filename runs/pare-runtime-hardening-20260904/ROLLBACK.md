# Rollback

## Git / preview
- Keep PR #5 unmerged until all runtime + product gates pass.
- Baseline pre-run revision: `dc86c9deddace2d273673db2c3c00fd11c6797c0`.
- If a loop slice regresses preview behavior, move the release branch back to the last verified slice or revert the bounded commit; do not rewrite main.

## VPS runtime
- Preserve `/data/pare`; never delete or recreate the data volume as part of rollback.
- Before changing `/etc/caddy/Caddyfile`, create a timestamped backup.
- Before replacing `pare-daemon.service`, save the prior unit file if present.
- If PARÉ destabilizes the host, stop/disable only the PARÉ service/container first; leave unrelated critical services untouched.
- Restore prior PARÉ Caddy section/unit definition, validate Caddy, reload, and confirm protected services remain healthy.

## Secrets
- Do not copy provider secret values into repo, browser config, logs, or receipts.
- If secret-resolver changes fail, revert the resolver/runtime commit and return to the prior server-side env path; do not fall back to browser-direct credentials.

## Netlify
- PR preview remains non-production. If rewrites break the preview, revert only the PARÉ rewrite/config slice and redeploy the previous verified preview revision.
- Production `pauli-para.netlify.app` is not to be promoted/changed by this run without explicit owner approval.

## Rollback trigger
Rollback/stop if any of these occur:
- PARÉ causes severe host resource regression or disrupts protected workloads;
- secrets appear in client assets/logs;
- public port 7456 becomes directly exposed;
- persistent project data is at risk;
- real chat or diffusion corrupts content/interaction;
- exact revision cannot be established.
