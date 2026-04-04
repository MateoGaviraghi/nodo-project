"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  accent = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-[3px] border border-white/[0.06] bg-[rgba(26,26,46,0.5)] p-6 backdrop-blur-md transition-all duration-300 ${
        hover
          ? "cursor-pointer hover:border-nodo-blue/20 hover:shadow-[0_4px_24px_rgba(39,133,254,0.08)]"
          : ""
      } ${className}`}
    >
      {/* Top accent gradient line */}
      {accent && (
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nodo-blue/40 to-transparent" />
      )}
      {children}
    </motion.div>
  );
}
