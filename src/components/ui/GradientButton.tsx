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
  const baseClasses = `gradient-btn inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-nodo-white transition-all duration-300 hover:opacity-90 hover:shadow-[0_4px_30px_rgba(39,133,254,0.25)] ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={baseClasses}>
      {children}
    </button>
  );
}
