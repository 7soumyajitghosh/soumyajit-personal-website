import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** Demo 1 — interactive particle field with density + speed controls. */
function ParticleDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(70);
  const [speed, setSpeed] = useState(1);
  const reduced = useReducedMotion();
  const settings = useRef({ count, speed });
  settings.current = { count, speed };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;
    let w = 0;
    let h = 0;
    const pts = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.3 + Math.random() * 0.9,
      r: 0.6 + Math.random() * 1.6,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const readAccent = () => {
      const shell = document.querySelector(".site-shell");
      const cyan = shell
        ? getComputedStyle(shell).getPropertyValue("--cyan").trim()
        : "";
      return cyan || "#67d1ff";
    };
    const hexToRgba = (hex: string, alpha: number) => {
      const h = hex.replace("#", "");
      const full =
        h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
      if (full.length !== 6) return `rgba(103,209,255,${alpha})`;
      const r = parseInt(full.slice(0, 2), 16);
      const g = parseInt(full.slice(2, 4), 16);
      const b = parseInt(full.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };
    const draw = () => {
      t += 0.016 * settings.current.speed;
      ctx.clearRect(0, 0, w, h);
      const n = settings.current.count;
      const accent = readAccent();
      const accentFill = hexToRgba(accent, 0.85);
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        const y = ((p.y - t * 0.03 * p.v) % 1 + 1) % 1;
        const x = (p.x + Math.sin(t + i) * 0.008 + 1) % 1;
        ctx.beginPath();
        ctx.arc(x * w, y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 4 === 0 ? accentFill : "rgba(196,205,235,0.55)";
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <div className="lab-card">
      <h3>Particle universe</h3>
      <p>Density and drift speed are live — move the sliders and watch the field respond.</p>
      <canvas ref={canvasRef} className="lab-canvas" aria-label="Interactive particle field demo" role="img" />
      <div className="lab-controls">
        <label>
          Particles: <strong>{count}</strong>
          <input type="range" min={20} max={140} step={5} value={count} onChange={(e) => setCount(Number(e.target.value))} aria-label="Particle count" />
        </label>
        <label>
          Speed: <strong>{speed.toFixed(1)}×</strong>
          <input type="range" min={0.2} max={3} step={0.2} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} aria-label="Particle speed" />
        </label>
      </div>
    </div>
  );
}

/** Demo 2 — pointer-tracked glow that follows the cursor / touch. */
function GlowDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const move = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)),
    });
  };

  return (
    <div className="lab-card">
      <h3>Mouse-responsive glow</h3>
      <p>Move your pointer (or drag a finger) across the panel — the glow follows you.</p>
      <div
        ref={ref}
        className={`lab-glow ${active ? "is-active" : ""}`}
        style={{ "--gx": `${pos.x}%`, "--gy": `${pos.y}%` } as CSSProperties}
        onPointerMove={(e) => {
          move(e.clientX, e.clientY);
          setActive(true);
        }}
        onPointerLeave={() => setActive(false)}
        tabIndex={0}
        role="group"
        aria-label="Glow panel. Use arrow keys to move the glow."
        onKeyDown={(e) => {
          const step = 6;
          if (e.key === "ArrowLeft") setPos((p) => ({ ...p, x: Math.max(0, p.x - step) }));
          if (e.key === "ArrowRight") setPos((p) => ({ ...p, x: Math.min(100, p.x + step) }));
          if (e.key === "ArrowUp") setPos((p) => ({ ...p, y: Math.max(0, p.y - step) }));
          if (e.key === "ArrowDown") setPos((p) => ({ ...p, y: Math.min(100, p.y + step) }));
          setActive(true);
        }}
      >
        <span className="lab-glow-core" aria-hidden="true" />
        <span className="lab-glow-readout" aria-live="polite">
          x {Math.round(pos.x)} · y {Math.round(pos.y)}
        </span>
      </div>
      <div className="lab-controls">
        <button type="button" className="button button-quiet button-sm" onClick={() => { setPos({ x: 50, y: 50 }); setActive(false); }}>
          Reset glow
        </button>
      </div>
    </div>
  );
}

/** Demo 3 — orbital visualization with playable speed + trails. */
function OrbitDemo() {
  const [speed, setSpeed] = useState(1);
  const [trails, setTrails] = useState(true);
  const [t, setT] = useState(0.6);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setT((v) => (v + dt * 0.5 * speed) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, speed]);

  const bodies = [
    { r: 34, size: 10, color: "var(--cyan)", offset: 0 },
    { r: 56, size: 7, color: "var(--violet)", offset: 0.35 },
    { r: 78, size: 5, color: "var(--accent)", offset: 0.65 },
  ];

  return (
    <div className="lab-card">
      <h3>Animated orbital visualization</h3>
      <p>A tiny solar system. Change the speed, toggle trails, or pause the motion.</p>
      <div className="lab-orbit" role="img" aria-label={`Orbital demo with three bodies at ${(t * 360).toFixed(0)} degrees`}>
        <span className="lab-sun" aria-hidden="true" />
        {[34, 56, 78].map((r) => (
          <span key={r} className="lab-ring" style={{ width: r * 2, height: r * 2 }} aria-hidden="true" />
        ))}
        {bodies.map((b) => {
          const a = (t + b.offset) * Math.PI * 2;
          return (
            <span
              key={b.color}
              className={`lab-body ${trails ? "" : "no-trail"}`}
              style={{
                width: b.size,
                height: b.size,
                background: b.color,
                boxShadow: `0 0 12px ${b.color}`,
                transform: `translate(${Math.cos(a) * b.r}px, ${Math.sin(a) * b.r}px)`,
              }}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <div className="lab-controls lab-controls-row">
        <label>
          Speed <strong>{speed.toFixed(1)}×</strong>
          <input type="range" min={0} max={3} step={0.2} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} aria-label="Orbit speed" />
        </label>
        <button type="button" className="button button-quiet button-sm" onClick={() => setTrails((v) => !v)} aria-pressed={trails}>
          {trails ? "Hide trails" : "Show trails"}
        </button>
      </div>
    </div>
  );
}

/** Demo 4 — honest interactive UI experiment: a working gradient mixer. */
function MixerDemo() {
  const [hueA, setHueA] = useState(217);
  const [hueB, setHueB] = useState(265);
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);
  const css = `linear-gradient(${angle}deg, hsl(${hueA} 85% 62%), hsl(${hueB} 85% 65%))`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`background: ${css};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="lab-card">
      <h3>Gradient mixer</h3>
      <p>A real control, not a prop — design a gradient and copy the CSS.</p>
      <div className="lab-swatch" style={{ background: css }} role="img" aria-label={`Gradient preview from hue ${hueA} to hue ${hueB} at ${angle} degrees`} />
      <div className="lab-controls">
        <label>
          Hue A <strong>{hueA}°</strong>
          <input type="range" min={0} max={360} value={hueA} onChange={(e) => setHueA(Number(e.target.value))} aria-label="First hue" />
        </label>
        <label>
          Hue B <strong>{hueB}°</strong>
          <input type="range" min={0} max={360} value={hueB} onChange={(e) => setHueB(Number(e.target.value))} aria-label="Second hue" />
        </label>
        <label>
          Angle <strong>{angle}°</strong>
          <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} aria-label="Gradient angle" />
        </label>
      </div>
      <div className="lab-controls lab-controls-row">
        <code className="lab-code">{css}</code>
        <button type="button" className="button button-primary button-sm" onClick={copy} aria-live="polite">
          {copied ? "Copied ✓" : "Copy CSS"}
        </button>
      </div>
    </div>
  );
}

export default function Experiments() {
  return (
    <section className="section-wrap section-block" id="experiments" aria-labelledby="experiments-heading">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <div>
          <span className="section-index">[ 04 / EXPERIMENTS LAB ]</span>
          <h2 id="experiments-heading">
            Small demos,
            <br />
            <em>real interactions.</em>
          </h2>
        </div>
        <p className="section-aside">
          Every control below does something. Play with them — that&apos;s the point.
        </p>
      </motion.div>
      <div className="lab-grid">
        <ParticleDemo />
        <GlowDemo />
        <OrbitDemo />
        <MixerDemo />
      </div>
    </section>
  );
}
