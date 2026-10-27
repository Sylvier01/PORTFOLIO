import { useEffect, useState } from 'react'

import Loader from 'react-loaders'
import { Link } from 'react-router-dom'

import LiquidBackground from '../LiquidBackground'

import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')




  return (
    <>
      <LiquidBackground />
      <div className="container home-page">
        <div className="text-zone">
         <h1>
          Hey <br/>
          Am Washington <br/>
          A 3D Web Developer 
         </h1>
          <h2>
           Have a project? Contact me to get started. <br/>            
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
