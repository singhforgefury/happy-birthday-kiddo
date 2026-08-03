/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE — this is the only file you need to touch
 *  to replace photos, captions, reasons, songs and the letters.
 * ─────────────────────────────────────────────────────────────
 */

export const BIRTHDAY = {
  name: "Lisha",
  date: "13 August",
  title: "Happy Birthday, Lisha ❤️",
  subtitle:
    "Today isn't just your birthday. It's the day the world became a little more beautiful.",
};

/**
 * MUSIC — drop your .mp3 files into `public/music/` and keep the same names,
 * or change `src` to any URL. Titles/artists are free text.
 */
export type Song = { title: string; artist: string; src: string };

export const songs: Song[] = [
  { title: "Song One — Replace Me", artist: "Our Song", src: "/music/song-1.mp3" },
  { title: "Song Two — Replace Me", artist: "Our Song", src: "/music/song-2.mp3" },
  { title: "Song Three — Replace Me", artist: "Our Song", src: "/music/song-3.mp3" },
  { title: "Song Four — Replace Me", artist: "Our Song", src: "/music/song-4.mp3" },
];

/** OUR STORY timeline */
export type StoryEvent = { icon: string; title: string; place: string; note: string };

export const story: StoryEvent[] = [
  {
    icon: "🥋",
    title: "First saw each other",
    place: "MMA Gym",
    note: "Before a single word, there was already a feeling.",
  },
  {
    icon: "🏸",
    title: "First met",
    place: "Badminton at Vindha Gardens Society",
    note: "A game, a laugh, and the beginning of everything.",
  },
  {
    icon: "☕",
    title: "First official date",
    place: "Pawfee House",
    note: "Coffee got cold because we forgot the world existed.",
  },
  {
    icon: "❤️",
    title: "Love Anniversary",
    place: "10 April 2025",
    note: "The day 'us' became a promise.",
  },
  {
    icon: "🎂",
    title: "Happy Birthday",
    place: "13 August",
    note: "Today. Yours. Ours. Forever my favourite date.",
  },
];

/**
 * MEMORY GALLERY — 16 photos.
 * To use your own photo: put the file in `src/assets/memories/` and import it,
 * or simply drop files into `public/memories/` named photo-01.jpg … photo-16.jpg
 * (that's what the paths below already expect). Until then an elegant
 * placeholder frame is shown automatically.
 */
export type Memory = { src: string; caption: string; span: "tall" | "wide" | "normal" };

const spans: Memory["span"][] = [
  "tall",
  "normal",
  "wide",
  "normal",
  "normal",
  "tall",
  "normal",
  "wide",
  "normal",
  "tall",
  "normal",
  "normal",
  "wide",
  "normal",
  "tall",
  "normal",
];

export const memories: Memory[] = Array.from({ length: 16 }, (_, i) => ({
  src: `/memories/photo-${String(i + 1).padStart(2, "0")}.jpg`,
  caption: `Caption ${i + 1} — replace me with the story behind this photo.`,
  span: spans[i] ?? "normal",
}));

/** 13 THINGS I LOVE ABOUT YOU */
export const reasons: string[] = Array.from(
  { length: 13 },
  (_, i) => `Reason ${i + 1} — replace this with something only you two would understand.`,
);

/** FINAL LETTER (handwritten paper) */
export const letter = {
  greeting: "My dearest Lisha,",
  paragraphs: [
    "Replace this paragraph with the first thing you want her to read. Say the quiet thing — the one you never manage to say out loud.",
    "Replace this paragraph with a memory. The smallest one. The one that plays in your head when the day gets loud.",
    "Replace this paragraph with a promise for the year ahead, and everything after it.",
  ],
  signature: "Always yours,",
  from: "— Me",
};

/** FINAL SURPRISE message */
export const finalMessage = {
  heading: "Happy Birthday, my love ❤️",
  body: "Replace this with your final birthday message. Something warm, something forever. Here's to 13 August, and to every ordinary day made extraordinary by you.",
};

/** SECRET PAGE note */
export const secretNote = {
  title: "Somewhere Only We Know",
  paragraphs: [
    "Replace this private note. This page is only for her — the quiet corner of the sky where we keep our secrets.",
    "Write the thing that belongs to nobody else.",
  ],
  signature: "— Yours, under the same stars",
};
