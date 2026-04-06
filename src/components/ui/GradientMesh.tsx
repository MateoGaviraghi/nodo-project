"use client";

/**
 * GradientMesh — Animated gradient orbs + glowing floating particles.
 * Pure CSS animations, no JS overhead. For CTA section background.
 */
export default function GradientMesh() {
  const particles = [
    { size: 5, color: "#5863f2", x: 10, y: 15, dur: 4.5, delay: 0 },
    { size: 4, color: "#2785fe", x: 25, y: 70, dur: 5.2, delay: 0.8 },
    { size: 6, color: "#00c1f4", x: 45, y: 25, dur: 4.0, delay: 0.3 },
    { size: 4, color: "#8b2fef", x: 60, y: 65, dur: 5.8, delay: 1.2 },
    { size: 5, color: "#5863f2", x: 78, y: 20, dur: 4.3, delay: 0.6 },
    { size: 6, color: "#2785fe", x: 88, y: 55, dur: 5.0, delay: 0.4 },
    { size: 4, color: "#00c1f4", x: 35, y: 80, dur: 4.8, delay: 1.0 },
    { size: 5, color: "#8b2fef", x: 55, y: 45, dur: 5.5, delay: 0.2 },
    { size: 3, color: "#5863f2", x: 15, y: 50, dur: 4.2, delay: 1.5 },
    { size: 4, color: "#00c1f4", x: 70, y: 80, dur: 5.3, delay: 0.7 },
    { size: 5, color: "#2785fe", x: 92, y: 35, dur: 4.6, delay: 1.1 },
    { size: 3, color: "#8b2fef", x: 5, y: 85, dur: 5.1, delay: 0.9 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gradient orbs */}
      <div
        className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(88,99,242,0.12), transparent 60%)",
          filter: "blur(80px)",
          animation: "mesh-cta-1 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(39,133,254,0.10), transparent 60%)",
          filter: "blur(80px)",
          animation: "mesh-cta-2 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(139,47,239,0.08), transparent 60%)",
          filter: "blur(80px)",
          animation: "mesh-cta-3 25s ease-in-out infinite",
        }}
      />

      {/* Glowing floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}40`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.9,
            animation: `float-particle ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
