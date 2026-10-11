import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { site } from "../data/site";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Experiments", href: "#experiments" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar({
  theme,
  onToggleTheme,
  accent,
  onAccentChange,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  accent: string;
  onAccentChange: (accent: string) => void;
}) {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on resize to desktop + lock scroll while open.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <header className="topbar">
      <a
        href="#home"
        className="brand"
        aria-label="SG — Soumyajit Ghosh, home"
        onClick={() => setOpen(false)}
      >
        <span className="brand-mark" aria-hidden="true">
          {site.wordmark}
        </span>{" "}
        <span className="brand-name">{site.name.toUpperCase()}</span>
      </a>

      <nav
        className={`nav-links ${open ? "nav-open" : ""}`}
        aria-label="Main navigation"
        id="main-nav"
      >
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          className="nav-cta"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Say hello ↗
        </a>
      </nav>

      <div className="topbar-actions">
        <div
          className="accent-picker"
          role="group"
          aria-label="Choose accent color"
          title="Choose accent color"
        >
          {(
            [
              { id: "blue", label: "Blue (original)" },
              { id: "orange", label: "Orange (recommended)" },
              { id: "emerald", label: "Emerald green" },
              { id: "pink", label: "Pink" },
              { id: "mono", label: "Mono blue" },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              className={`accent-swatch ${accent === s.id ? "active" : ""}`}
              data-swatch={s.id}
              aria-label={s.label}
              title={s.label}
              aria-pressed={accent === s.id}
              onClick={() => onAccentChange(s.id)}
            />
          ))}
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title="Toggle theme"
          aria-pressed={theme === "light"}
        >
          {theme === "dark" ? <Moon size={17} /> : <Sun size={17} />}
        </button>
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}
