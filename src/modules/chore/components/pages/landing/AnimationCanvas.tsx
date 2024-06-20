import { Canvas } from '@react-three/fiber';
/* import { Box } from './Box'; */
import { OrbitControls } from '@react-three/drei';
import { Track, Zoom } from './AudioVisualizer';
import { Suspense } from 'react';

export const AnimationCanvas = () => {
  return (
    <Canvas
      className="h-screen z-30"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.5, 0], fov: 40 }}
    >
      {/* <ambientLight intensity={0.5} /> */}
      <spotLight
        position={[-4, 4, -4]}
        angle={0}
        penumbra={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Suspense fallback={null}>
        <Track position-z={0} url="/music/1.mp3" />
        <Zoom url="/music/1.mp3" />
      </Suspense>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 0]}>
        <planeGeometry />
        <shadowMaterial transparent opacity={0.5} />
      </mesh>
      {/* <Box /> */}
      <OrbitControls />
    </Canvas>
  );
};
