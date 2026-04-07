"use client";

import { useRef, useEffect } from "react";
import { Code, Palette, MessageCircle, Target } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import GradientButton from "@/components/ui/GradientButton";
import { ArrowRight } from "lucide-react";

const valueIcons = [Code, Palette, MessageCircle, Target];
const valueKeys = ["clean_code", "design", "communication", "results"] as const;

const techStack = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Python", "FastAPI", "GraphQL"] },
  { category: "Bases de datos", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"] },
  { category: "IA & Automatización", items: ["OpenAI", "LangChain", "Python ML", "Chatbots", "LLMs"] },
  { category: "CMS & E-commerce", items: ["WordPress", "WooCommerce", "Shopify", "Strapi"] },
  { category: "DevOps", items: ["Docker", "Vercel", "AWS", "GitHub Actions", "CI/CD"] },
];

function GradientLine() {
  return (
    <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-nodo-indigo/20 to-transparent" />
  );
}

export default function NosotrosContent() {
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pb-16 pt-32 sm:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
            Nosotros
          </p>
          <h1 data-reveal className="reveal-el text-4xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-5xl lg:text-6xl" style={{ transitionDelay: "80ms" }}>
            {t.about.page_title}
          </h1>
          <p data-reveal className="reveal-el mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-nodo-gray-400" style={{ transitionDelay: "160ms" }}>
            {t.about.page_subtitle}
          </p>
        </div>
      </section>

      {/* ─── Story ─── */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 data-reveal className="reveal-el mb-8 text-2xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-3xl">
              {t.about.story_title}
            </h2>
            <p data-reveal className="reveal-el mb-6 text-[15px] leading-relaxed text-nodo-gray-300" style={{ transitionDelay: "80ms" }}>
              {t.about.story_p1}
            </p>
            <p data-reveal className="reveal-el text-[15px] leading-relaxed text-nodo-gray-300" style={{ transitionDelay: "160ms" }}>
              {t.about.story_p2}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="relative py-24">
        <GradientLine />

        <div className="mx-auto max-w-5xl px-6 pt-16 lg:px-8">
          <div className="mb-16 text-center">
            <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
              Valores
            </p>
            <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>
              {t.about.values_title}
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i];
              const descKey = `${key}_desc` as keyof typeof t.about.values;
              return (
                <div
                  key={key}
                  data-reveal
                  className="reveal-el group rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] p-8 transition-all duration-500 hover:border-nodo-indigo/30 hover:bg-[rgba(26,26,46,0.6)]"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[4px]"
                    style={{ background: "linear-gradient(135deg, rgba(88,99,242,0.12), rgba(39,133,254,0.08))" }}
                  >
                    <Icon className="h-4.5 w-4.5 text-nodo-white/80" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-nodo-white">
                    {t.about.values[key]}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-nodo-gray-400">
                    {t.about.values[descKey]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="relative py-24">
        <GradientLine />

        <div className="mx-auto max-w-4xl px-6 pt-16 lg:px-8">
          <div className="mb-12 text-center">
            <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
              Equipo
            </p>
            <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>
              {t.about.team_title}
            </h2>
          </div>

          <div data-reveal className="reveal-el mx-auto max-w-sm" style={{ transitionDelay: "120ms" }}>
            <div className="rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] p-8 text-center">
              {/* Avatar placeholder */}
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-nodo-indigo/20 to-nodo-purple/20">
                <span className="text-2xl font-semibold text-nodo-white/70">MG</span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-nodo-white">Mateo Gaviraghi</h3>
              <p className="mb-4 text-[13px] font-medium text-nodo-indigo">{t.about.team_mateo}</p>
              <p className="text-[14px] leading-relaxed text-nodo-gray-400">
                {t.about.team_mateo_bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tech Stack ─── */}
      <section className="relative py-24">
        <GradientLine />

        <div className="mx-auto max-w-5xl px-6 pt-16 lg:px-8">
          <div className="mb-16 text-center">
            <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
              Tecnologías
            </p>
            <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>
              {t.about.tech_title}
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group, i) => (
              <div
                key={group.category}
                data-reveal
                className="reveal-el"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="mb-4 text-[13px] font-medium tracking-wide text-nodo-indigo">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-[3px] border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[12px] text-nodo-gray-300 transition-colors duration-300 hover:border-nodo-indigo/20 hover:text-nodo-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24">
        <GradientLine />

        <div className="mx-auto max-w-3xl px-6 pt-16 text-center lg:px-8">
          <h2 data-reveal className="reveal-el mb-5 text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl">
            {t.cta.title}
          </h2>
          <p data-reveal className="reveal-el mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-nodo-gray-400" style={{ transitionDelay: "80ms" }}>
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
