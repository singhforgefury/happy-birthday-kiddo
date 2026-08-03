import { letter } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { Sunflower, SunflowerDivider } from "./Atmosphere";

export function Letter() {
  return (
    <section id="letter" className="relative px-6 py-28 sm:py-40">
      <Reveal>
        <SunflowerDivider className="mb-16" />
      </Reveal>
      <SectionHeading eyebrow="A Letter" title="Something I wrote for you" />

      <Reveal delay={0.1} className="mx-auto mt-16 max-w-3xl">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] opacity-70"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 30%, oklch(0.85 0.148 88 / 0.20), transparent 70%)",
              filter: "blur(26px)",
            }}
          />
          <article
            className="paper relative rounded-[1.75rem] px-7 py-12 sm:px-16 sm:py-16"
            style={{
              color: "oklch(0.28 0.03 60)",
              boxShadow: "0 40px 90px -40px oklch(0 0 0 / 0.8), inset 0 0 60px oklch(0.8 0.1 80 / 0.18)",
              transform: "rotate(-0.5deg)",
            }}
          >
            <div className="flex justify-center">
              <Sunflower size={34} />
            </div>

            <p className="font-hand mt-8 text-3xl sm:text-4xl" style={{ color: "oklch(0.4 0.16 12)" }}>
              {letter.greeting}
            </p>

            <div className="mt-7 space-y-6">
              {letter.paragraphs.map((p, i) => (
                <p key={i} className="font-hand text-2xl leading-relaxed sm:text-[1.75rem]">
                  {p}
                </p>
              ))}
            </div>

            <p className="font-hand mt-10 text-2xl sm:text-3xl">{letter.signature}</p>
            <p
              className="font-hand text-3xl sm:text-4xl"
              style={{ color: "oklch(0.4 0.16 12)" }}
            >
              {letter.from}
            </p>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
