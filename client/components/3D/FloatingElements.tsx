import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export const FloatingAndroid = ({
  position = [0, 0, 0] as [number, number, number],
}) => {
  const meshRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={position}>
        {/* Android Robot Body */}
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 1.5, 8]} />
          <MeshDistortMaterial
            color="#3DDC84"
            attach="material"
            distort={0.2}
            speed={1.5}
            roughness={0.1}
            metalness={0.6}
          />
        </mesh>

        {/* Android Head */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <MeshDistortMaterial
            color="#3DDC84"
            attach="material"
            distort={0.15}
            speed={2}
            roughness={0.1}
            metalness={0.6}
          />
        </mesh>

        {/* Arms */}
        <mesh position={[-1, 0.2, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
          <meshStandardMaterial
            color="#3DDC84"
            metalness={0.6}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[1, 0.2, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
          <meshStandardMaterial
            color="#3DDC84"
            metalness={0.6}
            roughness={0.1}
          />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.3, -1.2, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
          <meshStandardMaterial
            color="#3DDC84"
            metalness={0.6}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0.3, -1.2, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
          <meshStandardMaterial
            color="#3DDC84"
            metalness={0.6}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

export const FloatingCode = ({
  position = [0, 0, 0] as [number, number, number],
}) => {
  const codeSnippets = ["fun", "val", "class", "if", "when"];
  const snippet = useMemo(
    () => codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
    [],
  );

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position}>
        <boxGeometry args={[0.8, 0.3, 0.1]} />
        <meshStandardMaterial color="#4285F4" metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  );
};

export const FloatingGeometry = ({
  position = [0, 0, 0] as [number, number, number],
  shape = "cube",
}) => {
  const meshRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
    }
  });

  const geometries = {
    cube: <boxGeometry args={[0.5, 0.5, 0.5]} />,
    sphere: <sphereGeometry args={[0.3, 16, 16]} />,
    cone: <coneGeometry args={[0.3, 0.6, 8]} />,
    torus: <torusGeometry args={[0.3, 0.1, 8, 24]} />,
  };

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        {geometries[shape] || geometries.cube}
        <meshStandardMaterial
          color="#FF6B6B"
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

export const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>();
  const particleCount = 100;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const androidGreen = new THREE.Color("#3DDC84");
      const androidBlue = new THREE.Color("#4285F4");
      const color = androidGreen.lerp(androidBlue, Math.random());

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};
