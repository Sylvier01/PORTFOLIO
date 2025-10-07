import { useLocation } from 'react-router-dom';
import tunnel from 'tunnel-rat';

import Dragon from './primitives/Dragon';

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
      case '/contact':
        return <Dragon scale={[0.4,0.4,0.4]} position={[2,-1.5,0]} />;
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