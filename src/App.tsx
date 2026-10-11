import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("sg-theme");
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("sg-theme", theme);
  }, [theme ]);

  return (
    <div className={`site-shell ${theme === "light" ? "light-theme" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Journey />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
