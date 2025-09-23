import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';

import Cube from '../Cube';
import './index.scss';

const ThreeD = () => {
  const { cubeColor } = useControls('Cube', {
    cubeColor: { options: ['orange', 'blue', 'red', 'green', 'purple'] },
  });

  return (
    <div className="threejs-container">
      <Canvas 
        flat 
        shadows 
        camera={{ position: [0, 0, 20], fov: 25 }}
        className="threejs-canvas"
      >
        <OrbitControls />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight
          position={[-10, -10, -10]}
          decay={0}
          intensity={Math.PI}
        />
        <Cube position={[-1.2, 0, 0]} cubeColor={cubeColor} />
        <Cube position={[1.2, 0, 0]} cubeColor={cubeColor} />
      </Canvas>
    </div>
  );
};

export default ThreeD;