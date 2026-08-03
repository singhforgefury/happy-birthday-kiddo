import { reasons } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { Sunflower } from "./Atmosphere";

export function Reasons() {
  return (
    <section id="reasons" className="relative px-6 py-28 sm:py-40">
      <SectionHeading
        eyebrow="13 Things"
        title="Thirteen things I love about you"
        lead="One for every year I hope to keep telling you these in person."
      />

      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((text, i) => (
          <Reveal key={i} delay={(i % 3) * 0.07}>
            <article className="glass glass-hover group relative h-full overflow-hidden rounded-3xl p-7">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.66 0.212 0.5 / 0.35), transparent 70%)",
                  filter: "blur(18px)",
                }}
              />
              <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <span className="font-display text-4xl leading-none text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i === 12 ? (
                  <Sunflower size={22} className="shrink-0 opacity-70" />
                ) : (
                  <span className="shrink-0 text-sm text-rose-soft/50">❤</span>
                )}
              </div>
              <p className="font-serif relative mt-5 text-lg leading-relaxed text-cream/85">
                {text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
