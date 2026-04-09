"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SOCIAL_LINKS } from "@/lib/constants";
import GradientButton from "@/components/ui/GradientButton";

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
function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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

/* ── Orbital contact card ───────────────────────────────── */
interface OrbitalCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  href: string;
  ringColor: string;
  ringColor2: string;
  glowRgba: string;
  delay: number;
}
function OrbitalCard({
  icon, title, description, cta, href,
  ringColor, ringColor2, glowRgba, delay,
}: OrbitalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Spinning conic ring CW */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl overflow-hidden"
        style={{ animation: "orbital-spin 7s linear infinite" }}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `conic-gradient(from 0deg, transparent 62%, ${ringColor}55 79%, ${ringColor2}88 89%, ${ringColor}44 95%, transparent)`,
          }}
        />
      </div>
      {/* Spinning conic ring CCW */}
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-xl overflow-hidden opacity-50"
        style={{ animation: "orbital-spin 13s linear infinite reverse" }}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `conic-gradient(from 180deg, transparent 70%, ${ringColor2}33 86%, ${ringColor}44 93%, transparent)`,
          }}
        />
      </div>

      {/* Card body */}
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="relative flex flex-col gap-5 rounded-xl border border-white/[0.06] bg-[rgba(16,16,32,0.92)] p-6 backdrop-blur-[14px] cursor-pointer"
      >
        {/* Hover glow overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 40px ${glowRgba}, 0 8px 40px ${glowRgba}` }}
        />
        {/* Icon */}
        <div
          className="relative flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
          style={{ background: glowRgba.replace("0.12", "0.14") }}
        >
          {icon}
          <span
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full animate-pulse"
            style={{ background: ringColor, boxShadow: `0 0 8px ${ringColor}` }}
          />
        </div>
        {/* Text */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-nodo-white">{title}</h3>
          <p className="text-[13px] leading-relaxed text-nodo-gray-400">{description}</p>
        </div>
        {/* CTA */}
        <div className="mt-auto flex items-center gap-2 text-[13px] font-medium text-nodo-gray-300 transition-colors duration-200 group-hover:text-nodo-white">
          {cta}
          <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </motion.a>
    </motion.div>
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

  /* IntersectionObserver — same as /servicios and /nosotros */
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

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

  const glowPos: Record<string, string> = {
    name: "20% 30%", email: "80% 30%",
    service: "25% 55%", budget: "75% 55%", message: "50% 75%",
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
    { value: "", label: es ? "Seleccioná un servicio" : "Select a service" },
    { value: "desarrollo", label: t.services.dev.title },
    { value: "wordpress", label: t.services.wordpress.title },
    { value: "ia", label: t.services.ia.title },
    { value: "uiux", label: t.services.uiux.title },
    { value: "ecommerce", label: t.services.ecommerce.title },
    { value: "mantenimiento", label: t.services.maintenance.title },
    { value: "otro", label: es ? "Otro" : "Other" },
  ];
  const budgetOpts = [
    { value: "", label: es ? "Seleccioná un rango" : "Select a range" },
    { value: "menos-500", label: "< USD 500" },
    { value: "500-2000", label: "USD 500 – 2.000" },
    { value: "2000-5000", label: "USD 2.000 – 5.000" },
    { value: "5000-mas", label: "USD 5.000+" },
    { value: "no-se", label: es ? "No lo sé aún" : "Not sure yet" },
  ];

  /* ═════════════════════════════════════════════════════
     RENDER
  ═════════════════════════════════════════════════════ */
  return (
    <>
      {/* ─── Hero — identical structure to /servicios and /nosotros ─── */}
      <section className="relative overflow-hidden pb-8 pt-28 sm:pb-12 sm:pt-40">
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          {/* Eyebrow */}
          <p
            data-reveal
            className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
          >
            {es ? "Contacto" : "Contact"}
          </p>

          {/* Main headline */}
          <h1
            data-reveal
            className="reveal-el mb-6 text-4xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-5xl lg:text-6xl"
            style={{ transitionDelay: "80ms" }}
          >
            {t.contact.title}
          </h1>

          {/* Subtitle */}
          <p
            data-reveal
            className="reveal-el mx-auto mb-10 max-w-2xl text-[16px] leading-relaxed text-white/80"
            style={{ transitionDelay: "200ms" }}
          >
            {t.contact.subtitle}
          </p>

          {/* Divider */}
          <div
            data-reveal
            className="reveal-el mx-auto h-px w-full max-w-4xl bg-linear-to-r from-transparent via-nodo-indigo/30 to-transparent"
            style={{ transitionDelay: "260ms" }}
          />
        </div>
      </section>

      {/* ─── Contact Methods — 3 Orbital Cards ─── */}
      <section className="relative py-20 sm:py-28">
        <div className="section-line" />
        <div className="mx-auto max-w-5xl px-6 pt-12 lg:px-8">

          <div className="mb-12 text-center">
            <p
              data-reveal
              className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            >
              {es ? "Elegí cómo conectar" : "Choose how to connect"}
            </p>
            <h2
              data-reveal
              className="reveal-el text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl"
              style={{ transitionDelay: "80ms" }}
            >
              {es ? "Tres formas de empezar." : "Three ways to start."}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <OrbitalCard
              icon={<WhatsAppIcon />}
              title="WhatsApp"
              description={
                es
                  ? "Respuesta en minutos. La forma más directa de hablar con nosotros."
                  : "Response in minutes. The most direct way to reach us."
              }
              cta={es ? "Escribir ahora" : "Write now"}
              href={SOCIAL_LINKS.whatsapp}
              ringColor="#25D366"
              ringColor2="#00c1f4"
              glowRgba="rgba(37,211,102,0.12)"
              delay={0}
            />
            <OrbitalCard
              icon={<Video size={20} className="text-nodo-blue" />}
              title={es ? "Videollamada" : "Video call"}
              description={
                es
                  ? "Agendá 30 minutos gratis para hablar en detalle de tu proyecto."
                  : "Schedule 30 free minutes to discuss your project in detail."
              }
              cta={es ? "Agendar llamada" : "Schedule call"}
              href="https://calendly.com/nodotech"
              ringColor="#2785fe"
              ringColor2="#5863f2"
              glowRgba="rgba(39,133,254,0.12)"
              delay={0.1}
            />
            <OrbitalCard
              icon={<Mail size={20} className="text-nodo-purple" />}
              title={es ? "Formulario" : "Form"}
              description={
                es
                  ? "Contanos tu idea en detalle. Te respondemos en menos de 24hs."
                  : "Tell us your idea in detail. We respond within 24h."
              }
              cta={es ? "Ir al formulario ↓" : "Go to form ↓"}
              href="#form"
              ringColor="#8b2fef"
              ringColor2="#5863f2"
              glowRgba="rgba(139,47,239,0.12)"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ─── Form — Reactive glassmorphic ─── */}
      <section className="relative pb-32 sm:pb-44">
        <div className="section-line" />
        <div className="mx-auto max-w-3xl px-6 pt-12 lg:px-8">

          <div className="mb-10 text-center">
            <p
              data-reveal
              className="reveal-el text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
            >
              {es ? "o completá el formulario" : "or fill the form"}
            </p>
          </div>

          {/* Form card */}
          <motion.div
            id="form"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative scroll-mt-28 overflow-hidden rounded-xl border border-white/[0.07]"
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
                      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 240, damping: 14 }}
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
                    {es ? "¡Mensaje enviado!" : "Message sent!"}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 }}
                    className="max-w-sm text-sm text-nodo-gray-400"
                  >
                    {es
                      ? "Te respondemos en menos de 24hs. Mientras tanto, podés escribirnos directamente por WhatsApp."
                      : "We'll get back to you within 24h. In the meantime, feel free to reach us on WhatsApp."}
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
                    {es ? "Ir a WhatsApp" : "Go to WhatsApp"}
                    <ArrowRight size={13} />
                  </motion.a>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 p-6 md:p-10"
                >
                  <div className="mb-1">
                    <h2 className="text-xl font-semibold text-nodo-white md:text-2xl">
                      {es ? "Contanos tu proyecto" : "Tell us about your project"}
                    </h2>
                    <p className="mt-1 text-sm text-nodo-gray-400">
                      {es ? "Campos con * son requeridos." : "Fields marked with * are required."}
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelCls}>
                        {t.contact.form.name} <span className="text-nodo-purple">*</span>
                      </label>
                      <input
                        id="name" name="name" type="text" required autoComplete="name"
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
                        id="email" name="email" type="email" required autoComplete="email"
                        placeholder={es ? "tu@email.com" : "your@email.com"}
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Service + Budget */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="service" className={labelCls}>
                        {t.contact.form.service}
                      </label>
                      <select
                        id="service" name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("service")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputCls} cursor-pointer`}
                      >
                        {serviceOpts.map((o) => (
                          <option key={o.value} value={o.value} className="bg-nodo-gray-900 text-nodo-white">
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
                        id="budget" name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("budget")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputCls} cursor-pointer`}
                      >
                        {budgetOpts.map((o) => (
                          <option key={o.value} value={o.value} className="bg-nodo-gray-900 text-nodo-white">
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelCls}>
                      {t.contact.form.message} <span className="text-nodo-purple">*</span>
                    </label>
                    <textarea
                      id="message" name="message" required rows={5}
                      placeholder={
                        es
                          ? "Contanos sobre tu proyecto, qué necesitás y cualquier detalle relevante..."
                          : "Tell us about your project, what you need and any relevant details..."
                      }
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
                          color: formData.message.length > 20
                            ? "rgba(88,99,242,0.7)"
                            : "rgba(136,136,170,0.45)",
                        }}
                      >
                        {formData.message.length}{es ? " caracteres" : " chars"}
                      </span>
                    </div>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-lg border border-nodo-error/20 bg-nodo-error/5 px-4 py-3 text-sm text-nodo-error"
                    >
                      <AlertCircle size={15} />
                      {es
                        ? "Hubo un error al enviar. Intentá de nuevo o escribinos por WhatsApp."
                        : "Something went wrong. Try again or message us on WhatsApp."}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <GradientButton type="submit" disabled={status === "loading"}>
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {es ? "Enviando..." : "Sending..."}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={14} />
                          {t.contact.form.submit}
                        </span>
                      )}
                    </GradientButton>
                    <p className="text-xs text-nodo-gray-400">
                      {es ? "Respondemos en menos de 24hs." : "We respond within 24h."}
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
