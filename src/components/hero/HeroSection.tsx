"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/hooks/useLanguage";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import ScrollIndicator from "./ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 122;
const FRAME_PATH = "/hero-frames/";

function getFrameSrc(index: number): string {
  return `${FRAME_PATH}${String(index + 1).padStart(4, "0")}.jpg`;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function remap(v: number, lo: number, hi: number) {
  return clamp((v - lo) / (hi - lo), 0, 1);
}

export default function HeroSection() {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null),
  );
  const currentFrameRef = useRef(0);
  const scrollProgressRef = useRef(0);

  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const [pastStart, setPastStart] = useState(false);

  // -- Preload frames progressively --
  useEffect(() => {
    const BATCH_SIZE = 8;

    function loadFrame(index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameSrc(index);
        img.onload = () => {
          framesRef.current[index] = img;
          if (index === 0) setHasFirstFrame(true);
          resolve();
        };
        img.onerror = () => resolve();
      });
    }

    // Load frame 0 first for instant display
    loadFrame(0).then(() => {
      let nextIndex = 1;

      function loadBatch() {
        const end = Math.min(nextIndex + BATCH_SIZE, TOTAL_FRAMES);
        const promises: Promise<void>[] = [];
        for (let i = nextIndex; i < end; i++) {
          promises.push(loadFrame(i));
        }
        Promise.all(promises).then(() => {
          nextIndex = end;
          if (nextIndex < TOTAL_FRAMES) {
            requestAnimationFrame(loadBatch);
          }
        });
      }

      loadBatch();
    });
  }, []);

  // -- Draw frame on canvas (fills entire viewport, no black borders) --
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const idx = clamp(Math.round(frameIndex), 0, TOTAL_FRAMES - 1);
    let img = framesRef.current[idx];

    // Fallback to closest loaded frame
    if (!img) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const below = idx - offset;
        const above = idx + offset;
        if (below >= 0 && framesRef.current[below]) {
          img = framesRef.current[below];
          break;
        }
        if (above < TOTAL_FRAMES && framesRef.current[above]) {
          img = framesRef.current[above];
          break;
        }
      }
    }
    if (!img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    // Cover fit — fills entire viewport, no bars, premium fullscreen
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let sW: number, sH: number, sX: number, sY: number;

    if (imgAspect > canvasAspect) {
      sH = img.naturalHeight;
      sW = img.naturalHeight * canvasAspect;
      sX = (img.naturalWidth - sW) / 2;
      sY = 0;
    } else {
      sW = img.naturalWidth;
      sH = img.naturalWidth / canvasAspect;
      sX = 0;
      sY = (img.naturalHeight - sH) / 2;
    }

    ctx.drawImage(img, sX, sY, sW, sH, 0, 0, w, h);
  }, []);

  // -- Render loop --
  useEffect(() => {
    if (!hasFirstFrame) return;

    let animFrame: number;
    let lastDrawn = -1;

    function tick() {
      const frame = currentFrameRef.current;
      if (frame !== lastDrawn) {
        drawFrame(frame);
        lastDrawn = frame;
      }
      animFrame = requestAnimationFrame(tick);
    }

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [hasFirstFrame, drawFrame]);

  // -- GSAP ScrollTrigger --
  useEffect(() => {
    const el = sectionRef.current;
    const canvasCtn = canvasContainerRef.current;
    const heroText = heroTextRef.current;
    const h1El = h1Ref.current;
    const subtitleEl = subtitleRef.current;
    const ctaEl = ctaRef.current;

    if (!el || !canvasCtn || !heroText || !h1El || !subtitleEl || !ctaEl) return;

    // Kill any stale triggers from previous mount (client-side navigation)
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        scrollProgressRef.current = p;

        // ── Stage 1: Frame scrub (0% → 60%) ──
        const frameProgress = remap(p, 0, 0.6);
        const frameIndex = Math.round(frameProgress * (TOTAL_FRAMES - 1));
        currentFrameRef.current = frameIndex;

        // ── Stage 2: Canvas fades out smoothly (58% → 75%) ──
        const fadeOutProgress = remap(p, 0.58, 0.75);
        canvasCtn.style.opacity = String(1 - fadeOutProgress);

        // ── Stage 3: Text appears (68% → 88%) ──
        const textPhase = remap(p, 0.68, 0.78);
        heroText.style.opacity = String(textPhase);
        heroText.style.pointerEvents = textPhase > 0.3 ? "auto" : "none";

        // Staggered reveals
        const h1p = remap(p, 0.68, 0.8);
        h1El.style.opacity = String(h1p);
        h1El.style.transform = `translateY(${(1 - h1p) * 40}px)`;

        const subP = remap(p, 0.73, 0.84);
        subtitleEl.style.opacity = String(subP);
        subtitleEl.style.transform = `translateY(${(1 - subP) * 25}px)`;

        const ctaP = remap(p, 0.78, 0.88);
        ctaEl.style.opacity = String(ctaP);
        ctaEl.style.transform = `translateY(${(1 - ctaP) * 20}px)`;

        // Scroll indicator
        if (p > 0.03) setPastStart(true);
        else setPastStart(false);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative"
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* ── Canvas — fullscreen, no borders ── */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0 z-10"
          style={{ willChange: "opacity" }}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full"
          />
        </div>

        {/* ── Hero Text — appears after video fades ── */}
        <div
          ref={heroTextRef}
          className="relative z-20 flex flex-col items-center px-6 text-center"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          {/* Brand name */}
          <p
            className="mb-8 text-[clamp(1rem,1.8vw,1.3rem)] font-semibold tracking-[0.4em] uppercase gradient-text"
            style={{ willChange: "opacity" }}
          >
            Nodo
          </p>

          <h1
            ref={h1Ref}
            className="mb-5 max-w-3xl text-[clamp(1.75rem,5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em]"
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              willChange: "transform, opacity",
            }}
          >
            {t.hero.headline.split(" ").map((word, i) => {
              const clean = word.replace(/\*/g, "");
              const highlighted = word.includes("*");
              return (
                <span
                  key={i}
                  className={`inline-block ${i > 0 ? "ml-[0.28em]" : ""} ${
                    highlighted ? "gradient-text" : ""
                  }`}
                >
                  {clean}
                </span>
              );
            })}
          </h1>

          <p
            ref={subtitleRef}
            className="mb-9 max-w-md text-[15px] leading-relaxed text-nodo-gray-400"
            style={{
              opacity: 0,
              transform: "translateY(25px)",
              willChange: "transform, opacity",
            }}
          >
            {t.hero.subtitle}
          </p>

          <div
            ref={ctaRef}
            className="flex items-center gap-3"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              willChange: "transform, opacity",
            }}
          >
            <GradientButton href="/contacto">
              {t.hero.cta_primary}
            </GradientButton>
            <GhostButton href="/servicios">
              {t.hero.cta_secondary}
            </GhostButton>
          </div>
        </div>

        {/* ── Scroll Indicator ── */}
        <ScrollIndicator visible={!pastStart} />
      </div>
    </section>
  );
}
