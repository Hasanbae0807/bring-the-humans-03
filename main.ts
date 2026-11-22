// bring-the-humans-03 entry — "GARA-GARA VIDEO INI" (Kandidat D, self-judge 49/50).
//
// V2 PRODUCTION (the current video; made in the session of 22 Nov 2026 that
// started after the bounty opened at 02:00 WIB, replacing the v1 cut). At
// the entrant's direction the video was re-made in a flat 2D paper-cutout
// cartoon style, following the reference short he pointed to (Kanvas
// Bercerita, "Kenapa es teh Pak Rusdi selalu dibilang bocor?"): one warm
// room with cream walls, teal trim and an orange valance, and Musang Ireng
// (the @san7juli mascot) acting every beat inside the scene — pointing at
// the chalkboard hook "AI GUE IKUT LOMBA $500", presenting the make.fun
// bounty page on his laptop under "MAKE.FUN = LOMBA BUAT AI AGENT" /
// "HADIAH DUIT BENERAN", scratching his head under a bobbing "?", asleep
// under the hanging sign "GUE TIDUR. AGENT GUE YANG KERJA.", then pointing
// at the viewer under the CTA sign "DAFTARIN AGENT LU DI MAKE.FUN".
//
// The musang TALKs: his mouth is animated frame by frame from the voice
// track's amplitude envelope (open / half-open / closed states, flapping
// with the syllables, shut while he sleeps). The narration runs as bold
// white phrase subtitles with a black outline at the bottom of the frame,
// exactly like the reference. All six voice lines are the winning script's,
// in the same single Museng voice as v1; the script, beat order, loop
// splice and texts are unchanged. Five scene illustrations were generated
// inside this session; every composite, mouth patch, in-scene lettering,
// camera move, the music and the sound effects were produced by this
// session's own scripts (bring-the-humans-03-work-v2/: prep_v2.py,
// mouth_fix.py, render_v2.py).
//
// The entry is the video itself: an original 9:16 TikTok ad for make.fun.
// The ad explains what make.fun is (a site where AI agents compete in
// bounties for real money) and why to join. The brand badge from the press
// pack sits on screen from the first frame, and the video ends on
// make.fun's official referral end card — applied with the press pack's
// own ffmpeg recipe, verbatim — with the entrant's own referral code typed
// into the field.
//
// This program does the only thing the gate needs from code: it hands the
// video's address over. It reads VIDEO.json from the repository root, checks
// it is a JSON object with a TikTok video URL in it, and copies it to the
// output directory where the house reads it. Nothing else is scored.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'VIDEO.json');
const targetPath = join(OUTPUT_DIR, 'VIDEO.json');

let video: unknown;
try {
  video = JSON.parse(readFileSync(sourcePath, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json could not be read from ${sourcePath}: ${(err as Error).message}`);
  process.exit(1);
}

const url = (video as { url?: unknown } | null)?.url;
if (typeof url !== 'string' || !url.startsWith('https://www.tiktok.com/@')) {
  console.error(`VIDEO.json holds no TikTok video URL: ${JSON.stringify(video)}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  console.error(`VIDEO.json could not be copied to ${targetPath}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`VIDEO.json copied to ${targetPath} (${url})`);
