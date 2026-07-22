import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Torus, Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

/* ─── Mouse tracking group wrapper for interactive parallax ─── */
function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    // Smooth lerp mouse parallax based on pointer coordinates [-1, 1]
    const targetX = state.pointer.x * 0.45;
    const targetY = state.pointer.y * 0.35;
    group.current.rotation.y += (targetX - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-targetY - group.current.rotation.x) * 0.05;
  });

  return <group ref={group}>{children}</group>;
}

/* ─── Floating glass resume document card ─── */
function GlassResumeCard({
  position,
  rotation,
  primaryColor,
  accentColor,
  scale = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  primaryColor: string;
  accentColor: string;
  scale?: number;
}) {
  const cardGroup = useRef<THREE.Group>(null!);

  useFrame((state) => {
    cardGroup.current.rotation.y =
      rotation[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.12;
    cardGroup.current.rotation.x =
      rotation[0] + Math.cos(state.clock.elapsedTime * 0.4 + position[1]) * 0.06;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={position} scale={scale}>
        <group ref={cardGroup} rotation={rotation}>
          {/* Card backdrop body */}
          <mesh>
            <boxGeometry args={[1.2, 1.6, 0.06]} />
            <meshPhysicalMaterial
              color={primaryColor}
              transparent
              opacity={0.7}
              roughness={0.15}
              metalness={0.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
              transmission={0.4}
              thickness={0.5}
            />
          </mesh>

          {/* Header pill / avatar */}
          <mesh position={[-0.35, 0.55, 0.04]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
          </mesh>

          {/* Document header line */}
          <mesh position={[0.1, 0.55, 0.04]}>
            <boxGeometry args={[0.65, 0.04, 0.02]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>

          {/* Content line previews */}
          {[0.35, 0.2, 0.05, -0.1, -0.25, -0.4, -0.55].map((y, i) => (
            <mesh key={i} position={[0, y, 0.04]}>
              <boxGeometry args={[i % 2 === 0 ? 0.9 : 0.7, 0.035, 0.015]} />
              <meshStandardMaterial
                color={i === 2 ? accentColor : "#ffffff"}
                transparent
                opacity={i === 2 ? 0.85 : 0.4}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

/* ─── Floating 3D Match Score Ring ─── */
function MatchScoreRing({
  position,
  color,
  size = 1.2,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const ringRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 + 0.3;
  });

  return (
    <Float speed={1.2} floatIntensity={0.5}>
      <group ref={ringRef} position={position}>
        <Torus args={[size, 0.06, 16, 80]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
          />
        </Torus>
        {/* Orbiting indicator dot */}
        <Sphere args={[0.1, 16, 16]} position={[size, 0, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.9} />
        </Sphere>
      </group>
    </Float>
  );
}

/* ─── Distorted glowing tech orb ─── */
function TechOrb({
  position,
  color,
  size = 0.35,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    mesh.current.scale.setScalar(
      size + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.05
    );
  });

  return (
    <Float speed={2.5} floatIntensity={1.4} rotationIntensity={0.5}>
      <Sphere ref={mesh} args={[1, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={2.2}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.7}
        />
      </Sphere>
    </Float>
  );
}

/* ─── High density particle constellation ─── */
function ParticleConstellation() {
  const points = useRef<THREE.Points>(null!);
  const count = 350;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.elapsedTime * 0.025;
    points.current.rotation.x = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#a855f7" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ─── Main 3D Scene ─── */
function Scene() {
  return (
    <ParallaxGroup>
      {/* Lighting Setup */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 6, 6]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, 4, 3]} intensity={2.5} color="#8b5cf6" />
      <pointLight position={[5, -3, 2]} intensity={2} color="#06b6d4" />
      <pointLight position={[0, 2, 4]} intensity={1.8} color="#f59e0b" />

      {/* Particle field */}
      <ParticleConstellation />

      {/* 3D Glass Resume Cards */}
      <GlassResumeCard
        position={[-3.5, 0.6, -0.5]}
        rotation={[0.15, -0.35, 0.08]}
        primaryColor="#6366f1"
        accentColor="#a855f7"
        scale={1.05}
      />
      <GlassResumeCard
        position={[3.4, -0.4, -1]}
        rotation={[0.08, 0.4, -0.1]}
        primaryColor="#06b6d4"
        accentColor="#10b981"
        scale={0.95}
      />
      <GlassResumeCard
        position={[-2.2, -1.9, -0.8]}
        rotation={[0.25, 0.15, -0.05]}
        primaryColor="#f59e0b"
        accentColor="#ec4899"
        scale={0.8}
      />

      {/* 3D Match Score Ring */}
      <MatchScoreRing position={[2.6, 1.8, -1.5]} color="#a855f7" size={1.1} />
      <MatchScoreRing position={[-1.2, 2.2, -2.5]} color="#06b6d4" size={0.75} />

      {/* Glowing Tech Orbs */}
      <TechOrb position={[2.8, -1.8, -1.2]} color="#ec4899" size={0.3} />
      <TechOrb position={[-3.2, -1.1, -1.8]} color="#06b6d4" size={0.25} />
      <TechOrb position={[0.8, 2.5, -2.8]} color="#f59e0b" size={0.22} />
      <TechOrb position={[-0.8, -2.5, -1.5]} color="#8b5cf6" size={0.18} />
    </ParallaxGroup>
  );
}

/* ─── WebGL Fallback Gradient ─── */
function FallbackGradient() {
  return <div className="absolute inset-0 gradient-hero" aria-hidden />;
}

/* ─── Exported 3D Scene Component ─── */
export function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none" aria-hidden>
      <Suspense fallback={<FallbackGradient />}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
