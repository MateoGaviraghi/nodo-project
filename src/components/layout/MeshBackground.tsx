"use client";

/**
 * MeshBackground — Full-screen looping video background.
 * GPU-accelerated, no JS overhead. The <video> element handles loop natively.
 */
export default function MeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        style={{ opacity: 0.55, willChange: "transform" }}
      >
        <source src="/videos/nodo-bg-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
