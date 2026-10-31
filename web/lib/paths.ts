/**
 * Every internal link is `/{locale}` + an in-page anchor or a route segment.
 * One helper keeps that shape in a single place so a locale prefix can never
 * be forgotten — or doubled — at a call site.
 */
export function path(locale: string, href = ""): string {
  return `/${locale}${href}`;
}

/** Anchor-only nav targets, e.g. "#coffee", point inside the home page. */
export function isAnchor(href: string): boolean {
  return href.startsWith("#");
}
