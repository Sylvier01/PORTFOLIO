import { useEffect, useRef, useState } from 'react';

import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { fragmentShader, vertexShader } from '../../shaders/blackhole.js';

// Create the shader material using the same approach as AboutSphere
const BlackHoleShaderMaterial = shaderMaterial(
    {
        iTime: 0,
        iResolution: new THREE.Vector2(),
        iMouse: new THREE.Vector3(),
    },
    vertexShader,
    fragmentShader
);

// Extend the material so we can use it in JSX
extend({ BlackHoleShaderMaterial });

export function BlackHoleBackground(props) {
    const meshRef = useRef();
    const materialRef = useRef();
    const { viewport, camera } = useThree();
    const dpr = window.devicePixelRatio;
    const [mouse, setMouse] = useState({ x: 0, y: 0 });



    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (event) => {
            setMouse({
                x: event.clientX,
                y: window.innerHeight - event.clientY // Flip Y coordinate
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (materialRef.current) {
            try {
                const { elapsedTime } = state.clock;

                materialRef.current.iTime = elapsedTime * 0.4;
                materialRef.current.iResolution.set(
                    window.innerWidth * dpr,
                    window.innerHeight * dpr
                );
                materialRef.current.iMouse.set(mouse.x * 0.02, mouse.y * 0.02, 1);
            } catch (error) {
                console.error('Error updating uniforms:', error);
            }
        }
    });

    // Calculate the scale to cover the entire screen
    const distance = camera.position.z;
    const fov = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * distance;
    const width = height * camera.aspect;

    return (
        <mesh
            {...props}
            ref={meshRef}
            position={[0, 0, 0]}
            scale={[width * 1, height * 1, 1]}
        >
            <planeGeometry args={[1, 1]} />
            <blackHoleShaderMaterial
                ref={materialRef}
                iTime={0}
                iResolution={[window.innerWidth * dpr, window.innerHeight * dpr]}
                iMouse={[0, 0, 1]}
            />
        </mesh>
    );
}