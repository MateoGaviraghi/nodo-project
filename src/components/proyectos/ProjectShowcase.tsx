"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import ProjectThumbnail from "./ProjectThumbnail";
import ProjectMetric from "./ProjectMetric";
import GradientButton from "@/components/ui/GradientButton";

interface ProjectShowcaseProps {
  project: Project;
  lang: "es" | "en";
  /** Position in the list, 0-based — used to render the big "01"/"02" number. */
  index: number;
  /** Total number of projects, for the "of N" label. */
  total: number;
  /** Mirror the layout (info on the right, screenshot on the left). */
  reversed?: boolean;
  t: {
    featured_cta: string;
    live_link: string;
    nda_badge: string;
    cat_dev: string;
    cat_wordpress: string;
    cat_ia: string;
    cat_ecommerce: string;
    cat_uiux: string;
    cat_maintenance: string;
  };
}

/**
 * Alternating showcase block — every project on /proyectos uses this.
 * Info on one side, big screenshot frame on the other; flips by index.
 *
 * Subtle 3-layer parallax driven by IntersectionObserver + rAF (no GSAP pin),
 * so it stays Lenis-friendly.
 */
export default function ProjectShowcase({
  project,
  lang,
  index,
  total,
  reversed = false,
  t,
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const screenLayerRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let inView = false;

    const onScroll = () => {
      if (!inView) return;
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = rect.height + winH;
      const progress = Math.max(0, Math.min(1, (winH - rect.top) / total));
      const c = progress - 0.5;

      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform = `translate3d(0, ${c * 30}px, 0)`;
      }
      if (glowLayerRef.current) {
        glowLayerRef.current.style.transform = `translate3d(0, ${c * 60}px, 0)`;
      }
      if (screenLayerRef.current) {
        screenLayerRef.current.style.transform = `translate3d(0, ${c * -40}px, 0)`;
      }
    };

    const tick = () => {
      onScroll();
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView && !raf) raf = requestAnimationFrame(tick);
        if (!inView && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );

    if (containerRef.current) io.observe(containerRef.current);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const categoryLabel: Record<Project["category"], string> = {
    dev: t.cat_dev,
    wordpress: t.cat_wordpress,
    ia: t.cat_ia,
    ecommerce: t.cat_ecommerce,
    uiux: t.cat_uiux,
    maintenance: t.cat_maintenance,
  };

  const isNda = project.client.visibility === "nda";
  const number = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <section ref={containerRef} className="relative py-12 sm:py-20" data-reveal>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[8px] border border-white/[0.08] bg-[rgba(16,16,30,0.4)] p-6 backdrop-blur-md sm:p-10 lg:p-14">
          {/* Layer 1 — background gradient blob (origin flips by side) */}
          <div
            ref={bgLayerRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 will-change-transform"
            style={{
              background: reversed
                ? "radial-gradient(ellipse at top left, rgba(139,47,239,0.16), transparent 60%), radial-gradient(ellipse at bottom right, rgba(0,193,244,0.12), transparent 60%)"
                : "radial-gradient(ellipse at top right, rgba(139,47,239,0.16), transparent 60%), radial-gradient(ellipse at bottom left, rgba(0,193,244,0.12), transparent 60%)",
            }}
          />

          {/* Layer 2 — glow behind screenshot */}
          <div
            ref={glowLayerRef}
            aria-hidden
            className={`pointer-events-none absolute top-[20%] h-[60%] w-[60%] rounded-full opacity-40 blur-[120px] will-change-transform ${
              reversed ? "left-[-10%]" : "right-[-10%]"
            }`}
            style={{
              background:
                "radial-gradient(circle, rgba(0,193,244,0.5), transparent 70%)",
            }}
          />

          <div
            className={`relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16 ${
              reversed ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Copy side */}
            <div className="lg:col-span-5">
              {/* Big number */}
              <div className="reveal-el mb-5 flex items-baseline gap-3" data-reveal>
                <span className="text-5xl font-semibold tracking-tight gradient-text sm:text-6xl">
                  {number}
                </span>
                <span className="text-[11px] font-medium tracking-[0.3em] text-white/35 uppercase">
                  / {totalStr}
                </span>
              </div>

              {/* Category + year */}
              <div
                className="reveal-el mb-3 flex items-center gap-3 text-[12px]"
                data-reveal
                style={{ transitionDelay: "60ms" }}
              >
                <span className="rounded-[2px] bg-nodo-indigo/10 px-2.5 py-0.5 font-medium tracking-wide text-nodo-indigo">
                  {categoryLabel[project.category]}
                </span>
                <span className="text-white/40">·</span>
                <span className="tabular-nums text-white/55">{project.year}</span>
                {isNda && (
                  <span className="rounded-[2px] border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tracking-wider text-white/55 uppercase">
                    {t.nda_badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                className="reveal-el mb-4 text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl"
                data-reveal
                style={{ transitionDelay: "120ms" }}
              >
                {project.title}
              </h2>

              {/* Tagline */}
              <p
                className="reveal-el mb-8 max-w-md text-[15px] leading-relaxed text-white/75"
                data-reveal
                style={{ transitionDelay: "200ms" }}
              >
                {project.tagline[lang]}
              </p>

              {/* Inline metrics row */}
              {project.metrics.length > 0 && (
                <div
                  className="reveal-el mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6"
                  data-reveal
                  style={{ transitionDelay: "260ms" }}
                >
                  {project.metrics.slice(0, 3).map((m, i) => (
                    <ProjectMetric key={i} metric={m} lang={lang} variant="compact" />
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div
                className="reveal-el flex flex-wrap items-center gap-3"
                data-reveal
                style={{ transitionDelay: "320ms" }}
              >
                <GradientButton href={`/proyectos/${project.slug}`}>
                  <span>{t.featured_cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </GradientButton>
                {project.client.liveUrl && (
                  <Link
                    href={project.client.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-[3px] border border-white/[0.08] bg-white/[0.02] px-5 py-3 text-[13px] font-medium text-white/70 transition-all duration-300 hover:border-nodo-cyan/40 hover:bg-white/[0.04] hover:text-nodo-white"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {t.live_link}
                  </Link>
                )}
              </div>
            </div>

            {/* Screenshot side */}
            <div className="lg:col-span-7">
              <div
                ref={screenLayerRef}
                className="reveal-el will-change-transform"
                data-reveal
                style={{ transitionDelay: "240ms" }}
              >
                <ProjectThumbnail project={project} size="lg" />
              </div>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-nodo-indigo/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
