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
