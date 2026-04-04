"use client";

import { useState } from "react";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export default function FlipCard({
  front,
  back,
  className = "",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`group cursor-pointer perspective-[1000px] ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className={`relative h-full w-full transition-transform duration-600 ease-in-out transform-3d ${
          isFlipped ? "transform-[rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">{front}</div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
