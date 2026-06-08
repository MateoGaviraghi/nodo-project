import { cn } from "@/lib/utils";

/**
 * A light "comet" that travels around the element's border (cult-ui / magicui
 * style), rethemed to Nodo. Zero-dependency: a conic-gradient ring masked to
 * the border, rotated via the global `--border-angle` @property + `rotate-border`
 * keyframe. Respects prefers-reduced-motion (global rule freezes the animation).
 *
 * Usage: place inside a `relative overflow-hidden rounded-[…]` parent.
 */
export default function BorderBeam({
  className,
  duration = 8,
  borderWidth = 1,
}: {
  className?: string;
  duration?: number;
  borderWidth?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={{
        padding: borderWidth,
        background:
          "conic-gradient(from var(--border-angle), rgba(0,0,0,0) 0%, var(--nodo-cyan) 6%, var(--nodo-purple) 12%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 100%)",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        maskComposite: "exclude",
        animation: `rotate-border ${duration}s linear infinite`,
      }}
    />
  );
}
