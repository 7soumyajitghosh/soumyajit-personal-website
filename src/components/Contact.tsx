import { useState } from "react";
import { Check, Copy, Github, Mail } from "lucide-react";
import { site } from "../data/site";

export default function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const copyEmail = async () => {
    // Clipboard API requires a secure context; fall back to a selectable
    // field + clear feedback when it is unavailable.
    try {
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(site.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    } finally {
      window.setTimeout(() => setCopyState("idle"), 2200);
    }
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="section-wrap contact-inner">
        <span className="section-index">[ 06 / YOUR MOVE ]</span>
        <div className="contact-orbit" aria-hidden="true">
          <div />
          <span>✳</span>
        </div>
        <h2 id="contact-heading">
          Have an idea?
          <br />
          <em>Let&apos;s make it real.</em>
        </h2>
        <p>
          I&apos;m always interested in learning, building, and connecting
          with people who are curious about what&apos;s next. The fastest way
          to reach me is email — I read everything.
        </p>
        <div className="contact-actions">
          <a className="button button-primary contact-button" href={`mailto:${site.email}`}>
            Say hello <Mail size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="button button-quiet contact-button"
            onClick={copyEmail}
            aria-live="polite"
          >
            {copyState === "copied" ? (
              <>
                Copied ✓ <Check size={16} aria-hidden="true" />
              </>
            ) : (
              <>
                Copy email <Copy size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
        <p className="contact-email" aria-label={`Email address: ${site.email}`}>
          {site.email}
        </p>
        {copyState === "failed" && (
          <p className="contact-feedback" role="status">
            Copy didn&apos;t work in this browser — please select the email
            address above and copy it manually.
          </p>
        )}
        {copyState === "copied" && (
          <p className="contact-feedback contact-feedback-ok" role="status">
            Email copied to your clipboard.
          </p>
        )}
        <div className="contact-socials">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <Github size={16} aria-hidden="true" /> GitHub
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email Soumyajit">
            <Mail size={16} aria-hidden="true" /> Email
          </a>
        </div>
        {/*
          NOTE: no fake contact form is included on purpose.
          To add one, wire it to a backend or a form service
          (e.g. Cloudflare Workers, Formspree) — never claim to
          send messages without one.
        */}
      </div>
    </section>
  );
}
