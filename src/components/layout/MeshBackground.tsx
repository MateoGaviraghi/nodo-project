"use client";

/**
 * MeshBackground — Animated aurora-style gradient orbs.
 * Fixed behind everything, covers entire viewport.
 * Subtle, elegant, barely perceptible but gives the dark bg life.
 */
export default function MeshBackground() {
  return (
    <div className="mesh-bg" aria-hidden="true">
      {/* Purple orb — top-left drift */}
      <div className="mesh-orb mesh-orb--purple" />
      {/* Blue orb — bottom-right drift */}
      <div className="mesh-orb mesh-orb--blue" />
      {/* Cyan orb — center drift */}
      <div className="mesh-orb mesh-orb--cyan" />
      {/* Indigo orb — bottom-left drift */}
      <div className="mesh-orb mesh-orb--indigo" />
    </div>
  );
}
