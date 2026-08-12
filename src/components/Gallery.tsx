import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { memories } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { Sunflower } from "./Atmosphere";

const spanClass: Record<string, string> = {
  tall: "aspect-[3/4.4]",
  wide: "aspect-[16/10]",
  normal: "aspect-square",
};

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((dir: number) => {
    setOpen((current) =>
      current === null
        ? current
        : (current + dir + memories.length) % memories.length
    );
  }, []);

  useEffect(() => {
    if (open === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <section
      id="memories"
      className="relative overflow-hidden px-6 py-32 sm:py-44"
    >
      {/* Ambient gallery glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.66 0.212 0.5 / 0.08), transparent 68%)",
        }}
      />

      <SectionHeading
        eyebrow="Memory Gallery"
        title="Sixteen pieces of us"
        lead="A scrapbook of ordinary days that turned out to be the best ones."
      />

      {/* Small introduction */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1 }}
        className="mx-auto mt-10 flex items-center justify-center gap-3"
      >
        <span className="h-px w-10 bg-gold/20" />
        <span className="font-sans text-[0.55rem] tracking-[0.35em] text-cream/30 uppercase">
          little moments · forever memories
        </span>
        <span className="h-px w-10 bg-gold/20" />
      </motion.div>

      {/* Masonry */}
      <div className="mx-auto mt-20 max-w-6xl columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {memories.map((memory, index) => (
          <Reveal
            key={index}
            delay={(index % 3) * 0.07}
            className="break-inside-avoid"
          >
            <MemoryCard
              memory={memory}
              index={index}
              onOpen={() => setOpen(index)}
            />
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <Lightbox
            index={open}
            onClose={() => setOpen(null)}
            onPrevious={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function MemoryCard({
  memory,
  index,
  onOpen,
}: {
  memory: (typeof memories)[number];
  index: number;
  onOpen: () => void;
}) {
  const rotation = index % 4 === 0
    ? "-0.6deg"
    : index % 4 === 1
      ? "0.5deg"
      : index % 4 === 2
        ? "-0.35deg"
        : "0.7deg";

  return (
    <figure className="group relative">
      <motion.button
        whileHover={{ y: -6, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={onOpen}
        className={`glass relative block w-full cursor-pointer overflow-hidden rounded-[1.7rem] border border-white/[0.08] ${spanClass[memory.span]}`}
        style={{ rotate: rotation }}
        aria-label={`Open memory ${index + 1}`}
      >
        <Photo src={memory.src} index={index} />

        {/* Dark cinematic gradient */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-90"
        />

        {/* Moving light */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-[40%] translate-x-[-120%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.10] to-transparent transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[120%]"
        />

        {/* Memory number */}
        <span className="absolute left-5 top-5 font-sans text-[0.55rem] tracking-[0.25em] text-white/60">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* View label */}
        <span className="absolute inset-x-5 bottom-5 flex translate-y-2 items-center justify-between opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="font-serif text-sm text-white/90 italic">
            Open memory
          </span>

          <span className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/80 backdrop-blur-md">
            ↗
          </span>
        </span>
      </motion.button>

      <figcaption className="mt-4 px-2">
        <p className="font-serif text-sm leading-relaxed text-muted-foreground italic">
          {memory.caption}
        </p>
      </figcaption>
    </figure>
  );
}

function Lightbox({
  index,
  onClose,
  onPrevious,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const memory = memories[index]!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 sm:px-8"
      style={{
        background: "oklch(0.04 0.02 268 / 0.9)",
        backdropFilter: "blur(32px) saturate(120%)",
      }}
      onClick={onClose}
    >
      {/* Top information */}
      <div className="absolute left-6 top-6 sm:left-10 sm:top-8">
        <p className="font-sans text-[0.55rem] tracking-[0.3em] text-gold/70 uppercase">
          Memory {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-2 font-serif text-sm text-cream/50 italic">
          {index + 1} of {memories.length}
        </p>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close memory"
        className="glass absolute right-5 top-5 z-20 flex size-11 items-center justify-center rounded-full text-cream/70 transition-all duration-500 hover:scale-105 hover:text-rose-soft sm:right-8 sm:top-8"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z" />
        </svg>
      </button>

      {/* Image */}
      <motion.figure
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-4xl"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-black/20 shadow-2xl">
          <div className="relative aspect-[4/3]">
            <Photo src={memory.src} index={index} large />
          </div>
        </div>

        <figcaption className="mx-auto mt-6 max-w-xl text-center">
          <p className="font-serif text-lg leading-relaxed text-cream/85 italic">
            memories[open]!.caption
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/20" />
            <span className="font-sans text-[0.5rem] tracking-[0.3em] text-cream/30 uppercase">
              a moment worth keeping
            </span>
            <span className="h-px w-8 bg-gold/20" />
          </div>
        </figcaption>
      </motion.figure>

      {/* Navigation */}
      <NavBtn side="left" onClick={onPrevious} />
      <NavBtn side="right" onClick={onNext} />

      {/* Keyboard hint */}
      <p className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 font-sans text-[0.48rem] tracking-[0.25em] text-white/20 uppercase sm:block">
        ← → to explore · esc to close
      </p>
    </motion.div>
  );
}

function NavBtn({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous memory" : "Next memory"}
      className={`glass absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-cream/60 transition-all duration-500 hover:scale-110 hover:text-rose-soft ${
        side === "left"
          ? "left-3 sm:left-8"
          : "right-3 sm:right-8"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{
          transform:
            side === "right" ? "rotate(180deg)" : undefined,
        }}
      >
        <path d="M15.4 3.6L7 12l8.4 8.4 1.4-1.4L9.8 12l7-7z" />
      </svg>
    </button>
  );
}

/** Shows the real photo when present, otherwise an elegant placeholder. */
function Photo({
  src,
  index,
  large = false,
}: {
  src: string;
  index: number;
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.66 0.212 0.5 / 0.18), oklch(0.85 0.148 88 / 0.12) 60%, oklch(0.11 0.028 268 / 0.5))",
          }}
        />

        <div
          aria-hidden
          className="absolute inset-4 rounded-2xl"
          style={{
            border: "1px solid oklch(0.85 0.148 88 / 0.22)",
          }}
        />

        <div
          className="relative"
          style={{
            animation: "float-soft 8s ease-in-out infinite",
          }}
        >
          <Sunflower
            size={large ? 46 : 30}
            className="opacity-70"
          />
        </div>

        <span className="font-display relative text-2xl text-cream/35">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Memory ${index + 1}`}
      onError={() => setFailed(true)}
      className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
    />
  );
}