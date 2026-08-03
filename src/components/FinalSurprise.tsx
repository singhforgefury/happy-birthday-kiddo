import confetti from "canvas-confetti";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { finalMessage } from "@/data/content";
import { Reveal } from "./Reveal";
import { Sunflower } from "./Atmosphere";

type Floater = { x: number; delay: number; dur: number; drift: number; kind: "heart" | "petal" };

export function FinalSurprise({ onBrighten }: { onBrighten: (v: boolean) => void }) {
  const [revealed, setRevealed] = useState(false);
  const [floaters, setFloaters] = useState<Floater[]>([]);

  const burst = useCallback(() => {
    const base = { disableForReducedMotion: true, zIndex: 45 };
    const pink = ["#FF4D8D", "#FF7EB3", "#F6C945", "#FFF8E8"];

    confetti({ ...base, particleCount: 160, spread: 90, origin: { y: 0.7 }, colors: pink });

    // fireworks
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

    // sparkles
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
  };

  useEffect(() => () => onBrighten(false), [onBrighten]);

  return (
    <section id="surprise" className="relative overflow-hidden px-6 py-32 sm:py-44">
      {revealed && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {floaters.map((f, i) => (
            <span
              key={i}
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
            <h2 className="text-ink glow-text font-display text-4xl leading-tight font-medium sm:text-6xl">
              {finalMessage.heading}
            </h2>
            <p className="font-serif mx-auto mt-7 max-w-xl text-lg leading-relaxed text-cream/80 italic sm:text-xl">
              {finalMessage.body}
            </p>
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
