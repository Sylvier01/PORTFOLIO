import { Canvas } from '@react-three/fiber';

import { BlackHoleBackground } from '../BlackHoleBackground';
import './index.scss';

const BlackHole3D = () => {
    return (
        <div className="blackhole-background-container">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                className="blackhole-canvas"
            >
                <BlackHoleBackground />
            </Canvas>
            <div className="blackhole-overlay" />
        </div>
    );
};

export default BlackHole3D;