"use client";

import { motion } from "framer-motion";
import { Code, Globe, Cpu, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import HeroSection from "@/components/hero/HeroSection";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects } from "@/lib/projects";
import { testimonials } from "@/lib/testimonials";

/* ── Animation presets ── */
const ease = [0.16, 1, 0.3, 1] as const;

function revealUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.7, delay, ease },
  };
}

const serviceIcons = [
  { icon: Code, color: "text-nodo-blue" },
  { icon: Globe, color: "text-nodo-cyan" },
  { icon: Cpu, color: "text-nodo-purple" },
] as const;

export default function HomePage() {
  const { t } = useLanguage();

  const services = [t.services.dev, t.services.wordpress, t.services.ia];

  return (
    <>
      {/* ─── Hero ─── */}
      <HeroSection />

      {/* ─── Services Preview ─── */}
      <section className="relative py-28 sm:py-36">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionTitle>{t.services.title}</SectionTitle>
            <motion.p
              {...revealUp(0.1)}
              className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-nodo-gray-400"
            >
              {t.services.subtitle}
            </motion.p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service, i) => {
              const { icon: Icon, color } = serviceIcons[i];
              return (
                <motion.div key={i} {...revealUp(i * 0.1)}>
                  <GlassCard className="h-full" accent>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="text-[11px] font-medium tracking-[0.2em] text-nodo-gray-600 uppercase">
                        0{i + 1}
                      </span>
                      <div className="h-px flex-1 bg-white/[0.04]" />
                      <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-nodo-white">
                      {service.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-nodo-gray-400">
                      {service.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Stats Row ─── */}
      <section className="border-y border-white/[0.04] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { target: 20, label: t.stats.projects },
              { target: 15, label: t.stats.clients },
              { target: 5, label: t.stats.experience },
            ].map((stat, i) => (
              <motion.div
                key={i}
                {...revealUp(i * 0.08)}
                className="relative text-center"
              >
                {/* Vertical separators (middle item) */}
                {i === 1 && (
                  <>
                    <div className="absolute top-1/2 left-0 hidden h-12 w-px -translate-y-1/2 bg-white/[0.06] sm:block" />
                    <div className="absolute top-1/2 right-0 hidden h-12 w-px -translate-y-1/2 bg-white/[0.06] sm:block" />
                  </>
                )}
                <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  <span className="gradient-text">
                    <AnimatedCounter target={stat.target} />+
                  </span>
                </div>
                <p className="mt-3 text-[13px] text-nodo-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects Preview ─── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <SectionTitle>{t.projects.title}</SectionTitle>
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

          <div className="grid gap-5 sm:grid-cols-2">
            {projects.slice(0, 4).map((project, idx) => (
              <motion.div key={project.id} {...revealUp(idx * 0.08)}>
                <GlassCard className="group h-full">
                  {/* Project image area */}
                  <div className="relative mb-5 flex h-44 items-center justify-center overflow-hidden rounded-[2px] bg-nodo-gray-900/60">
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        background: `linear-gradient(${135 + idx * 30}deg, ${
                          [
                            "rgba(139,47,239,0.6)",
                            "rgba(0,193,244,0.6)",
                            "rgba(39,133,254,0.6)",
                            "rgba(88,99,242,0.6)",
                          ][idx]
                        }, transparent 60%)`,
                      }}
                    />
                    <span className="select-none text-5xl font-extralight tracking-tighter text-white/[0.06]">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-[2px] bg-nodo-blue/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-nodo-blue">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-nodo-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-[13px] leading-relaxed text-nodo-gray-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[2px] border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[11px] text-nodo-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <GhostButton href="/proyectos">
              {t.projects.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </GhostButton>
          </div>
        </div>
      </section>

      {/* ─── Testimonials Marquee ─── */}
      <section className="overflow-hidden border-y border-white/[0.04] py-20">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-nodo-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-nodo-black to-transparent" />

          <div className="flex animate-marquee gap-6 hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div
                key={`${testimonial.id}-${i}`}
                className="min-w-80 max-w-[22rem] shrink-0 rounded-[3px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] p-6 sm:min-w-[22rem]"
              >
                <p className="mb-5 text-[13px] leading-relaxed text-nodo-gray-300 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nodo-gray-900/80 text-[11px] font-medium text-nodo-gray-400">
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
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...revealUp()}
            className="relative overflow-hidden rounded-[4px] border border-white/[0.06] bg-[rgba(26,26,46,0.3)] px-6 py-16 text-center sm:px-12 sm:py-24"
          >
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nodo-indigo/30 to-transparent" />

            {/* Background glow */}
            <div
              className="pointer-events-none absolute top-0 left-1/2 h-72 w-[32rem] -translate-x-1/2 -translate-y-1/2 blur-[120px]"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(88,99,242,0.10) 0%, rgba(39,133,254,0.05) 50%, transparent 70%)",
              }}
            />

            <div className="relative">
              <h2 className="mb-4 text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl">
                {t.cta.title}
              </h2>
              <p className="mx-auto mb-10 max-w-md text-[15px] text-nodo-gray-400">
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
