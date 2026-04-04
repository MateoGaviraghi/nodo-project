"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

interface LogoModelProps {
  scrollProgress: number;
}

export default function LogoModel({ scrollProgress }: LogoModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useVideoTexture("/videos/video-logo-N-sin-fondo.mp4", {
    loop: true,
    muted: true,
    start: true,
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // phase: 0 at top, 1 at 33% scroll (matches HeroSection timing)
    const phase = Math.min(scrollProgress / 0.33, 1);

    const time = state.clock.elapsedTime;

    // ── Idle floating (always active, dampens during scroll) ──
    const floatAmount = 1 - phase * 0.5; // reduce float as layout settles
    const floatY = Math.sin(time * 0.8) * 0.1 * floatAmount;
    const floatX = Math.sin(time * 0.5) * 0.03 * floatAmount;

    // ── Idle rotation (always, slower when settled) ──
    const idleSpeed = 0.15 * (1 - phase * 0.6);
    meshRef.current.rotation.y += delta * idleSpeed;

    // ── Scale: big (1.0) → smaller (0.7) on scroll ──
    const targetScale = THREE.MathUtils.lerp(1.0, 0.7, phase);
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08),
    );

    // ── Position: center → slightly right and up ──
    // The parent container translateX handles the big shift,
    // this handles fine-tuning within the 3D scene
    const targetY = floatY;
    const targetX = floatX;

    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.08,
    );
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.08,
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3.2, 3.2]} />
      <meshBasicMaterial
        map={texture}
        transparent
        toneMapped={false}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
