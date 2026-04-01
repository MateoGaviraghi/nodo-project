"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  highlightWord?: string;
}

export default function TextReveal({
  text,
  className = "",
  highlightWord,
}: TextRevealProps) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => {
        const cleanWord = word.replace(/\*/g, "");
        const isHighlighted = highlightWord
          ? cleanWord.toLowerCase() === highlightWord.toLowerCase()
          : word.startsWith("*") && word.endsWith("*");

        return (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.4,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`mr-[0.25em] inline-block ${
              isHighlighted ? "gradient-text" : ""
            }`}
          >
            {cleanWord}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
