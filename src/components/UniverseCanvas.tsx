import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  phase: number;
  tint: string;
};

/**
 * Lightweight canvas universe: drifting stars, ambient glow, orbital paths,
 * and subtle pointer parallax. Respects prefers-reduced-motion and cleans up
 * all listeners / animation frames on unmount.
 */
export default function UniverseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const stars: Star[] = [];
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;
    let running = true;

    // Fixed palette — no runtime accent switching.
    const TINTS = [
      "rgba(226,232,255,0.65)",
      "rgba(226,232,255,0.45)",
      "rgba(255,122,26,0.7)",
      "rgba(255,176,32,0.75)",
      "rgba(255,196,107,0.65)",
    ];
    const glowStops = ["rgba(255,122,26,0.13)", "rgba(255,122,26,0.06)", "rgba(255,176,32,0.03)"];
    const pointerGlow = "255,176,32";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      const count = Math.min(130, Math.max(40, Math.floor((width * height) / 12000)));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.4,
          speed: Math.random() * 0.16 + 0.03,
          phase: Math.random() * Math.PI * 2,
          tint: TINTS[i % TINTS.length],
        });
      }
      drawStatic();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      paintGlow(0, 0);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.tint;
        ctx.fill();
      }
      paintOrbits();
    };

    const paintGlow = (px: number, py: number) => {
      const g = ctx.createRadialGradient(
        width * 0.7, height * 0.35, 0,
        width * 0.7, height * 0.35, Math.max(width, height) * 0.7,
      );
      g.addColorStop(0, glowStops[0]);
      g.addColorStop(0.45, glowStops[1]);
      g.addColorStop(0.7, glowStops[2]);
      g.addColorStop(1, "rgba(5,7,15,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      if (px > -500 && !reducedRef.current) {
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 160);
        pg.addColorStop(0, `rgba(${pointerGlow},0.07)`);
        pg.addColorStop(1, `rgba(${pointerGlow},0)`);
        ctx.fillStyle = pg;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const paintOrbits = () => {
      ctx.save();
      ctx.translate(width * 0.5, height * 0.5);
      ctx.strokeStyle = "rgba(148,163,255,0.10)";
      ctx.lineWidth = 1;
      for (const [rx, ry, rot] of [
        [190, 190, -0.4],
        [260, 120, 0.6],
        [150, 240, 0.9],
      ] as const) {
        ctx.save();
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.min(rx, width * 0.45), Math.min(ry, height * 0.45), 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    };

    const draw = () => {
      if (!running) return;
      frame++;
      // Ease pointer for smooth parallax.
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ctx.clearRect(0, 0, width, height);
      paintGlow(pointer.x, pointer.y);
      paintOrbits();

      const driftX = reducedRef.current ? 0 : (pointer.x - width / 2) * 0.008;
      const driftY = reducedRef.current ? 0 : (pointer.y - height / 2) * 0.008;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!reducedRef.current) {
          s.y -= s.speed;
          s.x += Math.sin(frame * 0.004 + s.phase) * 0.12;
          if (s.y < -4) {
            s.y = height + 4;
            s.x = Math.random() * width;
          }
        }
        const twinkle = reducedRef.current ? 0 : Math.sin(frame * 0.02 + s.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x + driftX * (s.radius), s.y + driftY * (s.radius), Math.max(0.3, s.radius + twinkle), 0, Math.PI * 2);
        ctx.fillStyle = s.tint;
        ctx.fill();
      }

      // Faint constellation lines near pointer (desktop delight, cheap).
      if (!reducedRef.current && pointer.tx > -500) {
        for (const s of stars) {
          const dx = s.x - pointer.x;
          const dy = s.y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(${pointerGlow},${((1 - d / 130) * 0.16).toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      if (!reducedRef.current) {
        raf = window.requestAnimationFrame(draw);
      }
    };

    const start = () => {
      window.cancelAnimationFrame(raf);
      if (reducedRef.current) {
        drawStatic();
      } else {
        running = true;
        raf = window.requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (reducedRef.current) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
        drawStatic();
      }
    };
    const onPointerLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
      if (reducedRef.current) drawStatic();
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(raf);
      } else {
        running = true;
        start();
      }
    };

    // Only animate while the hero is visible.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !reducedRef.current) {
          running = true;
          window.cancelAnimationFrame(raf);
          raf = window.requestAnimationFrame(draw);
        } else if (!visible) {
          running = false;
          window.cancelAnimationFrame(raf);
        } else if (reducedRef.current) {
          drawStatic();
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    start();

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-paint once when the user toggles reduced-motion mid-session.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) canvas.dispatchEvent(new Event("resize"));
  }, [reduced]);

  return <canvas ref={canvasRef} className="universe-canvas" aria-hidden="true" />;
}
