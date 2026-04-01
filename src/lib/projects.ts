import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    category: "Desarrollo a medida",
    description:
      "Plataforma de e-commerce con pasarela de pagos integrada, panel de administración y analytics en tiempo real.",
    image: "/images/projects/ecommerce.jpg",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: "2",
    title: "Portal Corporativo",
    category: "WordPress",
    description:
      "Sitio corporativo multilingual con CMS headless, blog y sistema de recruitment integrado.",
    image: "/images/projects/corporate.jpg",
    tags: ["WordPress", "PHP", "MySQL", "REST API"],
  },
  {
    id: "3",
    title: "Chatbot IA de Atención",
    category: "Automatización IA",
    description:
      "Chatbot con IA generativa para atención al cliente, integrado con CRM y base de conocimiento.",
    image: "/images/projects/chatbot.jpg",
    tags: ["OpenAI", "LangChain", "Python", "React"],
  },
  {
    id: "4",
    title: "App de Gestión Interna",
    category: "Desarrollo a medida",
    description:
      "Sistema interno de gestión de proyectos con dashboards, reportes y notificaciones en tiempo real.",
    image: "/images/projects/dashboard.jpg",
    tags: ["React", "TypeScript", "NestJS", "MongoDB"],
  },
];
