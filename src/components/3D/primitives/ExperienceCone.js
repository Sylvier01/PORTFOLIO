import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';

const ExperienceCone = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.6;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.8}>
      <coneGeometry args={[1, 2, 8]} />
      <meshStandardMaterial color="#45b7d1" />
    </mesh>
  );
};

export default ExperienceCone;