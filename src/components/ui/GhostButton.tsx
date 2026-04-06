"use client";

import Link from "next/link";

interface GhostButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GhostButton({
  children,
  href,
  onClick,
  className = "",
}: GhostButtonProps) {
  const baseClasses = `group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-[3px] border border-white/[0.08] bg-white/[0.02] px-7 py-3 text-[13px] font-medium text-nodo-gray-300 transition-all duration-300 hover:border-nodo-indigo/40 hover:text-nodo-white hover:shadow-[0_0_20px_rgba(88,99,242,0.12)] hover:scale-[1.03] active:scale-[0.98] ${className}`;

  const inner = (
    <>
      {/* Gradient border glow on hover */}
      <span className="absolute inset-0 rounded-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(135deg, rgba(139,47,239,0.06), rgba(0,193,244,0.06))" }} />
      <span className="relative">{children}</span>
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
    <button onClick={onClick} className={baseClasses}>
      {inner}
    </button>
  );
}
