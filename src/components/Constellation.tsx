import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const stars = [
  { x: 6, y: 62 },
  { x: 22, y: 30 },
  { x: 40, y: 54 },
  { x: 58, y: 20 },
  { x: 74, y: 48 },
  { x: 92, y: 22 },
];

/** A tiny hidden constellation. Clicking it opens the secret page. */
export function Constellation() {
  return (
    <div className="relative flex justify-center py-16">
      <Link
        to="/somewhere-only-we-know"
        aria-label="A hidden constellation"
        title="…"
        className="group relative block h-14 w-32 opacity-35 transition-opacity duration-1000 hover:opacity-100"
      >
        <svg viewBox="0 0 100 80" className="absolute inset-0 size-full overflow-visible">
          <polyline
            points={stars.map((s) => `${s.x},${s.y}`).join(" ")}
            fill="none"
            stroke="oklch(0.85 0.148 88 / 0.55)"
            strokeWidth="0.5"
            className="opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
          />
          {stars.map((s, i) => (
            <motion.circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={i % 2 ? 1.1 : 1.6}
              fill="oklch(0.97 0.028 92)"
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 4px oklch(0.85 0.148 88 / 0.9))" }}
            />
          ))}
        </svg>
      </Link>
    </div>
  );
}
