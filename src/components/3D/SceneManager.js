import { useLocation } from 'react-router-dom';
import tunnel from 'tunnel-rat';


import ContactCylinder from './primitives/ContactCylinder';
import SkillsNoisySphere from './primitives/SkillsOctahedron';

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
      case '/skills':
        return <SkillsNoisySphere />;
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