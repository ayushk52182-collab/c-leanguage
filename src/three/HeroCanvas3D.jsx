import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GlowingCyberCore = () => {
  const meshRef = useRef();
  const ringRef = useRef();
  const outerRingRef = useRef();

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4 + mouse.y * 0.5;
      meshRef.current.rotation.y = t * 0.6 + mouse.x * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.2;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = -t * 0.25;
      outerRingRef.current.rotation.z = Math.PI / 4 + Math.cos(t * 0.4) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Cyber Icosahedron */}
      <mesh ref={meshRef} scale={1.3}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#00f0ff"
          emissive="#004488"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.9}
          distort={0.35}
          speed={2.5}
          wireframe={true}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh scale={0.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#b44aff"
          emissive="#b44aff"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Neon Ring 1 */}
      <mesh ref={ringRef} scale={2.1}>
        <torusGeometry args={[1, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Orbiting Neon Ring 2 */}
      <mesh ref={outerRingRef} scale={2.6}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#ff2d7b"
          emissive="#ff2d7b"
          emissiveIntensity={1.8}
        />
      </mesh>
    </group>
  );
};

const FloatingCodeCubes = () => {
  const count = 18;
  const cubes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 1.6;
      temp.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3,
          Math.sin(angle) * radius
        ],
        scale: 0.15 + Math.random() * 0.18,
        speed: 0.5 + Math.random() * 1.2,
        color: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#b44aff' : '#00ff88'
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {cubes.map((cube, i) => (
        <Float key={i} speed={cube.speed} rotationIntensity={1.5} floatIntensity={2}>
          <mesh position={cube.position} scale={cube.scale}>
            <boxGeometry />
            <meshStandardMaterial
              color={cube.color}
              emissive={cube.color}
              emissiveIntensity={1.2}
              wireframe={Math.random() > 0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const HeroCanvas3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '280px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#b44aff" />
        <GlowingCyberCore />
        <FloatingCodeCubes />
      </Canvas>
    </div>
  );
};

export default HeroCanvas3D;
