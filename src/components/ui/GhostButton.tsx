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
  const baseClasses = `inline-flex items-center justify-center rounded-lg border border-white/[0.12] px-6 py-3 text-sm font-medium text-nodo-gray-300 transition-all duration-300 hover:border-nodo-blue/40 hover:text-nodo-white hover:bg-white/[0.03] ${className}`;

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
