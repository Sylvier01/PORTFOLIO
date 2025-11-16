import { useEffect, useState } from 'react'

import { faCode, faCodeBranch, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import BokehBackground from '../BokehBackground'
import './index.scss'

const projects = [
  {
    id: 1,
    title: 'City Simulator',
    description: 'A low-poly city simulator built with React Three Fiber, featuring dynamic day and night cycles, interactive hotpoints for detailed information, and an engaging UI that changes with the time of day. Inspired by Anderson Mancini’s Windland project.',
    technologies: ['React Three Fiber', 'Three.js', 'React', 'JavaScript', 'WebGL'],
    category: '3D Web Development',
    status: 'Completed',
    year: '2025',
    company: 'Personal Project',
    features: [
      'Dynamic day and night cycles',
      'Interactive hotpoints with details',
      'Low-poly aesthetic for performance',
      'Original and stylized 3D models integrated'
    ],
    images: [], // Add screenshots or GIFs here
    githubUrl: 'https://github.com/washington254/mafer-city-2',
    liveUrl: 'https://mafer-city-2.vercel.app/',
    isPrivate: false
  },
  {
    id: 2,
    title: 'Web Browser Game',
    description: 'A private 3D web-based game built with React Three Fiber and Rapier physics engine. Set in a low-poly city with diverse buildings and dynamic physics, this project is an early game prototype inspired by @swifterik’s sketchbook game.',
    technologies: ['React Three Fiber', 'Three.js', 'Rapier Physics Engine', 'JavaScript', 'WebGL'],
    category: 'Game Development',
    status: 'Private',
    year: '2024',
    company: 'Personal Project',
    features: [
      '3D low-poly city environment',
      'Physics-driven interactions using Rapier',
      'Easily replaceable character models',
      'Optimized for web browser gameplay'
    ],
    images: [], // Add screenshots or GIFs
    githubUrl: 'https://github.com/washington254/r3f-game',
    liveUrl: 'https://r3f-game-nine.vercel.app/',
    isPrivate: true
  },
  {
    id: 3,
    title: 'Ring Configurator',
    description: 'An interactive ring configurator that allows users to customize diamond colors and ring shapes. Built using THREE.js, WebGI, and GSAP ScrollTrigger, adapted from Anderson Mancini’s source code.',
    technologies: ['THREE.js', 'WebGI', 'GSAP', 'JavaScript', 'React'],
    category: '3D Web Development',
    status: 'Completed',
    year: '2025',
    company: 'Personal Project',
    features: [
      'Customizable diamond colors',
      'Selectable ring shapes',
      'Smooth scroll-triggered animations',
      'Responsive and interactive UI'
    ],
    images: [], // Add screenshots or GIFs
    githubUrl: null,
    liveUrl: 'https://ring-config-minified.vercel.app/',
    isPrivate: false
  },
  {
    id: 4,
    title: 'Morph Particles',
    description: 'A particle system that morphs into different shapes as you scroll, built with Three.js and GSAP. Based on MisterPrada’s morph particle system with small custom tweaks.',
    technologies: ['Three.js', 'GSAP', 'JavaScript', 'WebGL'],
    category: '3D Web Development',
    status: 'Completed',
    year: '2024',
    company: 'Personal Project',
    features: [
      'Particles morph dynamically on scroll',
      'Smooth 3D animations',
      'Interactive and visually appealing design',
      'Customizable shapes and effects'
    ],
    images: [], // Add screenshots or GIFs
    githubUrl: 'https://morph-particles-ten.vercel.app/',
    liveUrl: 'https://morph-particles-ten.vercel.app/',
    isPrivate: false
  },
  {
    id: 5,
    title: '3D Showcase Website',
    description: 'My most famous website (50k YouTube views) built using THREE.js, WebGI, and GSAP ScrollTrigger. Source code adapted from @codewithsadee and 3D models from @pixotronics. This marks the start of my Three.js website series.',
    technologies: ['THREE.js', 'WebGI', 'GSAP', 'JavaScript', 'React'],
    category: '3D Web Development',
    status: 'Completed',
    year: '2025',
    company: 'Personal Project',
    features: [
      'Immersive 3D web experience',
      'Scroll-triggered animations',
      'High-quality 3D models integrated',
      'Showcase for Three.js web development skills'
    ],
    images: [], // Add screenshots or GIFs
    githubUrl: null,
    liveUrl: "https://www.youtube.com/watch?v=aAE_9lvU0ik",
    isPrivate: false
  }
];



const Projects = () => {
  const projectsArray = 'Projects'.split('')
  const [letterClass, setLetterClass] = useState('text-animate')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Get unique categories for filtering
  const categories = ['All', ...new Set(projects.map(project => project.category))]

  // Filter projects based on selected category
  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter)

  return (
    <>
      <BokehBackground />
      <div className="container projects-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={projectsArray}
              idx={15}
            />
          </h1>
          <p>
            A showcase of the projects i love, there are many more projects on my github and youtube but these are my personal favorites.
          </p>

          {/* Category Filter */}
          <div className="filter-container">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-container">
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Project Images Section - with provision for multiple images */}
                {project.images && project.images.length > 0 && (
                  <div className="project-images">
                    <div className="image-carousel">
                      {project.images.map((image, idx) => (
                        <img key={idx} src={image} alt={`${project.title} ${idx + 1}`} />
                      ))}
                    </div>
                  </div>
                )}

                <div className="project-content">
                  <div className="project-header">
                    <div className="project-meta">
                      <span className="category">{project.category}</span>
                      <span className="year">{project.year}</span>
                      <span className={`status ${project.status.toLowerCase()}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="company">{project.company}</p>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="technologies">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                        <FontAwesomeIcon icon={faCodeBranch} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link">
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.isPrivate && (
                      <span className="private-indicator">
                        <FontAwesomeIcon icon={faCode} />
                        <span>Private Project</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Projects
