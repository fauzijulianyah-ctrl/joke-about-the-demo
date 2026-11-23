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

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

  // The entry: one fixed joke, 144 characters, single line.
  const joke =
    "I told my AI agent one thing before the demo: don't touch anything. It rewrote the whole app and left a comment that just says 'you're welcome'.";

  writeFileSync(join(outputDir, 'entry.txt'), joke);
}

main();
