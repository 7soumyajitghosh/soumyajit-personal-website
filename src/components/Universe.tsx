import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  phase: number;
};

export default function Universe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles: Particle[] = [];
    const pointer = { x: -1000, y: -1000 };
    let frame = 0;
    let width = 0;
    let height = 0;
    let animation = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.length = 0;
      const count = Math.min(100, Math.max(38, Math.floor((width * height) / 14500)));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.4,
          speed: Math.random() * 0.18 + 0.04,
          phase: Math.random() * Math.PI * 2,
        });
      }
      draw();
    };

    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(width * 0.72, height * 0.38, 0, width * 0.72, height * 0.38, Math.max(width, height) * 0.68);
      glow.addColorStop(0, "rgba(144, 113, 255, 0.11)");
      glow.addColorStop(0.55, "rgba(108, 255, 160, 0.035)");
      glow.addColorStop(1, "rgba(9, 11, 16, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      particles.forEach((p, i) => {
        if (!reduceMotion) {
          p.y -= p.speed;
          p.x += Math.sin(frame * 0.004 + p.phase) * 0.12;
          if (p.y < -4) {
            p.y = height + 4;
            p.x = Math.random() * width;
          }
        }
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 145) {
          context.beginPath();
          context.moveTo(p.x, p.y);
          context.lineTo(pointer.x, pointer.y);
          context.strokeStyle = `rgba(167, 243, 107, ${(1 - distance / 145) * 0.17})`;
          context.lineWidth = 0.7;
          context.stroke();
        }
        context.beginPath();
        context.arc(p.x, p.y, p.radius + (Math.sin(frame * 0.015 + p.phase) + 1) * 0.25, 0, Math.PI * 2);
        context.fillStyle = i % 5 === 0 ? "rgba(167,243,107,0.75)" : "rgba(222,226,240,0.5)";
        context.fill();
      });
      frame++;
      if (!reduceMotion) animation = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (reduceMotion) draw();
    };
    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
      if (reduceMotion) draw();
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.cancelAnimationFrame(animation);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="universe-canvas" aria-hidden="true" />;
}