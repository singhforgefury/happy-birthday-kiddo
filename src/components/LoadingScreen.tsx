import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BIRTHDAY } from "@/data/content";
import { Atmosphere, Sunflower } from "./Atmosphere";

export function LoadingScreen({ onBegin }: { onBegin: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1400),
      setTimeout(() => setStep(2), 3400),
      setTimeout(() => setStep(3), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6"
      exit={{ opacity: 0, filter: "blur(18px)", scale: 1.04 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <Atmosphere petals={4} starCount={130} intensity={0.6} />

      <div className="relative flex min-h-[16rem] flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {step >= 1 && step < 2 && (
            <motion.p
              key="a"
              initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(12px)" }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-2xl tracking-[0.16em] text-cream/85 italic sm:text-3xl"
            >
              Somewhere Only We Know
            </motion.p>
          )}

          {step >= 2 && (
            <motion.div
              key="b"
              initial={{ opacity: 0, y: 16, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <Sunflower size={30} className="mb-6 opacity-80" />
              <h1 className="text-ink glow-text font-display text-4xl leading-tight font-medium sm:text-6xl">
                {BIRTHDAY.title}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {step >= 3 && (
          <motion.button
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={onBegin}
            className="glass glass-hover group relative mt-14 cursor-pointer rounded-full px-9 py-4 text-sm tracking-[0.24em] text-cream uppercase"
          >
            <span className="relative z-10">Begin the Journey ✨</span>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(60% 120% at 50% 50%, oklch(0.66 0.212 0.5 / 0.28), transparent 70%)",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 3 ? 1 : 0 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="font-sans absolute bottom-10 text-[0.65rem] tracking-[0.4em] text-muted-foreground/70 uppercase"
      >
        with sound, if you'd like
      </motion.p>
    </motion.div>
  );
}
