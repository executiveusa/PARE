# Claude Integration Readiness

## Target Use Case
Enables Claude Desktop and Claude Code users to execute:
> "Run PARÉ brand discovery on our current product assets."

## Technical Gaps & Roadmap
1. **Claude Desktop Remote MCP**:
   - Ready via `@open-design/cli mcp --daemon-url https://pare-api.thepaulieffect.com --api-token $PARE_API_TOKEN`.
2. **Identity & Workspace Mapping**:
   - Projects mapped to client workspace identifiers.
3. **Receipts & Verification**:
   - Every artifact run returns structured JSON receipts.
