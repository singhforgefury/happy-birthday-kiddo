import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Scroll-triggered reveal with stagger-friendly delay. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <p className="font-sans text-[0.7rem] tracking-[0.42em] text-gold/80 uppercase">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-ink font-display mt-5 text-4xl leading-[1.1] font-medium sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.16}>
          <p className="font-serif mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground italic sm:text-xl">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
