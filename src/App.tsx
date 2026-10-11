import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Experiments from "./components/Experiments";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("sg-theme");
    return saved === "light" ? "light" : "dark";
  });
  const [accent, setAccent] = useState<string>(() => {
    if (typeof window === "undefined") return "orange";
    const saved = window.localStorage.getItem("sg-accent");
    return saved === "blue" ||
      saved === "orange" ||
      saved === "emerald" ||
      saved === "pink" ||
      saved === "mono"
      ? saved
      : "orange";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("sg-theme", theme);
  }, [theme ]);

  useEffect(() => {
    window.localStorage.setItem("sg-accent", accent);
  }, [accent ]);

  return (
    <div
      className={`site-shell ${theme === "light" ? "light-theme" : ""}`}
      data-accent={accent}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        accent={accent}
        onAccentChange={setAccent}
      />
      <main id="main">
        <Hero />
        <div className="intro-strip">
          <div className="section-wrap intro-inner">
            <span className="section-index">[ MINDSET ]</span>
            <p>
              Not just learning how things work.
              <br />
              <span>Learning how to make things that matter.</span>
            </p>
          </div>
        </div>
        <About />
        <Projects />
        <Journey />
        <Experiments />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
