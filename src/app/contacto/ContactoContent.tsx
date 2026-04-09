"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Mail, Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SOCIAL_LINKS } from "@/lib/constants";
import GradientButton from "@/components/ui/GradientButton";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

/* ── Word-by-word reveal ─────────────────────────────────── */
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

/* ── Contact card ────────────────────────────────────────── */
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  href: string;
  accentColor: string;
  glowRgba: string;
  delay: number;
}

function ContactCard({ icon, title, description, cta, href, accentColor, glowRgba, delay }: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col gap-4 rounded-lg border border-white/[0.06] bg-nodo-gray-900/60 p-6 backdrop-blur-[12px] transition-shadow duration-300 cursor-pointer"
      style={{ ["--glow" as string]: glowRgba }}
    >
      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${glowRgba.replace("0.12", "0.3")}, 0 8px 32px ${glowRgba}` }}
      />

      {/* Icon badge */}
      <div
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.06] transition-colors duration-300"
        style={{ background: accentColor }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-nodo-white">{title}</h3>
        <p className="text-xs leading-relaxed text-nodo-gray-400">{description}</p>
      </div>

      {/* CTA link */}
      <div className="mt-auto flex items-center gap-1.5 text-xs font-medium text-nodo-gray-300 transition-colors duration-200 group-hover:text-nodo-white">
        {cta}
        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </motion.a>
  );
}

/* ── WhatsApp SVG ────────────────────────────────────────── */
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
        opacity="0.6"
      />
    </svg>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function ContactoContent() {
  const { language, t } = useLanguage();
  const es = language === "es";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/xreovjrg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", service: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full min-h-[44px] rounded-lg border border-white/[0.06] bg-nodo-gray-900/60 px-4 py-3 text-sm text-nodo-white placeholder-nodo-gray-400 backdrop-blur-[12px] outline-none transition-all duration-200 focus:border-nodo-blue/50 focus:shadow-[0_0_0_3px_rgba(39,133,254,0.07)]";
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

  return (
    <div className="relative min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="flex min-h-[55vh] flex-col items-center justify-center px-4 pt-28 pb-12 text-center">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-nodo-blue/20 bg-nodo-blue/5 px-4 py-1.5 text-xs font-medium text-nodo-blue"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-nodo-blue" />
          {es ? "Disponibles ahora" : "Available now"}
        </motion.div>

        {/* Headline */}
        <h1 className="mb-4 text-6xl font-bold leading-none tracking-tight text-nodo-white md:text-8xl lg:text-9xl">
          <WordReveal text={t.contact.title} />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm text-base text-nodo-gray-400 md:text-lg"
        >
          {t.contact.subtitle}
        </motion.p>
      </section>

      {/* ── Contact cards + Form ──────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-28">
        {/* Cards row */}
        <div className="mb-14 grid gap-3 sm:grid-cols-3">
          <ContactCard
            icon={<WhatsAppIcon />}
            title="WhatsApp"
            description={
              es
                ? "Respuesta en minutos. La forma más directa de hablar con nosotros."
                : "Response in minutes. The most direct way to reach us."
            }
            cta={t.contact.whatsapp}
            href={SOCIAL_LINKS.whatsapp}
            accentColor="rgba(37,211,102,0.12)"
            glowRgba="rgba(37,211,102,0.12)"
            delay={0}
          />
          <ContactCard
            icon={<Video size={20} className="text-nodo-blue" />}
            title={es ? "Videollamada" : "Video call"}
            description={
              es
                ? "Agendá 30 minutos gratis para hablar en detalle de tu proyecto."
                : "Schedule 30 free minutes to discuss your project in detail."
            }
            cta={t.contact.calendly}
            href="https://calendly.com/nodotech"
            accentColor="rgba(39,133,254,0.12)"
            glowRgba="rgba(39,133,254,0.12)"
            delay={0.08}
          />
          <ContactCard
            icon={<Mail size={20} className="text-nodo-purple" />}
            title={es ? "Formulario" : "Form"}
            description={
              es
                ? "Contanos tu idea en detalle. Te respondemos en menos de 24hs."
                : "Tell us your idea in detail. We respond within 24h."
            }
            cta={es ? "Ir al formulario ↓" : "Go to form ↓"}
            href="#form"
            accentColor="rgba(139,47,239,0.12)"
            glowRgba="rgba(139,47,239,0.12)"
            delay={0.16}
          />
        </div>

        {/* Divider */}
        <div className="mb-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="text-xs text-nodo-gray-400">
            {es ? "o completá el formulario" : "or fill the form"}
          </span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>

        {/* Form card */}
        <motion.div
          id="form"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative scroll-mt-24 rounded-lg border border-white/[0.06] bg-nodo-gray-900/60 p-6 backdrop-blur-[12px] md:p-10"
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-lg bg-gradient-to-r from-transparent via-nodo-purple/50 to-transparent" />

          <AnimatePresence mode="wait">
            {/* ── Success state ── */}
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center gap-4 py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 220, damping: 14 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-[#00d68f]/20 bg-[#00d68f]/10"
                >
                  <CheckCircle size={30} className="text-[#00d68f]" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-semibold text-nodo-white"
                >
                  {es ? "¡Mensaje enviado!" : "Message sent!"}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="max-w-sm text-sm text-nodo-gray-400"
                >
                  {es
                    ? "Te respondemos en menos de 24hs. Mientras tanto, podés escribirnos directamente por WhatsApp."
                    : "We'll get back to you within 24h. In the meantime, you can reach us directly on WhatsApp."}
                </motion.p>
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm font-medium text-nodo-blue transition-colors duration-200 hover:text-nodo-cyan"
                >
                  {es ? "Ir a WhatsApp →" : "Go to WhatsApp →"}
                </motion.a>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="mb-1">
                  <h2 className="text-xl font-semibold text-nodo-white md:text-2xl">
                    {es ? "Contanos tu proyecto" : "Tell us about your project"}
                  </h2>
                  <p className="mt-1 text-sm text-nodo-gray-400">
                    {es
                      ? "Campos marcados con * son requeridos."
                      : "Fields marked with * are required."}
                  </p>
                </div>

                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
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
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`${inputCls} cursor-pointer`}
                    >
                      {serviceOpts.map((o) => (
                        <option key={o.value} value={o.value} className="bg-[#1a1a2e] text-nodo-white">
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
                      className={`${inputCls} cursor-pointer`}
                    >
                      {budgetOpts.map((o) => (
                        <option key={o.value} value={o.value} className="bg-[#1a1a2e] text-nodo-white">
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
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={
                      es
                        ? "Contanos sobre tu proyecto, qué necesitás y cualquier detalle relevante..."
                        : "Tell us about your project, what you need and any relevant details..."
                    }
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg border border-[#ff3d71]/20 bg-[#ff3d71]/5 px-4 py-3 text-sm text-[#ff3d71]"
                  >
                    <AlertCircle size={15} />
                    {es
                      ? "Hubo un error al enviar. Intentá de nuevo o escribinos por WhatsApp."
                      : "Something went wrong. Try again or message us on WhatsApp."}
                  </motion.div>
                )}

                {/* Submit row */}
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
                    {es ? "Te respondemos en menos de 24hs." : "We respond within 24h."}
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
