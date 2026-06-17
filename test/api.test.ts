import { describe, expect, it } from "vitest";
import {
  transliterate,
  transliterateLines,
  createTransliterator,
  getSupportedLangs,
  langProfiles,
  COMMON_TURKIC_34,
} from "../src/index.js";

describe("public API surface", () => {
  it("accepts an options object as the lang argument", () => {
    expect(transliterate("Қазақ", { lang: "kk" })).toBe("Qazaq");
    expect(transliterate("Жол", { lang: "ky" })).toBe("Col");
  });

  it("createTransliterator returns a reusable bound function", () => {
    const toLatinKk = createTransliterator("kk");
    expect(toLatinKk("Қазақстан")).toBe("Qazaqstan");
    expect(toLatinKk("Абай")).toBe("Abay");

    const toLatinKy = createTransliterator({ lang: "ky" });
    expect(toLatinKy("Жалпы")).toBe("Calpı");
  });

  it("transliterateLines maps an array of lines", () => {
    const lines = ["Қазақ", "Жалпы"];
    expect(transliterateLines(lines, "kk")).toEqual(["Qazaq", "Jalpı"]);
  });

  it("getSupportedLangs lists kk and ky", () => {
    expect(getSupportedLangs().sort()).toEqual(["kk", "ky"]);
  });

  it("exposes langProfiles metadata", () => {
    expect(langProfiles.kk.name).toBe("Qazaq");
    expect(langProfiles.ky.name).toBe("Qırğız");
  });

  it("exposes the 34-letter alphabet", () => {
    expect(COMMON_TURKIC_34).toHaveLength(34);
    expect(COMMON_TURKIC_34).toContain("Ñ");
    expect(COMMON_TURKIC_34).toContain("Ū");
  });

  it("passes non-Cyrillic input through unchanged", () => {
    expect(transliterate("Hello 123!", "kk")).toBe("Hello 123!");
    expect(transliterate("", "kk")).toBe("");
  });
});
