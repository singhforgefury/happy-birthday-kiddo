"use client";

import { useEffect, useState } from "react";

export function SunflowerCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setVisible(true);
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] select-none text-xl"
      style={{
        transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      🌻
    </div>
  );
}