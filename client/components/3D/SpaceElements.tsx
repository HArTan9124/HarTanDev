import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  Float,
  Text3D,
  MeshDistortMaterial,
  Html,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";

// Space Station Component
export const SpaceStation = ({
  position = [0, 0, 0] as [number, number, number],
}) => {
  const groupRef = useRef<THREE.Group>();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group
        ref={groupRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main Station Body */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2, 0.8, 8, 16]} />
          <meshStandardMaterial
            color={hovered ? "#4285F4" : "#3DDC84"}
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? "#4285F4" : "#3DDC84"}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Solar Panels */}
        <mesh position={[-3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[2, 0.1, 4]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        <mesh position={[3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[2, 0.1, 4]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Central Hub */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#2a2a3e"
            metalness={0.7}
            roughness={0.3}
            emissive="#3DDC84"
            emissiveIntensity={0.05}
          />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={1}
            roughness={0}
            emissive="#FFD700"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Video Screen Component
export const FloatingVideoScreen = ({
  position = [0, 0, 0] as [number, number, number],
  content = "Android\nDeveloper",
}) => {
  const meshRef = useRef<THREE.Mesh>();
  const [time, setTime] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
      setTime(state.clock.elapsedTime);
    }
  });

  // Create a dynamic texture that simulates video content
  const videoTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d")!;

    const texture = new THREE.CanvasTexture(canvas);

    const updateTexture = () => {
      // Clear canvas
      context.fillStyle = "#0a0a0a";
      context.fillRect(0, 0, 512, 512);

      // Create animated background
      const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(
        0,
        `rgba(61, 220, 132, ${0.3 + Math.sin(time * 2) * 0.2})`,
      );
      gradient.addColorStop(
        0.5,
        `rgba(66, 133, 244, ${0.2 + Math.cos(time * 1.5) * 0.1})`,
      );
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 512);

      // Add grid pattern
      context.strokeStyle = `rgba(61, 220, 132, ${0.3 + Math.sin(time * 3) * 0.2})`;
      context.lineWidth = 2;
      for (let i = 0; i < 512; i += 64) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, 512);
        context.stroke();
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(512, i);
        context.stroke();
      }

      // Add text
      context.fillStyle = "#ffffff";
      context.font = "bold 48px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";

      const lines = content.split("\n");
      lines.forEach((line, index) => {
        context.fillText(line, 256, 200 + index * 60);
      });

      // Add animated elements
      context.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(time * 4) * 0.3})`;
      context.beginPath();
      context.arc(100 + Math.sin(time * 2) * 20, 400, 8, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(400 + Math.cos(time * 1.5) * 15, 100, 6, 0, Math.PI * 2);
      context.fill();

      texture.needsUpdate = true;
    };

    return { texture, updateTexture };
  }, [content]);

  useEffect(() => {
    const interval = setInterval(() => {
      videoTexture.updateTexture();
    }, 100);

    return () => clearInterval(interval);
  }, [videoTexture, time]);

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial
          map={videoTexture.texture}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          emissive="#003300"
          emissiveIntensity={0.1}
        />

        {/* Screen Frame */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[4.2, 4.2]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </mesh>
    </Float>
  );
};

// Orbiting Planets
export const OrbitingPlanet = ({
  radius = 8,
  speed = 1,
  planetSize = 0.5,
  color = "#FF6B6B",
  orbitOffset = 0,
}) => {
  const planetRef = useRef<THREE.Mesh>();
  const orbitRef = useRef<THREE.Group>();

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y =
        state.clock.elapsedTime * speed + orbitOffset;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.02;
      planetRef.current.rotation.x += 0.01;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[radius, 0, 0]}>
        <sphereGeometry args={[planetSize, 16, 16]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.1}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Enhanced Particle Field with Nebula Effect
export const SpaceNebula = () => {
  const particlesRef = useRef<THREE.Points>();
  const particleCount = 2000;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Create spherical distribution
      const radius = Math.random() * 50 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color variations for nebula effect
      const colorChoice = Math.random();
      const color = new THREE.Color();

      if (colorChoice < 0.3) {
        color.setHSL(0.55, 0.8, 0.6); // Blue
      } else if (colorChoice < 0.6) {
        color.setHSL(0.15, 0.9, 0.7); // Green
      } else if (colorChoice < 0.8) {
        color.setHSL(0.75, 0.7, 0.8); // Purple
      } else {
        color.setHSL(0.05, 1, 0.9); // Orange/Red
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
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
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={particleCount}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        alphaTest={0.1}
      />
    </points>
  );
};

// Floating Holographic UI Elements
export const HolographicUI = ({
  position = [0, 0, 0] as [number, number, number],
}) => {
  const groupRef = useRef<THREE.Group>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Holographic Rings */}
      {[1, 1.5, 2].map((radius, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.05, radius + 0.05, 32]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.3 - index * 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Central Orb */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.6}
          emissive="#00ffff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// Asteroid Field
export const AsteroidField = () => {
  const asteroids = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 40,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
    }));
  }, []);

  return (
    <>
      {asteroids.map((asteroid) => (
        <Float
          key={asteroid.id}
          speed={asteroid.speed * 10}
          rotationIntensity={asteroid.speed * 20}
          floatIntensity={asteroid.speed * 15}
        >
          <mesh
            position={asteroid.position}
            rotation={asteroid.rotation}
            scale={asteroid.scale}
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#666666"
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};
