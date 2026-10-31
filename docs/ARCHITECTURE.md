# Architecture — Nujiang 26.5

## Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) + React + TypeScript | SSR/SSG for SEO, i18n routing, image optimisation |
| Styling | Tailwind CSS + CSS variables | Design tokens, one saturated accent, responsive |
| Backend | Python + FastAPI | Thin lead-capture API; deliberately different from OrderHub's Node/Express |
| DB | PostgreSQL (SQLAlchemy) | Same DB as profile; thin usage |
| Deploy | Vercel (web) + Railway/Fly (api) + Cloudflare (CDN) | Static-first frontend, containerised API |

Deliberate isolation from OrderHub (Vue 3 + Vite + Element Plus + Node/Express + Prisma):
frontend framework, backend language and ORM are all different. Only PostgreSQL is
shared, because it is the single database listed in the Upwork profile.

## Request flow

```
Browser ──▶ Next.js (Vercel, static + edge middleware)
               │  /  ──▶ redirect to /en (default locale)
               │  /[locale] ──▶ SSG page (en, zh)
               └─ contact form ──▶ POST ${NEXT_PUBLIC_API_BASE}/api/lead
                                        │
                                        ▼
                                   FastAPI (Railway/Fly)
                                        │
                                        ▼
                                   PostgreSQL
```

## i18n

- `middleware.ts` redirects non-localised paths to `/en`.
- `app/[locale]/layout.tsx` loads the dictionary and sets `<html lang>`.
- `getDictionary(locale)` dynamically imports `dictionaries/{en,zh}.json`.
- `LanguageSwitcher` swaps the locale segment, preserving the path.

## Frontend structure

```
web/
  app/
    [locale]/layout.tsx      root layout, metadata, JSON-LD
    [locale]/page.tsx        home (all chapters)
    [locale]/about/page.tsx  case study / Upwork CTA
    sitemap.ts robots.ts
  components/                header, footer, switcher, contact form, corner tag
  dictionaries/{en,zh}.json
  lib/{i18n.ts,types.ts}
  public/images/*            CC/PD photos (see docs/MEDIA.md)
```

## Backend structure

```
api/
  main.py        FastAPI app, CORS, /health, POST /api/lead
  models.py      Lead (SQLAlchemy)
  schemas.py     Pydantic models
  database.py    engine/session, memory fallback
  requirements.txt
```

## Environments

- **dev:** `NEXT_PUBLIC_API_BASE=http://localhost:8000`; API runs without
  `DATABASE_URL` (in-memory). `npm run dev` + `uvicorn main:app --reload`.
- **prod:** `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_API_BASE` set on Vercel;
  `DATABASE_URL` + `CORS_ORIGINS` set on the API host. Use Alembic migrations,
  add rate limiting and a spam honeypot.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Factual drift | Source list + inline provenance; dated figures |
| Image licensing | CC/PD only, attribution recorded in MEDIA.md |
| Heavy photos hurt CWV | next/image, fixed aspect ratios, AVIF/WebP, lazy loading |
| Border-permit misinformation | Explicit permit note, pointer to official channels |
| Backend overscope | Keep API to lead capture only; avoid building a CMS now |
