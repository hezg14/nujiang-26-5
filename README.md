# Nujiang 26.5 — Coffee, Canyon & Culture

A bilingual (EN / 中文) editorial portal promoting Nujiang, Yunnan — coffee as the
spine, with landscapes, trekking and food. Built as a live case study of an
SEO-first Next.js + FastAPI stack.

The name is the argument: 26.5°N is where Nujiang grows arabica, a degree and a
half north of the latitude where most of the world's coffee stops. It is on the
hero, in the coffee section, in the footer — and now on the door.

## Structure

```
nujiang-26-5/
  web/        Next.js 14 (App Router) + React + TS + Tailwind, i18n (en default, zh)
  api/        FastAPI lead-capture API (Python + PostgreSQL)
  docs/       PRD, architecture, media credits
```

Inside `web/`, the split is deliberate — pages compose, components render, lib
decides:

```
app/[locale]/          one file per route; page.tsx is a running order, not a layout
  layout.tsx           shell, metadata, JSON-LD, skip link
components/home/       one file per band of the home page (Hero … AboutCta)
components/ui/         Section, SectionHead, Chapter — the shapes every band shares
components/            SiteHeader, SiteFooter, ContactForm, JournalCard, DishMark,
                       TerrainPlate, RevealObserver
lib/                   types.ts (dictionary contract), i18n/locales (one place for
                       locale rules), site.ts (env + constants), paths.ts,
                       reveal.ts, useRafScroll.ts
dictionaries/          en.json / zh.json — all prose and all facts
```

## Run the frontend

```bash
cd web
cp .env.example .env.local      # set NEXT_PUBLIC_API_BASE if needed
npm install
npm run dev                     # http://localhost:3000 → redirects to /en
```

## Run the backend

```bash
cd api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env            # optional: set DATABASE_URL
uvicorn main:app --reload --port 8000
```

## What ships

| Route | What it is |
|---|---|
| `/[locale]` | Editorial home: hero → official tourism-brand band → coffee (one-harvest statement, specimen table, industry figures, coffee-plus-tourism) → 9 landscape cards (8 photographs + a measured cross-section of Kongque Shan) → trek → food (line-drawn dish marks) → visit + lead form → journal preview |
| `/[locale]/journal` | Field-notes index, 3 long reads |
| `/[locale]/journal/[slug]` | Article with `Article` JSON-LD, per-locale canonical + hreflang |
| `/[locale]/about` | The case study: brief → approach → the image rule → stack → result → Upwork CTA |

12 static routes are prerendered (6 pages × 2 locales). `sitemap.xml` lists every
route with `alternates.languages`; `robots.txt` is generated.

## Notes

- Default locale is **English** (international-first). Chinese lives at `/zh`;
  middleware negotiates on `Accept-Language` for the bare `/`.
- Facts are sourced from public 2023–2026 references; see the footer and
  `docs/MEDIA.md`. Please verify before travel or commercial use.
- **Image rule** (see `docs/MEDIA.md`): every photo must be placeable in Nujiang
  from its own metadata — Commons category naming the county, EXIF GPS, or an
  author description naming the village. Filenames are not evidence. Photos that
  fail are dropped or captioned “illustrative” and never given a Nujiang place name.
- The backend uses **psycopg 3** (`psycopg[binary]`), not psycopg2 — the psycopg2
  sdist fails to build on macOS without a local libpq toolchain.
- Without `DATABASE_URL` the API degrades to an in-memory store, so the form works
  in dev with no database.
- **Lead notifications are opt-in.** Nothing is emailed until `SMTP_HOST` and
  `LEAD_NOTIFY_EMAIL` are set (see `api/.env.example`); `/health` reports
  `"mail": "off"` until then. Submissions are always stored either way.

## The contact form runs in demo mode

Right now the form is **local-only**: it validates, acknowledges the submitter and
clears itself, but nothing leaves the browser and no mailbox is involved. A
one-line footnote under the button says so — the site's whole argument is that it
does not fake evidence, so the form does not pretend either.

To go live, set one variable and restart:

```bash
# web/.env.local
NEXT_PUBLIC_LEAD_MODE=live
NEXT_PUBLIC_API_BASE=https://your-api.example.com
```

`components/ContactForm.tsx` then posts to `POST /api/lead` instead of
acknowledging locally; the UI, copy and validation stay identical. Email
notification is a second, independent switch on the API side (`SMTP_HOST` +
`LEAD_NOTIFY_EMAIL`), so a lead can be stored without mail, or mailed without a
database.

## Interaction layer

- **Scroll spy** — the sticky header lights the section you are reading with a red
  hairline underline. It is computed from scroll position against a probe line at
  32% of the viewport (not IntersectionObserver), so anchor jumps and fast flicks
  cannot leave it stuck on the wrong item. Nothing is lit while the hero owns the
  screen.
- **Adaptive header scheme** — the bar is translucent cream (`bg-paper/90` +
  backdrop blur) over light sections and flips to a near-black cream-on-dark bar
  whenever it crosses a dark surface: the tourism-brand band, the roasted-bean
  band, and the About CTA. Dark surfaces carry `data-scheme="dark"`; the header
  measures which one sits under its own bottom edge and re-points the palette via
  `[data-header-scheme="dark"]` in `globals.css`. Because the swap happens at the
  token level, the wordmark, nav, active underline, language switch and mobile
  panel all flip together with a 450 ms colour transition — no per-element
  patching, and adding a new dark section is one attribute.
- **Colour tokens are channel triplets** (`--paper: 246 241 231`), so Tailwind's
  `/opacity` modifiers work. With plain hex values `bg-paper/90` silently dropped
  the background and the bar went see-through over photographs.
- **Scroll reveal** — sections, cards and figures fade up 18 px once, staggered by
  column. The hidden state is applied only after JS marks the document, so a
  script failure never leaves the page blank.
- **Entrance** — hero lines rise in sequence; the hero plate is wiped in.
- All of it is switched off under `prefers-reduced-motion: reduce`.

## Build

```bash
cd web
npm run build && npm start        # prerenders 12 static routes
npx tsc --noEmit                  # types only, no output
```

Two conventions worth knowing before editing:

- **Copy never lives in a component.** Every string a reader sees is in
  `dictionaries/{en,zh}.json`, typed by `lib/types.ts`. Adding a key means adding
  it twice and to the interface — the compiler will not catch a missing zh string,
  so read both files.
- **Colour comes from tokens.** `paper / ink / line / accent` are channel
  triplets on `:root`; the sticky header re-points them when it sits over a dark
  band. Hard-coding a hex in a component is how the theme drifts.

## Deploy

- Frontend → Vercel (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_BASE`).
- API → Railway/Fly with `DATABASE_URL` + `CORS_ORIGINS`.
- CDN → Cloudflare.
