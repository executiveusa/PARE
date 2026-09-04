# ChatGPT Integration Readiness

## Target Use Case
Enables ChatGPT users to execute:
> "Use PARÉ to build the brand system for this company."

## Technical Gaps & Roadmap
1. **Remote MCP / Custom Actions Transport**:
   - Status: PARÉ exposes remote authenticated HTTP/SSE endpoints matching OpenAPI / MCP standards.
   - Gap: Deploy OAuth2 Authorization Server (or API Key Header configuration in Custom GPTs).
2. **Tool Scope & Privacy**:
   - Scoped tools: `pare_create_project`, `pare_run_one_hands`, `pare_get_artifacts`.
   - Privacy Policy & Terms hosted at `https://pauli-para.netlify.app/privacy`.
3. **Safety & Publishing**:
   - Irreversible actions (promotion/publishing) require human approval token.
