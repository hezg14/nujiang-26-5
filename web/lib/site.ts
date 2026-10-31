/**
 * Site-wide constants that are not translated copy.
 * Anything a reader sees as prose lives in dictionaries/*.json instead.
 */

/** Absolute origin, used for canonical URLs, Open Graph images and JSON-LD. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nujiang-26-5.example.com";

/** Shown once, in the footer, as the site's own coordinates. */
export const COORDS = "26.5°N 98.85°E";

/** Lead capture: "demo" acknowledges in the browser, "live" posts to the API. */
export const LEAD_MODE: "demo" | "live" =
  process.env.NEXT_PUBLIC_LEAD_MODE === "live" ? "live" : "demo";

/**
 * An empty value means "same origin" — the Docker image puts the API behind the
 * same host at /api, so the live deployment needs no base URL and no CORS.
 * `??` rather than `||` on purpose: "" must survive, not fall back.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

/** Author used in article JSON-LD. */
export const AUTHOR = "hezg.dev";
