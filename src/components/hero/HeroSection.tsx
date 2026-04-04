"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/hooks/useLanguage";
import GradientButton from "@/components/ui/GradientButton";
import GhostButton from "@/components/ui/GhostButton";
import ScrollIndicator from "./ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 160;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function remap(v: number, lo: number, hi: number) {
  return clamp((v - lo) / (hi - lo), 0, 1);
}

function getFramePath(index: number): string {
  return `/logos/frames-logo/${String(index + 1).padStart(3, "0")}.png`;
}

/** Remove near-white pixels (set alpha → 0) for transparent background. */
function removeWhiteBg(data: Uint8ClampedArray) {
  for (let i = 0; i < data.length; i += 4) {
    const minC = Math.min(data[i], data[i + 1], data[i + 2]);
    if (minC > 230) {
      data[i + 3] = 0;
    } else if (minC > 180) {
      data[i + 3] = Math.round(((230 - minC) / 50) * data[i + 3]);
    }
  }
}

export default function HeroSection() {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const framesRef = useRef<(HTMLCanvasElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null),
  );
  const targetFrameRef = useRef(0); // Where mouse wants to go (float)
  const displayFrameRef = useRef(0); // What's actually shown (lerps toward target)
  const scrollProgressRef = useRef(0);
  const lastMouseXRef = useRef(0);
  const mouseInitRef = useRef(false); // Has first mousemove fired?
  const loadedCountRef = useRef(0);

  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const [pastStart, setPastStart] = useState(false);
  const mouseEnabledRef = useRef(false);

  // -- Load frames progressively: frame 0 first (instant display), rest in background --
  useEffect(() => {
    const PROCESS_W = 1400;

    function processFrame(index: number, img: HTMLImageElement) {
      const ph = Math.round(
        (PROCESS_W * img.naturalHeight) / img.naturalWidth,
      );
      const offscreen = document.createElement("canvas");
      offscreen.width = PROCESS_W;
      offscreen.height = ph;
      const ctx = offscreen.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, PROCESS_W, ph);

      const imageData = ctx.getImageData(0, 0, PROCESS_W, ph);
      removeWhiteBg(imageData.data);
      ctx.putImageData(imageData, 0, 0);

      framesRef.current[index] = offscreen;
      loadedCountRef.current++;
    }

    // Load frame 0 FIRST for instant display
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      processFrame(0, firstImg);
      setHasFirstFrame(true);
      // Enable mouse interaction after a delay so the logo doesn't jitter on load
      setTimeout(() => {
        mouseEnabledRef.current = true;
      }, 1500);

      // Then load the rest in batches
      const BATCH_SIZE = 10;
      let nextIndex = 1;

      function loadBatch() {
        const end = Math.min(nextIndex + BATCH_SIZE, TOTAL_FRAMES);
        for (let i = nextIndex; i < end; i++) {
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => processFrame(i, img);
        }
        nextIndex = end;
        if (nextIndex < TOTAL_FRAMES) {
          setTimeout(loadBatch, 50); // Small delay between batches to not block main thread
        }
      }

      loadBatch();
    };
  }, []);

  // -- Draw frame on canvas --
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const idx = ((frameIndex % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
    const frame = framesRef.current[idx];
    // If this frame isn't loaded yet, find the closest loaded one
    let drawSource = frame;
    if (!drawSource) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const tryIdx =
          ((idx - offset) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;
        if (framesRef.current[tryIdx]) {
          drawSource = framesRef.current[tryIdx];
          break;
        }
      }
    }
    if (!drawSource) return;

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

    ctx.clearRect(0, 0, w, h);

    const frameAspect = drawSource.width / drawSource.height;
    const canvasAspect = w / h;
    let dW: number, dH: number, dX: number, dY: number;

    if (frameAspect > canvasAspect) {
      dW = w;
      dH = w / frameAspect;
      dX = 0;
      dY = (h - dH) / 2;
    } else {
      dH = h;
      dW = h * frameAspect;
      dX = (w - dW) / 2;
      dY = 0;
    }

    ctx.drawImage(drawSource, dX, dY, dW, dH);
  }, []);

  // -- Mouse interaction: spin logo only when mouse moves horizontally --
  useEffect(() => {
    const container = logoContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseEnabledRef.current) return;
      if (scrollProgressRef.current > 0.1) return;

      // Skip until we have a valid previous position
      if (!mouseInitRef.current) {
        lastMouseXRef.current = e.clientX;
        mouseInitRef.current = true;
        return;
      }

      const deltaX = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;

      // Deadzone to avoid jitter from micro-movements
      if (Math.abs(deltaX) > 2) {
        targetFrameRef.current += deltaX * 0.12;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      // Reset so first move initializes position cleanly
      mouseInitRef.current = false;
      lastMouseXRef.current = e.clientX;
    };
    const handleMouseLeave = () => {
      mouseInitRef.current = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // -- Render loop: lerp displayFrame toward targetFrame for smooth motion --
  useEffect(() => {
    if (!hasFirstFrame) return;

    let animFrame: number;
    const LERP_SPEED = 0.12; // Lower = smoother, higher = more responsive

    function tick() {
      // Smooth interpolation: displayFrame eases toward targetFrame
      const diff = targetFrameRef.current - displayFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        displayFrameRef.current += diff * LERP_SPEED;
      } else {
        displayFrameRef.current = targetFrameRef.current;
      }

      // Convert float to integer frame index, wrap around
      const frameIdx =
        ((Math.round(displayFrameRef.current) % TOTAL_FRAMES) + TOTAL_FRAMES) %
        TOTAL_FRAMES;
      drawFrame(frameIdx);

      animFrame = requestAnimationFrame(tick);
    }

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [hasFirstFrame, drawFrame]);

  // -- GSAP ScrollTrigger — direct DOM, zero re-renders --
  useEffect(() => {
    const el = sectionRef.current;
    const logoCtn = logoContainerRef.current;
    const heroText = heroTextRef.current;
    const h1El = h1Ref.current;
    const subtitleEl = subtitleRef.current;
    const ctaEl = ctaRef.current;

    if (!el || !logoCtn || !heroText || !h1El || !subtitleEl || !ctaEl) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
      onUpdate: (self) => {
        const p = self.progress;
        scrollProgressRef.current = p;

        // Logo transform
        const phase = remap(p, 0, 0.7);
        const logoScale = 1 - phase * 0.55;
        const logoY = phase * -12;
        logoCtn.style.transform = `translateY(${logoY}vh) scale(${logoScale})`;
        logoCtn.style.pointerEvents = p < 0.1 ? "auto" : "none";

        // Text container
        const textPhase = remap(p, 0.65, 0.85);
        heroText.style.opacity = String(textPhase);
        heroText.style.pointerEvents = textPhase > 0.3 ? "auto" : "none";

        // Staggered reveals
        const h1p = remap(p, 0.65, 0.82);
        h1El.style.opacity = String(h1p);
        h1El.style.transform = `translateY(${(1 - h1p) * 30}px)`;

        const subP = remap(p, 0.72, 0.87);
        subtitleEl.style.opacity = String(subP);
        subtitleEl.style.transform = `translateY(${(1 - subP) * 20}px)`;

        const ctaP = remap(p, 0.78, 0.92);
        ctaEl.style.opacity = String(ctaP);
        ctaEl.style.transform = `translateY(${(1 - ctaP) * 15}px)`;

        if (p > 0.05) setPastStart(true);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* -- Logo Canvas -- BIG */}
        <div
          ref={logoContainerRef}
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ willChange: "transform" }}
        >
          <canvas
            ref={canvasRef}
            className="h-[140vh] w-[140vh] sm:h-[150vh] sm:w-[150vh] md:h-[160vh] md:w-[160vh]"
          />
        </div>

        {/* -- Hero text — appears in stage 3 -- */}
        <div
          ref={heroTextRef}
          className="relative z-20 flex flex-col items-center px-6 pt-[56vh] text-center"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          <h1
            ref={h1Ref}
            className="mb-5 max-w-3xl text-[clamp(1.75rem,5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em]"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              willChange: "transform, opacity",
            }}
          >
            {t.hero.headline.split(" ").map((word, i) => {
              const clean = word.replace(/\*/g, "");
              const highlighted = word.startsWith("*") && word.endsWith("*");
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
              transform: "translateY(20px)",
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
              transform: "translateY(15px)",
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

        {/* -- Scroll Indicator -- */}
        <ScrollIndicator visible={!pastStart} />
      </div>
    </section>
  );
}
