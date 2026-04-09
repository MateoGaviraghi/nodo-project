"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const techStack = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Python", "FastAPI", "GraphQL"] },
  { category: "Bases de datos", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"] },
  { category: "IA & Automatización", items: ["OpenAI", "LangChain", "Python ML", "Chatbots", "LLMs"] },
  { category: "CMS & E-commerce", items: ["WordPress", "WooCommerce", "Shopify", "Strapi"] },
  { category: "DevOps", items: ["Docker", "Vercel", "AWS", "GitHub Actions", "CI/CD"] },
];

function MagneticPill({ name, index }: { name: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.15;
      const dy = (e.clientY - cy) * 0.15;
      el.style.transform = `translate(${dx}px, ${dy}px) scale(1.08)`;
    },
    [isTouch],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px) scale(1)";
    el.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  }, []);

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block cursor-default rounded-[3px] border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-[12px] text-nodo-gray-300 transition-colors duration-300 hover:border-nodo-indigo/30 hover:bg-white/[0.06] hover:text-nodo-white hover:shadow-[0_0_16px_rgba(88,99,242,0.12)]"
      style={{
        animation: `pill-float ${3 + (index % 4) * 0.5}s ease-in-out infinite`,
        animationDelay: `${index * 0.2}s`,
        willChange: "transform",
      }}
    >
      {name}
    </span>
  );
}

export default function TechStackSection() {
  const { t } = useLanguage();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleSectionMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || !spotlightRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(88,99,242,0.06), transparent 50%)`;
      spotlightRef.current.style.opacity = "1";
    },
    [isTouch],
  );

  const handleSectionMouseLeave = useCallback(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
  }, []);

  let pillIndex = 0;

  return (
    <section className="relative py-14 sm:py-24">
      <div className="section-line" />
      <div
        ref={sectionRef}
        className="relative mx-auto max-w-5xl px-6 pt-16 lg:px-8"
        onMouseMove={handleSectionMouseMove}
        onMouseLeave={handleSectionMouseLeave}
      >
        {/* Section-wide cursor spotlight */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        />

        {/* Header */}
        <div className="relative z-10 mb-16 text-center">
          <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
            Tecnologías
          </p>
          <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>
            {t.about.tech_title}
          </h2>
        </div>

        {/* Tech Grid */}
        <div className="relative z-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group, gi) => (
            <div
              key={group.category}
              data-reveal
              className="reveal-el"
              style={{ transitionDelay: `${gi * 80}ms` }}
            >
              <h3 className="mb-4 text-[13px] font-medium tracking-wide text-nodo-indigo">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item) => {
                  const idx = pillIndex++;
                  return <MagneticPill key={item} name={item} index={idx} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
