"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { useLanguage } from "@/hooks/useLanguage";

export default function ServiciosContent() {
  const { t } = useLanguage();

  return (
    <section className="flex min-h-screen items-center justify-center px-4 pt-24">
      <div className="text-center">
        <SectionTitle as="h1">{t.services.title}</SectionTitle>
        <p className="mt-4 text-nodo-gray-400">Proximamente</p>
      </div>
    </section>
  );
}
