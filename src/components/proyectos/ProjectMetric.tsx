"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectMetric as ProjectMetricData } from "@/types";

interface ProjectMetricProps {
  metric: ProjectMetricData;
  lang: "es" | "en";
  /** Visual variant */
  variant?: "card" | "inline" | "compact";
  /** Animation duration in ms */
  duration?: number;
}

/**
 * Animated metric counter with count-up on scroll into view.
 * Uses IntersectionObserver + rAF (no Framer Motion to keep bundle slim
 * across many cards).
 *
 * Supports decimals (e.g. 0.8s, 99.9%) — picks the right precision from
 * the source value.
 */
export default function ProjectMetric({
  metric,
  lang,
  variant = "card",
  duration = 1500,
}: ProjectMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  const target = metric.value;
  const decimals = (target.toString().split(".")[1] ?? "").length;

  useEffect(() => {
    if (typeof window === "undefined" || done) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      setDone(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(node);
          let start: number | null = null;
          const animate = (t: number) => {
            if (start === null) start = t;
            const elapsed = t - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
            else {
              setValue(target);
              setDone(true);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration, done]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString();

  if (variant === "inline") {
    return (
      <span ref={ref} className="tabular-nums font-semibold text-nodo-white">
        {metric.prefix}
        {display}
        {metric.suffix}
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <div ref={ref} className="flex flex-col gap-1">
        <span className="text-2xl font-semibold tracking-tight text-nodo-white tabular-nums sm:text-3xl">
          {metric.prefix}
          {display}
          {metric.suffix}
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/50">
          {metric.label[lang]}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.4)] p-5 backdrop-blur-md transition-colors duration-500 hover:border-nodo-indigo/30 sm:p-6"
    >
      <div className="text-3xl font-semibold tracking-tight text-nodo-white tabular-nums sm:text-4xl">
        {metric.prefix}
        {display}
        {metric.suffix}
      </div>
      <div className="mt-2 text-[12px] leading-snug text-white/60">
        {metric.label[lang]}
      </div>
    </div>
  );
}
