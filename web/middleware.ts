import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/locales";

/**
 * The public origin, taken from the proxy's headers.
 *
 * `request.nextUrl` is not usable for this: on the standalone server it is built
 * from the process's own bind address, so behind nginx a redirect to /en came out
 * as http://localhost:3000/en — an address no visitor can reach. The forwarded
 * headers are the only trustworthy source; falling back to `nextUrl` keeps a
 * direct local run working.
 */
function publicOrigin(request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;
  const proto =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");
  return `${proto}://${host}`;
}

/**
 * Every page lives under a locale segment. Anything else is redirected to the
 * default locale: /journal → /en/journal, and / → /en.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, firstSegment] = pathname.split("/");

  if (isLocale(firstSegment)) return NextResponse.next();

  const target = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(new URL(target, publicOrigin(request)));
}

export const config = {
  // Skip Next internals, static assets and SEO files.
  matcher: ["/((?!_next|favicon\\.svg|robots\\.txt|sitemap\\.xml|images).*)"],
};
