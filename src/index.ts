// common-turkic-script — public entry point.
// Transliterate Qazaq (kk) and Qırğız (ky) Cyrillic into the official
// 34-letter Common Turkic Alphabet (Ortaq Türk Älipbesi).

export type { SourceLang, TranslitOptions, CharMap, LangProfile } from "./types.js";
export {
  COMMON_TURKIC_34,
  kazakhMap,
  kyrgyzMap,
  langProfiles,
  transliterate,
  transliterateLines,
  createTransliterator,
  getSupportedLangs,
} from "./engine.js";
