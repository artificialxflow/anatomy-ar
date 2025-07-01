"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ThreeDemo({ modelUrl }: { modelUrl?: string }) {
  return (
    <div style={{ width: "100%", height: "400px", direction: "ltr" }}>
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <Suspense fallback={null}>
          {modelUrl ? (
            <Model url={modelUrl} />
          ) : (
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#007bff" />
            </mesh>
          )}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
} 