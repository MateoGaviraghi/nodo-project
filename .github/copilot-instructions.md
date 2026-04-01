# Copilot Instructions — Nodo Website

## Proyecto

Sitio web de **Nodo**, software house boutique argentina. Nivel de calidad: Vercel / Linear / Raycast.

- **Dominio:** nodo.com.ar
- **Tagline:** "Nodo. El punto donde tu idea se conecta con el mundo."
- **Frase:** "Transformamos ideas en software."

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + CSS custom variables
- Framer Motion + GSAP ScrollTrigger
- React Three Fiber + @react-three/drei
- Lenis (smooth scroll)
- Lucide React (iconos)

## Paleta de Colores (SOLO ESTOS)

```
#0a0a0a  → nodo-black    → Fondo principal (SIEMPRE oscuro)
#ffffff  → nodo-white    → Texto principal
#2785fe  → nodo-blue     → CTAs, links, interactivos
#00c1f4  → nodo-cyan     → Acentos, hovers, highlights
#8b2fef  → nodo-purple   → Acentos premium
#5863f2  → nodo-indigo   → Complementario
#1a1a2e  → gray-900
#16213e  → gray-800
#2a2a4a  → gray-700
#3a3a5c  → gray-600
#8888aa  → gray-400
#b0b0cc  → gray-300
#d0d0e8  → gray-200
#00d68f  → success
#ffaa00  → warning
#ff3d71  → error
```

## Gradiente de Marca

```css
background: linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%);
```

Usar con moderación: solo en logo, CTAs hero, líneas decorativas, bordes hover.

## CSS Variables

```css
:root {
  --nodo-black: #0a0a0a;
  --nodo-white: #ffffff;
  --nodo-blue: #2785fe;
  --nodo-cyan: #00c1f4;
  --nodo-purple: #8b2fef;
  --nodo-indigo: #5863f2;
  --nodo-gray-900: #1a1a2e;
  --nodo-gray-800: #16213e;
  --nodo-gray-700: #2a2a4a;
  --nodo-gray-600: #3a3a5c;
  --nodo-gray-400: #8888aa;
  --nodo-gray-300: #b0b0cc;
  --nodo-gradient-full: linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%);
  --nodo-gradient-short: linear-gradient(135deg, #8b2fef, #00c1f4);
  --nodo-shadow-blue: 0 4px 30px rgba(39, 133, 254, 0.15);
  --nodo-shadow-purple: 0 4px 30px rgba(139, 47, 239, 0.15);
  --nodo-shadow-glow: 0 0 40px rgba(0, 193, 244, 0.1);
}
```

## Tipografía

- **Principal:** Codec Pro (Regular + Italic en `public/fonts/`)
- **Cargar con:** `next/font/local`
- **Fallback:** Poppins (Google Fonts, weights: 300-800)
- **Mono:** JetBrains Mono / Fira Code
- **NUNCA:** Arial, Times New Roman, Helvetica, system fonts

## Reglas de Código

- Dark mode SIEMPRE — fondo `#0a0a0a`, nunca blanco
- Usar Tailwind classes con colores custom `nodo-*` (definidos en tailwind.config.ts)
- Usar CSS variables `--nodo-*` en estilos custom
- Glassmorphism: `backdrop-filter: blur(12px)` + `border: 1px solid rgba(255,255,255,0.06)`
- Componentes con Framer Motion `whileInView` para reveal animations
- Mobile-first responsive
- Animaciones: 200-300ms ease, fade-up con stagger
- Iconos: solo Lucide React (outlined)
- border-radius: max 16px cards, 8px buttons
- Bilingüe ES/EN con React Context + localStorage

## Tailwind Colors Config

```ts
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

## Estructura de Componentes

- `src/components/layout/` — Navbar, Footer, WhatsAppButton, CustomCursor
- `src/components/hero/` — HeroSection, Logo3D, ScrollIndicator
- `src/components/sections/` — ServicesPreview, StatsRow, ProjectsPreview, TestimonialsMarquee, CTASection
- `src/components/ui/` — GlassCard, GradientButton, GhostButton, AnimatedCounter, FlipCard, MagneticButton, TextReveal, SectionTitle
- `src/components/three/` — Scene, LogoModel, FloatingShapes
- `src/hooks/` — useSmoothScroll, useScrollProgress, useMagneticEffect, useLanguage
- `src/lib/` — translations, projects, testimonials, constants

## Patterns

### GlassCard
```css
background: rgba(26, 26, 46, 0.6);
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 8px;
backdrop-filter: blur(12px);
/* hover: */
border-color: rgba(39, 133, 254, 0.3);
box-shadow: 0 4px 30px rgba(39, 133, 254, 0.12);
transform: translateY(-4px);
```

### Gradient Text
```css
background: linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Flip Card
```css
.flip-card { perspective: 1000px; }
.flip-card-inner { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
.flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
```

## NO HACER

- Fondos blancos
- Stock photos genéricas
- Tipografías del sistema
- Gradiente en exceso
- Sombras colored exageradas
- border-radius excesivo (no pill buttons)
- Código sin TypeScript types
