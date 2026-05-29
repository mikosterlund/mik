import { useEffect, useRef } from "react";
import type { RainAmbience } from "@/lib/types";

/**
 * Subtle cinematic rain ambience.
 *
 * Renders faint angled streaks on an overlay canvas with two parallax
 * layers, very low alpha, and a thin "glass" wash. Tuned to feel like
 * late-night rain seen through a penthouse window — present, never
 * distracting.
 *
 * Performance:
 *   - DPR capped at 1.5
 *   - Drop count scales with viewport area and intensity
 *   - rAF paused when tab hidden or `prefers-reduced-motion` is set
 *   - pointer-events: none, position: fixed (no layout cost)
 */
export function RainAmbience({ intensity }: { intensity: RainAmbience }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (intensity === "off") return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (reduced?.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;

    type Drop = {
      x: number;
      y: number;
      len: number;
      speed: number;
      layer: 0 | 1; // 0 = far (thin, slow), 1 = near (slightly bolder)
      alpha: number;
    };
    let drops: Drop[] = [];

    const density = intensity === "medium" ? 0.00009 : 0.00005; // drops per px²
    const angle = 0.18; // slight wind

    const seed = () => {
      const target = Math.round(width * height * density);
      drops = new Array(target).fill(0).map(() => makeDrop(true));
    };

    const makeDrop = (initial: boolean): Drop => {
      const layer: 0 | 1 = Math.random() < 0.65 ? 0 : 1;
      const farSpeed = 1.1 + Math.random() * 0.7;
      const nearSpeed = 1.8 + Math.random() * 1.0;
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -20 - Math.random() * 40,
        len: layer === 0 ? 8 + Math.random() * 8 : 12 + Math.random() * 14,
        speed: layer === 0 ? farSpeed : nearSpeed,
        layer,
        alpha:
          layer === 0
            ? 0.05 + Math.random() * 0.05
            : 0.08 + Math.random() * 0.06,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();

    let resizeT: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeT) clearTimeout(resizeT);
      resizeT = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    let running = true;
    let raf = 0;
    let last = performance.now();

    const draw = (t: number) => {
      const dt = Math.min(48, t - last); // clamp delta to avoid jumps
      last = t;
      const step = dt / 16.6;

      // Soft fade rather than full clear → preserves a faint "glass" wash
      // without trailing artifacts. Multiply step so it stays stable at
      // variable frame rates.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${Math.min(0.45, 0.28 * step)})`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      ctx.lineCap = "round";

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.x += angle * d.speed * step;
        d.y += d.speed * 4 * step;

        if (d.y - d.len > height || d.x > width + 20) {
          drops[i] = makeDrop(false);
          continue;
        }

        // Cool moonlit tone, tinted toward the dashboard's cyan/purple glow.
        const hue = d.layer === 0 ? 220 : 270;
        ctx.strokeStyle = `hsla(${hue}, 60%, 88%, ${d.alpha})`;
        ctx.lineWidth = d.layer === 0 ? 0.6 : 0.9;

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - angle * d.len, d.y - d.len);
        ctx.stroke();
      }

      if (running) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (resizeT) clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      ctx.clearRect(0, 0, width, height);
    };
  }, [intensity]);

  if (intensity === "off") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ opacity: intensity === "medium" ? 0.55 : 0.32 }}
      />
      {/* faint vertical glass wash to suggest condensation */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.85 0.05 230 / 0.015) 0%, transparent 35%, transparent 65%, oklch(0.7 0.08 270 / 0.02) 100%)",
        }}
      />
    </div>
  );
}
