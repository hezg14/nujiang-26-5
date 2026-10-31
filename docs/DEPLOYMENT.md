# Deployment Guide

Production deployment for Nujiang 26.5: **Neon Postgres + Render (single Docker container)**.

- Target URL: `https://nujiang-26-5.onrender.com`
- Deploy method: Render Blueprint (`render.yaml` in repo root)
- Image: `./Dockerfile` — nginx on the public port, Next.js on `:3000`, FastAPI on `:8000`
- Database: Neon free project (region: Singapore, same as the Render service)

Same shape as OrderHub's deployment, for the same reason: **one origin**. The lead
form posts from the browser, so two hostnames would mean CORS, a second TLS
origin and a second service to keep warm. Here nginx splits one port instead:
`/api/*` goes to FastAPI, everything else to Next.js.

## Architecture

```
Browser ──HTTPS──> Render Web Service (Docker, free plan)
                     │
                     │  nginx :$PORT
                     ├── /api/*  ──> uvicorn 127.0.0.1:8000   (FastAPI, 2 workers)
                     └── /*      ──> node    127.0.0.1:3000   (Next.js standalone)
                     │
                     ▼
                   Neon Postgres (pooled endpoint, sslmode=require)
```

Why the API is not a second Render service: the free allowance is ~750
instance-hours a month and one always-on service already needs ~730. Two
services would either blow the quota or leave one of them cold-starting on the
first visitor. One container, one warm instance.

## Step 1 — Neon database

1. Sign up at [neon.tech](https://neon.tech) and create a project
   (region: `AWS Asia Pacific 1 (Singapore)` to match the Render service).
2. Open the project → **Dashboard** → **Connect** (top-right) → copy the
   **Pooled connection** string (hostname contains `-pooler`, ends with
   `?sslmode=require`).
3. Nothing else to run: the API creates the `leads` table on start
   (`Base.metadata.create_all`). A real traffic deployment should replace that
   with Alembic migrations.

> On a local dev machine a proxy with fake-ip DNS may block the `-pooler` host;
> use the **unpooled** (direct) string for local runs — Render's cloud network has
> no such problem.

## Step 2 — Render Blueprint

1. Sign up at [render.com](https://render.com) (free workspace is enough).
2. **New + → Blueprint** → authorize GitHub (**Only select repositories** →
   `hezg14/nujiang-26-5`) → pick the repo, branch `main`.
3. Render reads `render.yaml` and creates one web service `nujiang-26-5`
   (Docker / Free / Singapore / health check `/api/health`).
4. Fill **`DATABASE_URL`** = the Neon pooled string from Step 1. The SMTP keys
   can all be left blank — an enquiry is still stored and acknowledged, it just
   is not emailed.
5. **Apply Resources** → the first Docker build takes ~4 minutes (npm ci, next
   build, pip install).

`render.yaml` presets:

| Key | Value | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | *(sync: false)* | Neon pooled connection string |
| `CORS_ORIGINS` | `https://nujiang-26-5.onrender.com,…` | Only matters if site and API are ever split across hosts |
| `LEAD_NOTIFY_EMAIL`, `SMTP_*` | *(sync: false)* | Optional; blank means no mail is sent |
| `SMTP_PORT` | `587` | Default submission port |

Build-time values are **not** in `render.yaml` — `NEXT_PUBLIC_*` is compiled into
the browser bundle, and Render does not pass env vars to `docker build`. The
defaults live in the Dockerfile:

```dockerfile
ARG NEXT_PUBLIC_LEAD_MODE=live
ARG NEXT_PUBLIC_API_BASE=            # empty = same origin
ARG NEXT_PUBLIC_SITE_URL=https://nujiang-26-5.onrender.com
```

If the service ever lands on a different domain, rebuild with
`--build-arg NEXT_PUBLIC_SITE_URL=https://…` or the canonical, Open Graph and
JSON-LD URLs will point at the old host.

## Step 3 — Verify

```bash
curl https://nujiang-26-5.onrender.com/api/health
# {"status":"ok","db":"postgres","mail":"off","notify_to":null}

curl -X POST https://nujiang-26-5.onrender.com/api/lead \
  -H 'Content-Type: application/json' \
  -d '{"name":"Deploy check","email":"check@example.com","message":"smoke test"}'
# 201 {"id":1,...}
```

Then open the site and submit the form once. In live mode there is no demo
footnote under the button, and the acknowledgement only appears after the API
returned 201 — if the API is unreachable the form shows the error line instead
of pretending it worked.

## Local run

```bash
docker build -t nujiang-26-5 .
docker run --rm -p 3000:10000 -e PORT=10000 nujiang-26-5
open http://localhost:3000
```

No `DATABASE_URL` needed: the API falls back to SQLite at `/app/api/data/leads.db`
inside the container. That file dies with the container, which is fine locally
and not fine in production.

## Cold starts

The free plan sleeps the service after ~15 idle minutes and the next visit waits
~50 s — unacceptable for a link you send to a client. Render's free allowance is
750 instance-hours/month and one always-on service needs ~730, so a scheduled
ping keeps it warm at zero extra cost. The worker used for OrderHub
(`orderhub-portfolio/orderhub/deploy/keepalive/`) works unchanged — point its URL
at `/api/health` and keep the `*/12 * * * *` cron.

## Day-to-day operations

- **Auto deploy**: every push to `main` rebuilds (Blueprint-managed).
- **Manual deploy**: service page → **Manual Deploy → Deploy latest commit**.
- **Rotate DB credentials**: Neon → project → role menu → Reset password, then
  update `DATABASE_URL` in Render → Environment and redeploy.
- **Read the leads**: Neon SQL editor → `select * from leads order by created_at desc;`
  There is no admin UI on purpose; this site stores enquiries, it does not
  display them.
- **Two live links**: the file-based preview host serves a frontend-only build in
  demo mode. Once this deployment is up, share the Render URL — the preview link
  acknowledges submissions without storing them, and sharing both invites the
  question of which one is real.
