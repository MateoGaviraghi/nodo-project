# PROMPT — COPIAR TODO ENTRE LAS LÍNEAS (incluir las instrucciones, NO las líneas)

---

```
Leé CLAUDE.md, docs/blueprint.md y docs/skills-map.md.

TAREA URGENTE: Rehacer COMPLETAMENTE la animación del logo en HeroSection.tsx.

## EL PROBLEMA ACTUAL

El approach actual usa un <video> y trata de controlar video.currentTime con scroll. Esto NO FUNCIONA porque los browsers no hacen seek frame-a-frame de video — produce buffering, lag, saltos y el logo no gira fluido.

## LA SOLUCIÓN: USAR LOS 160 FRAMES PNG

Ya tenemos 160 imágenes PNG del logo en todas sus posiciones de rotación en `public/logos/frames-logo/001.png` hasta `160.png`. Cada frame es una posición diferente del logo girando 360°. Frame 001 = 0°, frame 080 = 180°, frame 160 = 360°.

Con imágenes tenemos control PERFECTO — sin lag, sin buffering, sin bugs.

## COMPORTAMIENTO EXACTO QUE NECESITO

### Cuando entrás al sitio (scroll = 0):
- El logo aparece CENTRADO y GRANDE en la pantalla
- Está GIRANDO automáticamente en loop (pasando por los 160 frames como un flipbook)
- Velocidad de giro: ~8 segundos por vuelta completa
- Esto se logra con un timer que avanza el frame cada ~50ms (8000ms / 160 frames)
- El fondo mesh gradient está detrás
- NO hay texto, NO hay headline — solo el logo girando

### Cuando hacés scroll (0% → 70%):
- El logo SIGUE GIRANDO (los frames siguen avanzando)
- Pero ADEMÁS se mueve hacia arriba y se achica
- La sensación es como que el logo "gira cayendo" hacia su posición final
- El giro NO se detiene durante el scroll — sigue animado, pero se va achicando
- Es como si estuvieras viendo una moneda girar mientras cae

### Cuando el scroll llega al final (70%+):
- El logo queda en su posición final: arriba, chico (~150px), CERCA del headline
- El logo hace una oscilación suave (va y viene entre 2-3 frames, tipo "breathing")
- Aparece el headline con stagger fade-up: "El punto donde tu *idea*, se conecta con el *mundo*"
- Aparecen subtitle y CTAs

## IMPLEMENTACIÓN — CÓDIGO EXACTO

Reemplazar TODO el contenido de `src/components/hero/HeroSection.tsx` con esta lógica:

```tsx
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
const FRAME_DURATION = 50; // ms por frame en idle (~8 seg por vuelta: 160 * 50 = 8000ms)

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function remap(v: number, lo: number, hi: number) {
  return clamp((v - lo) / (hi - lo), 0, 1);
}

// Generar paths de los frames: /logos/frames-logo/001.png ... 160.png
function getFramePath(index: number): string {
  return `/logos/frames-logo/${String(index + 1).padStart(3, "0")}.png`;
}

export default function HeroSection() {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const idleTimerRef = useRef(0);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [framesLoaded, setFramesLoaded] = useState(false);

  // ── Precargar los 160 frames ──
  useEffect(() => {
    const frames: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          setFramesLoaded(true);
        }
      };
      frames.push(img);
    }

    framesRef.current = frames;
  }, []);

  // ── Dibujar un frame en el canvas ──
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;

    const img = frames[frameIndex % TOTAL_FRAMES];
    if (!img || !img.complete) return;

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

    // Dibujar centrado (contain)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let dW: number, dH: number, dX: number, dY: number;

    if (imgAspect > canvasAspect) {
      dW = w;
      dH = w / imgAspect;
      dX = 0;
      dY = (h - dH) / 2;
    } else {
      dH = h;
      dW = h * imgAspect;
      dX = (w - dW) / 2;
      dY = 0;
    }

    ctx.drawImage(img, dX, dY, dW, dH);
  }, []);

  // ── Animation loop principal ──
  useEffect(() => {
    if (!framesLoaded) return;

    let animFrame: number;
    let lastIdleTime = performance.now();

    function tick(now: number) {
      const progress = scrollProgressRef.current;

      if (progress < 0.05) {
        // ═══ ETAPA 1: Idle — logo gira automáticamente ═══
        const elapsed = now - lastIdleTime;
        if (elapsed >= FRAME_DURATION) {
          currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
          lastIdleTime = now;
        }
      } else if (progress < 0.7) {
        // ═══ ETAPA 2: Scroll — logo sigue girando + se mueve ═══
        // El frame avanza con el scroll (más scroll = más rotación)
        // Pero TAMBIÉN sigue avanzando por tiempo para que nunca se detenga
        const elapsed = now - lastIdleTime;
        // Giro más lento durante scroll (cada 80ms en vez de 50ms)
        if (elapsed >= 80) {
          currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
          lastIdleTime = now;
        }
      } else {
        // ═══ ETAPA 3: Logo quieto con breathing suave ═══
        // Oscilar entre currentFrame y currentFrame+2 (efecto "respira")
        const breathCycle = Math.sin(now * 0.002) * 1.5;
        const baseFrame = currentFrameRef.current;
        const breathFrame = Math.round(baseFrame + breathCycle);
        drawFrame(Math.abs(breathFrame) % TOTAL_FRAMES);
        animFrame = requestAnimationFrame(tick);
        return;
      }

      drawFrame(currentFrameRef.current);
      animFrame = requestAnimationFrame(tick);
    }

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [framesLoaded, drawFrame]);

  // ── GSAP ScrollTrigger ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
        setScrollProgress(self.progress);
      },
    });

    return () => st.kill();
  }, []);

  // ── Valores derivados del scroll ──
  const phase = remap(scrollProgress, 0, 0.7);
  const logoScale = 1 - phase * 0.55;   // 1 → 0.45
  const logoY = phase * -12;            // 0vh → -12vh (CERCA del texto)

  const textPhase = remap(scrollProgress, 0.65, 0.85);
  const h1Progress = remap(scrollProgress, 0.65, 0.82);
  const subProgress = remap(scrollProgress, 0.72, 0.87);
  const ctaProgress = remap(scrollProgress, 0.78, 0.92);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* ── Logo Canvas ── */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          style={{
            transform: `translateY(${logoY}vh) scale(${logoScale})`,
            willChange: "transform",
          }}
        >
          <canvas
            ref={canvasRef}
            className="h-[40vh] w-[40vh] sm:h-[45vh] sm:w-[45vh] md:h-[50vh] md:w-[50vh]"
          />
        </div>

        {/* ── Hero text — aparece en etapa 3 ── */}
        <div
          className="relative z-20 flex flex-col items-center px-6 pt-[58vh] text-center"
          style={{
            opacity: textPhase,
            pointerEvents: textPhase > 0.3 ? "auto" : "none",
          }}
        >
          <h1
            className="mb-5 max-w-3xl text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[1.08] tracking-[-0.03em]"
            style={{
              opacity: h1Progress,
              transform: `translateY(${(1 - h1Progress) * 30}px)`,
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
            className="mb-9 max-w-md text-[15px] leading-relaxed text-nodo-gray-400"
            style={{
              opacity: subProgress,
              transform: `translateY(${(1 - subProgress) * 20}px)`,
              willChange: "transform, opacity",
            }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="flex items-center gap-3"
            style={{
              opacity: ctaProgress,
              transform: `translateY(${(1 - ctaProgress) * 15}px)`,
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
        <ScrollIndicator visible={scrollProgress < 0.05} />
      </div>
    </section>
  );
}
```

## TAMBIÉN: Cambiar la frase del hero

En `src/lib/translations.ts`, cambiar:

```ts
// ES:
hero: {
  headline: "El punto donde tu *idea*, se conecta con el *mundo*",

// EN:
hero: {
  headline: "The point where your *idea* connects with the *world*",
```

## IMPORTANTE

- ELIMINAR el <video> del hero — ya no se usa. Todo es con los frames PNG.
- Los 160 frames ya están en `public/logos/frames-logo/001.png` a `160.png`
- El logo gira SIEMPRE — en idle gira rápido (50ms/frame), en scroll gira más lento (80ms/frame), en reposo "respira"
- El logo NUNCA se queda estático durante el scroll
- Verificar con preview tools después de implementar
- `npm run build` sin errores
```

---
