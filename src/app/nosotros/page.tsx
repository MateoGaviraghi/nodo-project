import type { Metadata } from "next";
import NosotrosContent from "./NosotrosContent";

export const metadata: Metadata = {
  title: "Nosotros — Software house boutique argentina",
  description:
    "Conocé al equipo detrás de Nodo. Software house boutique argentina con foco en código limpio, diseño con propósito y resultados reales.",
  alternates: { canonical: "https://nodotech.dev/nosotros" },
};

export default function NosotrosPage() {
  return <NosotrosContent />;
}
