/**
 * Locale list only — no dictionary loading. The middleware runs on the edge and
 * only needs to know which prefixes are valid, so it imports this file rather
 * than i18n.ts (which pulls both dictionaries).
 */
export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

/** English first: the site is meant for an international reader before a local one. */
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Falls back to the default locale for anything unrecognised. */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}
