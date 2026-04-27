"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import TiltCard from "@/components/ui/TiltCard";
import ProjectThumbnail from "./ProjectThumbnail";
import ProjectMetric from "./ProjectMetric";

interface ProjectCardProps {
  project: Project;
  lang: "es" | "en";
  t: {
    cat_dev: string;
    cat_wordpress: string;
    cat_ia: string;
    cat_ecommerce: string;
    cat_uiux: string;
    cat_maintenance: string;
    nda_badge: string;
    card_view: string;
  };
}

export default function ProjectCard({ project, lang, t }: ProjectCardProps) {
  const categoryLabel: Record<Project["category"], string> = {
    dev: t.cat_dev,
    wordpress: t.cat_wordpress,
    ia: t.cat_ia,
    ecommerce: t.cat_ecommerce,
    uiux: t.cat_uiux,
    maintenance: t.cat_maintenance,
  };

  const headlineMetric = project.metrics[0];
  const isNda = project.client.visibility === "nda";

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-nodo-blue focus-visible:ring-offset-4 focus-visible:ring-offset-nodo-black"
      aria-label={`${t.card_view}: ${project.title}`}
    >
      <TiltCard className="h-full">
        <div className="p-3 pb-0 sm:p-4 sm:pb-0">
          <ProjectThumbnail project={project} size="sm" />
        </div>

        {/* Monitor stand */}
        <div className="flex justify-center py-1">
          <div className="h-3 w-8 rounded-b-[2px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] sm:h-4 sm:w-10" />
        </div>

        {/* Body */}
        <div className="px-4 pb-5 sm:px-5 sm:pb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-[2px] bg-nodo-indigo/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-nodo-indigo">
              {categoryLabel[project.category]}
            </span>
            <span className="text-[11px] text-white/40">·</span>
            <span className="text-[11px] tabular-nums text-white/40">{project.year}</span>
            {isNda && (
              <span className="ml-auto rounded-[2px] border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tracking-wider text-white/50 uppercase">
                {t.nda_badge}
              </span>
            )}
          </div>

          <h3 className="mb-1.5 text-base font-semibold text-nodo-white sm:text-lg">
            {project.title}
          </h3>
          <p className="mb-4 text-[13px] leading-relaxed text-white/65 line-clamp-3">
            {project.summary[lang]}
          </p>

          {headlineMetric && (
            <div className="mb-4 flex items-baseline gap-2 border-t border-white/[0.06] pt-4">
              <ProjectMetric metric={headlineMetric} lang={lang} variant="inline" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                {headlineMetric.label[lang]}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-[2px] border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[11px] text-white/65"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="rounded-[2px] px-2 py-0.5 text-[11px] text-white/40">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>
            <span className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-white/55 transition-all duration-300 group-hover:gap-2 group-hover:text-nodo-cyan">
              {t.card_view}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}
