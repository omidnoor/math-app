import { translations, type TranslationKey } from './translations';

export type Locale = 'en' | 'zh';

export function t(key: TranslationKey, locale: Locale = 'en'): string {
  const langTable = translations[locale] ?? translations.en;
  return langTable[key] ?? translations.en[key] ?? key;
}

export function safeTranslate(
  key: string,
  locale: Locale = 'en',
): string {
  const langTable = translations[locale] as Record<string, string> | undefined;
  return langTable?.[key] ?? (translations.en as Record<string, string>)[key] ?? key;
}
