import { cn } from "@/lib/utils";

/**
 * Subtle geometric grid texture with a radial fade mask — adds a "technical"
 * surface without the organic feel of GradientMesh. Zero-dependency CSS.
 *
 * Place inside a `relative overflow-hidden` parent.
 */
export default function GridPattern({
  className,
  size = 38,
  line = "rgba(255,255,255,0.045)",
  fade = "ellipse at center, #000 0%, transparent 72%",
}: {
  className?: string;
  size?: number;
  line?: string;
  fade?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        WebkitMaskImage: `radial-gradient(${fade})`,
        maskImage: `radial-gradient(${fade})`,
      }}
    />
  );
}
