import { useEffect, useRef } from 'react'

import { Bokeh1Background } from '../../lib/bokeh1.cdn.min.js'

import './index.scss'

const BokehBackground = () => {
    const canvasRef = useRef();
    const bokehRef = useRef();

    useEffect(() => {
        const initializeBokehBackground = async () => {
            try {
                console.log('Initializing bokeh background...');

                if (canvasRef.current) {
                    // Initialize the bokeh background
                    const bokeh1Background = Bokeh1Background(canvasRef.current);

                    // Load the bokeh particles texture
                    bokeh1Background.loadMap('/bokeh-particles2.png');

                    // Set the colors (purple, orange, teal theme)
                    bokeh1Background.setColors([0x6d4862, 0xfd826c, 0x22ccc1]);

                    // Store reference for cleanup
                    bokehRef.current = bokeh1Background;

                    console.log('Bokeh background initialized successfully');
                }
            } catch (error) {
                console.error('Error initializing bokeh background:', error);
            }
        };

        // Add a small delay to ensure canvas is mounted
        const timer = setTimeout(() => {
            initializeBokehBackground();
        }, 100);

        // Cleanup on unmount
        return () => {
            clearTimeout(timer);
            if (bokehRef.current && bokehRef.current.dispose) {
                bokehRef.current.dispose();
            }
            bokehRef.current = null;
        };
    }, []);

    return (
        <div className="bokeh-background-container">
            <canvas
                ref={canvasRef}
                id="webgl-canvas"
                className="bokeh-background"
            />
            <div className="bokeh-overlay" />
        </div>
    );
};

export default BokehBackground;