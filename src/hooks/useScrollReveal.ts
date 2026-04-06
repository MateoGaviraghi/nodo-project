"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger batch reveal.
 * Elements with [data-reveal] inside the container will animate in
 * with stagger when they enter the viewport.
 */
export function useScrollReveal(selector = "[data-reveal]") {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Set initial state
    gsap.set(elements, { opacity: 0, y: 50, filter: "blur(8px)" });

    const triggers = ScrollTrigger.batch(elements, {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.9,
          ease: "expo.out",
          overwrite: true,
        }),
      start: "top 85%",
    });

    return () => {
      if (Array.isArray(triggers)) {
        triggers.forEach((t) => t.kill());
      }
    };
  }, [selector]);

  return containerRef;
}
