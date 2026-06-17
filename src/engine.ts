// common-turkic-script — core engine (pure, dependency-free).
//
// Official basis: Turkic Academy + TDK 34-letter Common Turkic Alphabet
// (Ortaq Türk Älipbesi, Baku 2024) and Kazakhstan's 2021 official Latin table.

import type { CharMap, LangProfile, SourceLang, TranslitOptions } from "./types.js";

/** The official 34-letter Common Turkic Alphabet (Ortaq Türk Älipbesi). */
export const COMMON_TURKIC_34: readonly string[] = [
  "A", "Ä", "B", "C", "Ç", "D", "E", "F", "G", "Ğ",
  "H", "I", "İ", "J", "K", "L", "M", "N", "Ñ", "O",
  "Ö", "P", "Q", "R", "S", "Ş", "T", "U", "Ū", "Ü",
  "V", "X", "Y", "Z",
];

// Qazaq Cyrillic -> 34 letters. ұ→ū (macron, distinct from у→u); ы→ı;
// і/и→i; ж=[ʒ]→j.
export const kazakhMap: CharMap = {
  а: "a", ә: "ä", б: "b", в: "v", г: "g", ғ: "ğ", д: "d", е: "e", ё: "yo",
  ж: "j", з: "z", и: "i", й: "y", к: "k", қ: "q", л: "l", м: "m", н: "n",
  ң: "ñ", о: "o", ө: "ö", п: "p", р: "r", с: "s", т: "t", у: "u", ұ: "ū",
  ү: "ü", ф: "f", х: "x", һ: "h", ц: "ts", ч: "ç", ш: "ş", щ: "ş", ъ: "",
  ы: "ı", і: "i", ь: "", э: "e", ю: "yu", я: "ya",
};

// Qırğız Cyrillic -> 34 letters. Differs from Qazaq: ж=[d͡ʒ]→c (Жалпы→Calpı).
export const kyrgyzMap: CharMap = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "c", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", ң: "ñ", о: "o", ө: "ö",
  п: "p", р: "r", с: "s", т: "t", у: "u", ү: "ü", ф: "f", х: "x", ц: "ts",
  ч: "ç", ш: "ş", щ: "ş", ъ: "", ы: "ı", ь: "", э: "e", ю: "yu", я: "ya",
};

/** Per-language profiles, keyed by source-language code. */
export const langProfiles: Record<SourceLang, LangProfile> = {
  kk: { code: "kk", name: "Qazaq", map: kazakhMap },
  ky: { code: "ky", name: "Qırğız", map: kyrgyzMap },
};

function isUpper(ch: string): boolean {
  return ch !== ch.toLowerCase() && ch === ch.toUpperCase();
}

function applyCase(replacement: string, nextChar: string | undefined): string {
  if (replacement.length === 0) return replacement;
  if (replacement.length === 1) return replacement.toUpperCase();
  const nextIsUpper = nextChar !== undefined && isUpper(nextChar);
  if (nextIsUpper) return replacement.toUpperCase();
  return replacement[0].toUpperCase() + replacement.slice(1);
}

function resolveLang(lang: SourceLang | TranslitOptions): SourceLang {
  return typeof lang === "string" ? lang : lang.lang;
}

/**
 * Transliterate Qazaq/Qırğız Cyrillic text into the official 34-letter
 * Common Turkic Alphabet. Pure and idempotent (non-Cyrillic input passes
 * through unchanged).
 *
 * @param text - Source text (Qazaq or Qırğız Cyrillic).
 * @param lang - Source language: `"kk"`, `"ky"`, or `{ lang }`.
 * @returns The transliterated string.
 *
 * @example
 * transliterate("Қазақстан", "kk"); // "Qazaqstan"
 * transliterate("Жалпы", "ky");      // "Calpı"
 * transliterate("Қазақ", { lang: "kk" }); // "Qazaq"
 */
export function transliterate(
  text: string,
  lang: SourceLang | TranslitOptions,
): string {
  const map = langProfiles[resolveLang(lang)].map;
  const chars = Array.from(text);
  let out = "";

  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];
    const replacement = map[ch.toLowerCase()];
    if (replacement === undefined) {
      out += ch;
      continue;
    }
    out += isUpper(ch) ? applyCase(replacement, chars[i + 1]) : replacement;
  }

  return out;
}

/**
 * Transliterate an array of lines in bulk.
 *
 * @param lines - Lines of source text.
 * @param lang - Source language: `"kk"`, `"ky"`, or `{ lang }`.
 * @returns A new array of transliterated lines (same length).
 */
export function transliterateLines(
  lines: readonly string[],
  lang: SourceLang | TranslitOptions,
): string[] {
  return lines.map((line) => transliterate(line, lang));
}

/**
 * Build a reusable transliterator bound to a single source language.
 *
 * @param lang - Source language: `"kk"`, `"ky"`, or `{ lang }`.
 * @returns A function `(text: string) => string`.
 *
 * @example
 * const toLatin = createTransliterator("kk");
 * toLatin("Қазақстан"); // "Qazaqstan"
 */
export function createTransliterator(
  lang: SourceLang | TranslitOptions,
): (text: string) => string {
  const resolved = resolveLang(lang);
  return (text: string) => transliterate(text, resolved);
}

/** List the supported source-language codes. */
export function getSupportedLangs(): SourceLang[] {
  return Object.keys(langProfiles) as SourceLang[];
}
