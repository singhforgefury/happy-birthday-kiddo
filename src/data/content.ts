/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE — this is the only file you need to touch
 *  to change photos, captions, reasons, songs and the letters.
 * ─────────────────────────────────────────────────────────────
 */

import { audioUrls, photoUrls, slug, titleFromUrl } from "@/lib/media";

export const BIRTHDAY = {
  name: "Lisha",
  date: "13 August",
  title: "Happy Birthday, Lisha ❤️",
  subtitle:
    "Today isn't just your birthday. It's the day the world became a little more beautiful.",
  /** Month is 1-based. Used for the hero countdown. */
  month: 8,
  day: 13,
};

/** The two lines the story fades into, right at the very end. */
export const closing = {
  line1: "Happy Birthday, Lisha ❤️",
  line2: "Thank you for making my world more beautiful.",
};

/**
 * MUSIC — drop your .mp3 files into `public/music/` keeping the same names,
 * or point `src` at any URL. `chapter` groups the songs in the playlist.
 */
export type Song = {
  title: string;
  artist: string;
  chapter: string;
  emoji: string;
  src: string;
};

/**
 * Songs are discovered automatically from `public/music/playlist/`.
 * Metadata below is matched loosely by filename, so "01 - Yeh Fitoor Mera.mp3"
 * still gets the right artist, chapter and emoji.
 */
const songMeta: { match: string; title: string; artist: string; chapter: string; emoji: string }[] =
  [
    {
      match: "yehfitoormera",
      title: "Yeh Fitoor Mera",
      artist: "Arijit Singh",
      chapter: "Love",
      emoji: "❤️",
    },
    {
      match: "wheredallthetimego",
      title: "Where'd All the Time Go?",
      artist: "Dr. Dog",
      chapter: "Happy Memories",
      emoji: "🌤",
    },
    {
      match: "justthetwoofus",
      title: "Just the Two of Us",
      artist: "Grover Washington Jr.",
      chapter: "Our Song",
      emoji: "🤍",
    },
    {
      match: "forever",
      title: "Forever",
      artist: "The Little Dippers",
      chapter: "Forever",
      emoji: "🌙",
    },
    {
      match: "lovemenot",
      title: "Love Me Not",
      artist: "Ravyn Lenae",
      chapter: "Forever",
      emoji: "🌙",
    },
    { match: "kids", title: "Kids", artist: "Current Joys", chapter: "Ending", emoji: "✨" },
  ];

export const songs: Song[] = audioUrls.map((src) => {
  const key = slug(src.split("/").pop() ?? src);
  const meta = songMeta.find((m) => key.includes(m.match));
  return {
    title: meta?.title ?? titleFromUrl(src),
    artist: meta?.artist ?? "Our playlist",
    chapter: meta?.chapter ?? "More",
    emoji: meta?.emoji ?? "🎵",
    src,
  };
});


/** OUR STORY timeline */
export type StoryEvent = {
  icon: string;
  title: string;
  place: string;
  when: string;
  note: string;
};

export const story: StoryEvent[] = [
  {
    icon: "🥋",
    title: "First saw each other",
    place: "MMA Gym",
    when: "Where it started",
    note: "Before a single word was said, there was already a feeling I couldn't name.",
  },
  {
    icon: "🏸",
    title: "First met",
    place: "Vindha Gardens Society",
    when: "Badminton evenings",
    note: "A game, a laugh, and a conversation that refused to end.",
  },
  {
    icon: "☕",
    title: "First official date",
    place: "Pawfee House",
    when: "Our first table for two",
    note: "The coffee went cold because we forgot the rest of the world existed.",
  },
  {
    icon: "❤️",
    title: "Love Anniversary",
    place: "10 April 2025",
    when: "The day we said yes",
    note: "The day 'us' stopped being a feeling and became a promise.",
  },
  {
    icon: "🎂",
    title: "Happy Birthday",
    place: "13 August",
    when: "Today",
    note: "Yours, mine, ours — my favourite date on every calendar.",
  },
];

/**
 * MEMORY GALLERY — 16 photos.
 * Drop files into `public/memories/` named photo-01.jpg … photo-16.jpg
 * and they appear automatically, in this order. Captions below.
 */
export type Memory = { src: string; caption: string; span: "tall" | "wide" | "normal" };

const captions: string[] = [
  "The day everything quietly began.",
  "A smile I'll never get tired of.",
  "Our favourite little adventure.",
  "The moment I wished time would slow down.",
  "You, laughing at something only we found funny.",
  "Golden hour, and you glowing right through it.",
  "The evening we lost track of every hour.",
  "Somewhere between a plan and an accident.",
  "Rain, one umbrella, zero complaints.",
  "The look you give me when you think I'm not watching.",
  "A very ordinary Tuesday that I still remember perfectly.",
  "Coffee, sunlight, and nowhere else to be.",
  "The night the whole city felt like ours.",
  "Sunflowers, because of course.",
  "Us, exactly as we are.",
  "And still my favourite photograph.",
];

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

export const memories: Memory[] = photoUrls.map((src, i) => ({
  src,
  caption: captions[i] ?? "A moment worth keeping.",
  span: spans[i % spans.length] ?? "normal",
}));

/** 13 THINGS I LOVE ABOUT YOU */
export const reasons: string[] = [
  "The way your laugh arrives a second before the joke lands.",
  "How you make an ordinary evening feel like an occasion.",
  "That you notice the smallest things — and remember them.",
  "The way you care about people without ever making it a performance.",
  "How stubbornly kind you are, even on your worst days.",
  "Your terrible, wonderful sense of timing.",
  "The way you say my name when you're happy about something.",
  "That you are the calm and the chaos, and somehow both suit you.",
  "How you keep growing, quietly and relentlessly.",
  "The sunflowers. Always the sunflowers.",
  "That silence with you never once felt empty.",
  "How safe the world feels when you're in it.",
  "And that out of everyone, you chose me.",
];

/** FINAL LETTER (handwritten paper) */
export const letter = {
  greeting: "My dearest Lisha,",
  paragraphs: [
    "There are things I say easily, and then there is this — the quiet thing I keep meaning to tell you and never quite manage out loud. So I'm writing it instead: loving you is the simplest decision I've ever made.",
    "When the day gets loud, my mind goes back to something small. Not a big moment. Just you, mid-sentence, eyes bright, completely unaware that I was busy falling for you all over again.",
    "This year, I promise you more of the ordinary: more late conversations, more badminton evenings, more coffee that goes cold. And every year after that, the same promise again.",
  ],
  signature: "Always yours,",
  from: "— Me",
};

/** FINAL SURPRISE message */
export const finalMessage = {
  heading: "Happy Birthday, my love ❤️",
  body: "Here's to 13 August, and to every ordinary day you quietly turn into something extraordinary. Thank you for being the best part of my life. I hope this year is as warm and beautiful as you are.",
};

/** SECRET PAGE note */
export const secretNote = {
  title: "Somewhere Only We Know",
  paragraphs: [
    "You found it. Of course you did — you always find the things meant only for you.",
    "This is the quiet corner of the sky where we keep our secrets. No occasion, no audience. Just this: whatever happens, wherever we end up, I'm choosing you.",
  ],
  signature: "— Yours, under the same stars",
};
