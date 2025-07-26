'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { useRef } from 'react';

function Model(props: any) {
  // The path should match where you saved the model in /public
  const { scene } = useGLTF('/product-model.glb');
  const modelRef = useRef<any>();

  // Simple rotation animation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return <primitive object={scene} ref={modelRef} {...props} />;
}

export default function ThreeDView() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        {/* Lighting is crucial for seeing the model */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" /> {/* Adds realistic reflections */}

        <Model scale={0.5} /> {/* Scale the model to fit */}

        {/* Controls for user interaction */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}