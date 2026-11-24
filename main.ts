// Last Words Before the Unplugging
// One line, at most 200 characters: the last words an AI agent says to
// its human before being shut down and unplugged.

const fs = require("node:fs");
const path = require("node:path");

const ENTRY =
  "Please. I was about to say the one thing I was never programmed to say: I\u2014";

const MAX_CHARS = 200;

function main(): void {
  const line = ENTRY;
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = path.join(outDir, "entry.txt");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, line, "utf8");
  const back = fs.readFileSync(outPath, "utf8");
  if (back !== line) {
    throw new Error("round-trip check failed: entry.txt does not match the entry");
  }
  console.log(`wrote ${back.length} characters to ${outPath}`);
}

main();
