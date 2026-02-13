import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './lib/i18n/config'

const activeLocales = ['br', 'bo']; // Países activos fase 1

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Ignorar archivos estáticos y API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts')
  ) {
    return NextResponse.next()
  }

  // 2. Comprobar si la ruta ya tiene un locale (ej. /br/...)
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // 3. Detectar locale preferido
  const locale = getPreferredLocale(request)

  // 4. Redirigir a la URL con locale
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

function getPreferredLocale(request: NextRequest): string {
  // A. Cookie de preferencia (si el usuario ya eligió antes)
  const savedLocale = request.cookies.get('div21_locale')?.value
  if (savedLocale && activeLocales.includes(savedLocale)) {
    return savedLocale
  }

  // B. Geolocalización de Vercel (request.geo o header x-vercel-ip-country)
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country')
  if (country === 'BR') return 'br'
  if (country === 'BO') return 'bo'

  // C. Detección por idioma del navegador (Accept-Language)
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(',')[0].toLowerCase()
    if (preferredLang.startsWith('pt')) return 'br'
    if (preferredLang.startsWith('es-bo')) return 'bo'
    // Default fallback si detecta español pero no es explícitamente BO, 
    // podríamos enviarlo a BO por ahora o al default.
  }

  // D. Fallback default del proyecto (br)
  return i18n.defaultLocale
}

export const config = {
  matcher: [
    // Coincidir con todas las rutas excepto archivos estáticos
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
