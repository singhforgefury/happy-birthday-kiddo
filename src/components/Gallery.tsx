import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { memories } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { Sunflower } from "./Atmosphere";

/** Polaroid frames feel handmade when no two share the same tilt. */
const tilts = [-2.4, 1.8, -1.1, 2.6, -3, 1.2, 2, -1.9];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((dir: number) => {
    setOpen((cur) => (cur === null ? cur : (cur + dir + memories.length) % memories.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <section id="memories" className="relative px-6 py-28 sm:py-40">
      <SectionHeading
        eyebrow="Memory Gallery"
        title="Sixteen pieces of us"
        lead="A scrapbook of ordinary days that turned out to be the best ones."
      />

      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
        {memories.map((m, i) => (
          <Reveal key={m.src} delay={(i % 3) * 0.07}>
            <figure
              className="group relative mx-auto w-full max-w-[22rem]"
              style={{ perspective: "1200px" }}
            >
              <button
                onClick={() => setOpen(i)}
                aria-label={`Open memory ${i + 1}`}
                className="polaroid block w-full cursor-pointer text-left"
                style={{ "--tilt": `${tilts[i % tilts.length]}deg` } as React.CSSProperties}
              >
                <span className="relative block aspect-square overflow-hidden rounded-[0.35rem] bg-midnight-deep">
                  <Photo src={m.src} index={i} />
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 45%, oklch(0.11 0.028 268 / 0.72) 100%)",
                    }}
                  />
                  <span className="font-sans absolute inset-x-4 bottom-4 translate-y-3 text-[0.55rem] tracking-[0.3em] text-cream uppercase opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                    View memory
                  </span>
                </span>
                <span className="font-hand mt-4 mb-1 block px-2 text-center text-xl leading-snug sm:text-2xl">
                  {m.caption}
                </span>
              </button>
            </figure>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-16"
            style={{
              background: "oklch(0.06 0.02 268 / 0.86)",
              backdropFilter: "blur(30px) saturate(120%)",
            }}
            onClick={() => setOpen(null)}
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={open}
                initial={{ opacity: 0, scale: 0.9, y: 22, filter: "blur(14px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                  style={{
                    boxShadow:
                      "0 60px 140px -50px oklch(0 0 0 / 0.95), 0 0 0 1px oklch(1 0 0 / 0.10)",
                  }}
                >
                  <Photo src={memories[open]!.src} index={open} large />
                </div>
                <figcaption className="font-hand mt-6 text-center text-2xl text-cream/85 sm:text-3xl">
                  {memories[open]!.caption}
                </figcaption>
                <p className="font-sans mt-3 text-center text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                  {open + 1} / {memories.length}
                </p>
              </motion.figure>
            </AnimatePresence>

            <NavBtn side="left" onClick={() => step(-1)} />
            <NavBtn side="right" onClick={() => step(1)} />

            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="glass absolute top-6 right-6 cursor-pointer rounded-full p-3 text-cream/80 transition-colors hover:text-rose-soft"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function NavBtn({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`glass absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-3.5 text-cream/80 transition-colors hover:text-rose-soft ${
        side === "left" ? "left-3 sm:left-8" : "right-3 sm:right-8"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ transform: side === "right" ? "rotate(180deg)" : undefined }}
      >
        <path d="M15.4 3.6L7 12l8.4 8.4 1.4-1.4L9.8 12l7-7z" />
      </svg>
    </button>
  );
}

/** Shows the real photo when present, otherwise an elegant developing frame. */
function Photo({ src, index, large = false }: { src: string; index: number; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
        <span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.66 0.212 0.5 / 0.18), oklch(0.85 0.148 88 / 0.12) 60%, oklch(0.11 0.028 268 / 0.5))",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-4 rounded-2xl"
          style={{ border: "1px solid oklch(0.85 0.148 88 / 0.22)" }}
        />
        <span className="relative block" style={{ animation: "float-soft 8s ease-in-out infinite" }}>
          <Sunflower size={large ? 46 : 30} className="opacity-70" />
        </span>
        <span className="font-display relative text-2xl text-cream/35">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>
    );
  }

  return (
    <>
      {!loaded && (
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, oklch(0.18 0.03 268), oklch(0.24 0.04 268) 50%, oklch(0.18 0.03 268))",
            animation: "shimmer 2.4s ease-in-out infinite",
            backgroundSize: "200% 100%",
          }}
        />
      )}
      <img
        src={src}
        alt={`Memory ${index + 1} of Lisha and me`}
        loading={large ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`absolute inset-0 size-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
