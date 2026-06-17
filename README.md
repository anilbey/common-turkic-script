<div align="center">

# common-turkic-script

**Qazaq (kk) jäne Qırğız (ky) kirilını resmi 34 tamgalı Ortaq Türk Jazuwına awdaratın, täweldiliksiz awdarğış.**

_Zero-dependency transliterator from Qazaq (kk) and Qırğız (ky) Cyrillic to the official 34-letter Common Turkic Alphabet._

[![npm version](https://img.shields.io/npm/v/common-turkic-script.svg?logo=npm)](https://www.npmjs.com/package/common-turkic-script)
[![npm downloads](https://img.shields.io/npm/dm/common-turkic-script.svg)](https://www.npmjs.com/package/common-turkic-script)
[![CI](https://github.com/OWNER/common-turkic-script/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/common-turkic-script/actions/workflows/ci.yml)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/common-turkic-script)](https://bundlephobia.com/package/common-turkic-script)
[![types included](https://img.shields.io/npm/types/common-turkic-script.svg?logo=typescript)](https://www.typescriptlang.org/)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/common-turkic-script?activeTab=dependencies)
[![npm provenance](https://img.shields.io/badge/npm-provenance-blue?logo=npm)](https://docs.npmjs.com/generating-provenance-statements)
[![license MIT](https://img.shields.io/npm/l/common-turkic-script.svg)](./LICENSE)

**[Qazaqşa](#qazaqşa) · [English](#english)**

</div>

---

<a name="qazaqşa"></a>

## Qazaqşa

> Bul README-diñ qazaqşa böligi tutasımen 34 tamgalı **Ortaq Türk Jazuwında** jazılğan — yağni paket öziniñ şığısımen jazılğan.

`common-turkic-script` — Qazaq (`kk`) jäne Qırğız (`ky`) kiril mätinin resmi 34 tamgalı **Ortaq Türk Jazuwına** (Türk Akademiyası + TDK, Baku 2024) awdaratın saf, täweldiliksiz TypeScript paketi.

### Erekşelikter

- **Saf funksiya**, eş täweldilik joq; brauzerde de, Node-ta da jumıs isteydi.
- **TypeScript tipteri qosılğan** (`.d.ts`), ESM + CJS qoldaw.
- **Bas/kişi tamga saqtaladı** (`Ұ`→`Ū`, `Я`→`Ya`/`YA`).
- **Idempotent**: bir ret awdarılğan ortaq jazuw mätini qaytadan awdarılğanda özgermeydi.
- **Tree-shakeable**, minzip ölşemi öte kişi.
- **CLI** qosılğan: terminalda tikeley qoldanu.

### Ornatuv

```bash
npm install common-turkic-script
```

### Tez bastaw

```ts
import { transliterate, createTransliterator } from "common-turkic-script";

transliterate("Қазақстан", "kk"); // "Qazaqstan"
transliterate("Жалпы", "ky");      // "Calpı"

// Bir tilge baylanğan qaytımdı funksiya:
const toLatin = createTransliterator("kk");
toLatin("Абай Құнанбайұлы"); // "Abay Qūnanbayūlı"
```

### API

| Funksiya | Sipattama |
| --- | --- |
| `transliterate(text, lang)` | Mätindi awdaradı. `lang`: `"kk"`, `"ky"` nemese `{ lang }`. |
| `transliterateLines(lines, lang)` | Joldar massivin tolığımen awdaradı. |
| `createTransliterator(lang)` | Bir tilge baylanğan `(text) => string` funksiyasın qaytaradı. |
| `getSupportedLangs()` | Qoldaw körsetilgen til kodtarın qaytaradı. |
| `langProfiles` | Här tildiñ metaderegi men kestesi. |
| `COMMON_TURKIC_34` | 34 tamgadan turatın massiv. |

### Resmi keste eskertpeleri

| Kiril | kk | ky | Eskertpe |
| --- | --- | --- | --- |
| ұ | ū | — | makron; `у`→`u`-dan bölek (eñ mañızdı ayırma) |
| ы | ı | ı | noqatsız I |
| і / и | i | i | noqatlı İ |
| й | y | y | |
| ж | j | **c** | Qazaq [ʒ]→j, Qırğız [d͡ʒ]→c |
| ч | ç | ç | |
| х | x | x | |
| ң | ñ | ñ | |

---

<a name="english"></a>

## English

`common-turkic-script` is a pure, zero-dependency TypeScript package that transliterates **Qazaq (`kk`)** and **Qırğız (`ky`)** Cyrillic text into the official 34-letter **Common Turkic Alphabet** (_Ortaq Türk Älipbesi_; Turkic Academy + TDK, Baku 2024).

### Features

- **Pure function**, no dependencies; runs in the browser and in Node.
- **TypeScript types included** (`.d.ts`), ESM + CJS support.
- **Case-preserving** (`Ұ`→`Ū`, `Я`→`Ya`/`YA`).
- **Idempotent**: text already in the common alphabet is left unchanged.
- **Tree-shakeable**, tiny minzipped footprint.
- **CLI included** for direct terminal use.

### Install

```bash
npm install common-turkic-script
```

### Quick start

```ts
import { transliterate, createTransliterator } from "common-turkic-script";

transliterate("Қазақстан", "kk"); // "Qazaqstan"
transliterate("Жалпы", "ky");      // "Calpı"

// A reusable function bound to one language:
const toLatin = createTransliterator("kk");
toLatin("Абай Құнанбайұлы"); // "Abay Qūnanbayūlı"
```

### CommonJS

```js
const { transliterate } = require("common-turkic-script");
transliterate("Қазақ", "kk"); // "Qazaq"
```

### Browser (via CDN)

```html
<script type="module">
  import { transliterate } from "https://cdn.jsdelivr.net/npm/common-turkic-script/+esm";
  console.log(transliterate("Қазақстан", "kk")); // "Qazaqstan"
</script>
```

### API

| Function | Description |
| --- | --- |
| `transliterate(text, lang)` | Transliterate text. `lang`: `"kk"`, `"ky"`, or `{ lang }`. |
| `transliterateLines(lines, lang)` | Transliterate an array of lines in bulk. |
| `createTransliterator(lang)` | Returns a reusable `(text) => string` bound to one language. |
| `getSupportedLangs()` | Returns the supported language codes. |
| `langProfiles` | Per-language metadata and mapping table. |
| `COMMON_TURKIC_34` | The 34-letter alphabet as an array. |

```ts
import type {
  SourceLang,
  TranslitOptions,
  CharMap,
  LangProfile,
} from "common-turkic-script";
```

### CLI

```bash
# Inline text
npx common-turkic-script --lang kk "Қазақстан"   # Qazaqstan

# From stdin
echo "Жалпы" | npx common-turkic-script -l ky      # Calpı

# From a file
npx common-turkic-script --lang kk input.txt > output.txt
```

| Flag | Description |
| --- | --- |
| `-l`, `--lang <kk\|ky>` | Source Cyrillic language (required). |
| `-h`, `--help` | Show help. |
| `-v`, `--version` | Show version. |

### Official table notes

| Cyrillic | kk | ky | Note |
| --- | --- | --- | --- |
| ұ | ū | — | macron; distinct from `у`→`u` (the most critical distinction) |
| ы | ı | ı | dotless I |
| і / и | i | i | dotted İ |
| й | y | y | |
| ж | j | **c** | Qazaq [ʒ]→j, Qırğız [d͡ʒ]→c |
| ч | ç | ç | |
| х | x | x | |
| ң | ñ | ñ | |

### Source & standard

The mapping follows the official 34-letter Common Turkic Alphabet agreed by the
Turkic World Common Alphabet Commission (Turkic Academy + TDK) in Baku,
September 2024, and Kazakhstan's 2021 official Latin table.

The 34 letters: `A Ä B C Ç D E F G Ğ H I İ J K L M N Ñ O Ö P Q R S Ş T U Ū Ü V X Y Z`.

### Contributing

Contributions are welcome. Please run `npm run lint`, `npm run build`, and
`npm test` before opening a pull request. See [CHANGELOG.md](./CHANGELOG.md).

### License

[MIT](./LICENSE)
