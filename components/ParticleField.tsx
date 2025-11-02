"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  mouseInfluence?: boolean;
}

/**
 * ParticleField Component
 * Animated 3D particle system with mouse parallax and scroll effects
 */
export default function ParticleField({ 
  count = 800, 
  mouseInfluence = true 
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollPosition = useRef(0);

  // Generate random particle positions and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      temp.push({ position: { x, y, z }, velocity });
    }
    return temp;
  }, [count]);

  // Mouse move tracking
  useEffect(() => {
    if (!mouseInfluence) return;

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    const handleScroll = () => {
      scrollPosition.current = window.scrollY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseInfluence]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const mesh = meshRef.current;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    particles.forEach((particle, i) => {
      // Update particle position with velocity
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y;
      particle.position.z += particle.velocity.z;

      // Boundary wrapping (keep particles in view)
      if (particle.position.x > 10) particle.position.x = -10;
      if (particle.position.x < -10) particle.position.x = 10;
      if (particle.position.y > 10) particle.position.y = -10;
      if (particle.position.y < -10) particle.position.y = 10;
      if (particle.position.z > 10) particle.position.z = -10;
      if (particle.position.z < -10) particle.position.z = 10;

      // Mouse parallax effect
      const mouseInfluenceStrength = 0.1;
      const distanceX = mousePosition.current.x * mouseInfluenceStrength;
      const distanceY = mousePosition.current.y * mouseInfluenceStrength;

      // Scroll depth effect
      const scrollInfluence = scrollPosition.current * 2;

      // Calculate final position
      const x = particle.position.x + distanceX + Math.sin(time + i) * 0.1;
      const y = particle.position.y + distanceY + Math.cos(time + i) * 0.1;
      const z = particle.position.z - scrollInfluence + Math.sin(time * 0.5 + i) * 0.2;

      // Set matrix for this instance
      matrix.setPosition(x, y, z);
      mesh.setMatrixAt(i, matrix);

      // Color cycling (cyan to purple)
      const hue = (Math.sin(time * 0.5 + i * 0.1) * 0.5 + 0.5) * 0.3 + 0.5;
      color.setHSL(hue, 0.8, 0.6);
      mesh.setColorAt(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }

    // Subtle rotation of entire particle field
    mesh.rotation.y = time * 0.05;
    mesh.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Directional lights for depth */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#00f0ff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#9d4edd" />

      {/* Particle instances */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          emissive="#00f0ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          roughness={0.5}
          metalness={0.5}
        />
      </instancedMesh>

      {/* Fog for depth effect */}
      <fog attach="fog" args={["#0a0a0f", 5, 20]} />
    </>
  );
}