import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { RevealHeading } from "./RevealHeading";
import { ProjectRail } from "./ProjectRail";
import { projects, profile } from "../lib/portfolio";
export function ProjectGallery() {
  return <section id="projects" tabIndex={-1} className="content-section page-width">
    <p className="section-label"><span>03 / Selected work</span><span>Ideas made tangible</span></p>
    <div className="editorial-column"><RevealHeading>Selected<br /><span className="accent">explorations.</span></RevealHeading><p className="section-intro">A selection of products and explorations across web engineering and artificial intelligence.</p></div>
    <ProjectRail count={projects.length}>{projects.map((project, i) => <ProjectCard key={project.index} index={i}>
      <div className="project-topline micro"><span>Project / {project.index}</span><span>{project.tag}</span></div>
      <div className="project-visual"><Image src={project.image} alt={`${project.title} project illustration`} fill sizes="(max-width: 700px) 92vw, 65vw" /><div className="project-image-shade" /><span className="project-visual-number" aria-hidden="true">{project.index}</span><span className="project-visual-label micro">{project.technologies.slice(0, 2).join(" / ")}</span></div>
      <div className="project-details"><h3>{project.title}</h3><div><p>{project.description}</p><p className="project-stack micro">{project.technologies.join(" · ")}</p><div className="project-links">
        {project.liveUrl !== profile.github && <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} website`}>Visit website <ArrowUpRight size={16} /></a>}
        <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.title}: ${project.githubUrl === profile.github ? "visit GitHub profile" : "view source"}`}>{project.githubUrl === profile.github ? "GitHub profile" : "View source"}<ArrowUpRight size={16} /></a>
      </div></div></div>
    </ProjectCard>)}</ProjectRail>
  </section>;
}
