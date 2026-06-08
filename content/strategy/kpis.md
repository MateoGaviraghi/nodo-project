# KPIs — Qué medimos en el contenido de Nodo

> Sin métricas, todo es opinión. Estas son las que importan, ordenadas por jerarquía de negocio.

---

## Jerarquía de métricas (3 capas)

### Capa 1 — North Star (lo único que paga las cuentas)

| Métrica | Target mes 1-3 | Target mes 4-6 | Target mes 7-12 |
|---|---|---|---|
| **DMs cualificados / mes** | 3-5 | 8-15 | 20-40 |
| **Reuniones agendadas (booking widget) / mes** | 1-2 | 4-8 | 10-20 |
| **Clientes cerrados desde IG** | 0-1 | 1-3 | 3-6 |

> "DM cualificado" = mensaje de alguien que pregunta por servicio, no spam, no "qué bueno tu contenido".

### Capa 2 — Indicadores de tracción (señales de que estamos pegando)

| Métrica | Target mes 1-3 | Target mes 4-6 |
|---|---|---|
| **Seguidores nuevos / mes** | +50-150 | +300-700 |
| **Saves por reel (promedio)** | 5-15 | 30-80 |
| **Shares por reel (promedio)** | 2-8 | 15-40 |
| **Tiempo de retención reel (avg)** | 50-65% | 65-80% |
| **Comments cualificados / reel** | 1-5 | 8-25 |

> "Comment cualificado" = pregunta o aporte real, no emoji suelto.

### Capa 3 — Vanity metrics (informan, no se persiguen)

- Likes
- Reach total
- Impresiones
- Followers totales (sin contexto)

> Estas no manejan decisiones. Son señal débil.

---

## Por pilar — métricas específicas

| Pilar | Métrica primaria | Por qué |
|---|---|---|
| **Educativo (40%)** | Saves + shares | Si lo guardan/comparten, los educa. Es el canal de descubrimiento. |
| **Casos (30%)** | DMs + reuniones | Cierra. Si un caso no genera DMs, está mal contado. |
| **Opinión (20%)** | Comments + shares | Genera debate y se reposta. |
| **Lifestyle (10%)** | DMs + nuevos seguidores | Conecta personal. Más DMs casuales que cierran después. |

---

## Análisis por pieza — checklist 7 días después de publicar

Cada draft, una vez publicado, vuelve al archivo después de 7 días con esta sección completada:

```markdown
## Resultados (7 días post-publicación)

- Reach: XXXX (vs. promedio últimos 30d: XXXX)
- Saves: XX
- Shares: XX
- Comments: XX (cualificados: XX)
- Retención avg (si reel): XX%
- DMs generados: XX (cualificados: XX)
- Reuniones agendadas: X

### Lectura
- Pegó / no pegó
- ¿Por qué? (hook? formato? horario? pilar?)
- Qué replicar / qué evitar la próxima
```

---

## Análisis mensual — fin de cada mes (último viernes)

Crear archivo: `content/calendar/2026-MM-summary.md`

Contenido:

```markdown
# Resumen del mes 2026-MM

## North Star
- DMs cualificados: XX
- Reuniones: XX
- Cerrados desde IG: XX
- Conversión DM → reunión: XX%
- Conversión reunión → cliente: XX%

## Tracción
- Followers ganados: +XXX (vs. mes anterior: XXX)
- Saves promedio por pieza: XX
- Shares promedio: XX
- Top 3 piezas por DMs:
  1. [link]
  2. [link]
  3. [link]
- Bottom 3 piezas (analizar por qué):
  1. [link]
  2. [link]
  3. [link]

## Distribución por pilar (real vs. target 40/30/20/10)
- Educativo: XX% (target 40%)
- Casos: XX% (target 30%)
- Opinión: XX% (target 20%)
- Lifestyle: XX% (target 10%)

## Distribución por persona (real vs. target 40/35/25)
- María: XX%
- Tomás: XX%
- Lucas: XX%

## Aprendizajes
- 3 patrones que vimos
- 1 cosa que vamos a cambiar el próximo mes

## Decisiones
- Qué pilar amplificamos
- Qué formato bajamos
- Qué experimento corremos
```

---

## Herramientas para medir (sin pagar nada al inicio)

| Métrica | Herramienta |
|---|---|
| Reach, saves, shares, comments | IG Insights nativo |
| Retención reel | IG Insights nativo (gráfico audience retention) |
| DMs entrantes | Inbox IG + label manual ("cliente potencial") |
| Reuniones agendadas | BookingWidget de nodotech.dev (ya está en `/contacto`) |
| Tráfico web desde IG | Google Analytics + UTM en link de bio |
| Conversión DM → cliente | Hoja simple en Notion o Google Sheets |

---

## Reglas de uso

1. **No tomar decisiones con menos de 30 días de data.** Hay mucha varianza.
2. **No comparar contra creadores con público distinto.** Comparamos contra nosotros del mes anterior.
3. **Si una pieza explota (top 1% nuestro), analizar y replicar la fórmula.** Ese es el insight más valioso.
4. **Si una pieza muere (bottom 10%), no escapar — auditar.** Si fue mal el pilar, malo el hook, malo el horario, malo el formato.
5. **El contenido se mide en cohortes mensuales, no en una pieza aislada.**
