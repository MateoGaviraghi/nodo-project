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
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* ── Content (MeshBackground from layout handles ambient color) ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        {/* Brand eyebrow */}
        <motion.p
          variants={item}
          className="mb-8 text-[clamp(0.95rem,1.6vw,1.15rem)] font-semibold tracking-[0.42em] uppercase gradient-text"
        >
          Nodo
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mb-6 max-w-3xl text-[clamp(1.9rem,5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-nodo-white"
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
          className="mb-10 max-w-md text-[15px] leading-relaxed text-nodo-gray-300"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex w-full flex-col items-center gap-3 px-4 sm:w-auto sm:flex-row sm:px-0"
        >
          <GradientButton href="/contacto" className="w-full sm:w-auto">
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
