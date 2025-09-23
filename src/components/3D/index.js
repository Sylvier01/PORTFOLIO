import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';

import { scenePortal } from './SceneManager';
import './index.scss';

const ThreeD = () => {
    const location = useLocation();
    
    // Don't render 3D canvas on home page
    if (location.pathname === '/') {
        return null;
    }

    return (
        <div className="threejs-container">
            <Canvas
                flat
                shadows
                camera={{ position: [0, 0, 8], fov: 45 }}
                className="threejs-canvas"
            >
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <ambientLight intensity={0.5} />
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

                {/* This is where the tunneled 3D content will appear */}
                <scenePortal.Out />
            </Canvas>
        </div>
    );
};

export default ThreeD;