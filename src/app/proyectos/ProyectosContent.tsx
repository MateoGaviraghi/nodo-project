"use client";

import { useEffect, useMemo, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getPublishedProjects } from "@/lib/projects";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import ProjectShowcase from "@/components/proyectos/ProjectShowcase";

export default function ProyectosContent() {
  const { t, language: lang } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const all = useMemo(() => getPublishedProjects(), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const showcaseT = {
    featured_cta: t.projects.featured_cta,
    live_link: t.projects.live_link,
    nda_badge: t.projects.nda_badge,
    cat_dev: t.projects.cat_dev,
    cat_wordpress: t.projects.cat_wordpress,
    cat_ia: t.projects.cat_ia,
    cat_ecommerce: t.projects.cat_ecommerce,
    cat_uiux: t.projects.cat_uiux,
    cat_maintenance: t.projects.cat_maintenance,
  };

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pb-6 pt-28 sm:pb-10 sm:pt-40">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p
            data-reveal
            className="reveal-el mb-6 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
          >
            {t.projects.eyebrow}
          </p>

          <h1
            data-reveal
            className="reveal-el text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-nodo-white sm:text-5xl lg:text-6xl"
            style={{ transitionDelay: "80ms" }}
          >
            {t.projects.page_title_pre}
            <br />
            {t.projects.page_title_post}
            <span className="italic gradient-text">{t.projects.page_title_emph}</span>.
          </h1>

          <p
            data-reveal
            className="reveal-el mt-6 max-w-xl text-[16px] leading-relaxed text-white/75"
            style={{ transitionDelay: "160ms" }}
          >
            {t.projects.page_subtitle}
          </p>
        </div>
      </section>

      {/* ─── Alternating showcases ─── */}
      <div className="space-y-2 sm:space-y-4">
        {all.map((project, idx) => (
          <ProjectShowcase
            key={project.slug}
            project={project}
            lang={lang}
            index={idx}
            total={all.length}
            reversed={idx % 2 === 1}
            t={showcaseT}
          />
        ))}
      </div>

      {/* ─── Bottom CTA ─── */}
      <section className="relative pb-24 pt-16 sm:pb-32 sm:pt-24">
        <div className="section-line" />
        <div className="mx-auto max-w-3xl px-6 pt-16 text-center lg:px-8">
          <h2
            data-reveal
            className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl"
          >
            {t.projects.bottom_cta_title}
          </h2>
          <p
            data-reveal
            className="reveal-el mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/75"
            style={{ transitionDelay: "80ms" }}
          >
            {t.projects.bottom_cta_subtitle}
          </p>
          <div
            data-reveal
            className="reveal-el mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ transitionDelay: "160ms" }}
          >
            <GradientButton href="/contacto">
              <span>{t.projects.bottom_cta_primary}</span>
              <ArrowRight className="h-4 w-4" />
            </GradientButton>
            <GhostButton href="/servicios">
              {t.projects.bottom_cta_secondary}
            </GhostButton>
          </div>
        </div>
      </section>
    </>
  );
}
