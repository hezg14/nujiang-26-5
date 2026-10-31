# Nujiang 26.5 — API

Thin FastAPI backend for the Nujiang coffee portal. Its only job is lead capture
(visit / trade enquiries) so the frontend stays a fast, static-first Next.js site.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- With `DATABASE_URL` set → writes to Postgres (table `leads` auto-created on start).
- Without it → falls back to an in-memory list (dev only; data is lost on restart).

## Endpoints

- `GET /health` → `{ "status": "ok", "db": "postgres" | "memory" }`
- `POST /api/lead` → body `{ "name": string, "email": string, "message": string }`

## Production notes

- Set `DATABASE_URL` and `CORS_ORIGINS` via environment variables.
- Create tables with Alembic migrations rather than `create_all` on startup.
- Add rate limiting / a spam honeypot before exposing publicly.
