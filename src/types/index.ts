/* ═══════════════════════════════════════════════════════
   Nodo — Type Definitions
   ═══════════════════════════════════════════════════════ */

export type Language = "es" | "en";

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  role: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  serviceType: string;
  budget: string;
  message: string;
}
