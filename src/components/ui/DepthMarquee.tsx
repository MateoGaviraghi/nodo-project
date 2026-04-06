"use client";

import { useRef, useEffect, useCallback } from "react";

interface DepthMarqueeProps {
  children: React.ReactNode[];
  speed?: number;
}

export default function DepthMarquee({ children, speed = 0.5 }: DepthMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const track = trackRef.current;
    if (!track || pausedRef.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    offsetRef.current -= speed;
    const halfWidth = track.scrollWidth / 2;
    if (Math.abs(offsetRef.current) >= halfWidth) {
      offsetRef.current += halfWidth;
    }

    track.style.transform = `translateX(${offsetRef.current}px)`;

    // Depth effect: scale + opacity based on distance from center
    const cards = track.children;
    const viewCenter = window.innerWidth / 2;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - viewCenter) / (window.innerWidth / 2);
      const normDist = Math.min(dist, 1);

      const scale = 1.03 - normDist * 0.08;
      const opacity = 1 - normDist * 0.4;

      card.style.transform = `scale(${scale})`;
      card.style.opacity = String(opacity);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [speed]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-nodo-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-nodo-black to-transparent" />

      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform"
        style={{ transform: "translateX(0px)" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
