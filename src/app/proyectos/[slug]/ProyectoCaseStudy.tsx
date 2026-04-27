"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Quote } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getPublishedProjects } from "@/lib/projects";
import type { Project } from "@/types";
import ProjectThumbnail from "@/components/proyectos/ProjectThumbnail";
import ProjectMetric from "@/components/proyectos/ProjectMetric";
import CaseStudyGallery from "@/components/proyectos/CaseStudyGallery";
import OtherProjectsSection from "@/components/proyectos/OtherProjectsSection";

interface Props {
  project: Project;
}

export default function ProyectoCaseStudy({ project }: Props) {
  const { t, language: lang } = useLanguage();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const all = useMemo(() => getPublishedProjects(), []);
  const caseIndex = useMemo(
    () => all.findIndex((p) => p.slug === project.slug) + 1,
    [all, project.slug],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

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

  const categoryLabel: Record<Project["category"], string> = {
    dev: t.projects.cat_dev,
    wordpress: t.projects.cat_wordpress,
    ia: t.projects.cat_ia,
    ecommerce: t.projects.cat_ecommerce,
    uiux: t.projects.cat_uiux,
    maintenance: t.projects.cat_maintenance,
  };

  const roleLabel: Record<Project["role"], string> = {
    lead: t.projects.role_lead,
    support: t.projects.role_support,
    "design-only": t.projects.role_design_only,
    maintenance: t.projects.role_maintenance,
  };

  const totalCases = all.length;
  const caseLabel = `${t.projects.case_label} ${String(caseIndex).padStart(2, "0")} ${t.projects.case_of} ${String(totalCases).padStart(2, "0")}`;
  const isNda = project.client.visibility === "nda";

  return (
    <article className="relative">
      {/* ─── Hero ─── */}
      <section className="relative pb-12 pt-24 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/proyectos"
            className="reveal-el mb-10 inline-flex items-center gap-2 text-[12px] font-medium text-white/55 transition-colors duration-300 hover:text-nodo-cyan"
            data-reveal
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.projects.back}
          </Link>

          {/* Caption row */}
          <p
            data-reveal
            className="reveal-el mb-6 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            style={{ transitionDelay: "60ms" }}
          >
            {caseLabel} · {categoryLabel[project.category]} · {project.year}
          </p>

          {/* Title */}
          <h1
            data-reveal
            className="reveal-el text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-nodo-white sm:text-6xl lg:text-7xl"
            style={{ transitionDelay: "120ms" }}
          >
            {project.title}
            <span className="text-nodo-cyan">.</span>
          </h1>

          {/* Tagline */}
          <p
            data-reveal
            className="reveal-el mt-6 max-w-2xl text-[18px] leading-relaxed text-white/75 sm:text-[20px]"
            style={{ transitionDelay: "200ms" }}
          >
            {project.tagline[lang]}
          </p>

          {/* Meta strip */}
          <div
            data-reveal
            className="reveal-el mt-10 grid grid-cols-2 gap-4 border-y border-white/[0.06] py-6 text-[12px] sm:grid-cols-4"
            style={{ transitionDelay: "260ms" }}
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                {t.projects.meta_year}
              </div>
              <div className="mt-1.5 text-nodo-white tabular-nums">{project.year}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                {t.projects.meta_duration}
              </div>
              <div className="mt-1.5 text-nodo-white">{project.duration[lang]}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                {t.projects.meta_industry}
              </div>
              <div className="mt-1.5 text-nodo-white">{project.industry[lang]}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                {t.projects.meta_role}
              </div>
              <div className="mt-1.5 text-nodo-white">{roleLabel[project.role]}</div>
            </div>
          </div>

          {/* Action links */}
          {(project.client.liveUrl || isNda) && (
            <div
              data-reveal
              className="reveal-el mt-8 flex flex-wrap items-center gap-3"
              style={{ transitionDelay: "320ms" }}
            >
              {project.client.liveUrl && (
                <Link
                  href={project.client.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-[3px] border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-white/80 transition-all duration-300 hover:border-nodo-cyan/40 hover:bg-white/[0.06] hover:text-nodo-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {project.client.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </Link>
              )}
              {isNda && (
                <span className="inline-flex items-center gap-2 rounded-[3px] border border-white/[0.10] bg-white/[0.02] px-3 py-2 text-[11px] font-medium tracking-[0.2em] uppercase text-white/55">
                  {t.projects.nda_badge}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── Hero screenshot ─── */}
      <section className="relative pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div data-reveal className="reveal-3d">
            <ProjectThumbnail project={project} useHero size="lg" />
          </div>
        </div>
      </section>

      {/* ─── Metrics row (only if 2+ metrics) ─── */}
      {project.metrics.length >= 2 && (
        <section className="relative pb-16 sm:pb-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div
              className={`grid gap-4 ${
                project.metrics.length === 2
                  ? "sm:grid-cols-2"
                  : project.metrics.length === 3
                    ? "sm:grid-cols-3"
                    : "sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  data-reveal
                  className="reveal-el"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <ProjectMetric metric={m} lang={lang} variant="card" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Problem ─── */}
      {project.caseStudy?.problem && (
        <section className="relative py-12 sm:py-20">
          <div className="section-line" />
          <div className="mx-auto max-w-3xl px-6 pt-12 lg:px-8">
            <p
              data-reveal
              className="reveal-el mb-5 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            >
              {t.projects.section_problem}
            </p>
            <p
              data-reveal
              className="reveal-el text-[17px] leading-[1.7] text-white/80 sm:text-[19px]"
              style={{ transitionDelay: "80ms" }}
            >
              {project.caseStudy.problem[lang]}
            </p>
          </div>
        </section>
      )}

      {/* ─── Approach (timeline) ─── */}
      {project.caseStudy?.approach && project.caseStudy.approach.length > 0 && (
        <section className="relative py-12 sm:py-20">
          <div className="section-line" />
          <div className="mx-auto max-w-4xl px-6 pt-12 lg:px-8">
            <p
              data-reveal
              className="reveal-el mb-10 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            >
              {t.projects.section_approach}
            </p>

            <ol className="relative space-y-10">
              {/* vertical line */}
              <span
                aria-hidden
                className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-nodo-purple/40 via-nodo-indigo/30 to-nodo-cyan/20"
              />
              {project.caseStudy.approach.map((step, i) => (
                <li
                  key={i}
                  data-reveal
                  className="reveal-el relative pl-12"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.12] bg-nodo-black text-[11px] font-semibold tabular-nums gradient-text"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-nodo-white sm:text-xl">
                    {step.title[lang]}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-white/70">
                    {step.body[lang]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ─── Pinned horizontal gallery ─── */}
      {project.screenshots.length > 0 && (
        <CaseStudyGallery
          project={project}
          lang={lang}
          eyebrow={t.projects.section_gallery}
        />
      )}

      {/* ─── Stack + Role ─── */}
      <section className="relative py-12 sm:py-20">
        <div className="section-line" />
        <div className="mx-auto max-w-5xl px-6 pt-12 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div data-reveal className="reveal-left">
              <p className="mb-5 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
                {t.projects.section_stack}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-[4px] border border-white/[0.10] bg-white/[0.04] px-3 py-1.5 text-[13px] text-white/85"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div data-reveal className="reveal-right" style={{ transitionDelay: "120ms" }}>
              <p className="mb-5 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
                {t.projects.section_role}
              </p>
              <p className="text-[15px] leading-relaxed text-white/80">
                {roleLabel[project.role]}. {project.team[lang]}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Outcome + Quote ─── */}
      {project.caseStudy?.outcome && (
        <section className="relative py-12 sm:py-20">
          <div className="section-line" />
          <div className="mx-auto max-w-3xl px-6 pt-12 lg:px-8">
            <p
              data-reveal
              className="reveal-el mb-5 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            >
              {t.projects.section_outcome}
            </p>
            <p
              data-reveal
              className="reveal-el text-[17px] leading-[1.7] text-white/85 sm:text-[19px]"
              style={{ transitionDelay: "80ms" }}
            >
              {project.caseStudy.outcome[lang]}
            </p>

            {project.caseStudy.quote && (
              <figure
                data-reveal
                className="reveal-el mt-12 rounded-[8px] border border-white/[0.06] bg-[rgba(26,26,46,0.5)] p-8 backdrop-blur-md sm:p-10"
                style={{ transitionDelay: "180ms" }}
              >
                <Quote className="mb-5 h-6 w-6 text-nodo-cyan/60" />
                <blockquote className="text-[18px] leading-relaxed text-nodo-white sm:text-[22px]">
                  &ldquo;{project.caseStudy.quote.text[lang]}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-[13px] text-white/60">
                  <span className="font-medium text-white/85">
                    {project.caseStudy.quote.author}
                  </span>
                  <span className="mx-2 text-white/30">·</span>
                  {project.caseStudy.quote.role[lang]}
                </figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      {/* ─── Other projects ─── */}
      <OtherProjectsSection
        projects={all}
        currentSlug={project.slug}
        lang={lang}
        t={{
          other_title: t.projects.other_title,
          other_subtitle: t.projects.other_subtitle,
          other_view_all: t.projects.other_view_all,
          cat_dev: t.projects.cat_dev,
          cat_wordpress: t.projects.cat_wordpress,
          cat_ia: t.projects.cat_ia,
          cat_ecommerce: t.projects.cat_ecommerce,
          cat_uiux: t.projects.cat_uiux,
          cat_maintenance: t.projects.cat_maintenance,
        }}
      />
    </article>
  );
}
