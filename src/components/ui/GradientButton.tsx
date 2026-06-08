"use client";

import Link from "next/link";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
  /** Cursor-attracted magnetic pull (use on hero / primary CTAs). */
  magnetic?: boolean;
}

export default function GradientButton({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  fullWidth = false,
  disabled = false,
  magnetic = false,
}: GradientButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticEffect({
    strength: 0.35,
  });

  const baseClasses = `group relative inline-flex items-center justify-center overflow-hidden rounded-[3px] px-7 py-3 text-[13px] font-medium tracking-wide text-nodo-white transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.025] hover:shadow-[0_8px_30px_-6px_rgba(39,133,254,0.45),0_0_40px_-8px_rgba(0,193,244,0.35)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nodo-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nodo-black disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  const inner = (
    <>
      {/* Gradient bg */}
      <span className="absolute inset-0 bg-gradient-to-r from-nodo-purple via-nodo-indigo via-60% to-nodo-blue transition-opacity duration-300 group-hover:opacity-90" />
      {/* Diagonal sheen sweep on hover (120deg = premium) */}
      <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[120%]" />
      {/* Top highlight edge */}
      <span className="absolute inset-x-0 top-0 h-px bg-white/[0.18]" />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={magnetic ? (ref as React.Ref<HTMLAnchorElement>) : undefined}
        onMouseMove={magnetic ? handleMouseMove : undefined}
        onMouseLeave={magnetic ? handleMouseLeave : undefined}
        className={baseClasses}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={magnetic ? (ref as React.Ref<HTMLButtonElement>) : undefined}
      onClick={onClick}
      type={type}
      disabled={disabled}
      onMouseMove={magnetic ? handleMouseMove : undefined}
      onMouseLeave={magnetic ? handleMouseLeave : undefined}
      className={baseClasses}
    >
      {inner}
    </button>
  );
}
