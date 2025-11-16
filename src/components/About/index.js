/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

import {
  faCss3,
  faGithub,
  faHtml5,
  faJs,
  faReact,
  faWordpress,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import BlackHole3D from '../BlackHole3D'
import './index.scss'

const About = () => {
  const aboutArray = 'About Me'.split('')

  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <BlackHole3D />
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={aboutArray}
              idx={15}
            />
          </h1>
          <p>
            I’m a Three.js developer with over 4 years of
            experience, specializing in Product configurators, 3D animations and
            visualizations. I do a lot of shader programming using GLSL too.
          </p>
          <p>
            I’m also a React Native dev and have a created a handful of them too, check out my projects page
            to see the apps I have created.
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faReact} color="#4B8BBE" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faJs} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faHtml5} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faCss3} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faWordpress} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGithub} color="#EC4D28" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
