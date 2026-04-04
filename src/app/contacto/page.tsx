import type { Metadata } from "next";
import ContactoContent from "./ContactoContent";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Nodo. Contanos tu idea y te respondemos en menos de 24 horas. WhatsApp, videollamada o formulario.",
  alternates: { canonical: "https://nodo.com.ar/contacto" },
};

export default function ContactoPage() {
  return <ContactoContent />;
}
