# PARÉ Hostinger VPS Server Runbook

## Host Information
- **Server**: `srv1099662` (`31.220.58.212`)
- **OS**: Ubuntu 24.04 LTS x86_64
- **Runtime Directory**: `/root/PARE`
- **Data Volume**: `/data/pare` (mounted to `/app/.od` inside container)
- **Reverse Proxy**: Caddy (`/etc/caddy/Caddyfile`)

---

## Operational Commands

### 1. View Service Status
```bash
docker ps --filter name=pare-daemon
```

### 2. View Live Logs
```bash
docker logs -f pare-daemon
```

### 3. Restart Container
```bash
docker restart pare-daemon
```

### 4. Full Rebuild & Restart
```bash
cd /root/PARE
docker compose -f deploy/pare-compose.yml --env-file .env up -d --build
```

### 5. Check Health Endpoint
```bash
curl -f http://127.0.0.1:7456/api/health
curl -f https://pare-api.thepaulieffect.com/api/health
```

---

## Backup & Disaster Recovery

### Data Volume Backup
All canonical projects, SQLite databases, and generated artifacts reside in `/data/pare`.
```bash
tar -czvf /root/pare_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data pare
```

### Restore Procedure
```bash
docker stop pare-daemon
tar -xzvf /root/pare_backup_YYYYMMDD_HHMMSS.tar.gz -C /data
docker start pare-daemon
```
