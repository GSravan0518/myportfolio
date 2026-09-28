"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function ProjectCard({ children, index }: { children: ReactNode; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const x = useSpring(px, { stiffness: 150, damping: 26 });
  const y = useSpring(py, { stiffness: 150, damping: 26 });
  const rotateX = useTransform(y, [0, 1], [2, -2]);
  const rotateY = useTransform(x, [0, 1], [-2, 2]);
  const lightX = useTransform(x, [0, 1], [0, 100]);
  const lightY = useTransform(y, [0, 1], [0, 100]);
  const light = useMotionTemplate`radial-gradient(480px circle at ${lightX}% ${lightY}%, rgba(201,180,142,.08), transparent 65%)`;

  function reset() { px.set(0.5); py.set(0.5); }

  return (
    <motion.article
      className="project-card group relative"
      ref={ref}
      data-project-index={index}
      initial={reduced ? false : { opacity: 0, y: 48, clipPath: "inset(8% 0 0 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 1500 }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        px.set(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
        py.set(Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)));
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.div aria-hidden="true" className="project-light pointer-events-none absolute inset-0" style={{ background: reduced ? "none" : light }} />
      <div className="relative">{children}</div>
    </motion.article>
  );
}
