# COSMOS Orchestrator Integration with PARÉ

## Overview

PARÉ exposes a unified, sovereign design runtime that Cosmos can drive autonomously via:
1. **Model Context Protocol (MCP)**: Semantic tool calls for project creation, brief intake, One Hands execution, skill routing, and artifact inspection.
2. **Authenticated REST / SSE API**: HTTP endpoints for programmatic control, batch automation, and real-time event streaming.
3. **`od` CLI**: Direct shell execution for local scripts and batch pipelines.
4. **ICM Project Filesystem**: Direct access to portable markdown and JSON brand files.

---

## 1. Machine Endpoints

- **Live PARÉ Studio URL**: `https://pauli-para.netlify.app`
- **PARÉ API Base URL**: `https://pare-api.thepaulieffect.com` (or `https://api.thepaulieffect.com/pare`)
- **Internal Daemon Port**: `127.0.0.1:7456` on Hostinger VPS (`31.220.58.212`)
- **Authentication**: `Authorization: Bearer <PARE_API_TOKEN>`

---

## 2. MCP Configuration for Cosmos & External Agents

### Remote MCP Configuration (JSON)
```json
{
  "mcpServers": {
    "pare": {
      "command": "npx",
      "args": [
        "-y",
        "@open-design/cli",
        "mcp",
        "--daemon-url",
        "https://pare-api.thepaulieffect.com",
        "--api-token",
        "${PARE_API_TOKEN}"
      ]
    }
  }
}
```

### Local Stdio MCP Configuration (When running on VPS)
```json
{
  "mcpServers": {
    "pare-local": {
      "command": "node",
      "args": [
        "/root/PARE/apps/daemon/dist/cli.js",
        "mcp",
        "--daemon-url",
        "http://127.0.0.1:7456"
      ]
    }
  }
}
```

---

## 3. Semantic MCP Tool Catalog

| MCP Tool | Purpose | Key Parameters |
|---|---|---|
| `pare_list_projects` | Lists all active and persistent ICM projects | `limit`, `offset` |
| `pare_get_project` | Retrieves full project metadata, stage, and file tree | `projectId` |
| `pare_create_project` | Creates a new folder-backed ICM brand project | `name`, `intakeBrief`, `governingIdea` |
| `pare_run_one_hands` | Invokes One Hands orchestration with natural language instruction | `projectId`, `prompt`, `attachments` |
| `pare_run_skill` | Directly runs a specialized PARÉ skill (e.g., `pare-brand-discovery`, `pare-design-guardian`, `pare-gauntlet`) | `projectId`, `skillId`, `input` |
| `pare_get_artifacts` | Retrieves generated artifacts (HTML previews, SVG assets, brand books) | `projectId`, `stage` |
| `pare_get_status` | Inspects execution progress, active agent adapter, and validation score | `projectId`, `runId` |
| `pare_submit_approval` | Submits human/governance approval for territory selection or publishing | `projectId`, `approvalId`, `verdict` |

---

## 4. Sample API Invocations

### A. Create Project
```bash
curl -X POST https://pare-api.thepaulieffect.com/api/projects \
  -H "Authorization: Bearer $PARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Brand System",
    "description": "Enterprise brand identity and visual tokens"
  }'
```

### B. Invoke One Hands Workflow
```bash
curl -X POST https://pare-api.thepaulieffect.com/api/chat \
  -H "Authorization: Bearer $PARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "proj_12345",
    "message": "Execute 10_strategy phase: generate positioning document, governing idea, and 3 distinct creative territories.",
    "model": "claude"
  }'
```

### C. Stream Live Execution (Server-Sent Events)
```bash
curl -N https://pare-api.thepaulieffect.com/api/runs/run_67890/stream \
  -H "Authorization: Bearer $PARE_API_TOKEN" \
  -H "Accept: text/event-stream"
```

---

## 5. Governance & Human Approval States

One Hands operates autonomously through research, drafting, and validation gates. When crossing irreversible thresholds, PARÉ pauses execution and emits an approval request:

1. **Creative Territory Selection**: User or Cosmos picks between materially different design directions.
2. **Canonical Identity Confirmation**: Final lock of logo, palette, and typography tokens.
3. **Production Publishing**: Promoting assets to external CMS, repositories, or social channels.

Cosmos inspects `GET /api/projects/:id/approvals` and resumes the workflow via `POST /api/projects/:id/approvals/:approvalId`.
