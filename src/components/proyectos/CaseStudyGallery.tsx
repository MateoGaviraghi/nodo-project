"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, FileDown } from "lucide-react";
import type { Project, ProjectScreenshot, ProjectAccent } from "@/types";

gsap.registerPlugin(ScrollTrigger);

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
 * Pinned horizontal gallery with cinematic per-slide transforms.
 * The page pins, the track translates with scrub, and each slide is
 * scaled/blurred/dimmed based on its distance from the viewport center
 * — so the focused frame "lifts" and the others recede.
 *
 * Same behavior on mobile and desktop. `pinType: "transform"` keeps
 * it stable on iOS Safari + Lenis.
 */
export default function CaseStudyGallery({ project, lang, eyebrow }: CaseStudyGalleryProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Track viewport class so we can switch between mobile (native swipe)
  // and desktop (GSAP pin/scrub) on the fly without remounting.
  const [isMobile, setIsMobile] = useState(false);
  // Mobile-only swipe hint, hides as soon as the user scrolls.
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const slides: ProjectScreenshot[] =
    project.screenshots.length > 0 ? project.screenshots : [project.thumbnail];
  const accentRgb = ACCENT_RGB[project.accent];
  const total = slides.length;
  const totalStr = String(total).padStart(2, "0");

  // Reveal observer (eyebrow / counter / progress strip).
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.classList.add("revealed");
      });
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!section || !track || !sticky) return;

    // ─── MOBILE BRANCH ───────────────────────────────────────────
    // Native horizontal swipe with scroll-snap. We drive the same
    // per-slide effects (scale / opacity / blur / ty) + counter +
    // progress bar from the container's scrollLeft — so it looks and
    // feels like the desktop scrub but uses native touch momentum
    // (no GSAP pin, no Lenis collision).
    if (isMobile) {
      let raf = 0;

      const update = () => {
        const slideEls = track.querySelectorAll<HTMLElement>("[data-gallery-slide]");
        const stickyRect = sticky.getBoundingClientRect();
        const viewportCenter = stickyRect.left + stickyRect.width / 2;
        let closestIdx = 0;
        let closestDist = Infinity;

        slideEls.forEach((el, idx) => {
          const r = el.getBoundingClientRect();
          const slideCenter = r.left + r.width / 2;
          const distance = Math.abs(slideCenter - viewportCenter);
          const norm = Math.min(1, distance / r.width);
          const eased = norm * norm;

          const inner = el.querySelector<HTMLElement>("[data-gallery-inner]");
          if (inner) {
            const scale = 1 - eased * 0.10; // softer on mobile (touch feel)
            const opacity = 1 - eased * 0.40;
            const blur = eased * 1.2;
            const ty = eased * 12;
            inner.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
            inner.style.opacity = `${opacity}`;
            inner.style.filter = `blur(${blur}px)`;
          }

          if (distance < closestDist) {
            closestDist = distance;
            closestIdx = idx;
          }
        });

        setActiveIndex(closestIdx);
        if (counterRef.current) {
          counterRef.current.textContent = String(closestIdx + 1).padStart(2, "0");
        }
        if (progressRef.current) {
          const maxScroll = sticky.scrollWidth - sticky.clientWidth;
          const progress = maxScroll > 0 ? sticky.scrollLeft / maxScroll : 0;
          progressRef.current.style.transform = `scaleX(${progress})`;
        }
        // Hide the swipe hint as soon as the user starts scrolling.
        if (sticky.scrollLeft > 40) {
          setShowSwipeHint(false);
        }
      };

      // Triple coverage: scroll event + rAF loop + setInterval polling.
      // - scroll event fires fast on browsers that dispatch it
      //   (Chrome desktop, most Android, etc).
      // - rAF loop covers smooth 60fps when the section is in view.
      // - setInterval is the bulletproof fallback for headless engines
      //   and iOS Safari edge cases where scroll/rAF can be throttled
      //   inside scroll-snap-mandatory containers.
      // `update()` is idempotent and bails out when scrollLeft hasn't
      // changed, so the cost is one comparison per tick.
      let lastScrollLeft = -1;
      let lastWidth = 0;
      const tick = () => {
        const sl = sticky.scrollLeft;
        const w = sticky.clientWidth;
        if (sl !== lastScrollLeft || w !== lastWidth) {
          lastScrollLeft = sl;
          lastWidth = w;
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

      sticky.addEventListener("scroll", onScroll, { passive: true });
      const intervalId = window.setInterval(tick, 50);
      // Initial paint (run before kicking off rAF so first frame is correct)
      update();
      raf = requestAnimationFrame(loop);

      return () => {
        sticky.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
        clearInterval(intervalId);
        track
          .querySelectorAll<HTMLElement>("[data-gallery-inner]")
          .forEach((el) => {
            el.style.transform = "";
            el.style.opacity = "";
            el.style.filter = "";
          });
      };
    }

    // ─── DESKTOP BRANCH (GSAP pin/scrub) ─────────────────────────

    let cleanup: (() => void) | null = null;

    const timeout = window.setTimeout(() => {
      const compute = () => {
        const totalWidth = track.scrollWidth;
        const viewport = window.innerWidth;
        return Math.max(0, totalWidth - viewport);
      };
      if (compute() <= 0) return;

      // Drives the per-slide transforms based on each slide's distance
      // from the viewport center. Called from ScrollTrigger.onUpdate so
      // it runs in sync with the scrub.
      const updateSlides = () => {
        const slideEls = track.querySelectorAll<HTMLElement>("[data-gallery-slide]");
        const viewportCenter = window.innerWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;

        slideEls.forEach((el, idx) => {
          const r = el.getBoundingClientRect();
          const slideCenter = r.left + r.width / 2;
          const distance = Math.abs(slideCenter - viewportCenter);
          const norm = Math.min(1, distance / r.width); // 0 centered, 1 far
          const eased = norm * norm; // ease-in for a sharper focus

          // Apply on the inner content so the layout doesn't shift.
          const inner = el.querySelector<HTMLElement>("[data-gallery-inner]");
          if (inner) {
            const scale = 1 - eased * 0.14; // 1.0 centered → 0.86 edge (less aggressive)
            const opacity = 1 - eased * 0.45; // 1.0 → 0.55 (less dim)
            const blur = eased * 1.5; // 0px → 1.5px (much less blur for crisper edges)
            const ty = eased * 18; // 0px → 18px down
            inner.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
            inner.style.opacity = `${opacity}`;
            inner.style.filter = `blur(${blur}px)`;
          }

          if (distance < closestDist) {
            closestDist = distance;
            closestIdx = idx;
          }
        });

        return closestIdx;
      };

      const tween = gsap.to(track, {
        x: () => -compute(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${compute()}`,
          scrub: 0.6,
          pin: sticky,
          pinType: "transform",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = updateSlides();
            setActiveIndex(idx);
            if (counterRef.current) {
              counterRef.current.textContent = String(idx + 1).padStart(2, "0");
            }
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
          onRefresh: () => {
            updateSlides();
          },
        },
      });

      // Initial paint — apply transforms before first scroll.
      requestAnimationFrame(updateSlides);

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
        track
          .querySelectorAll<HTMLElement>("[data-gallery-inner]")
          .forEach((el) => {
            el.style.transform = "";
            el.style.opacity = "";
            el.style.filter = "";
          });
      };
    }, 80);

    return () => {
      window.clearTimeout(timeout);
      cleanup?.();
    };
  }, [slides.length, isMobile]);

  return (
    <section ref={sectionRef} className="relative" data-reveal>
      <div
        ref={stickyRef}
        className="relative h-[80vh] overflow-y-hidden overflow-x-auto snap-x snap-mandatory md:h-[100dvh] md:overflow-hidden md:snap-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Top bar — eyebrow + dynamic counter */}
        <div
          data-reveal
          className="reveal-el pointer-events-none absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 pt-10 sm:px-12 sm:pt-16 md:pt-24 lg:px-16 lg:pt-28"
        >
          <p className="text-[11px] font-medium tracking-[0.3em] text-nodo-indigo uppercase">
            {eyebrow}
          </p>
          <p className="text-[11px] font-medium tracking-[0.3em] text-white/55 uppercase tabular-nums">
            <span ref={counterRef}>01</span>
            <span className="mx-1 text-white/25">/</span>
            <span className="text-white/40">{totalStr}</span>
          </p>
        </div>

        {/* Track — same layout on mobile and desktop. On mobile the
            container scrolls horizontally with snap; on desktop GSAP
            translates this track via transform (no native scroll). */}
        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform"
          style={{ width: `${slides.length * 100}vw` }}
        >
          {slides.map((shot, i) => (
            <GallerySlide
              key={i}
              shot={shot}
              project={project}
              accentRgb={accentRgb}
              lang={lang}
              isActive={i === activeIndex}
            />
          ))}
        </div>

        {/* Mobile swipe hint — only shows on mobile while still on slide 1,
            fades out as soon as the user scrolls. */}
        <div
          className={`pointer-events-none absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-[11px] font-medium tracking-[0.25em] uppercase text-white/65 transition-opacity duration-500 md:hidden ${
            showSwipeHint ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>{lang === "es" ? "Deslizá" : "Swipe"}</span>
          <ChevronRight className="h-3.5 w-3.5 animate-[swipeHint_1.4s_ease-in-out_infinite] text-nodo-cyan" />
        </div>

        {/* Bottom progress bar — driven by GSAP scrub on desktop,
            by scroll position on mobile (both via progressRef). */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 h-px w-[55%] max-w-[420px] -translate-x-1/2 overflow-hidden bg-white/[0.08] sm:bottom-10">
          <div
            ref={progressRef}
            className="h-full origin-left bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
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
  const hasPair = !!shot.pair;
  // Pair (mobile side-by-side) needs more vertical room limited per image.
  // Single image: take as much height as the viewport allows.
  const maxH = hasPair ? "calc(100dvh - 240px)" : "calc(100dvh - 200px)";

  return (
    <div
      data-gallery-slide
      className="flex h-full w-screen shrink-0 items-center justify-center snap-center px-4 sm:px-10 md:snap-none lg:px-16"
    >
      <div
        data-gallery-inner
        className={`w-full ${hasPair ? "max-w-md sm:max-w-xl lg:max-w-3xl" : "max-w-md sm:max-w-3xl lg:max-w-6xl"}`}
        style={{
          willChange: "transform, opacity, filter",
          transformOrigin: "center center",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[8px]"
          style={{
            background: `linear-gradient(135deg, rgba(${accentRgb}, 0.10), rgba(10,10,10,0.0) 60%)`,
          }}
        >
          {shot.src ? (
            hasPair ? (
              <div className="flex items-stretch justify-center gap-3 sm:gap-5 p-3 sm:p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt[lang]}
                  className="block h-auto w-auto rounded-[6px]"
                  style={{ maxHeight: maxH, maxWidth: "48%" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.pair!.src}
                  alt={shot.pair!.alt[lang]}
                  className="block h-auto w-auto rounded-[6px]"
                  style={{ maxHeight: maxH, maxWidth: "48%" }}
                />
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
          {/* Subtle accent glow — keeps the brand color without a fake browser chrome */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
            style={{ background: `rgb(${accentRgb})` }}
          />
        </div>

        {/* Caption + optional link — fades in only when slide is centered.
            isActive is updated by both branches (GSAP on desktop, rAF on mobile). */}
        {(captionText || shot.link) && (
          <div
            className={`mx-auto mt-6 max-w-md text-center transition-all duration-500 sm:mt-7 ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            {captionText && (
              <p className="text-[13px] leading-relaxed text-white/65 sm:text-[14px]">
                {captionText}
              </p>
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
