import { cn } from "@/lib/utils";

/**
 * A soft directional light cone that fades in once (Aceternity-style),
 * rethemed to Nodo. Zero-dependency: a rotated, blurred radial blob using the
 * existing `fade-in` keyframe. Place inside a `relative overflow-hidden` parent.
 */
export default function Spotlight({
  className,
  fill = "rgba(88, 99, 242, 0.26)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-1/4 left-[-10%] h-[140%] w-[60%] -rotate-[22deg] opacity-0 blur-[90px] [animation:fade-in_1.8s_ease_0.4s_forwards]",
        className,
      )}
      style={{ background: `radial-gradient(45% 50% at 50% 0%, ${fill}, transparent 72%)` }}
    />
  );
}
