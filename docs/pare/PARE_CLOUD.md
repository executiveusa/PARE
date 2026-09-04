# PARÉ Cloud Roadmap & Multi-Tenant Architecture

## Core Principle: No Crippleware

PARÉ maintains a clear distinction between the local/owner sovereign runtime and future managed cloud services:

- **Local / Owner Edition**: 100% capable, BYOK, full ICM filesystem access, MCP, API, CLI, and zero mandatory cloud account.
- **PARÉ Cloud (Future)**: Managed hosting, team synchronization, enterprise IAM, usage metering, and managed agent execution clusters.

---

## Domain Entity Model (Future Cloud Schema)

```text
Tenant (Organization)
  ├── Workspaces
  │     ├── Memberships (Roles: Owner, Creative Director, Editor, Viewer)
  │     ├── Projects (Folder-backed ICM Trees)
  │     │     ├── Brand Manifests
  │     │     ├── Strategy Documents
  │     │     ├── Design Directions & Tokens
  │     │     ├── Validation Scorecards
  │     │     └── Generated Artifacts
  │     ├── Credential References (Encrypted Vault)
  │     └── Usage Events (Metering & Quotas)
```

## Migration & Portability
Regardless of deployment mode, project truth remains portable folder-backed ICM files (`.md` and `.json`) that can be exported or imported between local, VPS, and cloud environments at any time.
