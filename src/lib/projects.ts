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
    order: 1,
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
    order: 2,
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
