"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Code, Globe, Cpu, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import HeroSection from "@/components/hero/HeroSection";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import TiltCard from "@/components/ui/TiltCard";
import ScrollCounter from "@/components/ui/ScrollCounter";
import DepthMarquee from "@/components/ui/DepthMarquee";
import { projects } from "@/lib/projects";
import { testimonials } from "@/lib/testimonials";

const NetworkSphere = dynamic(() => import("@/components/three/NetworkSphere"), {
  ssr: false,
  loading: () => <div className="h-[600px] sm:h-[700px]" />,
});

const serviceIcons = [Code, Globe, Cpu] as const;

export default function HomePage() {
  const { t } = useLanguage();
  const services = [t.services.dev, t.services.wordpress, t.services.ia];

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
      <section className="relative py-28 sm:py-36">
        <div className="section-line" />
        <div className="mx-auto max-w-6xl px-6 pt-16 lg:px-8">
          <div className="mb-16 text-center">
            <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">Servicios</p>
            <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl" style={{ transitionDelay: "80ms" }}>{t.services.title}</h2>
            <p data-reveal className="reveal-el mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/70" style={{ transitionDelay: "160ms" }}>{t.services.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[i];
              return (
                <div key={i} data-reveal className="reveal-3d" style={{ transitionDelay: `${i * 150}ms` }}>
                  <TiltCard className="h-full p-8">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[4px]" style={{ background: "linear-gradient(135deg, rgba(88,99,242,0.12), rgba(39,133,254,0.08))" }}>
                      <Icon className="h-5 w-5 text-nodo-white/80" />
                    </div>
                    <p className="mb-4 text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">0{i + 1}</p>
                    <h3 className="mb-3 text-lg font-semibold text-nodo-white">{service.title}</h3>
                    <p className="text-[14px] leading-relaxed text-white/70">{service.description}</p>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative py-20">
        <div className="section-line" />
        <div className="mx-auto max-w-5xl px-6 pt-12 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
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
                <div className="text-5xl font-bold tracking-tight sm:text-6xl">
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
      <section className="relative py-20 sm:py-28">
        <div className="section-line" />
        <div className="mx-auto max-w-5xl px-6 pt-12 lg:px-8">
          <div className="mb-6 text-center">
            <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">Nuestro ecosistema</p>
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
      <section className="relative py-28 sm:py-36">
        <div className="section-line" />
        <div className="mx-auto max-w-6xl px-6 pt-16 lg:px-8">
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">Portfolio</p>
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

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.slice(0, 4).map((project, idx) => (
              <div key={project.id} data-reveal className={idx % 2 === 0 ? "reveal-left" : "reveal-right"} style={{ transitionDelay: `${idx * 120}ms` }}>
                <TiltCard className="h-full">
                  <div
                    className="relative flex h-48 items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(${135 + idx * 25}deg, ${
                        ["rgba(139,47,239,0.15)", "rgba(0,193,244,0.15)", "rgba(39,133,254,0.15)", "rgba(88,99,242,0.15)"][idx]
                      }, rgba(10,10,10,0.8) 70%)`,
                    }}
                  >
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                    <span className="text-6xl font-extralight tracking-tighter text-white/[0.06] transition-all duration-500 group-hover:text-white/[0.12] group-hover:scale-110">
                      {project.title.charAt(0)}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,1)] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="rounded-[2px] bg-nodo-indigo/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-nodo-indigo">{project.category}</span>
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-nodo-white">{project.title}</h3>
                    <p className="mb-5 text-[13px] leading-relaxed text-white/70">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-[2px] border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[11px] text-white/70">{tag}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

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

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="relative overflow-hidden py-20">
        <div className="section-line" />
        <div className="pt-12">
          <div className="mb-12 text-center px-6">
            <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">Testimonios</p>
            <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>{t.testimonials.title}</h2>
          </div>

          <div data-reveal className="reveal-el" style={{ transitionDelay: "150ms" }}>
            <DepthMarquee speed={0.4}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-80 max-w-[22rem] shrink-0 rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] p-7 transition-colors duration-300 hover:border-nodo-indigo/20 sm:min-w-[22rem]"
                >
                  <span className="mb-4 block text-2xl leading-none gradient-text">&ldquo;</span>
                  <p className="mb-6 text-[13px] leading-relaxed text-nodo-gray-300">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-nodo-indigo/20 to-nodo-purple/20 text-[12px] font-semibold text-nodo-white/70">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-nodo-white">{testimonial.author}</p>
                      <p className="text-[11px] text-white/70">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </DepthMarquee>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-28 sm:py-36">
        <div className="section-line" />
        <div className="mx-auto max-w-5xl px-6 pt-16 lg:px-8">
          <div className="text-center">
            <h2 data-reveal className="reveal-el mb-5 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">{t.cta.title}</h2>
            <p data-reveal className="reveal-el mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-white/70" style={{ transitionDelay: "80ms" }}>{t.cta.subtitle}</p>
            <div data-reveal className="reveal-el" style={{ transitionDelay: "160ms" }}>
              <GradientButton href="/contacto">{t.cta.button}</GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
