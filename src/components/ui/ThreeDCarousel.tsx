"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * Scroll-pinned 3D cylinder carousel. A tall wrapper provides scroll
 * distance; a sticky stage keeps the cylinder centered while you scroll,
 * turning it one full revolution (slow, project by project) before the page
 * continues. Clicking a face navigates to that project. Native CSS sticky +
 * rAF (no GSAP pin) — robust with Lenis, never locks the scroll.
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
    const tick = () => {
      const rect = w.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const scrollable = Math.max(1, w.offsetHeight - vh);
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      rotation.set(p * 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, reduced, rotation]);

  const go = (href: string) => router.push(href);

  const stage = (
    <div
      className="relative flex h-[240px] w-full items-center justify-center sm:h-[440px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative flex h-full origin-center justify-center"
        style={{ transform, width: cylinderWidth, transformStyle: "preserve-3d" }}
      >
        {items.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
          >
            <motion.img
              src={item.src}
              alt={item.alt}
              role="link"
              tabIndex={0}
              aria-label={item.alt}
              draggable={false}
              onClick={() => go(item.href)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  go(item.href);
                }
              }}
              className="aspect-[16/10] w-full cursor-pointer rounded-[10px] border border-white/[0.08] object-cover shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)] outline-none transition-[border-color,box-shadow] duration-300 hover:border-nodo-cyan/50 hover:shadow-[0_18px_60px_-10px_rgba(0,193,244,0.28)] focus-visible:border-nodo-cyan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  if (!mounted) {
    return <div ref={wrapperRef} className="relative h-[300px] w-full sm:h-[480px]" aria-hidden />;
  }

  // Reduced motion: static stage, no pin, no rotation.
  if (reduced) {
    return (
      <div className="relative flex justify-center" style={{ perspective: "1100px" }}>
        {stage}
      </div>
    );
  }

  const tallHeight = `${100 + (faceCount - 1) * 42}vh`;

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
