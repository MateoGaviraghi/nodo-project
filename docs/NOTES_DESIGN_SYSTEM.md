## MARCA
NODO — software house boutique argentina (equipo 1-3 personas) fundada por Mateo Gaviraghi. Dominio: nodotech.dev. Tagline: "Nodo. El punto donde tu idea se conecta con el mundo."
Hacemos 6 servicios bajo un mismo techo: desarrollo a medida, WordPress profesional, automatización con IA, diseño UI/UX, e-commerce y mantenimiento. Le servimos a emprendedores 25-45 y PyMEs LATAM que necesitan digitalizar sin jerga corporativa. Diferencial: ningún competidor directo argentino combina dev custom + WP + IA con posicionamiento boutique y estética nivel Vercel/Linear.

## CONTEXTO DE USO
Este design system se usa PRINCIPALMENTE para generar contenido de Instagram y redes sociales. Formatos que se van a producir:
- Carruseles 1080x1350 (5-7 slides)
- Posts únicos cuadrados 1080x1080 y verticales 1080x1350
- Stories y Reel covers 1080x1920

Secundariamente: one-pagers, pitch decks, materiales comerciales.

## PALETA DE COLORES
Extraídos del SVG de paleta, confirmados en `src/app/globals.css` (@theme tokens + CSS vars) y en la documentación de marca.

Marca:
- Negro base (nodo-black): #0a0a0a — fondo dominante de TODA pieza; dark-mode-first sin excepción
- Blanco (nodo-white): #ffffff — texto principal, headlines sobre fondo oscuro
- Azul eléctrico (nodo-blue): #2785fe — CTAs primarios, links, highlights de datos, focus states
- Cyan (nodo-cyan): #00c1f4 — acentos, hovers, íconos decorativos, handle, glow
- Púrpura (nodo-purple): #8b2fef — elementos premium, badges, inicio del gradiente
- Indigo (nodo-indigo): #5863f2 — complementario, estado intermedio del gradiente, fondos de cards secundarias

Grises derivados (del sistema):
- Gray 900: #1a1a2e — fondo alternativo de slides/paneles
- Gray 800: #16213e — fondo de cards glass dentro de slides
- Gray 700: #2a2a4a — bordes sutiles, dividers
- Gray 600: #3a3a5c — separadores secundarios
- Gray 400: #8888aa — texto secundario, captions, handle
- Gray 300: #b0b0cc — cuerpo de texto en slides largos
- Gray 200: #d0d0e8 — texto auxiliar en stories

Estados (no decorativos, solo funcionales):
- Success: #00d68f
- Warning: #ffaa00
- Error: #ff3d71

Gradiente principal (firma visual de la marca):
Lineal 135° (diagonal sup-izq → inf-der). Stops: #8b2fef 0% → #5863f2 30% → #2785fe 60% → #00c1f4 100%.
Simplificado (2 stops cuando el espacio es chico): #8b2fef → #00c1f4, mismo ángulo.
Uso del gradiente: SOLO en logo, líneas decorativas (2-4px), aplicado como clip sobre palabras clave, bordes de cards en hover, pill de CTA hero. NUNCA como fondo completo de una pieza.

## TIPOGRAFÍA
- Display / Headlines: Codec Pro Regular, tracking tight (letter-spacing -0.02em en H1), peso 400 renderizado grande para sensación geométrica
- Body: Codec Pro Regular, tracking normal, peso 400
- Énfasis / cursivas: Codec Pro Italic — uso esporádico para destacar 1-2 palabras clave (ej: "está llegando." con gradiente aplicado)
- Wordmark NODO: Codec Pro Regular en MAYÚSCULAS con tracking amplio (letter-spacing 0.25-0.3em)
- Fallback web cuando Codec Pro no está disponible: Poppins (Google Fonts, pesos 300/400/500/600/700/800)
- Monoespaciada (código, stats, labels técnicos): JetBrains Mono o Fira Code

Jerarquía sugerida para formatos 1:1 y 4:5 (1080px):
- H1 / headline hero: 64-80px (stories 9:16 van a 80-96px)
- H2 / título slide: 44-56px
- H3 / subtítulo: 32-40px
- Body: 24-28px
- Caption / label pequeño: 20-22px (con letter-spacing 0.2-0.25em para etiquetas tipo "CASO REAL" o "TIP DEL DÍA" en cyan)

## LOGO — REGLAS DE USO
- Versión principal: logo-nodo-sin-fondo.svg — isotipo "N" angular con gradiente púrpura→cian, usar sobre fondos oscuros (#0a0a0a) o piezas con mucho darkspace. Es la opción default en el 95% de los casos.
- Versión alternativa: logo-nodo-con-fondo-negro.svg — cuando la pieza requiere un bloque sólido encapsulado (ej: esquina de un collage, thumbnail que va sobre otra imagen, marca de agua sobre screenshot).
- Espacio de respeto mínimo: equivalente a la altura del isotipo alrededor del logo.
- Tamaño mínimo en feed 1080x1350: 80px de alto.
- Como marca de agua en posts: esquina inferior derecha, opacity 15-20%, 40-60px.
- NO deformar, NO cambiar los colores del gradiente (los stops exactos están en la paleta), NO aplicar sombras, NO aplicar outline, NO invertir colores, NO usar sobre fondos claros saturados que compitan con el gradiente.

## ESTILO VISUAL
Adjetivos que definen la marca: dark, minimalista, tecno, premium, intencional.

Referencias estéticas declaradas en la documentación interna: Vercel, Linear, Raycast, Stripe.

Ritmo visual:
- Mucho aire (whitespace/darkspace generoso, mínimo 80-120px de margen en piezas 1080x1350)
- Un punto focal por pieza (headline O dato grande O logo, no los tres compitiendo)
- Máximo 2-3 colores por composición además del fondo (ej: blanco + cyan + acento gradiente; NO mezclar los 4 colores del gradiente en elementos separados)
- Jerarquía tipográfica marcada por tamaño, no por color (el texto secundario va en gris, no en otro color de marca)
- Texturas sutiles permitidas: grid de puntos #1a1a2e sobre #0a0a0a (opacity 40%), glow difuso cyan al 10-15%, línea gradiente de 1-2px como separador
- Glassmorphism para cards internas: fondo rgba(26,26,46,0.6), borde 1px rgba(255,255,255,0.06), backdrop-filter blur(12px), radius 12-14px

## TONO DE VOZ
Español rioplatense (argentino). Uso de "vos", "tenés", "escribinos", "hablemos". Adjetivos: directo, técnico-accesible, confiado sin arrogancia, cercano.
Hook fuerte en las primeras 6 palabras. Mezclar frases cortas con desarrollo. Siempre cerrar con CTA claro (DM, link, pregunta).

Do:
- "Tu idea merece más que un template."
- "No vendemos código. Vendemos tranquilidad."
- "¿Cuántas horas perdés respondiendo siempre lo mismo?"
- "WordPress no está muerto. Está mal usado."
- "Del concepto al código. Hablemos."

Don't:
- "Soluciones integrales" / "líderes del mercado" / "llevamos tu negocio al siguiente nivel"
- "Disruptivo" / "paradigma" / "sinergia" / "ecosistema 360"
- Español neutro ("tú", "contáctanos", "te ayudamos a")
- Emojis decorativos en cada línea (máximo 1-3 por pieza, con criterio)
- Promesas vagas sin sustento ("resultados garantizados", "el mejor del mercado")

## AUDIENCIA
Emprendedor digital o dueño de PyME argentino/LATAM, 25-45 años, no técnico, con un negocio funcionando o una idea clara. Busca confianza antes de invertir. Consume IG/TikTok para informarse sobre tech. Suele depender de Excel, WhatsApp manual y una web vieja.

Pains principales:
- Perder horas en tareas repetitivas (responder consultas, copiar datos, agendar a mano)
- Tener presencia digital obsoleta (web lenta, no responsive, sin SSL, diseño 2018) sin saber a quién contratar
- Miedo a que le vendan humo — no puede distinguir un dev pro de uno mediocre ni entender si el precio es justo

Aspiraciones:
- Presencia digital premium que transmita confianza al primer vistazo y convierta visitantes en clientes
- Automatizar lo aburrido con IA para enfocarse en crecer
- Tener un equipo técnico que entienda su negocio, esté cuando algo falla y le traduzca lo técnico a decisiones claras

## COMPONENTES RECURRENTES (patrones que Claude debe reutilizar)
Extraídos del código de producción del repo nodo-project (Tailwind v4 + CSS custom properties).

- Cards (glass): radius 12-14px (rounded-xl), padding 28-40px, fondo rgba(26,26,46,0.6) con backdrop-blur(12px), borde 1px rgba(255,255,255,0.06). En hover: borde pasa a rgba(39,133,254,0.3), shadow 0 4px 30px rgba(39,133,254,0.12), translateY(-4px).
- Buttons primarios (CTA hero): fondo linear-gradient 135° completo (#8b2fef → #5863f2 → #2785fe → #00c1f4), texto blanco Codec Pro SemiBold 22-26px, radius 8-10px, padding 16-18px × 32-36px, glow cyan sutil opcional.
- Buttons secundarios (outline): transparente con borde gradiente (usar la técnica de mask xor si se puede; si no, borde sólido nodo-blue a 50% opacity), texto blanco.
- Buttons terciarios: solo texto blanco o cyan, sin fondo.
- Badges / labels técnicos: pill con fondo transparente, texto en Poppins/Codec Pro Bold 20-22px color cyan (#00c1f4), UPPERCASE, letter-spacing 0.2-0.25em. Ejemplos: "CASO REAL", "TIP DEL DÍA", "EN EL TALLER", "PRÓXIMAMENTE".
- Inputs: radius 8px, fondo white/[0.03], borde white/[0.06], focus con borde nodo-blue/50 + shadow 0 0 0 3px rgba(39,133,254,0.07).
- Íconos: estilo line/outlined (Lucide React en el código), stroke 1.5-2px, color hereda del texto. Tamaños 20px (inline), 48px (card), 120px (hero).
- Línea decorativa separadora: 80-160px de ancho, 2-4px alto, gradiente Nodo 135°, centrada bajo títulos.
- Glow element: radial-gradient cyan #00c1f4 o purple #8b2fef al 10-15% opacity, blur 60-80px, como luz ambiental detrás de elementos clave.
- Sombras de marca (no usar drop-shadow genéricas): shadow-blue = 0 4px 30px rgba(39,133,254,0.15); shadow-purple = 0 4px 30px rgba(139,47,239,0.15); shadow-glow = 0 0 40px rgba(0,193,244,0.1).

## DO'S & DON'TS GLOBALES
DO:
- Usar el gradiente violeta→cian del logo como acento (líneas, clip sobre texto, botones hero, bordes hover), NUNCA como fondo completo de la pieza
- Mantener aire entre elementos (80px+ de márgenes laterales en piezas grandes, 32-40px entre bloques internos)
- Jerarquía tipográfica fuerte: un tamaño dominante por pieza (headline vs subtítulo en ratio 2.5x mínimo)
- Máximo 3 colores por composición además del fondo negro
- Logo N siempre presente como marca de agua en esquina inferior derecha (opacity 15-20%, 40-60px)
- Handle @nodotech.dev en cada pieza, abajo, Codec Pro/Poppins Light 20-24px color gray-400 (#8888aa)
- Darkspace antes que decoración (si no aporta, eliminar)

DON'T:
- Stock photos corporativos genéricos (handshakes, gente en reuniones, laptops sobre madera)
- Emojis decorativos sobrecargando el diseño (tolerados: 1-3 con criterio por pieza)
- Gradientes pastel, naranjas, verdes o que compitan con el gradiente oficial de marca
- Tipografías script, handwritten, serif decorativas (Times, Playfair, Dancing Script, etc.)
- Tipografías del sistema (Arial, Helvetica, Verdana) — Codec Pro o Poppins siempre
- Efectos de sombra exagerados, drop-shadow multi-color o glows saturados
- Fondos blancos o claros (la marca es dark-mode-first absoluta)
- border-radius > 16px en cards o > 10px en botones
- Mezclar los 4 colores de marca en elementos separados dentro de la misma pieza (elegir 1-2)
- Más de 25 palabras por slide de carrusel
- Texto aplicado con gradiente sobre fondo que también tenga gradiente (compite consigo mismo)

## REFERENCIAS ESTÉTICAS
Vercel, Linear, Raycast, Stripe. Ese nivel de polish: minimalismo oscuro, tipografía impecable a gran tamaño, espaciado generoso, microinteracciones sutiles, color como acento puntual y no como decoración permanente.

---
# NOTAS PARA MATEO (no pegar esto en el formulario)

## Archivos leídos y qué aportaron
Útiles (alta señal):
- `CLAUDE.md` (raíz) + `nodo-brain/CLAUDE.md` — identidad, 6 servicios, tagline, paleta completa, gradiente, tipografía, reglas inquebrantables, referencias Vercel/Linear
- `nodo-brain/instrucciones-nodo.md` — doc de lineamientos original con CSS variables completas (útil pero tiene contradicciones, ver abajo)
- `src/app/globals.css` — **tokens de producción en Tailwind v4 `@theme` y CSS custom properties**. Confirma HEX, gradiente 135° con stops exactos, sombras de marca, clase `.glass`, radius usados. Fuente de verdad técnica.
- `publicaciones-ig/templates/brief-canva.md` — specs de cada template de IG (dimensiones, fonts en px, colores por elemento). Clave para la sección "componentes" y "jerarquía tipográfica".
- `publicaciones-ig/estrategia-maestra.md` — audiencia, tono, 5 pilares, hashtags, frecuencia
- `publicaciones-ig/feed/copys-mayo.md` y `reels/guiones.md` — 22 captions + 24 guiones con tono real (para ejemplos de Do's de voz)
- `publicaciones-ig/engagement-strategy.md` — bio y templates de DM (tono en acción)
- `nodo-brain/social/content-bank.md` — 42 ideas clasificadas por pilar
- `nodo-brain/docs/strategy/competitor-watch.md` — diferencial competitivo ("nadie combina dev + WP + IA")

Imágenes analizadas visualmente:
- `nodo-brain/nodo-paleta-colores.png` — confirmó los 6 chips de marca con HEX visibles (coincide 100% con el código)
- `nodo-brain/logo-sin-fondo-nodo.png` — confirmó isotipo "N" angular con gradiente diagonal púrpura→cian
- `publicaciones-ig/output/test/v4-feed-algo-llegando-1080x1350.png` — referencia visual de dirección (headline blanco + italic con gradiente + footer tipo wordmark)
- `publicaciones-ig/output/tarjetas/frente.png` — wordmark NODO en tracking amplio confirmado visualmente

Vacíos o irrelevantes:
- `publicaciones-ig/assets/` — vacía
- `publicaciones-ig/content/{feed,reels,stories}/` — vacías (son placeholders de estructura)
- `nodo-brain/assets/{fonts,logos,palette}/` — vacías
- `nodo-brain/docs/brand/`, `nodo-brain/docs/proposals/`, `nodo-brain/exports/` — vacías
- `nodo-brain/tools/`, `nodo-brain/web/` — vacías (estructura no usada)
- PDFs: solo hay uno (`CodecPro-Family-CC-BY-NCLicense.pdf`) — es la licencia de la tipografía, no aporta para el DS pero es relevante legalmente (ver abajo)
- No hay archivos .xlsx, .csv ni .json con datos de clientes o métricas reales. No hay posts previos (cuenta pre-lanzamiento).

## Aclaración sobre archivos subidos al formulario vs carpeta local
Mencionás en el form estos archivos:
- `logo-nodo-sin-fondo.svg` y `logo-nodo-con-fondo-negro.svg` → **en la carpeta local están como .png, no como .svg**. Confirmá que los .svg que subiste son la versión vectorial del mismo isotipo (gradiente púrpura→cian).
- `paleta-colores-nodo-svg.svg` → **no existe en la carpeta local**. El archivo local es `nodo-paleta-colores.png` (PNG). Asumí que el SVG subido al form tiene los mismos 6 chips con los HEX del código (#0a0a0a, #ffffff, #2785fe, #00c1f4, #8b2fef, #5863f2). Si el SVG tiene colores distintos, **flaggealo y reemplazá la sección PALETA DE COLORES con los HEX reales del SVG**.
- `CodecPro-Regular.ttf` y `CodecPro-Italic.ttf` → confirmados en `public/fonts/` del repo y en `nodo-brain/codec-pro/`. Cargados también en el CSS de producción vía @font-face.

## Info importante que NO encontré (completar antes de publicar el DS)
1. **Ejemplos visuales de posts que te gusten** (referencias concretas, no solo los 4 nombres Vercel/Linear/Raycast/Stripe). Sumá 3-5 screenshots de posts de IG de esas marcas o similares para que Claude Design tenga norte visual.
2. **Posts propios aprobados como "así SÍ"** — solo tenemos el teaser "Algo nuevo está llegando" y las tarjetas. Con 3-5 mocks propios más, el sistema calibra mejor.
3. **Número de WhatsApp real** — los copys usan `wa.me/54XXXXXXXXXX` sin completar.
4. **Licencia de Codec Pro para uso comercial** — el archivo `Codec-Pro-Family-CC-BY-NCLicense.pdf` dice CC-BY-NC (No-Comercial). Para posts promocionales de Nodo conviene confirmar con ZetaFonts si la licencia aplica al uso en redes o migrar contenido público a Poppins. **Esto es jurídicamente relevante antes de escalar.**
5. **Foto/avatar de Mateo como cara visible** — los guiones de reel asumen "Mateo a cámara" pero no sé si querés que aparezca en el feed (founder-led) o mantener la cuenta 100% brand.
6. **Grid de referencia del feed** — no hay mockup de cómo debería verse el feed de a 9 posts (3 filas). Claude Design no lo tiene en cuenta si no se lo decís.

## Contradicciones detectadas
1. **Wordmark — MÁS IMPORTANTE.** El doc `nodo-brain/instrucciones-nodo.md` (marzo 2026) menciona repetidamente "exa soft" / "nexa soft" como texto del imagotipo. Todo el resto del proyecto (CLAUDE.md actual del repo, CLAUDE.md de nodo-brain, paleta visual, tarjetas, dominio nodotech.dev, copys de IG, código) usa NODO. **Resolví usando NODO**. Recomendación fuerte: archivar o actualizar ese doc, está causando ruido.
2. **Cantidad de servicios.** `instrucciones-nodo.md` dice "Tres Pilares" (dev + WP + IA). CLAUDE.md actual y toda la estrategia de IG dicen 6 servicios (agregan UI/UX, e-commerce, mantenimiento). **Resolví usando 6**, que es lo vigente.
3. **Tipografía para redes.** Brand docs dicen "Codec Pro primario"; `templates/brief-canva.md` dice "Poppins porque Codec Pro no está en Canva". Para Claude Design (que puede usar las .ttf que le subiste) **resolví usando Codec Pro primario con Poppins como fallback explícito**. Si Claude Design no renderiza bien Codec Pro, cambiá a Poppins como default.
4. **"Boutique" vs tamaño real.** Algunos docs hablan de equipo 1-3 personas, otros insinúan un "equipo" más grande. Mantuve "1-3 personas" que es lo que figura en el CLAUDE.md actual y es más honesto como diferencial.

## 3 sugerencias para mejorar el design system
1. **Sumá un moodboard visual al form.** 5-8 imágenes de referencia de Vercel, Linear, Raycast y posts de IG que te gustan. Claude Design trabaja mucho mejor con referencias visuales que con texto describiendo "minimalista y premium".
2. **Agregá 3 ejemplos de posts terminados** aunque sean los que ya tenés en `publicaciones-ig/output/test/` (los dos "Algo nuevo está llegando") para que el sistema aprenda el ritmo visual real: darkspace top + logo N chico + headline centrado con italic+gradiente + footer con tracking amplio.
3. **Documentá 2 "posts prohibidos"** (screenshots de diseños genéricos o de competidores que NO querés imitar) con la nota "así NO". Es más efectivo que una lista de Don'ts textuales.
