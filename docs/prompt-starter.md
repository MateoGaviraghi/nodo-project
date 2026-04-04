# Prompt Starter — Copiar y pegar al iniciar cada chat nuevo en Claude Code

---

## Prompt para INICIAR un chat nuevo (copiar todo):

```
Antes de hacer cualquier cosa, necesito que cargues todo el contexto del proyecto:

1. Leé completo `CLAUDE.md` (está en la raíz del proyecto)
2. Leé completo `docs/blueprint.md` (plan técnico con wireframes y fases)
3. Leé completo `docs/skills-map.md` (cómo aplicar cada skill a ESTE proyecto)
4. Leé la memoria del proyecto en `~/.claude/projects/c--Users-mateo-Desktop-nodo-project/memory/` — especialmente `project_progress.md` para saber qué está hecho y `feedback_workflow.md` para saber cómo trabajo

Una vez que hayas leído todo, decime:
- Qué fase del proyecto estamos (según blueprint)
- Qué está hecho y qué falta (según memory)
- Qué tarea arrancamos

Recordá:
- Sos el senior dev del equipo, no un asistente
- Usá los skills ANTES de codear (están en CLAUDE.md con instrucciones de cuándo)
- Verificá todo con preview tools después de implementar
- Actualizá memory/project_progress.md cuando termines cada tarea
- Calidad nivel Vercel/Linear — nada genérico
```

---

## Prompt para PEDIR UNA TAREA específica (copiar y adaptar):

```
Leé CLAUDE.md, docs/blueprint.md, docs/skills-map.md y memory/project_progress.md antes de arrancar.

Necesito que [DESCRIBIR LA TAREA].

Workflow:
1. Invocá los skills relevantes antes de codear (ver CLAUDE.md sección WORKFLOW)
2. Implementá el código
3. Verificá con preview tools que funciona (preview_start, preview_snapshot, preview_console_logs, preview_screenshot)
4. Verificá responsive (preview_resize 375px, 768px, 1440px)
5. Actualizá memory/project_progress.md

Si encontrás errores, diagnosticá y arreglá antes de entregar.
```

---

## Prompt para REVIEW de calidad (copiar):

```
Leé CLAUDE.md y docs/skills-map.md. Hacé un review completo del estado actual del sitio:

1. Corré `/design:design-critique` en cada página
2. Corré `/design:accessibility-review` para WCAG 2.1 AA
3. Corré `/marketing:brand-review` para verificar voz de marca
4. Corré `/polish` para pass final de calidad
5. Verificá con preview tools: screenshot de cada página en mobile (375px) y desktop (1440px)
6. Corré `npm run build` y verificá 0 errores
7. Listá TODO lo que hay que mejorar ordenado por prioridad

Actualizá memory/project_progress.md con los findings.
```

---

## Prompt para DEPLOY (copiar):

```
Leé CLAUDE.md y docs/skills-map.md. Preparar el sitio para deploy:

1. Corré `/engineering:deploy-checklist`
2. Corré `/seo-audit` y `/schema-markup`
3. Verificá metadata, OG images, sitemap, robots.txt
4. `npm run build` sin errores
5. Lighthouse > 90 en todas las categorías
6. Corré `/deploy-to-vercel` para hacer deploy

Actualizá memory/project_progress.md con el estado de deploy.
```
