"use client";

import { useRef, useEffect } from "react";
import { Video, Mail, ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SOCIAL_LINKS, waLink, emailMailto, getContactDefaults } from "@/lib/constants";
import GradientButton from "@/components/ui/GradientButton";
import TiltCard from "@/components/ui/TiltCard";
import BookingWidget from "@/components/contacto/BookingWidget";

/* ── WhatsApp SVG ───────────────────────────────────────── */
function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="#25D366"
      />
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.107-1.138l-.293-.176-2.867.852.852-2.867-.176-.293A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
        fill="#25D366"
        opacity="0.5"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════ */
export default function ContactoContent() {
  const { language, t } = useLanguage();
  const es = language === "es";
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* IntersectionObserver — reveal system */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  /* ── Prefilled contact links (shared helper) ── */
  const defaults = getContactDefaults(language);
  const waHref = waLink(SOCIAL_LINKS.whatsapp, defaults.waGeneric);
  const emailHref = emailMailto(SOCIAL_LINKS.email, defaults.emailSubject, defaults.emailBody);

  /* ── Contact method configs ── */
  const methods = [
    {
      icon: <WhatsAppIcon />,
      title: "WhatsApp",
      description: t.contact.wa_desc,
      cta: t.contact.wa_cta,
      href: waHref,
      accentColor: "#25D366",
      iconBg: "rgba(37,211,102,0.12)",
    },
    {
      icon: <Video size={20} className="text-nodo-blue" />,
      title: es ? "Videollamada" : "Video call",
      description: t.contact.video_desc,
      cta: t.contact.video_cta,
      href: "#agendar",
      accentColor: "#2785fe",
      iconBg: "rgba(39,133,254,0.12)",
    },
    {
      icon: <Mail size={20} className="text-nodo-purple" />,
      title: "Email",
      description: t.contact.email_desc,
      cta: t.contact.email_cta,
      href: emailHref,
      accentColor: "#8b2fef",
      iconBg: "rgba(139,47,239,0.12)",
    },
  ];

  /* ═════════════════════════════════════════════════════
     RENDER
  ═════════════════════════════════════════════════════ */
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pb-8 pt-28 sm:pb-12 sm:pt-40">
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p
            data-reveal
            className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
          >
            {es ? "Contacto" : "Contact"}
          </p>
          <h1
            data-reveal
            className="reveal-el mb-6 text-4xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-5xl lg:text-6xl"
            style={{ transitionDelay: "80ms" }}
          >
            {t.contact.title}
          </h1>
          <p
            data-reveal
            className="reveal-el mx-auto mb-10 max-w-2xl text-[16px] leading-relaxed text-white/80"
            style={{ transitionDelay: "200ms" }}
          >
            {t.contact.subtitle}
          </p>
          <div
            data-reveal
            className="reveal-el mx-auto h-px w-full max-w-4xl bg-linear-to-r from-transparent via-nodo-indigo/30 to-transparent"
            style={{ transitionDelay: "260ms" }}
          />
        </div>
      </section>

      {/* ─── CONTACT METHODS — 3 TiltCards with reveal-3d ─── */}
      <section className="relative py-14 sm:py-24">
        <div className="section-line" />
        <div className="mx-auto max-w-6xl px-6 pt-12 sm:pt-16 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center">
            <p
              data-reveal
              className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            >
              {t.contact.methods_eyebrow}
            </p>
            <h2
              data-reveal
              className="reveal-el mb-4 text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl"
              style={{ transitionDelay: "80ms" }}
            >
              {t.contact.methods_title}
            </h2>
            <p
              data-reveal
              className="reveal-el mx-auto max-w-lg text-[15px] leading-relaxed text-nodo-gray-400"
              style={{ transitionDelay: "160ms" }}
            >
              {t.contact.methods_subtitle}
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid gap-5 sm:grid-cols-3">
            {methods.map((m, i) => (
              <div
                key={m.title}
                data-reveal
                className="reveal-3d"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <TiltCard className="h-full">
                  <a
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group/card flex h-full flex-col gap-5 p-6 sm:p-7"
                  >
                    {/* Step number */}
                    <p className="text-[11px] font-medium tracking-[0.2em] text-white/30 uppercase">
                      {String(i + 1).padStart(2, "0")} / 03
                    </p>

                    {/* Icon */}
                    <div className="relative">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover/card:scale-110"
                        style={{ background: m.iconBg }}
                      >
                        {m.icon}
                      </div>
                      {/* Pulse dot */}
                      <span
                        className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full animate-pulse"
                        style={{ background: m.accentColor, boxShadow: `0 0 8px ${m.accentColor}` }}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-base font-semibold text-nodo-white sm:text-lg">{m.title}</h3>
                      <p className="text-[13px] leading-relaxed text-nodo-gray-400 sm:text-[14px]">
                        {m.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto flex items-center gap-2 text-[13px] font-medium text-nodo-gray-300 transition-colors duration-200 group-hover/card:text-nodo-white">
                      {m.cta}
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-200 group-hover/card:translate-x-1"
                      />
                    </div>
                  </a>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOOKING — Google Calendar integrated ─── */}
      <BookingWidget />

      {/* ─── CTA FINAL — Gradient mesh + bold message ─── */}
      <section className="relative py-16 sm:py-36">
        <div className="section-line" />

        {/* Gradient mesh background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full opacity-[0.04]"
            style={{
              background: "radial-gradient(circle, #8b2fef, transparent 70%)",
              filter: "blur(80px)",
              animation: "mesh-cta-1 25s ease-in-out infinite",
            }}
          />
          <div
            className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full opacity-[0.035]"
            style={{
              background: "radial-gradient(circle, #2785fe, transparent 70%)",
              filter: "blur(70px)",
              animation: "mesh-cta-2 30s ease-in-out infinite",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, #00c1f4, transparent 70%)",
              filter: "blur(60px)",
              animation: "mesh-cta-3 20s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pt-10 sm:pt-16 lg:px-8">
          <div className="text-center">
            <h2
              data-reveal
              className="reveal-el mb-5 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl"
            >
              {t.contact.cta_title}
            </h2>
            <p
              data-reveal
              className="reveal-el mx-auto mb-10 max-w-md text-[15px] leading-relaxed text-white/70"
              style={{ transitionDelay: "80ms" }}
            >
              {t.contact.cta_subtitle}
            </p>
            <div
              data-reveal
              className="reveal-el flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              style={{ transitionDelay: "160ms" }}
            >
              <GradientButton href={waHref} className="w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  <MessageCircle size={15} />
                  {t.contact.whatsapp}
                </span>
              </GradientButton>
              <a
                href="#agendar"
                className="group inline-flex items-center gap-2 rounded-[3px] border border-white/[0.08] bg-white/[0.03] px-7 py-3 text-[13px] font-medium tracking-wide text-nodo-white transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
              >
                <Video size={15} />
                {t.contact.cta_book}
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
