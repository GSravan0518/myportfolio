"use client";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
const chapters = [
  { label: "The foundation", title: "Computer Science Engineering", copy: "Learning to think in systems. A grounding in programming, algorithms, databases, and the craft of solving problems." },
  { label: "The practice", title: "Ideas into working products", copy: "Building across the stack — from responsive web interfaces to APIs and data — with projects spanning healthcare and modern web engineering." },
  { label: "The exploration", title: "Applied & Generative AI", copy: "Exploring computer vision, sentiment analysis, and deepfake detection, while developing a deeper understanding of generative systems." },
];
export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  return <div className="journey" ref={ref}><motion.div aria-hidden="true" className="journey-progress" style={{ scaleY: reduced ? 1 : scrollYProgress }} /><ol>{chapters.map((chapter, i) => <motion.li key={chapter.title} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}><span className="journey-index micro">0{i + 1}</span><div><p className="micro accent">{chapter.label}</p><h3>{chapter.title}</h3><p>{chapter.copy}</p></div></motion.li>)}</ol></div>;
}
