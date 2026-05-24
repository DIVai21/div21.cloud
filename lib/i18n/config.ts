export const i18n = {
  defaultLocale: 'bo',
  locales: ['bo', 'br'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
