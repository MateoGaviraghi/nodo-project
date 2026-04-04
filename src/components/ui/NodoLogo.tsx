"use client";

import { useId } from "react";

interface NodoLogoProps {
  size?: number;
  className?: string;
}

export default function NodoLogo({ size = 28, className = "" }: NodoLogoProps) {
  const uid = useId();
  const gradId = `nodo-grad-${uid}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#8b2fef" />
          <stop offset="35%" stopColor="#5863f2" />
          <stop offset="65%" stopColor="#2785fe" />
          <stop offset="100%" stopColor="#00c1f4" />
        </linearGradient>
      </defs>
      {/* N mark — angular zigzag matching the real logo-n.png */}
      <path
        d="M10 80 L35 18 L44 18 L52 42 L60 18 L69 18 L94 80 L83 80 L63 28 L52 55 L41 28 L21 80 Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}
