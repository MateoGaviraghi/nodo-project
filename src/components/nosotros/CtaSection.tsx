"use client";

import { useLanguage } from "@/hooks/useLanguage";
import GradientButton from "@/components/ui/GradientButton";

export default function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-36">
      <div className="section-line" />
      <div className="mx-auto max-w-5xl px-6 pt-10 sm:pt-16 lg:px-8">
        <div className="text-center">
          <h2
            data-reveal
            className="reveal-el mb-5 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl"
          >
            {t.cta.title}
          </h2>
          <p
            data-reveal
            className="reveal-el mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-white/70"
            style={{ transitionDelay: "80ms" }}
          >
            {t.cta.subtitle}
          </p>
          <div data-reveal className="reveal-el" style={{ transitionDelay: "160ms" }}>
            <GradientButton href="/contacto" className="w-full sm:w-auto">
              {t.cta.button}
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
}
