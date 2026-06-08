"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, FileDown } from "lucide-react";
import type { Project, ProjectScreenshot, ProjectAccent } from "@/types";

interface CaseStudyGalleryProps {
  project: Project;
  lang: "es" | "en";
  eyebrow: string;
}

const ACCENT_RGB: Record<ProjectAccent, string> = {
  blue: "39, 133, 254",
  cyan: "0, 193, 244",
  purple: "139, 47, 239",
  indigo: "88, 99, 242",
};

/**
 * Horizontal gallery with cinematic per-slide transforms (the focused frame
 * lifts, the others recede).
 *
 * Desktop: a tall wrapper + a sticky stage; vertical scroll translates the
 * track horizontally, driven by rAF + getBoundingClientRect. This is native
 * CSS sticky (NO GSAP pin) so it never collides with Lenis — which is what
 * caused the first-load scroll-lock that a reload "fixed".
 * Mobile / reduced-motion: native horizontal scroll-snap.
 */
export default function CaseStudyGallery({ project, lang, eyebrow }: CaseStudyGalleryProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsMobile(mq.matches);
    setReduced(rm.matches);
    const onMq = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const onRm = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onMq);
    rm.addEventListener("change", onRm);
    return () => {
      mq.removeEventListener("change", onMq);
      rm.removeEventListener("change", onRm);
    };
  }, []);

  const slides: ProjectScreenshot[] =
    project.screenshots.length > 0 ? project.screenshots : [project.thumbnail];
  const accentRgb = ACCENT_RGB[project.accent];

  // Reveal observer (eyebrow / progress strip).
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const useMobileLayout = mounted && (isMobile || reduced);
  const useDesktopPin = mounted && !isMobile && !reduced;

  // ─── DESKTOP: native sticky pin (vertical scroll → horizontal track) ───
  useEffect(() => {
    if (!useDesktopPin) return;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;
    let raf = 0;
    const update = () => {
      const vw = window.innerWidth || document.documentElement.clientWidth || 1280;
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = Math.max(1, wrapper.offsetHeight - vh);
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      const travel = Math.max(0, track.scrollWidth - vw);
      track.style.transform = `translate3d(${-p * travel}px, 0, 0)`;

      const slideEls = track.querySelectorAll<HTMLElement>("[data-gallery-slide]");
      const center = vw / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      slideEls.forEach((el, idx) => {
        const r = el.getBoundingClientRect();
        const slideCenter = r.left + r.width / 2;
        const distance = Math.abs(slideCenter - center);
        const norm = Math.min(1, distance / r.width);
        const eased = norm * norm;
        const inner = el.querySelector<HTMLElement>("[data-gallery-inner]");
        if (inner) {
          inner.style.transform = `translate3d(0, ${eased * 18}px, 0) scale(${1 - eased * 0.14})`;
          inner.style.opacity = `${1 - eased * 0.45}`;
          inner.style.filter = `blur(${eased * 1.5}px)`;
        }
        if (distance < closestDist) {
          closestDist = distance;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      track.style.transform = "";
      track.querySelectorAll<HTMLElement>("[data-gallery-inner]").forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
        el.style.filter = "";
      });
    };
  }, [useDesktopPin, slides.length]);

  // ─── MOBILE / reduced-motion: native horizontal scroll-snap ───
  useEffect(() => {
    if (!useMobileLayout) return;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    let raf = 0;
    const update = () => {
      const slideEls = track.querySelectorAll<HTMLElement>("[data-gallery-slide]");
      const sRect = scroller.getBoundingClientRect();
      const center = sRect.left + sRect.width / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      slideEls.forEach((el, idx) => {
        const r = el.getBoundingClientRect();
        const slideCenter = r.left + r.width / 2;
        const distance = Math.abs(slideCenter - center);
        const inner = el.querySelector<HTMLElement>("[data-gallery-inner]");
        if (inner && !reduced) {
          const norm = Math.min(1, distance / r.width);
          const eased = norm * norm;
          inner.style.transform = `translate3d(0, ${eased * 12}px, 0) scale(${1 - eased * 0.1})`;
          inner.style.opacity = `${1 - eased * 0.4}`;
          inner.style.filter = `blur(${eased * 1.2}px)`;
        }
        if (distance < closestDist) {
          closestDist = distance;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
      if (progressRef.current) {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        progressRef.current.style.transform = `scaleX(${maxScroll > 0 ? scroller.scrollLeft / maxScroll : 0})`;
      }
      if (scroller.scrollLeft > 40) setShowSwipeHint(false);
    };
    let lastSL = -1;
    let lastW = 0;
    const tick = () => {
      const sl = scroller.scrollLeft;
      const w = scroller.clientWidth;
      if (sl !== lastSL || w !== lastW) {
        lastSL = sl;
        lastW = w;
        update();
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const loop = () => {
      tick();
      raf = requestAnimationFrame(loop);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    const intervalId = window.setInterval(tick, 50);
    update();
    raf = requestAnimationFrame(loop);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearInterval(intervalId);
      track.querySelectorAll<HTMLElement>("[data-gallery-inner]").forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
        el.style.filter = "";
      });
    };
  }, [useMobileLayout, reduced, slides.length]);

  const slideMarkup = slides.map((shot, i) => (
    <GallerySlide
      key={i}
      shot={shot}
      project={project}
      accentRgb={accentRgb}
      lang={lang}
      isActive={i === activeIndex}
    />
  ));

  const eyebrowEl = (
    <div
      data-reveal
      className="reveal-el pointer-events-none absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 pt-10 sm:px-12 sm:pt-16 md:pt-24 lg:px-16 lg:pt-28"
    >
      <p className="label-mono text-nodo-cyan">{eyebrow}</p>
    </div>
  );

  const progressEl = (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 h-px w-[55%] max-w-[420px] -translate-x-1/2 overflow-hidden bg-white/[0.08] sm:bottom-10">
      <div
        ref={progressRef}
        className="h-full origin-left bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );

  return (
    <section ref={sectionRef} className="relative" data-reveal>
      {useMobileLayout ? (
        /* ─── MOBILE / reduced-motion: native horizontal scroll ─── */
        <div
          ref={scrollerRef}
          className="relative h-auto overflow-x-auto overflow-y-visible py-14 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {eyebrowEl}
          <div ref={trackRef} className="flex items-center" style={{ width: `${slides.length * 100}vw` }}>
            {slideMarkup}
          </div>
          <div
            className={`pointer-events-none absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-[11px] font-medium tracking-[0.25em] uppercase text-white/65 transition-opacity duration-500 ${
              showSwipeHint ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>{lang === "es" ? "Deslizá" : "Swipe"}</span>
            <ChevronRight className="h-3.5 w-3.5 animate-[swipeHint_1.4s_ease-in-out_infinite] text-nodo-cyan" />
          </div>
          {progressEl}
        </div>
      ) : (
        /* ─── DESKTOP (and SSR default): tall wrapper + sticky stage ─── */
        <div ref={wrapperRef} className="relative" style={{ height: `${100 + (slides.length - 1) * 140}vh` }}>
          <div className="sticky top-0 h-[100dvh] overflow-hidden">
            {eyebrowEl}
            <div
              ref={trackRef}
              className="flex h-full items-center will-change-transform"
              style={{ width: `${slides.length * 100}vw` }}
            >
              {slideMarkup}
            </div>
            {progressEl}
          </div>
        </div>
      )}
    </section>
  );
}

/* ───────────────────────── slide ───────────────────────── */

function GallerySlide({
  shot,
  project,
  accentRgb,
  lang,
  isActive,
}: {
  shot: ProjectScreenshot;
  project: Project;
  accentRgb: string;
  lang: "es" | "en";
  isActive: boolean;
}) {
  const aspect = shot.aspect ?? "16:10";
  const aspectClass =
    aspect === "16:9"
      ? "aspect-video"
      : aspect === "4:3"
        ? "aspect-[4/3]"
        : aspect === "1:1"
          ? "aspect-square"
          : aspect === "9:16"
            ? "aspect-[9/16]"
            : "aspect-[16/10]";

  const captionText = shot.caption?.[lang] ?? shot.alt[lang];
  const pairList = shot.pair ?? [];
  const hasPair = pairList.length > 0;
  const totalImgs = hasPair ? pairList.length + 1 : 1;
  const maxH = hasPair ? "calc(100dvh - 240px)" : "calc(100dvh - 200px)";

  return (
    <div
      data-gallery-slide
      className="flex h-auto w-screen shrink-0 items-center justify-center snap-center px-4 sm:px-10 md:h-full md:snap-none lg:px-16"
    >
      <div
        data-gallery-inner
        className={`w-full ${hasPair ? "max-w-sm sm:max-w-xl lg:max-w-3xl" : "max-w-none sm:max-w-3xl lg:max-w-6xl"}`}
        style={{ willChange: "transform, opacity, filter", transformOrigin: "center center" }}
      >
        <div
          className="relative overflow-hidden rounded-[8px]"
          style={{ background: `linear-gradient(135deg, rgba(${accentRgb}, 0.10), rgba(10,10,10,0.0) 60%)` }}
        >
          {shot.src ? (
            hasPair ? (
              <div className="flex items-stretch justify-center gap-3 sm:gap-5 p-3 sm:p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt[lang]}
                  className="block h-auto w-auto rounded-[6px]"
                  style={{ maxHeight: maxH, maxWidth: `${Math.floor(96 / totalImgs)}%` }}
                />
                {pairList.map((extra, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${extra.src}-${i}`}
                    src={extra.src}
                    alt={extra.alt[lang]}
                    className="block h-auto w-auto rounded-[6px]"
                    style={{ maxHeight: maxH, maxWidth: `${Math.floor(96 / totalImgs)}%` }}
                  />
                ))}
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shot.src}
                alt={shot.alt[lang]}
                className="relative block h-auto w-full rounded-[6px]"
                style={{ maxHeight: maxH, objectFit: "contain" }}
              />
            )
          ) : (
            <div className={`flex ${aspectClass} items-center justify-center`}>
              <span className="relative text-8xl font-extralight tracking-tighter text-white/[0.07] sm:text-9xl lg:text-[14rem]">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
            style={{ background: `rgb(${accentRgb})` }}
          />
        </div>

        {(captionText || shot.link) && (
          <div
            className={`mx-auto mt-6 max-w-md text-center transition-all duration-500 sm:mt-7 ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {captionText && (
              <p className="text-[13px] leading-relaxed text-white/65 sm:text-[14px]">{captionText}</p>
            )}
            {shot.link && (
              <a
                href={shot.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-[3px] border border-white/[0.12] bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-white/80 transition-all duration-300 hover:border-nodo-cyan/40 hover:bg-white/[0.05] hover:text-nodo-cyan"
              >
                <FileDown className="h-3.5 w-3.5" />
                {shot.link.label[lang]}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
