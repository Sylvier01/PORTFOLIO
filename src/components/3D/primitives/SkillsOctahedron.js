import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';

const SkillsOctahedron = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.7;
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <octahedronGeometry args={[1.2]} />
      <meshStandardMaterial color="#9b59b6" />
    </mesh>
  );
};

export default SkillsOctahedron;