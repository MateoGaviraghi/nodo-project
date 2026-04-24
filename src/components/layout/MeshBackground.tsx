"use client";

/**
 * MeshBackground — Full-screen looping video background.
 * - preload="metadata" so the 7MB video doesn't block LCP; browser only
 *   fetches byte-range headers upfront and streams the rest in parallel.
 * - fetchPriority="low" hints this is decoration, not critical content.
 * - The body bg (#0a0a0a) shows while the video buffers — matches brand.
 */
export default function MeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        // @ts-expect-error — fetchPriority is valid HTML but typed narrowly in React
        fetchPriority="low"
        className="h-full w-full object-cover"
        style={{ opacity: 0.55, willChange: "transform" }}
      >
        <source src="/videos/nodo-bg-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
