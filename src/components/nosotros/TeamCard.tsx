"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface TeamMemberData {
  initials: string;
  name: string;
  role: string;
  bio: string;
  skills: readonly string[];
  stats: { num: string; label: string }[];
  github?: string;
  linkedin?: string;
}

function MemberCard({ member }: { member: TeamMemberData }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || isFlipped) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(500px circle at ${x * 100}% ${y * 100}%, rgba(88,99,242,0.1), transparent 50%)`;
        spotlightRef.current.style.opacity = "1";
      }
    },
    [isTouch, isFlipped],
  );

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    el.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 600);
  }, []);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className="relative transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ═══ FRONT — Photo-style card ═══ */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-[3/4.3] overflow-hidden rounded-[8px] border border-white/[0.06]"
          style={{ backfaceVisibility: "hidden", willChange: "transform" }}
        >
          {/* Spotlight */}
          <div
            ref={spotlightRef}
            className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300"
          />

          {/* Photo background — gradient placeholder simulating a dark portrait */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(160deg, rgba(26,26,46,0.95) 0%, rgba(88,99,242,0.15) 40%, rgba(139,47,239,0.1) 70%, rgba(10,10,10,0.98) 100%)`,
            }}
          />

          {/* Large initial as portrait placeholder */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="text-[120px] font-bold leading-none text-white/[0.04] sm:text-[140px]">
              {member.initials}
            </span>
          </div>

          {/* Noise texture overlay */}
          <div className="absolute inset-0 z-20 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />

          {/* Caption bar at bottom — name + role */}
          <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[rgba(10,10,10,0.95)] via-[rgba(10,10,10,0.7)] to-transparent px-6 pb-6 pt-20">
            <h3 className="text-xl font-semibold text-nodo-white sm:text-2xl">{member.name}</h3>
            <p className="mt-1 text-[13px] font-medium text-nodo-indigo">{member.role}</p>
            {/* Flip hint */}
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/30">
              <RotateCcw className="h-3 w-3" />
              {t.about.team_flip_hint}
            </div>
          </div>

          {/* Bottom gradient accent line */}
          <div className="absolute bottom-0 left-0 z-40 h-[2px] w-full bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan opacity-50" />
        </div>

        {/* ═══ BACK — Details ═══ */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[8px] border border-white/[0.06] bg-[rgba(26,26,46,0.7)] backdrop-blur-md"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex h-full flex-col justify-between p-6 sm:p-8">
            {/* Top — name + bio */}
            <div>
              <h3 className="mb-1 text-lg font-semibold text-nodo-white">{member.name}</h3>
              <p className="mb-5 text-[13px] font-medium text-nodo-indigo">{member.role}</p>
              <p className="mb-6 text-[13px] leading-relaxed text-nodo-gray-300">{member.bio}</p>

              {/* Skills */}
              <p className="mb-3 text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">Skills</p>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[3px] border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-nodo-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom — stats + links */}
            <div>
              {/* Quick stats */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                {member.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <span className="text-lg font-bold gradient-text">{s.num}</span>
                    <p className="text-[10px] text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="flex justify-center gap-3">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/[0.06] bg-white/[0.02] text-nodo-gray-400 transition-all duration-300 hover:border-nodo-indigo/30 hover:text-nodo-white"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/[0.06] bg-white/[0.02] text-nodo-gray-400 transition-all duration-300 hover:border-nodo-indigo/30 hover:text-nodo-white"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
              </div>

              {/* Flip hint */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/30">
                <RotateCcw className="h-3 w-3" />
                {t.about.team_flip_hint}
              </div>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-nodo-cyan via-nodo-indigo to-nodo-purple opacity-50" />
        </div>
      </div>
    </div>
  );
}

export default function TeamCard() {
  const { t } = useLanguage();

  const members: TeamMemberData[] = [
    {
      initials: "MG",
      name: "Mateo Gaviraghi",
      role: t.about.team_mateo,
      bio: t.about.team_mateo_bio,
      skills: t.about.team_mateo_skills,
      stats: [
        { num: "2+", label: "Años" },
        { num: "20+", label: "Proyectos" },
        { num: "30+", label: "Techs" },
      ],
      github: "https://github.com/MateoGaviraghi",
      linkedin: "https://www.linkedin.com/in/mateo-gaviraghi-2133482a8/",
    },
    {
      initials: "JG",
      name: "Justo González Viescas",
      role: t.about.team_justo,
      bio: t.about.team_justo_bio,
      skills: t.about.team_justo_skills,
      stats: [
        { num: "4+", label: "Años" },
        { num: "20+", label: "Proyectos" },
        { num: "30+", label: "Techs" },
      ],
      github: "https://github.com/JustoGV",
      linkedin: "https://www.linkedin.com/in/justo-gonzalez-viescas-11456b237/",
    },
  ];

  return (
    <section className="relative py-14 sm:py-24">
      <div className="section-line" />
      <div className="mx-auto max-w-5xl px-6 pt-16 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
            Equipo
          </p>
          <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>
            {t.about.team_title}
          </h2>
        </div>

        {/* Cards grid — 2 members */}
        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
          {members.map((member, i) => (
            <div key={member.name} data-reveal className="reveal-3d" style={{ transitionDelay: `${i * 150}ms` }}>
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
