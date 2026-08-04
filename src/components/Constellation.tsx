import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

const stars = [
  { x: 6, y: 62 },
  { x: 22, y: 30 },
  { x: 40, y: 54 },
  { x: 58, y: 20 },
  { x: 74, y: 48 },
  { x: 92, y: 22 },
];

/** A hidden constellation. Hovering lights it up; clicking opens the secret page. */
export function Constellation() {
  const [hot, setHot] = useState(false);

  return (
    <div className="relative flex justify-center py-20">
      <Link
        to="/somewhere-only-we-know"
        aria-label="A hidden constellation"
        title="…"
        onPointerEnter={() => setHot(true)}
        onPointerLeave={() => setHot(false)}
        className="group relative block h-20 w-44 opacity-45 transition-opacity duration-1000 hover:opacity-100"
      >
        <span
          aria-hidden
          className="absolute inset-0 -m-8 rounded-full opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, oklch(0.85 0.148 88 / 0.16), transparent 70%)",
            filter: "blur(14px)",
          }}
        />
        <svg viewBox="0 0 100 80" className="absolute inset-0 size-full overflow-visible">
          <motion.polyline
            points={stars.map((s) => `${s.x},${s.y}`).join(" ")}
            fill="none"
            stroke="oklch(0.9 0.15 90 / 0.8)"
            strokeWidth="0.6"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: hot ? 1 : 0, opacity: hot ? 1 : 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {stars.map((s, i) => (
            <g key={i}>
              <motion.circle
                cx={s.x}
                cy={s.y}
                r={i % 2 ? 1.4 : 2}
                fill="oklch(0.99 0.02 92)"
                animate={{
                  opacity: hot ? [0.7, 1, 0.7] : [0.3, 1, 0.3],
                  scale: hot ? 1.5 : 1,
                }}
                transition={{
                  opacity: { duration: 2.4 + i * 0.35, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                }}
                style={{
                  transformOrigin: `${s.x}px ${s.y}px`,
                  filter: "drop-shadow(0 0 6px oklch(0.9 0.15 90 / 1))",
                }}
              />
            </g>
          ))}
        </svg>
        <span className="font-sans absolute -bottom-2 left-1/2 -translate-x-1/2 text-[0.45rem] tracking-[0.4em] text-gold/0 uppercase transition-colors duration-700 group-hover:text-gold/60">
          Follow it
        </span>
      </Link>
    </div>
  );
}
