import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

/**
 * Nodo type system (Cool-Technical × Editorial).
 * - Display: Syne — distinctive variable grotesque, widens at heavy weights.
 * - Body: Plus Jakarta Sans — quiet humanist sans, invisible at reading sizes.
 * - Mono: JetBrains Mono — technical labels, section indices, tabular stats.
 * All OFL / Google-delivered (no binary self-hosting), variable, license-safe.
 */

export const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
