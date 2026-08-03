import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { memories } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

const spanClass: Record<string, string> = {
  tall: "aspect-[3/4.4]",
  wide: "aspect-[16/10]",
  normal: "aspect-square",

};

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

      <div className="mx-auto mt-20 grid max-w-6xl auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {memories.map((m, i) => (
          <Reveal
            key={i}
            delay={(i % 4) * 0.06}
            className={`${m.span === "tall" ? "sm:row-span-2" : ""} ${m.span === "wide" ? "sm:col-span-2" : ""}`}
          >
            <figure className="group">
              <button
                onClick={() => setOpen(i)}
                className={`glass relative w-full overflow-hidden rounded-3xl ${spanClass[m.span]} cursor-pointer`}
                style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
              >
                <Photo src={m.src} index={i} />
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, oklch(0.11 0.028 268 / 0.7) 100%)",
                  }}
                />
                <span className="absolute inset-x-4 bottom-4 translate-y-3 text-left font-serif text-sm text-cream opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  View memory
                </span>
              </button>
              <figcaption className="font-serif mt-3 px-1 text-sm leading-snug text-muted-foreground italic">
                {m.caption}
              </figcaption>
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
              background: "oklch(0.06 0.02 268 / 0.82)",
              backdropFilter: "blur(28px) saturate(120%)",
            }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <div className="glass relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Photo src={memories[open]!.src} index={open} large />
              </div>
              <figcaption className="font-serif mt-5 text-center text-base text-cream/80 italic">
                {memories[open]!.caption}
              </figcaption>
              <p className="font-sans mt-2 text-center text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                {open + 1} / {memories.length}
              </p>
            </motion.figure>

            <NavBtn side="left" onClick={() => step(-1)} />
            <NavBtn side="right" onClick={() => step(1)} />

            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="glass absolute top-6 right-6 rounded-full p-3 text-cream/80 transition-colors hover:text-rose-soft"
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
      className={`glass absolute top-1/2 -translate-y-1/2 rounded-full p-3.5 text-cream/80 transition-colors hover:text-rose-soft ${
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

/** Shows the real photo when present, otherwise an elegant placeholder frame. */
function Photo({ src, index, large = false }: { src: string; index: number; large?: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.66 0.212 0.5 / 0.16), oklch(0.85 0.148 88 / 0.10))",
          }}
        />
        <span className="font-display relative text-3xl text-cream/40">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-sans relative px-6 text-[0.6rem] tracking-[0.28em] text-cream/45 uppercase">
          {large ? "Add photo-" + String(index + 1).padStart(2, "0") + ".jpg" : "Your photo here"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Memory ${index + 1}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
    />
  );
}
