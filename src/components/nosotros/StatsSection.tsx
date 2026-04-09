"use client";

import { Briefcase, Users, Clock, Layers } from "lucide-react";
import ScrollCounter from "@/components/ui/ScrollCounter";
import { useLanguage } from "@/hooks/useLanguage";

const STATS = [
  { target: 20, suffix: "+", icon: Briefcase, key: "projects" as const },
  { target: 15, suffix: "+", icon: Users, key: "clients" as const },
  { target: 5, suffix: "+", icon: Clock, key: "years" as const },
  { target: 30, suffix: "+", icon: Layers, key: "technologies" as const },
];

export default function StatsSection() {
  const { t } = useLanguage();
  const stats = t.about.stats;

  return (
    <section className="relative py-16 sm:py-24">
      <div className="section-line" />
      <div className="mx-auto max-w-5xl px-6 pt-10 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                data-reveal
                className="reveal-el group relative text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon with glow */}
                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[6px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(88,99,242,0.12), rgba(39,133,254,0.08))",
                    animation: "glow-pulse 3s ease-in-out infinite",
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  <Icon className="h-6 w-6 text-nodo-white/80" />
                </div>

                {/* Counter */}
                <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                  <span className="gradient-text">
                    <ScrollCounter target={stat.target} suffix={stat.suffix} />
                  </span>
                </div>

                {/* Label */}
                <p className="mt-3 text-[13px] font-medium tracking-wide text-white/70">
                  {stats[stat.key]}
                </p>

                {/* Divider lines between items (desktop) */}
                {i < STATS.length - 1 && (
                  <div className="absolute top-1/2 right-0 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-nodo-indigo/20 to-transparent lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
