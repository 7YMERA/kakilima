export const locales = ["en", "ms", "zh", "ta"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

// Each language is labelled in its own script so people can find it without reading the current one.
export const localeNames: Record<Locale, string> = {
  en: "English",
  ms: "Bahasa Melayu",
  zh: "中文",
  ta: "தமிழ்",
};

// Value for the html lang attribute, so screen readers pick the right voice.
export const htmlLang: Record<Locale, string> = {
  en: "en-MY",
  ms: "ms-MY",
  zh: "zh-Hans-MY",
  ta: "ta-MY",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
