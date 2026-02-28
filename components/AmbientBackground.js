"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Grid, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function DynamicScene() {
  const sphereRef = useRef();
  const gridRef = useRef();
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Mouse interaction for the whole scene tilt
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);

    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.3;
      sphereRef.current.rotation.x = time * 0.2;
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1.5} />
      
      {/* 3D Grid floor for depth */}
      <Grid
        position={[0, -5, 0]}
        sectionSize={3}
        sectionColor="#f97316"
        sectionThickness={1.5}
        cellSize={1}
        cellColor="#3b82f6"
        cellThickness={0.6}
        infiniteGrid
        fadeDistance={40}
        fadeStrength={5}
      />

      {/* The Central "Pulse" Core */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={sphereRef} position={[4, 2, -5]}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <MeshDistortMaterial
            color="#f97316"
            speed={5}
            distort={0.5}
            radius={1}
            emissive="#f97316"
            emissiveIntensity={1}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </Float>

      {/* Floating 3D Elements */}
      <Float speed={4} rotationIntensity={3} floatIntensity={2}>
        <mesh position={[-6, -2, -8]}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial color="#3b82f6" wireframe emissive="#3b82f6" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      <pointLight position={[10, 10, 10]} intensity={2} color="#f97316" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3b82f6" />
      <ambientLight intensity={0.6} />
    </>
  );
}

export default function AmbientBackground() {
  return (
    <div 
      id="3d-background-root"
      className="fixed inset-0" 
      style={{ 
        zIndex: -1, 
        pointerEvents: "none",
        background: "linear-gradient(to bottom, #02040a, #050a18, #02040a)"
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <DynamicScene />
      </Canvas>
      {/* Subtle overlay to prevent 3D from being too distracting */}
      <div className="absolute inset-0 bg-[#02040a]/30 backdrop-blur-[1px]"></div>
    </div>
  );
}
