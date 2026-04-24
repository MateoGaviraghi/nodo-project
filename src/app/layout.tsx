import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MeshBackground from "@/components/layout/MeshBackground";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ScrollToTop from "@/components/layout/ScrollToTop";
import BackToTopButton from "@/components/layout/BackToTopButton";
import { LanguageProvider } from "@/hooks/useLanguage";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nodo — Transformamos ideas en software",
    template: "%s | Nodo",
  },
  description:
    "Nodo es una software house boutique argentina. Desarrollo a medida, WordPress profesional y automatización con IA. El punto donde tu idea se conecta con el mundo.",
  metadataBase: new URL("https://nodotech.dev"),
  keywords: [
    "nodo",
    "nodotech",
    "software house argentina",
    "desarrollo web",
    "desarrollo de software a medida",
    "apps a medida",
    "wordpress profesional",
    "ecommerce wordpress",
    "inteligencia artificial",
    "automatización con IA",
    "chatbot IA",
    "software house buenos aires",
    "desarrollo mobile",
    "react",
    "next.js",
  ],
  authors: [{ name: "Nodo", url: "https://nodotech.dev" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://nodotech.dev",
    siteName: "Nodo",
    title: "Nodo — Transformamos ideas en software",
    description:
      "Software house boutique argentina. Desarrollo a medida, WordPress profesional y automatización con IA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodo — Transformamos ideas en software",
    description:
      "Software house boutique argentina. Desarrollo a medida, WordPress profesional y automatización con IA.",
  },
  alternates: {
    canonical: "https://nodotech.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `if("scrollRestoration"in history)history.scrollRestoration="manual";window.scrollTo(0,0);` }} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://nodotech.dev/#organization",
                  name: "Nodo",
                  url: "https://nodotech.dev",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://nodotech.dev/logos/logo-n.png",
                  },
                  description:
                    "Software house boutique argentina. Desarrollo a medida, WordPress profesional y automatización con IA.",
                  sameAs: [
                    "https://instagram.com/nodotech.dev",
                    "https://linkedin.com/company/nodotech.dev",
                    "https://github.com/MateoGaviraghi",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: ["Spanish", "English"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://nodotech.dev/#website",
                  url: "https://nodotech.dev",
                  name: "Nodo",
                  publisher: { "@id": "https://nodotech.dev/#organization" },
                  inLanguage: ["es", "en"],
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://nodotech.dev/#service",
                  name: "Nodo",
                  url: "https://nodotech.dev",
                  description: "Transformamos ideas en software.",
                  areaServed: { "@type": "Country", name: "Argentina" },
                  serviceType: [
                    "Desarrollo de software a medida",
                    "WordPress profesional",
                    "Automatización con IA",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-nodo-black text-nodo-white">
        <LanguageProvider>
          <SmoothScrollProvider>
            <ScrollToTop />
            <MeshBackground />
            <Navbar />
            <main className="relative z-1 flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <BackToTopButton />
          </SmoothScrollProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
