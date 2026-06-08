"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * Scroll-pinned 3D cylinder carousel. A tall wrapper provides scroll
 * distance; a sticky stage keeps the cylinder centered while you scroll,
 * dwelling on each project then stepping to the next (smoothstep per
 * segment) before the page continues. Each face shows the project's
 * category + title and navigates to it on click. Native CSS sticky + rAF
 * (no GSAP pin) — robust with Lenis, never locks the scroll.
 */

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState<boolean>(defaultValue);
  useIso(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export interface CarouselItem {
  src: string;
  alt: string;
  href: string;
  title: string;
  category: string;
}

export default function ThreeDCarousel({ items }: { items: CarouselItem[] }) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isSm = useMediaQuery("(max-width: 640px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const cylinderWidth = isSm ? 1100 : 1900;
  const faceCount = Math.max(items.length, 1);
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (v) => `rotate3d(0, 1, 0, ${v}deg)`);

  // Drive rotation from how far we've scrolled through the tall wrapper while
  // the stage is stuck. rAF + getBoundingClientRect = robust with Lenis.
  useEffect(() => {
    if (!mounted || reduced) return;
    const w = wrapperRef.current;
    if (!w) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const rect = w.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const scrollable = Math.max(1, w.offsetHeight - vh);
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      // Dwell on each project, then step to the next (smoothstep per segment).
      const seg = p * faceCount;
      const idx = Math.floor(seg);
      const frac = seg - idx;
      const eased = frac * frac * (3 - 2 * frac);
      rotation.set(-(idx + eased) * (360 / faceCount));
    };
    // Update only on scroll (rAF-throttled) — no continuous reflow when idle.
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted, reduced, faceCount, rotation]);

  const go = (href: string) => router.push(href);

  const stage = (
    <div
      className="relative flex h-[300px] w-full items-center justify-center sm:h-[460px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative flex h-full origin-center justify-center"
        style={{ transform, width: cylinderWidth, transformStyle: "preserve-3d" }}
      >
        {items.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            role="link"
            tabIndex={0}
            aria-label={item.title}
            onClick={() => go(item.href)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                go(item.href);
              }
            }}
            className="group absolute flex h-full origin-center cursor-pointer flex-col items-center justify-center gap-3 p-2 outline-none"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
          >
            <motion.img
              src={item.src}
              alt={item.alt}
              draggable={false}
              className="aspect-[16/10] w-full rounded-[10px] border border-white/[0.08] object-cover shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)] transition-[border-color,box-shadow] duration-300 group-hover:border-nodo-cyan/50 group-hover:shadow-[0_18px_60px_-10px_rgba(0,193,244,0.28)] group-focus-visible:border-nodo-cyan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            />
            <div className="w-full text-center">
              <p className="label-mono text-nodo-cyan">{item.category}</p>
              <h3 className="mt-1 font-display text-[clamp(0.95rem,1.4vw,1.35rem)] font-semibold tracking-[-0.01em] text-nodo-white">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  if (!mounted) {
    return <div ref={wrapperRef} className="relative h-[340px] w-full sm:h-[520px]" aria-hidden />;
  }

  // Reduced motion: static stage, no pin, no rotation.
  if (reduced) {
    return (
      <div className="relative flex justify-center" style={{ perspective: "1100px" }}>
        {stage}
      </div>
    );
  }

  const tallHeight = `${100 + faceCount * 52}vh`;

  return (
    <div ref={wrapperRef} className="relative" style={{ height: tallHeight }}>
      <div
        className="sticky top-0 flex h-screen items-center justify-center overflow-x-clip"
        style={{ perspective: "1100px" }}
      >
        {stage}
      </div>
    </div>
  );
}
