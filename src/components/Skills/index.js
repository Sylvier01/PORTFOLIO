import { useEffect, useState } from 'react'

import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Skills = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const skillsArray = 'Skills'.split('')

  const skills = [
    'Blender',
    'Three.js',
    'React',
    'Next.js',
    'Tailwind CSS',
    'React Native',
    'WebGL',
    'GLSL Shaders',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'CSS3',
    'HTML5'
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container skills-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={skillsArray}
              idx={15}
            />
          </h1>
          <p>
            I'm a Three.js developer passionate about creating immersive 3D web experiences. 
            My expertise spans from 3D modeling in Blender to implementing complex WebGL 
            shaders and interactive animations.
          </p>
          <p>
            I specialize in building modern web applications with React and Next.js, 
            crafting responsive designs with Tailwind CSS, and developing mobile 
            experiences with React Native. My focus is on performance optimization 
            and creating seamless user interactions in 3D environments.
          </p>
          <p>
            Whether it's particle systems, procedural animations, or complex 3D scenes, 
            I bring creative visions to life through code and deliver engaging digital experiences.
          </p>
        </div>

        <div className="skills-grid">
          <div className="skills-list">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Skills