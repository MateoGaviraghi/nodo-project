"use client";

import { useEffect, useState } from "react";
import {
  Code, Globe, Cpu, Palette, Shield, ShoppingCart,
  ArrowRight, Check,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import GridPattern from "@/components/ui/GridPattern";
import Spotlight from "@/components/ui/Spotlight";
import BorderBeam from "@/components/ui/BorderBeam";
import SpotlightCard from "@/components/ui/SpotlightCard";
import TracingBeam from "@/components/ui/TracingBeam";

/* ═══════════════════════════════════════════════════════
   TechBadge — tech logo chip (no backdrop-blur: perf over the mesh)
   ═══════════════════════════════════════════════════════ */
interface Tech {
  name: string;
  svg: string;
  dark?: boolean;
}

function TechBadge({ tech }: { tech: Tech }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[6px] border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 transition-all duration-300 hover:border-nodo-indigo/30 hover:bg-white/[0.08]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tech.svg}
        alt={tech.name}
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
        style={{ filter: tech.dark ? "invert(1) brightness(1.8)" : undefined }}
      />
      <span className="text-[12.5px] font-medium text-nodo-gray-200">{tech.name}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Service metadata — icons, accents, tech logos (preserved order)
   ═══════════════════════════════════════════════════════ */

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";
const SI_MONO = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons";

const SERVICE_META = [
  {
    key: "dev" as const,
    icon: Code,
    accent: "#2785fe",
    accentRgb: "39, 133, 254",
    techs: [
      { name: "React", svg: `${CDN}/react/react-original.svg` },
      { name: "Next.js", svg: `${CDN}/nextjs/nextjs-plain.svg`, dark: true },
      { name: "TypeScript", svg: `${CDN}/typescript/typescript-original.svg` },
      { name: "Node.js", svg: `${CDN}/nodejs/nodejs-original.svg` },
      { name: "Supabase", svg: `${SI}/supabase/3ECF8E` },
    ],
  },
  {
    key: "ia" as const,
    icon: Cpu,
    accent: "#8b2fef",
    accentRgb: "139, 47, 239",
    techs: [
      { name: "n8n", svg: `${SI}/n8n/EA4B71` },
      { name: "Anthropic", svg: `${SI}/anthropic/D97757` },
      { name: "OpenAI", svg: `${SI_MONO}/openai.svg`, dark: true },
      { name: "Antigravity", svg: "/logo-antigravity-Photoroom.png" },
      { name: "Claude Code", svg: `${SI}/claude/D97757` },
    ],
  },
  {
    key: "wordpress" as const,
    icon: Globe,
    accent: "#00c1f4",
    accentRgb: "0, 193, 244",
    techs: [
      { name: "WordPress", svg: `${CDN}/wordpress/wordpress-plain.svg`, dark: true },
      { name: "PHP", svg: `${CDN}/php/php-original.svg` },
      { name: "MySQL", svg: `${CDN}/mysql/mysql-original.svg`, dark: true },
      { name: "Figma", svg: `${CDN}/figma/figma-original.svg` },
    ],
  },
  {
    key: "uiux" as const,
    icon: Palette,
    accent: "#5863f2",
    accentRgb: "88, 99, 242",
    techs: [
      { name: "Figma", svg: `${CDN}/figma/figma-original.svg` },
      { name: "Tailwind", svg: `${CDN}/tailwindcss/tailwindcss-original.svg` },
      { name: "CSS3", svg: `${CDN}/css3/css3-original.svg` },
      { name: "HTML5", svg: `${CDN}/html5/html5-original.svg` },
    ],
  },
  {
    key: "maintenance" as const,
    icon: Shield,
    accent: "#00c1f4",
    accentRgb: "0, 193, 244",
    techs: [
      { name: "Docker", svg: `${CDN}/docker/docker-original.svg` },
      { name: "GitHub", svg: `${CDN}/github/github-original.svg`, dark: true },
      { name: "Vercel", svg: `${CDN}/vercel/vercel-original.svg`, dark: true },
      { name: "Kubernetes", svg: `${CDN}/kubernetes/kubernetes-original.svg` },
    ],
  },
  {
    key: "ecommerce" as const,
    icon: ShoppingCart,
    accent: "#8b2fef",
    accentRgb: "139, 47, 239",
    techs: [
      { name: "WooCommerce", svg: `${CDN}/woocommerce/woocommerce-original.svg` },
      { name: "Firebase", svg: `${CDN}/firebase/firebase-original.svg` },
      { name: "MongoDB", svg: `${CDN}/mongodb/mongodb-original.svg` },
      { name: "Redis", svg: `${CDN}/redis/redis-original.svg` },
    ],
  },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

const PROCESS = [
  { step: 1, title: "Escuchamos", desc: "Nos tomamos el tiempo para entender tu idea, tu negocio y a dónde querés llegar. Sin apuros." },
  { step: 2, title: "Diseñamos", desc: "Bocetamos el camino juntos antes de escribir una línea de código. Querés ver cómo se va a ver." },
  { step: 3, title: "Planificamos", desc: "Definimos alcance, tecnologías y tiempos. Sabés qué va, cuándo y cómo — sin sorpresas." },
  { step: 4, title: "Construimos", desc: "Desarrollamos con entregas frecuentes. Ves el progreso real, nos corregís, ajustamos." },
  { step: 5, title: "Acompañamos", desc: "Deploy, testing y soporte post-lanzamiento. Tu producto arranca y seguimos ahí." },
];

/* ═══════════════════════════════════════════════════════ */

export default function ServiciosContent() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  // Reveal-on-scroll for [data-reveal] (hero / process / cta).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Track which service is centered → drives the sticky index panel.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const arts = Array.from(document.querySelectorAll<HTMLElement>("[data-svc]"));
    if (!arts.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute("data-svc") || 0));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    arts.forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, []);

  const activeMeta = SERVICE_META[active];
  const activeService = t.services[activeMeta.key];

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pb-10 pt-28 sm:pb-16 sm:pt-40">
        <GridPattern className="opacity-50" size={46} />
        <Spotlight />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p data-reveal className="reveal-el mb-5 label-mono text-nodo-cyan">
            Servicios · 06
          </p>
          <h1
            data-reveal
            className="reveal-el text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-nodo-white"
            style={{ transitionDelay: "80ms" }}
          >
            {t.services.page_title}
          </h1>
          <p
            data-reveal
            className="reveal-el mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white/80"
            style={{ transitionDelay: "160ms" }}
          >
            {t.services.page_subtitle}
          </p>
        </div>
      </section>

      {/* ─── Services — sticky morphing index + tracing beam + spotlight cards ─── */}
      <section className="relative py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[290px_1fr] lg:gap-14">
            {/* Sticky index (desktop) — number + title morph with scroll */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="label-mono text-nodo-cyan">{num(active)} / 06</p>
                <div className="relative mt-3 h-[150px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        className="font-display text-[5.5rem] font-bold leading-none"
                        style={{ color: activeMeta.accent }}
                      >
                        {num(active)}
                      </div>
                      <h3 className="mt-3 font-display text-[1.4rem] font-semibold leading-tight text-nodo-white">
                        {activeService.title}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <ul className="mt-8 space-y-3.5 border-l border-white/10 pl-5">
                  {SERVICE_META.map((m, i) => {
                    const on = i === active;
                    return (
                      <li key={m.key}>
                        <a
                          href={`#svc-${i}`}
                          className={`flex items-center gap-3 text-[13px] transition-colors duration-300 ${
                            on ? "text-nodo-white" : "text-white/45 hover:text-white/80"
                          }`}
                        >
                          <span className="font-mono text-[11px]" style={{ color: on ? m.accent : undefined }}>
                            {num(i)}
                          </span>
                          <span className="truncate">{t.services[m.key].title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Service cards — the tracing beam draws down as you scroll */}
            <TracingBeam className="lg:pl-12">
              <div className="space-y-12 sm:space-y-16">
                {SERVICE_META.map((meta, i) => {
                  const service = t.services[meta.key];
                  const Icon = meta.icon;
                  return (
                    <SpotlightCard
                      key={meta.key}
                      id={`svc-${i}`}
                      data-svc={i}
                      accent={meta.accentRgb}
                      className="scroll-mt-28 p-6 sm:p-9"
                    >
                      <div className="relative z-10">
                        <div className="mb-6 flex items-center gap-4">
                          <span className="font-display text-3xl font-bold" style={{ color: meta.accent }}>
                            {num(i)}
                          </span>
                          <span
                            className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/10"
                            style={{ background: `linear-gradient(135deg, rgba(${meta.accentRgb},0.18), transparent)` }}
                          >
                            <Icon className="h-5 w-5 text-white/90" />
                          </span>
                        </div>

                        <h2 className="mb-4 font-display text-2xl font-semibold tracking-[-0.01em] text-nodo-white sm:text-[1.9rem]">
                          {service.title}
                        </h2>

                        <p className="mb-7 max-w-xl text-[15px] leading-[1.85] text-white/75">
                          {service.long_description}
                        </p>

                        <ul className="mb-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                          {service.features.map((feature: string) => (
                            <li key={feature} className="flex items-start gap-2.5 text-[13.5px] text-white/80">
                              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: meta.accent }} />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="mb-7 flex flex-wrap gap-2.5">
                          {meta.techs.map((tech) => (
                            <TechBadge key={tech.name} tech={tech} />
                          ))}
                        </div>

                        <GhostButton href="/contacto">
                          <span className="whitespace-nowrap">Consultar sobre {service.title.toLowerCase()}</span>
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </GhostButton>
                      </div>
                    </SpotlightCard>
                  );
                })}
              </div>
            </TracingBeam>
          </div>
        </div>
      </section>

      {/* ─── Process — vertical timeline with gradient spine ─── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-nodo-indigo/30 to-transparent" />
        <div className="mx-auto max-w-2xl px-6 pt-16 lg:px-8">
          <div className="mb-14 text-center">
            <p data-reveal className="reveal-el mb-4 label-mono text-nodo-cyan">Proceso</p>
            <h2
              data-reveal
              className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl"
              style={{ transitionDelay: "80ms" }}
            >
              Cómo trabajamos
            </h2>
          </div>

          <ol className="relative">
            <div
              aria-hidden
              className="absolute left-[26px] top-4 bottom-4 w-px bg-gradient-to-b from-nodo-purple via-nodo-indigo to-nodo-cyan opacity-40"
            />
            {PROCESS.map((item, i) => (
              <li
                key={item.step}
                data-reveal
                className="reveal-el relative flex gap-6 pb-10 last:pb-0"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="relative z-10 flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-nodo-black transition-all duration-300 hover:border-nodo-indigo/40 hover:shadow-[0_0_24px_rgba(88,99,242,0.25)]">
                  <span className="font-display text-lg font-bold tabular-nums gradient-text">{item.step}</span>
                </div>
                <div className="pt-2.5">
                  <h3 className="mb-1.5 text-base font-semibold text-nodo-white">{item.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-white/70">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Final CTA — showpiece ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div
            data-reveal
            className="reveal-el relative overflow-hidden rounded-[16px] border border-white/[0.07] bg-[rgba(16,16,30,0.9)] px-6 py-16 text-center sm:px-12 sm:py-20"
          >
            <GridPattern />
            <BorderBeam duration={9} />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-48 w-[30rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full opacity-25 blur-[60px]"
              style={{ background: "radial-gradient(ellipse, #5863f2, transparent 70%)" }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-h2 text-white">{t.cta.title}</h2>
              <p className="mx-auto mb-9 mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
                {t.cta.subtitle}
              </p>
              <GradientButton href="/contacto" magnetic>
                {t.cta.button}
                <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
