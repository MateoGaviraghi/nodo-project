"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/hooks/useSmoothScroll";

export default function ScrollToTop() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      // Reset Lenis scroll position — this is the key fix.
      // window.scrollTo alone doesn't work because Lenis controls the scroll.
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }

      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
