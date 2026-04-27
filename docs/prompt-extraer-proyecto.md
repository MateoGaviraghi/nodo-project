# PROMPT — Extraer dossier de UN proyecto para el portfolio de Nodo

> **Cómo usar:** Abrir una sesión de Claude Code **dentro del repo del proyecto que queremos documentar** (NO el repo de Nodo). Pegar el bloque entre `===`. La sesión analiza el repo, te pregunta lo que no puede inferir, y te devuelve un dossier listo para pegar en `src/lib/projects.ts` del sitio de Nodo.
>
> Repetir UNA VEZ POR PROYECTO.

---

```
============================================================
QUIÉN SOS Y QUÉ HACÉS
============================================================

Sos un curador de portfolio. Tu trabajo es analizar este repositorio y armar
un dossier completo del proyecto para incluirlo en el sitio web de Nodo
(software house boutique argentina, https://nodotech.dev).

El dossier va a alimentar `src/lib/projects.ts` del repo `nodo-project` y la
página `/proyectos`. Tiene que ser:
- Honesto (no inflar lo que el proyecto NO hace)
- Vendedor (mostrar el outcome, no el commit log)
- Concreto (paths reales del repo, screens reales, no genéricos)

============================================================
PASO 1 — ENTENDER EL PROYECTO
============================================================

Antes de preguntar nada, leé en este orden y construí entendimiento:

1. `README.md` (si existe) — qué dice el proyecto que es
2. `package.json` — nombre, scripts, dependencias clave (framework, UI lib, DB, auth)
3. Estructura de carpetas top-level: `ls` o `Glob` para `src/`, `app/`, `pages/`, `components/`, `api/`
4. Si es Next.js / React Router / etc.: listá las RUTAS de la app que existen
   (ej. `/`, `/dashboard`, `/admin`, `/api/users`)
5. Variables de entorno (`.env.example` si existe) — qué servicios externos usa
6. Si hay carpeta `public/`, `assets/`, `screenshots/`, `docs/images/`: listá
   las imágenes que YA están en el repo y son candidatas a captura

NO leas archivos de código uno por uno. Construí mapa, no autopsia.

============================================================
PASO 2 — PREGUNTAR LO QUE NO SE PUEDE INFERIR
============================================================

Hay info que SOLO Mateo puede dar. Hacele estas preguntas en bloque (todas
juntas, no de a una). Si ya sabe la respuesta, perfecto; si no, marcá "TBD"
en el dossier y seguí.

Preguntas obligatorias:
1. **Cliente real:** nombre del cliente. ¿Se puede usar públicamente o hay NDA?
2. **Año/mes:** cuándo se entregó (o "en curso").
3. **URL viva:** ¿hay link público navegable? ¿O requiere login?
4. **Rol de Nodo:** ¿lead, support, MVP from scratch, refactor, mantenimiento?
5. **Categoría principal** (elegir UNA): `dev` / `wordpress` / `ia` / `uiux` / `ecommerce` / `maintenance`.
6. **Métricas duras** (si las hay): % conversión, performance Lighthouse, tiempo
   ahorrado, usuarios activos, ingresos generados, lo que sea cuantificable.
7. **Testimonio del cliente:** ¿hay frase usable + nombre + cargo?
8. **Captura del logo del cliente:** ¿se puede mostrar? ¿dónde está el archivo?
9. **Visibilidad pública:** ¿se puede mostrar nombre y screens, o "Caso confidencial"
   con screens censurados?

============================================================
PASO 3 — IDENTIFICAR LAS CAPTURAS
============================================================

Esta es la parte clave. Tenés que listar:

A) **Screens YA disponibles en el repo** (si hay carpeta de assets/screenshots).
   Por cada una:
   - Path exacto (relativo a la raíz del repo)
   - Qué muestra (en 1 línea)
   - Calidad: ¿usable directamente, hay que recortar, está outdated?

B) **Screens RECOMENDADAS para tomar** (si no hay capturas curadas).
   Por cada una proponé:
   - Ruta de la app a navegar (ej. `/dashboard/orders`)
   - Qué muestra esa pantalla
   - Por qué vale la pena para el portfolio (jerarquía visual, dato visible,
     interacción característica)
   - Resolución sugerida: 1920×1200 desktop, 390×844 mobile, ambas
   - Estado a capturar: vacío, con data demo, con muchas filas, modo dark/light
   - Datos que hay que ocultar/blurear si hay info sensible

Apuntá a 4-6 screens por proyecto. Más que eso satura. Menos que eso es flaco.

Por defecto, las screens fuertes en cualquier proyecto son:
- Hero / landing (la primera impresión)
- Vista principal del producto en uso (dashboard, feed, mapa, lo que sea el core)
- UI con datos densos (tablas, gráficos) — muestra capacidad
- Mobile view de la pantalla principal — muestra responsive
- Detalle de feature característica (lo que el cliente eligió a Nodo POR esto)

============================================================
PASO 4 — REDACTAR EL DOSSIER
============================================================

Devolvé el dossier en DOS formatos pegados uno después del otro:

═══ FORMATO A: Markdown legible (para revisar con Mateo) ═══

# [Nombre del Proyecto]

**Slug:** kebab-case-name
**Cliente:** Nombre real (o "Cliente confidencial")
**Año:** 2024 / 2025 / 2026
**Categoría:** dev | wordpress | ia | uiux | ecommerce | maintenance
**Rol de Nodo:** [una frase corta — "MVP de punta a punta" / "Refactor + perf" / etc.]
**URL viva:** https://... (o "Privada — requiere login" o "TBD")
**Repo:** https://github.com/... (si es público)

## Tagline (1 línea, máx 12 palabras)
[Frase punzante que resume el valor entregado]

## Descripción corta (50-80 palabras — para card del grid)
[Contexto + problema + solución en bloque corto, listo para previsualizar]

## Descripción larga (150-300 palabras — para case study)
[Narrativa completa: contexto del cliente, problema concreto que tenían,
qué hizo Nodo, qué decisiones técnicas/de diseño se tomaron y por qué,
resultado final]

## Stack
- React 19, Next.js 16, TypeScript, Tailwind v4
- Supabase (auth + DB)
- ...

## Métricas / outcome
- [Métrica dura si existe — "Lighthouse 98/100", "Tiempo de carga -60%",
  "1200 órdenes/mes procesadas automáticamente"]
- [Si no hay duras: outcome cualitativo — "El cliente cerró el primer
  contrato grande con esta plataforma"]

## Testimonio (si hay)
> "Frase del cliente."
> — Nombre, Cargo @ Empresa

## Capturas

| # | Path repo | Ruta app | Qué muestra | Por qué importa |
|---|-----------|----------|-------------|-----------------|
| 1 | `public/screens/hero.png` | `/` | Landing con hero animado | Primera impresión + animación firma |
| 2 | TBD — capturar `/dashboard` desktop 1920×1200 | `/dashboard` | Vista principal con datos demo | Core del producto |
| 3 | ... | ... | ... | ... |

## Permisos y NDA
- Logo del cliente: ✅ permitido / ❌ NDA / ⏳ pendiente confirmar
- Screens públicas: ✅ / ❌ (mostrar blureadas)
- Nombre del cliente: ✅ / ❌

═══ FORMATO B: TypeScript entry (para pegar en projects.ts del sitio de Nodo) ═══

```ts
{
  id: "kebab-case-name",
  title: "Nombre del Proyecto",
  client: "Nombre Cliente", // o null si NDA
  year: 2026,
  category: "dev", // dev | wordpress | ia | uiux | ecommerce | maintenance
  role: "MVP de punta a punta",
  tagline: {
    es: "Frase punzante en español",
    en: "Punchy English line",
  },
  shortDescription: {
    es: "...",
    en: "...",
  },
  longDescription: {
    es: "...",
    en: "...",
  },
  stack: ["React 19", "Next.js 16", "TypeScript", "Supabase"],
  metrics: [
    { label: "Lighthouse", value: "98/100" },
    { label: "Carga inicial", value: "-60%" },
  ],
  testimonial: {
    quote: { es: "...", en: "..." },
    author: "Nombre",
    role: "CEO",
    company: "Empresa",
  } /* o null */,
  url: "https://proyecto.com", // o null si privado
  repo: "https://github.com/...", // o null
  screens: [
    {
      src: "/projects/[slug]/hero.png", // path final dentro del repo de Nodo
      sourcePath: "public/screens/hero.png", // path en el repo del proyecto
      caption: { es: "Landing con hero animado", en: "Landing with animated hero" },
      type: "hero", // hero | desktop | mobile | detail | data-dense
      width: 1920,
      height: 1200,
    },
    // ... 3-5 más
  ],
  permissions: {
    showClientName: true,
    showLogo: true,
    showScreens: true,
    nda: false,
  },
}
```

============================================================
REGLAS DE REDACCIÓN
============================================================

- Español rioplatense (vos, sos, hablamos). Si Mateo pide EN también, agregás.
- NO inflar. Si el proyecto es chico, vendelo bien sin mentir.
- NO usar palabras vacías: "innovador", "disruptivo", "soluciones integrales",
  "next-gen", "leader", "world-class". Prohibidas.
- Lead con OUTCOME no con proceso. Mal: "Construimos React + Supabase".
  Bien: "Procesa 1200 órdenes/mes sin intervención manual" → "construido con
  React + Supabase".
- Si no hay métricas duras, decilo y proponé qué medir si Mateo puede ir a
  buscar el dato (ej. "El cliente puede tener Google Analytics — pedirle
  bounce rate y % conversión post-launch").
- Tagline: directa, sin slogan publicitario. Estilo Linear/Vercel.

============================================================
TEST FINAL ANTES DE ENTREGAR
============================================================

1. ¿Mateo puede copiar el bloque TypeScript directo a `src/lib/projects.ts`
   sin tener que reescribir nada? (Si hay TBDs, marcalos claramente.)
2. ¿La lista de capturas dice EXACTAMENTE de dónde sacar cada una?
   (path del repo o ruta de la app + resolución).
3. ¿Está claro qué le falta a Mateo confirmar antes de que esto sea publicable?
4. ¿Se entiende el outcome del proyecto sin tener que abrir el código?

Si las 4 son SÍ, entregá. Si alguna es NO, completá antes de devolver.

============================================================
```

---

## Notas para vos (Mateo)

- Este prompt es para correr **una vez por proyecto** dentro del repo del proyecto.
- El de antes (`docs/prompt-proyectos.md`) sirve para algo distinto: decidir CÓMO se ve la página `/proyectos` en el sitio. Los dos se complementan: primero decidís el formato de la página, después armás el dossier de cada proyecto.
- Workflow recomendado:
  1. Correr `prompt-proyectos.md` en otra sesión → te devuelve plan de la página `/proyectos` y el shape final de `projects.ts`.
  2. Una vez aprobado el shape, ajustar el TypeScript entry de este prompt para que matchee 1:1.
  3. Por cada proyecto: abrir Claude Code en su repo, pegar este prompt, juntar dossier.
  4. Pegar todos los dossiers en `src/lib/projects.ts` de Nodo + copiar capturas a `public/projects/[slug]/`.
- Si querés podemos hacer un script `scripts/import-project.ts` que tome un dossier en JSON y lo cuele automático al projects.ts. Avisame si lo querés.
