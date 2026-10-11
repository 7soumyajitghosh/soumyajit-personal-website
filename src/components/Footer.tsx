import { ArrowUp, Github, Mail } from "lucide-react";
import { site } from "../data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="footer section-wrap" aria-label="Footer">
      <a
        href="#home"
        className="footer-brand"
        aria-label="SG Soumyajit Ghosh · Developer & AI Builder"
      >
        <span className="brand-mark" aria-hidden="true">
          {site.wordmark}
        </span>{" "}
        <span>
          {site.name.toUpperCase()} · {site.headline.toUpperCase()}
        </span>
      </a>
      <span className="footer-center">© {year} {site.name.toUpperCase()}</span>
      <div className="footer-links">
        <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
          <Github size={16} aria-hidden="true" />
        </a>
        <a href={`mailto:${site.email}`} aria-label="Email Soumyajit">
          <Mail size={16} aria-hidden="true" />
        </a>
        <button
          type="button"
          className="footer-top"
          onClick={toTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={16} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
