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
    team: { es: "Mateo · 1 persona", en: "Mateo · 1 person" },
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
        pair: {
          src: "/images/projects/guzman-motors/mobile-modelo.png",
          alt: { es: "Página de modelo en mobile", en: "Model page on mobile" },
        },
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
