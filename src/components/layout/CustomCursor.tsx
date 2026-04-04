"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isPointerDevice = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false,
  );
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    },
    [isVisible],
  );

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  // Hide default cursor when pointer device is detected
  useEffect(() => {
    if (isPointerDevice) {
      document.body.classList.add("cursor-hide-default");
    }
    return () => document.body.classList.remove("cursor-hide-default");
  }, [isPointerDevice]);

  useEffect(() => {
    if (!isPointerDevice) return;

    // Track hover state on interactive elements
    const handleOverInteractive = () => setIsHovering(true);
    const handleOutInteractive = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor-hover]",
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleOverInteractive);
      el.addEventListener("mouseleave", handleOutInteractive);
    });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleOverInteractive);
        el.removeEventListener("mouseleave", handleOutInteractive);
      });
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isPointerDevice, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Spring-like animation loop
  useEffect(() => {
    if (!isPointerDevice) return;

    const animate = () => {
      const cursor = cursorRef.current;
      const dot = dotRef.current;
      if (!cursor || !dot) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Spring follow (outer ring)
      const dx = posRef.current.x - currentRef.current.x;
      const dy = posRef.current.y - currentRef.current.y;
      currentRef.current.x += dx * 0.15;
      currentRef.current.y += dy * 0.15;

      cursor.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`;
      // Dot follows mouse directly
      dot.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPointerDevice]);

  // Re-scan interactive elements on DOM changes
  useEffect(() => {
    if (!isPointerDevice) return;

    const observer = new MutationObserver(() => {
      const handleOverInteractive = () => setIsHovering(true);
      const handleOutInteractive = () => setIsHovering(false);

      document
        .querySelectorAll(
          "a, button, [role='button'], input, textarea, select, [data-cursor-hover]",
        )
        .forEach((el) => {
          el.removeEventListener("mouseenter", handleOverInteractive);
          el.removeEventListener("mouseleave", handleOutInteractive);
          el.addEventListener("mouseenter", handleOverInteractive);
          el.addEventListener("mouseleave", handleOutInteractive);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isPointerDevice]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={(el) => {
          (cursorRef as React.MutableRefObject<HTMLDivElement | null>).current =
            el;
          if (el)
            el.style.setProperty("--cursor-opacity", isVisible ? "1" : "0");
        }}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-9999 mix-blend-difference"
      >
        <div
          className={`rounded-full border border-nodo-white/80 transition-all duration-300 ease-out ${
            isHovering ? "cursor-ring-hover" : "cursor-ring"
          }`}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={(el) => {
          (dotRef as React.MutableRefObject<HTMLDivElement | null>).current =
            el;
          if (el)
            el.style.setProperty("--cursor-opacity", isVisible ? "1" : "0");
        }}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-9999 mix-blend-difference"
      >
        <div
          className={`rounded-full bg-nodo-white transition-all duration-200 ease-out ${
            isHovering ? "cursor-dot-hover" : "cursor-dot"
          }`}
        />
      </div>
    </>
  );
}
