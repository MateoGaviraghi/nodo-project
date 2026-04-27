"use client";

import Image from "next/image";
import type { Project, ProjectAccent } from "@/types";

interface ProjectThumbnailProps {
  project: Project;
  /** Use the screenshot marked `hero` instead of the thumbnail. */
  useHero?: boolean;
  /** Make the title initial larger (for featured/hero contexts). */
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Render the fake browser chrome (dots + URL bar) above the screenshot.
   *  Default true for grid showcases (gives "this is a website" context).
   *  Auto-disabled when `useHero` so the case study hero is clean. */
  chrome?: boolean;
}

const ACCENT_RGB: Record<ProjectAccent, string> = {
  blue: "39, 133, 254",
  cyan: "0, 193, 244",
  purple: "139, 47, 239",
  indigo: "88, 99, 242",
};

const INITIAL_SIZE = {
  sm: "text-7xl sm:text-8xl",
  md: "text-8xl sm:text-9xl",
  lg: "text-9xl sm:text-[12rem]",
};

/**
 * Browser-framed thumbnail with a screenshot or a placeholder
 * (gradient + grid + giant initial). Same visual language as the home grid
 * but reused everywhere — index cards, featured, case study hero.
 */
export default function ProjectThumbnail({
  project,
  useHero = false,
  size = "sm",
  className = "",
  chrome,
}: ProjectThumbnailProps) {
  const screen = useHero
    ? project.screenshots.find((s) => s.hero) ?? project.thumbnail
    : project.thumbnail;

  const rgb = ACCENT_RGB[project.accent];
  // Hero of the case study renders without chrome by default (clean image).
  // Grid thumbnails keep chrome unless explicitly disabled.
  const showFrame =
    chrome ?? (!useHero && (screen.frame ?? "browser") === "browser");
  const aspect = screen.aspect ?? "16:10";
  const aspectClass =
    aspect === "16:9"
      ? "aspect-video"
      : aspect === "4:3"
        ? "aspect-[4/3]"
        : aspect === "1:1"
          ? "aspect-square"
          : aspect === "9:16"
            ? "aspect-[9/16]"
            : "aspect-[16/10]";

  const url = project.client.liveUrl
    ? project.client.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.slug}.app`;

  return (
    <div className={className}>
      {showFrame && (
        <div className="flex items-center gap-2 rounded-t-[4px] border border-b-0 border-white/[0.08] bg-white/[0.03] px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
          </div>
          <div className="mx-2 min-w-0 flex-1 truncate rounded-[2px] bg-white/[0.04] px-3 py-0.5">
            <span className="text-[10px] text-white/30">{url}</span>
          </div>
        </div>
      )}

      <div
        className={`relative overflow-hidden border border-white/[0.08] ${
          showFrame ? "rounded-b-[4px] border-t-0" : "rounded-[4px]"
        }`}
        style={{
          background: `linear-gradient(135deg, rgba(${rgb}, 0.18), rgba(10,10,10,0.92) 70%)`,
        }}
      >
        {/* Grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Real screenshot if available — image dictates aspect */}
        {screen.src && (
          <Image
            src={screen.src}
            alt={screen.alt.es}
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="relative block h-auto w-full"
          />
        )}

        {/* Placeholder: giant initial — uses declared aspect */}
        {!screen.src && (
          <div className={`flex ${aspectClass} items-center justify-center`}>
            <span
              className={`relative font-extralight tracking-tighter text-white/[0.07] transition-all duration-500 group-hover:text-white/[0.12] group-hover:scale-110 ${INITIAL_SIZE[size]}`}
            >
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Accent glow blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full opacity-30 blur-3xl"
          style={{ background: `rgb(${rgb})` }}
        />

        {/* Reflection */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
      </div>
    </div>
  );
}
