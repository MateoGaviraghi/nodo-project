"use client";

import { motion } from "framer-motion";
import { ChevronDown, Code, Globe, Cpu, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import TextReveal from "@/components/ui/TextReveal";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects } from "@/lib/projects";
import { testimonials } from "@/lib/testimonials";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
        {/* Background gradient orb */}
        <div className="hero-gradient-orb pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <Image
            src="/logos/logo-n.png"
            alt="Nodo"
            width={120}
            height={120}
            priority
            className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
          />
        </motion.div>

        {/* Headline */}
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            <TextReveal text={t.hero.headline} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mx-auto mb-10 max-w-xl text-base text-nodo-gray-400 sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <GradientButton href="/contacto">
              {t.hero.cta_primary}
            </GradientButton>
            <GhostButton href="/servicios">{t.hero.cta_secondary}</GhostButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-nodo-gray-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Services Preview ─── */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionTitle>{t.services.title}</SectionTitle>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {/* Dev */}
            <motion.div variants={fadeUp}>
              <GlassCard className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-nodo-blue/10">
                  <Code className="h-6 w-6 text-nodo-blue" />
                </div>
                <h3 className="mb-3 text-lg font-medium text-nodo-white">
                  {t.services.dev.title}
                </h3>
                <p className="text-sm leading-relaxed text-nodo-gray-400">
                  {t.services.dev.description}
                </p>
              </GlassCard>
            </motion.div>

            {/* WordPress */}
            <motion.div variants={fadeUp}>
              <GlassCard className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-nodo-cyan/10">
                  <Globe className="h-6 w-6 text-nodo-cyan" />
                </div>
                <h3 className="mb-3 text-lg font-medium text-nodo-white">
                  {t.services.wordpress.title}
                </h3>
                <p className="text-sm leading-relaxed text-nodo-gray-400">
                  {t.services.wordpress.description}
                </p>
              </GlassCard>
            </motion.div>

            {/* IA */}
            <motion.div variants={fadeUp}>
              <GlassCard className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-nodo-purple/10">
                  <Cpu className="h-6 w-6 text-nodo-purple" />
                </div>
                <h3 className="mb-3 text-lg font-medium text-nodo-white">
                  {t.services.ia.title}
                </h3>
                <p className="text-sm leading-relaxed text-nodo-gray-400">
                  {t.services.ia.description}
                </p>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Row ─── */}
      <section className="border-y border-white/6 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-medium text-nodo-white sm:text-5xl">
                <AnimatedCounter target={20} />
              </div>
              <p className="mt-2 text-sm text-nodo-gray-400">
                {t.stats.projects}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-medium text-nodo-white sm:text-5xl">
                <AnimatedCounter target={15} />
              </div>
              <p className="mt-2 text-sm text-nodo-gray-400">
                {t.stats.clients}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-medium text-nodo-white sm:text-5xl">
                <AnimatedCounter target={5} />
              </div>
              <p className="mt-2 text-sm text-nodo-gray-400">
                {t.stats.experience}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects Preview ─── */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex items-end justify-between">
            <SectionTitle>{t.projects.title}</SectionTitle>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <GhostButton href="/proyectos" className="hidden sm:inline-flex">
                {t.projects.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </GhostButton>
            </motion.div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {projects.slice(0, 4).map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <GlassCard className="group h-full">
                  {/* Placeholder image area */}
                  <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-nodo-gray-900/50">
                    <span className="text-4xl font-medium text-nodo-gray-700">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-nodo-blue/10 px-3 py-1 text-xs font-medium text-nodo-blue">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-nodo-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-nodo-gray-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-nodo-gray-900/80 px-2 py-1 text-xs text-nodo-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center sm:hidden">
            <GhostButton href="/proyectos">
              {t.projects.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </GhostButton>
          </div>
        </div>
      </section>

      {/* ─── Testimonials Marquee ─── */}
      <section className="overflow-hidden border-y border-white/6 py-16">
        <div className="relative">
          <div className="flex animate-marquee gap-8">
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div
                key={`${testimonial.id}-${i}`}
                className="glass min-w-80 max-w-95 shrink-0 rounded-lg p-6 sm:min-w-95"
              >
                <p className="mb-4 text-sm leading-relaxed text-nodo-gray-300 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium text-nodo-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-nodo-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-nodo-gray-900/40 px-6 py-16 text-center sm:px-12 sm:py-24">
            {/* Background glow */}
            <div className="hero-gradient-orb pointer-events-none absolute top-0 left-1/2 h-75 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <h2 className="mb-4 text-3xl font-medium tracking-tight text-nodo-white sm:text-4xl lg:text-5xl">
                {t.cta.title}
              </h2>
              <p className="mx-auto mb-8 max-w-md text-base text-nodo-gray-400">
                {t.cta.subtitle}
              </p>
              <GradientButton href="/contacto">{t.cta.button}</GradientButton>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
