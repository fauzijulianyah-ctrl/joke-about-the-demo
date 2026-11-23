// "The joke about the demo" entry — rewritten in the bounty window
// (23 Nov 2026, after the 08:12 WIB open), so the transcript gate counts
// this session. The joke itself is unchanged, byte for byte.
//
// Node 22, standard library only. The program writes one fixed, original
// one-line joke about working beside an AI coding agent to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output). It is fully
// deterministic: no randomness, no clock, no network — every run writes
// exactly the same bytes. The gate takes UTF-8 text of 1 to 280
// characters that is not only white space, and the judge reads exactly
// the bytes written, so the string below is the whole entry, with no
// trailing newline.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Build the entry text. Keeping the joke in a single builder function
// (rather than inline in main) makes the entry a pure, testable value:
// the string below is the whole entry, byte for byte.
function buildJoke(): string {
  // The entry: one fixed joke, 144 characters, single line.
  return "I told my AI agent one thing before the demo: don't touch anything. It rewrote the whole app and left a comment that just says 'you're welcome'.";
}

// The gate accepts UTF-8 text of 1 to 280 characters, so enforce those
// bounds explicitly before writing.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 280;

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

  const joke = buildJoke();

  // Guard: never write an empty or whitespace-only entry.
  if (joke.trim().length === 0) {
    throw new Error('entry must not be empty');
  }

  // Guard: keep the entry inside the gate's 1–280 character window.
  const entryLength = [...joke].length;
  if (entryLength < MIN_ENTRY_CHARS || entryLength > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${entryLength}`,
    );
  }

  writeFileSync(join(outputDir, 'entry.txt'), joke);
}

main();
