"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

/**
 * MeshBackground — Light trail that follows the mouse.
 * Draws a gradient line with Nodo brand colors (purple → indigo → blue → cyan).
 * Fades out over time. Doesn't render in the navbar zone.
 */
export default function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const NAV_HEIGHT = 80;
    const MAX_POINTS = 80;
    const FADE_SPEED = 0.012;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Only add points below navbar
      if (e.clientY > NAV_HEIGHT) {
        pointsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          age: 0,
        });

        // Keep trail length limited
        if (pointsRef.current.length > MAX_POINTS) {
          pointsRef.current.shift();
        }
      }
    }

    function getTrailColor(t: number, alpha: number): string {
      // Gradient through brand colors based on position in trail
      // purple → indigo → blue → cyan
      if (t < 0.25) {
        const mix = t / 0.25;
        const r = Math.round(139 + (88 - 139) * mix);
        const g = Math.round(47 + (99 - 47) * mix);
        const b = Math.round(239 + (242 - 239) * mix);
        return `rgba(${r},${g},${b},${alpha})`;
      } else if (t < 0.5) {
        const mix = (t - 0.25) / 0.25;
        const r = Math.round(88 + (39 - 88) * mix);
        const g = Math.round(99 + (133 - 99) * mix);
        const b = Math.round(242 + (254 - 242) * mix);
        return `rgba(${r},${g},${b},${alpha})`;
      } else {
        const mix = (t - 0.5) / 0.5;
        const r = Math.round(39 + (0 - 39) * mix);
        const g = Math.round(133 + (193 - 133) * mix);
        const b = Math.round(254 + (244 - 254) * mix);
        return `rgba(${r},${g},${b},${alpha})`;
      }
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;

      // Age all points
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += FADE_SPEED;
        if (points[i].age >= 1) {
          points.splice(i, 1);
        }
      }

      // Draw trail
      if (points.length > 2) {
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];

          const t = i / points.length; // position in trail (0 = tail, 1 = head)
          const alpha = (1 - curr.age) * t * 0.6; // fade with age + position
          const width = t * 2.5 + 0.5; // thinner at tail, thicker at head

          if (alpha <= 0) continue;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = getTrailColor(t, alpha);
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        // Subtle glow at the head of the trail
        if (points.length > 0) {
          const head = points[points.length - 1];
          const headAlpha = (1 - head.age) * 0.15;
          if (headAlpha > 0) {
            const glow = ctx.createRadialGradient(
              head.x, head.y, 0,
              head.x, head.y, 30
            );
            glow.addColorStop(0, `rgba(0,193,244,${headAlpha})`);
            glow.addColorStop(1, "transparent");
            ctx.fillStyle = glow;
            ctx.fillRect(head.x - 30, head.y - 30, 60, 60);
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
