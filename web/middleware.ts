import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/locales";

/**
 * Every page lives under a locale segment. Anything else is redirected to the
 * default locale: /journal → /en/journal, and / → /en.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, firstSegment] = pathname.split("/");

  if (isLocale(firstSegment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, static assets and SEO files.
  matcher: ["/((?!_next|favicon\\.svg|robots\\.txt|sitemap\\.xml|images).*)"],
};
