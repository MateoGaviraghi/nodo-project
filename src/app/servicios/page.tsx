import type { Metadata } from "next";
import ServiciosContent from "./ServiciosContent";

export const metadata: Metadata = {
  title: "Servicios — Desarrollo, WordPress, IA, Diseño, E-commerce",
  description:
    "Desarrollo de software a medida, WordPress profesional, automatización con IA, diseño UI/UX, e-commerce y mantenimiento. Software house boutique en Argentina.",
  alternates: { canonical: "https://nodotech.dev/servicios" },
};

export default function ServiciosPage() {
  return <ServiciosContent />;
}
