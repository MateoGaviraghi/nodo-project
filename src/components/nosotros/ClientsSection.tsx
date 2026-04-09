"use client";

import { useLanguage } from "@/hooks/useLanguage";
import DepthMarquee from "@/components/ui/DepthMarquee";

export default function ClientsSection() {
  const { t } = useLanguage();
  const clients = t.about.clients;

  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="section-line" />
      <div className="pt-8 sm:pt-12">
        {/* Header */}
        <div className="mb-12 px-6 text-center">
          <p data-reveal className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
            Clientes
          </p>
          <h2 data-reveal className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl" style={{ transitionDelay: "80ms" }}>
            {t.about.clients_title}
          </h2>
        </div>

        {/* Logo Marquee */}
        <div data-reveal className="reveal-el" style={{ transitionDelay: "150ms" }}>
          <DepthMarquee speed={0.3}>
            {clients.map((client) => (
              <div
                key={client}
                className="group flex min-w-[180px] shrink-0 items-center justify-center rounded-[6px] border border-white/[0.06] bg-[rgba(26,26,46,0.3)] px-8 py-5 transition-all duration-500 hover:border-nodo-indigo/30 hover:bg-[rgba(26,26,46,0.5)] sm:min-w-[200px]"
              >
                {/* Stylized company name as placeholder */}
                <span className="text-[15px] font-semibold tracking-wide text-white/30 transition-all duration-500 group-hover:text-white/80 group-hover:scale-105">
                  {client}
                </span>
              </div>
            ))}
          </DepthMarquee>
        </div>
      </div>
    </section>
  );
}
