import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card accent-${project.accent}`}>
      <div className="project-art" aria-hidden="true">
        <div className="project-art-grid" />
        <div className="project-orb">
          <span />
          <i />
          <b />
        </div>
        <span className="project-category">{project.category}</span>
        <span className="project-art-arrow">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="project-content">
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <span className="project-status">
            <span aria-hidden="true" />
            {project.status}
          </span>
        </div>
        <p>{project.description}</p>
        <div className="tag-list" aria-label={`Technologies used in ${project.name}`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-links">
          {project.githubUrl ? (
            <a
              className="project-link"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={14} aria-hidden="true" /> Code{" "}
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          ) : (
            <span className="project-link project-link-muted">
              GitHub URL placeholder
            </span>
          )}
          {project.demoUrl ? (
            <a
              className="project-link"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live demo <ExternalLink size={12} aria-hidden="true" />
            </a>
          ) : (
            <span className="project-link project-link-muted">
              Demo URL placeholder
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
