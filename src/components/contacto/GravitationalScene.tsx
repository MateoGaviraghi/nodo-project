"use client";

import { useRef, useMemo, useEffect, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════
   PARTICLE SWARM — Fibonacci sphere, collapse & explode
   ═══════════════════════════════════════════════════════ */
function ParticleSwarm({
  scrollProgress,
  count = 900,
}: {
  scrollProgress: MutableRefObject<number>;
  count?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { geo, basePositions } = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const golden = Math.PI * (1 + Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = golden * i;
      const r = 2.0 + Math.random() * 2.4;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
      base[i * 3]     = arr[i * 3];
      base[i * 3 + 1] = arr[i * 3 + 1];
      base[i * 3 + 2] = arr[i * 3 + 2];
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr.slice(), 3));
    return { geo: g, basePositions: base };
  }, [count]);

  const explodeDirs = useMemo(() => {
    const d = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 5 + Math.random() * 11;
      d[i * 3]     = speed * Math.sin(phi) * Math.cos(theta);
      d[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
      d[i * 3 + 2] = speed * Math.cos(phi);
    }
    return d;
  }, [count]);

  useFrame((state) => {
    const p = scrollProgress.current;
    const time = state.clock.elapsedTime;
    if (!pointsRef.current || !matRef.current) return;

    const posAttr = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;

    if (p < 0.52) {
      /* ── Phase 0: ambient orbit ── */
      pointsRef.current.rotation.y = time * 0.065;
      pointsRef.current.rotation.x = Math.sin(time * 0.038) * 0.22;
      matRef.current.opacity = 0.5 + Math.sin(time * 1.3) * 0.1;
      matRef.current.size = 0.026;
      for (let i = 0; i < count; i++) {
        posAttr.setXYZ(
          i,
          basePositions[i * 3],
          basePositions[i * 3 + 1],
          basePositions[i * 3 + 2]
        );
      }
    } else if (p < 0.88) {
      /* ── Phase 1: collapse ── */
      const raw = (p - 0.52) / 0.36;
      const t = raw * raw * (3 - 2 * raw); // smoothstep
      for (let i = 0; i < count; i++) {
        posAttr.setXYZ(
          i,
          basePositions[i * 3]     * (1 - t),
          basePositions[i * 3 + 1] * (1 - t),
          basePositions[i * 3 + 2] * (1 - t)
        );
      }
      matRef.current.opacity = 0.55 + t * 0.35;
      matRef.current.size = 0.026 + t * 0.018;
    } else {
      /* ── Phase 2: explosion ── */
      const t = Math.min((p - 0.88) / 0.12, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      for (let i = 0; i < count; i++) {
        posAttr.setXYZ(
          i,
          explodeDirs[i * 3]     * eased,
          explodeDirs[i * 3 + 1] * eased,
          explodeDirs[i * 3 + 2] * eased
        );
      }
      matRef.current.opacity = Math.max(0, 0.9 - t * 0.85);
      matRef.current.size = 0.044;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        ref={matRef}
        color="#00c1f4"
        size={0.026}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════
   GRAVITY CORE — TorusKnot with collapse + glow burst
   ═══════════════════════════════════════════════════════ */
function GravityCore({
  scrollProgress,
  mousePos,
}: {
  scrollProgress: MutableRefObject<number>;
  mousePos: MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const meshRef   = useRef<THREE.Mesh>(null);
  const matRef    = useRef<THREE.MeshStandardMaterial>(null);
  const glowRef   = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const p    = scrollProgress.current;
    const time = state.clock.elapsedTime;
    if (!groupRef.current || !meshRef.current) return;

    /* base rotation */
    groupRef.current.rotation.x += delta * 0.1;
    groupRef.current.rotation.y += delta * 0.155;

    /* mouse parallax — smooth lerp */
    groupRef.current.rotation.x +=
      (mousePos.current.y * 0.32 - groupRef.current.rotation.x) * 0.035;
    groupRef.current.rotation.y +=
      (mousePos.current.x * 0.32 - groupRef.current.rotation.y) * 0.035;

    /* scale → collapse */
    let targetScale: number;
    if (p < 0.52) {
      targetScale = 1.0;
    } else if (p < 0.88) {
      const raw   = (p - 0.52) / 0.36;
      const eased = raw * raw * (3 - 2 * raw);
      targetScale = 1 - eased;
    } else {
      targetScale = 0;
    }
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.11)
    );

    /* emissive pulse */
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.32 + Math.sin(time * 2.1) * 0.14;
    }

    /* glow sphere expands during collapse, fades on explode */
    if (glowRef.current) {
      const gm = glowRef.current.material as THREE.MeshBasicMaterial;
      let opacity: number;
      let glowScale: number;
      if (p < 0.52) {
        opacity    = 0.04;
        glowScale  = 1.2;
      } else if (p < 0.88) {
        const t   = (p - 0.52) / 0.36;
        opacity   = 0.04 + t * 0.18;
        glowScale = 1.2 + t * 3.5;
      } else {
        const t   = (p - 0.88) / 0.12;
        opacity   = Math.max(0, 0.22 - t * 0.22);
        glowScale = 4.7 - t * 2;
      }
      gm.opacity = opacity;
      glowRef.current.scale.setScalar(
        THREE.MathUtils.lerp(glowRef.current.scale.x, Math.max(0.1, glowScale), 0.07)
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* back-side glow sphere — expands on collapse */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial
          color="#5863f2"
          transparent
          opacity={0.04}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* main torus knot */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.92, 0.25, 200, 24, 3, 5]} />
        <meshStandardMaterial
          ref={matRef}
          color="#2785fe"
          emissive="#8b2fef"
          emissiveIntensity={0.38}
          metalness={0.82}
          roughness={0.13}
        />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   ORBIT RINGS — 3 thin tori at different angles
   ═══════════════════════════════════════════════════════ */
function OrbitRings({
  scrollProgress,
}: {
  scrollProgress: MutableRefObject<number>;
}) {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const p = scrollProgress.current;
    if (r1.current) r1.current.rotation.z += delta * 0.42;
    if (r2.current) r2.current.rotation.x += delta * 0.28;
    if (r3.current) r3.current.rotation.y += delta * 0.35;

    const fade = p < 0.52 ? 1.0 : Math.max(0, 1 - (p - 0.52) / 0.36);
    if (r1.current)
      (r1.current.material as THREE.MeshBasicMaterial).opacity = 0.14 * fade;
    if (r2.current)
      (r2.current.material as THREE.MeshBasicMaterial).opacity = 0.09 * fade;
    if (r3.current)
      (r3.current.material as THREE.MeshBasicMaterial).opacity = 0.06 * fade;
  });

  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.82, 0.007, 8, 140]} />
        <meshBasicMaterial
          color="#2785fe"
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={r2} rotation={[0.75, 0.38, 0]}>
        <torusGeometry args={[2.2, 0.005, 8, 140]} />
        <meshBasicMaterial
          color="#00c1f4"
          transparent
          opacity={0.09}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={r3} rotation={[0.28, 1.1, 0.55]}>
        <torusGeometry args={[1.58, 0.004, 8, 140]} />
        <meshBasicMaterial
          color="#8b2fef"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   DYNAMIC LIGHTS
   ═══════════════════════════════════════════════════════ */
function DynamicLights() {
  const l1 = useRef<THREE.PointLight>(null);
  const l2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (l1.current) l1.current.intensity = 1.6 + Math.sin(t * 1.8) * 0.5;
    if (l2.current) l2.current.intensity = 1.1 + Math.sin(t * 2.4 + 1.3) * 0.35;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight
        ref={l1}
        position={[3, 2.5, 3]}
        color="#2785fe"
        intensity={1.6}
        distance={16}
      />
      <pointLight
        ref={l2}
        position={[-3, -2, -2.5]}
        color="#8b2fef"
        intensity={1.1}
        distance={16}
      />
      <pointLight position={[0, 1, 5]} color="#00c1f4" intensity={0.75} distance={12} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   INNER SCENE
   ═══════════════════════════════════════════════════════ */
function GravScene({
  scrollProgress,
  mousePos,
}: {
  scrollProgress: MutableRefObject<number>;
  mousePos: MutableRefObject<{ x: number; y: number }>;
}) {
  const { viewport } = useThree();
  const scale = Math.min(1.0, Math.max(0.52, viewport.width / 9.5));

  return (
    <group scale={scale}>
      <DynamicLights />
      <GravityCore scrollProgress={scrollProgress} mousePos={mousePos} />
      <OrbitRings scrollProgress={scrollProgress} />
      <ParticleSwarm scrollProgress={scrollProgress} count={900} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   CANVAS EXPORT
   ═══════════════════════════════════════════════════════ */
export default function GravitationalScene({
  scrollProgress,
  mousePos,
}: {
  scrollProgress: MutableRefObject<number>;
  mousePos: MutableRefObject<{ x: number; y: number }>;
}) {
  useEffect(() => {
    const orig = console.warn;
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
      orig.apply(console, args);
    };
    return () => {
      console.warn = orig;
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <GravScene scrollProgress={scrollProgress} mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
