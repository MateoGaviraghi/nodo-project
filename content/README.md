# /content — Workspace de creación de contenido de Nodo

> Espacio donde vivimos la estrategia, los guiones, los briefs y el calendario de Instagram, TikTok y LinkedIn de Nodo.

---

## Cómo trabajar acá (4 reglas)

1. **No publicamos hasta que pase la matriz de los 4 pilares.** Si una idea no cae en uno de los 4 pilares de [strategy/pillars.md](strategy/pillars.md), no se hace.
2. **Antes de crear, revisar [published-inventory.md](published-inventory.md).** Es el registro maestro de lo que ya existe (diseñado o publicado). Si una idea ya está cubierta, decidir si repurposeamos o descartamos.
3. **Cada idea empieza como archivo en `*/drafts/`** con la plantilla. No hay ideas sueltas en notas — viven acá, versionadas.
4. **El calendario semanal manda.** Antes de grabar/escribir nada, chequear `calendar/2026-Wxx.md` para saber qué toca esta semana.

---

## Estructura

```
content/
├── README.md                       ← este archivo
├── published-inventory.md          ← inventario de lo ya diseñado/publicado (chequear antes de crear)
├── strategy/                       ← qué + para quién + cómo + qué medimos
│   ├── pillars.md                  ← 4 pilares con jerarquía 40/30/20/10
│   ├── audience.md                 ← 3 personas (PYME / founder / dev)
│   ├── voice-brand.md              ← tono de Nodo + frases prohibidas
│   └── kpis.md                     ← métricas que importan
├── calendar/
│   ├── _template-week.md           ← plantilla en blanco
│   └── 2026-W18.md                 ← semana en curso
├── reels/
│   ├── _hooks-bank.md              ← 50+ hooks por pilar
│   ├── _script-template.md         ← Hook → Problem → Solution → CTA
│   ├── _shotlist-template.md       ← shotlist para grabación
│   ├── ideas-backlog.md            ← pool de ideas crudas
│   └── drafts/                     ← reels en producción
├── feed/
│   ├── _post-template.md           ← post simple (idea + brief Claude Desing)
│   ├── _carousel-template.md       ← carrusel 10 slides estructurados
│   └── drafts/
├── stories/
│   ├── _design-system.md           ← Nodo Story Template v1 (sistema visual fijo)
│   ├── _frames-template.md         ← secuencia 3-7 frames
│   └── drafts/
├── ads/
│   ├── _brief-template.md          ← brief de pauta (objetivo + creativos)
│   ├── creatives/                  ← variantes A/B/C
│   └── campaigns/                  ← campañas activas con resultados
└── assets/
    ├── b-roll-shotlist.md          ← tomas genéricas a tener listas
    ├── music-library.md            ← tracks que funcionan
    └── caption-snippets.md         ← CTAs, hashtags, frases reutilizables
```

---

## Cadencia activa (modo serio · 4-6h/sem)

| Plataforma | Frecuencia | Formato |
|---|---|---|
| **IG Reels** | 3 / semana | 30-45s vertical, mix talking-head + b-roll |
| **IG Feed** | 2 / semana | Carrusel (10 slides) o post estático |
| **IG Stories** | Diario | 4-8 frames: lifestyle + reposteo + polls |
| **LinkedIn** | 2 / semana | Repurposing del reel + carrusel del feed |
| **TikTok** | Cross-post | Los 3 reels con caption + hook adaptado |

> Si una semana no llega, NO se inventa contenido relleno. Mejor 1 reel bueno que 3 mediocres.

---

## Flujo de un reel — de idea a publicado

```
1. Idea aparece           → reels/ideas-backlog.md (línea suelta)
2. Idea pasa a brief      → reels/drafts/NNN-{slug}.md (con _script-template)
3. Calendario la agenda   → calendar/2026-Wxx.md (día + hora + plataformas)
4. Grabación              → seguir el shotlist del draft
5. Edición                → notas de edición en el mismo draft
6. Publicación            → marcar status: PUBLISHED + link + caption final
7. Análisis a los 7 días  → métricas en kpis.md + lecciones
```

## Flujo de un post de feed (con Claude Desing)

```
1. Idea                   → feed/drafts/NNN-{slug}.md
2. Definir copy + brief   → completar la sección "Brief para Claude Desing"
3. Pasar el brief         → copiar el bloque BRIEF y mandarlo a Claude Desing
4. Recibir diseño         → guardar PNG en drafts/NNN-{slug}-render.png
5. Caption final + hashtags → completar sección "Publicación"
6. Programar              → calendar/2026-Wxx.md
```

---

## Reglas de marca (resumen — detalle en `strategy/voice-brand.md`)

- Tono: **directo, técnico-accesible, rioplatense.** Vos, no usted.
- Cero corporativo: prohibido "sinergia", "potenciar", "transformar tu negocio".
- Cero genérico: cada frase tiene que poder venir SOLO de Nodo.
- Visual: paleta `#0a0a0a` + `#2785fe` + `#00c1f4` + `#8b2fef`. Codec Pro / Poppins.
- En reels: texto en pantalla siempre alto contraste, max 2 líneas a la vez.

---

## Decisiones de fondo (no se discuten más)

- **Idioma:** español rioplatense únicamente.
- **Audiencia:** mix PYME argentina + founders tech + comunidad dev.
- **Estilo de reels:** mix talking-head + b-roll cinematográfico.
- **Pilares con jerarquía 40/30/20/10**, no equal-weight.
- **No vendemos servicios en cada post.** Regla 80/20: 80% valor, 20% pitch directo.
