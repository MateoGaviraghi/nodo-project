"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Billboard } from "@react-three/drei";
import * as THREE from "three";

const TECH_STACK = [
  // Frontend
  { name: "React", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Vue.js", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
  { name: "Svelte", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" },
  { name: "Three.js", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg" },
  { name: "Framer", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" },
  // Backend
  { name: "Node.js", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "NestJS", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" },
  { name: "Python", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "FastAPI", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "GraphQL", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  // Databases
  { name: "PostgreSQL", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Redis", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "Prisma", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
  { name: "Supabase", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  // AI & ML
  { name: "OpenAI", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg" },
  { name: "PyTorch", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "TensorFlow", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  // DevOps & Cloud
  { name: "Docker", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "AWS", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Vercel", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "GitHub", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Git", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Kubernetes", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" },
  // CMS & Tools
  { name: "WordPress", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg" },
  { name: "Figma", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "VSCode", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Stripe", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg" },
  { name: "Firebase", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  // Mobile & Extra
  { name: "React Native", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Flutter", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "Rust", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" },
  { name: "Go", svg: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
];

const SPHERE_RADIUS = 2.2;
const NEIGHBOR_DISTANCE = 2.0;
const CENTER_GAP = 0.8;
const EXTRA_DOTS = 0;

const COLORS = {
  cyan: new THREE.Color("#00c1f4"),
  blue: new THREE.Color("#2785fe"),
  indigo: new THREE.Color("#5863f2"),
  purple: new THREE.Color("#8b2fef"),
};
const colorArr = [COLORS.purple, COLORS.indigo, COLORS.blue, COLORS.cyan];

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const golden = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / golden;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    points.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ),
    );
  }
  return points;
}

function getNeighbors(nodes: THREE.Vector3[], maxDist: number): [number, number][] {
  const conns: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < maxDist) {
        conns.push([i, j]);
      }
    }
  }
  return conns;
}

/** Load SVG from URL → render to canvas → return as THREE.CanvasTexture */
function useSvgTexture(url: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const size = 128;

    fetch(url)
      .then((r) => r.text())
      .then((svgText) => {
        if (cancelled) return;
        const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
        const blobUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          if (cancelled) return;
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, size, size);
          URL.revokeObjectURL(blobUrl);
          const tex = new THREE.CanvasTexture(canvas);
          tex.needsUpdate = true;
          setTexture(tex);
        };
        img.crossOrigin = "anonymous";
        img.src = blobUrl;
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [url]);

  return texture;
}

// ─── Icon Node (real SVG logo) ───

function IconNode({ position, svgUrl, index }: { position: THREE.Vector3; svgUrl: string; index: number }) {
  const texture = useSvgTexture(svgUrl);
  const ref = useRef<THREE.Group>(null);
  const t = useRef(Math.random() * 100);

  useFrame((_, dt) => {
    t.current += dt;
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(t.current + index * 0.8) * 0.06);
    }
  });

  // Show a dot while loading
  if (!texture) {
    return (
      <mesh position={position}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={colorArr[index % 4]} transparent opacity={0.6} />
      </mesh>
    );
  }

  return (
    <group ref={ref} position={position}>
      <Billboard>
        <mesh renderOrder={2}>
          <planeGeometry args={[0.35, 0.35]} />
          <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      </Billboard>
    </group>
  );
}

// ─── Center Logo (PNG — loads fine) ───

function CenterLogo() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useEffect(() => {
    new THREE.TextureLoader().load("/logos/logo-n.png", setTexture);
  }, []);

  useFrame((_, dt) => {
    t.current += dt;
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(t.current * 0.8) * 0.04);
    }
  });

  if (!texture) {
    return (
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#5863f2" transparent opacity={0.4} />
      </mesh>
    );
  }

  return (
    <Billboard>
      <mesh ref={ref} renderOrder={5}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>
    </Billboard>
  );
}

// ─── Sphere surface dots (gives it volume) ───

function SphereDots({ positions }: { positions: THREE.Vector3[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const t = useRef(0);

  useFrame((_, dt) => {
    t.current += dt;
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < positions.length; i++) {
      dummy.position.copy(positions[i]);
      dummy.scale.setScalar(0.7 + Math.sin(t.current * 0.7 + i * 1.3) * 0.3);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]} renderOrder={0}>
      <sphereGeometry args={[0.022, 6, 6]} />
      <meshBasicMaterial color="#5863f2" transparent opacity={0.35} />
    </instancedMesh>
  );
}

// ─── Wireframe shell ───

function WireframeSphere() {
  return (
    <mesh renderOrder={-1}>
      <sphereGeometry args={[SPHERE_RADIUS + 0.05, 32, 32]} />
      <meshBasicMaterial color="#5863f2" wireframe transparent opacity={0.035} depthWrite={false} />
    </mesh>
  );
}

// ─── Connection Lines ───

function ConnectionLines({
  allNodes,
  techCount,
  neighbors,
}: {
  allNodes: THREE.Vector3[];
  techCount: number;
  neighbors: [number, number][];
}) {
  const centerRef = useRef<THREE.LineSegments>(null);
  const neighborRef = useRef<THREE.LineSegments>(null);
  const dotLineRef = useRef<THREE.LineSegments>(null);
  const t = useRef(0);

  const centerGeom = useMemo(() => {
    const pos = new Float32Array(techCount * 6);
    const col = new Float32Array(techCount * 6);
    for (let i = 0; i < techCount; i++) {
      const node = allNodes[i];
      const dir = node.clone().normalize();
      pos[i * 6] = node.x; pos[i * 6 + 1] = node.y; pos[i * 6 + 2] = node.z;
      pos[i * 6 + 3] = dir.x * CENTER_GAP; pos[i * 6 + 4] = dir.y * CENTER_GAP; pos[i * 6 + 5] = dir.z * CENTER_GAP;
      const c = colorArr[i % colorArr.length];
      col[i * 6] = c.r; col[i * 6 + 1] = c.g; col[i * 6 + 2] = c.b;
      col[i * 6 + 3] = COLORS.indigo.r; col[i * 6 + 4] = COLORS.indigo.g; col[i * 6 + 5] = COLORS.indigo.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [allNodes, techCount]);

  const neighborGeom = useMemo(() => {
    const filtered = neighbors.filter(([a, b]) => a < techCount && b < techCount);
    const pos = new Float32Array(filtered.length * 6);
    const col = new Float32Array(filtered.length * 6);
    filtered.forEach(([a, b], i) => {
      pos[i * 6] = allNodes[a].x; pos[i * 6 + 1] = allNodes[a].y; pos[i * 6 + 2] = allNodes[a].z;
      pos[i * 6 + 3] = allNodes[b].x; pos[i * 6 + 4] = allNodes[b].y; pos[i * 6 + 5] = allNodes[b].z;
      const cA = colorArr[a % colorArr.length]; const cB = colorArr[b % colorArr.length];
      col[i * 6] = cA.r; col[i * 6 + 1] = cA.g; col[i * 6 + 2] = cA.b;
      col[i * 6 + 3] = cB.r; col[i * 6 + 4] = cB.g; col[i * 6 + 5] = cB.b;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [allNodes, techCount, neighbors]);

  const dotLineGeom = useMemo(() => {
    const dotConns = neighbors.filter(([a, b]) => a >= techCount || b >= techCount);
    const pos = new Float32Array(dotConns.length * 6);
    dotConns.forEach(([a, b], i) => {
      pos[i * 6] = allNodes[a].x; pos[i * 6 + 1] = allNodes[a].y; pos[i * 6 + 2] = allNodes[a].z;
      pos[i * 6 + 3] = allNodes[b].x; pos[i * 6 + 4] = allNodes[b].y; pos[i * 6 + 5] = allNodes[b].z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [allNodes, techCount, neighbors]);

  useFrame((_, dt) => {
    t.current += dt;
    const pulse = 0.3 + Math.sin(t.current * 0.5) * 0.06;
    if (centerRef.current) (centerRef.current.material as THREE.LineBasicMaterial).opacity = pulse;
    if (neighborRef.current) (neighborRef.current.material as THREE.LineBasicMaterial).opacity = pulse * 0.65;
    if (dotLineRef.current) (dotLineRef.current.material as THREE.LineBasicMaterial).opacity = pulse * 0.2;
  });

  return (
    <>
      <lineSegments ref={centerRef} geometry={centerGeom} renderOrder={0}>
        <lineBasicMaterial vertexColors transparent opacity={0.3} depthWrite={false} />
      </lineSegments>
      <lineSegments ref={neighborRef} geometry={neighborGeom} renderOrder={0}>
        <lineBasicMaterial vertexColors transparent opacity={0.2} depthWrite={false} />
      </lineSegments>
      <lineSegments ref={dotLineRef} geometry={dotLineGeom} renderOrder={0}>
        <lineBasicMaterial color="#5863f2" transparent opacity={0.07} depthWrite={false} />
      </lineSegments>
    </>
  );
}

// ─── Scene ───

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const scale = Math.min(1, Math.max(0.65, viewport.width / 8));

  const { allNodes, extraPositions, neighbors } = useMemo(() => {
    const totalCount = TECH_STACK.length + EXTRA_DOTS;
    const all = fibonacciSphere(totalCount, SPHERE_RADIUS);
    const extra = all.slice(TECH_STACK.length);
    const nb = getNeighbors(all, NEIGHBOR_DISTANCE);
    return { allNodes: all, extraPositions: extra, neighbors: nb };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.04} floatIntensity={0.1}>
      <group ref={groupRef} scale={scale}>
        <ConnectionLines allNodes={allNodes} techCount={TECH_STACK.length} neighbors={neighbors} />
        <CenterLogo />
        {TECH_STACK.map((tech, i) => (
          <IconNode key={tech.name} position={allNodes[i]} svgUrl={tech.svg} index={i} />
        ))}
      </group>
    </Float>
  );
}

export default function NetworkSphere() {
  // Suppress THREE.Clock deprecation warning from R3F internals
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
      originalWarn.apply(console, args);
    };
    return () => { console.warn = originalWarn; };
  }, []);

  return (
    <div className="h-[400px] w-full sm:h-[700px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.3} minPolarAngle={Math.PI / 4} />
      </Canvas>
    </div>
  );
}
