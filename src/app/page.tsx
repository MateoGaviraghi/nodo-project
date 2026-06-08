"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Code, Cpu, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import HeroSection from "@/components/hero/HeroSection";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import TiltCard from "@/components/ui/TiltCard";
import ScrollCounter from "@/components/ui/ScrollCounter";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import ThreeDCarousel from "@/components/ui/ThreeDCarousel";
import BorderBeam from "@/components/ui/BorderBeam";
import GridPattern from "@/components/ui/GridPattern";
import { getPublishedProjects } from "@/lib/projects";
// Testimonials section is hidden until we accumulate 10+ real opinions via /api/feedback.
// Re-enable by importing DepthMarquee + testimonials and restoring the <TESTIMONIALS> section.

const NetworkSphere = dynamic(() => import("@/components/three/NetworkSphere"), {
  ssr: false,
  loading: () => <div className="h-[400px] sm:h-[700px]" />,
});

const serviceIcons = [Code, Cpu] as const;

export default function HomePage() {
  const { t, language: lang } = useLanguage();
  const services = [t.services.dev, t.services.ia];
  const catLabel: Record<string, string> = {
    dev: t.projects.cat_dev,
    wordpress: t.projects.cat_wordpress,
    ia: t.projects.cat_ia,
    ecommerce: t.projects.cat_ecommerce,
    uiux: t.projects.cat_uiux,
    maintenance: t.projects.cat_maintenance,
  };
  const carouselItems = getPublishedProjects()
    .map((p) => ({
      src: p.thumbnail.src,
      alt: p.thumbnail.alt[lang],
      href: `/proyectos/${p.slug}`,
      title: p.title,
      category: catLabel[p.category] ?? "",
    }))
    .filter(
      (it): it is { src: string; alt: string; href: string; title: string; category: string } =>
        Boolean(it.src),
    );
  // CSS scroll-driven animations via IntersectionObserver
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <HeroSection />

      {/* ═══ SERVICES ═══ */}
      <section className="relative py-16 sm:py-36">
        <div className="section-line" />
        <div className="mx-auto max-w-6xl px-6 pt-10 sm:pt-16 lg:px-8">
          <div className="mb-10 sm:mb-16 text-center">
            <p data-reveal className="reveal-el mb-4 label-mono text-nodo-cyan">Servicios</p>
            <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl" style={{ transitionDelay: "80ms" }}>{t.services.title}</h2>
            <p data-reveal className="reveal-el mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/70" style={{ transitionDelay: "160ms" }}>{t.services.subtitle}</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-5">
            {services.map((service, i) => {
              const Icon = serviceIcons[i];
              const feature = i === 0;
              return (
                <div
                  key={i}
                  data-reveal
                  className={`reveal-3d ${feature ? "lg:col-span-3" : "lg:col-span-2"}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <TiltCard className={`relative h-full overflow-hidden ${feature ? "p-7 sm:p-10" : "p-6 sm:p-8"}`}>
                    <GridPattern className="opacity-50" size={30} />
                    <div className="relative z-10 flex h-full flex-col">
                      <div
                        className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[6px]"
                        style={{ background: "linear-gradient(135deg, rgba(88,99,242,0.14), rgba(39,133,254,0.08))" }}
                      >
                        <Icon className="h-5 w-5 text-nodo-white/80" />
                      </div>
                      <p className="mb-4 label-mono text-white/40">0{i + 1}</p>
                      <h3 className={`mb-3 font-semibold text-nodo-white ${feature ? "text-2xl sm:text-[1.7rem]" : "text-lg"}`}>
                        {service.title}
                      </h3>
                      <p className="max-w-prose text-[14px] leading-relaxed text-white/70">{service.description}</p>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>

          <div data-reveal className="reveal-el mt-10 flex justify-center sm:mt-14" style={{ transitionDelay: "320ms" }}>
            <GradientButton href="/servicios">
              <span className="flex items-center gap-2">
                {t.services.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </GradientButton>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative py-14 sm:py-20">
        <div className="section-line" />
        <div className="mx-auto max-w-5xl px-6 pt-8 sm:pt-12 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-12">
            {[
              { target: 20, label: t.stats.projects },
              { target: 15, label: t.stats.clients },
              { target: 5, label: t.stats.experience },
            ].map((stat, i) => (
              <div key={i} data-reveal className="reveal-scale relative text-center" style={{ transitionDelay: `${i * 120}ms` }}>
                {i === 1 && (
                  <>
                    <div className="absolute top-1/2 left-0 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-nodo-indigo/20 to-transparent sm:block" />
                    <div className="absolute top-1/2 right-0 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-nodo-indigo/20 to-transparent sm:block" />
                  </>
                )}
                <div className="text-3xl font-bold tracking-tight sm:text-6xl">
                  <span className="gradient-text">
                    <ScrollCounter target={stat.target} suffix="+" />
                  </span>
                </div>
                <p className="mt-3 text-[13px] font-medium tracking-wide text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NETWORK SPHERE ═══ */}
      <section className="relative py-14 sm:py-28">
        <div className="section-line" />
        <div className="mx-auto max-w-5xl px-6 pt-8 sm:pt-12 lg:px-8">
          <div className="mb-6 text-center">
            <p data-reveal className="reveal-el mb-4 label-mono text-nodo-cyan">Nuestro ecosistema</p>
            <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>
              Cada tecnología, un <span className="gradient-text">nodo</span>
            </h2>
            <p data-reveal className="reveal-el mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-white/70" style={{ transitionDelay: "160ms" }}>
              Dominamos las herramientas más potentes del mercado. Las conectamos entre sí para construir exactamente lo que tu proyecto necesita.
            </p>
          </div>
          <NetworkSphere />
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="relative py-16 sm:py-36">
        <div className="section-line" />
        <div className="mx-auto max-w-6xl px-6 pt-10 sm:pt-16 lg:px-8">
          <div className="mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p data-reveal className="reveal-el mb-4 label-mono text-nodo-cyan">Portfolio</p>
              <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>{t.projects.title}</h2>
              <p data-reveal className="reveal-el mt-3 max-w-sm text-[14px] leading-relaxed text-white/70" style={{ transitionDelay: "160ms" }}>{t.projects.subtitle}</p>
            </div>
            <div data-reveal className="reveal-el" style={{ transitionDelay: "200ms" }}>
              <GhostButton href="/proyectos" className="hidden sm:inline-flex">
                <span className="flex items-center gap-2">
                  {t.projects.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </GhostButton>
            </div>
          </div>

          {/* Flagship: scroll-rotating 3D project carousel — click navigates to the case study */}
          {carouselItems.length >= 3 && (
            <div className="mb-12 sm:mb-16">
              <ThreeDCarousel items={carouselItems} />
            </div>
          )}

          <div data-reveal className="reveal-el mt-8 text-center sm:hidden">
            <GhostButton href="/proyectos">
              <span className="flex items-center gap-2">
                {t.projects.cta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </GhostButton>
          </div>
        </div>
      </section>

      {/* ═══ FEEDBACK ═══ (replaces Testimonials until we have 10+ real opinions) */}
      <section className="relative py-16 sm:py-28">
        <div className="section-line" />
        <div className="mx-auto max-w-5xl px-6 pt-10 sm:pt-16 lg:px-8">
          <div className="mb-10 sm:mb-14 text-center">
            <p data-reveal className="reveal-el mb-4 label-mono text-nodo-cyan">
              {t.feedback.eyebrow}
            </p>
            <h2
              data-reveal
              className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl"
              style={{ transitionDelay: "80ms" }}
            >
              {t.feedback.title}
            </h2>
            <p
              data-reveal
              className="reveal-el mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/70"
              style={{ transitionDelay: "160ms" }}
            >
              {t.feedback.subtitle}
            </p>
          </div>

          <div data-reveal className="reveal-3d" style={{ transitionDelay: "240ms" }}>
            <div className="relative overflow-hidden rounded-[16px] border border-white/[0.06] bg-[rgba(20,20,36,0.35)] p-5 backdrop-blur-md sm:p-7">
              <BorderBeam duration={12} />
              <div className="relative">
                <FeedbackForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-16 sm:py-36">
        <div className="section-line" />
        <div className="mx-auto max-w-5xl px-6 pt-10 sm:pt-16 lg:px-8">
          <div
            data-reveal
            className="reveal-el relative overflow-hidden rounded-[16px] border border-white/[0.07] bg-[rgba(20,20,36,0.5)] px-6 py-16 text-center backdrop-blur-xl sm:px-12 sm:py-24"
          >
            <GridPattern />
            <BorderBeam duration={9} />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full opacity-30 blur-[110px]"
              style={{ background: "radial-gradient(ellipse, #5863f2, transparent 70%)" }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-h2 text-white">{t.cta.title}</h2>
              <p className="mx-auto mb-10 mt-5 max-w-md text-[15px] leading-relaxed text-white/70">{t.cta.subtitle}</p>
              <GradientButton href="/contacto" magnetic className="w-full sm:w-auto">{t.cta.button}</GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
