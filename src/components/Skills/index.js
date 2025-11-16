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
            I'm a Three.js developer who loves to build cool stuff online 
          </p>
          <p>
            I use React with react-three-fiber, tailwind for styling, react native for some mobile apps, and GLSL for shaders.
            check out my work on my youtube channel and github account.
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