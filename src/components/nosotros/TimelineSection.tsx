"use client";

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function TimelineSection() {
  const { t } = useLanguage();
  const timeline = t.about.timeline;
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Animate the central line as it enters viewport
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Gradually grow the line
          let start: number;
          function grow(ts: number) {
            if (!start) start = ts;
            const elapsed = ts - start;
            const progress = Math.min(elapsed / 1500, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setLineHeight(eased * 100);
            if (progress < 1) requestAnimationFrame(grow);
          }
          requestAnimationFrame(grow);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-16 sm:py-28">
      <div className="section-line" />
      <div className="mx-auto max-w-4xl px-6 pt-10 sm:pt-16 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
            Historia
          </p>
          <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>
            {t.about.timeline_title}
          </h2>
        </div>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Central gradient line */}
          <div className="absolute left-4 top-0 bottom-0 w-px sm:left-1/2 sm:-translate-x-1/2">
            <div
              className="w-full bg-gradient-to-b from-nodo-purple via-nodo-indigo to-nodo-cyan transition-none"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {/* Milestones */}
          <div className="space-y-12 sm:space-y-16">
            {timeline.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={milestone.year}
                  data-reveal
                  className={`relative flex items-start gap-6 pl-10 sm:pl-0 ${isLeft ? "reveal-left sm:flex-row" : "reveal-right sm:flex-row-reverse"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? "sm:text-right sm:pr-12" : "sm:text-left sm:pl-12"}`}>
                    <span className="mb-2 inline-block text-2xl font-bold gradient-text">{milestone.year}</span>
                    <h3 className="mb-2 text-lg font-semibold text-nodo-white">{milestone.title}</h3>
                    <p className="text-[14px] leading-relaxed text-white/70">{milestone.description}</p>
                  </div>

                  {/* Dot on the line */}
                  <div className="absolute left-4 top-1 -translate-x-1/2 sm:left-1/2">
                    <div
                      className="relative flex h-3 w-3 items-center justify-center rounded-full"
                      style={{ background: "var(--nodo-gradient-full)" }}
                    >
                      {/* Glow ring */}
                      <div
                        className="absolute h-7 w-7 rounded-full"
                        style={{
                          background: "radial-gradient(circle, rgba(88,99,242,0.25), transparent 70%)",
                          animation: "glow-pulse 3s ease-in-out infinite",
                          animationDelay: `${i * 0.4}s`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Spacer for opposite side (desktop only) */}
                  <div className="hidden flex-1 sm:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
