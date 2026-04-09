"use client";

import { useRef, useEffect } from "react";
import NosotrosHero from "@/components/nosotros/NosotrosHero";
import PhilosophySection from "@/components/nosotros/PhilosophySection";
import ValuesSection from "@/components/nosotros/ValuesSection";
import TimelineSection from "@/components/nosotros/TimelineSection";
import TeamCard from "@/components/nosotros/TeamCard";
import TechStackSection from "@/components/nosotros/TechStackSection";
import ClientsSection from "@/components/nosotros/ClientsSection";
import CtaSection from "@/components/nosotros/CtaSection";

export default function NosotrosContent() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <NosotrosHero />
      <PhilosophySection />
      <ValuesSection />
      <TimelineSection />
      <TeamCard />
      <TechStackSection />
      <ClientsSection />
      <CtaSection />
    </>
  );
}
