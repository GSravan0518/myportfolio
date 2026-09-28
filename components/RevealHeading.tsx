"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

function maskedWords(children: ReactNode): ReactNode {
  return Children.map(children, child => {
    if (typeof child === "string") return child.split(/(\s+)/).map((word, index) => /\s+/.test(word) ? word : <span className="word-mask" key={index}><motion.span variants={{ hidden: { y: "110%", rotate: 4 }, visible: { y: 0, rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}>{word}</motion.span></span>);
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) return cloneElement(child as ReactElement<{ children?: ReactNode }>, { children: maskedWords(child.props.children) });
    return child;
  });
}

export function RevealHeading({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.h2
      className={`reveal-heading ${className ?? ""}`}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.055 } } }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
    >
      {maskedWords(children)}
    </motion.h2>
  );
}
