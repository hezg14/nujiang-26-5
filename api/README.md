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

- No configuration needed: leads go to SQLite at `api/data/leads.db`, created on
  first run. The directory is gitignored.
- Point `DATABASE_URL` at Postgres for real traffic — install its driver first
  with `pip install -r requirements-postgres.txt`.
- Set `DATABASE_URL` to an empty string to use the in-memory store (tests only).

## Endpoints

Every route lives under `/api` so the production container's nginx can proxy one
prefix here and leave the rest to Next.js.

- `GET /api/health` → `{ "status": "ok", "db": "sqlite" | "postgres" | "memory" }`
  (`/health` also answers, for a direct local run with no proxy in front)
- `POST /api/lead` → body `{ "name": string, "email": string, "message": string }`,
  returns `201` with the stored row; `422` on a malformed email or missing field
- `GET /api/docs` → interactive OpenAPI docs

## Production notes

- In the Docker image nginx listens on `$PORT`; this process binds
  `127.0.0.1:8000` and is never exposed directly.
- `CORS_ORIGINS` is only needed if the site and API end up on different hosts —
  same-origin requests need no entry.
- Create tables with Alembic migrations rather than `create_all` on startup; the
  current `create_all` is a convenience for a fresh clone.
- Add rate limiting / a spam honeypot before the form is promoted widely.
- Deployment walkthrough: [`../docs/DEPLOYMENT.md`](../docs/DEPLOYMENT.md).
