"use client";

import { useRef, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
  ease?: number;
}

export function useMagneticEffect(options: MagneticOptions = {}) {
  const { strength = 0.3 } = options;
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
