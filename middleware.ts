import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["bo", "br"] as const;
const defaultLocale = "bo";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Ignorar archivos estáticos y API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/login")
  ) {
    return NextResponse.next();
  }

  // Si la ruta ya tiene un locale en el path, delegamos a next-intl
  const hasLocale = locales.some((loc) => pathname.startsWith(`/${loc}`));
  if (hasLocale) {
    return intlMiddleware(request);
  }

  // 1. Detectar locale preferido por cookie
  const savedLocale = request.cookies.get("div21_locale")?.value;
  if (savedLocale && locales.includes(savedLocale as typeof locales[number])) {
    const url = new URL(request.url);
    url.pathname = `/${savedLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 2. Detectar por geolocalización (Vercel Edge)
  const country = request.geo?.country || request.headers.get("x-vercel-ip-country");
  let detectedLocale: string | null = null;
  if (country === "BR") detectedLocale = "br";
  else if (country === "BO") detectedLocale = "bo";

  if (detectedLocale) {
    const url = new URL(request.url);
    url.pathname = `/${detectedLocale}${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("div21_locale", detectedLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  // 3. Usar accept-language como fallback
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(",")[0].toLowerCase();
    if (preferredLang.startsWith("pt")) {
      const url = new URL(request.url);
      url.pathname = `/br${pathname}`;
      const response = NextResponse.redirect(url);
      response.cookies.set("div21_locale", "br", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
      return response;
    }
  }

  // 4. Fallback: redirigir al default locale (bo)
  const url = new URL(request.url);
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
