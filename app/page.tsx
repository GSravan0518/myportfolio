import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PortfolioEnvironment, HeroIdentity } from "../components/PortfolioEnvironment";
import { Navigation } from "../components/Navigation";
import { Magnetic } from "../components/Magnetic";
import { ProjectGallery } from "../components/ProjectGallery";
import { RevealHeading } from "../components/RevealHeading";
import { SkillsConstellation } from "../components/SkillsConstellation";
import { Contact } from "../components/Contact";
import { Journey } from "../components/Journey";
import { StudioSeal } from "../components/StudioMotion";
import { profile } from "../lib/portfolio";

export default function Home() {
  return (
    <PortfolioEnvironment>
      <a href="#about" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <section id="hero" className="hero-stage page-width">
          <div className="hero-topline micro"><span>Developer & creative thinker</span><span>Independent portfolio — Vol. 01 / 2026</span></div>
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Available for opportunities</p>
            <HeroIdentity />
            <div className="hero-description">
              <p className="hero-role">Software Developer</p>
              <p className="micro accent">AI <span>·</span> Generative AI <span>·</span> Web Engineering</p>
              <p className="hero-intro">Turning complex problems into thoughtful digital experiences.</p>
            </div>
            <div className="hero-actions">
              <Magnetic><a href="#projects" className="button button-solid">Explore selected work <ArrowUpRight size={16} /></a></Magnetic>
              <Magnetic><a href="#contact" className="text-link">Let&apos;s talk <ArrowUpRight size={15} /></a></Magnetic>
            </div>
          </div>
          <StudioSeal />
          <div className="portrait-caption micro"><span className="crosshair">+</span> A human perspective.<br />An engineering mindset.</div>
          <div className="hero-bottom micro"><a href="#about" className="scroll-link"><ArrowDown size={15} /> Scroll to discover</a><span>{profile.location} <span className="accent">/</span> {profile.timezone}</span></div>
        </section>
        <section id="about" tabIndex={-1} className="content-section page-width">
          <p className="section-label"><span>01 / About</span><span>The person behind the work</span></p>
          <div className="editorial-column">
            <RevealHeading>Curiosity is the start.<br /><span className="accent">Engineering is how<br />I take it further.</span></RevealHeading>
            <div className="about-body"><span className="large-asterisk" aria-hidden="true">✳</span><div>
              <p className="lead">I&apos;m Sravan, a developer with a Computer Science Engineering background and a fascination with what technology can make possible.</p>
              <p>My practice spans software development, modern web experiences, and applied AI. I enjoy connecting the pieces: a clear interface, a dependable system, and the intelligence that makes it useful.</p>
              <p>From computer vision and language research to full-stack products, I learn by building — and by asking better questions along the way.</p>
            </div></div>
            <div className="practice-strip"><span>Think deeply.</span><span>Build thoughtfully.</span><span>Keep learning.</span></div>
          </div>
        </section>
        <section id="journey" tabIndex={-1} className="content-section page-width">
          <p className="section-label"><span>02 / Journey</span><span>A practice in progress</span></p>
          <div className="editorial-column"><RevealHeading>From foundations<br />to <span className="accent">possibilities.</span></RevealHeading><Journey /></div>
        </section>
        <ProjectGallery />
        <section id="skills" tabIndex={-1} className="content-section page-width">
          <p className="section-label"><span>04 / Capabilities</span><span>Connected by curiosity</span></p>
          <div className="editorial-column"><RevealHeading>A toolkit.<br /><span className="accent">An interconnected mindset.</span></RevealHeading><p className="section-intro">Different tools. One purpose: bringing an idea into the world with clarity and care.</p><SkillsConstellation /></div>
        </section>
        <Contact />
      </main>
      <footer className="page-width footer"><a className="footer-wordmark" href="#hero" aria-label="Sravan, back to top">SG<span>© 2026 {profile.name}</span></a><span className="micro">Built with intention.</span><a href="#hero" className="text-link micro">Back to top <ArrowUpRight size={15} /></a></footer>
    </PortfolioEnvironment>
  );
}
