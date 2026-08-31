import type { Metadata } from "next";
import PrivacidadContent from "./PrivacidadContent";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué datos personales recolecta nodotech.dev, para qué los usamos, con quién los compartimos y cómo pedir que los borremos.",
  alternates: { canonical: "https://nodotech.dev/privacidad" },
};

export default function PrivacidadPage() {
  return <PrivacidadContent />;
}
