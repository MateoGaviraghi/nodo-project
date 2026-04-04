import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MeshBackground from "@/components/layout/MeshBackground";
// import CustomCursor from "@/components/layout/CustomCursor";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import { LanguageProvider } from "@/hooks/useLanguage";

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
  metadataBase: new URL("https://nodo.com.ar"),
  keywords: [
    "software house",
    "desarrollo web",
    "argentina",
    "software a medida",
    "wordpress",
    "inteligencia artificial",
    "automatización",
    "nodo",
  ],
  authors: [{ name: "Nodo", url: "https://nodo.com.ar" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://nodo.com.ar",
    siteName: "Nodo",
    title: "Nodo — Transformamos ideas en software",
    description:
      "Software house boutique argentina. Desarrollo a medida. WordPress. IA.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nodo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodo — Transformamos ideas en software",
    description:
      "Software house boutique argentina. Desarrollo a medida. WordPress. IA.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://nodo.com.ar",
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
      <body className="min-h-full bg-nodo-black text-nodo-white">
        <LanguageProvider>
          <SmoothScrollProvider>
            <MeshBackground />
            <Navbar />
            <main className="relative z-1 flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
