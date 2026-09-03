# PARÉ deployment model

Status: owner-use release architecture for `ZTE-20260903-0007`.

## Shape

PARÉ has two replaceable surfaces and one durable source of truth:

```text
phone / desktop browser
        |
        v
Netlify / Vercel / private web origin
        |
        v
HTTPS
        |
        v
owner-controlled PARÉ runtime
        |
        +-- persistent project files
        +-- agent/runtime adapters
        +-- MCP / HTTP / CLI
        +-- streaming / exports
        +-- server-side credentials
```

The browser host is replaceable.
The project is not.

## Browser host

Use Netlify or Vercel for:

- the public landing experience;
- Studio UI;
- pull-request previews;
- phone/desktop visual review;
- static/browser-facing assets.

Do not treat the browser host as the canonical project store or privileged execution plane.

## Persistent runtime

Use the owner-controlled VPS for capabilities that need a real machine:

- long-running agent sessions;
- process spawning and CLI detection;
- persistent project files;
- streaming;
- artifact/export generation;
- authenticated machine access;
- server-side secrets;
- backups and rollback.

Reuse the repository's existing daemon/container contract rather than introducing another runtime service merely for the PARÉ name.

Current compatibility identifiers such as daemon port `7456`, `OD_DATA_DIR`, `OD_API_TOKEN`, `od` CLI, package namespaces, storage keys, and protocol paths remain stable until there is a functional reason and migration plan to change them.

## Agent access

Approved agents operate on the same project through semantic machine interfaces:

1. CLI;
2. MCP;
3. authenticated daemon `/api/*`;
4. authorized project filesystem access.

External agents should not automate the React interface when a semantic interface exists.

## First production shape

Keep the owner-use release small:

- one VPS;
- one persistent PARÉ runtime/container;
- one data volume;
- one authenticated HTTPS origin;
- one canonical ICM project tree per durable project;
- one browser host for Studio/landing previews.

Do not split into extra services until load, isolation, or security evidence requires it.

## Cloud packaging later

Hosted PARÉ may later add accounts, teams, managed execution, encrypted secret management, collaboration, metering, hosted MCP, and subscriptions.

Those conveniences must not become the condition for owning the project.

Self-hosted PARÉ should remain useful.

## Production gate

Preview deploys, branch deploys, documentation, configuration, and non-production verification may proceed during the release loop.

Production promotion is a separate owner action because it changes the authoritative public surface and/or privileged infrastructure.
