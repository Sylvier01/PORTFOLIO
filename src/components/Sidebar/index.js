import { useEffect, useRef, useState, } from 'react';

import { faGithub, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import {
  faBars,
  faBriefcase,
  faEnvelope,
  faHome,
  faLaptopCode,
  faScrewdriverWrench,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'


import LogoS from '../../assets/images/logo.png'

import './index.scss'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-expand on desktop, collapsed on mobile
      if (!mobile) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only collapse if sidebar is expanded and click is outside the sidebar
      if (isExpanded && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    // Add event listener when sidebar is expanded
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div ref={sidebarRef} className={`nav-bar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="sidebar-header">
          <Link className="logo" to="/">
            <img src={LogoS} alt="Logo" />
            {isExpanded && <h1 className='LogoName'>Washington</h1>}
          </Link>

          <button className="toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <nav>
          <NavLink exact="true" activeclassname="active" to="/">
            <FontAwesomeIcon icon={faHome} />
            {isExpanded && <span className="nav-text">Home</span>}
          </NavLink>

          <NavLink activeclassname="active" className="about-link" to="/about">
            <FontAwesomeIcon icon={faUser} />
            {isExpanded && <span className="nav-text">About</span>}
          </NavLink>

          <NavLink
            activeclassname="active"
            className="experience-link"
            to="/experience"
          >
            <FontAwesomeIcon icon={faBriefcase} />
            {isExpanded && <span className="nav-text">Experience</span>}
          </NavLink>

          <NavLink
            activeclassname="active"
            className="projects-link"
            to="/projects"
          >
            <FontAwesomeIcon icon={faLaptopCode} />
            {isExpanded && <span className="nav-text">Projects</span>}
          </NavLink>

          <NavLink
            activeclassname="active"
            className="skills-link"
            to="/skills"
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} />
            {isExpanded && <span className="nav-text">Skills</span>}
          </NavLink>

          <NavLink
            activeclassname="active"
            className="contact-link"
            to="/contact"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            {isExpanded && <span className="nav-text">Contact</span>}
          </NavLink>
        </nav>

        <div className="social-links">
          {isExpanded && <div className="social-title">Connect</div>}
          <ul>
            <li>
              <a
                href="https://www.youtube.com/@washingtonmaina"
                target="_blank"
                rel="noreferrer"
                title="youtube"
              >
                <FontAwesomeIcon icon={faYoutube} />
                {isExpanded && <span>Youtube</span>}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/washington254"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
                {isExpanded && <span>GitHub</span>}
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Washing50752362"
                target="_blank"
                rel="noreferrer"
                title="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
                {isExpanded && <span>Twitter</span>}
              </a>
            </li>

          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
