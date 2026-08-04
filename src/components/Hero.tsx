import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BIRTHDAY } from "@/data/content";
import { Sunflower } from "./Atmosphere";

/** Next occurrence of the birthday, at local midnight. */
function nextBirthday(now: Date) {
  const y = now.getFullYear();
  const thisYear = new Date(y, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0, 0);
  const endOfDay = new Date(y, BIRTHDAY.month - 1, BIRTHDAY.day + 1, 0, 0, 0, 0);
  if (now < endOfDay) return { target: thisYear, isToday: now >= thisYear };
  return { target: new Date(y + 1, BIRTHDAY.month - 1, BIRTHDAY.day), isToday: false };
}

type Parts = { d: number; h: number; m: number; s: number };

function useCountdown() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => {
    if (!now) return null;
    const { target, isToday } = nextBirthday(now);
    if (isToday) return { arrived: true, parts: null as Parts | null };
    const ms = Math.max(0, target.getTime() - now.getTime());
    const s = Math.floor(ms / 1000);
    return {
      arrived: false,
      parts: {
        d: Math.floor(s / 86400),
        h: Math.floor((s % 86400) / 3600),
        m: Math.floor((s % 3600) / 60),
        s: s % 60,
      } as Parts,
    };
  }, [now]);
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const countdown = useCountdown();

  const headline = countdown?.arrived
    ? ["Happy", "Birthday", "Lisha ❤️"]
    : ["Happy", "Birthday", "Lisha ❤️"];

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
          {headline.map((word, i) => (
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
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex justify-center"
        >
          {countdown && !countdown.arrived && countdown.parts ? (
            <div className="glass rounded-3xl px-5 py-5 sm:px-8">
              <p className="font-sans text-center text-[0.55rem] tracking-[0.36em] text-gold/70 uppercase">
                Counting down to 13 August
              </p>
              <div className="mt-4 flex items-start justify-center gap-3 sm:gap-6">
                <Unit value={countdown.parts.d} label="Days" />
                <Colon />
                <Unit value={countdown.parts.h} label="Hours" />
                <Colon />
                <Unit value={countdown.parts.m} label="Minutes" />
                <Colon />
                <Unit value={countdown.parts.s} label="Seconds" />
              </div>
            </div>
          ) : countdown?.arrived ? (
            <p className="font-serif glow-text text-center text-base text-gold/90 italic sm:text-lg">
              It&apos;s today. The 13th of August finally came.
            </p>
          ) : (
            <div className="h-[6.5rem]" />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex justify-center"
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
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-sans text-[0.5rem] tracking-[0.4em] text-cream/40 uppercase">
          Scroll
        </span>
        <span className="relative block h-16 w-[1px] overflow-hidden bg-gradient-to-b from-transparent via-gold/40 to-transparent">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-transparent via-gold to-transparent"
            style={{ animation: "scroll-trail 2.6s ease-in-out infinite" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-3xl leading-none text-cream tabular-nums sm:text-5xl">
        {String(value).padStart(2, "0")}
      </p>
      <p className="font-sans mt-2 text-[0.5rem] tracking-[0.28em] text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  );
}

function Colon() {
  return <span className="font-display pt-0.5 text-2xl text-gold/40 sm:text-4xl">:</span>;
}
