"use client";

import React, { useEffect, useRef } from "react";

export type AnimatedOrbProps = {
  /** Hue in degrees (0-360) */
  hue?: number;
  /** Diameter in pixels; responsive parent may override via CSS */
  size?: number;
  /** Base opacity (0-1). PRD: ultra-transparent base ~0.12 */
  baseOpacity?: number;
  /** Hover intensity multiplier (fixed at 0.41 per PRD) */
  hoverIntensity?: number;
  /** Additional className for container */
  className?: string;
};

/**
 * AnimatedOrb
 * Canvas-based watercolor-like orb with subtle flow/distortion and mouse reactive offset.
 * Designed as a lightweight fallback approximating the PRD while keeping 60fps on most devices.
 */
export const AnimatedOrb: React.FC<AnimatedOrbProps> = ({
  hue = 220,
  size = 400,
  baseOpacity = 0.12,
  hoverIntensity = 0.41,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, over: false });
  const tRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = size;
    let height = size;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      width = size;
      height = size;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      tRef.current += 0.008; // subtle flow
      const t = tRef.current;

      ctx.clearRect(0, 0, width, height);

      // Soft background ring
      ctx.save();
      const ringGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.48
      );
      ringGradient.addColorStop(0, `hsla(${hue}, 90%, 55%, ${baseOpacity * 0.25})`);
      ringGradient.addColorStop(1, `hsla(${hue}, 90%, 55%, 0)`);
      ctx.fillStyle = ringGradient;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.48, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Watercolor-like core using multiple layered gradients with slight offsets
      const hover = pointerRef.current.over ? hoverIntensity : 1;
      const offset = (n: number) => {
        const amp = 8 * hover;
        return {
          x:
            Math.sin(t * (0.7 + n * 0.2)) * amp +
            (pointerRef.current.x - width / 2) * 0.02,
          y:
            Math.cos(t * (0.6 + n * 0.15)) * amp +
            (pointerRef.current.y - height / 2) * 0.02,
        };
      };

      const layers = 5;
      for (let i = 0; i < layers; i++) {
        const o = offset(i);
        const r = Math.min(width, height) * (0.34 + i * 0.03);
        const g = ctx.createRadialGradient(
          width / 2 + o.x,
          height / 2 + o.y,
          r * 0.1,
          width / 2 + o.x,
          height / 2 + o.y,
          r
        );
        const alpha = baseOpacity * (0.85 - i * 0.12);
        g.addColorStop(0, `hsla(${hue}, 85%, 60%, ${alpha * 1.0})`);
        g.addColorStop(1, `hsla(${hue}, 85%, 60%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(width / 2 + o.x, height / 2 + o.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
      pointerRef.current.over = true;
    };
    const onLeave = () => {
      pointerRef.current.over = false;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hue, size, baseOpacity, hoverIntensity]);

  return (
    <div
      className={[
        "relative select-none", // subtle outer shadow ring
        className || "",
      ].join(" ")}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default AnimatedOrb;


