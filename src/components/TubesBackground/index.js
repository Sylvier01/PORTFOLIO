import { useEffect, useRef } from 'react';
import './index.scss';

const TubesBackground = () => {
    const canvasRef = useRef();
    const appRef = useRef();

    useEffect(() => {
        // Helper function to generate random colors exactly like CodePen
        const randomColors = (count) => {
            return new Array(count).fill(0).map(() =>
                "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
            );
        };

        const initializeTubesBackground = async () => {
            try {
                console.log('Initializing tubes background...');
                console.log('Canvas element:', canvasRef.current);

                // Import the tubes library
                const tubesModule = await import('../../lib/tubes1.min.js');

                const TubesCursor = tubesModule.default;

                if (canvasRef.current && !appRef.current && TubesCursor) {

                    // Initialize the tubes cursor exactly like the CodePen
                    appRef.current = TubesCursor(canvasRef.current, {
                        tubes: {
                            colors: ["#f967fb", "#53bc28", "#6958d5"],
                            lights: {
                                intensity: 200,
                                colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
                            }
                        }
                    });

                    console.log('Tubes app created:', appRef.current);
                    
             
                    // Add click event for color randomization exactly like CodePen
                    const handleClick = () => {
                        if (appRef.current && appRef.current.tubes) {
                            const colors = randomColors(3);
                            const lightsColors = randomColors(4);
                            console.log('Changing colors:', colors, lightsColors);
                            appRef.current.tubes.setColors(colors);
                            appRef.current.tubes.setLightsColors(lightsColors);
                        }
                    };

                    document.body.addEventListener('click', handleClick);

                    // Store cleanup function
                    appRef.current.cleanup = () => {
                        document.body.removeEventListener('click', handleClick);
                    };
                } else {
                    console.log('Canvas or TubesCursor not available:', {
                        canvas: canvasRef.current,
                        app: appRef.current,
                        TubesCursor
                    });
                }
            } catch (error) {
                console.error('Error initializing tubes background:', error);
            }
        };

        // Add a small delay to ensure canvas is mounted
        const timer = setTimeout(() => {
            initializeTubesBackground();
        }, 100);

        // Cleanup on unmount
        return () => {
            clearTimeout(timer);
            if (appRef.current) {
                if (appRef.current.cleanup) {
                    appRef.current.cleanup();
                }
                appRef.current = null;
            }
        };
    }, []);

    return (
        <div className="tubes-background-container">
            <canvas
                ref={canvasRef}
                id="canvas"
                className="tubes-background"
            />
            <div className="tubes-overlay" />
        </div>
    );
};

export default TubesBackground;