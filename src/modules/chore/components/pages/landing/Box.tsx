/* import { useFrame } from '@react-three/fiber'; */
import { useRef, useState } from 'react';
import * as THREE from 'three';

export const Box = (props: any) => {
  const meshRef = useRef<THREE.Mesh>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  /*   useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
    }
  }); */
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={1.5}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerEnter={(event) => (event.stopPropagation(), setHover(true))}
      onPointerOut={() => setHover(false)}
    >
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} wireframe />
      <sphereGeometry args={[1, 5, 5]} />
    </mesh>
  );
};
