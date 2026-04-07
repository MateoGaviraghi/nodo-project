"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Disable browser's automatic scroll restoration on reload
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      if (pathname === "/") {
        window.location.href = "/";
        return;
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
