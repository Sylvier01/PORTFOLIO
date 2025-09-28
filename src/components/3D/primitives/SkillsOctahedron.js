import { useMemo, useRef } from 'react'

import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { fragmentShader, vertexShader } from '../../../shaders/noisySphere'

const SkillsNoisySphere = () => {
  const meshRef = useRef()
  const materialRef = useRef()

  // Create uniforms for the shader
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uCoordScale1: { value: 0.75},
    uCoordScale2: { value: 4 },
    uCoordScale3: { value: 8 },
    uCoordScale4: { value: 16 },
    uDisplacementScale: { value: 0.1 },
    uBumpScale: { value: 0.025 }
  }), [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.2
      meshRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1)
    }
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[3, 0, 0]}>
      <sphereGeometry args={[1, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default SkillsNoisySphere