import type { Project, ProjectCategory } from "@/types";

/**
 * Proyectos del portfolio de Nodo.
 *
 * Para agregar un nuevo proyecto:
 *   1. Usar `docs/prompt-extraer-proyecto-v2.md` para generar el bloque desde el repo del cliente.
 *   2. Pegar el bloque al final del array.
 *   3. Copiar las capturas a `/public/images/projects/[slug]/` y referenciarlas en `thumbnail` + `screenshots`.
 *   4. Ajustar `order` para reordenar (menor = primero).
 *   5. Para sacar de producción: `published: false` (no eliminar — preserva historial).
 *
 * Sitemap, OG image y la ruta `[slug]` se generan automáticamente para todo proyecto con `published: true`.
 */

export const projects: Project[] = [
  {
    slug: "guzman-motors",
    order: 3,
    published: true,
    category: "dev",
    year: 2025,
    duration: { es: "14 semanas", en: "14 weeks" },
    industry: { es: "Automotor", en: "Automotive" },
    client: {
      name: "Guzman Motors",
      visibility: "public",
      liveUrl: "https://www.guzmanmotors.com.ar",
    },
    role: "lead",
    title: "Guzman Motors",
    tagline: {
      es: "Sitio nuevo y admin a medida para una concesionaria con 38 años.",
      en: "New site and custom admin for a 38-year-old dealership.",
    },
    summary: {
      es: "Reescritura completa del sitio y backoffice de Guzman Motors, concesionaria FOTON en Santa Fe con 38 años en la calle. La V1 hacía imposible cargar camiones y sectorizarlos. La V2 va con NestJS + MongoDB en el back, Next.js 15 + Tailwind v4 en el front, página dedicada por modelo y cotizador con folleto descargable.",
      en: "Full rewrite of the site and backoffice for Guzman Motors, a FOTON dealership in Santa Fe with 38 years on the road. The V1 made it impossible to load and categorize trucks. V2 ships with NestJS + MongoDB on the back, Next.js 15 + Tailwind v4 on the front, a dedicated page per model and a quote tool with downloadable brochure.",
    },
    caseStudy: {
      problem: {
        es: "El equipo de ventas perdía toda una tarde para cargar un vehículo: el admin viejo no permitía sectorizar camiones por categoría, las fotos iban una por una y la ficha técnica se editaba a mano. Cualquier cambio en la UI del sitio público dependía de pedirlo afuera y esperar semanas.",
        en: "The sales team lost an entire afternoon loading one vehicle: the old admin couldn't sort trucks by category, photos went up one by one and specs were edited by hand. Any UI tweak on the public site meant outsourcing the change and waiting weeks.",
      },
      approach: [
        {
          title: { es: "Levantamiento y modelo de datos", en: "Discovery and data model" },
          body: {
            es: "Dos semanas con Héctor y Leonardo mapeando cómo cargan un camión, una pickup y un remolque. Definimos un modelo en MongoDB que maneja las cinco familias FOTON, remolques y usados con la misma ergonomía.",
            en: "Two weeks with Héctor and Leonardo mapping how they load a truck, a pickup and a trailer. Defined a MongoDB schema that handles all five FOTON families, trailers and used vehicles with the same ergonomics.",
          },
        },
        {
          title: { es: "Admin que el equipo usa solo", en: "An admin the team uses without help" },
          body: {
            es: "Backoffice Next.js + NestJS con CRUD completo, carga múltiple a Cloudinary, lista avanzada con filtros y validaciones Zod. Cargar un vehículo bajó de una tarde a minutos.",
            en: "Next.js + NestJS backoffice with full CRUD, multi-image Cloudinary upload, advanced filtered lists and Zod validations. Loading a vehicle dropped from an afternoon to minutes.",
          },
        },
        {
          title: { es: "Página propia por modelo", en: "A dedicated page per model" },
          body: {
            es: "Doce modelos FOTON con landing dedicada, galería, ficha técnica y CTA al cotizador. Diseño moderno, SEO desde el día uno y performance cuidada.",
            en: "Twelve FOTON models with dedicated landings, gallery, spec sheet and CTA to the quote tool. Modern design, SEO from day one, performance-tuned.",
          },
        },
        {
          title: { es: "Cotizador y folleto en PDF", en: "Quote tool and brochure in PDF" },
          body: {
            es: "El cliente arma la cotización en el sitio y se lleva un folleto PDF generado al vuelo con @react-pdf/renderer. El admin ve el lead, el cliente se va con algo en la mano.",
            en: "The client builds the quote on the site and walks away with a brochure PDF generated on the fly with @react-pdf/renderer. The admin sees the lead, the client leaves with something tangible.",
          },
        },
      ],
      outcome: {
        es: "El equipo de ventas dejó de pelear con el admin: cargar un vehículo con fotos y ficha completa pasa en minutos. Cada modelo tiene página propia con cotizador integrado y el sitio se ve y siente moderno, a la par de cualquier marca grande del rubro.",
        en: "The sales team stopped fighting the admin: loading a vehicle with photos and full specs takes minutes. Every model has its own page with embedded quote tool, and the site looks and feels modern — on par with any big-brand site in the category.",
      },
      // Quote pendiente — descomentar cuando Héctor o Leonardo Guzmán pasen la frase.
      // quote: {
      //   text: { es: "...", en: "..." },
      //   author: "Héctor Guzmán",
      //   role: { es: "Dueño · Guzman Motors", en: "Owner · Guzman Motors" },
      // },
    },
    thumbnail: {
      src: "/images/projects/guzman-motors/hero-home.png",
      alt: {
        es: "Logo de Guzman Motors",
        en: "Guzman Motors logo",
      },
      aspect: "16:10",
      frame: "browser",
    },
    screenshots: [
      {
        src: "/images/projects/guzman-motors/hero.webp",
        alt: { es: "Home de Guzman Motors", en: "Guzman Motors home" },
        caption: {
          es: "Home con hero 'Agencia de Venta y Consignación', carrusel de modelos FOTON y números reales del cliente (38+ años, 1500+ unidades).",
          en: "Home with the 'Sales & Consignment' hero, FOTON model carousel and the client's real numbers (38+ years, 1,500+ units).",
        },
        aspect: "16:9",
        frame: "browser",
        hero: true,
      },
      {
        src: "/images/projects/guzman-motors/tunland-v9.webp",
        alt: { es: "Página del Tunland V9", en: "Tunland V9 page" },
        caption: {
          es: "Página dedicada del Tunland V9: galería, ficha técnica, especificaciones y CTA al cotizador. Cada modelo FOTON tiene su propia landing.",
          en: "Dedicated Tunland V9 page: gallery, spec sheet, key features and CTA to the quote tool. Every FOTON model has its own landing.",
        },
        aspect: "16:9",
        frame: "browser",
      },
      {
        src: "/images/projects/guzman-motors/cotizador.png",
        alt: { es: "Cotizador con folleto PDF", en: "Quote tool with PDF brochure" },
        caption: {
          es: "Cotizador con folleto PDF descargable generado al vuelo con @react-pdf/renderer.",
          en: "Quote tool with downloadable brochure generated on the fly via @react-pdf/renderer.",
        },
        aspect: "16:9",
        frame: "browser",
        link: {
          url: "/images/projects/guzman-motors/cotizacion-tunland-v9.pdf",
          label: { es: "Ver folleto PDF real", en: "View real PDF brochure" },
        },
      },
      {
        src: "/images/projects/guzman-motors/hero-mobile.png",
        alt: { es: "Home en mobile", en: "Home on mobile" },
        caption: {
          es: "Mobile responsive: home y página de modelo lado a lado. Misma jerarquía y velocidad que en desktop.",
          en: "Mobile responsive: home and model page side by side. Same hierarchy and speed as desktop.",
        },
        aspect: "9:16",
        frame: "phone",
        pair: [
          {
            src: "/images/projects/guzman-motors/mobile-modelo.png",
            alt: { es: "Página de modelo en mobile", en: "Model page on mobile" },
          },
        ],
      },
      {
        src: "/images/projects/guzman-motors/lista-avanzada-vehiculo.png",
        alt: { es: "Listado avanzado del admin", en: "Advanced admin list" },
        caption: {
          es: "Listado avanzado del admin con filtros, búsqueda y acciones. Datos sensibles anonimizados por confidencialidad del cliente.",
          en: "Advanced admin list with filters, search and actions. Sensitive data anonymized to protect client confidentiality.",
        },
        aspect: "16:9",
        frame: "browser",
      },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "NestJS 11",
      "MongoDB",
      "Cloudinary",
      "@react-pdf/renderer",
      "Zod",
      "Fly.io",
    ],
    metrics: [
      {
        value: 12,
        prefix: "+",
        label: { es: "modelos con página dedicada", en: "models with dedicated page" },
      },
      {
        value: 6,
        label: { es: "módulos en el admin", en: "admin modules" },
      },
    ],
    accent: "blue",
    repos: [
      { label: "Frontend", url: "https://github.com/MateoGaviraghi/GM-FRONT-V2" },
      { label: "Backend", url: "https://github.com/MateoGaviraghi/GM-BACK-V2" },
    ],
  },
  {
    slug: "presisso-expo",
    order: 1,
    published: true,
    category: "ia",
    year: 2026,
    duration: { es: "4 semanas", en: "4 weeks" },
    industry: { es: "Muebles · Diseño de cocinas", en: "Furniture · Kitchen design" },
    client: {
      name: "Presisso Amoblamientos",
      visibility: "public",
      liveUrl: "https://presisso-expo.vercel.app",
    },
    role: "lead",
    title: "Presisso Expo",
    tagline: {
      es: "IA que transforma la foto de tu cocina en un render con muebles Presisso reales.",
      en: "AI that turns a photo of your kitchen into a render with real Presisso furniture.",
    },
    summary: {
      es: "Atractor digital para EXPOCON 2026 de Presisso Amoblamientos. El visitante saca una foto de su cocina, elige uno de los cinco materiales reales del catálogo y Gemini Imagen 4 genera un render fotorrealista con muebles Presisso. El resultado se entrega como PDF por mail y queda en una URL pública con token corto. Atrás, panel admin con audit-log, recovery de jobs colgados y cron de cleanup.",
      en: "Digital magnet for Presisso Amoblamientos at EXPOCON 2026. The visitor snaps a photo of their kitchen, picks one of five real materials from the catalog, and Gemini Imagen 4 generates a photorealistic render with Presisso furniture. The output ships as a PDF by email and stays at a public short-token URL. On the back, admin panel with audit-log, stuck-job recovery and a cleanup cron.",
    },
    caseStudy: {
      problem: {
        es: "Presisso iba a EXPOCON con muestras físicas y catálogo en papel: el visitante curioso veía el material en el stand pero no podía proyectar cómo le iba a quedar en su propia cocina. La conversación se moría después del expo, sin lead capturado y sin nada que el cliente se llevara para volver a mirar.",
        en: "Presisso used to attend EXPOCON with physical samples and a paper catalog: a curious visitor saw the material at the booth but couldn't picture how it would actually look in their own kitchen. The conversation died after the expo — no lead captured, nothing for the client to take home and revisit.",
      },
      approach: [
        {
          title: { es: "Catálogo real en lugar de placeholders", en: "Real catalog, no placeholders" },
          body: {
            es: "Levantamos los cinco materiales que Presisso quería poner sobre la mesa: melamina litio, melamina grafito scotch, polímero táctil white gloss, politex gris grafito y politex negro. Cada uno con sus fotos reales del stock para que el visitante eligiera viendo el acabado, no leyendo un nombre técnico.",
            en: "We mapped the five materials Presisso wanted on the table: lithium melamine, graphite-scotch melamine, white-gloss tactile polymer, graphite-grey politex and black politex. Each one shipping with real catalog photos, so the visitor picks by looking at the finish, not by reading a technical name.",
          },
        },
        {
          title: { es: "Flujo público de tres minutos", en: "A three-minute public flow" },
          body: {
            es: "Single-page interactivo en Next.js: subir foto, elegir modo, elegir material, dejar nombre y mail, confirmar. Validación con Zod en cada paso, upload a Supabase Storage, persistencia con token corto. Sin app, sin registro, sin login.",
            en: "Interactive single-page in Next.js: upload photo, pick mode, pick material, leave name and email, confirm. Zod validation at every step, upload to Supabase Storage, persistence with a short token. No app, no signup, no login.",
          },
        },
        {
          title: { es: "Generación con Gemini Imagen 4 + entrega", en: "Generation with Gemini Imagen 4 + delivery" },
          body: {
            es: "El backend envía la foto + el material elegido a Gemini Imagen 4 con prompt afinado, recibe el render y lo compone en un PDF profesional con pdf-lib y Sharp. El cliente recibe el PDF por mail (Resend + Gmail SMTP) y puede volver a verlo en una URL pública /p/[token] sin login.",
            en: "The backend sends the photo + chosen material to Gemini Imagen 4 with a tuned prompt, receives the render and composes a professional PDF with pdf-lib and Sharp. The client gets the PDF by email (Resend + Gmail SMTP) and can revisit it at a public /p/[token] URL with no login.",
          },
        },
        {
          title: { es: "Admin con auditoría y self-healing", en: "Admin with audit and self-healing" },
          body: {
            es: "Backoffice para el equipo Presisso: lista de solicitudes con estados, audit-log de cada cambio, recovery automático de jobs colgados (cron cada 10 min), Sentry para errores y RLS sobre Supabase. Cada lead queda trazable y el equipo comercial llama al día siguiente con todo el contexto.",
            en: "Backoffice for the Presisso team: requests list with states, audit-log of every change, automatic recovery of stuck jobs (cron every 10 min), Sentry for production errors and RLS over Supabase. Every lead stays traceable and the sales team calls the next day with full context.",
          },
        },
      ],
      outcome: {
        es: "Presisso entra a EXPOCON con un atractor digital: el visitante deja el stand con un PDF personalizado de su cocina, mail registrado y la marca Presisso en la cabeza. Cada interacción queda como lead trazable en el admin, lista para que el equipo comercial le haga seguimiento al día siguiente.",
        en: "Presisso walks into EXPOCON with a digital magnet: the visitor leaves the booth with a personalized PDF of their kitchen, email on record and Presisso top of mind. Every interaction becomes a trackable lead in the admin, ready for the sales team to follow up the next day.",
      },
      // Quote pendiente — descomentar cuando el equipo de Presisso pase la frase.
      // quote: {
      //   text: { es: "...", en: "..." },
      //   author: "—",
      //   role: { es: "Presisso Amoblamientos", en: "Presisso Amoblamientos" },
      // },
    },
    thumbnail: {
      src: "/images/projects/presisso-expo/hero.png",
      alt: {
        es: "Home de Presisso Expo",
        en: "Presisso Expo home",
      },
      aspect: "16:10",
      frame: "browser",
    },
    screenshots: [
      {
        src: "/images/projects/presisso-expo/hero.png",
        alt: { es: "Home de Presisso Expo", en: "Presisso Expo home" },
        caption: {
          es: "Home con badge EXPOCON 2026, headline 'Visualizá tu cocina ideal con Presisso' y CTA al flujo de tres minutos sin registro.",
          en: "Home with the EXPOCON 2026 badge, the 'Visualize your ideal kitchen with Presisso' headline and a CTA into the three-minute flow.",
        },
        aspect: "16:9",
        frame: "browser",
        hero: true,
      },
      {
        src: "/images/projects/presisso-expo/flujo-materiales.png",
        alt: { es: "Selección de material", en: "Material picker" },
        caption: {
          es: "Selector con los cinco acabados reales del catálogo Presisso, cada uno con foto del stock para elegir viendo el material y no un nombre técnico.",
          en: "Material picker with the five real finishes from the Presisso catalog, each with a stock photo so visitors choose by looking at the finish.",
        },
        aspect: "16:9",
        frame: "browser",
      },
      {
        src: "/images/projects/presisso-expo/resultado-ia.png",
        alt: { es: "Resultado IA con antes y después", en: "AI result with before and after" },
        caption: {
          es: "Vista del admin con el antes y después generado por Gemini Imagen 4 y acciones de aprobar, regenerar PDF y enviar por mail o WhatsApp.",
          en: "Admin view with the before-and-after generated by Gemini Imagen 4 and actions to approve, regenerate the PDF and send it by email or WhatsApp.",
        },
        aspect: "16:9",
        frame: "browser",
        link: {
          url: "/images/projects/presisso-expo/pdf-diseno-presisso.pdf",
          label: { es: "Ver PDF real generado", en: "View real generated PDF" },
        },
      },
      {
        src: "/images/projects/presisso-expo/hero-mobile.png",
        alt: { es: "Home en mobile", en: "Home on mobile" },
        caption: {
          es: "Mobile responsive con home, selector de material y antes-después lado a lado: el visitante hace todo el flujo desde el celular en pleno expo.",
          en: "Mobile responsive with home, material picker and before-and-after side by side: visitors run the entire flow from their phone right on the expo floor.",
        },
        aspect: "9:16",
        frame: "phone",
        pair: [
          {
            src: "/images/projects/presisso-expo/mobile-flujo.png",
            alt: { es: "Selector de material en mobile", en: "Material picker on mobile" },
          },
          {
            src: "/images/projects/presisso-expo/mobile-resultado.png",
            alt: { es: "Antes y después en mobile", en: "Before and after on mobile" },
          },
        ],
      },
      {
        src: "/images/projects/presisso-expo/admin.png",
        alt: { es: "Dashboard admin con 19 solicitudes", en: "Admin dashboard with 19 requests" },
        caption: {
          es: "Dashboard del backoffice con 19 solicitudes, estados (Generando, En Revisión, Aprobada, Enviada) y datos de cada lead para que ventas siga la conversación.",
          en: "Backoffice dashboard with 19 requests, states (Generating, In Review, Approved, Sent) and lead data so sales can pick up the conversation.",
        },
        aspect: "16:9",
        frame: "browser",
      },
    ],
    stack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind v3",
      "Supabase",
      "Gemini Imagen 4",
      "pdf-lib",
      "Sharp",
      "Resend",
      "Zod",
      "Sentry",
      "Vercel",
    ],
    metrics: [
      {
        value: 5,
        label: { es: "materiales reales del catálogo", en: "real materials from the catalog" },
      },
      {
        value: 3,
        suffix: " min",
        label: { es: "experiencia end-to-end", en: "end-to-end experience" },
      },
    ],
    accent: "purple",
    repos: [
      { label: "Repositorio", url: "https://github.com/MateoGaviraghi/presisso-expo" },
    ],
  },
  {
    slug: "mercedes-benz-leonardo-guzman",
    order: 2,
    published: true,
    category: "dev",
    year: 2026,
    duration: { es: "20 semanas", en: "20 weeks" },
    industry: { es: "Automotor · Marca premium", en: "Automotive · Premium brand" },
    client: {
      name: "Leonardo Guzmán · Mercedes-Benz",
      visibility: "public",
      liveUrl: "https://leonardo-guzman-mercedes-benz.vercel.app",
    },
    role: "lead",
    title: "Mercedes-Benz · Leonardo Guzmán",
    tagline: {
      es: "Sitio cinematográfico y CRM propio para un vendedor oficial Mercedes-Benz.",
      en: "Cinematic site and custom CRM for an official Mercedes-Benz sales advisor.",
    },
    summary: {
      es: "Plataforma propia de Leonardo Guzmán, vendedor oficial Mercedes-Benz para Automotores Mega SA en Entre Ríos. Catálogo completo (Autos, SUV, Vans, Sprinter y camiones AMG/comerciales) con página dedicada por modelo, CRM custom con zonas y reschedule automático a 20 días, y admin con drag-and-drop para que el equipo cargue vehículos sin pedir afuera. Next.js 16 + React 19 + Supabase, deploy en Vercel.",
      en: "Personal platform for Leonardo Guzmán, official Mercedes-Benz sales advisor for Automotores Mega SA in Entre Ríos. Full catalog (Autos, SUV, Vans, Sprinter and AMG/commercial trucks) with a dedicated page per model, custom CRM with zones and automatic 20-day reschedule, and a drag-and-drop admin so the team loads vehicles without outside help. Next.js 16 + React 19 + Supabase, deployed on Vercel.",
    },
    caseStudy: {
      problem: {
        es: "Leonardo no tenía cómo capturar prospectos: vendía Mercedes-Benz para Automotores Mega pero su libreta de contactos vivía en cuadernos y WhatsApps sueltos. La conversación con un interesado se perdía si no la retomaba al día siguiente, y el catálogo MB que mostraba era el genérico de la marca, sin presencia personal del vendedor.",
        en: "Leonardo had no way to capture prospects: he sold Mercedes-Benz for Automotores Mega but his client book lived in notebooks and scattered WhatsApps. A conversation with an interested buyer was lost if he didn't pick it up the next day, and the MB catalog he showed was the brand's generic one, with no personal presence of the salesperson.",
      },
      approach: [
        {
          title: { es: "Catálogo MB completo con página propia por modelo", en: "Full MB catalog with a dedicated page per model" },
          body: {
            es: "Levantamos las cinco verticales que vende Mercedes-Benz: Autos, SUV, Vans, Sprinter y camiones (Accelo, Atego, Actros, Arocs, Axor). Cada modelo tiene landing dedicada con galería de exterior e interior, paleta de colores reales, ficha técnica con nueve grupos de specs y CTA al contacto. Variante AMG con tratamiento visual diferenciado.",
            en: "We mapped Mercedes-Benz's five verticals: Autos, SUV, Vans, Sprinter and trucks (Accelo, Atego, Actros, Arocs, Axor). Each model gets a dedicated landing with exterior and interior gallery, real color palette, a spec sheet with nine groups and a CTA to contact. AMG variant with a distinct visual treatment.",
          },
        },
        {
          title: { es: "Estética cinematográfica para una marca premium", en: "Cinematic aesthetic for a premium brand" },
          body: {
            es: "Diseño blanco/negro/serif con tres videos hero (sedanes, SUV y camiones) y carouseles editoriales. La barra superior y los detalles tipográficos respetan el código visual MB sin caer en la plantilla genérica. Mobile responsive sin perder tono editorial.",
            en: "Black/white/serif design with three hero videos (sedans, SUV and trucks) and editorial carousels. The top bar and typographic details respect MB's visual code without falling into the generic template. Mobile responsive without losing the editorial tone.",
          },
        },
        {
          title: { es: "CRM propio con zonas y reschedule a 20 días", en: "Custom CRM with zones and 20-day reschedule" },
          body: {
            es: "Backoffice CRM completo: cada prospecto entra con zona geográfica (Paraná, Concordia, Gualeguaychú), historial de cambios y reschedule automático a 20 días. Si Leonardo no avanza una tarjeta, un cron diario en Vercel la mueve a 'reagendar' para que ningún lead se enfríe en silencio. Auth Supabase + RLS por usuario.",
            en: "Full CRM backoffice: every prospect comes in with a geographic zone (Paraná, Concordia, Gualeguaychú), change history and automatic 20-day reschedule. If Leonardo doesn't advance a card, a daily Vercel cron moves it to 'reschedule' so no lead silently goes cold. Supabase auth + per-user RLS.",
          },
        },
        {
          title: { es: "Admin con drag-and-drop para cargar sin pedir afuera", en: "Drag-and-drop admin to load without outside help" },
          body: {
            es: "Forms separados para vehículos y camiones, drag-and-drop con dnd-kit para reordenar imágenes (exterior, interior, colores, equipamiento), guía visual con los specs MB y validación en cada paso. Loguearse, cargar un modelo y publicarlo es trabajo del equipo, no nuestro.",
            en: "Separate forms for vehicles and trucks, dnd-kit drag-and-drop to reorder images (exterior, interior, colors, equipment), visual guide with MB specs and validation at each step. Logging in, loading a model and publishing it is the team's job, not ours.",
          },
        },
      ],
      outcome: {
        es: "Leonardo pasó de vender desde su cuaderno a tener su nombre como marca digital MB en Entre Ríos: catálogo completo de Mercedes-Benz con su firma personal, prospectos como tarjetas con zona y vencimiento, y un equipo que carga modelos sin depender de nosotros. Cero leads enfriados en silencio.",
        en: "Leonardo went from selling out of his notebook to having his name as a digital MB brand in Entre Ríos: a full Mercedes-Benz catalog with his personal signature, prospects as cards with zone and expiration, and a team that loads models without depending on us. Zero leads silently going cold.",
      },
      // Quote pendiente — descomentar cuando Leonardo pase la frase.
      // quote: {
      //   text: { es: "...", en: "..." },
      //   author: "Leonardo Guzmán",
      //   role: { es: "Vendedor Oficial · Mercedes-Benz / Automotores Mega", en: "Official Sales Advisor · Mercedes-Benz / Automotores Mega" },
      // },
    },
    thumbnail: {
      src: "/images/projects/mercedes-benz-leonardo-guzman/hero-home.png",
      alt: { es: "Home Mercedes-Benz Leonardo Guzmán", en: "Mercedes-Benz Leonardo Guzmán home" },
      aspect: "16:10",
      frame: "browser",
    },
    screenshots: [
      {
        src: "/images/projects/mercedes-benz-leonardo-guzman/hero.png",
        alt: { es: "Home cinematográfico con video reveal Mercedes-Benz", en: "Cinematic home with Mercedes-Benz reveal video" },
        caption: {
          es: "Home cinematográfico con video reveal Mercedes-Benz, headline serif y firma personal de Leonardo Guzmán como vendedor oficial en Entre Ríos.",
          en: "Cinematic home with the Mercedes-Benz reveal video, serif headline and Leonardo Guzmán's personal signature as official sales advisor in Entre Ríos.",
        },
        aspect: "16:9",
        frame: "browser",
        hero: true,
      },
      {
        src: "/images/projects/mercedes-benz-leonardo-guzman/vehicles-filtros.png",
        alt: { es: "Listado de vehículos con sidebar de filtros y switch Mercedes-Benz / AMG", en: "Vehicle catalog with filter sidebar and Mercedes-Benz / AMG switch" },
        caption: {
          es: "Listado completo con sidebar de filtros (carrocerías, combustible) y switch entre Mercedes-Benz y AMG para recorrer toda la gama oficial.",
          en: "Full catalog with a filter sidebar (body type, fuel) and a Mercedes-Benz / AMG switch to walk the entire official lineup.",
        },
        aspect: "16:9",
        frame: "browser",
      },
      {
        src: "/images/projects/mercedes-benz-leonardo-guzman/modelo.png",
        alt: { es: "Página dedicada de un modelo Mercedes-Benz", en: "Dedicated Mercedes-Benz model page" },
        caption: {
          es: "Página dedicada por modelo con galería de exterior e interior, paleta de colores reales y nueve grupos de specs técnicas para cada Mercedes-Benz.",
          en: "Dedicated page per model with exterior and interior gallery, real color palette and nine groups of technical specs for every Mercedes-Benz.",
        },
        aspect: "16:9",
        frame: "browser",
      },
      {
        src: "/images/projects/mercedes-benz-leonardo-guzman/crm.png",
        alt: { es: "CRM custom con zonas y reschedule automático", en: "Custom CRM with zones and automatic reschedule" },
        caption: {
          es: "CRM propio con prospectos por zona geográfica, historial de cambios y reschedule automático a 20 días vía cron diario para que ningún lead se enfríe.",
          en: "Custom CRM with prospects by geographic zone, change history and automatic 20-day reschedule via daily cron so no lead silently goes cold.",
        },
        aspect: "16:9",
        frame: "browser",
      },
      {
        src: "/images/projects/mercedes-benz-leonardo-guzman/hero-mobile.png",
        alt: { es: "Home, listado y filtros en mobile", en: "Home, catalog and filters on mobile" },
        caption: {
          es: "Mobile responsive con home cinematográfico, listado por categoría y filtros expandidos lado a lado para navegar el catálogo desde el celular.",
          en: "Mobile responsive with cinematic home, category catalog and expanded filters side by side to navigate the lineup right from the phone.",
        },
        aspect: "9:16",
        frame: "phone",
        pair: [
          {
            src: "/images/projects/mercedes-benz-leonardo-guzman/mobile-listado.png",
            alt: { es: "Listado por categoría en mobile", en: "Category catalog on mobile" },
          },
          {
            src: "/images/projects/mercedes-benz-leonardo-guzman/mobile-filtros.png",
            alt: { es: "Filtros expandidos en mobile", en: "Expanded filters on mobile" },
          },
        ],
      },
      {
        src: "/images/projects/mercedes-benz-leonardo-guzman/admin.png",
        alt: { es: "Admin con drag-and-drop para cargar vehículos", en: "Admin with drag-and-drop to load vehicles" },
        caption: {
          es: "Admin con drag-and-drop (dnd-kit) y forms separados de vehículos y camiones para que el equipo del cliente cargue modelos sin pedir afuera.",
          en: "Admin with drag-and-drop (dnd-kit) and separate forms for vehicles and trucks so the client's team loads models without outside help.",
        },
        aspect: "16:9",
        frame: "browser",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Supabase",
      "@dnd-kit/core",
      "Embla Carousel",
      "Framer Motion",
      "React Compiler",
      "Vercel",
    ],
    metrics: [
      {
        value: 12,
        prefix: "+",
        label: { es: "modelos en el catálogo", en: "models in the catalog" },
      },
      {
        value: 5,
        label: { es: "verticales del catálogo", en: "catalog verticals" },
      },
    ],
    accent: "indigo",
    repos: [
      { label: "Repositorio", url: "https://github.com/MateoGaviraghi/Leonardo-Guzman-Mercedes-Benz" },
    ],
  },
  {
    slug: "distribuidor-marcial",
    order: 4,
    published: true,
    category: "ecommerce",
    year: 2026,
    duration: { es: "8 semanas", en: "8 weeks" },
    industry: {
      es: "Libros · Grabaciones · Tecnología magnética",
      en: "Books · Recordings · Magnetic media",
    },
    client: {
      name: "Distribuidor Marcial",
      visibility: "public",
      liveUrl: "https://distribuidor-marcial.vercel.app",
    },
    role: "lead",
    title: "Distribuidor Marcial",
    tagline: {
      es: "Ecommerce vintage de libros y grabaciones con MercadoPago y admin a medida.",
      en: "Vintage ecommerce for books and recordings with MercadoPago and a custom admin.",
    },
    summary: {
      es: "Tienda online de Distribuidor Marcial: libros, grabaciones y tecnología magnética con identidad vintage de pe a pa. React + Redux + Tailwind en el front, NestJS + TypeORM en el back, pasarela MercadoPago para el checkout y admin propio para que el equipo cargue catálogo sin depender de nadie.",
      en: "Online store for Distribuidor Marcial: books, recordings and magnetic media with a vintage identity from front to back. React + Redux + Tailwind on the front, NestJS + TypeORM on the back, MercadoPago for checkout and a custom admin so the team manages the catalog on its own.",
    },
    caseStudy: {
      problem: {
        es: "Distribuidor Marcial vendía a sus clientes habituales por mostrador y WhatsApp. No había tienda online ni un lugar único donde viviera el catálogo: cada producto era una foto suelta y cada cobro un mensaje aparte con CBU.",
        en: "Distribuidor Marcial sold to regulars over the counter and WhatsApp. There was no online store and no single place where the catalog lived: every product was a loose photo and every payment a separate message with bank details.",
      },
      approach: [
        {
          title: { es: "Identidad vintage end-to-end", en: "End-to-end vintage identity" },
          body: {
            es: "Paleta cream/marrón/dorado con Playfair Display y Bebas Neue para que cada pantalla huela a libro viejo. El mismo lenguaje visual recorre home, catálogo, ficha de producto y admin.",
            en: "Cream/brown/gold palette with Playfair Display and Bebas Neue so every screen smells like an old book. The same visual language runs across home, catalog, product page and admin.",
          },
        },
        {
          title: { es: "Catálogo, filtros y búsqueda", en: "Catalog, filters and search" },
          body: {
            es: "Grid paginado con orden por popularidad y precio, sidebar de filtros por categoría y buscador en el header. Los productos cargan desde la API y se reordenan por familia, dejando los sin stock al final.",
            en: "Paginated grid with sorting by popularity and price, sidebar filters by category and a search bar in the header. Products load from the API and reorder by family, pushing out-of-stock items to the end.",
          },
        },
        {
          title: { es: "Carrito + MercadoPago en una pantalla", en: "Cart + MercadoPago on one screen" },
          body: {
            es: "Sidebar de carrito persistente, totales calculados en cliente y checkout con MercadoPago integrado vía SDK. El cliente arma el pedido sin recargar nada y termina el pago sin salir del sitio.",
            en: "Persistent cart sidebar, client-side totals and MercadoPago checkout integrated via SDK. The customer builds the order without reloads and finishes the payment without leaving the site.",
          },
        },
        {
          title: { es: "Admin propio con auth y CRUD", en: "Custom admin with auth and CRUD" },
          body: {
            es: "Backend NestJS con TypeORM y módulos de auth, categorías y productos. Ruta /admin protegida por rol, panel CRUD completo y carga de imágenes para que el equipo gestione el catálogo solo.",
            en: "NestJS backend with TypeORM and auth, categories and products modules. The /admin route is role-gated, with a full CRUD panel and image upload so the team manages the catalog on its own.",
          },
        },
      ],
      outcome: {
        es: "El sitio público respira identidad vintage, el catálogo es navegable con filtros y orden, el carrito y MercadoPago resuelven el checkout sin fricción, y el admin permite cargar libros, casetes y vinilos en minutos. Un ecommerce completo, listo para sumar más categorías.",
        en: "The public site breathes vintage identity, the catalog is browsable with filters and sorting, the cart and MercadoPago handle checkout with no friction, and the admin lets the team load books, cassettes and vinyls in minutes. A full ecommerce, ready to scale into more categories.",
      },
      // Quote pendiente — descomentar cuando el equipo de Distribuidor Marcial pase la frase.
      // quote: {
      //   text: { es: "...", en: "..." },
      //   author: "...",
      //   role: { es: "Dueño · Distribuidor Marcial", en: "Owner · Distribuidor Marcial" },
      // },
    },
    thumbnail: {
      src: "/images/projects/distribuidor-marcial/hero.png",
      alt: {
        es: "Home de Distribuidor Marcial",
        en: "Distribuidor Marcial home",
      },
      aspect: "16:10",
      frame: "browser",
    },
    screenshots: [
      {
        src: "/images/projects/distribuidor-marcial/hero.png",
        alt: { es: "Home de Distribuidor Marcial", en: "Distribuidor Marcial home" },
        caption: {
          es: "Home con hero cinematográfico, logo blanco sobre fondo oscuro tipo mármol y grid de productos paginados con tipografía Playfair Display.",
          en: "Home with cinematic hero, white logo over dark marble background and paginated product grid with Playfair Display typography.",
        },
        aspect: "16:9",
        frame: "browser",
        hero: true,
      },
      {
        src: "/images/projects/distribuidor-marcial/producto.png",
        alt: { es: "Detalle de producto", en: "Product detail" },
        caption: {
          es: "Ficha de producto con galería, descripción, precio, stock y CTA para sumar al carrito sin salir de la página.",
          en: "Product detail page with gallery, description, price, stock and CTA to add to cart without leaving the page.",
        },
        aspect: "16:9",
        frame: "browser",
      },
      {
        src: "/images/projects/distribuidor-marcial/carrito-mp.png",
        alt: { es: "Carrito abierto con CTA a MercadoPago", en: "Open cart with CTA to MercadoPago" },
        caption: {
          es: "Sidebar de carrito abierto con totales en vivo y CTA al checkout de MercadoPago, sin salir de la página del producto.",
          en: "Cart sidebar open with live totals and CTA to MercadoPago checkout, all without leaving the product page.",
        },
        aspect: "16:9",
        frame: "browser",
      },
      {
        src: "/images/projects/distribuidor-marcial/hero-mobile.png",
        alt: { es: "Versión mobile del sitio", en: "Mobile version of the site" },
        caption: {
          es: "Mobile responsive: home, ficha de producto y carrito lado a lado. Misma jerarquía vintage y velocidad que en desktop.",
          en: "Mobile responsive: home, product detail and cart side by side. Same vintage hierarchy and speed as desktop.",
        },
        aspect: "9:16",
        frame: "phone",
        pair: [
          {
            src: "/images/projects/distribuidor-marcial/mobile-producto.png",
            alt: { es: "Ficha de producto en mobile", en: "Product detail on mobile" },
          },
          {
            src: "/images/projects/distribuidor-marcial/mobile-carrito.png",
            alt: { es: "Carrito en mobile", en: "Cart on mobile" },
          },
        ],
      },
    ],
    stack: [
      "Create React App",
      "React 18",
      "React Router 6",
      "Redux",
      "axios",
      "Tailwind v3",
      "NestJS",
      "TypeORM",
      "MercadoPago",
      "Vercel",
    ],
    metrics: [
      {
        value: 1,
        label: { es: "pasarela de pago", en: "payment gateway" },
      },
      {
        value: 3,
        label: { es: "módulos del backend", en: "backend modules" },
      },
    ],
    accent: "cyan",
  },
];

/* ───────────────────────── helpers ───────────────────────── */

export const getPublishedProjects = () =>
  projects.filter((p) => p.published).sort((a, b) => a.order - b.order);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug && p.published);

export const getFeaturedProject = () =>
  getPublishedProjects().find((p) => p.featured);

export const getProjectsByCategory = (cat: ProjectCategory | "all") =>
  cat === "all"
    ? getPublishedProjects()
    : getPublishedProjects().filter((p) => p.category === cat);

export const getNextProject = (currentSlug: string) => {
  const list = getPublishedProjects();
  const idx = list.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return list[0];
  return list[(idx + 1) % list.length];
};

export const getCategoryCounts = () => {
  const list = getPublishedProjects();
  const counts: Record<ProjectCategory | "all", number> = {
    all: list.length,
    dev: 0,
    wordpress: 0,
    ia: 0,
    ecommerce: 0,
    uiux: 0,
    maintenance: 0,
  };
  list.forEach((p) => {
    counts[p.category]++;
  });
  return counts;
};
