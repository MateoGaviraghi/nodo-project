"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SOCIAL_LINKS } from "@/lib/constants";
import GradientButton from "@/components/ui/GradientButton";
import TiltCard from "@/components/ui/TiltCard";

/* ── Types ─────────────────────────────────────────────── */
type FormStatus = "idle" | "loading" | "success" | "error";
interface FormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

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

  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", service: "", budget: "", message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  /* Re-observe after form status changes (success → idle) */
  useEffect(() => {
    if (!observerRef.current) return;
    document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => {
      observerRef.current?.observe(el);
    });
  }, [status]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFormData((p) => ({ ...p, [e.target.name]: e.target.value })),
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/xreovjrg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setFormData({ name: "", email: "", service: "", budget: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  /* ── Form glow positions ── */
  const glowPos: Record<string, string> = {
    name: "20% 30%", email: "80% 30%",
    service: "25% 55%", budget: "75% 55%", message: "50% 78%",
  };
  const glowColor: Record<string, string> = {
    name: "rgba(39,133,254,0.07)", email: "rgba(0,193,244,0.07)",
    service: "rgba(88,99,242,0.07)", budget: "rgba(139,47,239,0.07)",
    message: "rgba(39,133,254,0.09)",
  };

  const inputCls =
    "w-full min-h-[44px] rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-nodo-white placeholder-nodo-gray-400 outline-none transition-all duration-200 focus:border-nodo-blue/50 focus:shadow-[0_0_0_3px_rgba(39,133,254,0.07)] focus:bg-white/[0.05]";
  const labelCls = "mb-1.5 block text-xs font-medium text-nodo-gray-300";

  const serviceOpts = [
    { value: "", label: es ? "Seleccion\u00e1 un servicio" : "Select a service" },
    { value: "desarrollo", label: t.services.dev.title },
    { value: "wordpress", label: t.services.wordpress.title },
    { value: "ia", label: t.services.ia.title },
    { value: "uiux", label: t.services.uiux.title },
    { value: "ecommerce", label: t.services.ecommerce.title },
    { value: "mantenimiento", label: t.services.maintenance.title },
    { value: "otro", label: es ? "Otro" : "Other" },
  ];
  const budgetOpts = [
    { value: "", label: es ? "Seleccion\u00e1 un rango" : "Select a range" },
    { value: "menos-500", label: "< USD 500" },
    { value: "500-2000", label: "USD 500 \u2013 2.000" },
    { value: "2000-5000", label: "USD 2.000 \u2013 5.000" },
    { value: "5000-mas", label: "USD 5.000+" },
    { value: "no-se", label: es ? "No lo s\u00e9 a\u00fan" : "Not sure yet" },
  ];

  /* ── Contact method configs ── */
  const methods = [
    {
      icon: <WhatsAppIcon />,
      title: "WhatsApp",
      description: t.contact.wa_desc,
      cta: t.contact.wa_cta,
      href: SOCIAL_LINKS.whatsapp,
      accentColor: "#25D366",
      iconBg: "rgba(37,211,102,0.12)",
    },
    {
      icon: <Video size={20} className="text-nodo-blue" />,
      title: es ? "Videollamada" : "Video call",
      description: t.contact.video_desc,
      cta: t.contact.video_cta,
      href: "https://calendly.com/nodotech",
      accentColor: "#2785fe",
      iconBg: "rgba(39,133,254,0.12)",
    },
    {
      icon: <Mail size={20} className="text-nodo-purple" />,
      title: es ? "Formulario" : "Form",
      description: t.contact.form_card_desc,
      cta: t.contact.form_card_cta,
      href: "#form",
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

      {/* ─── FORM SECTION — Progressive reveal + animated border ─── */}
      <section className="relative pb-16 sm:pb-28">
        <div className="section-line" />
        <div className="mx-auto max-w-3xl px-6 pt-12 sm:pt-16 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-10 text-center">
            <p
              data-reveal
              className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            >
              {t.contact.form_eyebrow}
            </p>
            <h2
              data-reveal
              className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl"
              style={{ transitionDelay: "80ms" }}
            >
              {t.contact.form_title}
            </h2>
          </div>

          {/* Form card — reveal-3d with animated gradient border */}
          <div
            id="form"
            data-reveal
            className="reveal-3d relative scroll-mt-28 overflow-hidden rounded-xl"
            style={{ transitionDelay: "160ms" }}
          >
            {/* Animated rotating gradient border */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl opacity-60"
              style={{
                background:
                  "conic-gradient(from var(--border-angle, 0deg), transparent 40%, rgba(88,99,242,0.35) 50%, rgba(39,133,254,0.25) 55%, transparent 60%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "1px",
                animation: "rotate-border 4s linear infinite",
              }}
            />

            {/* Static border fallback */}
            <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/[0.06]" />

            {/* Reactive glow background */}
            <div
              className="relative rounded-xl"
              style={{
                transition: "background 0.45s ease",
                background: focusedField
                  ? `radial-gradient(ellipse 55% 45% at ${glowPos[focusedField]}, ${glowColor[focusedField]}, transparent 65%), rgba(18,18,36,0.92)`
                  : "rgba(18,18,36,0.92)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nodo-purple/60 to-transparent" />

              <AnimatePresence mode="wait">
                {/* ── Success state ── */}
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center gap-5 px-8 py-20 text-center"
                  >
                    {/* Pulse rings */}
                    <div className="relative flex items-center justify-center">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="absolute rounded-full border border-nodo-success/25"
                          style={{
                            width: `${i * 52}px`,
                            height: `${i * 52}px`,
                            animation: `pulse-glow ${i * 0.8 + 1}s ease-in-out ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1,
                          type: "spring",
                          stiffness: 240,
                          damping: 14,
                        }}
                        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-nodo-success/20 bg-nodo-success/10"
                      >
                        <CheckCircle size={28} className="text-nodo-success" />
                      </motion.div>
                    </div>
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="text-xl font-semibold text-nodo-white"
                    >
                      {t.contact.form_success_title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32 }}
                      className="max-w-sm text-sm text-nodo-gray-400"
                    >
                      {t.contact.form_success_text}
                    </motion.p>
                    <motion.a
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.38 }}
                      href={SOCIAL_LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-nodo-blue transition-colors hover:text-nodo-cyan"
                    >
                      {t.contact.form_success_wa}
                      <ArrowRight size={13} />
                    </motion.a>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-0 p-6 md:p-10"
                  >
                    {/* Form header */}
                    <div
                      data-reveal
                      className="reveal-el mb-6"
                      style={{ transitionDelay: "240ms" }}
                    >
                      <h3 className="text-xl font-semibold text-nodo-white md:text-2xl">
                        {es ? "Contanos tu proyecto" : "Tell us about your project"}
                      </h3>
                      <p className="mt-1 text-sm text-nodo-gray-400">
                        {t.contact.form_subtitle}
                      </p>
                    </div>

                    {/* Name + Email — stagger row 1 */}
                    <div
                      data-reveal
                      className="reveal-el mb-5 grid gap-4 sm:grid-cols-2"
                      style={{ transitionDelay: "320ms" }}
                    >
                      <div>
                        <label htmlFor="name" className={labelCls}>
                          {t.contact.form.name} <span className="text-nodo-purple">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder={es ? "Tu nombre" : "Your name"}
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelCls}>
                          {t.contact.form.email} <span className="text-nodo-purple">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder={es ? "tu@email.com" : "your@email.com"}
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Service + Budget — stagger row 2 */}
                    <div
                      data-reveal
                      className="reveal-el mb-5 grid gap-4 sm:grid-cols-2"
                      style={{ transitionDelay: "400ms" }}
                    >
                      <div>
                        <label htmlFor="service" className={labelCls}>
                          {t.contact.form.service}
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("service")}
                          onBlur={() => setFocusedField(null)}
                          className={`${inputCls} cursor-pointer`}
                        >
                          {serviceOpts.map((o) => (
                            <option
                              key={o.value}
                              value={o.value}
                              className="bg-nodo-gray-900 text-nodo-white"
                            >
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className={labelCls}>
                          {t.contact.form.budget}
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("budget")}
                          onBlur={() => setFocusedField(null)}
                          className={`${inputCls} cursor-pointer`}
                        >
                          {budgetOpts.map((o) => (
                            <option
                              key={o.value}
                              value={o.value}
                              className="bg-nodo-gray-900 text-nodo-white"
                            >
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message — stagger row 3 */}
                    <div
                      data-reveal
                      className="reveal-el mb-5"
                      style={{ transitionDelay: "480ms" }}
                    >
                      <label htmlFor="message" className={labelCls}>
                        {t.contact.form.message} <span className="text-nodo-purple">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder={t.contact.form_project_placeholder}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputCls} resize-none`}
                      />
                      <div className="mt-1.5 flex justify-end">
                        <span
                          className="text-[11px] tabular-nums transition-colors duration-200"
                          style={{
                            color:
                              formData.message.length > 20
                                ? "rgba(88,99,242,0.7)"
                                : "rgba(136,136,170,0.45)",
                          }}
                        >
                          {formData.message.length}
                          {es ? " caracteres" : " chars"}
                        </span>
                      </div>
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 flex items-center gap-2 rounded-lg border border-nodo-error/20 bg-nodo-error/5 px-4 py-3 text-sm text-nodo-error"
                      >
                        <AlertCircle size={15} />
                        {t.contact.form_error}
                      </motion.div>
                    )}

                    {/* Submit — stagger row 4 */}
                    <div
                      data-reveal
                      className="reveal-el flex flex-col items-start gap-3 sm:flex-row sm:items-center"
                      style={{ transitionDelay: "560ms" }}
                    >
                      <GradientButton type="submit" disabled={status === "loading"}>
                        {status === "loading" ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="h-4 w-4 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            {t.contact.form_sending}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send size={14} />
                            {t.contact.form.submit}
                          </span>
                        )}
                      </GradientButton>
                      <p className="text-xs text-nodo-gray-400">
                        {t.contact.form_response_time}
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

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
              <GradientButton href={SOCIAL_LINKS.whatsapp} className="w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  <MessageCircle size={15} />
                  {t.contact.whatsapp}
                </span>
              </GradientButton>
              <a
                href="https://calendly.com/nodotech"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-[3px] border border-white/[0.08] bg-white/[0.03] px-7 py-3 text-[13px] font-medium tracking-wide text-nodo-white transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
              >
                <Video size={15} />
                {t.contact.calendly}
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
