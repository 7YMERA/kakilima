import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "./i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

// Picks a language from the saved choice first, then the browser's preferred languages.
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { base } of ranked) {
    // Browsers often report Malay as "ms" but some send "my" or "zsm".
    const normalised = base === "zsm" ? "ms" : base;
    if (hasLocale(normalised)) return normalised;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const current = locales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));

  if (current) {
    // Remember the language a visitor is reading in, so the next visit opens in it.
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== current) {
      response.cookies.set(LOCALE_COOKIE, current, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    }
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and anything that looks like a file (favicon.ico, images).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
