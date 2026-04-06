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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          heroComplete
            ? isScrolled
              ? "glass border-b border-white/6"
              : "bg-transparent"
            : "pointer-events-none"
        }`}
        style={{ opacity: heroComplete ? 1 : 0 }}
      >
        <div className="mx-auto w-full px-8 lg:px-16">
          <div className="flex h-16 items-center md:h-20">
            {/* Logo — solo isotipo, pegado a la izquierda */}
            <Link
              href="/"
              className="mr-auto flex shrink-0 items-center"
              onClick={(e) => {
                setIsMobileOpen(false);
                // If on home page, scroll to hero text (past the video)
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  const hero = document.querySelector("[data-hero]");
                  if (hero) {
                    const heroHeight = hero.getBoundingClientRect().height;
                    // Scroll to ~75% of hero (where text appears)
                    window.scrollTo({ top: heroHeight * 0.75, behavior: "smooth" });
                  }
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
                    {/* Animated gradient underline */}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-nodo-purple via-nodo-indigo to-nodo-cyan transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side — idiomas + CTA, pegados a la derecha */}
            <div className="ml-auto hidden items-center gap-4 md:flex">
              {/* Language toggle */}
              <div className="flex items-center rounded-[2px] border border-white/[0.08]">
                <button
                  onClick={() => setLanguage("es")}
                  className={`px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                    language === "es"
                      ? "bg-white/[0.08] text-nodo-white"
                      : "text-nodo-gray-400 hover:text-nodo-gray-300"
                  }`}
                  aria-label="Cambiar a Español"
                >
                  ES
                </button>
                <div className="h-3.5 w-px bg-white/[0.06]" />
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                    language === "en"
                      ? "bg-white/[0.08] text-nodo-white"
                      : "text-nodo-gray-400 hover:text-nodo-gray-300"
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
              </div>

              {/* CTA */}
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-[3px] px-5 py-2 text-[13px] font-medium text-nodo-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(39,133,254,0.15)]"
                style={{ background: "var(--nodo-gradient-full)" }}
              >
                {t.nav.cta}
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex items-center justify-center md:hidden"
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
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-nodo-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-2xl font-medium text-nodo-white transition-colors hover:text-nodo-cyan"
                  >
                    {navTranslations[item.label] || item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="flex flex-col items-center gap-5 pt-4"
              >
                <Link
                  href="/contacto"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex items-center rounded-[3px] px-8 py-3 text-base font-medium text-nodo-white"
                  style={{ background: "var(--nodo-gradient-full)" }}
                >
                  {t.nav.cta}
                </Link>

                <div className="flex items-center rounded-[2px] border border-white/[0.08]">
                  <button
                    onClick={() => setLanguage("es")}
                    className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                      language === "es"
                        ? "bg-white/[0.08] text-nodo-white"
                        : "text-nodo-gray-400"
                    }`}
                  >
                    ES
                  </button>
                  <div className="h-4 w-px bg-white/[0.06]" />
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                      language === "en"
                        ? "bg-white/[0.08] text-nodo-white"
                        : "text-nodo-gray-400"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
