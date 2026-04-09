"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function NosotrosHero() {
  const { t } = useLanguage();

  return (
    <section className="relative pb-8 pt-28 sm:pb-12 sm:pt-40">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
          Nosotros
        </p>
        <h1
          data-reveal
          className="reveal-el text-4xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-5xl lg:text-6xl"
          style={{ transitionDelay: "80ms" }}
        >
          {t.about.page_title}
        </h1>
        <p
          data-reveal
          className="reveal-el mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white/80"
          style={{ transitionDelay: "160ms" }}
        >
          {t.about.page_subtitle}
        </p>
      </div>
    </section>
  );
}
