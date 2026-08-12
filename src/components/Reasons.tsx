import { motion } from "motion/react";
import { reasons } from "@/data/content";
import { Reveal, SectionHeading } from "./Reveal";
import { Sunflower } from "./Atmosphere";

export function Reasons() {
  return (
    <section id="reasons" className="relative overflow-hidden px-6 py-28 sm:py-40">
      {/* Ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, oklch(0.66 0.212 0.5 / 0.18), transparent 68%)",
          filter: "blur(70px)",
        }}
      />

      <SectionHeading
        eyebrow="13 Things"
        title="Thirteen things I love about you"
        lead="One for every year I hope to keep telling you these in person."
      />

      <div className="relative mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((text, i) => (
          <Reveal key={i} delay={(i % 3) * 0.09}>
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="glass glass-hover group relative h-full min-h-[13rem] overflow-hidden rounded-3xl p-7"
            >
              {/* Corner glow */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full"
                initial={{ opacity: 0, scale: 0.7 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.66 0.212 0.5 / 0.32), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Soft inner shine */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.85 0.148 88 / 0.07), transparent 45%, oklch(0.66 0.212 0.5 / 0.05))",
                }}
              />

              <div className="relative flex items-start justify-between">
                <motion.span
                  className="font-display text-4xl leading-none text-gold/70"
                  whileHover={{
                    scale: 1.08,
                    x: 3,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>

                {i === 12 ? (
                  <motion.div
                    animate={{
                      rotate: [0, -5, 5, 0],
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sunflower size={22} className="opacity-70" />
                  </motion.div>
                ) : (
                  <motion.span
                    className="text-sm text-rose-soft/50"
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: "easeInOut",
                    }}
                  >
                    ♥
                  </motion.span>
                )}
              </div>

              <p className="font-serif relative mt-6 text-lg leading-relaxed text-cream/85 transition-colors duration-500 group-hover:text-cream">
                {text}
              </p>

              {/* Bottom accent */}
              <motion.div
                aria-hidden
                className="absolute bottom-0 left-7 h-px w-0 bg-gradient-to-r from-gold via-rose-soft to-transparent group-hover:w-24"
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.article>
          </Reveal>
        ))}
      </div>

      {/* Closing whisper */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="font-serif relative mx-auto mt-16 max-w-lg text-center text-sm leading-relaxed text-cream/35 italic"
      >
        And somehow, thirteen reasons still aren't enough.
      </motion.p>
    </section>
  );
}