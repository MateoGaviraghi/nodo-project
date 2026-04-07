"use client";

import { useRef, useEffect } from "react";

/**
 * MeshBackground — Full-screen looping video background.
 * Autoplay, muted, loop. Seamless restart to avoid pause between loops.
 */
export default function MeshBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Seamless loop: restart slightly before end to avoid flash/pause
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-60"
      >
        <source src="/videos/nodo-bg-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
