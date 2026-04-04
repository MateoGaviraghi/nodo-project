"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  visible: boolean;
}

export default function ScrollIndicator({ visible }: ScrollIndicatorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium tracking-widest text-nodo-gray-600 uppercase">
              Scroll
            </span>
            <ChevronDown className="h-5 w-5 text-nodo-gray-600" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
