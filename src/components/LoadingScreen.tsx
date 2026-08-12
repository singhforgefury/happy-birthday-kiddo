import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BIRTHDAY } from "@/data/content";
import { Atmosphere, Sunflower } from "./Atmosphere";

export function LoadingScreen({
  onBegin,
}: {
  onBegin: () => void;
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1200),
      setTimeout(() => setStep(2), 3200),
      setTimeout(() => setStep(3), 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(18px)",
        scale: 1.04,
      }}
      transition={{
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Background atmosphere */}
      <Atmosphere
        petals={5}
        starCount={150}
        intensity={0.7}
      />

      {/* Cinematic glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{
          duration: 2.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 350 / 0.16), transparent 68%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative flex min-h-[20rem] flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">

          {/* Opening line */}
          {step === 1 && (
            <motion.div
              key="opening"
              initial={{
                opacity: 0,
                y: 18,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -12,
                filter: "blur(10px)",
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="font-serif text-xl italic tracking-[0.12em] text-cream/70 sm:text-2xl">
                Somewhere Only We Know
              </p>

              <motion.div
                className="mx-auto mt-5 h-px w-16"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,180,200,.7), transparent)",
                }}
              />
            </motion.div>
          )}

          {/* Birthday title */}
          {step >= 2 && (
            <motion.div
              key="birthday"
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.97,
                filter: "blur(14px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 1.5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sunflower
                  size={34}
                  className="mb-7 opacity-80"
                />
              </motion.div>

              <h1 className="text-ink glow-text font-display text-4xl font-medium leading-tight sm:text-6xl md:text-7xl">
                {BIRTHDAY.title}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7,
                  duration: 1,
                }}
                className="mt-5 text-xs tracking-[0.35em] text-muted-foreground/70 uppercase"
              >
                a little journey through our memories
              </motion.p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Begin button */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center"
          >
            <motion.button
              onClick={onBegin}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="glass glass-hover group relative cursor-pointer rounded-full px-10 py-4 text-sm tracking-[0.24em] text-cream uppercase"
            >
              <span className="relative z-10">
                Begin the Journey ✨
              </span>

              <span
                aria-hidden
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(60% 120% at 50% 50%, oklch(0.66 0.212 0.5 / 0.30), transparent 70%)",
                }}
              />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.7,
                duration: 1,
              }}
              className="mt-7 text-[0.65rem] tracking-[0.4em] text-muted-foreground/60 uppercase"
            >
              with sound, if you'd like
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}