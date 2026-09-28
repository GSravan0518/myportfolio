"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { RevealHeading } from "./RevealHeading";
import { profile } from "../lib/portfolio";

export function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const [draftOpened, setDraftOpened] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("Email address copied.");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopyStatus(""), 2500);
    } catch { setCopyStatus("Copy unavailable. Use the email link to open your mail app."); }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")}\n${data.get("email")}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setDraftOpened(true);
  }
  return <section id="contact" tabIndex={-1} className="content-section contact-section page-width">
    <p className="section-label"><span>05 / Contact</span><span>The next chapter starts here</span></p>
    <div className="editorial-column">
      <p className="eyebrow"><span className="status-dot" /> Open to opportunities & collaborations</p>
      <RevealHeading className="contact-title">Let&apos;s build<br />something<br /><span className="accent">meaningful.</span></RevealHeading>
      <p className="section-intro">Have a role, an idea, or a question in mind?<br />I&apos;d love to hear what you&apos;re working on.</p>
      <div className="contact-email-row"><Magnetic strength={10}><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<ArrowUpRight /></a></Magnetic><button type="button" className="copy-button" onClick={copyEmail} aria-label="Copy email address">{copyStatus === "Email address copied." ? <Check size={18} /> : <Copy size={18} />}</button></div>
      <p role="status" className="copy-status">{copyStatus}</p>
      <div className="social-links">{[{ label: "LinkedIn", href: profile.linkedin }, { label: "GitHub", href: profile.github }, { label: "Resume", href: profile.resume }].map(link => <Magnetic key={link.label}><a className="text-link" href={link.href} target={link.label === "Resume" ? undefined : "_blank"} rel={link.label === "Resume" ? undefined : "noreferrer"} download={link.label === "Resume" || undefined}>{link.label}<ArrowUpRight size={16} /></a></Magnetic>)}</div>
      <details className="contact-compose"><summary>Prefer to leave a note?<span aria-hidden="true">+</span></summary><form onSubmit={submit}>
        <p className="form-note">Write a note here to open a draft in your email app.</p>
        <div className="form-grid"><label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={120} /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} /></label></div>
        <label>What do you have in mind?<textarea name="message" rows={4} placeholder="A little about your idea, team, or opportunity…" required maxLength={4000} /></label>
        <button type="submit" className="button button-solid">Open email draft <ArrowUpRight size={16} /></button>
        <p role="status" className="form-note">{draftOpened ? "Your email app was requested. Review and send the draft there; this site has not sent a message." : ""}</p>
      </form></details>
    </div>
  </section>;
}
