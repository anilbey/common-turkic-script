#!/usr/bin/env node
// common-turkic-script — CLI.
// Transliterate Qazaq/Qırğız Cyrillic into the Common Turkic Alphabet.
//
//   echo "Қазақстан" | common-turkic-script --lang kk
//   common-turkic-script --lang ky input.txt
//   common-turkic-script -l kk "Қазақ"

import { readFileSync } from "node:fs";
import { transliterate, getSupportedLangs } from "./engine.js";
import type { SourceLang } from "./types.js";

const HELP = `common-turkic-script — Common Turkic Alphabet transliterator

Usage:
  common-turkic-script --lang <kk|ky> [text]
  echo "<text>" | common-turkic-script --lang <kk|ky>
  common-turkic-script --lang <kk|ky> <file>

Options:
  -l, --lang <kk|ky>   Source Cyrillic language (required: kk=Qazaq, ky=Qırğız)
  -h, --help           Show this help
  -v, --version        Show version

Examples:
  common-turkic-script -l kk "Қазақстан"     # Qazaqstan
  echo "Жалпы" | common-turkic-script -l ky  # Calpı
`;

interface ParsedArgs {
  lang?: string;
  help: boolean;
  version: boolean;
  rest: string[];
}

function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = { help: false, version: false, rest: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") {
      parsed.help = true;
    } else if (arg === "-v" || arg === "--version") {
      parsed.version = true;
    } else if (arg === "-l" || arg === "--lang") {
      parsed.lang = argv[i + 1];
      i += 1;
    } else if (arg.startsWith("--lang=")) {
      parsed.lang = arg.slice("--lang=".length);
    } else {
      parsed.rest.push(arg);
    }
  }
  return parsed;
}

function readStdin(): string {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function getVersion(): string {
  try {
    const url = new URL("../package.json", import.meta.url);
    const pkg = JSON.parse(readFileSync(url, "utf8")) as { version?: string };
    return pkg.version ?? "unknown";
  } catch {
    return "unknown";
  }
}

export function run(argv: string[]): number {
  const args = parseArgs(argv);

  if (args.help) {
    process.stdout.write(HELP);
    return 0;
  }
  if (args.version) {
    process.stdout.write(`${getVersion()}\n`);
    return 0;
  }

  const supported = getSupportedLangs();
  if (!args.lang || !supported.includes(args.lang as SourceLang)) {
    process.stderr.write(
      `Error: --lang must be one of: ${supported.join(", ")}\n\n${HELP}`,
    );
    return 1;
  }
  const lang = args.lang as SourceLang;

  let input: string;
  if (args.rest.length > 0) {
    // Treat a single existing readable file arg as a file; otherwise as text.
    if (args.rest.length === 1) {
      try {
        input = readFileSync(args.rest[0], "utf8");
      } catch {
        input = args.rest.join(" ");
      }
    } else {
      input = args.rest.join(" ");
    }
  } else {
    input = readStdin();
  }

  process.stdout.write(transliterate(input, lang));
  return 0;
}

const isMain =
  typeof process !== "undefined" &&
  process.argv[1] !== undefined &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href;

if (isMain) {
  process.exit(run(process.argv.slice(2)));
}
