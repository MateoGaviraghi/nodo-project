# PROMPT — Investigación + Plan para `/proyectos` de Nodo

> **Cómo usar:** Copiar TODO el bloque entre las líneas `===` en una sesión nueva de Claude Code dentro del repo `nodo-project`. La sesión arranca con el contexto cargado y devuelve un plan accionable que después se implementa.

---

```
============================================================
ARRANQUE — Cargar contexto antes de responder
============================================================

Antes de hacer cualquier propuesta, leé en este orden:

1. `CLAUDE.md` (raíz) — identidad, stack, marca, reglas técnicas inquebrantables
2. `docs/blueprint.md` — wireframes originales y plan técnico
3. `docs/skills-map.md` — cómo aplicar skills GSAP/scroll/3D a Nodo
4. `docs/NOTES_DESIGN_SYSTEM.md` — design system completo
5. `memory/MEMORY.md` + `memory/project_progress.md` — estado actual del build
6. `src/app/page.tsx` — referencia del pattern de project cards en el home (sección PROJECTS, líneas ~143-231)
7. `src/lib/projects.ts` — modelo actual (placeholder, hay que rediseñarlo)
8. `src/components/ui/TiltCard.tsx` — componente reusable que ya usamos para cards premium
9. `src/app/proyectos/ProyectosContent.tsx` — estado actual: solo dice "Próximamente"
10. `src/app/servicios/ServiciosContent.tsx` — referencia de página premium ya construida (alternating layout, TechBadge, process steps)
11. `src/app/nosotros/NosotrosContent.tsx` + componentes en `src/components/nosotros/` — referencia de página scroll-driven con 7 secciones

NO leas otros archivos hasta no haber procesado estos.

============================================================
LA TAREA
============================================================

Diseñar y proponer la MEJOR estrategia para construir `/proyectos` en Nodo
(software house boutique argentina, sitio nivel Vercel/Linear/Raycast, deadline
30-abril-2026).

NO IMPLEMENTAR todavía. La salida es un PLAN de decisión que Mateo aprueba
antes de codear.

Material disponible para mostrar:
- Mateo dice tener "bastantes" proyectos reales para mostrar (no son placeholders).
- Los detalles, screenshots, URLs y métricas reales se le van a pedir DESPUÉS de
  aprobar el approach. NO asumas que existen capturas curadas — proponé qué pedir.

============================================================
RESTRICCIONES TÉCNICAS DEL PROYECTO (NO ROMPER)
============================================================

- Next.js 16.2.2 (App Router) + React 19 + TypeScript + Tailwind v4 (@theme)
- Animaciones: GSAP 3.14 + ScrollTrigger + Framer Motion 12 + Lenis 1.3.21
- 3D: React Three Fiber 9 (dynamic import, ssr:false en containers)
- Bilingüe: TODO texto via `useLanguage()` + `src/lib/translations.ts`
- Reveal system: `data-reveal` + `.reveal-el | .reveal-3d | .reveal-scale | .reveal-left | .reveal-right` + IntersectionObserver en el componente padre (NO usar GSAP fromTo opacity:0 en post-hero — conflicto con Lenis)
- Scroll: usar Lenis (`getLenis().scrollTo()` para resets). NUNCA `scroll-behavior: smooth` en CSS.
- Canvas R3F: NUNCA opacity:0 ni clip-path en su container — WebGL no inicializa
- Hero scroll-driven 600vh/350vh con GSAP scrub está reservado al home — para subpáginas usar IntersectionObserver

============================================================
RESTRICCIONES DE MARCA (NO ROMPER)
============================================================

Paleta (SOLO estos):
- `#0a0a0a` nodo-black (fondo SIEMPRE)
- `#ffffff` nodo-white
- `#2785fe` nodo-blue (CTAs, links)
- `#00c1f4` nodo-cyan (acentos, hover)
- `#8b2fef` nodo-purple (premium)
- `#5863f2` nodo-indigo (complementario)
- Grises: #1a1a2e, #16213e, #2a2a4a, #3a3a5c, #8888aa, #b0b0cc, #d0d0e8

Gradiente firma (uso moderado: logo, CTAs hero, líneas decorativas, bordes hover):
`linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%)`

Tipografía: Poppins (Google Fonts, var --font-poppins).
Glassmorphism: `bg-[rgba(26,26,46,0.6)] backdrop-blur-[12px] border border-white/[0.06]`.
Border radius: max 6px en cards, max 4px en botones.
Iconos: Lucide React outlined.

Test final que toda decisión debe pasar: **"¿Vercel publicaría esto?"**

============================================================
ESTADO ACTUAL DEL HOME (PARA NO REPETIR / ALINEAR)
============================================================

El home (`src/app/page.tsx`) ya tiene un preview de 4 proyectos con este pattern:
- Grid 2-col con TiltCard
- Cada card: "monitor frame" simulado (browser toolbar con 3 dots + URL pill + screen oscura aspect-16/10 con background gradient + grid pattern + initial gigante)
- Categoría pill, título, descripción, tech tags
- Reveal alternado izquierda/derecha

`/proyectos` debe ser **la versión profunda** de ese teaser — NO repetir el mismo
pattern. Tiene que sentirse como "click de profundización", no como duplicación.

============================================================
HALLAZGOS DEL RESEARCH (abril 2026)
============================================================

Investigación previa hecha con WebSearch sobre patterns 2026:

**Best practices consolidadas para portfolio/case-study pages 2026:**
- Mostrar 8-12 proyectos con case study REAL, no 80 thumbnails. Calidad > volumen.
- Lead con OUTCOME, no con proceso ("Aumentamos conversión 34%" antes que el wireframe).
- Estructura de case study: challenge → contribution → key decisions → measurable outcomes.
- Long-form 800-1500 palabras con strong visual pacing > galleries cortas o writeups largos.
- Mobile-first: la mayoría revisa portfolios en mobile. Crítico.
- Video corto (30-90s) gana sobre estático cuando hay UX dinámica.
- Stable skeletons / todos los estados diseñados (empty, sparse, dense, error) — Vercel design guidelines.

**Patterns visuales dominantes 2026:**
- Scroll storytelling (Skya Designs trend report 2026): contenido se despliega narrativamente con scroll. Caso paradigmático.
- Awwwards 2026 trends: tipografía dominante, micro-interactions, mucho whitespace, animation con propósito.
- Bruno Simon (Site of the Month enero 2026): navegación 3D radical donde el portfolio ES la experiencia. Demasiado para Nodo, pero referente del techo creativo.
- Vercel Customers (https://vercel.com/customers): grid de logos + case studies individuales tipo "Dashing case study". Cada case es una página propia con storytelling visual.
- Linear Customers (https://linear.app/customers): testimonials con foto, métricas grandes, layout limpio. Soft power brand.
- Stripe Sessions style: scroll cinematográfico, un solo proyecto inmersivo a la vez.

**Referencias clave para mirar antes de proponer:**
- https://www.awwwards.com/websites/portfolio/ (galería curada)
- https://www.awwwards.com/websites/design-agencies/
- https://vercel.com/customers (grid + case study individual)
- https://linear.app/customers (storytelling con foto + métricas)
- https://muz.li/inspiration/portfolio-website/ (60+ portfolios 2026)
- Estudios premium argentinos/LATAM: Obys, Active Theory, Locomotive (referencia de "premium boutique")

============================================================
LO QUE NECESITAMOS QUE DEVUELVAS (estructura exacta)
============================================================

Devolvé UN documento con estas 8 secciones, en este orden, en español rioplatense:

## 1. RECOMENDACIÓN PRINCIPAL (1 párrafo)
Cuál de estos 4 patterns proponés y por qué:
- A) **Grid premium + drill-down**: index con grid de cards (estilo home pero más rico) → click navega a `/proyectos/[slug]` con case study profundo
- B) **Scroll storytelling de un solo viaje**: `/proyectos` es UNA página inmersiva donde cada proyecto se desbloquea con scroll (estilo Stripe sessions / Linear timeline)
- C) **Híbrido — masonry interactivo + drawer expandible**: grid asimétrico, click expande drawer in-place sin navegar
- D) **Otra opción que justifiques**

Decisión basada en: cantidad real de proyectos esperada (asumir 6-12), nivel de detalle por proyecto, esfuerzo de implementación vs impacto, deadline 30-abril.

## 2. WIREFRAME ASCII
Layout de la página principal `/proyectos` y, si aplica, de la página individual `/proyectos/[slug]`. Mobile + desktop. Mostrar jerarquía, secciones, momentos de scroll. Texto en ASCII art, no imágenes.

## 3. ESTRUCTURA DE DATOS PROPUESTA
Reemplazar `src/lib/projects.ts` (que hoy tiene 4 placeholders flacos). Proponé el TypeScript interface completo + ejemplo de UN proyecto cargado. Considerar:
- Multi-idioma (ES/EN) — ¿se carga en `translations.ts` o en `projects.ts` con campos `_es`/`_en`?
- Screenshots: array, hero, antes/después, mockups de monitor — ¿qué es realista pedirle a Mateo?
- URL viva, repo, métricas (counters animables), stack, rol de Nodo (lead, support, mantenimiento), año, duración, cliente
- Tags/categorías: dev / wordpress / IA / e-commerce / UI/UX (alinear con los 6 servicios)
- Caso de "proyecto cubierto por NDA" — ¿cómo se muestra sin nombre/screen?

## 4. CONTENIDO QUE LE TENEMOS QUE PEDIR A MATEO
Lista exacta y mínima de qué tiene que juntar Mateo para llenar la página. Si es ambicioso de más, decilo y proponé v1 / v2.
- Por proyecto: ¿cuántas screens? ¿qué resolución? ¿necesitamos URL viva navegable? ¿métricas duras o testimonio? ¿logo del cliente con permiso?
- Globales: ¿hace falta un "manifesto" arriba? ¿hero con video? ¿proceso compartido entre proyectos o por-proyecto?

## 5. PLAN DE ANIMACIONES Y MOMENTOS WOW
Según el pattern elegido, listá 3-5 momentos wow concretos con técnica:
- Reveal pattern (cuál de las 5 clases ya existentes en globals.css)
- Hover/cursor interactions (TiltCard ya existe — ¿se reutiliza? ¿se extiende?)
- Scroll-driven micros (parallax de capas del mockup, contadores que escalan, líneas que se dibujan)
- Transición entre index y página individual (si hay)
- Micro-detalle que sorprende (estilo Raycast/Linear)

NO inventar features pesadas que no aporten. Test: cada momento wow debe sumar a la narrativa, no decorar.

## 6. DECISIONES CRÍTICAS A TOMAR ANTES DE CODEAR
Lista numerada, máximo 6, de las decisiones que dependen de input de Mateo y no podés tomar solo:
- (ej.) "¿Páginas individuales por proyecto o todo en index? Costo: 2 días extra implementación / SEO mejor con páginas / Mejor experiencia drill-down."
- (ej.) "¿Mostramos métricas duras (% conversión, X% performance) o solo cualitativo? Requiere que Mateo tenga los números reales."
- Cada decisión: nombre, opciones, trade-off en una línea, recomendación tuya.

## 7. PLAN DE IMPLEMENTACIÓN STEP-BY-STEP
6-10 pasos ordenados, con estimación S/M/L y skill a invocar antes de cada paso (ver CLAUDE.md sección SKILLS):
- Paso 1: [acción] — S/M/L — `/skill-name`
- ...

Marcar cuál es el primer paso de "happy path mínimo viable" si hay que recortar para llegar al deadline.

## 8. RIESGOS Y QUÉ EVITAR
3-5 riesgos concretos del approach elegido y cómo mitigarlos. Foco en:
- Performance (LCP, CLS, bundle)
- SEO si se hacen páginas individuales (sitemap, metadata)
- Mantenibilidad (si Mateo agrega un proyecto en 6 meses, ¿es 1 archivo o 5?)
- Conflictos conocidos (Lenis + GSAP, R3F containers, etc. — ver CLAUDE.md)

============================================================
TONO Y FORMATO
============================================================

- Español rioplatense (vos, sos, hablamos).
- Directo, sin relleno corporativo. Mateo lee el diff, no el resumen.
- Cuando proponés algo, justificalo en 1 línea. Cuando hay duda real, marcala explícitamente.
- Si una sección no aplica al pattern que elegiste, escribí "N/A — porque [razón]" en vez de saltearla.
- NO escribas código todavía. Solo el plan. La sesión que implemente va a venir después con tu doc en mano.
- Largo total objetivo: 600-1000 líneas. Densidad > volumen.

============================================================
TEST FINAL
============================================================

Antes de devolver tu plan, releelo con este filtro:
1. ¿Pasa el test "Vercel publicaría esto"?
2. ¿Mateo puede tomar las decisiones pendientes en menos de 30 minutos con tu lista?
3. ¿Otra sesión limpia podría implementar el step-by-step sin tener que volver a investigar?

Si las 3 son SÍ, entregá. Si alguna es NO, iterá antes de devolver.
============================================================
```

---

## Notas para vos (Mateo) — no son parte del prompt

- El prompt asume que la sesión de destino tiene acceso al repo. Si la abrís desde otro path, agregá al inicio `cd C:/Users/mateo/Desktop/nodo-project` o adaptá las rutas.
- Si querés que la sesión use referencias visuales en vivo (Vercel, Linear customers), tiene que tener WebSearch/WebFetch habilitado. En Claude Code suelen estar.
- Hallazgos clave del research que ya están metidos en el prompt:
  - Calidad > volumen (8-12 proyectos máximo, no 80 thumbs)
  - Lead con outcome, no con proceso
  - Mobile-first crítico
  - Scroll storytelling es el trend dominante 2026
  - Patterns base: Grid + drill-down (Vercel) / Scroll narrativo (Stripe) / Híbrido drawer
- La decisión más importante que va a salir del plan es **A vs B vs C** del punto 1 — todo lo demás se deriva.

## Sources del research previo

- [Awwwards — Best Portfolio Websites](https://www.awwwards.com/websites/portfolio/)
- [Awwwards — Best Web Agencies](https://www.awwwards.com/websites/design-agencies/)
- [Vercel Customers](https://vercel.com/customers)
- [Vercel — Dashing case study](https://vercel.com/case-studies/dashing)
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)
- [Linear Customers](https://linear.app/customers)
- [Skya Designs — Scroll Storytelling trend 2026](https://www.skyadesigns.co.uk/web-design-insights/web-design-trend-2026-scroll-storytelling/)
- [Muzli — 60+ Portfolio inspiration 2026](https://muz.li/inspiration/portfolio-website/)
- [InfluenceFlow — Portfolio Case Study Examples 2026](https://influenceflow.io/resources/portfolio-case-study-examples-the-complete-2026-guide-for-creative-professionals/)
- [Sitebuilder Report — 25+ Portfolio Websites 2026](https://www.sitebuilderreport.com/inspiration/portfolio-websites)
- [IxDF — UX Portfolio examples 2026](https://ixdf.org/literature/article/the-10-most-inspirational-ux-design-portfolio-examples)
