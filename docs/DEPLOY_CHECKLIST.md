# Nodo — Deploy Checklist (Pre-launch)

Deadline: **30 abril 2026**
Dominio: **nodotech.dev**

Este checklist cubre los pasos que **solo Mateo** puede ejecutar (requieren acceso a dashboards externos o decisiones de producto). El código ya está listo para producción y buildea sin errores.

---

## 0 · Resend — Verificar dominio para email branded

El email de confirmación branded de Nodo se manda vía **Resend**. Para mandar desde `hola@nodotech.dev` (en vez de un dominio genérico `resend.dev`), hay que verificar el dominio una vez. Pasos:

### 0.1 · Dashboard de Resend
1. Login en https://resend.com (cuenta ya creada).
2. **Domains** → **Add Domain** → `nodotech.dev`.
3. Resend muestra **3 registros DNS** para copiar. Son de tipo:
   - **1× TXT** `_resend` con el value SPF de Resend.
   - **2× CNAME** de DKIM (`resend._domainkey` y `resend2._domainkey` o similar, según la cuenta).
   - Opcionalmente: **1× MX** `feedback.nodotech.dev` para tracking de bounces.

### 0.2 · Agregar los registros en tu registrador
En el panel del registrador donde compraste `nodotech.dev`:
- **Tipo:** copiar exactamente lo que muestra Resend (TXT / CNAME).
- **Host/Name:** el que indica Resend (ej. `_resend`, `resend._domainkey`).
- **Value:** pegar el value completo (son strings largos, ojo con espacios).
- **TTL:** dejar default (3600).

### 0.3 · Verificar
De vuelta en Resend → **Verify DNS records**. Puede tardar de 5 min a 1h (propagación DNS). Una vez **verified**, el remitente `hola@nodotech.dev` queda habilitado.

### 0.4 · Mientras no esté verificado
El envío del email branded **falla silenciosamente** (logueado en Vercel logs, pero no rompe el booking). El cliente sigue recibiendo el email de Google Calendar con RSVP. Apenas verifiques el dominio, el branded empieza a mandarse automáticamente.

### 0.5 · API key en Vercel
Agregar en **Vercel dashboard → Settings → Environment Variables** (scope **Production**):

| Variable | Valor |
|---|---|
| `RESEND_API_KEY` | La API key que empieza con `re_...` (rotala después de Resend para tener una nueva solo en Vercel) |
| `RESEND_FROM` | `Nodo <hola@nodotech.dev>` |

> **⚠️ Importante:** rotá la API key en Resend dashboard y actualizala solo en Vercel (no la subas a git ni la compartas en chats). La key vieja se puede revocar una vez que la nueva esté en Vercel.

---

## 1 · Vercel — Env vars de producción

En el dashboard de Vercel → Project `nodo-project` → Settings → Environment Variables. Marcar las variables como **Production** (y opcionalmente Preview).

| Variable | Valor | Notas |
|---|---|---|
| `GOOGLE_CLIENT_ID` | *(desde `.env.local`)* | Mismo que el OAuth client |
| `GOOGLE_CLIENT_SECRET` | *(desde `.env.local`)* | Mantener secreto |
| `GOOGLE_REDIRECT_URI` | `https://nodotech.dev/api/google/callback` | **CAMBIA en prod** — local usa localhost |
| `GOOGLE_REFRESH_TOKEN` | *(desde `.env.local`)* | Token de largo plazo del owner |
| `GOOGLE_CALENDAR_ID` | `primary` | O calendar específico si se cambia |
| `BOOKING_HOST_EMAIL` | `nodotech.dev@gmail.com` | **Requerido** — sin esto el evento no tiene organizer explícito |
| `BOOKING_HOST_NAME` | `Nodo` | Aparece en el invite |
| `BOOKING_HOST_TIMEZONE` | `America/Argentina/Buenos_Aires` | GMT-3 |
| `BOOKING_DURATION_MIN` | `30` | Duración de la reunión |
| `BOOKING_BUFFER_MIN` | `15` | Buffer entre reuniones |
| `BOOKING_WINDOW_DAYS` | `30` | Rango de días agendables |
| `RESEND_API_KEY` | *(desde Resend dashboard, ver §0.5)* | Envío de email branded |
| `RESEND_FROM` | `Nodo <hola@nodotech.dev>` | Remitente del email branded |
| `SUPABASE_URL` | *(desde Supabase, ver `docs/SUPABASE_SETUP.md`)* | Persistencia de feedback |
| `SUPABASE_SERVICE_ROLE_KEY` | *(desde Supabase, secret)* | Persistencia de feedback |

**⚠️ Importante:** en el OAuth Client de Google Cloud Console, agregar `https://nodotech.dev/api/google/callback` como **Authorized redirect URI** (además del de localhost que ya está).

---

## 2 · Google Cloud Console — OAuth en modo producción

Hoy la app OAuth está en **modo testing**. Solo los emails en la lista "Test users" pueden completar el flow. En producción cualquier visitante puede agendar, entonces:

### Opción A (recomendada — sin verificación)
Si Nodo solo va a usar el refresh token del **dueño** (cuenta `nodotech.dev@gmail.com`) y los booking-users son solo **attendees** (no autorizan nada), **no se requiere verificación**. Los invitados reciben un mail estándar, no pasan por OAuth.
- Quedarse en **modo testing** está OK mientras el único usuario autorizado es el owner.
- **Acción:** ninguna. Solo asegurarse de que nunca se dispare `/api/google/auth` en prod (es para el setup inicial).

### Opción B (si se quisiera ampliar a múltiples owners)
Salir de testing → requiere "App verification" de Google. Proceso de 1-4 semanas. Incluir:
- Privacy policy pública
- Terms of service
- Scope justification
- Domain verification

**Para el 30 de abril: Opción A.** El flow actual no lo necesita.

---

## 3 · DNS — nodotech.dev

1. En Vercel → Domains → agregar `nodotech.dev` y `www.nodotech.dev`.
2. En el registrador del dominio (donde compraste nodotech.dev):
   - Apuntar `A` record de `@` a la IP que Vercel indica.
   - `CNAME` de `www` a `cname.vercel-dns.com`.
3. Esperar propagación (~10-60 min). Vercel auto-gestiona SSL con Let's Encrypt.

---

## 4 · Google Search Console

1. Ir a https://search.google.com/search-console
2. Agregar propiedad: `https://nodotech.dev`
3. Verificar con **TXT DNS record** (recomendado) o meta tag en `<head>`.
4. Submitear sitemap: `https://nodotech.dev/sitemap.xml` (ya generado automáticamente).
5. Request indexing de páginas clave: `/`, `/servicios`, `/nosotros`, `/contacto`.

---

## 5 · Lighthouse audit post-deploy

Objetivo: Performance, Accessibility, Best Practices, SEO todos **> 90**.

```bash
# Con dev server corriendo o contra prod:
npx lighthouse https://nodotech.dev --view
```

Métricas críticas:
- LCP < 2.5s
- CLS < 0.1
- TBT < 200ms

Si performance < 90: revisar tamaño de imagenes hero (122 JPG), lazy-loading de NetworkSphere, bundle size de Framer Motion.

---

## 6 · QA manual antes de publicar

### Booking flow end-to-end
- [ ] Abrir https://nodotech.dev/contacto
- [ ] Card "Videollamada" → scroll a `#agendar`
- [ ] Elegir un día (lun-vie dentro de próximos 30 días)
- [ ] Verificar que aparecen 11 slots correctos (10:00, 10:45, 11:30, …)
- [ ] Elegir slot → formulario
- [ ] Completar con un email real de prueba
- [ ] Confirmar → estado success con link a inbox
- [ ] **Verificar en Gmail del owner (nodotech.dev@gmail.com)** que el evento se creó
- [ ] **Verificar que el invitado recibió mail con Google Meet link**

### Cross-browser
- [ ] Chrome desktop (primary)
- [ ] Safari desktop
- [ ] Firefox desktop
- [ ] Chrome mobile (Android)
- [ ] Safari mobile (iOS)

### Responsive
- [ ] 375px (iPhone SE)
- [ ] 768px (iPad)
- [ ] 1024px (laptop)
- [ ] 1440px (desktop)

### Links
- [ ] WhatsApp abre wa.me correctamente
- [ ] Email `mailto:` abre cliente de correo
- [ ] Todos los CTAs del home → `/contacto#agendar` funcionan
- [ ] Footer: los dos WhatsApp (Mateo + Justo) funcionan

---

## 7 · Post-launch (semana 1)

- [ ] Analytics: verificar que Vercel Analytics + Speed Insights están recibiendo data.
- [ ] Booking real: agendar una reunión de prueba con un amigo externo.
- [ ] Monitorear logs en Vercel → Runtime logs para detectar 5xx en `/api/book` o `/api/availability`.
- [ ] Revisar Search Console después de 7 días para indexación.

---

## Riesgos conocidos / cosas a vigilar

- **OAuth refresh token expiration:** Google puede invalidar refresh tokens si están sin uso 6 meses. En producción esto no va a pasar (se usa constantemente), pero si alguna vez falla `/api/availability` con error de auth, regenerar el token via `/api/google/auth` desde la cuenta owner y actualizar `GOOGLE_REFRESH_TOKEN` en Vercel.
- **Race condition en booking:** ya mitigado con re-check freebusy antes de `events.insert` (409 si se ocupó mientras el user completaba el form).
- **Abuso del endpoint `/api/book`:** no hay rate limiting. Si se vuelve un problema, agregar Upstash rate-limit o Vercel KV (pero es improbable con el volumen esperado).
