"use client";

import { useLanguage } from "@/hooks/useLanguage";

/** Buzón de privacidad. Coincide con el remitente de Resend y con el texto de la política. */
const PRIVACY_EMAIL = "mateogaviraghi@nodotech.dev";

type PrivacySection = {
  title: string;
  body: readonly string[];
};

type PrivacyCopy = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: readonly PrivacySection[];
  contactTitle: string;
  contactBody: string;
};

export default function PrivacidadContent() {
  const { t } = useLanguage();
  const copy = t.privacy as PrivacyCopy;

  return (
    <main className="relative min-h-screen bg-nodo-black pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <header className="border-b border-white/[0.06] pb-10">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-nodo-indigo/50" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-nodo-indigo">
              {copy.eyebrow}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-nodo-white sm:text-4xl">
            {copy.title}
          </h1>

          <p className="mt-3 font-mono text-[12px] text-nodo-gray-600">
            {copy.updated}
          </p>

          <p className="mt-6 text-[15px] leading-relaxed text-nodo-gray-400">
            {copy.intro}
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {copy.sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="flex items-baseline gap-3 text-lg font-medium text-nodo-white">
                <span className="font-mono text-[13px] text-nodo-indigo">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>

              <div className="mt-4 space-y-3 border-l border-white/[0.06] pl-5">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[14px] leading-relaxed text-nodo-gray-400"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-white/[0.06] pt-8">
          <h2 className="text-lg font-medium text-nodo-white">
            {copy.contactTitle}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-nodo-gray-400">
            {copy.contactBody}{" "}
            <a
              href={`mailto:${PRIVACY_EMAIL}`}
              className="text-nodo-indigo underline-offset-4 transition-colors hover:text-nodo-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nodo-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-nodo-black"
            >
              {PRIVACY_EMAIL}
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
