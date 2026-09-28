"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function StudioCursor() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 28, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 380, damping: 28, mass: 0.35 });
  const rx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, input, textarea, [data-cursor]")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y, reduced]);

  return (
    <>
      <motion.div
        aria-hidden
        className="studio-cursor pointer-events-none fixed z-[90] hidden md:block mix-blend-difference"
        style={{
          left: 0,
          top: 0,
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`rounded-full bg-[#f1ede5] transition-[width,height] duration-300 ${
            hovering ? "h-3 w-3" : "h-1.5 w-1.5"
          }`}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="studio-cursor pointer-events-none fixed z-[89] hidden md:block"
        style={{
          left: 0,
          top: 0,
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={`rounded-full border border-[#c9b48e]/50 transition-all duration-300 ${
            hovering ? "h-12 w-12 border-[#f1ede5]" : "h-8 w-8"
          }`}
        />
      </motion.div>
    </>
  );
}
