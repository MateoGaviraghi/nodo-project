"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Card with a cursor-following radial spotlight (Aceternity / Magic UI style),
 * rethemed to Nodo. Zero-dependency (framer-motion only). The glow inherits the
 * service accent via the `accent` prop ("r, g, b").
 */
export default function SpotlightCard({
  children,
  className,
  accent = "0, 193, 244",
  radius = 480,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  radius?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  const mx = useMotionValue(-radius);
  const my = useMotionValue(-radius);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, rgba(${accent}, 0.13), transparent 72%)`;

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className={cn(
        "group relative overflow-hidden rounded-[14px] border border-white/[0.07] bg-[rgba(15,15,26,0.72)] transition-colors duration-500 hover:border-white/[0.14]",
        className,
      )}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
}
