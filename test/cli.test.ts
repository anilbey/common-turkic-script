import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { run } from "../src/cli.js";

function captureStdout(): { read: () => string; restore: () => void } {
  let buffer = "";
  const spy = vi
    .spyOn(process.stdout, "write")
    .mockImplementation((chunk: string | Uint8Array) => {
      buffer += String(chunk);
      return true;
    });
  return {
    read: () => buffer,
    restore: () => spy.mockRestore(),
  };
}

function captureStderr(): { read: () => string; restore: () => void } {
  let buffer = "";
  const spy = vi
    .spyOn(process.stderr, "write")
    .mockImplementation((chunk: string | Uint8Array) => {
      buffer += String(chunk);
      return true;
    });
  return {
    read: () => buffer,
    restore: () => spy.mockRestore(),
  };
}

describe("CLI", () => {
  let out: ReturnType<typeof captureStdout>;
  let err: ReturnType<typeof captureStderr>;

  beforeEach(() => {
    out = captureStdout();
    err = captureStderr();
  });

  afterEach(() => {
    out.restore();
    err.restore();
  });

  it("transliterates inline text", () => {
    const code = run(["--lang", "kk", "Қазақстан"]);
    expect(code).toBe(0);
    expect(out.read()).toBe("Qazaqstan");
  });

  it("supports the -l short flag and --lang= form", () => {
    expect(run(["-l", "ky", "Жалпы"])).toBe(0);
    expect(out.read()).toBe("Calpı");
  });

  it("errors on a missing or invalid language", () => {
    const code = run(["Қазақ"]);
    expect(code).toBe(1);
    expect(err.read()).toContain("--lang must be one of");
  });

  it("prints help with --help", () => {
    expect(run(["--help"])).toBe(0);
    expect(out.read()).toContain("Usage:");
  });

  it("prints a version with --version", () => {
    expect(run(["--version"])).toBe(0);
    expect(out.read().trim().length).toBeGreaterThan(0);
  });
});
