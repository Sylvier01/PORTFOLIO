import { useEffect, useState } from 'react'

import Loader from 'react-loaders'
import { Link } from 'react-router-dom'

import AnimatedLetters from '../AnimatedLetters'
import LiquidBackground from '../LiquidBackground'
import Logo from './Logo'
import LogoTitle from '../../assets/images/logo-s.png'

import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')




  return (
    <>
      <LiquidBackground />
      <div className="container home-page">
        <div className="text-zone">
         <h1>
          Hey Am Washington <br/>
          A 3D Web Developer 
         </h1>
          <h2>
           have a project? talk to me through here <br/>

            
          </h2>
       
        </div>
           <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home
