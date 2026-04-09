"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function NosotrosHero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden pb-8 pt-28 sm:pb-12 sm:pt-40">
      {/* Background gradient orbs */}
      <div className="nosotros-orb-purple pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]" />
      <div className="nosotros-orb-blue pointer-events-none absolute right-0 top-0 h-100 w-100 rounded-full opacity-[0.05]" />
      <div className="nosotros-orb-cyan pointer-events-none absolute bottom-0 left-0 h-75 w-75 rounded-full opacity-[0.04]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        {/* Eyebrow */}
        <p
          data-reveal
          className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
        >
          Nosotros
        </p>

        {/* Main headline — aligned with Servicios */}
        <h1
          data-reveal
          className="reveal-el mb-6 text-4xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-5xl lg:text-6xl"
          style={{ transitionDelay: "80ms" }}
        >
          {t.about.page_title}
        </h1>

        {/* Subtitle */}
        <p
          data-reveal
          className="reveal-el mx-auto mb-10 max-w-2xl text-[16px] leading-relaxed text-white/80"
          style={{ transitionDelay: "200ms" }}
        >
          {t.about.page_subtitle}
        </p>

        {/* Divider under hero, matching Servicios style */}
        <div
          data-reveal
          className="reveal-el mx-auto mt-6 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-nodo-indigo/30 to-transparent"
          style={{ transitionDelay: "260ms" }}
        />
      </div>
    </section>
  );
}
