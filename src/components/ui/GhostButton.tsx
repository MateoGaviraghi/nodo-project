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
  const baseClasses = `group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-[3px] border border-white/[0.08] bg-white/[0.02] px-7 py-3 text-[13px] font-medium text-nodo-gray-300 transition-[transform,box-shadow,border-color,color] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-nodo-indigo/40 hover:text-nodo-white hover:shadow-[0_0_20px_rgba(88,99,242,0.12)] hover:scale-[1.025] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nodo-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-nodo-black ${className}`;

  const inner = (
    <>
      {/* Gradient border glow on hover */}
      <span className="absolute inset-0 rounded-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(135deg, rgba(139,47,239,0.06), rgba(0,193,244,0.06))" }} />
      <span className="relative flex items-center gap-2">{children}</span>
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
