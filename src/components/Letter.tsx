import { motion } from "motion/react";
import { letter } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { Sunflower, SunflowerDivider } from "./Atmosphere";

const ink = { color: "oklch(0.4 0.16 12)" };

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
            className="paper relative overflow-hidden rounded-[1.75rem] px-7 py-12 sm:px-16 sm:py-16"
            style={{
              color: "oklch(0.28 0.03 60)",
              boxShadow:
                "0 40px 90px -40px oklch(0 0 0 / 0.8), inset 0 0 60px oklch(0.8 0.1 80 / 0.18)",
              transform: "rotate(-0.5deg)",
            }}
          >
            {/* soft paper grain + fold shading */}
            <span aria-hidden className="paper-grain pointer-events-none absolute inset-0" />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 w-24 -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.42 0.09 60 / 0.07), transparent)",
              }}
            />

            <div className="relative flex justify-center">
              <Sunflower size={34} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-hand relative mt-8 text-3xl sm:text-4xl"
              style={ink}
            >
              {letter.greeting}
            </motion.p>

            <div className="relative mt-7 space-y-6">
              {letter.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 2.4, delay: 0.3 + i * 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-hand text-2xl leading-relaxed sm:text-[1.75rem]"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 2.4 }}
              className="font-hand relative mt-10 text-2xl sm:text-3xl"
            >
              {letter.signature}
            </motion.p>

            {/* signature: written, not typed */}
            <motion.p
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 2.6, delay: 2.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-hand relative text-3xl sm:text-4xl"
              style={ink}
            >
              {letter.from}
            </motion.p>
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-2 block h-[2px] w-28 origin-left rounded-full"
              style={{ background: "linear-gradient(90deg, oklch(0.4 0.16 12 / 0.7), transparent)" }}
            />
          </article>
        </div>
      </Reveal>
    </section>
  );
}
