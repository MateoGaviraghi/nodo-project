"use client";

import Link from "next/link";

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

export default function GradientButton({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  fullWidth = false,
}: GradientButtonProps) {
  const baseClasses = `group relative inline-flex items-center justify-center overflow-hidden rounded-[3px] px-7 py-3 text-[13px] font-medium tracking-wide text-nodo-white transition-all duration-300 hover:shadow-[0_0_28px_rgba(39,133,254,0.25)] hover:scale-[1.03] active:scale-[0.98] ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  const inner = (
    <>
      {/* Gradient bg */}
      <span className="absolute inset-0 bg-gradient-to-r from-nodo-purple via-nodo-indigo via-60% to-nodo-blue transition-opacity duration-300 group-hover:opacity-90" />
      {/* Shine sweep on hover */}
      <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
      {/* Top highlight edge */}
      <span className="absolute inset-x-0 top-0 h-px bg-white/[0.12]" />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={baseClasses}>
      {inner}
    </button>
  );
}
