# PARÉ REST & Streaming API Contract

## Base URLs
- Public Gateway: `https://pare-api.thepaulieffect.com`
- Direct Path: `https://api.thepaulieffect.com/pare`
- Local Daemon: `http://127.0.0.1:7456`

## Authentication
All requests (except `/api/health` and `/api/version`) require:
```http
Authorization: Bearer <PARE_API_TOKEN>
```

---

## Core Endpoints

### Health & Observability
- `GET /api/health` — Daemon health, SQLite status, data volume accessibility.
- `GET /api/version` — Semantic version and build metadata.
- `GET /api/runtime/status` — Installed agent runtimes, active runs, memory/storage status.

### Projects & ICM Structure
- `GET /api/projects` — List all projects.
- `POST /api/projects` — Create new project.
- `GET /api/projects/:id` — Get project details and stage metadata.
- `GET /api/projects/:id/files` — Walk project file tree.
- `GET /api/projects/:id/files/*` — Read specific project file.
- `POST /api/projects/:id/files/*` — Write / update project file.

### Runs & One Hands Execution
- `POST /api/chat` — Start a run turn (natural language instruction to One Hands).
- `GET /api/runs/:id` — Get run execution status.
- `GET /api/runs/:id/stream` — SSE stream of live text deltas, tool calls, and artifact creation events.
- `POST /api/runs/:id/cancel` — Abort a running task cleanly.

### Artifacts & Previews
- `GET /api/projects/:id/artifacts` — List generated artifacts.
- `GET /artifacts/:projectId/:file` — Static rendering of HTML, SVG, and media assets.
