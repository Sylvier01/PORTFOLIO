import { Environment ,OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';

import { scenePortal } from './SceneManager';
import './index.scss';

const ThreeD = () => {
    const location = useLocation();

    // Don't render 3D canvas on pages with custom backgrounds
    if (location.pathname === '/' || location.pathname === '/experience' || location.pathname === '/about' || location.pathname === '/projects') {
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
                <Environment preset='sunset' />
                <ambientLight intensity={0.5} />
              
             
    

                {/* This is where the tunneled 3D content will appear */}
                <scenePortal.Out />
            </Canvas>
        </div>
    );
};

export default ThreeD;