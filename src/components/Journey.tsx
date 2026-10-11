import { motion } from "motion/react";
import { journey } from "../data/journey";

export default function Journey() {
  return (
    <section className="journey-section" id="journey" aria-labelledby="journey-heading">
      <div className="section-wrap section-block">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="section-index">[ 03 / THE JOURNEY ]</span>
            <h2 id="journey-heading">
              Progress over
              <br />
              <em>perfection.</em>
            </h2>
          </div>
          <p className="section-aside">
            A snapshot of the path — intentionally honest, always evolving.
          </p>
        </motion.div>

        <ol className="timeline">
          {journey.map((item, index) => (
            <motion.li
              key={item.id}
              className="timeline-item"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <span className="timeline-date">{item.date}</span>
              <span className="timeline-node" aria-hidden="true" />
              <div className="timeline-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
