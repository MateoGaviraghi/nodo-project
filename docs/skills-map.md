# Skills Map — Cómo aplicar cada skill a Nodo

> Este archivo conecta los skills genéricos con las implementaciones ESPECÍFICAS de este proyecto.
> Antes de usar un skill, leé la sección correspondiente acá para darle contexto.

---

## 🎬 HERO — Logo 3D con Scroll (la pieza central)

**Skills a combinar:** `gsap-scrolltrigger` + `scroll-experience` + `ui-animation`

### FONDO ANIMADO (Mesh Gradient)

NO usar fondo negro plano. El sitio necesita un fondo vivo tipo "aurora boreal" con mesh gradients animados.

**Componente:** `MeshBackground.tsx` — va en `layout.tsx`, NO en el hero. Es GLOBAL.
- Fondo base: `#0a0a0a`
- 3-4 orbs/blobs de colores de marca en opacidad MUY baja (5-8%)
  - Orb 1: nodo-purple `rgba(139, 47, 239, 0.07)` — arriba izquierda
  - Orb 2: nodo-blue `rgba(39, 133, 254, 0.06)` — abajo derecha
  - Orb 3: nodo-cyan `rgba(0, 193, 244, 0.04)` — centro derecha
  - Orb 4: nodo-indigo `rgba(88, 99, 242, 0.05)` — abajo izquierda
- Cada orb: ~500-700px, `border-radius: 50%`, `filter: blur(120px)`
- Animación: `translate` + `scale` suave, loops infinitos 30-60s, tiempos alternados
- Es sutil, elegante, casi imperceptible pero da vida
- `position: fixed; inset: 0; z-index: 0`

### EXPERIENCIA DE SCROLL — 3 ETAPAS

**Assets:** 160 frames en `public/logos/frames-logo/001-160.png` o video en `public/videos/video-logo-N-sin-fondo.mp4`

**ETAPA 1 — Logo girando (scroll 0%, pantalla completa)**
- Logo N 3D CENTRADO, GRANDE (~40% viewport)
- Girando 360° en loop automático (~8s por vuelta)
- Fondo mesh gradient detrás
- NO hay texto, NO hay headline
- Solo indicador "SCROLL ↓" abajo
- 100vh

**ETAPA 2 — Scroll transition (scroll 0% → 70%)**
- Logo SIGUE girando pero más lento
- Se MUEVE hacia arriba y se REDUCE (de ~40vh a ~150px)
- Transición FLUIDA, vinculada 1:1 al scroll (GSAP scrub: 1)
- Hero container PINNEADO (GSAP pin o position sticky)
- Frame del logo cambia según scroll: `frame = Math.floor(scrollProgress * 159)`

**ETAPA 3 — Hero revelado (scroll 70%+)**
- Logo en posición final: centrado arriba, ~150px, rotación idle MUY suave (oscilación 2-3°)
- APARECEN con stagger fade-up (0.15s entre elementos):
  1. "Transformamos tus **ideas** en software" (ideas = gradient text)
  2. "Desarrollo a medida · WordPress profesional · Automatización con IA"
  3. [Empezar proyecto] + [Conocer más]
- Navbar se hace visible con fade-in

**Implementación GSAP:**
```tsx
// Hero container: height: 300vh (3x pantalla para scroll space)
// Inner content: position: sticky; top: 0; height: 100vh

gsap.timeline({
  scrollTrigger: {
    trigger: heroContainer,
    start: "top top",
    end: "70% top",
    scrub: 1,
    pin: true,
  }
})
.to(logoRef, { y: "-30vh", scale: 0.35, duration: 1 })  // logo sube y achica
.to(textRef, { opacity: 1, y: 0, duration: 0.3 }, ">")    // texto aparece al final

// Frame animation (canvas):
// Precargar 160 frames con new Image()
// En scroll: canvas.drawImage(frames[currentFrame], ...)
// currentFrame = Math.floor(scrollProgress * 159)
```

---

## 🖱️ CUSTOM CURSOR

**Skill:** `ui-animation`

**Implementación Nodo:**
- Círculo 12px con border gradiente de marca
- `mix-blend-mode: difference` para contraste
- Spring physics: `lerp(current, target, 0.15)` — NO seguir 1:1, sino con delay suave
- Hover sobre links/botones: scale a 40px, border gradient sólido
- Mobile: desactivado completamente (`window.matchMedia('(hover: hover)')`)
- Usar `requestAnimationFrame` para performance
- CSS: `pointer-events: none` + `position: fixed` + `z-index: 9999`

---

## ✨ TEXT REVEAL (Títulos de sección)

**Skills:** `scroll-animations` + `ui-animation`

**Implementación Nodo:**
```tsx
// Framer Motion — cada palabra individualmente
// Split headline en array de palabras
// Container: whileInView trigger
// Cada palabra: variants con stagger 0.05s
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  {words.map((word, i) => (
    <motion.span
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: i * 0.05 } }
      }}
    >
      {word}{" "}
    </motion.span>
  ))}
</motion.div>
```

---

## 🃏 GLASSCARDS (Servicios preview)

**Skills:** `tailwindcss-animations` + `ui-animation`

**Implementación Nodo:**
- 3 cards en grid (mobile: 1 col, tablet: 2, desktop: 3)
- Cada card: ícono Lucide + título + descripción
- **Base:** `bg-nodo-gray-900/60 backdrop-blur-[12px] border border-white/[0.06] rounded-lg`
- **Hover:** `border-nodo-blue/30 shadow-[0_4px_30px_rgba(39,133,254,0.12)] -translate-y-1`
- Transición: `transition-all duration-300 ease-out`
- Entrada: Framer Motion stagger whileInView (fade-up, 0.1s delay entre cards)
- Ícono: color `nodo-cyan` o gradient clip

---

## 🔢 ANIMATED COUNTERS (Stats row)

**Skill:** `ui-animation`

**Implementación Nodo:**
- 3 stats: "+20 proyectos", "+15 clientes", "+5 años"
- Counter animado: contar de 0 al target cuando entra en viewport
- Usar `whileInView` de Framer Motion como trigger
- Duración: ~2 segundos con easing
- Formato: "+" prefix + número + label debajo
- Font: Codec Pro Bold para el número, Regular para el label

---

## 📦 PROJECT CARDS (Preview de proyectos)

**Skills:** `tailwindcss-advanced-layouts` + `ui-animation`

**Implementación Nodo:**
- Grid 2 columnas (mobile: 1)
- Cada card: mockup/screenshot oscuro + nombre + categoría pill + descripción corta
- **Hover:** lift (-translate-y-2) + border glow (nodo-blue/30)
- Categorías como pills: `bg-nodo-purple/10 text-nodo-purple text-xs px-3 py-1 rounded-full`
- Link "Ver todos →" al final con hover underline animado

---

## 📜 TESTIMONIALS MARQUEE

**Skill:** `tailwindcss-animations`

**Implementación Nodo:**
```css
/* Marquee infinito */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  animation: marquee 35s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
```
- Duplicar el contenido para loop seamless
- Cada item: quote en `text-nodo-gray-300` + "— Nombre, Empresa" en `text-nodo-gray-400`
- Background: `bg-nodo-gray-900/40` con border top/bottom sutil

---

## 🧲 MAGNETIC BUTTONS

**Skill:** `ui-animation`

**Implementación Nodo:**
```tsx
// Hook useMagneticEffect
// onMouseMove: calcular offset del cursor al centro del botón
// Aplicar transform con spring: translate(dx * 0.3, dy * 0.3)
// onMouseLeave: spring back a (0, 0)
// Solo en desktop (matchMedia hover: hover)
```
- Aplicar en: CTA principal del hero, botón de contacto, CTAs de secciones
- Intensidad: 0.3 (30% del offset) — sutil, no agresivo

---

## 🔄 FLIP CARDS (Equipo en /nosotros)

**Skills:** `ui-animation` + `tailwindcss-animations`

**Implementación Nodo:**
- Click (no hover) para activar flip
- **Front:** Foto + nombre centrado
- **Back:** Rol, bio corta, skills como pills, links (GitHub, LinkedIn)
- CSS 3D Transform: `perspective(1000px)` + `rotateY(180deg)`
- Transición: `0.6s cubic-bezier(0.4, 0, 0.2, 1)`
- `backface-visibility: hidden` en ambas caras
- `transform-style: preserve-3d` en el inner container

---

## 📱 RESPONSIVE (Mobile-first)

**Skill:** `tailwindcss-mobile-first`

**Breakpoints Nodo:**
- **Base (mobile):** 1 columna, font sizes reducidos, nav hamburger, sin cursor custom, sin 3D pesado
- **sm (640px):** Ajustes menores
- **md (768px):** 2 columnas en grids, sidebar en contacto
- **lg (1024px):** Navbar horizontal completo
- **xl (1280px):** Max-width containers, espaciado generoso
- **2xl (1536px):** Ultra-wide, hero con más breathing room

**Mobile específico:**
- Hero: sin 3D Canvas, usar imagen estática del logo o video ligero
- Cursor custom: desactivado
- Animaciones: reducir complejidad (prefers-reduced-motion)
- Marquee: velocidad más lenta en touch

---

## 🌐 BILINGÜE (ES/EN)

**Skill:** `nextjs-react-typescript`

**Implementación Nodo:**
- React Context: `LanguageProvider` con `useLanguage()` hook
- Toggle: botón ES/EN en navbar
- Persistencia: `localStorage.setItem('nodo-lang', 'es'|'en')`
- Default: `'es'` (español argentino)
- Archivo: `src/lib/translations.ts` con objeto `{ es: {...}, en: {...} }`
- CADA texto visible debe venir de translations, nunca hardcodeado

---

## 🚀 SEO & DEPLOY

**Skills:** `seo-audit` + `schema-markup` + `deploy-to-vercel`

**SEO específico Nodo:**
- Title format: "Nodo | {página}" (ej: "Nodo | Desarrollo de Software a Medida")
- Meta description: ~155 chars, incluir "software", "Argentina", servicio clave
- OG Image: dark con logo N + tagline
- Schema: Organization (name: Nodo, url: nodo.com.ar) + WebSite + Service (x3)
- Sitemap: auto-generado con next-sitemap
- robots.txt: allow all
- Alt text en TODAS las imágenes
- Semantic HTML: h1 único por página, nav, main, section, footer

**Deploy:**
- Vercel con dominio nodo.com.ar
- Environment: production
- Build command: `npm run build`
- Output: `.next/`
