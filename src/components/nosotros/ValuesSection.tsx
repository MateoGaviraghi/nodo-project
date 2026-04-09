"use client";

import { Code, Palette, MessageCircle, Target } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import TiltCard from "@/components/ui/TiltCard";

const VALUE_ICONS = [Code, Palette, MessageCircle, Target] as const;
const VALUE_KEYS = ["clean_code", "design", "communication", "results"] as const;

export default function ValuesSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-14 sm:py-24">
      <div className="section-line" />
      <div className="mx-auto max-w-6xl px-6 pt-12 sm:pt-16 lg:px-8">
        {/* Header — tight spacing to cards */}
        <div className="mb-8 sm:mb-12 text-center">
          <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
            Valores
          </p>
          <h2
            data-reveal
            className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl"
            style={{ transitionDelay: "80ms" }}
          >
            {t.about.values_title}
          </h2>
        </div>

        {/* Cards grid — bigger cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {VALUE_KEYS.map((key, i) => {
            const Icon = VALUE_ICONS[i];
            const descKey = `${key}_desc` as keyof typeof t.about.values;
            return (
              <div
                key={key}
                data-reveal
                className="reveal-3d"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <TiltCard className="h-full p-7 sm:p-9">
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[4px]"
                    style={{ background: "linear-gradient(135deg, rgba(88,99,242,0.12), rgba(39,133,254,0.08))" }}
                  >
                    <Icon className="h-5 w-5 text-nodo-white/80" />
                  </div>
                  <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">
                    0{i + 1}
                  </p>
                  <h3 className="mb-3 text-lg font-semibold text-nodo-white sm:text-xl">
                    {t.about.values[key]}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-nodo-gray-400 sm:text-[15px]">
                    {t.about.values[descKey]}
                  </p>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
