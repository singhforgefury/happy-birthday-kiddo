import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { story } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 55%"],
  });

  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="our-story"
      className="relative overflow-hidden px-6 py-32 sm:py-44"
    >
      {/* Ambient cinematic glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.66 0.212 0.5 / 0.10), transparent 68%)",
        }}
      />

      <SectionHeading
        eyebrow="Our Story"
        title="How we happened"
        lead="Five moments that quietly rearranged an entire life."
      />

      <div
        ref={ref}
        className="relative mx-auto mt-24 max-w-5xl"
      >
        {/* Static spine */}
        <div className="absolute left-[1.35rem] top-0 bottom-0 w-px bg-white/[0.07] md:left-1/2 md:-translate-x-1/2" />

        {/* Animated spine */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-[1.35rem] top-0 w-px origin-top bg-gradient-to-b from-primary via-rose-soft to-gold md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-20 md:space-y-32">
          {story.map((event, index) => (
            <TimelineMoment
              key={event.title}
              event={event}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineMoment({
  event,
  index,
}: {
  event: (typeof story)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.45,
  });

  const isRight = index % 2 === 1;

  return (
    <div ref={ref} className="relative">
      {/* Mobile node */}
      <div className="absolute left-0 top-8 flex md:hidden">
        <Node icon={event.icon} active={isInView} />
      </div>

      <div
        className={`grid grid-cols-[3rem_minmax(0,1fr)] gap-5 md:grid-cols-[1fr_5rem_1fr] md:gap-0`}
      >
        {/* Left side */}
        <div
          className={`col-start-2 md:col-start-1 ${
            isRight ? "md:order-3" : "md:order-1"
          }`}
        >
          <Reveal delay={0.05}>
            <StoryCard
              event={event}
              index={index}
              align={isRight ? "left" : "right"}
              active={isInView}
            />
          </Reveal>
        </div>

        {/* Center node */}
        <div className="hidden md:order-2 md:flex md:items-start md:justify-center">
          <Node icon={event.icon} active={isInView} />
        </div>

        {/* Empty opposite side */}
        <div
          className={`hidden md:block ${
            isRight ? "md:order-1" : "md:order-3"
          }`}
        />
      </div>
    </div>
  );
}

function StoryCard({
  event,
  index,
  align,
  active,
}: {
  event: (typeof story)[number];
  index: number;
  align: "left" | "right";
  active: boolean;
}) {
  return (
    <motion.article
      animate={{
        y: active ? 0 : 10,
        opacity: active ? 1 : 0.72,
        scale: active ? 1 : 0.985,
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-7 backdrop-blur-xl transition-colors duration-700 hover:border-white/[0.16] sm:p-9 ${
        align === "right" ? "md:text-right" : "md:text-left"
      }`}
    >
      {/* Hover light */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
        style={{
          background:
            align === "right"
              ? "radial-gradient(80% 100% at 100% 0%, oklch(0.77 0.135 2 / 0.13), transparent 65%)"
              : "radial-gradient(80% 100% at 0% 0%, oklch(0.85 0.148 88 / 0.13), transparent 65%)",
        }}
      />

      {/* Tiny chapter number */}
      <div
        className={`relative flex items-center gap-3 ${
          align === "right"
            ? "md:justify-end"
            : "md:justify-start"
        }`}
      >
        <span className="font-sans text-[0.55rem] tracking-[0.35em] text-gold/60 uppercase">
          Chapter {String(index + 1).padStart(2, "0")}
        </span>

        <span className="h-px w-8 bg-gold/20" />
      </div>

      {/* Place */}
      <p className="relative mt-5 font-sans text-[0.58rem] tracking-[0.34em] text-gold/80 uppercase">
        {event.place}
      </p>

      {/* Title */}
      <h3 className="relative mt-3 font-display text-2xl leading-tight text-cream sm:text-3xl">
        {event.title}
      </h3>

      {/* Note */}
      <p className="relative mt-4 font-serif text-base leading-relaxed text-muted-foreground italic sm:text-lg">
        {event.note}
      </p>

      {/* Date */}
      <p className="relative mt-6 font-sans text-[0.55rem] tracking-[0.3em] text-cream/35 uppercase">
        {event.when}
      </p>

      {/* Bottom shine */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-all duration-1000 group-hover:w-3/4"
      />
    </motion.article>
  );
}

function Node({
  icon,
  active,
}: {
  icon: string;
  active: boolean;
}) {
  return (
    <motion.div
      animate={{
        scale: active ? 1.12 : 1,
        boxShadow: active
          ? "0 0 0 1px oklch(0.77 0.135 2 / 0.45), 0 0 45px -4px oklch(0.66 0.212 0.5 / 0.7)"
          : "0 0 0 1px oklch(0.77 0.135 2 / 0.2), 0 0 25px -8px oklch(0.66 0.212 0.5 / 0.35)",
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="glass relative z-20 flex size-11 shrink-0 items-center justify-center rounded-full text-lg"
    >
      {/* Pulsing ring */}
      {active && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.9, 1.6, 1.9] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full border border-gold/40"
        />
      )}

      <span className="relative z-10">{icon}</span>
    </motion.div>
  );
}