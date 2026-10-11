import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Code2, Orbit } from "lucide-react";
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
      aria-label={`Placeholder portrait for ${site.name} — add your photo at public/images/profile.jpg`}
    >
      <span className="profile-photo-initials" aria-hidden="true">
        SG
      </span>
      <span className="profile-photo-note">ADD PHOTO AT /images/profile.jpg</span>
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
            <a className="button button-primary" href="#experiments">
              Explore My Universe
            </a>
            <a className="button button-quiet" href="#projects">
              View My Projects
            </a>
          </div>
          <p className="hero-footnote">
            <span className="footnote-star" aria-hidden="true">
              ✳
            </span>{" "}
            Curious by nature. Building one idea at a time.
          </p>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        >
          <div className="visual-label visual-label-top">
            <Orbit size={13} aria-hidden="true" /> DIGITAL UNIVERSE{" "}
            <span>001</span>
          </div>
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="orbit orbit-three" aria-hidden="true" />
          <div className="hero-portrait-ring" aria-hidden="true" />
          <div className="hero-portrait">
            <ProfilePhoto />
          </div>
          <div className="visual-card" aria-hidden="true">
            <div className="visual-card-icon">
              <Code2 size={17} />
            </div>
            <div>
              <span>STATUS / 01</span>
              <strong>Curiosity → Creation</strong>
            </div>
            <span className="visual-card-dot" />
          </div>
          <div className="visual-label visual-label-bottom">
            EXPLORING WHAT&apos;S POSSIBLE <span>↗</span>
          </div>
        </motion.div>
      </div>
      <div className="hero-bottom" aria-hidden="true">
        <span>
          SCROLL TO EXPLORE <ArrowDown size={13} />
        </span>
        <span className="hero-bottom-center">
          DESIGNING · BUILDING · LEARNING
        </span>
        <span>BASED IN {site.location.toUpperCase()}</span>
      </div>
    </section>
  );
}
