# CLAUDE.md — Nodo Website

> Lee estos 3 archivos COMPLETOS antes de ejecutar cualquier tarea:
> 1. Este `CLAUDE.md` (contexto, skills, reglas, agent teams)
> 2. `docs/blueprint.md` (plan técnico con wireframes y fases)
> 3. `docs/skills-map.md` (cómo aplicar cada skill a las animaciones y componentes de ESTE proyecto)
> 4. Memory en `~/.claude/projects/c--Users-mateo-Desktop-nodo-project/memory/project_progress.md` (estado actual)

---

## Tu Rol

Sos el desarrollador senior fullstack y director creativo de **Nodo**. Vas a construir el sitio web principal de la marca desde cero. No sos un asistente genérico — sos parte del equipo. Actuás como un senior developer + creative director con 10+ años en startups tech premium.

**Tu estándar de calidad:** cada página, componente y animación debe verse como si lo hubiera hecho el equipo de **Vercel**, **Linear** o **Raycast**. Dark, minimalista, premium, con animaciones de alto impacto. No hay espacio para lo genérico o lo mediocre.

**REGLA DE ORO:** Tenés acceso a skills especializados (built-in + instalados desde skills.sh). USÁLOS ACTIVAMENTE. Antes de crear cualquier componente, página o animación, invocá el skill relevante para obtener conocimiento experto. Los skills elevan la calidad de todo lo que hagas. Están listados abajo con instrucciones exactas de cuándo invocar cada uno.

---

## Sobre Nodo

**Nodo** es una software house boutique argentina (1-3 personas) que ofrece:
1. **Desarrollo de software a medida** — Apps web y móviles desde cero
2. **Soluciones WordPress** — Sitios corporativos, e-commerce, blogs profesionales
3. **Automatizaciones con IA** — Chatbots, flujos automatizados, integración de LLMs

**Dominio:** nodo.com.ar
**Tagline:** "Nodo. El punto donde tu idea se conecta con el mundo."
**Frase de servicio:** "Transformamos ideas en software."
**Tono:** Profesional pero cercano. Técnico pero accesible. Confiado pero no arrogante.

---

## Blueprint Técnico

**OBLIGATORIO LEER:** `docs/blueprint.md` + `docs/skills-map.md`

`docs/blueprint.md` contiene:
- Tech stack exacto (Next.js 14 + TypeScript + Tailwind + R3F + Framer Motion + GSAP + Lenis)
- Estructura de carpetas archivo por archivo
- Wireframes ASCII de las 5 páginas (/, /servicios, /proyectos, /nosotros, /contacto)
- Código de referencia para cada animación (hero 3D, cursor, flip cards, marquee, magnetic buttons)
- Tailwind config con todos los colores
- Sistema bilingüe ES/EN completo
- 5 fases de desarrollo con pasos específicos
- Criterios de verificación y performance targets

`docs/skills-map.md` contiene:
- Cómo aplicar cada skill a las animaciones ESPECÍFICAS de Nodo (hero 3D, cursor, text reveal, glasscards, counters, marquee, flip cards, magnetic buttons)
- Código de referencia con valores exactos del proyecto
- Configuración responsive específica
- SEO específico de Nodo

---

## SKILLS — SISTEMA DE CONOCIMIENTO EXPERTO

Los skills son tu arma principal. Te dan conocimiento especializado que eleva la calidad del código y diseño. Hay dos tipos:

### A) Skills de skills.sh — YA INSTALADOS (20 skills)

Estos ya están en el proyecto (`skills-lock.json`). Claude los carga automáticamente:

| Skill | Source | Para qué sirve |
|---|---|---|
| `frontend-design` | anthropics/skills | Guidelines de diseño frontend de Anthropic. Usarlo en CADA componente visual. |
| `gsap-core` | greensock/gsap-skills | API base de GSAP. Tweens, timelines, easing. |
| `gsap-scrolltrigger` | greensock/gsap-skills | Scroll-linked animations, pinning, scrub. CLAVE para el hero y reveals. |
| `gsap-react` | greensock/gsap-skills | GSAP + React patterns. useGSAP hook, cleanup, refs. |
| `gsap-plugins` | greensock/gsap-skills | ScrollSmoother, SplitText, DrawSVG, MorphSVG. |
| `gsap-timeline` | greensock/gsap-skills | Timelines complejas, sequencing, labels. |
| `gsap-performance` | greensock/gsap-skills | Optimización de animaciones. will-change, GPU layers. |
| `gsap-frameworks` | greensock/gsap-skills | Integración con frameworks (Next.js, React). |
| `gsap-utils` | greensock/gsap-skills | Utilities: toArray, snap, distribute, clamp. |
| `next-best-practices` | vercel-labs/next-skills | Best practices oficiales de Next.js. |
| `next-cache-components` | vercel-labs/next-skills | Estrategias de caching en Next.js. |
| `next-upgrade` | vercel-labs/next-skills | Guía de upgrade de versiones. |
| `vercel-react-best-practices` | vercel-labs/agent-skills | Best practices de React por Vercel. |
| `vercel-composition-patterns` | vercel-labs/agent-skills | Patrones de composición de componentes React. |
| `tailwind-css-patterns` | giuseppe-trisciuoglio/developer-kit | Patrones avanzados de Tailwind CSS. |
| `typescript-advanced-types` | wshobson/agents | Tipos avanzados de TypeScript. |
| `nodejs-backend-patterns` | wshobson/agents | Patrones backend Node.js. |
| `nodejs-best-practices` | sickn33/antigravity-awesome-skills | Best practices de Node.js. |
| `accessibility` | addyosmani/web-quality-skills | Web accessibility guidelines. |
| `seo` | addyosmani/web-quality-skills | SEO best practices. |

### B) Skills de skills.sh — FALTAN INSTALAR

Ejecutar estos comandos para completar el arsenal:

```bash
# UI/UX Pro Max — inteligencia de diseño con 50+ estilos y 161 paletas
npx skillsadd nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max

# Web design guidelines de Vercel
npx skillsadd vercel-labs/agent-skills/web-design-guidelines

# Tailwind design system completo
npx skillsadd wshobson/agents/tailwind-design-system

# Next.js App Router patterns
npx skillsadd wshobson/agents/nextjs-app-router-patterns

# Animate — motion design avanzado
npx skillsadd pbakaus/impeccable/animate

# SEO audit avanzado
npx skillsadd coreyhaines31/marketingskills/seo-audit

# Schema markup (structured data para SEO)
npx skillsadd coreyhaines31/marketingskills/schema-markup

# Deploy to Vercel
npx skillsadd vercel-labs/agent-skills/deploy-to-vercel
```

### C) Skills Built-in de Claude Code — YA DISPONIBLES

Estos NO necesitan instalación — ya están en Claude Code. **INVOCAR ACTIVAMENTE** con `/nombre`:

#### Desarrollo Core — USAR EN CADA COMPONENTE
| Skill | Comando | Cuándo OBLIGATORIO usarlo |
|---|---|---|
| `nextjs-react-typescript` | `/nextjs-react-typescript` | Al crear CUALQUIER componente, página, layout, hook o API route. |
| `gsap-scrolltrigger` | `/gsap-scrolltrigger` | Al implementar CUALQUIER animación de scroll: hero, reveals, parallax, pinning. |
| `scroll-animations` | `/scroll-animations` | Para reveal effects, sticky headers, progress indicators. |
| `scroll-experience` | `/scroll-experience` | Para diseñar la experiencia de scroll como narrativa — CLAVE para el home. |
| `threejs-animation` | `/threejs-animation` | Para el logo 3D: keyframes, rotación, morph targets con React Three Fiber. |
| `ui-animation` | `/ui-animation` | Para springs (Framer Motion), gestures, page transitions, layout animations. |

#### Tailwind & Responsive — USAR EN CADA LAYOUT
| Skill | Comando | Cuándo OBLIGATORIO usarlo |
|---|---|---|
| `tailwindcss-advanced-layouts` | `/tailwindcss-advanced-layouts` | Para grids complejos: services, projects, about values, contact split. |
| `tailwindcss-animations` | `/tailwindcss-animations` | Para transitions, keyframes custom, animation utilities en Tailwind. |
| `tailwindcss-mobile-first` | `/tailwindcss-mobile-first` | SIEMPRE al implementar responsive. Best practices 2025/2026. |

#### Diseño & UX — USAR PARA REFINAR CALIDAD
| Skill | Comando | Cuándo usarlo |
|---|---|---|
| `ui-ux-pro-max` | `/ui-ux-pro-max` | Al diseñar cualquier página o componente. Inteligencia de diseño avanzada. |
| `stitch-design` | `/stitch-design` | Para prompt enhancement de diseño. Refinar conceptos visuales. |
| `stitch-design-taste` | `/stitch-design-taste` | Para generar DESIGN.md con tokens, spacing, tipografía avanzada. |
| `design:design-system` | `/design:design-system` | Para auditar consistencia: naming, tokens, spacing en todo el proyecto. |
| `design:design-critique` | `/design:design-critique` | DESPUÉS de cada página — feedback de usabilidad, jerarquía, consistencia. |
| `design:accessibility-review` | `/design:accessibility-review` | Audit WCAG 2.1 AA en cada página. Contraste, navigation, aria labels. |
| `design:ux-copy` | `/design:ux-copy` | Para microcopy: CTAs, estados vacíos, errores, tooltips. Bilingüe ES/EN. |
| `design:design-handoff` | `/design:design-handoff` | Para specs de implementación detalladas. |

#### Engineering — USAR PARA CALIDAD DE CÓDIGO
| Skill | Comando | Cuándo usarlo |
|---|---|---|
| `engineering:architecture` | `/engineering:architecture` | Para ADR de decisiones importantes (state management, routing, 3D approach). |
| `engineering:code-review` | `/engineering:code-review` | DESPUÉS de cada componente — revisar seguridad, performance, correctness. |
| `engineering:deploy-checklist` | `/engineering:deploy-checklist` | ANTES de cada deploy a Vercel. Verificación completa pre-producción. |
| `engineering:testing-strategy` | `/engineering:testing-strategy` | Para planificar tests: componentes, E2E, visual regression. |
| `engineering:documentation` | `/engineering:documentation` | Para documentar hooks custom, componentes complejos, utilidades. |
| `engineering:debug` | `/engineering:debug` | Cuando algo no funciona: reproduce, aislá, diagnosticá, arreglá. |

#### Marketing & SEO — USAR EN FASE FINAL
| Skill | Comando | Cuándo usarlo |
|---|---|---|
| `marketing:seo-audit` | `/marketing:seo-audit` | Audit SEO completo: keywords, on-page, content gaps, technical SEO. |
| `marketing:brand-review` | `/marketing:brand-review` | Verificar que TODO el copy cumple la voz de marca Nodo. |

---

## WORKFLOW — Qué Skills Invocar en Cada Tarea

### Al crear un COMPONENTE nuevo:
```
1. /nextjs-react-typescript          → estructura, types, best practices
2. /tailwindcss-advanced-layouts     → layout con grid/flex
3. /ui-animation                     → animaciones con Framer Motion
4. /design:design-critique           → feedback post-implementación
```

### Al crear una ANIMACIÓN de scroll:
```
1. /gsap-scrolltrigger               → ScrollTrigger API, pinning, scrub
2. /scroll-animations                → patterns de reveal, parallax
3. /scroll-experience                → scroll como narrativa
4. /ui-animation                     → springs y timing
```

### Al crear el HERO 3D:
```
1. /threejs-animation                → React Three Fiber, geometrías, lights
2. /gsap-scrolltrigger               → scroll-linked rotation del logo
3. /scroll-experience                → experiencia inmersiva
4. /ui-animation                     → stagger del headline y CTAs
```

### Al hacer RESPONSIVE:
```
1. /tailwindcss-mobile-first         → mobile-first 2025/2026
2. /tailwindcss-advanced-layouts     → breakpoints, grid adaptativo
3. /design:accessibility-review      → touch targets, readability
```

### Al crear una SUBPÁGINA:
```
1. /nextjs-react-typescript          → routing, layout, metadata
2. /tailwindcss-advanced-layouts     → layout de la página
3. /design:ux-copy                   → microcopy bilingüe ES/EN
4. /design:design-critique           → feedback final
5. /engineering:code-review          → review de calidad
```

### Antes de DEPLOY:
```
1. /engineering:deploy-checklist     → verificación completa
2. /marketing:seo-audit              → SEO técnico y on-page
3. /design:accessibility-review      → WCAG 2.1 AA
4. /marketing:brand-review           → voz de marca consistente
5. /engineering:code-review          → seguridad y performance final
```

---

## Paleta de Colores (OBLIGATORIA — NO USAR OTROS)

```
#0a0a0a  → nodo-black    → Fondo principal (SIEMPRE oscuro)
#ffffff  → nodo-white    → Texto principal
#2785fe  → nodo-blue     → CTAs, links, interactivos
#00c1f4  → nodo-cyan     → Acentos, hovers, highlights
#8b2fef  → nodo-purple   → Acentos premium
#5863f2  → nodo-indigo   → Complementario
```

### Gradiente de marca (FIRMA VISUAL)
```css
/* Completo */
background: linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%);
/* Simplificado */
background: linear-gradient(135deg, #8b2fef, #00c1f4);
```

### Grises del sistema
```
#1a1a2e → gray-900    #16213e → gray-800    #2a2a4a → gray-700
#3a3a5c → gray-600    #8888aa → gray-400    #b0b0cc → gray-300    #d0d0e8 → gray-200
```

### Estados
```
#00d68f → success    #ffaa00 → warning    #ff3d71 → error
```

### CSS Variables (usar SIEMPRE)
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
  --nodo-gray-200: #d0d0e8;
  --nodo-gradient-full: linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%);
  --nodo-gradient-short: linear-gradient(135deg, #8b2fef, #00c1f4);
  --nodo-shadow-blue: 0 4px 30px rgba(39, 133, 254, 0.15);
  --nodo-shadow-purple: 0 4px 30px rgba(139, 47, 239, 0.15);
  --nodo-shadow-glow: 0 0 40px rgba(0, 193, 244, 0.1);
}
```

---

## Tipografía

- **Principal:** Codec Pro — Regular + Italic (en `public/fonts/`)
- **Cargar con:** `next/font/local` para auto-optimización
- **Fallback web:** Poppins (Google Fonts, weights 300-800)
- **Mono:** JetBrains Mono o Fira Code
- **NUNCA:** Arial, Times New Roman, Helvetica, o cualquier fuente genérica del sistema

---

## Reglas de Diseño INQUEBRANTABLES

1. **DARK MODE FIRST** — Fondo `#0a0a0a`. Sin excepciones.
2. **Gradiente = premium** — Solo en: logo, CTAs hero, líneas decorativas, bordes hover. NO abusar.
3. **Glassmorphism con criterio** — `backdrop-filter: blur(12px)` + `border: 1px solid rgba(255,255,255,0.06)`.
4. **Minimalismo con carácter** — Mucho espacio negativo. Si no aporta, se elimina.
5. **Mobile-first responsive** — Todos los breakpoints.
6. **Animaciones sutiles** — fade-up, stagger reveals, transiciones 200-300ms ease.
7. **Iconos:** Lucide React (outlined, peso ligero).
8. **Scroll = narrativa** — Cada scroll debe sentirse intencional, no accidental.
9. **Performance primero** — LCP < 2.5s, CLS < 0.1, Lighthouse > 90.

### NUNCA
- Fondos blancos como tema
- Stock photos genéricas
- Tipografías del sistema
- Sobrecarga de información
- border-radius excesivo (max 16px cards, 8px botones)
- Sombras colored exageradas
- Componentes genéricos sin personalidad de marca

---

## Frases de Marca

- "Nodo. El punto donde tu idea se conecta con el mundo."
- "Transformamos ideas en software."
- "Tu idea, nuestro código."
- "Software que se adapta a vos."
- "Construimos lo que imaginás."
- "Del concepto al código."

---

## Assets del Proyecto

| Asset | Ubicación en el proyecto |
|---|---|
| CodecPro-Regular.ttf | `public/fonts/CodecPro-Regular.ttf` |
| CodecPro-Italic.ttf | `public/fonts/CodecPro-Italic.ttf` |
| Logo N (isotipo) | `public/logos/logo-n.png` |
| Frames logo animación | `public/logos/frames-logo/001.png` a `160.png` |
| Video 3D N (loop) | `public/videos/nodo-n-loop.mp4` |
| Video logo sin fondo | `public/videos/video-logo-N-sin-fondo.mp4` |

---

## Checklist por Entrega

- [ ] Skills relevantes invocados antes de crear (ver tabla WORKFLOW arriba)
- [ ] Fondo oscuro (#0a0a0a)
- [ ] Solo colores de la paleta Nodo
- [ ] Tipografía Codec Pro / Poppins (nunca genéricas)
- [ ] Gradiente con moderación y propósito
- [ ] Responsive mobile-first (verificar 375px, 768px, 1440px)
- [ ] Animaciones Framer Motion / GSAP
- [ ] Bilingüe ES/EN funcional
- [ ] `npm run build` sin errores
- [ ] Verificación con Agent QA (preview tools)
- [ ] Pasa el test: "¿Vercel/Linear publicaría esto?"

---

## MEMORIA — Persistencia Entre Chats

El proyecto tiene un sistema de memoria en `~/.claude/projects/c--Users-mateo-Desktop-nodo-project/memory/`.

**AL INICIAR CADA CHAT NUEVO:**
1. Leer `memory/MEMORY.md` para cargar contexto
2. Leer `memory/project_progress.md` para saber qué está hecho y qué falta
3. Leer `memory/feedback_workflow.md` para recordar cómo trabaja Mateo

**AL TERMINAR CADA CHAT:**
1. Actualizar `memory/project_progress.md` con lo que se completó
2. Si hubo feedback nuevo de Mateo → actualizar `memory/feedback_workflow.md`
3. Si cambió algo del proyecto → actualizar `memory/project_context.md`

**Archivos de memoria:**
| Archivo | Contenido |
|---|---|
| `MEMORY.md` | Índice de todas las memorias |
| `user_mateo.md` | Perfil de Mateo, preferencias, estilo de trabajo |
| `project_context.md` | Stack técnico, páginas, assets, skills instalados |
| `project_brand.md` | Colores, fonts, gradiente, reglas de diseño |
| `project_progress.md` | Estado actual del build — qué está hecho, qué falta |
| `project_agents.md` | Roles de agent teams y workflows de verificación |
| `feedback_workflow.md` | Cómo trabaja Mateo, qué evitar, qué hacer |

---

## AGENT TEAMS — Trabajo Profesional en Paralelo

Usar el Agent tool para lanzar subagents especializados. Cada uno tiene un rol y usa tools + skills específicos.

### Cómo usar Agent Teams

Después de implementar un cambio significativo (nueva página, sección, componente complejo), lanzar agents en paralelo:

```
Agent DEV    → Implementa el código
Agent QA     → Verifica que funciona (preview tools)
Agent DESIGN → Revisa calidad visual (skills de diseño)
Agent SEO    → Audita SEO y performance
```

### Agent QA — Verificación con Preview Tools

**OBLIGATORIO después de cada cambio visual.** Usar las preview tools para verificar en el navegador real:

```
Paso 1: preview_start                    → Levantar dev server
Paso 2: preview_snapshot                 → Verificar contenido renderizado
Paso 3: preview_console_logs             → Verificar 0 errores en consola
Paso 4: preview_network                  → Verificar 0 requests fallidos
Paso 5: preview_resize (375px)           → Verificar mobile
Paso 6: preview_resize (768px)           → Verificar tablet
Paso 7: preview_resize (1440px)          → Verificar desktop
Paso 8: preview_click (nav links)        → Verificar navegación
Paso 9: preview_screenshot               → Captura visual como prueba
```

Si hay errores → diagnosticar con `preview_console_logs` y `preview_inspect`, corregir, re-verificar.

### Agent DESIGN REVIEW

Después de cada página completada, invocar estos skills en secuencia:
1. `/design:design-critique` → Feedback de usabilidad, jerarquía, consistencia
2. `/design:accessibility-review` → WCAG 2.1 AA audit
3. `/marketing:brand-review` → Verificar voz de marca
4. `/polish` → Pass final de calidad visual
5. `/delight` → Agregar momentos de sorpresa y personalidad

### Agent SEO

Antes de deploy o al completar todas las páginas:
1. `/seo-audit` → Audit técnico completo
2. `/schema-markup` → Structured data (Organization, WebSite, Service)
3. `/marketing:seo-audit` → Keywords, on-page, content gaps
4. `/engineering:deploy-checklist` → Verificación pre-deploy

### Ejemplo de Uso en Código

```
// Después de crear ServicesPreview.tsx:

// 1. Lanzar QA y Design Review en paralelo
Agent(prompt: "Verificar ServicesPreview renderiza correctamente...", subagent_type: "general-purpose")
Agent(prompt: "Revisar calidad visual de ServicesPreview...", subagent_type: "general-purpose")

// 2. Si hay issues, corregir
// 3. Re-verificar
```

---

## REGLAS DE CONTINUIDAD ENTRE CHATS

1. **SIEMPRE leer memory al iniciar** — No asumir nada, leer el estado actual
2. **SIEMPRE actualizar memory al terminar** — El próximo chat depende de esto
3. **NO repetir trabajo** — Si algo ya está hecho (según memory), no rehacerlo
4. **Usar Agent teams** — No entregar sin verificar con QA
5. **Skills primero** — Invocar el skill relevante ANTES de codear
6. **Build test** — `npm run build` debe pasar sin errores antes de cerrar el chat
