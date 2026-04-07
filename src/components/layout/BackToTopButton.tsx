"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/hooks/useSmoothScroll";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-50 flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/[0.06] bg-nodo-gray-900/90 text-nodo-gray-400 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:border-nodo-indigo/30 hover:text-nodo-white hover:shadow-[0_0_20px_rgba(88,99,242,0.12)]"
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
