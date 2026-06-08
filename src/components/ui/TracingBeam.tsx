"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A vertical beam that "draws" itself down the left edge as you scroll through
 * its content — the Nodo "connection thread". A glowing dot rides the leading
 * edge. Scroll-listener + getBoundingClientRect (no framer useScroll), so it
 * stays in sync with Lenis. Desktop only (the line is hidden on mobile).
 *
 * Wrap a vertical content column; give the column left padding so the beam sits
 * in the gutter.
 */
export default function TracingBeam({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fill = fillRef.current;
    const dot = dotRef.current;
    if (!el || !fill) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const anchor = vh * 0.42;
      const denom = Math.max(1, rect.height - vh * 0.5);
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / denom));
      fill.style.transform = `scaleY(${p})`;
      if (dot) dot.style.top = `${p * 100}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div aria-hidden className="absolute left-0 top-0 hidden h-full w-px bg-white/[0.07] lg:block">
        <div
          ref={fillRef}
          className="h-full w-full origin-top bg-gradient-to-b from-nodo-cyan via-nodo-indigo to-nodo-purple"
          style={{ transform: "scaleY(0)" }}
        />
        <div
          ref={dotRef}
          className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nodo-cyan shadow-[0_0_14px_2px_rgba(0,193,244,0.7)]"
          style={{ top: "0%" }}
        />
      </div>
      {children}
    </div>
  );
}
