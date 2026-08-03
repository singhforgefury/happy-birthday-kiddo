import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BIRTHDAY } from "@/data/content";
import { Sunflower } from "./Atmosphere";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24 pb-32"
    >
      <motion.div style={{ y, opacity, scale }} className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3"
        >
          <Sunflower size={22} className="opacity-80" />
          <p className="font-sans text-[0.65rem] tracking-[0.45em] text-gold/80 uppercase">
            {BIRTHDAY.date}
          </p>
          <Sunflower size={22} className="opacity-80" />
        </motion.div>

        <h1 className="mt-8 text-center">
          {["Happy", "Birthday", "Lisha ❤️"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.35 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-ink glow-text font-display block text-[clamp(2.6rem,10vw,7rem)] leading-[0.98] font-medium"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif mx-auto mt-9 max-w-xl text-center text-lg leading-relaxed text-cream/70 italic sm:text-2xl"
        >
          {BIRTHDAY.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#our-story"
            className="glass glass-hover group relative rounded-full px-8 py-4 text-xs tracking-[0.28em] text-cream uppercase"
          >
            <span className="relative z-10">Start Exploring</span>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(70% 140% at 50% 50%, oklch(0.85 0.148 88 / 0.22), transparent 70%)",
              }}
            />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
}
