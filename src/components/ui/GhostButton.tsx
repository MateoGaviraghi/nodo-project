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
  const baseClasses = `group relative inline-flex items-center justify-center rounded-[3px] border border-white/[0.08] bg-white/[0.02] px-7 py-3 text-[13px] font-medium text-nodo-gray-300 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-nodo-white ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
