# Plantilla — Brief de pauta publicitaria

> Cada campaña arranca acá. Si no podés llenar todos los campos, la campaña no está madura.

---

## Metadata

```yaml
id: NNN
campaign_name: nombre-corto
status: brief | creativos | review | active | paused | completed
plataforma: meta-ads | tiktok-ads | linkedin-ads | google-ads | mix
created: 2026-MM-DD
launch_date: 2026-MM-DD
end_date: 2026-MM-DD
budget_total_usd: XXX
budget_daily_usd: XX
```

---

## 1. Objetivo de campaña (eleg uno)

- [ ] **Awareness** — alcance frío. Métrica: alcance único + retención video.
- [ ] **Tráfico web** — visitas a nodotech.dev/[página]. Métrica: clics + tiempo en página.
- [ ] **Conversión / Lead gen** — DMs IG, formularios, agendamientos. Métrica: leads + costo por lead.
- [ ] **Re-targeting** — visitantes web sin contacto. Métrica: leads + costo por lead.

**Objetivo concreto:**
> ____ (ej: "20 reuniones agendadas en 30 días con costo por reunión < USD 35")

---

## 2. Audiencia

### Audiencia primaria
- **Persona:** María | Tomás | Lucas
- **Edad:** ____
- **Ubicación:** Argentina (ciudades principales) | LATAM | Mundial
- **Intereses Meta Ads (si aplica):** small business owner, ecommerce, NestJS, Next.js, Vercel, Stripe, founder, startup, etc.
- **Behaviors:** mobile-first, alto consumo IG/TikTok
- **Lookalike:** sí (basado en quién) | no
- **Custom audience:** ____ (visitas web, lista de contactos, engagement IG)

### Audiencia secundaria (opcional, A/B testing)
- ____

### Exclusiones
- Personas que ya están en pipeline activo (custom audience)
- Personas en industrias no target

---

## 3. Mensaje central

**Promesa de la campaña en 1 frase:**
> ____

**Pain point que tocamos:**
> ____

**Lo que ganan al hacer click:**
> ____

**Por qué Nodo y no otro:**
> ____

---

## 4. Creativos

> Mínimo 3 variantes para A/B test. Una vez que rinde, escalar la ganadora.

### Creativo A
- **Formato:** Reel | Static | Carrusel | Story
- **Hook:** ____
- **Body:** ____
- **CTA:** "Agendar reunión" | "Pedir presupuesto" | "Mandanos un mensaje"
- **Visual:** ____
- **Archivo:** `creatives/NNN-A.mp4` o `.png`

### Creativo B
- ____

### Creativo C
- ____

---

## 5. Brief para Claude Desing (estática) o producción (reel)

### Si es estática:
```
PROYECTO: Creativo Meta Ads para Nodo
DIMENSIONES: 1080x1080 (feed) + 1080x1920 (story/reel) — 2 versiones

MARCA NODO:
- Fondo: #0a0a0a
- Acento: #00c1f4 / #2785fe
- Tipografía: Codec Pro / Poppins Bold
- Logo "N" presente

CONTENIDO:
- Hook visual: "____"
- CTA grande: "____"
- Mockup central: ____ (proyecto del portfolio)
- Disclaimer pequeño: "Nodo · nodotech.dev"

REGLAS:
- Texto < 20% del área (regla histórica de Meta — aunque flexibilizada, sigue sirviendo)
- CTA visible en primeros 3 segundos
- Si es animada: loop perfecto
```

### Si es reel:
- Reel adaptado de los publicados orgánicamente (sin watermark IG/TikTok)
- Subtítulos siempre
- 9:16, max 15s (mejor performance que 30s para ads)

---

## 6. Landing / destino

- **URL:** nodotech.dev/[página]
- **Mensaje de la landing:** alineado con el hook del ad
- **CTA principal:** ____
- **Tracking:** UTM params:
  ```
  ?utm_source=meta&utm_medium=paid&utm_campaign=NNN-name&utm_content=A
  ```

---

## 7. Budget y duración

| Item | Valor |
|---|---|
| Budget total USD | ____ |
| Budget diario USD | ____ |
| Duración (días) | ____ |
| CPM esperado | ____ |
| CPC esperado | ____ |
| CPL (cost per lead) target | ____ |
| ROAS target (si aplica) | ____ |

---

## 8. Métricas de éxito (define cuándo se considera ganador)

- [ ] **Día 3:** ¿hay menos de 100 impresiones? Pausar y revisar pixel/audiencia.
- [ ] **Día 7:** ¿CTR < 1%? Cambiar creativo o hook.
- [ ] **Día 14:** ¿CPL > 2x target? Pausar variantes peores, escalar la ganadora.
- [ ] **Día 30:** evaluación final + decisión de re-invertir / cambiar.

---

## 9. Resultados — completar al final

| Métrica | Valor |
|---|---|
| Impresiones | ____ |
| Reach único | ____ |
| Clics | ____ |
| CTR | ____ |
| Leads generados | ____ |
| CPL final USD | ____ |
| Reuniones agendadas | ____ |
| Clientes cerrados (atribuibles) | ____ |
| ROAS (si aplica) | ____ |

### Lectura
- ¿Qué creativo ganó y por qué?
- ¿Qué audiencia rindió mejor?
- ¿Qué replicar en próxima campaña?
- ¿Qué evitar?

---

## 10. Aprendizaje guardado

Cuando la campaña termina, copiar 1-2 lecciones a `ads/_lessons.md` (a crear).
Patrón: "Para [audiencia X] funcionó [creativo Y] con CPL [Z]."
