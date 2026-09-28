"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const railQuery = "(min-width: 1000px) and (min-height: 740px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const query = window.matchMedia(railQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getSnapshot = () => window.matchMedia(railQuery).matches;
const getServerSnapshot = () => false;

export function ProjectRail({ children, count }: { children: ReactNode; count: number }) {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const runway = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: runway, offset: ["start 100px", "end end"] });
  const x = useTransform(scrollYProgress, progress => enabled ? -progress * travel : 0);

  useEffect(() => {
    if (!enabled || !track.current || !viewport.current) return;
    const measure = () => setTravel(Math.max(0, track.current!.scrollWidth - viewport.current!.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track.current);
    observer.observe(viewport.current);
    measure();
    return () => observer.disconnect();
  }, [enabled]);

  useMotionValueEvent(scrollYProgress, "change", progress => {
    const cards = track.current?.children;
    if (!enabled || !cards?.length) return;
    const stride = (cards[1] as HTMLElement | undefined)?.offsetLeft ?? travel;
    setActive(Math.min(count - 1, Math.max(0, Math.round(progress * travel / (stride || 1)))));
  });

  function goTo(index: number) {
    if (!enabled || !runway.current || !track.current) return;
    const card = track.current.children[index] as HTMLElement | undefined;
    if (!card) return;
    const progress = Math.min(1, card.offsetLeft / (travel || 1));
    const start = runway.current.getBoundingClientRect().top + window.scrollY - 100;
    const distance = runway.current.offsetHeight - window.innerHeight + 100;
    window.scrollTo({ top: start + progress * distance, behavior: "smooth" });
  }

  return <div ref={runway} className="project-runway" data-pinned={enabled} style={enabled ? { height: `calc(100svh + ${travel}px)` } : undefined}>
    <div className="project-sticky">
      <div className="rail-toolbar"><span className="micro">Selected explorations <span className="rail-divider">/</span> 2026</span><div className="rail-navigation"><span className="micro">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span><button aria-label="Previous project" disabled={active === 0} onClick={() => goTo(active - 1)}><ArrowLeft size={17} /></button><button aria-label="Next project" disabled={active === count - 1} onClick={() => goTo(active + 1)}><ArrowRight size={17} /></button></div></div>
      <div ref={viewport} className="project-viewport">
        <motion.div ref={track} className="project-gallery" style={{ x }} onFocusCapture={event => {
          const article = (event.target as HTMLElement).closest<HTMLElement>("[data-project-index]");
          if (article && enabled) goTo(Number(article.dataset.projectIndex));
        }}>{children}</motion.div>
      </div>
      <div className="rail-progress" aria-hidden="true"><motion.span style={{ scaleX: scrollYProgress }} /></div>
      <p className="rail-hint micro">Keep scrolling to explore <ArrowRight size={14} /></p>
    </div>
  </div>;
}
