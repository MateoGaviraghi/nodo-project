"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Video,
  Download,
  MessageCircle,
  Mail,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

type Slot = { startIso: string; endIso: string; label: string };
type Step = "date" | "slot" | "form" | "success";

interface BookingResult {
  meetLink: string | null;
  htmlLink?: string | null;
  addToCalendarUrl: string;
  icsUrl: string;
  waShareUrl: string;
  dateLabel: string;
  timeLabel: string;
  timezoneLabel: string;
  startIso: string;
  endIso: string;
}

function fmtDateYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function sameYmd(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function formatSlotDate(iso: string, lang: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(lang === "es" ? "es-AR" : "en-US", {
    weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit",
  }).format(d);
}

export default function BookingWidget() {
  const { language, t } = useLanguage();
  const tc = t.contact;
  const weekdays = tc.booking_weekdays as readonly string[];
  const months = tc.booking_months as readonly string[];

  const slotCacheRef = useRef<Map<string, Slot[]>>(new Map());

  const [step, setStep] = useState<Step>("date");
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", topic: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);

  // ── Calendar grid (7x6) ───────────────────────────────
  const calendarCells = useMemo(() => {
    const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const cells: { date: Date | null; inMonth: boolean }[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push({ date: null, inMonth: false });
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d), inMonth: true });
    }
    while (cells.length < 42) cells.push({ date: null, inMonth: false });
    return cells;
  }, [viewMonth]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxBookableDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const canGoPrevMonth = useMemo(() => {
    const firstOfCurrent = new Date(today.getFullYear(), today.getMonth(), 1);
    return viewMonth.getTime() > firstOfCurrent.getTime();
  }, [viewMonth, today]);

  // ── Load slots when selectedDate changes (cached per day) ──
  useEffect(() => {
    if (!selectedDate) return;
    const ymd = fmtDateYmd(selectedDate);
    const cached = slotCacheRef.current.get(ymd);
    if (cached) {
      setSlots(cached);
      setSlotsError(null);
      setSlotsLoading(false);
      return;
    }
    let cancelled = false;
    setSlotsLoading(true);
    setSlotsError(null);
    setSlots([]);
    fetch(`/api/availability?date=${ymd}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setSlotsError(data.error);
        } else {
          const list: Slot[] = data.slots || [];
          slotCacheRef.current.set(ymd, list);
          setSlots(list);
        }
      })
      .catch((e) => {
        if (!cancelled) setSlotsError(String(e));
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });
    return () => { cancelled = true; };
  }, [selectedDate]);

  const selectDate = useCallback((d: Date) => {
    if (d < today || d > maxBookableDate) return;
    setSelectedDate(d);
    setSelectedSlot(null);
    setStep("slot");
  }, [today, maxBookableDate]);

  const selectSlot = useCallback((s: Slot) => {
    setSelectedSlot(s);
    setStep("form");
  }, []);

  const resetAll = useCallback(() => {
    setStep("date");
    setSelectedDate(null);
    setSelectedSlot(null);
    setSlots([]);
    setForm({ name: "", email: "", whatsapp: "", topic: "" });
    setSubmitError(null);
    setResult(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    if (!form.name.trim() || !isEmail(form.email) || !form.whatsapp.trim()) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          whatsapp: form.whatsapp.trim(),
          topic: form.topic.trim(),
          startIso: selectedSlot.startIso,
          endIso: selectedSlot.endIso,
          timezoneGuest: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(res.status === 409 ? tc.booking_error_taken : (data.error || tc.booking_error_generic));
        if (res.status === 409) {
          // Slot just got taken — invalidate cache and refetch fresh
          if (selectedDate) {
            const ymd = fmtDateYmd(selectedDate);
            slotCacheRef.current.delete(ymd);
            setSelectedSlot(null);
            setStep("slot");
            fetch(`/api/availability?date=${ymd}`)
              .then((r) => r.json())
              .then((d) => {
                const list: Slot[] = d.slots || [];
                slotCacheRef.current.set(ymd, list);
                setSlots(list);
              });
          }
        }
        return;
      }
      setResult({
        meetLink: data.meetLink,
        htmlLink: data.htmlLink,
        addToCalendarUrl: data.addToCalendarUrl,
        icsUrl: data.icsUrl,
        waShareUrl: data.waShareUrl,
        dateLabel: data.dateLabel,
        timeLabel: data.timeLabel,
        timezoneLabel: data.timezoneLabel,
        startIso: data.startIso,
        endIso: data.endIso,
      });
      setStep("success");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : tc.booking_error_generic);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full min-h-[44px] rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-nodo-white placeholder-nodo-gray-400 outline-none transition-all duration-200 focus:border-nodo-blue/50 focus:shadow-[0_0_0_3px_rgba(39,133,254,0.07)] focus:bg-white/[0.05]";
  const labelCls = "mb-1.5 block text-xs font-medium text-nodo-gray-300";

  return (
    <section id="agendar" className="relative scroll-mt-28 pb-16 sm:pb-28">
      <div className="section-line" />
      <div className="mx-auto max-w-3xl px-6 pt-12 sm:pt-16 lg:px-8">
        {/* ─── Header ─── */}
        <div className="mb-8 sm:mb-12 text-center">
          <p
            data-reveal
            className="reveal-el mb-4 text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase"
          >
            {tc.booking_eyebrow}
          </p>
          <h2
            data-reveal
            className="reveal-el mb-4 text-3xl font-semibold tracking-[-0.02em] text-nodo-white sm:text-4xl lg:text-5xl"
            style={{ transitionDelay: "80ms" }}
          >
            {tc.booking_title}
          </h2>
          <p
            data-reveal
            className="reveal-el mx-auto max-w-xl text-[15px] leading-relaxed text-nodo-gray-400"
            style={{ transitionDelay: "160ms" }}
          >
            {tc.booking_subtitle}
          </p>
        </div>

        {/* ─── Main card ─── */}
        <div
          data-reveal
          className="reveal-3d relative overflow-hidden rounded-xl"
          style={{ transitionDelay: "220ms" }}
        >
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
          <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/[0.06]" />

          <div
            className="relative rounded-xl p-6 sm:p-10"
            style={{ background: "rgba(18,18,36,0.92)", backdropFilter: "blur(14px)" }}
          >
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nodo-purple/60 to-transparent" />

            {/* Step indicator */}
            {step !== "success" && (
              <div className="mb-8 flex items-center justify-center gap-3">
                {[
                  { key: "date", label: tc.booking_step1 },
                  { key: "slot", label: tc.booking_step2 },
                  { key: "form", label: tc.booking_step3 },
                ].map((s, i) => {
                  const activeIdx = step === "date" ? 0 : step === "slot" ? 1 : 2;
                  const isActive = i === activeIdx;
                  const isDone = i < activeIdx;
                  return (
                    <div key={s.key} className="flex items-center gap-3">
                      <div
                        className="flex items-center gap-2 transition-colors duration-300"
                        style={{ color: isActive ? "#ffffff" : isDone ? "#b0b0cc" : "#8888aa" }}
                      >
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-300"
                          style={{
                            background: isActive
                              ? "linear-gradient(135deg, #8b2fef, #00c1f4)"
                              : isDone
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(255,255,255,0.04)",
                            color: isActive ? "#0a0a0a" : "inherit",
                            border: isActive ? "none" : "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          {isDone ? "✓" : i + 1}
                        </span>
                        <span className="hidden text-[12px] font-medium sm:inline">{s.label}</span>
                      </div>
                      {i < 2 && <span className="h-px w-6 bg-white/[0.08]" />}
                    </div>
                  );
                })}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* ═════════════ STEP: DATE ═════════════ */}
              {step === "date" && (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Month nav */}
                  <div className="mb-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        if (!canGoPrevMonth) return;
                        const d = new Date(viewMonth);
                        d.setMonth(d.getMonth() - 1);
                        setViewMonth(d);
                      }}
                      disabled={!canGoPrevMonth}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-nodo-gray-300 transition-all duration-200 hover:border-nodo-indigo/30 hover:text-nodo-white disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={14} className="text-nodo-indigo" />
                      <h3 className="text-[15px] font-semibold text-nodo-white tabular-nums">
                        {months[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date(viewMonth);
                        d.setMonth(d.getMonth() + 1);
                        setViewMonth(d);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-nodo-gray-300 transition-all duration-200 hover:border-nodo-indigo/30 hover:text-nodo-white"
                      aria-label="Next month"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Weekdays header */}
                  <div className="mb-2 grid grid-cols-7 gap-1 sm:gap-2">
                    {weekdays.map((w) => (
                      <div
                        key={w}
                        className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-nodo-gray-600"
                      >
                        {w}
                      </div>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {calendarCells.map((cell, i) => {
                      if (!cell.date) return <div key={i} aria-hidden />;
                      const isPast = cell.date < today;
                      const isFuture = cell.date > maxBookableDate;
                      const disabled = isPast || isFuture;
                      const isToday = sameYmd(cell.date, today);
                      const isSelected = !!(selectedDate && sameYmd(cell.date, selectedDate));
                      const ariaLabel = cell.date.toLocaleDateString(
                        language === "es" ? "es-AR" : "en-US",
                        { weekday: "long", day: "numeric", month: "long", year: "numeric" },
                      );
                      const base =
                        "group relative aspect-square rounded-lg border text-[13px] font-medium tabular-nums transition-colors duration-200 disabled:cursor-not-allowed";
                      const stateCls = isSelected
                        ? "border-transparent text-nodo-white"
                        : disabled
                          ? "border-transparent bg-transparent text-nodo-gray-600"
                          : isToday
                            ? "border-white/[0.04] bg-white/[0.02] text-nodo-cyan hover:border-nodo-indigo/30 hover:bg-nodo-indigo/[0.08]"
                            : "border-white/[0.04] bg-white/[0.02] text-nodo-gray-200 hover:border-nodo-indigo/30 hover:bg-nodo-indigo/[0.08]";
                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={disabled}
                          onClick={() => selectDate(cell.date!)}
                          aria-label={ariaLabel}
                          aria-current={isSelected ? "date" : undefined}
                          className={`${base} ${stateCls}`}
                          style={
                            isSelected
                              ? { background: "linear-gradient(135deg, rgba(139,47,239,0.25), rgba(0,193,244,0.2))" }
                              : undefined
                          }
                        >
                          {cell.date.getDate()}
                          {isToday && !isSelected && (
                            <span className="absolute inset-x-0 bottom-1 flex justify-center">
                              <span className="h-1 w-1 rounded-full bg-nodo-cyan" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-6 text-center text-[11px] text-nodo-gray-400">
                    {tc.booking_tz_label}
                  </p>
                </motion.div>
              )}

              {/* ═════════════ STEP: SLOT ═════════════ */}
              {step === "slot" && selectedDate && (
                <motion.div
                  key="slot"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => { setStep("date"); setSelectedSlot(null); }}
                      className="flex items-center gap-1.5 text-[12px] font-medium text-nodo-gray-400 transition-colors duration-200 hover:text-nodo-white"
                    >
                      <ChevronLeft size={14} />
                      {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </button>
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-nodo-white">
                      <Clock size={13} className="text-nodo-indigo" />
                      {new Intl.DateTimeFormat(language === "es" ? "es-AR" : "en-US", {
                        weekday: "long", day: "numeric", month: "long",
                      }).format(selectedDate)}
                    </div>
                  </div>

                  {slotsLoading && (
                    <div className="flex items-center justify-center gap-2 py-16 text-[13px] text-nodo-gray-400">
                      <Loader2 size={14} className="animate-spin" />
                      {tc.booking_loading_slots}
                    </div>
                  )}

                  {!slotsLoading && slotsError && (
                    <div className="flex items-center gap-2 rounded-lg border border-nodo-error/20 bg-nodo-error/5 px-4 py-3 text-sm text-nodo-error">
                      <AlertCircle size={15} />
                      {slotsError}
                    </div>
                  )}

                  {!slotsLoading && !slotsError && slots.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                      <div className="text-[13px] text-nodo-gray-400">
                        {tc.booking_no_slots}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep("date")}
                        className="text-[12px] font-medium text-nodo-blue transition-colors duration-200 hover:text-nodo-cyan"
                      >
                        ← {tc.booking_step1}
                      </button>
                    </div>
                  )}

                  {!slotsLoading && slots.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {slots.map((s) => (
                        <button
                          key={s.startIso}
                          type="button"
                          onClick={() => selectSlot(s)}
                          className="group relative rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[13px] font-medium text-nodo-gray-200 tabular-nums transition-all duration-200 hover:border-nodo-indigo/40 hover:bg-white/[0.05] hover:text-nodo-white hover:shadow-[0_0_16px_rgba(88,99,242,0.12)]"
                        >
                          {s.label}
                          <span
                            className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(139,47,239,0.08), rgba(0,193,244,0.06))",
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="mt-6 text-center text-[11px] text-nodo-gray-400">
                    {tc.booking_tz_label}
                  </p>
                </motion.div>
              )}

              {/* ═════════════ STEP: FORM ═════════════ */}
              {step === "form" && selectedSlot && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Selected slot summary */}
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, rgba(88,99,242,0.15), rgba(0,193,244,0.1))" }}>
                        <CalendarIcon size={15} className="text-nodo-cyan" />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[13px] font-medium text-nodo-white capitalize">
                          {formatSlotDate(selectedSlot.startIso, language)}
                        </span>
                        <span className="text-[11px] text-nodo-gray-400">
                          {tc.booking_duration_label} · Google Meet · {tc.booking_tz_label}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setSelectedSlot(null); setStep("slot"); }}
                      className="text-[11px] font-medium text-nodo-gray-400 transition-colors duration-200 hover:text-nodo-white"
                    >
                      {language === "es" ? "Cambiar" : "Change"}
                    </button>
                  </div>

                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="b-name" className={labelCls}>
                        {t.contact.form.name} <span className="text-nodo-purple">*</span>
                      </label>
                      <input
                        id="b-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={tc.booking_name_ph}
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className={inputCls}
                        maxLength={120}
                      />
                    </div>
                    <div>
                      <label htmlFor="b-email" className={labelCls}>
                        {t.contact.form.email} <span className="text-nodo-purple">*</span>
                      </label>
                      <input
                        id="b-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={tc.booking_email_ph}
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* WhatsApp — required so we can notify the client later */}
                  <div>
                    <label htmlFor="b-wa" className={labelCls}>
                      {tc.booking_wa_label} <span className="text-nodo-purple">*</span>
                    </label>
                    <input
                      id="b-wa"
                      type="tel"
                      required
                      placeholder={tc.booking_wa_ph}
                      value={form.whatsapp}
                      onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
                      className={inputCls}
                      maxLength={32}
                    />
                  </div>

                  {/* Topic (optional) */}
                  <div>
                    <label htmlFor="b-topic" className={labelCls}>
                      {tc.booking_topic_label}
                    </label>
                    <textarea
                      id="b-topic"
                      rows={4}
                      placeholder={tc.booking_topic_ph}
                      value={form.topic}
                      onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                      className={`${inputCls} resize-none`}
                      maxLength={800}
                    />
                    <div className="mt-1.5 flex justify-end">
                      <span
                        className="text-[11px] tabular-nums transition-colors duration-200"
                        style={{
                          color: form.topic.length > 20 ? "rgba(88,99,242,0.7)" : "rgba(136,136,170,0.45)",
                        }}
                      >
                        {form.topic.length}/800
                      </span>
                    </div>
                  </div>

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-lg border border-nodo-error/20 bg-nodo-error/5 px-4 py-3 text-sm text-nodo-error"
                    >
                      <AlertCircle size={15} />
                      {submitError}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[3px] px-7 py-3.5 text-[13px] font-semibold tracking-wide text-nodo-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%)",
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        {tc.booking_confirming}
                      </>
                    ) : (
                      <>
                        <Video size={14} />
                        {tc.booking_confirm}
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {/* ═════════════ STEP: SUCCESS ═════════════ */}
              {step === "success" && result && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-7 px-2 py-6 sm:px-4 sm:py-10"
                >
                  {/* Pulse check — wrapper with fixed size so rings don't collide with headline */}
                  <div className="relative flex h-44 w-44 items-center justify-center">
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
                      transition={{ delay: 0.1, type: "spring", stiffness: 240, damping: 14 }}
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-nodo-success/20 bg-nodo-success/10"
                    >
                      <CheckCircle size={28} className="text-nodo-success" />
                    </motion.div>
                  </div>

                  {/* Personalized headline */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <h3 className="text-2xl font-semibold text-nodo-white sm:text-3xl">
                      {language === "es"
                        ? `¡Listo, ${form.name.split(" ")[0]}!`
                        : `All set, ${form.name.split(" ")[0]}!`}
                    </h3>
                    <p className="max-w-md text-[14px] leading-relaxed text-nodo-gray-300">
                      {language === "es"
                        ? "Tu videollamada con Nodo quedó confirmada. Sumá el evento a tu calendario con un toque."
                        : "Your video call with Nodo is confirmed. Add it to your calendar with one tap."}
                    </p>
                  </motion.div>

                  {/* Event summary card */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 }}
                    className="w-full max-w-md rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-left"
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: "linear-gradient(135deg, rgba(139,47,239,0.2), rgba(0,193,244,0.15))" }}
                      >
                        <CalendarIcon size={16} className="text-nodo-cyan" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-nodo-gray-400">
                          {language === "es" ? "Fecha y hora" : "Date & time"}
                        </p>
                        <p className="text-[14px] font-medium text-nodo-white capitalize">{result.dateLabel}</p>
                        <p className="text-[13px] text-nodo-gray-300 tabular-nums">
                          {result.timeLabel} · {result.timezoneLabel}
                        </p>
                      </div>
                    </div>
                    {result.meetLink && (
                      <div className="flex items-start gap-3 border-t border-white/[0.04] pt-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: "rgba(39,133,254,0.12)" }}
                        >
                          <Video size={16} className="text-nodo-blue" />
                        </div>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-nodo-gray-400">
                            Google Meet
                          </p>
                          <a
                            href={result.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate text-[13px] font-medium text-nodo-cyan transition-colors hover:text-nodo-white"
                          >
                            {result.meetLink.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Email check banner — next step for the client */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative w-full max-w-md overflow-hidden rounded-xl border border-nodo-indigo/20 p-5"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(88,99,242,0.08) 0%, rgba(39,133,254,0.06) 50%, rgba(0,193,244,0.05) 100%)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-lg"
                          style={{ background: "linear-gradient(135deg, rgba(139,47,239,0.25), rgba(0,193,244,0.2))" }}
                        >
                          <Mail size={18} className="text-nodo-white" />
                        </div>
                        <span
                          className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full animate-pulse"
                          style={{ background: "#00c1f4", boxShadow: "0 0 8px rgba(0,193,244,0.8)" }}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-[15px] font-semibold text-nodo-white sm:text-base">
                          {language === "es" ? "Revisá tu correo" : "Check your email"}
                        </h4>
                        <p className="text-[13px] leading-relaxed text-nodo-gray-200">
                          {language === "es" ? (
                            <>
                              Te enviamos la invitación a{" "}
                              <span className="font-medium text-nodo-cyan break-all">{form.email}</span>.
                              Aceptala desde ahí y se suma a tu calendario automáticamente.
                            </>
                          ) : (
                            <>
                              We sent the invitation to{" "}
                              <span className="font-medium text-nodo-cyan break-all">{form.email}</span>.
                              Accept it from there and it gets added to your calendar automatically.
                            </>
                          )}
                        </p>
                        <p className="text-[11px] leading-relaxed text-nodo-gray-400">
                          {language === "es"
                            ? "Si no la ves en minutos, revisá Promociones o Spam."
                            : "If you don't see it in a few minutes, check Promotions or Spam."}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Primary CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48 }}
                    className="flex w-full max-w-md flex-col gap-3"
                  >
                    {result.meetLink && (
                      <a
                        href={result.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-[3px] px-7 py-3.5 text-[13px] font-semibold text-nodo-white transition-all duration-300 hover:opacity-90"
                        style={{
                          background:
                            "linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%)",
                        }}
                      >
                        <Video size={14} />
                        {language === "es" ? "Unirme al Meet" : "Join the Meet"}
                      </a>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={result.icsUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[12px] font-medium text-nodo-white transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.06]"
                      >
                        <Download size={13} />
                        {language === "es" ? "Agregar al calendario" : "Add to calendar"}
                      </a>
                      <a
                        href={result.waShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[12px] font-medium text-nodo-white transition-all duration-200 hover:border-[#25D366]/50 hover:bg-[#25D366]/8"
                      >
                        <MessageCircle size={13} />
                        WhatsApp
                      </a>
                    </div>
                  </motion.div>

                  {/* Reset */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-1"
                  >
                    <button
                      type="button"
                      onClick={resetAll}
                      className="text-[11px] font-medium text-nodo-gray-600 underline-offset-4 transition-colors duration-200 hover:text-nodo-gray-300 hover:underline"
                    >
                      {language === "es" ? "Agendar otra reunión" : "Book another meeting"}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
