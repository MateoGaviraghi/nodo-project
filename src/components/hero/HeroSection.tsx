"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import ScrollIndicator from "./ScrollIndicator";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="mb-5 text-[clamp(1.75rem,5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em]"
        >
          {t.hero.headline.split(" ").map((word, i) => {
            const clean = word.replace(/\*/g, "");
            const highlighted = word.startsWith("*") && word.endsWith("*");
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

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mb-9 max-w-md text-[15px] leading-relaxed text-nodo-gray-400"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex items-center gap-3"
        >
          <GradientButton href="/contacto">
            {t.hero.cta_primary}
          </GradientButton>
          <GhostButton href="/servicios">
            {t.hero.cta_secondary}
          </GhostButton>
        </motion.div>
      </div>

      <ScrollIndicator visible />
    </section>
  );
}
