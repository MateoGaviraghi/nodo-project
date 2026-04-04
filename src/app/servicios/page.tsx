import type { Metadata } from "next";
import ServiciosContent from "./ServiciosContent";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Desarrollo de software a medida, WordPress profesional y automatización con IA. Soluciones digitales que escalan con tu negocio.",
  alternates: { canonical: "https://nodo.com.ar/servicios" },
};

export default function ServiciosPage() {
  return <ServiciosContent />;
}
