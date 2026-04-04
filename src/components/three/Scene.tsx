"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

export default function Scene({ children, className = "" }: SceneProps) {
  // Suppress THREE.Clock deprecation from @react-three/fiber internals
  useEffect(() => {
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("THREE.Clock"))
        return;
      origWarn.apply(console, args);
    };
    return () => {
      console.warn = origWarn;
    };
  }, []);

  return (
    <Canvas
      className={className}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ pointerEvents: "none", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
