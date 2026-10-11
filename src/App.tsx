import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Code2, Github,
  Globe2, Menu, Moon, Sparkles, X, Mail, ExternalLink, Orbit, Terminal,
} from "lucide-react";
import Universe from "./components/Universe";
import { journey, projects, skills } from "./data";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const reduceMotion = useReducedMotion();
  const categories = ["ALL", "AI ASSISTANT", "LEARNING IN PUBLIC", "PLAYGROUND"];
  const visibleProjects = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`site-shell ${theme === "light" ? "light-theme" : ""}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <a href="#home" className="brand" aria-label="Soumyajit Ghosh, home" onClick={closeMenu}>
          <span className="brand-mark">S<span>.</span></span>
          <span className="brand-name">SOUMYAJIT GHOSH</span>
        </a>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {[
            ["About", "#about"],
            ["Projects", "#projects"],
            ["Journey", "#journey"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a href={href} key={label} onClick={closeMenu}>{label}</a>
          ))}
          <a className="nav-cta" href="#projects" onClick={closeMenu}>Explore work <ArrowUpRight size={14} /></a>
        </nav>
        <div className="topbar-actions">
          <button className="icon-button" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title="Toggle theme">
            {theme === "dark" ? <Moon size={17} /> : <Sparkles size={17} />}
          </button>
          <button className="icon-button menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <Universe />
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={reveal}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="eyebrow"><span className="status-dot" /> INDEPENDENTLY BUILDING <span className="eyebrow-line" /></div>
              <p className="hero-kicker">HELLO, WORLD. I'M</p>
              <h1>Soumyajit<br /><span>Ghosh<span className="lime-dot">.</span></span></h1>
              <div className="hero-role"><span className="role-line" /> Developer <span className="role-plus">+</span> AI Builder</div>
              <p className="hero-description">I explore the space where <strong>code, AI, and imagination</strong> meet — turning curious ideas into useful digital experiences.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
                <a className="button button-quiet" href="#about">A little about me <ArrowDownRight size={17} /></a>
              </div>
              <div className="hero-footnote"><span className="footnote-star">✳</span> Curious by nature. Building one idea at a time.</div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            >
              <div className="visual-label visual-label-top"><Orbit size={13} /> DIGITAL UNIVERSE <span>001</span></div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="planet planet-main"><div className="planet-shine" /><div className="planet-ring" /></div>
              <div className="planet planet-small planet-lime" />
              <div className="planet planet-small planet-violet" />
              <div className="planet planet-small planet-blue" />
              <div className="visual-cross cross-one">+</div><div className="visual-cross cross-two">+</div>
              <div className="visual-coordinates">22°34' N<br />88°22' E</div>
              <div className="visual-card">
                <div className="visual-card-icon"><Code2 size={17} /></div>
                <div><span>STATUS / 01</span><strong>Curiosity → Creation</strong></div>
                <span className="visual-card-dot" />
              </div>
              <div className="visual-label visual-label-bottom"><span className="tiny-grid" /> EXPLORING WHAT'S POSSIBLE <span>↗</span></div>
            </motion.div>
          </div>
          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE <ArrowDown size={13} /></span>
            <span className="hero-bottom-center">DESIGNING · BUILDING · LEARNING</span>
            <span>BASED IN INDIA <Globe2 size={13} /></span>
          </div>
        </section>

        <section className="intro-strip">
          <div className="section-wrap intro-inner">
            <span className="section-index">[ 01 / THE MINDSET ]</span>
            <p>Not just learning how things work.<br /><span>Learning how to make things that matter.</span></p>
            <Sparkles className="intro-spark" size={23} />
          </div>
        </section>

        <section className="section-wrap section-block" id="about">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}>
            <div><span className="section-index">[ 02 / ABOUT ME ]</span><h2>A little about<br /><em>the builder.</em></h2></div>
            <p className="section-aside">A curious mind, a growing toolkit, and a long list of things I want to build.</p>
          </motion.div>
          <div className="about-grid">
            <div className="profile-frame">
              <div className="profile-placeholder">
                <div className="profile-placeholder-icon"><span>SG</span><Sparkles size={19} /></div>
                <span className="profile-placeholder-title">YOUR PHOTO GOES HERE</span>
                <span className="profile-placeholder-note">Add your image at <code>public/images/profile.jpg</code></span>
              </div>
              <div className="profile-frame-caption"><span>FIG. 01 — THE HUMAN BEHIND THE CODE</span><span>✳</span></div>
            </div>
            <div className="about-copy">
              <span className="micro-label">A WORK IN PROGRESS — BY DESIGN</span>
              <h3>Building my way<br />into the future.</h3>
              <p>I'm Soumyajit — a developer and AI builder who enjoys exploring technology, learning by doing, and turning ambitious ideas into real projects.</p>
              <p>This space is my evolving digital notebook: the things I'm building, the experiments that surprise me, and the lessons that move me forward.</p>
              <div className="about-facts">
                <div><span className="fact-symbol">↗</span><span><strong>Build-first mindset</strong><small>Learn by making real things</small></span></div>
                <div><span className="fact-symbol">◎</span><span><strong>Always exploring</strong><small>AI, web, and new ideas</small></span></div>
              </div>
              <a className="text-link" href="#journey">Follow the journey <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-wrap section-block">
            <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}>
              <div><span className="section-index">[ 03 / SELECTED WORK ]</span><h2>Ideas into<br /><em>interfaces.</em></h2></div>
              <p className="section-aside">Projects are proof of curiosity. Here's what I'm building, learning, and exploring.</p>
            </motion.div>
            <div className="project-toolbar">
              <span className="micro-label">{String(visibleProjects.length).padStart(2, "0")} PROJECTS / CURRENTLY EXPLORING</span>
              <div className="filter-list" aria-label="Filter projects">
                {categories.map((category) => (
                  <button key={category} type="button" className={filter === category ? "filter-chip active" : "filter-chip"} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category === "LEARNING IN PUBLIC" ? "LEARNING" : category === "AI ASSISTANT" ? "AI" : category === "PLAYGROUND" ? "LAB" : category}</button>
                ))}
              </div>
            </div>
            <div className="project-grid">
              {visibleProjects.map((project, index) => (
                <motion.article key={project.number} className={`project-card accent-${project.accent}`} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay: index * 0.08 }}>
                  <div className="project-art">
                    <div className="project-art-grid" />
                    <div className="project-orb"><span /><i /><b /></div>
                    <span className="project-number">{project.number} / 03</span>
                    <span className="project-category">{project.category}</span>
                    <span className="project-art-arrow"><ArrowUpRight size={18} /></span>
                  </div>
                  <div className="project-content">
                    <div className="project-title-row"><h3>{project.title}</h3><span className="project-status"><span />{project.status}</span></div>
                    <p>{project.description}</p>
                    <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    {project.href ? <a className="project-link" href={project.href} target="_blank" rel="noreferrer">View project <ExternalLink size={14} /></a> : <span className="project-link project-link-muted">Add project URL in <code>src/data.ts</code></span>}
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="projects-note"><span className="note-mark">✳</span><p>Every project starts with a question.<br /><span>The best ones turn into something real.</span></p><span className="note-counter">MORE TO COME ↗</span></div>
          </div>
        </section>

        <section className="section-wrap section-block" id="skills">
          <motion.div className="section-heading compact-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}>
            <div><span className="section-index">[ 04 / THE TOOLKIT ]</span><h2>Tools of the<br /><em>trade.</em></h2></div>
            <p className="section-aside">A living toolkit. This list should grow with experience, not just look impressive.</p>
          </motion.div>
          <div className="skills-layout">
            <div className="skills-intro"><Terminal size={22} /><span>STACK.LOG</span><p>Currently learning, experimenting, and sharpening the fundamentals.</p></div>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div className="skill-row" key={skill.name}><span className="skill-number">0{index + 1}</span><strong>{skill.name}</strong><span className="skill-group">{skill.group}</span><ArrowUpRight size={15} /></div>
              ))}
            </div>
          </div>
        </section>

        <section className="journey-section" id="journey">
          <div className="section-wrap section-block">
            <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}>
              <div><span className="section-index">[ 05 / THE JOURNEY ]</span><h2>Progress over<br /><em>perfection.</em></h2></div>
              <p className="section-aside">A snapshot of the path — intentionally honest, always evolving.</p>
            </motion.div>
            <div className="timeline">
              {journey.map((item, index) => (
                <motion.article key={item.title} className="timeline-item" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: index * 0.08 }}>
                  <span className="timeline-date">{item.date}</span><span className="timeline-node" />
                  <div className="timeline-copy"><h3>{item.title}</h3><p>{item.description}</p></div><span className="timeline-index">0{index + 1}</span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <span className="section-index">[ 06 / YOUR MOVE ]</span>
            <div className="contact-orbit" aria-hidden="true"><div /><span>✳</span></div>
            <h2>Have an idea?<br /><em>Let's make it real.</em></h2>
            <p>I'm always interested in learning, building, and connecting with people who are curious about what's next.</p>
            <a className="button button-primary contact-button" href="mailto:YOUR_EMAIL@example.com">Say hello <Mail size={16} /></a>
            <span className="contact-note">Replace the placeholder email in <code>src/App.tsx</code> before launch.</span>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a href="#home" className="footer-brand"><span className="brand-mark">S<span>.</span></span><span>MADE WITH CURIOSITY.</span></a>
        <span className="footer-center">© {new Date().getFullYear()} SOUMYAJIT GHOSH</span>
        <div className="footer-links">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub (replace with your profile)"><Github size={16} /></a>
          <a href="mailto:YOUR_EMAIL@example.com" aria-label="Email Soumyajit"><Mail size={16} /></a>
          <a href="#home" aria-label="Back to top"><ArrowUpRight size={16} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;