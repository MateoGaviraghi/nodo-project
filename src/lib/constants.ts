/* ═══════════════════════════════════════════════════════
   Nodo — Constants & Configuration
   ═══════════════════════════════════════════════════════ */

export const SITE_CONFIG = {
  name: "Nodo",
  domain: "nodotech.dev",
  tagline: "El punto donde tu idea se conecta con el mundo.",
  description: "Transformamos ideas en software.",
  url: "https://nodotech.dev",
  ogImage: "/og-image.png",
} as const;

export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/5493425162081",
  instagram: "https://www.instagram.com/nodotech.dev/",
  linkedin: "https://linkedin.com/company/nodotech.dev",
  github: "https://github.com/MateoGaviraghi",
  email: "nodotech.dev@gmail.com",
} as const;

export const FOUNDERS = [
  {
    name: "Mateo Gaviraghi",
    phoneDisplay: "+54 9 3425 16-2081",
    whatsapp: "https://wa.me/5493425162081",
  },
  {
    name: "Justo González Viescas",
    phoneDisplay: "+54 9 3425 26-7005",
    whatsapp: "https://wa.me/5493425267005",
  },
] as const;

export const NAV_ITEMS = [
  { label: "servicios", href: "/servicios" },
  { label: "proyectos", href: "/proyectos" },
  { label: "nosotros", href: "/nosotros" },
  { label: "contacto", href: "/contacto" },
] as const;

export const COLORS = {
  black: "#0a0a0a",
  white: "#ffffff",
  blue: "#2785fe",
  cyan: "#00c1f4",
  purple: "#8b2fef",
  indigo: "#5863f2",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/* ═══════════════════════════════════════════════════════
   Contact helpers — prefilled WhatsApp / mailto links
   ═══════════════════════════════════════════════════════ */

/** Build a wa.me URL from a phone (raw digits or full URL) with optional prefilled text. */
export function waLink(phoneOrUrl: string, text?: string): string {
  const number = phoneOrUrl.match(/\d+/g)?.join("") || "";
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Build a mailto URL with optional prefilled subject and body. */
export function emailMailto(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${email}${query ? `?${query}` : ""}`;
}

/** Default prefilled messages for contact CTAs across the site. */
export function getContactDefaults(language: "es" | "en") {
  const es = language === "es";
  return {
    waGeneric: es
      ? "¡Hola Nodo! 👋 Quiero contarles sobre un proyecto."
      : "Hi Nodo! 👋 I'd like to tell you about a project.",
    waPersonal: (firstName: string) =>
      es
        ? `¡Hola ${firstName}! 👋 Me interesa conocer más sobre Nodo.`
        : `Hi ${firstName}! 👋 I'd like to know more about Nodo.`,
    emailSubject: es ? "Consulta desde nodotech.dev" : "Inquiry from nodotech.dev",
    emailBody: es
      ? "¡Hola Nodo!\n\nTe escribo porque me interesa conocer más sobre sus servicios.\n\nContame un poco de lo que tienen en mente:\n- \n\n¡Gracias!"
      : "Hi Nodo,\n\nI'm reaching out because I'd like to know more about your services.\n\nA bit about what I have in mind:\n- \n\nThanks!",
  };
}
