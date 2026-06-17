# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-06-17

### Added

- `transliterate(text, lang)` — transliterate Qazaq/Qırğız Cyrillic to the
  official 34-letter Common Turkic Alphabet. `lang` accepts `"kk"`, `"ky"`,
  or an options object `{ lang }`.
- `transliterateLines(lines, lang)` — bulk transliteration of an array.
- `createTransliterator(lang)` — reusable function bound to one language.
- `getSupportedLangs()` — list supported source-language codes.
- `langProfiles` and `COMMON_TURKIC_34` exports.
- CLI (`common-turkic-script`) supporting inline text, stdin, and files.
- ESM + CJS builds with bundled TypeScript declarations.

[Unreleased]: https://github.com/anilbey/common-turkic-script/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/anilbey/common-turkic-script/releases/tag/v0.1.0
