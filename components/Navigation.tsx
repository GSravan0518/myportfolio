"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profile } from "../lib/portfolio";
const links = [{ label: "About", href: "#about" }, { label: "Journey", href: "#journey" }, { label: "Work", href: "#projects" }, { label: "Skills", href: "#skills" }, { label: "Contact", href: "#contact" }];
export function Navigation() {
  const [active, setActive] = useState("#hero"), [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null), menu = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`); }, { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector("a")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); button.current?.focus(); }
      if (event.key === "Tab") {
        const items = [button.current, ...Array.from(menu.current?.querySelectorAll("a") ?? [])].filter(Boolean) as HTMLElement[];
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const wide = window.matchMedia("(min-width: 1000px)");
    const resize = () => { if (wide.matches) setOpen(false); };
    wide.addEventListener("change", resize);
    document.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", keydown); wide.removeEventListener("change", resize); };
  }, [open]);
  return <header className="studio-header"><div className="header-inner page-width">
    <a className="wordmark" href="#hero" aria-label="Sravan Gummalla, home" onClick={() => setOpen(false)}>S<span>G</span><i /></a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined}>{link.label}</a>)}</nav>
    <a className="resume-link micro" href={profile.resume} download>Resume <ArrowUpRight size={14} /></a>
    <button ref={button} className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="mobile-nav" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
  </div>{open && <nav ref={menu} id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{links.map((link, i) => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined} onClick={() => { setOpen(false); document.querySelector<HTMLElement>(link.href)?.focus({ preventScroll: true }); }}><span className="micro">0{i + 1}</span>{link.label}<ArrowUpRight size={24} /></a>)}<a className="mobile-resume" href={profile.resume} download onClick={() => setOpen(false)}>Download resume <ArrowUpRight size={20} /></a><p className="micro">{profile.location}</p></nav>}</header>;
}
