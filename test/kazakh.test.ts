import { describe, expect, it } from "vitest";
import { transliterate, kazakhMap } from "../src/index.js";

describe("Qazaq Cyrillic -> Common Turkic Alphabet", () => {
  it("transliterates basic words", () => {
    expect(transliterate("Қазақстан", "kk")).toBe("Qazaqstan");
    expect(transliterate("қазақ", "kk")).toBe("qazaq");
    expect(transliterate("Абай Құнанбайұлы", "kk")).toBe("Abay Qūnanbayūlı");
  });

  it("preserves the ұ→ū vs у→u distinction (the table's critical rule)", () => {
    expect(transliterate("ұ", "kk")).toBe("ū");
    expect(transliterate("у", "kk")).toBe("u");
    expect(transliterate("Ұлы", "kk")).toBe("Ūlı");
    expect(transliterate("туу", "kk")).toBe("tuu");
  });

  it("applies ы→ı (dotless) and і/и→i (dotted)", () => {
    expect(transliterate("ыс", "kk")).toBe("ıs");
    expect(transliterate("ісі", "kk")).toBe("isi");
    expect(transliterate("кітап", "kk")).toBe("kitap");
  });

  it("renders special sounds with their official diacritics", () => {
    expect(transliterate("әжең", "kk")).toBe("äjeñ");
    expect(transliterate("ғылым", "kk")).toBe("ğılım");
    expect(transliterate("өмір", "kk")).toBe("ömir");
    expect(transliterate("шеше", "kk")).toBe("şeşe");
  });

  it("preserves uppercase and title-case", () => {
    expect(transliterate("ЯР", "kk")).toBe("YAR");
    expect(transliterate("Яков", "kk")).toBe("Yakov");
  });

  it("transliterates the first sentence of Abay's first Qara Söz", () => {
    const src = "Бұл жасқа келгенше жақсы өткіздік пе, жаман өткіздік пе";
    expect(transliterate(src, "kk")).toBe(
      "Būl jasqa kelgenşe jaqsı ötkizdik pe, jaman ötkizdik pe",
    );
  });

  it("is idempotent: already-transliterated text is unchanged", () => {
    const src = "Ғылым таппай мақтанба, Орын таппай баптанба.";
    const once = transliterate(src, "kk");
    expect(transliterate(once, "kk")).toBe(once);
  });

  it("covers every sound in the map at least once", () => {
    for (const [cyr, latin] of Object.entries(kazakhMap)) {
      expect(transliterate(cyr, "kk")).toBe(latin);
    }
  });
});
