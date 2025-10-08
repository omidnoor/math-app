import { translations, type TranslationKey } from './translations';
import type { LessonId } from '@/types';

export type Locale = 'en' | 'zh';

// Runtime lesson-chunked translations merged on demand
const dynamicTranslations: Record<Locale, Record<string, string>> = {
  en: {},
  zh: {},
};

export function t(key: TranslationKey, locale: Locale = 'en'): string {
  const langTable = {
    ...dynamicTranslations[locale],
    ...(translations[locale] ?? translations.en),
  } as Record<string, string>;
  return langTable[key] ?? (translations.en as Record<string, string>)[key] ?? key;
}

export function safeTranslate(key: string, locale: Locale = 'en'): string {
  const langTable = {
    ...dynamicTranslations[locale],
    ...((translations[locale] as Record<string, string>) ?? {}),
  } as Record<string, string>;
  return langTable[key] ?? (translations.en as Record<string, string>)[key] ?? key;
}

export function addTranslations(locale: Locale, data: Record<string, string>) {
  dynamicTranslations[locale] = { ...dynamicTranslations[locale], ...data };
}

export async function loadLessonTranslations(lessonId: LessonId) {
  const tryLoad = async (locale: Locale) => {
    try {
      const mod = await import(`@/lib/content/lesson-translations/${lessonId}.${locale}.json`);
      addTranslations(locale, (mod.default ?? {}) as Record<string, string>);
    } catch {
      // ignore missing files until authored
    }
  };
  await Promise.all([tryLoad('en'), tryLoad('zh')]);
}
