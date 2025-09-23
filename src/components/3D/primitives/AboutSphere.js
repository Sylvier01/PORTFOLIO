import { useRef } from 'react';

import { shaderMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Create the shader material
const AboutShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(),
    uMouse: new THREE.Vector2(),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader - Beautiful animated gradient with waves
  `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;

    vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263, 0.416, 0.557);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      vec2 uv = (vUv - 0.5) * 2.0;
      vec2 uv0 = uv;
      vec3 finalColor = vec3(0.0);
      
      for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;
        
        float d = length(uv) * exp(-length(uv0));
        
        vec3 col = palette(length(uv0) + i * 0.4 + uTime * 0.4);
        
        d = sin(d * 8.0 + uTime) / 8.0;
        d = abs(d);
        
        d = pow(0.01 / d, 1.2);
        
        finalColor += col * d;
      }
      
      // Add some sparkle effect
      float sparkle = sin(uv.x * 50.0 + uTime * 2.0) * sin(uv.y * 50.0 + uTime * 1.5);
      sparkle = smoothstep(0.98, 1.0, sparkle);
      finalColor += sparkle * 0.3;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Extend the material so we can use it in JSX
extend({ AboutShaderMaterial });

const AboutSphere = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  const { viewport, camera } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uResolution.set(viewport.width, viewport.height);
    }
  });

  // Calculate the scale to cover the entire screen
  const distance = camera.position.z;
  const fov = (camera.fov * Math.PI) / 180;
  const height = 2 * Math.tan(fov / 2) * distance;
  const width = height * camera.aspect;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[width * 1.1, height * 1.1, 1]}>
      <planeGeometry args={[1, 1]} />
      <aboutShaderMaterial
        ref={materialRef}
        uTime={0}
        uResolution={[viewport.width, viewport.height]}
        uMouse={[0, 0]}
      />
    </mesh>
  );
};

export default AboutSphere;