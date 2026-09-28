"use client";

import Image from "next/image";
import { motion, MotionConfig, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { StudioCursor } from "./StudioCursor";
import { profile } from "../lib/portfolio";

export function PortfolioEnvironment({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const x = useMotionValue(0), y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 65, damping: 24 }), py = useSpring(y, { stiffness: 65, damping: 24 });
  const depth = useTransform(scrollY, [0, 1100], [1.025, 1.12]);
  const portraitDrift = useTransform(scrollY, [0, 1100], [0, -28]);
  const portraitY = useTransform(() => py.get() + portraitDrift.get());
  const shade = useTransform(scrollY, [0, 800], [0, 0.26]);
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });
  const lightX = useTransform(px, [-8, 8], ["20vw", "70vw"]), lightY = useTransform(py, [-6, 6], ["20vh", "65vh"]);
  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (event: PointerEvent) => { x.set((event.clientX / window.innerWidth - 0.5) * 16); y.set((event.clientY / window.innerHeight - 0.5) * 12); };
    const reset = () => { x.set(0); y.set(0); };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", reset); };
  }, [reduced, x, y]);
  return <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
    <div className="portfolio-shell">
      <div className="portrait-backdrop" aria-hidden="true">
        <motion.div className="portrait-plane" style={{ x: reduced ? 0 : px, y: reduced ? 0 : portraitY, scale: reduced ? 1.025 : depth }}>
          <Image src={profile.portrait} alt="" fill preload sizes="(max-width: 700px) 100vw, 72vw" className="backdrop-photo" />
        </motion.div>
        <div className="portrait-vignette" />
        <motion.div className="portrait-shade" style={{ opacity: shade }} />
        {!reduced && <motion.div className="atmospheric-light" style={{ x: lightX, y: lightY, translateX: "-50%", translateY: "-50%" }} />}
      </div>
      <div className="film-grain" aria-hidden="true" />
      <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : progress }} />
      <StudioCursor />{children}
    </div>
  </MotionConfig>;
}

export function HeroIdentity() {
  const reduced = useReducedMotion();
  return (
    <h1 className="hero-title" aria-label={profile.name}>
      {["Sravan", "Kumar", "Gummalla"].map((line, index) => (
        <span className="title-mask" key={line} aria-hidden="true">
          <motion.span
            initial={reduced ? false : { y: "105%", rotate: 3 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1.25, delay: 0.12 + index * 0.13, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}{index === 2 && <span className="name-period">.</span>}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
