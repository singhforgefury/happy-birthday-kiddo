/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE — this is the only file you need to touch
 *  to change photos, captions, reasons, songs and the letters.
 * ─────────────────────────────────────────────────────────────
 */

export const BIRTHDAY = {
  name: "Lisha",
  day: 13,
  month: 8,
  date: "13 August",
  title: "Happy Birthday, Kiddo ❤️",
  subtitle: "Today isn't just your birthday. It's the day the world became a little more beautiful.",
}

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
 export const songs: Song[] = [
  {
    title: "Kids",
    artist: "MGMT",
    chapter: "Bonus",
    emoji: "🌙",
    src: "/music/playlist/kids.mp3",
  },
  {
    title: "Yeh Fitoor Mera",
    artist: "Arijit Singh",
    chapter: "Love",
    emoji: "❤️",
    src: "/music/playlist/yeh-fitoor-mera.mp3",
  },
  {
    title: "Where'd All The Time Go?",
    artist: "Dr. Dog",
    chapter: "Happy Memories",
    emoji: "🌤",
    src: "/music/playlist/whered-all-the-time.mp3",
  },
  
  {
    title: "Love Me Not",
    artist: "Ravyn Lenae",
    chapter: "Bonus",
    emoji: "✨",
    src: "/music/playlist/love-me-not.mp3",
    
  },
  {
    title: "Forever",
    artist: "The Little Dippers",
    chapter: "Forever",
    emoji: "🌻",
    src: "/music/playlist/forever.mp3",
  },
  
];

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
    note: "I still remember the first time I saw you. You were talking to Rahul Sir, and somehow you stood out without even trying. You seemed quiet, a little introverted, but there was this playful side to you that I noticed immediately. We never really spoke during our MMA days, but I still remember Jyoti Didi joking, 'She could be your girlfriend someday.' Looking back now... she was right.",
  },
  {
    icon: "🏸",
    title: "First met",
    place: "Vindha Gardens Society",
    when: "Badminton evenings",
    note: "When you invited me to play badminton with you and parineeka, I was excited and terrified at the same time. I was the one who started the conversation but I was so nervous that every sentence felt awkward. Even sitting beside you made my heart race. But by the end of that evening you hugged me for the very first time. that was the most romantic thing I still remember it like it happened yesterday..",
  },
  {
    icon: "☕",
    title: "First official date",
    place: "Pawfee House",
    when: "Our first table for two",
    note: "You planned everything as a surprise and I had absolutely no idea where we were going until we arrived at Pawfee House. That made it even more special. We ordered an Oreo milkshake and a vanilla milkshake if im right . that orange cat i remember chose me, while you were playing with the poddle. it was the most perfect date till now.",
  },
  {
    icon: "❤️",
    title: "Love Anniversary",
    place: "10 April 2025",
    when: "The day we said yes",
    note: "Somehow, I finally found the courage to tell you how I felt. Then you said something I'll never forget: tujhe lgta h m tujhe mna karungi? In that moment  i felt so  good. it became one of the happiest memories of my life.",
  },
  {
    icon: "🎂",
    title: "Happy Birthday",
    place: "13 August",
    when: "Today",
    note: "Today isn't just about celebrating your birthday. It's about celebrating you the person who has made my world brighter in more ways than I can explain. I made this little universe type shi because I wanted you to know just how deeply you're loved. Every memory, every photo, every song, and every word here exists for one reason to remind you that you are incredibly special to me.",
  },
];

/**
 * MEMORY GALLERY — 16 photos.
 * Drop files into `public/memories/` named photo-01.jpg … photo-16.jpg
 * and they appear automatically, in this order. Captions below.
 */
export type Memory = { src: string; caption: string; span: "tall" | "wide" | "normal" };

const captions: string[] = [
  "you sent me a fit check in that adorable little top. But what caught my attention were your nails you had grown them out for the first time and I remember thinking how unbelievably pretty they looked in that shade that we ordered together.",
  "sunflowerrrrrrr for my sunflower. Watching you smile while wearing the real madird jersey I gifted you made you looked even more cutee. And i remember playing sunflower while giving you the sunflower.",
  "i bought those flowers hehehehe.😌.",
  "For one day I became your personal driver dropping you off, picking you up we were litreally shivering throughout the ride  . (I'm still not Aarushi's biggest fan though). 😂.",
  "The orange cat is mine. Pawfee House is one of those little memories that still makes me smile. .",
  "bunk krri hhh gandi bachhi 😤😤.",
  "You tying my shoelaces is such a tiny moment but somehow it's one of the sweetest memories I have. .",
  "You and your favourite poodle. I don't know who looked happier you or the dog..",
  "My favourite photo of all. Little Lisha. Every time I look at this picture I can't help but smile and wonder how someone can be so tiny 🥰",
  "look so stunning in the Traditionals . I still remember staring at this picture for so long .",
  "kiddooooo. If I could I'd tell little Lisha that one day she'd completely change someone's world..",
  "that guy is so cute.",
  "fav picture of us.",
  "kitni pyari lgri hhh.",
  "pose🔥🔥",
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

export const memories: Memory[] = Array.from({ length: 16 }, (_, i) => ({
  src: `/memories/photos/${i + 1}.jpg`,
  caption: captions[i] ?? "A moment worth keeping.",
  span: spans[i] ?? "normal",
}));

/** 13 THINGS I LOVE ABOUT YOU */
export const reasons: string[] = [
  "SUNFLOWERS-Every time I see a sunflower I smile because they remind me of youbright, warm, and impossible to ignore.",
  "DOGS-I don't think I'll ever see one without thinking of you..",
  "GLOVES-They remind me of the first time I saw you... even before we had our first conversation.",
  "Badminton Courts-Every badminton court reminds me of the day everything truly began.",
  "STRAWBERRY OREOS-.",
  "Driving Around the City-Every time I drive, I remember the day I became your unofficial chauffeur.",
  "Pretty Nails-I'll probably never look at freshly painted nails the same way again.",
  "Untied Shoelaces-Because someone once knelt down just to tie mine.",
  "Rainy Evenings-They make me want long conversations and slow walks with you.",
  "Childhood Photos-Every childhood photo reminds me that somewhere, little Lisha was growing into the person who would completely change my life.",
  "The Songs in This Website-I'll never hear them the same way again because now they'll always belong to us.",
  "Home-This one's strange... but whenever something feels like home, it reminds me of you.",
  "And that out of everyone, you chose me.",
];

/** FINAL LETTER (handwritten paper) */
export const letter = {
  greeting: "Hey Kiddo,",
  paragraphs: [
    "I don't really know how to write a letter like this without making it sound way too serious or cheesy, but I wanted to try anyway. There are so many things I could say about you, and somehow when I actually sit down to write them, my mind goes completely blank. So I'll just start with the obvious one I'm really, really glad I found you.",
    
    "I love the little things about us the most. The random conversations, the stupid jokes, geediyan, the moments where we're doing absolutely nothing and somehow I'm still having a great time. I don't think you realise how many of these tiny moments stay in my head. Sometimes I'll randomly remember something you said or did and just smile like an idiot.",
    
    "I don't know what the future is going to look like, and honestly, I don't want to pretend that I have everything figured out. I just know that I want more of this. More conversations, more memories, more laughing at things that probably aren't even funny, more days where we look back and think, 'how did we even get here?' And if I get to keep making those memories with you, I'll be pretty happy.",
    
    "So yeah, this is me trying to put into words something I probably won't ever be able to explain properly. Thank you for being you, Kiddo. And thank you for becoming such an important part of my life without even trying.",
  ],
  signature: "Always,",
  from: "— your strawberry cupcake",
};

/** FINAL SURPRISE message */
export const finalMessage = {
  heading: "Happy Birthday, kiddo ❤️",
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
