"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Send, Loader2, Star } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

type Status = "idle" | "loading" | "success" | "error";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default function FeedbackForm() {
  const { language, t } = useLanguage();
  const tf = t.feedback;
  const [form, setForm] = useState({ name: "", email: "", company: "", opinion: "" });
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inputCls =
    "w-full min-h-[44px] rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-nodo-white placeholder-nodo-gray-400 outline-none transition-all duration-200 focus:border-nodo-blue/50 focus:shadow-[0_0_0_3px_rgba(39,133,254,0.07)] focus:bg-white/[0.05]";
  const labelCls = "mb-1.5 block text-xs font-medium text-nodo-gray-300";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.opinion.trim()) return;
    // Email is optional but if provided must be valid
    if (form.email.trim() && !isEmail(form.email.trim())) {
      setErrorMsg(tf.error_invalid_email);
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim() || undefined,
          company: form.company.trim() || undefined,
          opinion: form.opinion.trim(),
          rating: rating ?? undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || tf.error_generic);
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", company: "", opinion: "" });
      setRating(null);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : tf.error_generic);
      setStatus("error");
    }
  }

  const displayedRating = hoverRating ?? rating ?? 0;

  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-xl">
      {/* Animated conic-gradient border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-60"
        style={{
          background:
            "conic-gradient(from var(--border-angle, 0deg), transparent 40%, rgba(139,47,239,0.3) 50%, rgba(0,193,244,0.25) 55%, transparent 60%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          animation: "rotate-border 5s linear infinite",
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/[0.06]" />

      <div
        className="relative rounded-xl p-6 sm:p-10"
        style={{ background: "rgba(18,18,36,0.92)", backdropFilter: "blur(14px)" }}
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nodo-purple/60 to-transparent" />

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5 px-4 py-12 text-center"
            >
              <div className="relative flex h-40 w-40 items-center justify-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-nodo-success/25"
                    style={{
                      width: `${i * 48}px`,
                      height: `${i * 48}px`,
                      animation: `pulse-glow ${i * 0.8 + 1}s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 240, damping: 14 }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-nodo-success/20 bg-nodo-success/10"
                >
                  <CheckCircle size={26} className="text-nodo-success" />
                </motion.div>
              </div>
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-xl font-semibold text-nodo-white sm:text-2xl"
              >
                {tf.success_title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="max-w-sm text-sm text-nodo-gray-400"
              >
                {tf.success_text}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                type="button"
                onClick={() => setStatus("idle")}
                className="text-[12px] font-medium text-nodo-gray-500 underline-offset-4 transition-colors hover:text-nodo-gray-300 hover:underline"
              >
                {tf.success_again}
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5"
            >
              {/* Form header */}
              <div>
                <h3 className="text-lg font-semibold text-nodo-white sm:text-xl">
                  {tf.form_title}
                </h3>
                <p className="mt-1 text-[13px] text-nodo-gray-400">{tf.form_subtitle}</p>
              </div>

              {/* Name + Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-name" className={labelCls}>
                    {tf.label_name} <span className="text-nodo-purple">*</span>
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={tf.ph_name}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputCls}
                    maxLength={120}
                  />
                </div>
                <div>
                  <label htmlFor="f-email" className={labelCls}>
                    {tf.label_email}
                  </label>
                  <input
                    id="f-email"
                    type="email"
                    autoComplete="email"
                    placeholder={tf.ph_email}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Company or role */}
              <div>
                <label htmlFor="f-company" className={labelCls}>
                  {tf.label_company}
                </label>
                <input
                  id="f-company"
                  type="text"
                  placeholder={tf.ph_company}
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className={inputCls}
                  maxLength={160}
                />
              </div>

              {/* Rating — minimalist Nodo style */}
              <div>
                <label className={labelCls}>{tf.label_rating}</label>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center gap-1.5"
                    onMouseLeave={() => setHoverRating(null)}
                    role="radiogroup"
                    aria-label={tf.label_rating}
                  >
                    {[1, 2, 3, 4, 5].map((n) => {
                      const active = displayedRating >= n;
                      return (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={rating === n ? "true" : "false"}
                          aria-label={`${n} ${n === 1 ? "star" : "stars"}`}
                          onClick={() => setRating(n === rating ? null : n)}
                          onMouseEnter={() => setHoverRating(n)}
                          className="group cursor-pointer p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nodo-indigo/40 rounded"
                        >
                          <Star
                            size={22}
                            strokeWidth={1.5}
                            className={`transition-all duration-200 ease-out group-hover:scale-110 ${
                              active
                                ? "fill-nodo-cyan text-nodo-cyan drop-shadow-[0_0_6px_rgba(0,193,244,0.35)]"
                                : "fill-transparent text-nodo-gray-600"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span
                    className="text-[11px] tabular-nums transition-colors duration-200"
                    style={{
                      color: rating ? "rgba(0,193,244,0.75)" : "rgba(136,136,170,0.45)",
                    }}
                  >
                    {rating ? `${rating}/5` : tf.rating_hint}
                  </span>
                </div>
              </div>

              {/* Opinion */}
              <div>
                <label htmlFor="f-opinion" className={labelCls}>
                  {tf.label_opinion} <span className="text-nodo-purple">*</span>
                </label>
                <textarea
                  id="f-opinion"
                  required
                  rows={5}
                  placeholder={tf.ph_opinion}
                  value={form.opinion}
                  onChange={(e) => setForm((f) => ({ ...f, opinion: e.target.value }))}
                  className={`${inputCls} resize-none`}
                  maxLength={1500}
                />
                <div className="mt-1.5 flex justify-end">
                  <span
                    className="text-[11px] tabular-nums transition-colors duration-200"
                    style={{
                      color:
                        form.opinion.length > 20
                          ? "rgba(88,99,242,0.7)"
                          : "rgba(136,136,170,0.45)",
                    }}
                  >
                    {form.opinion.length}/1500
                  </span>
                </div>
              </div>

              {/* Error */}
              {status === "error" && errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-nodo-error/20 bg-nodo-error/5 px-4 py-3 text-sm text-nodo-error"
                >
                  <AlertCircle size={15} />
                  {errorMsg}
                </motion.div>
              )}

              {/* Submit */}
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] text-nodo-gray-500">{tf.privacy}</p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-[3px] px-7 py-3 text-[13px] font-semibold tracking-wide text-nodo-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%)",
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      {language === "es" ? "Enviando..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      {tf.submit}
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
