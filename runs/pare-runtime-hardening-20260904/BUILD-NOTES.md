# Build Notes — PARÉ runtime hardening

## Slice 1A — container launch contract

### Observation
The release branch's `deploy/Dockerfile` packaged the daemon correctly but its runtime command was:

```text
node apps/daemon/dist/cli.js --no-open
```

Prior VPS investigation established that the persistent HTTP runtime is launched through:

```text
node apps/daemon/dist/cli.js daemon start --no-open
```

The compose health contract expects that process to remain active and serve `http://127.0.0.1:7456/api/health` from inside the container.

### Change
Commit `cf428b5c2a3fe06a5b584032970691a4d4626e44` changes only the Docker runtime command to include `daemon start`.

### Why this is bounded
- no provider logic changed;
- no project data changed;
- no Caddy/DNS changed;
- no frontend changed;
- no production/main merge;
- persistent volume `/data/pare` remains untouched.

### Verification still required
This repair is admitted but not verified. Fresh VPS evidence must show:
1. exact release-branch parity;
2. one daemon authority only;
3. stable host resources;
4. loopback publication of port 7456;
5. local `/api/health` HTTP 200;
6. only then public Caddy and Netlify proxy checks.

### Rollback
Revert the Docker command commit or redeploy the prior known-good runtime package. Do not remove `/data/pare`.