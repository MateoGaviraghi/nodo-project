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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change or resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setIsMobileOpen(false)}
            >
              <Image
                src="/logos/logo-n.png"
                alt="Nodo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-medium tracking-tight text-nodo-white">
                Nodo
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 md:flex">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-nodo-gray-300 transition-colors duration-200 hover:text-nodo-white"
                >
                  {navTranslations[item.label] || item.label}
                </Link>
              ))}

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="rounded-md px-2 py-1 text-xs font-medium text-nodo-gray-400 transition-colors duration-200 hover:text-nodo-white"
                aria-label={`Switch to ${language === "es" ? "English" : "Español"}`}
              >
                {language === "es" ? "EN" : "ES"}
              </button>

              {/* CTA */}
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-nodo-white transition-all duration-300"
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
                className="flex flex-col items-center gap-4 pt-4"
              >
                <Link
                  href="/contacto"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex items-center rounded-lg px-8 py-3 text-base font-medium text-nodo-white"
                  style={{ background: "var(--nodo-gradient-full)" }}
                >
                  {t.nav.cta}
                </Link>

                <button
                  onClick={toggleLanguage}
                  className="text-sm text-nodo-gray-400 transition-colors hover:text-nodo-white"
                >
                  {language === "es"
                    ? "Switch to English"
                    : "Cambiar a Español"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
