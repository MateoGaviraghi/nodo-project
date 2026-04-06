import type { Metadata } from "next";
import ProyectosContent from "./ProyectosContent";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portfolio de proyectos de Nodo. Aplicaciones web, sitios WordPress y soluciones de IA para clientes reales.",
  alternates: { canonical: "https://nodotech.dev/proyectos" },
};

export default function ProyectosPage() {
  return <ProyectosContent />;
}
