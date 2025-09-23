import { useEffect, useRef } from 'react';

import './index.scss';

const LiquidBackground = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const initializeLiquidBackground = async () => {
      // Import the library
      await import('../../lib/fluid-background');

      // Wait for DOM to be ready
      setTimeout(() => {
        // Reset the canvas variable and start fresh
        if (window.resetLiquidCanvas) {
          window.resetLiquidCanvas();
        }

        // Initialize the canvas
        if (window.startCanvas) {
          window.startCanvas();
        }
      }, 100);
    };

    initializeLiquidBackground();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="liquid-canvas"
      className="liquid-background"
    />
  );
};

export default LiquidBackground;