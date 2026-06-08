"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import ScrollIndicator from "./ScrollIndicator";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      data-hero
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* ── Content (MeshBackground from layout handles ambient color) ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-6 text-left lg:px-8"
      >
        {/* Brand eyebrow — Nodo wordmark in the display face */}
        <motion.p
          variants={item}
          className="mb-6 flex items-center gap-3 font-display text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold tracking-[0.01em] text-nodo-white/90"
        >
          <span className="h-px w-9 bg-gradient-to-r from-nodo-purple to-nodo-cyan" />
          Nodo
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mb-6 max-w-[16ch] text-[clamp(2.4rem,6vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.04em] text-nodo-white"
        >
          {t.hero.headline.split(" ").map((word, i) => {
            const clean = word.replace(/\*/g, "");
            const highlighted = word.includes("*");
            return (
              <span
                key={i}
                className={`inline-block ${i > 0 ? "ml-[0.28em]" : ""} ${
                  highlighted ? "gradient-text" : ""
                }`}
              >
                {clean}
              </span>
            );
          })}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mb-10 max-w-md text-[clamp(0.95rem,0.5vw+0.85rem,1.1rem)] leading-relaxed text-nodo-gray-300"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <GradientButton href="/contacto" magnetic className="w-full sm:w-auto">
            {t.hero.cta_primary}
          </GradientButton>
          <GhostButton href="/servicios" className="w-full sm:w-auto">
            {t.hero.cta_secondary}
          </GhostButton>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator (positions itself absolute, own fade-in) ── */}
      <ScrollIndicator visible />
    </section>
  );
}
