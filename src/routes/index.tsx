import { AnimatePresence, motion } from "motion/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Atmosphere, DriftingPetals, MouseGlow, Sunflower } from "@/components/Atmosphere";
import { Constellation } from "@/components/Constellation";
import { FinalSurprise } from "@/components/FinalSurprise";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Letter } from "@/components/Letter";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Reasons } from "@/components/Reasons";
import { Timeline } from "@/components/Timeline";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { BIRTHDAY } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Lisha ❤️" },
      {
        name: "description",
        content:
          "An interactive love story for Lisha's birthday on 13 August — our timeline, our memories, 13 reasons, a letter, and one last surprise.",
      },
      { property: "og:title", content: "Happy Birthday, Lisha ❤️" },
      {
        property: "og:description",
        content: "Today isn't just your birthday. It's the day the world became a little more beautiful.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [begun, setBegun] = useState(false);
const [bright, setBright] = useState(false);
const [cinematic, setCinematic] = useState(false);
const beginJourney = () => {
  setCinematic(true);

  // Let the cinematic bloom happen before revealing the story.
  setTimeout(() => {
    setBegun(true);
  }, 350);

  // Return the atmosphere to its normal level after the reveal.
  setTimeout(() => {
    setBright(false);
    setCinematic(false);
  }, 1800);
};
  const heroRef = useRef<HTMLDivElement>(null);
const timelineRef = useRef<HTMLDivElement>(null);
const galleryRef = useRef<HTMLDivElement>(null);
const reasonsRef = useRef<HTMLDivElement>(null);
const letterRef = useRef<HTMLDivElement>(null);
const [chapter, setChapter] = useState(0);
useEffect(() => {
  console.log("CHAPTER EFFECT RUNNING", begun);
  const sections = [
    heroRef,
    timelineRef,
    galleryRef,
    reasonsRef,
    letterRef,
  ];

  const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const i = sections.findIndex(
        (ref) => ref.current === entry.target
      );

      if (i !== -1) {
        console.log("Chapter changed:", i);
        setChapter(i);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

  sections.forEach((ref) => {
    if (ref.current) observer.observe(ref.current);
  });

  return () => observer.disconnect();
}, [begun]);
  useSmoothScroll(begun);

  return (
    <main className="relative min-h-screen">
      <Atmosphere intensity={bright ? 1.9 : 1} />
      <MouseGlow />
      <AnimatePresence>
  {cinematic && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      {/* Central bloom */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.2,
        }}
        animate={{
          opacity: [0, 0.9, 0.35],
          scale: [0.2, 1.15, 1.8],
        }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 top-1/2 h-[45rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.86 0.13 25 / 0.32) 0%, oklch(0.72 0.16 350 / 0.16) 32%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Soft screen wash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.28, 0] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, oklch(0.95 0.08 25 / 0.2), transparent 55%)",
        }}
      />
    </motion.div>
  )}
</AnimatePresence>

      <AnimatePresence>
        {!begun && <LoadingScreen onBegin={beginJourney} />}
      </AnimatePresence>

      {begun && (
        <>
          <div ref={heroRef}>
  <Hero />
</div>

<div ref={timelineRef}>
  <Timeline />
</div>

<div ref={galleryRef}>
  <Gallery />
</div>

<div ref={reasonsRef}>
  <Reasons />
</div>

<div ref={letterRef}>
  <Letter />
</div>
          <FinalSurprise onBrighten={setBright} />

          <footer className="relative overflow-hidden px-6 pt-10 pb-32 text-center">
            <DriftingPetals count={14} />
            <div className="relative mx-auto mb-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="relative flex items-center justify-center gap-3">
              <Sunflower size={18} className="opacity-60" />
              <p className="font-serif text-sm text-muted-foreground italic">
                Made only for {BIRTHDAY.name} · {BIRTHDAY.date}
              </p>
              <Sunflower size={18} className="opacity-60" />
            </div>
          </footer>

          <MusicPlayer
  active={begun}
  chapter={chapter}
/>
        </>
      )}  
    </main>
  );
}
