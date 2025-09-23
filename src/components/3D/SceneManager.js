import { useLocation } from 'react-router-dom';
import tunnel from 'tunnel-rat';

import AboutSphere from './primitives/AboutSphere';
import ContactCylinder from './primitives/ContactCylinder';
import ExperienceCone from './primitives/ExperienceCone';
import HomeTorus from './primitives/HomeTorus';
import ProjectsBox from './primitives/ProjectsBox';
import SkillsOctahedron from './primitives/SkillsOctahedron';

// Create the tunnel for 3D content
export const scenePortal = tunnel();

const SceneManager = () => {
  const location = useLocation();
  
  // Don't render anything for home page - it has its own liquid background
  if (location.pathname === '/') {
    return null;
  }
  
  const renderSceneForRoute = () => {
    switch (location.pathname) {
      case '/about':
        return <AboutSphere />;
      case '/experience':
        return <ExperienceCone />;
      case '/projects':
        return <ProjectsBox />;
      case '/skills':
        return <SkillsOctahedron />;
      case '/contact':
        return <ContactCylinder />;
      default:
        return null;
    }
  };

  return (
    <scenePortal.In>
      {renderSceneForRoute()}
    </scenePortal.In>
  );
};

export default SceneManager;