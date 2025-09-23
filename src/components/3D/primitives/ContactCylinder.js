import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';

const ContactCylinder = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime) * 0.3;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.3}>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial color="#e74c3c" />
    </mesh>
  );
};

export default ContactCylinder;