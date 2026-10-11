import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { profileFacts } from "../data/skills";

export default function About() {
  return (
    <section className="section-wrap section-block" id="about" aria-labelledby="about-heading">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <div>
          <span className="section-index">[ 01 / ABOUT ME ]</span>
          <h2 id="about-heading">
            A little about
            <br />
            <em>the builder.</em>
          </h2>
        </div>
        <p className="section-aside">
          A curious mind, a growing toolkit, and a long list of things I want
          to build.
        </p>
      </motion.div>

      <div className="about-grid">
        <div className="about-copy">
          <span className="micro-label">WHO I AM</span>
          <h3>
            Developer exploring
            <br />
            AI &amp; the web.
          </h3>
          <p>
            I&apos;m Soumyajit — I like building things with code and
            experimenting with AI to make interfaces that feel helpful and
            alive.
          </p>
          <p>
            <strong>What I build:</strong> chat experiences, small web apps,
            and creative prototypes. <strong>What I love:</strong> AI,
            software development, and learning how technology works by making
            it.
          </p>
          <div className="about-facts">
            {profileFacts.map((fact) => (
              <div key={fact.title}>
                <span className="fact-symbol" aria-hidden="true">
                  {fact.symbol}
                </span>
                <span>
                  <strong>{fact.title}</strong>
                  <small>{fact.note}</small>
                </span>
              </div>
            ))}
          </div>
          <a className="text-link" href="#journey">
            Follow the journey <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="about-panel" aria-label="Editable profile facts">
          <h3 className="about-panel-title">Profile facts · editable</h3>
          <dl className="about-panel-list">
            <div>
              <dt>Focus</dt>
              <dd>AI experiences &amp; web apps</dd>
            </div>
            <div>
              <dt>Learning</dt>
              <dd>TypeScript, React, AI APIs</dd>
            </div>
            <div>
              <dt>Style</dt>
              <dd>Build, test, iterate in public</dd>
            </div>
            <div>
              <dt>Open to</dt>
              <dd>Ideas, feedback &amp; collaboration</dd>
            </div>
          </dl>
          <p className="about-panel-note">
            Edit these in <code>src/data/skills.ts</code>. No degrees, jobs,
            or awards are claimed here.
          </p>
        </div>
      </div>
    </section>
  );
}
