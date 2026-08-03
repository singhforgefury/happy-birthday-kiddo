import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { story } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="our-story" className="relative px-6 py-28 sm:py-40">
      <SectionHeading
        eyebrow="Our Story"
        title="How we happened"
        lead="Five moments that quietly rearranged an entire life."
      />

      <div ref={ref} className="relative mx-auto mt-20 max-w-3xl">
        {/* spine */}
        <div className="absolute top-0 bottom-0 left-[1.35rem] w-[1px] bg-glow/10 md:left-1/2" />
        <motion.div
          style={{ height }}
          className="absolute top-0 left-[1.35rem] w-[1px] bg-gradient-to-b from-primary via-rose-soft to-gold md:left-1/2"
        />

        <div className="space-y-14 md:space-y-24">
          {story.map((ev, i) => (
            <Reveal key={ev.title} delay={0.05}>
              <div
                className={`relative grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 md:grid-cols-2 md:gap-12 ${
                  i % 2 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="flex justify-center md:hidden">
                  <Node icon={ev.icon} />
                </div>

                <div
                  className={`glass glass-hover group relative overflow-hidden rounded-3xl p-6 sm:p-7 [direction:ltr] ${
                    i % 2 ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(90% 120% at 50% 0%, oklch(0.85 0.148 88 / 0.14), transparent 70%)",
                    }}
                  />
                  <p className="font-sans relative text-[0.6rem] tracking-[0.34em] text-gold/85 uppercase">
                    {ev.place}
                  </p>
                  <h3 className="font-display relative mt-3 text-2xl leading-tight text-cream sm:text-3xl">
                    {ev.title}
                  </h3>
                  <p className="font-serif relative mt-3 text-base text-muted-foreground italic">
                    {ev.note}
                  </p>
                  <p className="font-sans relative mt-4 text-[0.58rem] tracking-[0.28em] text-cream/40 uppercase">
                    {ev.when}
                  </p>
                </div>

                <div className="hidden md:flex md:items-center md:justify-center">
                  <Node icon={ev.icon} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Node({ icon }: { icon: string }) {
  return (
    <div
      className="glass relative z-10 flex size-11 items-center justify-center rounded-full text-lg"
      style={{
        boxShadow:
          "0 0 0 1px oklch(0.77 0.135 2 / 0.3), 0 0 34px -6px oklch(0.66 0.212 0.5 / 0.55)",
        animation: "float-soft 7s ease-in-out infinite",
      }}
    >
      {icon}
    </div>
  );
}
