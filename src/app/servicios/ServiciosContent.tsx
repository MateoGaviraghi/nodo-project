"use client";

import { useRef, useEffect } from "react";
import {
  Code, Globe, Cpu, Palette, Shield, ShoppingCart,
  ArrowRight, Check,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";

/* ═══════════════════════════════════════════════════════
   TechBadge — renders a tech logo with graceful fallback
   to branded initials if the remote SVG fails to load.
   ═══════════════════════════════════════════════════════ */
interface Tech {
  name: string;
  svg: string;
  dark?: boolean;
}

function TechBadge({ tech }: { tech: Tech }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[4px] border border-white/[0.10] bg-white/[0.06] px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-nodo-indigo/30 hover:bg-white/[0.10] hover:shadow-[0_0_16px_rgba(88,99,242,0.15)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tech.svg}
        alt={tech.name}
        width={24}
        height={24}
        className="h-6 w-6 object-contain"
        style={{
          filter: tech.dark ? "invert(1) brightness(1.8)" : undefined,
        }}
      />
      <span className="text-[13px] font-medium text-nodo-gray-200">
        {tech.name}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Service metadata — icons, accents, tech logos
   ═══════════════════════════════════════════════════════ */

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";
const SI_MONO = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons";

const SERVICE_META = [
  {
    key: "dev" as const,
    icon: Code,
    accent: "#2785fe",
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
    techs: [
      { name: "WooCommerce", svg: `${CDN}/woocommerce/woocommerce-original.svg` },
      { name: "Firebase", svg: `${CDN}/firebase/firebase-original.svg` },
      { name: "MongoDB", svg: `${CDN}/mongodb/mongodb-original.svg` },
      { name: "Redis", svg: `${CDN}/redis/redis-original.svg` },
    ],
  },
];

/* ═══════════════════════════════════════════════════════ */

export default function ServiciosContent() {
  const { t } = useLanguage();
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pb-8 pt-28 sm:pb-12 sm:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
            Servicios
          </p>
          <h1
            data-reveal
            className="reveal-el text-4xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-5xl lg:text-6xl"
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

      {/* ─── Service Sections ─── */}
      {SERVICE_META.map((meta, i) => {
        const service = t.services[meta.key];
        const Icon = meta.icon;
        const isEven = i % 2 === 1;
        const num = String(i + 1).padStart(2, "0");

        return (
          <section key={meta.key} className="relative py-14 sm:py-28">
            {/* Section divider */}
            <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-nodo-indigo/30 to-transparent" />

            <div className="mx-auto max-w-6xl px-6 pt-12 lg:px-8">
              <div className={`flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 ${isEven ? "lg:flex-row-reverse" : ""}`}>

                {/* ── Card Side ── */}
                <div
                  data-reveal
                  className={`flex-1 ${isEven ? "reveal-right" : "reveal-left"}`}
                >
                  <div className="group relative overflow-hidden rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.75)] p-6 backdrop-blur-md transition-all duration-500 hover:border-nodo-indigo/20 sm:p-10 lg:p-12">
                    <span className="mb-6 block text-5xl font-bold tracking-tight gradient-text sm:text-6xl">
                      {num}
                    </span>

                    <div
                      className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[4px]"
                      style={{ background: "linear-gradient(135deg, rgba(88,99,242,0.12), rgba(39,133,254,0.08))" }}
                    >
                      <Icon className="h-6 w-6 text-nodo-white/90" />
                    </div>

                    <h2 className="mb-4 text-2xl font-semibold tracking-[-0.01em] text-nodo-white sm:text-3xl">
                      {service.title}
                    </h2>

                    <p className="text-[15px] leading-relaxed text-white/80">
                      {service.description}
                    </p>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>

                {/* ── Detail Side ── */}
                <div
                  data-reveal
                  className={`flex-1 ${isEven ? "reveal-left" : "reveal-right"}`}
                  style={{ transitionDelay: "120ms" }}
                >
                  <p className="mb-8 text-[15px] leading-[1.8] text-white/80">
                    {service.long_description}
                  </p>

                  {/* Tech logos — revealed as a single block */}
                  <div className="mb-8">
                    <p className="mb-4 text-[11px] font-medium tracking-[0.2em] text-nodo-indigo uppercase">
                      Tecnologías
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {meta.techs.map((tech) => (
                        <TechBadge key={tech.name} tech={tech} />
                      ))}
                    </div>
                  </div>

                  {/* Features — single block, no individual animations */}
                  <ul className="mb-8 space-y-3">
                    {service.features.map((feature: string) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[14px] text-white/80"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: meta.accent }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <GhostButton href="/contacto">
                    <span className="whitespace-nowrap">Consultar sobre {service.title.toLowerCase()}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </GhostButton>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── Process ─── */}
      <section className="relative py-24">
        <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-nodo-indigo/30 to-transparent" />

        <div className="mx-auto max-w-4xl px-6 pt-16 lg:px-8">
          <div className="mb-16 text-center">
            <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
              Proceso
            </p>
            <h2
              data-reveal
              className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl"
              style={{ transitionDelay: "80ms" }}
            >
              Cómo trabajamos
            </h2>
          </div>

          {/* Process steps — connected circles timeline */}
          {(() => {
            const steps = [
              { step: 1, title: "Escuchamos", desc: "Nos tomamos el tiempo para entender tu idea, tu negocio y a dónde querés llegar. Sin apuros." },
              { step: 2, title: "Diseñamos", desc: "Bocetamos el camino juntos antes de escribir una línea de código. Querés ver cómo se va a ver." },
              { step: 3, title: "Planificamos", desc: "Definimos alcance, tecnologías y tiempos. Sabés qué va, cuándo y cómo — sin sorpresas." },
              { step: 4, title: "Construimos", desc: "Desarrollamos con entregas frecuentes. Ves el progreso real, nos corregís, ajustamos." },
              { step: 5, title: "Acompañamos", desc: "Deploy, testing y soporte post-lanzamiento. Tu producto arranca y seguimos ahí." },
            ];
            return (
              <div
                data-reveal
                className="reveal-el grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
                style={{ transitionDelay: "160ms" }}
              >
                {steps.map((item, i) => (
                  <div key={item.step} className="relative flex flex-col items-center text-center">
                    {/* Horizontal connector to next step — desktop only */}
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute top-7 left-1/2 hidden h-px w-full bg-gradient-to-r from-nodo-indigo/40 via-nodo-cyan/20 to-transparent lg:block"
                      />
                    )}

                    {/* Numbered circle */}
                    <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-nodo-black/90 backdrop-blur-sm transition-all duration-300 hover:border-nodo-indigo/40 hover:shadow-[0_0_24px_rgba(88,99,242,0.25)]">
                      <span className="text-xl font-bold gradient-text tabular-nums">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="mb-2 text-base font-semibold text-nodo-white">{item.title}</h3>
                    <p className="text-[13px] leading-relaxed text-white/70">{item.desc}</p>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="relative py-24">
        <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-nodo-indigo/30 to-transparent" />

        <div className="mx-auto max-w-3xl px-6 pt-16 text-center lg:px-8">
          <h2
            data-reveal
            className="reveal-el mb-5 text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl"
          >
            {t.cta.title}
          </h2>
          <p
            data-reveal
            className="reveal-el mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-white/80"
            style={{ transitionDelay: "80ms" }}
          >
            {t.cta.subtitle}
          </p>
          <div data-reveal className="reveal-el" style={{ transitionDelay: "160ms" }}>
            <GradientButton href="/contacto">
              {t.cta.button}
              <ArrowRight className="ml-2 h-4 w-4" />
            </GradientButton>
          </div>
        </div>
      </section>
    </>
  );
}
