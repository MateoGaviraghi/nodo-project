/* ═══════════════════════════════════════════════════════
   Nodo — Translations (ES/EN)
   ═══════════════════════════════════════════════════════ */

export const translations = {
  es: {
    nav: {
      servicios: "Servicios",
      proyectos: "Proyectos",
      nosotros: "Nosotros",
      contacto: "Contacto",
      cta: "Empezar proyecto",
    },
    hero: {
      headline: "Transformamos tus *ideas* en software",
      subtitle:
        "Desarrollo a medida · WordPress profesional · Automatización con IA",
      cta_primary: "Empezar proyecto",
      cta_secondary: "Conocer más",
    },
    services: {
      title: "Lo que hacemos",
      dev: {
        title: "Desarrollo a medida",
        description:
          "Aplicaciones web y mobile diseñadas desde cero para tu negocio. Código limpio, arquitectura sólida, escalable.",
      },
      wordpress: {
        title: "WordPress profesional",
        description:
          "Sitios rápidos, seguros y administrables. Temas custom, e-commerce, optimización SEO.",
      },
      ia: {
        title: "Automatización con IA",
        description:
          "Integramos inteligencia artificial en tus procesos. Chatbots, análisis de datos, automatización de tareas.",
      },
    },
    stats: {
      projects: "Proyectos",
      clients: "Clientes",
      experience: "Años de experiencia",
    },
    projects: {
      title: "Nuestro trabajo",
      cta: "Ver todos los proyectos",
    },
    testimonials: {
      title: "Lo que dicen nuestros clientes",
    },
    cta: {
      title: "¿Tenés una idea?",
      subtitle: "Hablemos y construyamos algo que importe.",
      button: "Agendar una llamada",
    },
    footer: {
      tagline: "El punto donde tu idea se conecta con el mundo.",
      rights: "Todos los derechos reservados.",
    },
    contact: {
      title: "Hablemos",
      subtitle: "Contanos tu idea y te respondemos en menos de 24hs.",
      form: {
        name: "Nombre",
        email: "Email",
        service: "Tipo de servicio",
        budget: "Presupuesto estimado",
        message: "Mensaje",
        submit: "Enviar mensaje",
      },
      whatsapp: "Escribinos por WhatsApp",
      calendly: "Agendar una videollamada",
    },
    about: {
      title: "El equipo que hace que pase",
      values: {
        clean_code: "Código limpio",
        design: "Diseño con propósito",
        communication: "Comunicación directa",
        results: "Resultados reales",
      },
    },
  },
  en: {
    nav: {
      servicios: "Services",
      proyectos: "Projects",
      nosotros: "About",
      contacto: "Contact",
      cta: "Start a project",
    },
    hero: {
      headline: "We turn your *ideas* into software",
      subtitle: "Custom development · Professional WordPress · AI Automation",
      cta_primary: "Start a project",
      cta_secondary: "Learn more",
    },
    services: {
      title: "What we do",
      dev: {
        title: "Custom development",
        description:
          "Web and mobile applications designed from scratch for your business. Clean code, solid architecture, scalable.",
      },
      wordpress: {
        title: "Professional WordPress",
        description:
          "Fast, secure, and manageable websites. Custom themes, e-commerce, SEO optimization.",
      },
      ia: {
        title: "AI Automation",
        description:
          "We integrate artificial intelligence into your processes. Chatbots, data analysis, task automation.",
      },
    },
    stats: {
      projects: "Projects",
      clients: "Clients",
      experience: "Years of experience",
    },
    projects: {
      title: "Our work",
      cta: "View all projects",
    },
    testimonials: {
      title: "What our clients say",
    },
    cta: {
      title: "Got an idea?",
      subtitle: "Let's talk and build something that matters.",
      button: "Schedule a call",
    },
    footer: {
      tagline: "Where your idea connects with the world.",
      rights: "All rights reserved.",
    },
    contact: {
      title: "Let's talk",
      subtitle: "Tell us your idea and we'll get back to you within 24h.",
      form: {
        name: "Name",
        email: "Email",
        service: "Service type",
        budget: "Estimated budget",
        message: "Message",
        submit: "Send message",
      },
      whatsapp: "Message us on WhatsApp",
      calendly: "Schedule a video call",
    },
    about: {
      title: "The team that makes it happen",
      values: {
        clean_code: "Clean code",
        design: "Purposeful design",
        communication: "Direct communication",
        results: "Real results",
      },
    },
  },
} as const;

export type TranslationKey = typeof translations.es;
