import { describe, expect, it } from "vitest";
import { transliterate, kyrgyzMap } from "../src/index.js";

describe("Qırğız Cyrillic -> Common Turkic Alphabet", () => {
  it("transliterates ж as c (the key difference from Qazaq)", () => {
    expect(transliterate("Жалпы", "ky")).toBe("Calpı");
    expect(transliterate("жол", "ky")).toBe("col");
    expect(transliterate("жигит", "ky")).toBe("cigit");
  });

  it("renders the same ж as j in Qazaq but c in Qırğız", () => {
    expect(transliterate("жан", "kk")).toBe("jan");
    expect(transliterate("жан", "ky")).toBe("can");
  });

  it("renders special sounds with their official diacritics", () => {
    expect(transliterate("Ала-Тоо", "ky")).toBe("Ala-Too");
    expect(transliterate("өмүр", "ky")).toBe("ömür");
    expect(transliterate("кыргыз", "ky")).toBe("kırgız");
    expect(transliterate("элиң", "ky")).toBe("eliñ");
  });

  it("transliterates a Toktogul line", () => {
    expect(transliterate("Аккан суу", "ky")).toBe("Akkan suu");
  });

  it("is idempotent: already-transliterated text is unchanged", () => {
    const src = "Эрдин күчү — сом темир, Эритүүгө эр керек.";
    const once = transliterate(src, "ky");
    expect(transliterate(once, "ky")).toBe(once);
  });

  it("covers every sound in the map at least once", () => {
    for (const [cyr, latin] of Object.entries(kyrgyzMap)) {
      expect(transliterate(cyr, "ky")).toBe(latin);
    }
  });
});
