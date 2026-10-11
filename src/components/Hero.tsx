import { useState } from "react";
import { motion } from "motion/react";
import UniverseCanvas from "./UniverseCanvas";
import { site } from "../data/site";
import { useReducedMotion } from "../hooks/useReducedMotion";

function ProfilePhoto() {
  // Tries the real photo first; falls back to a polished SG placeholder
  // when public/images/profile.jpg is missing. Replace that file to go live.
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img
        src={site.profileImage}
        alt={`Portrait of ${site.name}`}
        className="profile-photo"
        loading="eager"
        fetchPriority="high"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div
      className="profile-photo-fallback"
      role="img"
      aria-label={`Portrait of ${site.name}`}
    >
      <span className="profile-photo-initials" aria-hidden="true">
        SG
      </span>
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero section-wrap" id="home" aria-labelledby="hero-heading">
      <UniverseCanvas />
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            WELCOME TO MY DIGITAL UNIVERSE
          </p>
          <h1 id="hero-heading">
            Soumyajit
            <br />
            <span>
              Ghosh<span className="accent-dot">.</span>
            </span>
          </h1>
          <p className="hero-role">
            <span className="role-line" aria-hidden="true" /> Developer{" "}
            <span className="role-plus" aria-hidden="true">
              +
            </span>{" "}
            AI Builder
          </p>
          <p className="hero-description">
            I build <strong>AI-powered experiences</strong> and explore how
            technology can feel useful, human, and a little magical — one
            experiment at a time.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View My Projects
            </a>
            <a className="button button-quiet" href="#contact">
              Get in Touch
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        >
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="orbit orbit-three" aria-hidden="true" />
          <div className="hero-portrait-ring" aria-hidden="true" />
          <div className="hero-portrait">
            <ProfilePhoto />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
