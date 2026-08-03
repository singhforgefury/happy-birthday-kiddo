import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Sunflower } from "@/components/Atmosphere";
import { secretNote } from "@/data/content";

export const Route = createFileRoute("/somewhere-only-we-know")({
  head: () => ({
    meta: [
      { title: "Somewhere Only We Know" },
      {
        name: "description",
        content: "A quiet, hidden corner of the night sky — fireflies, moonlight and a private note.",
      },
      { property: "og:title", content: "Somewhere Only We Know" },
      { property: "og:description", content: "A hidden page, just for her." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SecretPage,
});

type Fly = { x: number; y: number; dur: number; delay: number; size: number };

function SecretPage() {
  const [flies, setFlies] = useState<Fly[]>([]);
  const [stars, setStars] = useState<Fly[]>([]);

  useEffect(() => {
    setFlies(
      Array.from({ length: 26 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        dur: Math.random() * 8 + 7,
        delay: Math.random() * 8,
        size: Math.random() * 4 + 2.5,
      })),
    );
    setStars(
      Array.from({ length: 120 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        dur: Math.random() * 4 + 2,
        delay: Math.random() * 6,
        size: Math.random() * 1.5 + 0.5,
      })),
    );
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-20">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% -10%, oklch(0.28 0.05 262) 0%, oklch(0.11 0.028 268) 55%, oklch(0.08 0.02 268) 100%)",
          }}
        />
        {/* moon */}
        <div
          className="absolute top-[8%] right-[12%] size-28 rounded-full sm:size-36"
          style={{
            background: "radial-gradient(circle at 35% 35%, oklch(0.99 0.02 92), oklch(0.9 0.05 92))",
            boxShadow:
              "0 0 120px 40px oklch(0.97 0.028 92 / 0.16), 0 0 320px 120px oklch(0.85 0.148 88 / 0.08)",
          }}
        />
        {stars.map((s, i) => (
          <span
            key={`s${i}`}
            className="absolute rounded-full bg-cream"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
        {flies.map((f, i) => (
          <motion.span
            key={`f${i}`}
            className="absolute rounded-full"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.size,
              height: f.size,
              background: "oklch(0.9 0.15 92)",
              boxShadow: "0 0 14px 4px oklch(0.85 0.148 88 / 0.55)",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -26, 18, 0],
              opacity: [0.15, 1, 0.35, 0.15],
            }}
            transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* horizon of sunflowers */}
        <div className="absolute bottom-0 left-0 flex w-full items-end justify-around opacity-40">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="flex flex-col items-center" style={{ height: 90 + (i % 3) * 40 }}>
              <Sunflower size={22 + (i % 3) * 6} />
              <div className="w-[1.5px] flex-1 bg-gradient-to-b from-gold/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-2xl">
        <Link
          to="/"
          className="font-sans text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:text-gold"
        >
          ← back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <p className="font-sans text-[0.62rem] tracking-[0.42em] text-gold/80 uppercase">
            a hidden place
          </p>
          <h1 className="text-ink glow-text font-display mt-6 text-4xl leading-tight font-medium sm:text-6xl">
            {secretNote.title}
          </h1>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="paper mt-14 mb-32 rounded-[1.75rem] px-7 py-12 sm:px-14"
          style={{
            color: "oklch(0.28 0.03 60)",
            boxShadow: "0 40px 90px -40px oklch(0 0 0 / 0.85)",
            transform: "rotate(0.4deg)",
          }}
        >
          <div className="flex justify-center">
            <Sunflower size={30} />
          </div>
          <div className="mt-8 space-y-6">
            {secretNote.paragraphs.map((p, i) => (
              <p key={i} className="font-hand text-2xl leading-relaxed sm:text-[1.75rem]">
                {p}
              </p>
            ))}
          </div>
          <p className="font-hand mt-10 text-2xl" style={{ color: "oklch(0.4 0.16 12)" }}>
            {secretNote.signature}
          </p>
        </motion.article>
      </div>
    </main>
  );
}
