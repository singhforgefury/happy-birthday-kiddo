import { useEffect, useState } from "react";

type Star = { x: number; y: number; s: number; d: number; delay: number };
type Petal = { x: number; size: number; dur: number; delay: number; drift: number };

/** Deterministic-after-mount atmosphere: aurora, stars, sunflower petals, mouse glow. */
export function Atmosphere({
  petals = 9,
  starCount = 90,
  intensity = 1,
}: {
  petals?: number;
  starCount?: number;
  intensity?: number;
}) {
  const [stars, setStars] = useState<Star[]>([]);
  const [leaves, setLeaves] = useState<Petal[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: starCount }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 1.6 + 0.6,
        d: Math.random() * 4 + 2.5,
        delay: Math.random() * 5,
      })),
    );
    setLeaves(
      Array.from({ length: petals }, () => ({
        x: Math.random() * 100,
        size: Math.random() * 12 + 10,
        dur: Math.random() * 14 + 18,
        delay: Math.random() * 18,
        drift: Math.random() * 22 - 8,
      })),
    );
  }, [petals, starCount]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="aurora-layer absolute -inset-[20%]" style={{ opacity: 0.75 * intensity }} />
      <div className="absolute inset-0">
        {stars.map((st, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cream"
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`,
              boxShadow: "0 0 6px currentColor",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0">
        {leaves.map((p, i) => (
          <span
            key={i}
            className="absolute top-0 block"
            style={
              {
                left: `${p.x}%`,
                width: p.size,
                height: p.size * 0.55,
                borderRadius: "60% 40% 55% 45% / 70% 60% 40% 30%",
                background:
                  "linear-gradient(120deg, oklch(0.9 0.15 92 / 0.95), oklch(0.78 0.16 78 / 0.55))",
                filter: "blur(0.3px)",
                animation: `petal-fall ${p.dur}s linear ${p.delay}s infinite`,
                "--drift": `${p.drift}vw`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 40%, oklch(0.11 0.028 268 / 0.85) 100%)",
        }}
      />
    </div>
  );
}

/** Soft cursor light that follows the pointer (desktop only). */
export function MouseGlow() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!pos) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-0 hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        width: 620,
        height: 620,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, oklch(0.77 0.135 2 / 0.10) 0%, oklch(0.85 0.148 88 / 0.05) 35%, transparent 68%)",
        transition: "left .35s cubic-bezier(.16,1,.3,1), top .35s cubic-bezier(.16,1,.3,1)",
      }}
    />
  );
}

/** Tiny decorative sunflower (SVG) with a gentle bloom. */
export function Sunflower({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      style={{ animation: "bloom 7s ease-in-out infinite" }}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="24"
          cy="9"
          rx="3.1"
          ry="8.4"
          fill="oklch(0.85 0.148 88 / 0.9)"
          transform={`rotate(${i * 30} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="6.4" fill="oklch(0.42 0.09 60)" />
      <circle cx="24" cy="24" r="3.2" fill="oklch(0.32 0.07 55)" />
    </svg>
  );
}

/** A slim gold rule with a blooming sunflower at its centre. */
export function SunflowerDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/40 sm:w-28" />
      <span style={{ animation: "bloom 9s ease-in-out infinite" }}>
        <Sunflower size={26} className="opacity-85" />
      </span>
      <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold/40 sm:w-28" />
    </div>
  );
}

/** A few gold petals drifting across a section — used to close the story. */
export function DriftingPetals({ count = 12 }: { count?: number }) {
  const [items, setItems] = useState<Petal[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        size: Math.random() * 10 + 9,
        dur: Math.random() * 8 + 10,
        delay: Math.random() * 10,
        drift: Math.random() * 30 - 15,
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block"
          style={
            {
              left: `${p.x}%`,
              width: p.size,
              height: p.size * 0.55,
              borderRadius: "60% 40% 55% 45% / 70% 60% 40% 30%",
              background:
                "linear-gradient(120deg, oklch(0.92 0.15 92 / 0.95), oklch(0.78 0.16 78 / 0.5))",
              animation: `petal-fall ${p.dur}s linear ${p.delay}s infinite`,
              "--drift": `${p.drift}vw`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
