"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function StudioSeal() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1500], [0, 160]);
  return <div className="studio-seal" aria-hidden="true"><motion.svg viewBox="0 0 120 120" style={{ rotate: reduced ? 0 : rotate }}>
    <defs><path id="studio-seal-path" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs>
    <text><textPath href="#studio-seal-path" textLength="282">CREATIVE MIND · ENGINEERING SOUL · </textPath></text>
  </motion.svg><span>↗</span></div>;
}
