# PRD — Nujiang 26.5 · Coffee & Canyon Portal

## 1. Positioning

A bilingual (EN default / 中文) editorial portal that promotes Nujiang, Yunnan —
with coffee as the spine, supported by landscapes, trekking and food. It doubles
as a **live case study** demonstrating an SEO-first Next.js + FastAPI build, to
attract Upwork clients.

- **Primary audience:** international coffee buyers, travellers and trekkers (EN first).
- **Secondary audience:** domestic Chinese travellers (中文).
- **Dual goal:** (a) tell a real region's story rigorously; (b) convert some
  visitors into Upwork enquiries via the "About this build" page.

## 2. Information architecture

1. Hero — editorial split layout, origin label `26.5°N · ALT 1,200 M`.
2. Coffee (spine) — terroir spec table, varietals, industry numbers, cherry-to-cup.
3. Landscapes — canyon, Bingzhongluo, First Bend, Gaoligong, Dulongjiang, Biluo & Kongque Shan.
4. Trekking — the two 2024 classic routes + Kongque Shan lakes + Dulongjiang.
5. Food — lacquer-oil chicken, Laowo ham, stone-slab bread, etc. (with allergy notes).
6. Visit — season, border permits, access, and a lead-capture form.
7. About this build — problem → approach → stack → result → Upwork CTA.

## 3. Content governance (rigour)

- Every factual claim (altitude, area, rates, SCA score, route length) must trace
  to a public source; sources are listed in the footer and in `docs/MEDIA.md`.
- Numbers are rounded and dated; a disclaimer asks readers to verify before travel
  or commercial use.
- Cultural representation is treated with care (Nu, Lisu, Dulong); no invented
  statistics or fictional characters.
- Photos are CC/PD from Wikimedia Commons with attribution; licences recorded.

## 4. i18n

- App Router `/[locale]` routing, `en` default, `zh` co-equal.
- Dictionaries in `web/dictionaries/{en,zh}.json`; shared `Dict` type.
- `hreflang` alternates, per-locale sitemap, `lang` attribute set correctly.

## 5. SEO

- Static generation for both locales; `sitemap.xml`, `robots.txt`.
- JSON-LD (WebSite + Organization/Place as content grows).
- Semantic headings, descriptive image alt text, mobile-first responsive layout.

## 6. MVP scope

Ship: home (all six chapters) + about page + FastAPI lead capture + full i18n +
SEO plumbing. Real photos for coffee/canyon/landscape; Kongque Shan uses a Biluo
range photo with an honest caption until a dedicated image is sourced.

## 7. Roadmap

- Add dedicated `/coffee`, `/landscape` detail pages and a "producers" section.
- Add a lightweight CMS or MDX for the journal/blog (programmatic SEO).
- Source licensed photography for Kongque Shan and food.
- Add analytics + Core Web Vitals monitoring.
