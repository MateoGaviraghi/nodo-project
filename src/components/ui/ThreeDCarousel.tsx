"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * Scroll-driven 3D cylinder carousel. As the section passes through the
 * viewport the cylinder rotates; clicking a face navigates to that project.
 * Client-only (geometry depends on viewport) to avoid hydration drift.
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isSm ? 1100 : 1900;
  const faceCount = Math.max(items.length, 1);
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  // The cylinder turns as the section scrolls through the viewport.
  // Manual rAF + getBoundingClientRect — robust with Lenis smooth scroll
  // (framer useScroll doesn't track reliably under Lenis).
  const rotation = useMotionValue(-15);
  const transform = useTransform(rotation, (v) => `rotate3d(0, 1, 0, ${v}deg)`);

  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rotation.set(20);
      return;
    }
    let raf = 0;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const total = vh + rect.height;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / total));
      rotation.set(-15 + p * 270);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, rotation]);

  const go = (href: string) => router.push(href);

  if (!mounted) {
    return <div ref={containerRef} className="relative h-[260px] w-full sm:h-[440px]" aria-hidden />;
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[260px] w-full sm:h-[440px]"
      style={{ perspective: "1100px" }}
    >
      <div className="flex h-full items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
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
                initial={{ filter: "blur(4px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
