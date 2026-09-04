# PARÉ One-Secret Bootstrap & Secret Management

## Architecture

PARÉ implements a zero-leak, single-bootstrap-secret architecture. Rather than requiring 20+ API keys manually copied across environments, the server uses a single master bootstrap credential to securely resolve required provider keys on demand.

```text
                  PARE_BOOTSTRAP_SECRET
                  (INFISCAL_API_TOKEN)
                           |
                           v
                PARÉ Secret Registry
             (apps/daemon/src/secrets/)
                           |
       +-------------------+-------------------+
       |                   |                   |
       v                   v                   v
OPENAI_API_KEY      ANTHROPIC_API_KEY   GEMINI_API_KEY
       |                   |                   |
       +-------------------+-------------------+
                           |
                           v
           Scoped In-Memory Cache (TTL: 5 min)
                           |
                           v
               Agent Subprocess Execution
              (Claude, Codex, Gemini, etc.)
```

## Resolution Hierarchy
When any component or agent requests a credential via `SecretResolver.get(key)`:

1. **Explicit Runtime Override**: Passed explicitly for a specific execution turn.
2. **Infisical Secret Registry**: Queried over authenticated HTTPS using `PARE_BOOTSTRAP_SECRET` against the configured workspace (`HERMES`, `Secret Agent`, or `Synthia 3.0`).
3. **Environment Variable**: Fallback to local `process.env`.
4. **Unavailable**: Returns `undefined`. Never fabricates values.

## Security Guarantees
- **No Secret Values in Logs**: Secret values are strictly stripped before error logging or console output.
- **No Master Token to Browser**: `PARE_BOOTSTRAP_SECRET` and `INFISCAL_API_TOKEN` are server-only and NEVER sent to browser JavaScript or client DTOs.
- **Least-Privilege Child Spawning**: Child agent CLIs receive ONLY the specific credentials required for their provider model.
