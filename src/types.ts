// common-turkic-script
// Official 34-letter Common Turkic Alphabet (Ortaq Türk Älipbesi;
// Turkic Academy + TDK, Baku 2024) — source-language transliteration types.

/** Supported source Cyrillic languages: "kk" = Qazaq, "ky" = Qırğız. */
export type SourceLang = "kk" | "ky";

/** Options object accepted by {@link transliterate}. */
export interface TranslitOptions {
  /** Source Cyrillic language: `"kk"` (Qazaq) or `"ky"` (Qırğız). */
  lang: SourceLang;
}

/** Lowercase Cyrillic letter -> Common Turkic Alphabet mapping. */
export type CharMap = Record<string, string>;

/** Metadata + mapping table for a single source language. */
export interface LangProfile {
  /** Language code. */
  code: SourceLang;
  /** Human-readable language name (written in the Common Turkic Alphabet). */
  name: string;
  /** Lowercase Cyrillic -> Common Turkic Alphabet mapping. */
  map: CharMap;
}
