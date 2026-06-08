# Nodo Story Template v1 — Sistema visual de referencia

> Sistema visual oficial para todas las stories de Nodo. Se basa en las piezas ya publicadas (ST-02 a ST-08, especialmente "ST-04 Así construimos"). **No cambiar este sistema sin acuerdo explícito con Mateo.**

---

## Anatomía vertical (1080×1920 px)

```
┌────────────────────────────────────┐
│  Zona 1 — TOP (0-180px)            │
│  Logo "N" + hairline + nodotech.dev│  ← solo en versión DARK
├────────────────────────────────────┤
│  Zona 2 — EYEBROW (180-280px)      │
│  ─ • TÍTULO DE LA STORY            │
├────────────────────────────────────┤
│                                    │
│  Zona 3 — HEADLINE (280-900px)     │
│  Frase grande 3-4 líneas           │
│  con palabras clave en gradiente   │
│  y mix bold + italic               │
│                                    │
├────────────────────────────────────┤
│                                    │
│  Zona 4 — CONTENIDO (1000-1550px)  │
│  Lista numerada / poll / pregunta /│
│  número grande / captura           │
│  (varía según tipo de story)       │
│                                    │
├────────────────────────────────────┤
│  Zona 5 — BOTTOM (1820-1920px)     │
│  • NODOTECH.DEV •                  │
└────────────────────────────────────┘

Halos ambient: radial gradient sutil esquina inferior izquierda
  - Light: cyan + púrpura, opacidad ~30%
  - Dark: púrpura, opacidad ~50%
```

---

## Tokens visuales (NO cambiar)

### Colores
| Token | Hex | Uso |
|---|---|---|
| `--bg-light` | `#f5f5f7` (con halo) | Fondo versión light |
| `--bg-dark` | `#0a0a0a` (con halo púrpura) | Fondo versión dark |
| `--text-primary-light` | `#0a0a0a` | Texto headline en light |
| `--text-primary-dark` | `#ffffff` | Texto headline en dark |
| `--purple` | `#8b2fef` | Eyebrow + acentos |
| `--cyan` | `#00c1f4` | Acento + dots + numeración tenue |
| `--blue` | `#2785fe` | Gradiente intermedio |
| `--gradient` | `linear-gradient(135deg, #8b2fef 0%, #2785fe 50%, #00c1f4 100%)` | Palabras clave del headline |

### Tipografía
- **Familia:** Codec Pro (preferida) o Poppins (fallback) — sans-serif geometric
- **Eyebrow:** ~32pt, peso medium, all caps, **tracking 0.25-0.3em**, color púrpura `#8b2fef`
- **Headline principal:** ~130-150pt, peso bold/black, line-height ~1.05, espacio amplio
- **Headline acento (palabras clave):** mismo tamaño, **fill con gradiente** linear 135°
- **Headline italic + bold mix:** última frase tipo "*Te lo* **contamos**." mezcla regular italic + bold
- **Numeración lista (/01, /02):** ~50pt, peso medium, color cyan tenue (~70% opacidad)
- **Texto lista:** ~42pt, peso regular, palabras clave en bold del mismo color
- **Footer:** ~26pt, tracking 0.3em, color púrpura tenue (light) / blanco 30% (dark)

### Espaciado
- Margen izquierdo del bloque eyebrow + headline: **96-100px**
- Margen derecho de seguridad: **80px**
- Top safe zone (header IG): **140px** (no poner contenido importante arriba)
- Bottom safe zone para sticker IG: **350px** (cuando hay sticker poll/pregunta)
- Bottom safe zone normal: **100px** (cuando no hay sticker)
- Espacio entre items de lista: **~120px** con separador hairline

### Detalles decorativos
- **Línea decorativa vertical** a la izquierda del eyebrow (solo dark): 4px ancho, ~200px alto, gradiente vertical púrpura→cyan
- **Hairline antes del eyebrow:** 50px ancho, 1px alto, color púrpura tenue
- **Separadores entre items lista:** 1px hairline, ancho casi total, color muy tenue
- **Dots en footer:** círculo lleno cyan ~8px diámetro

---

## Tipos de story dentro del sistema

El sistema visual es **fijo**. Lo que cambia es la **Zona 4 (contenido)** según el propósito:

### Tipo A — Lista numerada (proceso, pasos, tips)
Ejemplo: ST-04 "Así construimos" / ST-07 "Sistemas a medida"
- 3-5 items con `/01`, `/02`, `/03`...
- Separadores hairline entre items
- Texto de cada item: 1-2 líneas, palabras clave en bold

### Tipo B — Poll / encuesta (engagement)
Ejemplo: ST-09 "qué te frena con tu web"
- Headline principal grande arriba
- Zona 4: **TOTALMENTE VACÍA**. Nada. Sin texto guía, sin "tocá abajo", sin subtítulo.
- Bottom safe zone: **600px** (no 400px). El sticker poll IG es grande y necesita aire.
- Sin lista — solo headline + halo + footer
- **REGLA CRÍTICA:** el sticker poll IG nativo es auto-explicativo. Cualquier texto en la zona donde irá el sticker se monta encima y se ve roto. NO agregar CTAs tipo "tocá una opción", "elegí una", "respondé abajo".

### Tipo C — Stat / número grande (educativo)
Ejemplo: ST-11 "53% se va"
- Zona 4: número gigante (~400pt) con gradiente
- Subtítulo debajo del número
- Sin lista

### Tipo D — Pregunta abierta (research)
Ejemplo: ST-12 "qué herramienta usás más"
- Pregunta directa como headline
- Zona 4: **TOTALMENTE VACÍA** (mismo principio que Tipo B). El sticker pregunta abierta IG ya es claro.
- Bottom safe zone: **600px**. El sticker pregunta abierta + el campo de respuesta ocupan más alto que un poll.
- **REGLA CRÍTICA:** sin texto guía abajo del headline. El sticker IG habla por sí mismo.

### Tipo E — Captura + overlay (BTS)
Ejemplo: ST-10 "lo que estoy buildeando"
- Background: captura del usuario (foto/screen)
- Overlay: rgba(10,10,10,0.55) para legibilidad
- Encima: eyebrow + headline + footer del sistema
- Zona 4: vacía o con CTA chico

---

## Cómo escribir un brief para Claude Desing

> **REGLA DE ORO (Mateo, 2026-04-28):** el brief lleva SOLO CONTENIDO. No describir diseño en el prompt — el sistema visual ya está cerrado y Claude Desing lo conoce. Repetir paleta, tipografía, paddings o decoraciones es ruido y genera errores.

**Formato del brief (corto y limpio):**

```
SISTEMA VISUAL: Nodo Story Template v1 (mantener idéntico al ya trabajado)
TIPO: A | B | C | D | E
VERSIONES: dark + light

EYEBROW: "[TÍTULO ALL CAPS]"

HEADLINE:
"[línea 1]
[línea 2 con palabras en gradiente]
[línea 3 italic + bold]"

PALABRAS EN GRADIENTE: "____"
PALABRAS ITALIC + BOLD: "____"

CONTENIDO ZONA 4:
[detalle según TIPO — lista de items / número / vacía si lleva sticker]

CTA / TEXTO EXTRA:
[ninguno o frase concreta]
```

**Lo que NO va en el brief:**
- ❌ Tipografías, tamaños, pesos
- ❌ Paleta de colores (hex, RGB)
- ❌ Paddings, márgenes, posiciones en píxeles
- ❌ Descripción del header, footer, halos, decoraciones
- ❌ Tokens visuales repetidos

Todo eso vive en este `_design-system.md` y se asume implícito.

---

## Referencia visual (lo que ya existe)

ST-04 "Así construimos" es el **mejor ejemplo del sistema**. Captura literal:

**Dark version:**
- Header: logo "N" izq + hairline + "NODOTECH.DEV" der
- Línea decorativa vertical púrpura→cyan a la izq del eyebrow
- Eyebrow: "─ • ASÍ CONSTRUIMOS" púrpura
- Headline: "Detrás de una **web que funciona**[gradiente], hay un proceso. *Te lo* **contamos**." (mix italic+bold en última línea)
- Lista 5 items con /01-/05 en cyan tenue, separadores hairline, palabras clave en bold
- Footer: "NODOTECH.DEV" centrado tenue

**Light version:**
- Sin header logo (solo eyebrow desde arriba)
- Misma estructura de eyebrow, headline, lista
- Halo radial cyan-púrpura esquina inferior izq
- Footer: "• NODOTECH.DEV •" centrado con dots cyan

---

## Reglas inquebrantables

1. **Eyebrow SIEMPRE en púrpura `#8b2fef`** con la línea+dot a la izquierda.
2. **Headline SIEMPRE con 1-3 palabras en gradiente.** Sin gradiente, falta firma de marca.
3. **Última frase del headline SIEMPRE con mix italic + bold** ("Te lo *contamos*", "Si querés, *te muestro*", etc.) — es el firma rítmico de Nodo.
4. **Footer SIEMPRE "NODOTECH.DEV"** — en dark al header arriba + tenue abajo, en light solo abajo centrado con dots.
5. **Halo SIEMPRE en esquina inferior izquierda.** Da personalidad y rompe el dark plano.
6. **No usar emojis grandes ni decoraciones que rompan el editorial.** Todo es tipográfico + halos + hairlines.
7. **Versión dark + light siempre.** Decidir cuál subir según el grid del momento.
8. **En tipos B y D (poll / pregunta abierta): cero texto en bottom 600px.** Solo headline + halo + footer. El sticker IG nativo es auto-explicativo — agregar texto guía solo genera choque visual cuando IG renderiza el sticker encima. **Aprendizaje: ST-09 tuvo que regenerarse por esto.**
