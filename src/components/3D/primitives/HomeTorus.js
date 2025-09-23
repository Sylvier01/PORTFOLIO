import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';

const HomeTorus = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={2}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color="#ff6b6b" wireframe={false} />
    </mesh>
  );
};

export default HomeTorus;