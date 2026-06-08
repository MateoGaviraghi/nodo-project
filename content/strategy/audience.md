# Audiencia de Nodo — 3 personas

> Cada pieza de contenido tiene que poder etiquetarse con "primaria: X, secundaria: Y". Si no aplica a ninguna de las 3, no se hace.

---

## Persona 1 — María, dueña de PYME

**Demográfico:**
- 38-55 años, mujer u hombre (uso "María" por escribir más fluido).
- Argentina, capital o ciudades medianas (Rosario, Córdoba, Mendoza, Santa Fe).
- Dueña/o o gerente de un negocio: distribuidora, taller, consultora, comercio, estudio profesional.
- Ingresos suficientes para invertir USD 3-15k en digitalización.

**Mindset:**
- Su negocio anda — pero "se siente" que está atado con alambre.
- Excel + Google Sheets + WhatsApp + tal vez un CRM viejo. Las cosas se rompen.
- No es técnica. Habla con el "informático" pero no entiende del todo qué le explican.
- Ya la quemaron: contrató dev freelance que desapareció, plantilla WordPress que se rompió, sistema "con todo incluido" que nunca terminó.
- Tiempo escaso. Lee captions cortos, mira reels en la cama o en pausa de almuerzo.

**Lo que duele:**
- Buscar una factura en mails.
- Que el empleado nuevo aprenda 3 sistemas distintos.
- Recibir pedidos por WhatsApp y olvidarse de cargarlos.
- No saber stock real en tiempo real.
- Web "vieja" que da vergüenza mostrar.
- Pagar mantenimiento mensual y que nadie le explique qué se hace con esa plata.

**Lo que la mueve:**
- Sentir que va a poder dormir sin pensar en el negocio.
- Que el sistema "lo entienda" alguien que no es ella (empleados, hijos en el negocio).
- Mostrar que el negocio creció / se modernizó.
- No volver a pasar por una mala experiencia con dev.

**Cómo le hablamos:**
- Cero jerga. Si decimos "API", explicamos en 1 línea.
- Hablamos de **resultados** (factura encontrada en 2 segundos, pedidos no perdidos, control real), no de **tecnología** (NestJS, Prisma).
- Casos como ERP, Marcial, Guzmán le hablan directo.

**Triggers que le funcionan en feed:**
- "3 cosas que tu web hace mal y te están costando ventas"
- "El día que [Distribuidor Marcial] cambió mostrador por ecommerce"
- "Cómo dejar Excel sin trauma — guía honesta"

---

## Persona 2 — Tomás, founder de startup

**Demográfico:**
- 25-38, varón mayoritariamente (aplicar lenguaje neutro).
- Argentina o LATAM (Uruguay, Chile, México).
- Construyendo un MVP, levantando ronda seed, o early-stage post-ronda.
- Background mixto: a veces técnico, a veces de negocios o producto.

**Mindset:**
- Velocidad > perfección. Necesita lanzar para validar.
- Conoce el ecosistema: Vercel, Supabase, OpenAI, Stripe. Lee Twitter/X dev.
- Compara opciones: dev in-house vs agencia vs no-code vs nadie.
- Tiene presión de tiempo y de capital.
- Valora criterio técnico — quiere alguien que le diga "esto es boludez" cuando lo es.

**Lo que duele:**
- Devs freelance que tardan el doble.
- Agencias que no entienden producto, solo entregan código.
- Tener que micromanagear cada decisión técnica.
- No saber si su stack le va a aguantar el crecimiento.
- IA "gimmick" en demos pero falla en producción.

**Lo que lo mueve:**
- Tener un partner que piense con él, no solo ejecute.
- Velocidad real (no "rápido" en marketing, rápido en hechos).
- Ver el trabajo del otro antes de comprometerse (de ahí los casos del portfolio).
- Calidad técnica visible (Next.js bien hecho, performance, tipos, testing).

**Cómo le hablamos:**
- Jerga OK. "Server components", "RLS Supabase", "edge runtime" — sí.
- Casos como Presisso (Gemini Imagen + pdf-lib + Sentry) le hablan directo.
- Hot takes técnicos le encantan: "por qué cambié X por Y".

**Triggers que le funcionan:**
- "MVP en 4 semanas: cómo construimos Presisso"
- "El stack que usaríamos para tu startup según el caso"
- "Por qué Next.js + Supabase es la dupla más rota para early stage"
- "Probé v0/Lovable/Bolt: lo que sirve y lo que no"

---

## Persona 3 — Lucas, dev / freelance / maker

**Demográfico:**
- 22-35, varón mayoritariamente.
- LATAM disperso, mucho usuario de Twitter/X dev en español.
- Trabaja como dev en relación de dependencia, freelance, o construyendo su propia indie.
- Estudia o estudió carrera técnica, autodidacta también.

**Mindset:**
- Curioso, peer audience. Quiere ver qué hace otra gente.
- Crítico — detecta rápido el contenido genérico y "agencyspeak".
- Comparte mucho cuando algo le resuena (es el motor de viralidad).
- No es cliente directo, pero es **multiplicador**: te recomienda a su jefe o a su amigo founder.

**Lo que duele:**
- Ver agencias mediocres cobrar 10x lo que él haría freelance.
- Influencers tech sin código.
- Stacks viejos cuando el cliente pide algo nuevo.

**Lo que lo mueve:**
- Aprender herramientas nuevas.
- Validar criterios (yo también pienso así, está bueno).
- Sentirse parte de una conversación profesional.
- Ver builds en vivo, time-lapses, behind-the-scenes técnico.

**Cómo le hablamos:**
- Pleno modo dev. Sin diluir.
- Hot takes con datos. Casos con detalle técnico.
- Reaccionar a tendencias rápido.
- Compartir errores propios (vulnerable + técnico).

**Triggers que le funcionan:**
- "Por qué dejé de usar [X] en producción"
- "Mi setup 2026 para construir SaaS LATAM"
- "Errores en el código del ERP que no detecté hasta que rompió"
- "Cuánto cobrar un MVP en USD — números reales"

---

## Cómo etiquetar cada pieza de contenido

Cada draft (`reels/drafts/*.md`, `feed/drafts/*.md`) tiene que tener al inicio:

```yaml
audiencia_primaria: María | Tomás | Lucas
audiencia_secundaria: María | Tomás | Lucas | (vacío)
pilar: educativo | casos | opinión | lifestyle
```

**Regla:** si una pieza no tiene audiencia primaria clara, **no se hace**. Genera ruido.

---

## Distribución mensual ideal por persona

| Persona | % de piezas |
|---|---|
| María (PYME) | 40% |
| Tomás (founder) | 35% |
| Lucas (dev) | 25% |

> Esta distribución refleja que María es el cliente directo más común, Tomás el que paga más por proyecto y Lucas el multiplicador. Se ajusta al cierre de cada mes según resultados en `kpis.md`.
