"use client";

import { useRef, useCallback, useEffect } from "react";

/**
 * 3D tilt effect that follows the mouse cursor.
 * Applies perspective rotateX/Y to the element.
 * Returns ref to attach and mouse handlers.
 */
export function useTiltEffect(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice.current) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * maxTilt * 2; // -maxTilt to +maxTilt
      const rotateX = (0.5 - y) * maxTilt * 2;

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update spotlight position
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(88,99,242,0.08), transparent 40%)`;
        spotlightRef.current.style.opacity = "1";
      }
    },
    [maxTilt],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    el.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";

    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 600);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "";
  }, []);

  return { ref, spotlightRef, handleMouseMove, handleMouseLeave, handleMouseEnter };
}
