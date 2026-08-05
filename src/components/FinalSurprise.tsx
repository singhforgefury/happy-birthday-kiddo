import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { finalMessage } from "@/data/content";
import { Reveal } from "./Reveal";
import { Sunflower } from "./Atmosphere";

type Floater = { x: number; delay: number; dur: number; drift: number; kind: "heart" | "petal" };
type Spark = { x: number; y: number; size: number; delay: number; dur: number };
type Bloom = { x: number; y: number; size: number; delay: number };

export function FinalSurprise({ onBrighten }: { onBrighten: (v: boolean) => void }) {
  const [revealed, setRevealed] = useState(false);
  const [phase, setPhase] = useState(0); // 0 message · 1 line one · 2 line two
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [blooms, setBlooms] = useState<Bloom[]>([]);

  const burst = useCallback(() => {
    const base = { disableForReducedMotion: true, zIndex: 45 };
    const pink = ["#FF4D8D", "#FF7EB3", "#F6C945", "#FFF8E8"];

    confetti({ ...base, particleCount: 160, spread: 90, origin: { y: 0.7 }, colors: pink });

    let n = 0;
    const fw = setInterval(() => {
      n += 1;
      confetti({
        ...base,
        particleCount: 70,
        startVelocity: 34,
        spread: 360,
        ticks: 90,
        scalar: 1.1,
        colors: pink,
        origin: { x: 0.15 + Math.random() * 0.7, y: Math.random() * 0.5 + 0.1 },
      });
      if (n > 7) clearInterval(fw);
    }, 520);

    confetti({
      ...base,
      particleCount: 90,
      spread: 120,
      scalar: 0.6,
      shapes: ["star"],
      colors: ["#F6C945", "#FFF8E8"],
      origin: { y: 0.5 },
    });
  }, []);

  const onSurprise = () => {
    setRevealed(true);
    onBrighten(true);
    burst();
    setFloaters(
      Array.from({ length: 26 }, (_, i) => ({
        x: Math.random() * 100,
        delay: Math.random() * 6,
        dur: Math.random() * 8 + 9,
        drift: Math.random() * 18 - 9,
        kind: i % 3 === 0 ? "petal" : "heart",
      })),
    );
    setSparks(
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.6 + 1.2,
        delay: Math.random() * 4,
        dur: Math.random() * 3 + 2.4,
      })),
    );
    setBlooms(
      Array.from({ length: 10 }, (_, i) => ({
        x: 4 + Math.random() * 92,
        y: 55 + Math.random() * 40,
        size: 22 + Math.random() * 34,
        delay: 0.4 + i * 0.28,
      })),
    );
  };

  // Stage the closing lines after the reveal.
  useEffect(() => {
    if (!revealed) return;
    const t = [
      setTimeout(() => setPhase(1), 5200),
      setTimeout(() => setPhase(2), 8200),
    ];
    return () => t.forEach(clearTimeout);
  }, [revealed]);

  useEffect(() => () => onBrighten(false), [onBrighten]);

  return (
    <section id="surprise" className="relative overflow-hidden px-6 py-32 sm:py-44">
      {revealed && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {sparks.map((s, i) => (
            <span
              key={`s${i}`}
              className="absolute rounded-full bg-cream"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                boxShadow: "0 0 10px oklch(0.85 0.148 88 / 0.9)",
                animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))}
          {blooms.map((b, i) => (
            <span
              key={`b${i}`}
              className="absolute block"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                animation: `bloom-in 1.6s cubic-bezier(.16,1,.3,1) ${b.delay}s both`,
              }}
            >
              <Sunflower size={b.size} className="opacity-70" />
            </span>
          ))}
          {floaters.map((f, i) => (
            <span
              key={`f${i}`}
              className="absolute bottom-0 block"
              style={
                {
                  left: `${f.x}%`,
                  animation: `heart-rise ${f.dur}s linear ${f.delay}s infinite`,
                  "--drift": `${f.drift}vw`,
                  fontSize: f.kind === "heart" ? "1.1rem" : "0.95rem",
                  filter: "drop-shadow(0 0 10px oklch(0.66 0.212 0.5 / 0.6))",
                } as React.CSSProperties
              }
            >
              {f.kind === "heart" ? "❤️" : "🌻"}
            </span>
          ))}
          <motion.span
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 6, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(70% 60% at 50% 45%, oklch(0.85 0.148 88 / 0.16), transparent 70%)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="flex justify-center">
            <Sunflower size={30} className="opacity-80" />
          </div>
        </Reveal>

        {!revealed ? (
          <>
            <Reveal delay={0.08}>
              <h2 className="text-ink font-display mt-8 text-4xl leading-tight font-medium sm:text-6xl">
                One more thing
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="font-serif mt-5 text-lg text-muted-foreground italic sm:text-xl">
                I saved the best part for the very end.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <button
                onClick={onSurprise}
                className="glass glass-hover group relative mt-12 cursor-pointer rounded-full px-9 py-4 text-xs tracking-[0.28em] text-cream uppercase"
              >
                <span className="relative z-10">One Last Surprise 🎁</span>
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(70% 140% at 50% 50%, oklch(0.66 0.212 0.5 / 0.35), transparent 70%)",
                  }}
                />
              </button>
            </Reveal>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass mt-10 rounded-[2rem] px-7 py-12 sm:px-14"
          >
            <p className="font-hand text-3xl leading-relaxed text-gold/90 sm:text-4xl">
              {finalMessage.heading}
            </p>
            <p className="font-hand mx-auto mt-6 max-w-xl text-2xl leading-relaxed text-cream/85 sm:text-3xl">
              {finalMessage.body}
            </p>

            <AnimatePresence>
              {phase >= 1 && (
                <motion.h2
                  initial={{ opacity: 0, y: 24, filter: "blur(20px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-ink glow-text font-display mt-12 text-4xl leading-tight font-medium sm:text-6xl"
                >
                  {finalMessage.heading}
                </motion.h2>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {phase >= 2 && (
                <motion.p
                  initial={{ opacity: 0, filter: "blur(18px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif mt-6 text-lg text-cream/75 italic sm:text-2xl"
                >
                  {finalMessage.body}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={burst}
              className="font-sans mt-10 cursor-pointer text-[0.62rem] tracking-[0.3em] text-gold/80 uppercase transition-colors hover:text-gold"
            >
              Again ✨
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
