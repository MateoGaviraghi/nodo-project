"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export default function SectionTitle({
  children,
  className = "",
  as = "h2",
}: SectionTitleProps) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 40% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`text-3xl font-medium tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}
