"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/hooks/useLanguage";

gsap.registerPlugin(ScrollTrigger);

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function remap(v: number, lo: number, hi: number) {
  return clamp((v - lo) / (hi - lo), 0, 1);
}

interface Beat {
  title: string;
  text: string;
}

export default function PhilosophySection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const beats: Beat[] = [
    { title: t.about.story_title, text: t.about.story_p1 },
    { title: t.about.values_title, text: t.about.story_p2 },
    { title: "Nodo", text: t.about.story_p3 },
  ];

  // GSAP ScrollTrigger for desktop
  useEffect(() => {
    if (isMobile) return;
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => st.kill();
  }, [isMobile]);

  // Derive current beat
  const beatIndex = Math.min(2, Math.floor(progress * 3));
  const beatLocal = (progress * 3) - beatIndex;

  const getBeatOpacity = (i: number) => {
    if (isMobile) return 1;
    if (i === beatIndex) {
      if (beatLocal < 0.15) return remap(beatLocal, 0, 0.15);
      if (beatLocal > 0.8) return 1 - remap(beatLocal, 0.8, 1);
      return 1;
    }
    return 0;
  };

  const getBeatY = (i: number) => {
    if (isMobile) return 0;
    if (i === beatIndex) {
      if (beatLocal < 0.15) return (1 - remap(beatLocal, 0, 0.15)) * 30;
      if (beatLocal > 0.8) return -remap(beatLocal, 0.8, 1) * 30;
      return 0;
    }
    return 30;
  };

  // Mobile: simple stacked layout
  if (isMobile) {
    return (
      <section className="relative py-16">
        <div className="section-line" />
        <div className="mx-auto max-w-3xl px-6 pt-10">
          {beats.map((beat, i) => (
            <div key={i} data-reveal className="reveal-el mb-14 last:mb-0" style={{ transitionDelay: `${i * 120}ms` }}>
              <p className="mb-3 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
                {String(i + 1).padStart(2, "0")} / 03
              </p>
              <h3 className="mb-4 text-2xl font-semibold tracking-[-0.02em] text-nodo-white">
                {beat.title}
              </h3>
              <p className="text-[15px] leading-[1.8] text-nodo-gray-300">{beat.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop: sticky beats
  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Beat indicator dots — right side */}
        <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
          {beats.map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full transition-all duration-500"
              style={{
                background: i === beatIndex ? "var(--nodo-gradient-full)" : "rgba(255,255,255,0.15)",
                boxShadow: i === beatIndex ? "0 0 8px rgba(88,99,242,0.4)" : "none",
                transform: i === beatIndex ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Content — wide container, text-left for natural reading */}
        <div className="relative z-10 mx-auto w-full max-w-3xl px-8 lg:px-12">
          {beats.map((beat, i) => (
            <div
              key={i}
              className="absolute inset-x-0 px-8 lg:px-12"
              style={{
                opacity: getBeatOpacity(i),
                transform: `translateY(${getBeatY(i)}px)`,
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: i === beatIndex ? "auto" : "none",
              }}
            >
              <p className="mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
                {String(i + 1).padStart(2, "0")} / 03
              </p>
              <h3 className="mb-6 text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl">
                {beat.title}
              </h3>
              <p className="max-w-2xl text-[16px] leading-[1.8] text-nodo-gray-300 sm:text-[17px]">
                {beat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
