"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectAccent } from "@/types";

interface OtherProjectsSectionProps {
  /** All published projects excluding the current one is computed inside. */
  projects: Project[];
  currentSlug: string;
  lang: "es" | "en";
  t: {
    other_title: string;
    other_subtitle: string;
    other_view_all: string;
    cat_dev: string;
    cat_wordpress: string;
    cat_ia: string;
    cat_ecommerce: string;
    cat_uiux: string;
    cat_maintenance: string;
  };
}

const ACCENT_RGB: Record<ProjectAccent, string> = {
  blue: "39, 133, 254",
  cyan: "0, 193, 244",
  purple: "139, 47, 239",
  indigo: "88, 99, 242",
};

/**
 * "Conocé nuestros otros proyectos" — 3-4 compact cards shown at the bottom
 * of every case study. Excludes the current project; takes the next ones in
 * order, wrapping around so we always have 3 cards.
 */
export default function OtherProjectsSection({
  projects,
  currentSlug,
  lang,
  t,
}: OtherProjectsSectionProps) {
  const list = projects.filter((p) => p.slug !== currentSlug);
  // Start from the project right after current; wrap around.
  const currentIdx = projects.findIndex((p) => p.slug === currentSlug);
  const ordered: Project[] = [];
  if (currentIdx >= 0) {
    for (let i = 1; i < projects.length && ordered.length < 3; i++) {
      const next = projects[(currentIdx + i) % projects.length];
      if (next.slug !== currentSlug) ordered.push(next);
    }
  } else {
    ordered.push(...list.slice(0, 3));
  }
  const picks = ordered.slice(0, 3);

  // Don't render if there are no other projects (single-project portfolio).
  if (picks.length === 0) return null;

  const categoryLabel: Record<Project["category"], string> = {
    dev: t.cat_dev,
    wordpress: t.cat_wordpress,
    ia: t.cat_ia,
    ecommerce: t.cat_ecommerce,
    uiux: t.cat_uiux,
    maintenance: t.cat_maintenance,
  };

  return (
    <section className="relative pb-24 pt-12 sm:pb-32 sm:pt-20">
      <div className="section-line" />
      <div className="mx-auto max-w-6xl px-6 pt-16 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              data-reveal
              className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            >
              {t.other_title}
            </p>
            <h2
              data-reveal
              className="reveal-el max-w-xl text-2xl font-semibold tracking-[-0.01em] text-nodo-white sm:text-3xl"
              style={{ transitionDelay: "60ms" }}
            >
              {t.other_subtitle}
            </h2>
          </div>
          <div data-reveal className="reveal-el" style={{ transitionDelay: "120ms" }}>
            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-2 rounded-[3px] border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[12px] font-medium text-white/70 transition-all duration-300 hover:border-nodo-cyan/40 hover:bg-white/[0.04] hover:text-nodo-white"
            >
              {t.other_view_all}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {picks.map((p, idx) => (
            <CompactCard
              key={p.slug}
              project={p}
              lang={lang}
              categoryLabel={categoryLabel[p.category]}
              delay={idx * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompactCard({
  project,
  lang,
  categoryLabel,
  delay,
}: {
  project: Project;
  lang: "es" | "en";
  categoryLabel: string;
  delay: number;
}) {
  const rgb = ACCENT_RGB[project.accent];

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      data-reveal
      className="reveal-el group relative block overflow-hidden rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] backdrop-blur-md transition-all duration-500 hover:border-nodo-indigo/30 hover:bg-[rgba(26,26,46,0.6)] hover:-translate-y-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Compact thumbnail */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(${rgb}, 0.18), rgba(10,10,10,0.92) 70%)`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-7xl font-extralight tracking-tighter text-white/[0.08] transition-all duration-500 group-hover:scale-110 group-hover:text-white/[0.14]">
          {project.title.charAt(0)}
        </span>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full opacity-30 blur-3xl"
          style={{ background: `rgb(${rgb})` }}
        />
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-[11px]">
          <span className="rounded-[2px] bg-nodo-indigo/10 px-2 py-0.5 font-medium tracking-wide text-nodo-indigo">
            {categoryLabel}
          </span>
          <span className="text-white/35">·</span>
          <span className="tabular-nums text-white/45">{project.year}</span>
        </div>
        <h3 className="mb-1.5 text-lg font-semibold tracking-[-0.01em] text-nodo-white">
          {project.title}
        </h3>
        <p className="mb-4 text-[13px] leading-relaxed text-white/65 line-clamp-2">
          {project.tagline[lang]}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/60 transition-all duration-300 group-hover:gap-2.5 group-hover:text-nodo-cyan">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Hover bottom line */}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}
