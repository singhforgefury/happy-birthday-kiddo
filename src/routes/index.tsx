import { AnimatePresence } from "motion/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  useSmoothScroll(begun);

  return (
    <main className="relative min-h-screen">
      <Atmosphere intensity={bright ? 1.9 : 1} />
      <MouseGlow />

      <AnimatePresence>
        {!begun && <LoadingScreen onBegin={() => setBegun(true)} />}
      </AnimatePresence>

      {begun && (
        <>
          <Hero />
          <Timeline />
          <Gallery />
          <Reasons />
          <Constellation />
          <Letter />
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

          <MusicPlayer active={begun} />
        </>
      )}
    </main>
  );
}
