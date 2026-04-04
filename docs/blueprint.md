# Blueprint — Sitio Web Nodo (nodo.com.ar)

## Context

Nodo (antes Nexa Soft) es una software house boutique argentina que necesita su sitio web principal. El sitio debe ser una experiencia digital premium de nivel Vercel/Linear/Raycast con animaciones 3D, scroll interactivo y diseño dark minimalista. Se construirá en un repositorio separado y este plan servirá como guía para ejecutar en Claude Code + VS Code.

**Nombre:** Nodo
**Dominio:** nodo.com.ar
**Tagline:** "Nodo. El punto donde tu idea se conecta con el mundo."
**Frase de servicio:** "Transformamos ideas en software."

---

## Tech Stack

```
Framework:     Next.js 14 (App Router) + TypeScript
Estilos:       Tailwind CSS + CSS custom variables
Animaciones:   Framer Motion + GSAP ScrollTrigger
3D:            React Three Fiber + @react-three/drei
Scroll:        Lenis (smooth scroll)
Iconos:        Lucide React
Deploy:        Vercel
```

---

## Estructura del Proyecto

```
nodo-web/
├── public/
│   ├── fonts/
│   │   ├── CodecPro-Regular.ttf
│   │   └── CodecPro-Italic.ttf
│   ├── logos/
│   │   ├── logo-n.png              (isotipo N gradiente)
│   │   └── logo-n-3d.glb           (modelo 3D del logo si se genera)
│   ├── videos/
│   │   └── nodo-n-loop.mp4         (video 3D de la N flotando)
│   ├── images/
│   │   ├── projects/               (mockups de proyectos)
│   │   └── team/                   (fotos Mateo + socio)
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx              (root layout: fonts, metadata, navbar, footer, cursor, WhatsApp)
│   │   ├── page.tsx                (HOME: hero + sections)
│   │   ├── servicios/
│   │   │   └── page.tsx            (servicios detallados)
│   │   ├── proyectos/
│   │   │   └── page.tsx            (portfolio)
│   │   ├── nosotros/
│   │   │   └── page.tsx            (about + flip cards)
│   │   └── contacto/
│   │       └── page.tsx            (form + calendly + whatsapp)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── CustomCursor.tsx
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Logo3D.tsx          (React Three Fiber — N 3D)
│   │   │   └── ScrollIndicator.tsx
│   │   ├── sections/
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── StatsRow.tsx
│   │   │   ├── ProjectsPreview.tsx
│   │   │   ├── TestimonialsMarquee.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   └── CTASection.tsx
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GradientButton.tsx
│   │   │   ├── GhostButton.tsx
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── FlipCard.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── TextReveal.tsx
│   │   │   └── SectionTitle.tsx
│   │   └── three/
│   │       ├── Scene.tsx           (Canvas + lights + environment)
│   │       ├── LogoModel.tsx       (geometría 3D de la N)
│   │       └── FloatingShapes.tsx  (geometrías decorativas)
│   ├── hooks/
│   │   ├── useSmoothScroll.ts      (Lenis init)
│   │   ├── useScrollProgress.ts    (scroll % para 3D)
│   │   ├── useMagneticEffect.ts
│   │   └── useLanguage.ts          (ES/EN toggle)
│   ├── lib/
│   │   ├── translations.ts         (contenido ES/EN)
│   │   ├── projects.ts             (data de proyectos)
│   │   ├── testimonials.ts         (data de testimonios)
│   │   └── constants.ts            (colores, URLs, config)
│   ├── styles/
│   │   └── globals.css             (Tailwind + @font-face + CSS vars + cursor styles)
│   └── types/
│       └── index.ts
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── CLAUDE.md                       (contexto para Claude Code)
```

---

## Diseño por Página

### HOME (/)

```
┌─────────────────────────────────┐
│           NAVBAR                │  fixed, blur on scroll
├─────────────────────────────────┤
│                                 │
│         [N 3D FLOTANDO]         │  100vh, fondo #0a0a0a
│                                 │  Logo gira con scroll
│   "Transformamos tus ideas      │  Framer Motion stagger in
│        en software"             │  "ideas" con gradient text
│                                 │
│   Desarrollo · WordPress · IA   │  gray-400
│                                 │
│   [Empezar proyecto] [Conocer]  │  gradient + ghost button
│                                 │
│          ↓ scroll               │  animated chevron
├─────────────────────────────────┤
│                                 │
│   ── LO QUE HACEMOS ──         │  section title reveal
│                                 │
│  ┌────────┐┌────────┐┌────────┐│
│  │Dev a   ││WordPress││IA Auto ││  3 GlassCards
│  │medida  ││ Prof.   ││mación  ││  hover: glow + tilt
│  └────────┘└────────┘└────────┘│
│                                 │
├─────────────────────────────────┤
│                                 │
│  +20 proyectos  +15 clientes   │  AnimatedCounter
│  +5 años de experiencia        │  counts on scroll
│                                 │
├─────────────────────────────────┤
│                                 │
│   ── NUESTRO TRABAJO ──        │
│                                 │
│  ┌──────┐  ┌──────┐            │  Project cards
│  │ Proy │  │ Proy │  → Ver     │  hover: lift + glow
│  │  1   │  │  2   │  todos     │
│  └──────┘  └──────┘            │
│                                 │
├─────────────────────────────────┤
│                                 │
│   ←← Testimonial marquee →→    │  auto-scroll
│   "Quote..." — Cliente, Empresa │  pause on hover
│                                 │
├─────────────────────────────────┤
│                                 │
│   ── ¿TENÉS UNA IDEA? ──      │
│                                 │
│   "Hablemos y construyamos     │
│    algo que importe."          │
│                                 │
│   [Agendar una llamada]        │  gradient button → Calendly
│                                 │
├─────────────────────────────────┤
│          FOOTER                 │
│  Nodo · tagline · socials · ©  │
└─────────────────────────────────┘
```

### /servicios

- Hero: "Lo que hacemos" con línea gradient
- 3 bloques detallados (alternando layout izquierda/derecha):
  1. Desarrollo a medida — descripción + deliverables + tech pills
  2. WordPress profesional — descripción + deliverables + tech pills
  3. Automatización con IA — descripción + deliverables + tech pills
- Cada uno con CTA "Iniciar proyecto"

### /proyectos

- Hero: "Nuestro trabajo habla por nosotros"
- Grid 2 columnas de project cards
- Cada card: mockup oscuro + nombre + categoría pill + descripción
- 4-6 proyectos (mix real + placeholder)
- Hover: lift + border glow

### /nosotros

- Hero: "El equipo que hace que pase"
- Párrafo de filosofía/historia de Nodo
- Values grid (2x2): "Código limpio" / "Diseño con propósito" / "Comunicación directa" / "Resultados reales"
- **Flip Cards del equipo:**
  - Front: foto + nombre
  - Back (on click): rol, bio, skills, links
  - Animación CSS 3D transform rotateY con perspective

### /contacto

- Split layout:
  - Izquierda: headline + WhatsApp button + Calendly button
  - Derecha: formulario (nombre, email, tipo servicio, presupuesto, mensaje)
- Input style: bg gray-900, border subtle, focus: border blue
- Submit: gradient button, full width

---

## Sistema de Animaciones

### Fondo Animado (Mesh Gradient — GLOBAL, en layout.tsx)

El sitio NO usa fondo negro plano. Tiene mesh gradient animado global:
- Fondo base #0a0a0a + 3-4 orbs de colores de marca en 5-8% opacidad
- Orbs ~600px, blur(120px), animados en loops de 30-60s
- Componente MeshBackground.tsx, position: fixed, z-index: 0
- Sutil como Linear.app — da vida sin distraer

### Hero — Logo 3D con Scroll (3 ETAPAS)

```
ETAPA 1 (scroll 0%):     Logo N GRANDE centrado, girando 360° loop. Sin texto. 100vh.
ETAPA 2 (scroll 0-70%):  Logo SUBE + ACHICA + gira lento. GSAP scrub fluido. Pin.
ETAPA 3 (scroll 70%+):   Logo 150px arriba, idle. Headline + CTAs stagger fade-up. Navbar visible.
```

**Implementación:**
- Hero container: height 300vh. Inner: position sticky, top 0, height 100vh.
- GSAP ScrollTrigger con scrub: 1 y pin: true
- Logo: 160 frames PNG en canvas (frame = Math.floor(progress * 159)) o video con currentTime
- Ver `docs/prompt-fix-hero.md` y `docs/skills-map.md` para código de referencia completo

### Custom Cursor

```tsx
// Estado idle: círculo 12px, border gradient, mix-blend-mode: difference
// Estado hover: scale a 40px, border se vuelve gradient sólido
// Seguimiento: spring physics (lerp suave, no 1:1)
// Mobile: desactivado (solo desktop)
```

### Text Reveal (Section Titles)

```tsx
// Cada heading se divide en palabras
// Cada palabra: opacity 0 → 1, y: 20 → 0
// Stagger: 0.05s entre palabras
// Trigger: whileInView, viewport: { once: true, margin: "-100px" }
```

### Card Hover (GlassCard)

```css
/* Base */
background: rgba(26, 26, 46, 0.6);
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 8px;
backdrop-filter: blur(12px);
transition: all 300ms ease;

/* Hover */
border-color: rgba(39, 133, 254, 0.3);
box-shadow: 0 4px 30px rgba(39, 133, 254, 0.12);
transform: translateY(-4px);
```

### Flip Card (Team)

```css
.flip-card { perspective: 1000px; }
.flip-card-inner {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
.flip-card-back { transform: rotateY(180deg); backface-visibility: hidden; }
```

### Magnetic Button

```tsx
// On mouse enter: registrar posición del botón
// On mouse move: calcular offset del mouse al centro
// Aplicar transform: translate(offsetX * 0.3, offsetY * 0.3)
// On mouse leave: spring back a translate(0, 0)
```

### Testimonial Marquee

```tsx
// CSS animation: translateX(0) → translateX(-50%) en loop
// Duplicar contenido para loop infinito
// Pause on hover: animation-play-state: paused
// Velocidad: ~30-40s por loop completo
```

---

## Paleta de Colores — Tailwind Config

```ts
// tailwind.config.ts
colors: {
  nodo: {
    black: '#0a0a0a',
    white: '#ffffff',
    blue: '#2785fe',
    cyan: '#00c1f4',
    purple: '#8b2fef',
    indigo: '#5863f2',
    gray: {
      900: '#1a1a2e',
      800: '#16213e',
      700: '#2a2a4a',
      600: '#3a3a5c',
      400: '#8888aa',
      300: '#b0b0cc',
      200: '#d0d0e8',
    },
    success: '#00d68f',
    warning: '#ffaa00',
    error: '#ff3d71',
  }
}
```

---

## Sistema Bilingüe (ES/EN)

```ts
// src/lib/translations.ts
export const translations = {
  es: {
    nav: {
      servicios: 'Servicios',
      proyectos: 'Proyectos',
      nosotros: 'Nosotros',
      contacto: 'Contacto',
      cta: 'Empezar proyecto',
    },
    hero: {
      headline: 'Transformamos tus *ideas* en software',
      subtitle: 'Desarrollo a medida · WordPress profesional · Automatización con IA',
      cta_primary: 'Empezar proyecto',
      cta_secondary: 'Conocer más',
    },
    // ... completo para cada sección
  },
  en: {
    nav: {
      servicios: 'Services',
      proyectos: 'Projects',
      nosotros: 'About',
      contacto: 'Contact',
      cta: 'Start a project',
    },
    hero: {
      headline: 'We turn your *ideas* into software',
      subtitle: 'Custom development · Professional WordPress · AI Automation',
      cta_primary: 'Start a project',
      cta_secondary: 'Learn more',
    },
  }
}
```

**Implementación:** React Context + localStorage para persistir preferencia.

---

## Fases de Desarrollo

### Fase 1 — Fundación (Semana 1)
1. `npx create-next-app@latest nodo-web` con TypeScript + Tailwind + App Router
2. Configurar tailwind.config.ts con colores Nodo
3. Configurar globals.css: @font-face Codec Pro + CSS variables + base styles
4. Crear layout.tsx con metadata SEO + fonts
5. Crear componentes base: Navbar, Footer, WhatsAppButton
6. Implementar smooth scroll con Lenis
7. Implementar sistema bilingüe (Context + translations.ts)
8. Deploy inicial en Vercel

### Fase 2 — Hero + 3D (Semana 2)
1. Instalar React Three Fiber + @react-three/drei
2. Crear Logo3D.tsx con geometría de la N (o cargar video .mp4 como textura)
3. Implementar scroll-linked animation del logo (GSAP ScrollTrigger)
4. Crear HeroSection.tsx con headline + CTAs
5. Implementar TextReveal para animación de texto
6. Implementar ScrollIndicator
7. Custom cursor (desktop only)

### Fase 3 — Home Sections (Semana 3)
1. ServicesPreview con GlassCard (3 columnas)
2. StatsRow con AnimatedCounter
3. ProjectsPreview con project cards
4. TestimonialsMarquee con auto-scroll
5. CTASection con MagneticButton
6. Scroll animations en todas las secciones (Framer Motion whileInView)

### Fase 4 — Subpáginas (Semana 4)
1. /servicios — 3 servicios detallados con layout alternado
2. /proyectos — grid de project cards
3. /nosotros — historia + values + FlipCards del equipo
4. /contacto — formulario + Calendly + WhatsApp

### Fase 5 — Polish (Semana 5)
1. Responsive completo (mobile-first, todos los breakpoints)
2. Page transitions entre rutas
3. Magnetic buttons
4. Parallax en secciones con depth layers
5. Floating 3D shapes decorativos en background
6. Performance: lazy load 3D, code splitting, Suspense boundaries
7. SEO: metadata, OG images, sitemap, robots.txt
8. Testing cross-browser y cross-device

---

## Performance

- **3D:** Lazy load `<Canvas>` con `React.lazy()` + `<Suspense>`
- **Video:** `<video>` con `preload="none"` hasta que entre en viewport
- **Imágenes:** Next.js `<Image>` con `priority` solo en above-the-fold
- **Fonts:** `next/font/local` para Codec Pro (auto-optimización)
- **Animations:** `will-change` solo donde necesario, `transform` y `opacity` para GPU
- **Code Split:** Cada página es un chunk separado (App Router lo hace automático)
- **Target:** LCP < 2.5s, CLS < 0.1, FID < 100ms

---

## Verificación

1. **Visual:** Preview en Chrome con `preview_start` — verificar cada página
2. **Responsive:** `preview_resize` a 375px (mobile), 768px (tablet), 1440px (desktop)
3. **Animaciones:** Scroll por cada sección, verificar triggers y timing
4. **3D:** Verificar que el logo carga y responde al scroll
5. **Bilingüe:** Toggle ES/EN y verificar que todo cambia
6. **Links:** Click en todas las rutas del navbar
7. **Formulario:** Llenar y submit del form de contacto
8. **WhatsApp:** Click abre wa.me correctamente
9. **Performance:** Lighthouse score > 90 en todas las categorías
10. **Build:** `npm run build` sin errores

---

## Archivos Críticos de Referencia

| Archivo | Ubicación | Contenido |
|---|---|---|
| Brand guidelines | `NEXA-SOFT-PROJECTS/CLAUDE.md` | Colores, fonts, reglas de diseño |
| Logo isotipo | `NEXA-SOFT-PROJECTS/logo-sin-fondo-nodo.png` | Logo N con gradiente |
| Video 3D | `NEXA-SOFT-PROJECTS/nodo-v6-video.mp4` | Video loop de la N flotando (última versión) |
| Font Regular | `NEXA-SOFT-PROJECTS/codec-pro/CodecPro-Regular.ttf` | Tipografía principal |
| Font Italic | `NEXA-SOFT-PROJECTS/codec-pro/CodecPro-Italic.ttf` | Tipografía italic |
| Paleta | `NEXA-SOFT-PROJECTS/paleta de colores nodo.png` | Referencia visual de colores |
