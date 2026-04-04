"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG, SOCIAL_LINKS, NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  const { t } = useLanguage();

  const navTranslations = t.nav as Record<string, string>;

  return (
    <footer className="border-t border-white/6 bg-nodo-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logos/logo-n.png"
                alt="N"
                width={22}
                height={22}
                className="h-[22px] w-[22px]"
              />
              <span className="text-base font-medium text-nodo-white">
                Nodo
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-nodo-gray-400">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-nodo-gray-400">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-nodo-gray-300 transition-colors duration-200 hover:text-nodo-white"
                  >
                    {navTranslations[item.label] || item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-nodo-gray-400">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-nodo-gray-300 transition-colors duration-200 hover:text-nodo-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-nodo-gray-300 transition-colors duration-200 hover:text-nodo-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-nodo-gray-300 transition-colors duration-200 hover:text-nodo-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-nodo-gray-300 transition-colors duration-200 hover:text-nodo-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 sm:flex-row">
          <p className="text-xs text-nodo-gray-600">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. {t.footer.rights}
          </p>
          <p className="text-xs text-nodo-gray-600">
            {SITE_CONFIG.description}
          </p>
        </div>
      </div>
    </footer>
  );
}
