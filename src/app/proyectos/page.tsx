"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { useLanguage } from "@/hooks/useLanguage";

export default function ProyectosPage() {
  const { t } = useLanguage();

  return (
    <section className="flex min-h-screen items-center justify-center px-4 pt-24">
      <div className="text-center">
        <SectionTitle>{t.projects.title}</SectionTitle>
        <p className="mt-4 text-nodo-gray-400">Próximamente</p>
      </div>
    </section>
  );
}
