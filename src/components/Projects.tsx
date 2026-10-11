import { useState } from "react";
import { motion } from "motion/react";
import { PROJECT_FILTERS, projects, type ProjectFilter } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="section-wrap section-block">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="section-index">[ 02 / SELECTED WORK ]</span>
            <h2 id="projects-heading">
              Ideas into
              <br />
              <em>interfaces.</em>
            </h2>
          </div>
          <p className="section-aside">
            Projects are proof of curiosity. Here&apos;s what I&apos;m
            building, learning, and exploring.
          </p>
        </motion.div>

        <div className="project-toolbar">
          <span className="micro-label" role="status" aria-live="polite">
            {String(visible.length).padStart(2, "0")} PROJECTS
            {filter !== "All" ? ` / ${filter.toUpperCase()}` : " / ALL"}
          </span>
          <div className="filter-list" role="group" aria-label="Filter projects by category">
            {PROJECT_FILTERS.map((category) => (
              <button
                key={category}
                type="button"
                className={filter === category ? "filter-chip active" : "filter-chip"}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid">
          {visible.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
