export const i18n = {
  defaultLocale: 'br',
  locales: ['br', 'bo', 'ar', 'py', 'es', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
