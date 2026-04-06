"use client";

import { useTiltEffect } from "@/hooks/useTiltEffect";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card with 3D tilt-on-hover, spotlight radial, and animated gradient border.
 * Disables tilt on touch devices automatically.
 */
export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const { ref, spotlightRef, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTiltEffect(8);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`group relative overflow-hidden rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] transition-colors duration-500 hover:border-nodo-indigo/30 hover:bg-[rgba(26,26,46,0.6)] ${className}`}
      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {/* Spotlight overlay */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
      />

      {/* Animated gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[6px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "conic-gradient(from var(--border-angle, 0deg), transparent 40%, rgba(88,99,242,0.3) 50%, transparent 60%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          animation: "rotate-border 3s linear infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-20">{children}</div>

      {/* Bottom gradient line on hover */}
      <div className="absolute bottom-0 left-0 z-20 h-[2px] w-0 bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
