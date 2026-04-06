"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Code, Globe, Cpu, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import HeroSection from "@/components/hero/HeroSection";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { projects } from "@/lib/projects";
import { testimonials } from "@/lib/testimonials";

const NetworkSphere = dynamic(() => import("@/components/three/NetworkSphere"), {
  ssr: false,
  loading: () => <div className="h-[500px] sm:h-[600px]" />,
});

/* ── Animation presets ── */
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function revealUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-80px" as const },
    transition: { duration: 0.8, delay, ease },
  };
}

function revealScale(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.7, delay, ease },
  };
}

const serviceIcons = [
  { icon: Code, gradient: "from-nodo-blue to-nodo-cyan" },
  { icon: Globe, gradient: "from-nodo-cyan to-nodo-indigo" },
  { icon: Cpu, gradient: "from-nodo-purple to-nodo-indigo" },
] as const;

/* ── Gradient line separator ── */
function GradientLine() {
  return (
    <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-nodo-indigo/20 to-transparent" />
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const services = [t.services.dev, t.services.wordpress, t.services.ia];

  return (
    <>
      {/* ─── Hero ─── */}
      <HeroSection />

      {/* ─── Services ─── */}
      <section className="relative py-32 sm:py-40">
        <GradientLine />

        <div className="mx-auto max-w-6xl px-6 pt-20 lg:px-8">
          {/* Section header */}
          <div className="mb-20 text-center">
            <motion.p
              {...revealUp()}
              className="mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            >
              Servicios
            </motion.p>
            <motion.h2
              {...revealUp(0.05)}
              className="text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl"
            >
              {t.services.title}
            </motion.h2>
            <motion.p
              {...revealUp(0.1)}
              className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-nodo-gray-400"
            >
              {t.services.subtitle}
            </motion.p>
          </div>

          {/* Service cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, i) => {
              const { icon: Icon, gradient } = serviceIcons[i];
              return (
                <motion.div
                  key={i}
                  {...revealUp(i * 0.1)}
                  className="group relative overflow-hidden rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] p-8 transition-all duration-500 hover:border-nodo-indigo/30 hover:bg-[rgba(26,26,46,0.6)]"
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(88,99,242,0.08), transparent 70%)" }} />

                  {/* Icon with gradient bg */}
                  <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[4px] bg-gradient-to-br ${gradient} bg-opacity-10`} style={{ background: `linear-gradient(135deg, rgba(88,99,242,0.12), rgba(39,133,254,0.08))` }}>
                    <Icon className="h-5 w-5 text-nodo-white/80" />
                  </div>

                  {/* Number */}
                  <p className="mb-4 text-[11px] font-medium tracking-[0.2em] text-nodo-gray-600 uppercase">
                    0{i + 1}
                  </p>

                  <h3 className="mb-3 text-lg font-semibold text-nodo-white">
                    {service.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-nodo-gray-400">
                    {service.description}
                  </p>

                  {/* Bottom gradient line on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan transition-all duration-500 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="relative py-24">
        <GradientLine />

        <div className="mx-auto max-w-5xl px-6 pt-16 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {[
              { target: 20, label: t.stats.projects },
              { target: 15, label: t.stats.clients },
              { target: 5, label: t.stats.experience },
            ].map((stat, i) => (
              <motion.div
                key={i}
                {...revealScale(i * 0.1)}
                className="relative text-center"
              >
                {/* Vertical separators */}
                {i === 1 && (
                  <>
                    <div className="absolute top-1/2 left-0 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-nodo-indigo/20 to-transparent sm:block" />
                    <div className="absolute top-1/2 right-0 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-nodo-indigo/20 to-transparent sm:block" />
                  </>
                )}
                <div className="text-5xl font-bold tracking-tight sm:text-6xl">
                  <span className="gradient-text">
                    <AnimatedCounter target={stat.target} />+
                  </span>
                </div>
                <p className="mt-3 text-[13px] font-medium tracking-wide text-nodo-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Network Sphere — 3D Interactive ─── */}
      <section className="relative py-24 sm:py-32">
        <GradientLine />

        <div className="mx-auto max-w-5xl px-6 pt-16 lg:px-8">
          <motion.div {...revealUp()} className="mb-8 text-center">
            <p className="mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
              Nuestro ecosistema
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl">
              Cada tecnología, un <span className="gradient-text">nodo</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-nodo-gray-400">
              Dominamos las herramientas más potentes del mercado. Las conectamos entre sí para construir exactamente lo que tu proyecto necesita.
            </p>
          </motion.div>

          <motion.div {...revealScale(0.1)}>
            <NetworkSphere />
          </motion.div>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section className="relative py-32 sm:py-40">
        <GradientLine />

        <div className="mx-auto max-w-6xl px-6 pt-20 lg:px-8">
          {/* Header */}
          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <motion.p
                {...revealUp()}
                className="mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
              >
                Portfolio
              </motion.p>
              <motion.h2
                {...revealUp(0.05)}
                className="text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl"
              >
                {t.projects.title}
              </motion.h2>
              <motion.p
                {...revealUp(0.1)}
                className="mt-3 max-w-sm text-[14px] leading-relaxed text-nodo-gray-400"
              >
                {t.projects.subtitle}
              </motion.p>
            </div>
            <motion.div {...revealUp(0.15)}>
              <GhostButton href="/proyectos" className="hidden sm:inline-flex">
                {t.projects.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </GhostButton>
            </motion.div>
          </div>

          {/* Project grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.slice(0, 4).map((project, idx) => (
              <motion.div
                key={project.id}
                {...revealUp(idx * 0.08)}
                className="group relative overflow-hidden rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] transition-all duration-500 hover:border-nodo-indigo/30 hover:-translate-y-1"
              >
                {/* Project gradient banner */}
                <div
                  className="relative flex h-48 items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(${135 + idx * 25}deg, ${
                      [
                        "rgba(139,47,239,0.15)",
                        "rgba(0,193,244,0.15)",
                        "rgba(39,133,254,0.15)",
                        "rgba(88,99,242,0.15)",
                      ][idx]
                    }, rgba(10,10,10,0.8) 70%)`,
                  }}
                >
                  {/* Decorative grid pattern */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                  <span className="text-6xl font-extralight tracking-tighter text-white/[0.06] transition-all duration-500 group-hover:text-white/[0.12] group-hover:scale-110">
                    {project.title.charAt(0)}
                  </span>

                  {/* Hover overlay glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,1)] via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-[2px] bg-nodo-indigo/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-nodo-indigo">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-nodo-white">
                    {project.title}
                  </h3>
                  <p className="mb-5 text-[13px] leading-relaxed text-nodo-gray-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[2px] border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[11px] text-nodo-gray-400 transition-colors duration-300 group-hover:border-nodo-indigo/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom gradient line on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>

          <motion.div {...revealUp(0.2)} className="mt-8 text-center sm:hidden">
            <GhostButton href="/proyectos">
              {t.projects.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </GhostButton>
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="relative overflow-hidden py-24">
        <GradientLine />

        <div className="pt-16">
          {/* Section header */}
          <motion.div {...revealUp()} className="mb-12 text-center px-6">
            <p className="mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
              Testimonios
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl">
              {t.testimonials.title}
            </h2>
          </motion.div>

          {/* Marquee */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-nodo-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-nodo-black to-transparent" />

            <div className="flex animate-marquee gap-6 hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <div
                  key={`${testimonial.id}-${i}`}
                  className="group min-w-80 max-w-[22rem] shrink-0 rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] p-7 transition-all duration-300 hover:border-nodo-indigo/20 sm:min-w-[22rem]"
                >
                  {/* Quote mark */}
                  <span className="mb-4 block text-2xl leading-none gradient-text">&ldquo;</span>

                  <p className="mb-6 text-[13px] leading-relaxed text-nodo-gray-300">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-nodo-indigo/20 to-nodo-purple/20 text-[12px] font-semibold text-nodo-white/70">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-nodo-white">
                        {testimonial.author}
                      </p>
                      <p className="text-[11px] text-nodo-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-32 sm:py-40">
        <GradientLine />

        <div className="mx-auto max-w-5xl px-6 pt-20 lg:px-8">
          <motion.div
            {...revealScale()}
            className="relative overflow-hidden rounded-[8px] border border-white/[0.06] px-8 py-20 text-center sm:px-16 sm:py-28"
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(88,99,242,0.08) 0%, rgba(39,133,254,0.04) 40%, transparent 70%)" }} />

            {/* Top gradient line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-nodo-indigo/40 to-transparent" />

            {/* Animated pulse rings */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[300px] w-[300px] animate-pulse-glow rounded-full border border-nodo-indigo/[0.06]" />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[500px] w-[500px] animate-pulse-glow rounded-full border border-nodo-indigo/[0.03]" style={{ animationDelay: "1.5s" }} />
            </div>

            <div className="relative">
              <h2 className="mb-5 text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl">
                {t.cta.title}
              </h2>
              <p className="mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-nodo-gray-400">
                {t.cta.subtitle}
              </p>
              <GradientButton href="/contacto">{t.cta.button}</GradientButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
