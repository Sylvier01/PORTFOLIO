import { useEffect, useState } from 'react'

import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import TubesBackground from '../TubesBackground'
import './index.scss'

const workExperience = [
  {
    id: 1,
    company: 'vizualtravel',
    companyUrl: 'https://www.vizualtravel.com/',
    position: 'Software Engineer',
    duration: 'January 2025 – Present',
    location: ' (Remote)',
    achievements: [
      'Built a trip visualization for users to view travel itenerary',
      'Created the app for saving and viewing different trip options found in the app store using react native.'
    ]
  },
  {
    id: 2,
    company: 'UPWORK',
    companyUrl: 'https://www.upwork.com/',
    position: '3D developer freelancing',
    duration: 'february 2023 – January 2025',
    location: 'remote ',
    achievements: [
      'worked as a freelancer with many clients for various projects',
      'earned up to 1k dollars and 10 hours of work'
    ]
  },
  {
    id: 3,
    company: 'Diamas',
    companyUrl: 'https://www.diamas-co.com/',
    position: 'Software Engineer — Contract',
    duration: 'December 2022 — february 2023',
    location: 'England (Remote)',
    achievements: [
      'impemented 3D tumbler for the shopify website',
      'added various variation of the tumbler and also worked on UI',
    ]
  }
]

const Experience = () => {
  const experienceArray = 'Experience'.split('')
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <TubesBackground />
      <div className="container experience-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={experienceArray}
              idx={15}
            />
          </h1>
          <p>
            My professional journey spans across various industries and technologies.
            from big name companies to small indie places, here are some of them
          </p>
        </div>

        <div className="experience-container">
          <div className="timeline">
            {workExperience.map((job, index) => (
              <div key={job.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-marker">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div className="timeline-content">
                  <div className="job-header">
                    <h3 className="company-name">
                      <a href={job.companyUrl} target="_blank" rel="noreferrer">
                        {job.company}
                      </a>
                    </h3>
                    <h4 className="position">{job.position}</h4>
                    <div className="job-meta">
                      <span className="duration">{job.duration}</span>
                      <span className="location">{job.location}</span>
                    </div>
                  </div>
                  <ul className="achievements">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
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

export default Experience
