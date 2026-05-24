import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './lib/i18n/config'

const activeLocales = ['bo', 'br']

export async function middleware(request: NextRequest) {
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

  // 2. Comprobar si la ruta ya tiene un locale
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
  const savedLocale = request.cookies.get('div21_locale')?.value
  if (savedLocale && activeLocales.includes(savedLocale)) {
    return savedLocale
  }

  const country = request.geo?.country || request.headers.get('x-vercel-ip-country')
  if (country === 'BR') return 'br'
  if (country === 'BO') return 'bo'

  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLang = acceptLanguage.split(',')[0].toLowerCase()
    if (preferredLang.startsWith('pt')) return 'br'
    if (preferredLang.startsWith('es-bo')) return 'bo'
  }

  return i18n.defaultLocale
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
