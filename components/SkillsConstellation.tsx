"use client";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useState } from "react";
const clusters = [
  { title: "Languages", tools: ["Java", "Python", "JavaScript", "TypeScript"], note: "The vocabulary of problem solving." },
  { title: "Web & APIs", tools: ["React", "Next.js", "Node.js", "FastAPI", "Flask", "REST APIs"], note: "Interfaces and services, working together." },
  { title: "Intelligence", tools: ["AI / ML", "Generative AI", "PyTorch", "Computer Vision", "NLP"], note: "Finding useful signals in complex data." },
  { title: "Systems", tools: ["Databases", "PostgreSQL", "MongoDB", "Git", "Docker", "Cloud / AWS"], note: "The foundations behind the experience." },
];
export function SkillsConstellation() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 100, damping: 25 }), sy = useSpring(y, { stiffness: 100, damping: 25 });
  return <div className="skills-constellation" onPointerMove={e => {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width * 9); y.set((e.clientY - rect.top - rect.height / 2) / rect.height * 9);
  }} onPointerLeave={() => { x.set(0); y.set(0); setActive(null); }}>
    <svg className="constellation-lines" viewBox="0 0 700 480" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="350" cy="240" rx="280" ry="165" /><ellipse cx="350" cy="240" rx="165" ry="225" /><path d="M140 120L560 360M560 120L140 360M350 20V460M30 240H670" /></svg>
    <div className="constellation-core" aria-hidden="true"><span>SG</span><span className="micro">Engineering</span></div>
    <motion.div className="skill-clusters" style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}>{clusters.map((cluster, i) => <div className={`skill-cluster ${active === i ? "is-active" : ""}`} key={cluster.title} onPointerEnter={() => setActive(i)}>
      <h3><span className="node-dot" /><span className="micro">0{i + 1} / {cluster.title}</span></h3><ul>{cluster.tools.map(tool => <li key={tool}>{tool}</li>)}</ul><p>{cluster.note}</p>
    </div>)}</motion.div>
    <p className="constellation-caption micro">One connected practice <span>Four complementary disciplines</span></p>
  </div>;
}
