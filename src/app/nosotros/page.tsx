import type { Metadata } from "next";
import NosotrosContent from "./NosotrosContent";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce al equipo detrás de Nodo. Software house boutique argentina con foco en código limpio, diseño con propósito y resultados reales.",
  alternates: { canonical: "https://nodo.com.ar/nosotros" },
};

export default function NosotrosPage() {
  return <NosotrosContent />;
}
