"use client";

import { motion } from "framer-motion";

/**
 * Route-change transition. App Router remounts template.tsx on every
 * navigation, so this fades the page content in — softening the hard cut
 * between routes.
 *
 * IMPORTANT: opacity ONLY. A transform here would become a containing block
 * for the page's `position: sticky`/`fixed` descendants (the 3D carousel and
 * the case-study gallery) and break their pinning.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
