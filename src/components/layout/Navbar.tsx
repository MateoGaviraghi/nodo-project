"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroComplete, setHeroComplete] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
      const hasHero = document.querySelector("[data-hero]");
      if (hasHero) {
        setHeroComplete(window.scrollY > window.innerHeight * 1.3);
      } else {
        setHeroComplete(true);
      }
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const navTranslations = t.nav as Record<string, string>;

  // Navbar background logic:
  // - Mobile menu open → always glass
  // - Hero not complete → hidden (pointer-events-none)
  // - Scrolled → glass
  // - Default → transparent
  const navBg = isMobileOpen
    ? "glass border-b border-white/6"
    : heroComplete
      ? isScrolled
        ? "glass border-b border-white/6"
        : "bg-transparent"
      : "pointer-events-none";

  const navOpacity = isMobileOpen ? 1 : heroComplete ? 1 : 0;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        style={{ opacity: navOpacity }}
      >
        <div className="mx-auto w-full px-8 lg:px-16">
          <div className="flex h-16 items-center md:h-20">
            {/* Logo — left always */}
            <Link
              href="/"
              className="mr-auto flex shrink-0 items-center"
              onClick={() => {
                setIsMobileOpen(false);
                if (window.location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "instant" });
                }
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
                <Image
                  src="/logos/logo-n.png"
                  alt="Nodo"
                  width={100}
                  height={100}
                  className="h-auto w-auto max-h-[100px] max-w-[100px]"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav — pages centradas absolutamente */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
              <div className="flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative py-2 text-[13px] text-nodo-gray-300 transition-colors duration-200 hover:text-nodo-white"
                  >
                    {navTranslations[item.label] || item.label}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side — desktop: idiomas + CTA / mobile: lang + hamburger */}
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              {/* Language toggle — visible always */}
              <div className="flex items-center rounded-xs border border-white/8">
                <button
                  type="button"
                  onClick={() => setLanguage("es")}
                  className={`px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                    language === "es"
                      ? "bg-white/8 text-nodo-white"
                      : "text-nodo-gray-400 hover:text-nodo-gray-300"
                  }`}
                  aria-label="Cambiar a Español"
                >
                  ES
                </button>
                <div className="h-3.5 w-px bg-white/6" />
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                    language === "en"
                      ? "bg-white/8 text-nodo-white"
                      : "text-nodo-gray-400 hover:text-nodo-gray-300"
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
              </div>

              {/* CTA — desktop only */}
              <Link
                href="/contacto"
                className="hidden items-center rounded-[3px] px-5 py-2 text-[13px] font-medium text-nodo-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(39,133,254,0.15)] md:inline-flex"
                style={{ background: "var(--nodo-gradient-full)" }}
              >
                {t.nav.cta}
              </Link>

              {/* Mobile toggle */}
              <button
                type="button"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-sm active:bg-white/6 md:hidden"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="h-6 w-6 text-nodo-white" />
                ) : (
                  <Menu className="h-6 w-6 text-nodo-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-[rgba(26,26,46,0.6)] backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6 pb-16">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-1 text-center text-[1.75rem] font-medium text-nodo-white transition-colors active:text-nodo-cyan"
                  >
                    {navTranslations[item.label] || item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                className="flex w-full max-w-xs flex-col items-center gap-5 pt-6"
              >
                <Link
                  href="/contacto"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-[3px] px-8 py-3.5 text-[15px] font-medium text-nodo-white"
                  style={{ background: "var(--nodo-gradient-full)" }}
                >
                  {t.nav.cta}
                </Link>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
