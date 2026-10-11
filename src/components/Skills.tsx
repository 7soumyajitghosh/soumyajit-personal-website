import { motion } from "motion/react";
import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section className="section-wrap section-block" id="skills" aria-labelledby="skills-heading">
      <motion.div
        className="section-heading compact-heading"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <div>
          <span className="section-index">[ 05 / THE TOOLKIT ]</span>
          <h2 id="skills-heading">
            Tools of the
            <br />
            <em>trade.</em>
          </h2>
        </div>
        <p className="section-aside">
          A living toolkit that grows with every build.
        </p>
      </motion.div>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li className="skill-row" key={skill.name}>
            <span className="skill-number" aria-hidden="true">
              0{index + 1}
            </span>
            <strong>{skill.name}</strong>
            <span className="skill-group">{skill.group}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
