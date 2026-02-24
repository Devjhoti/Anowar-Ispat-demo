import React, { useRef, useEffect } from 'react'

const VideoHero = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!contentRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate mouse position relative to center of screen (-1 to 1)
            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            // Calculate rotation amount (max 15 degrees)
            const rotateX = yPos * -15;
            const rotateY = xPos * 15;

            // Apply transform to the content container
            contentRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = () => {
            if (!contentRef.current) return;
            // Reset to default on leave with smooth transition
            contentRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section className="video-hero">
            <div className="video-background">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="background-video"
                >
                    <source src="https://res.cloudinary.com/dxez9kmnn/video/upload/v1771962941/5462676-Uhd_3840_2160_30Fps_zx5w9l.mp4" type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
            </div>
            {/* The 3D container that handles the perspective and rotation */}
            <div
                ref={contentRef}
                className="video-hero-content"
                style={{
                    transition: 'transform 0.1s ease-out', // Smooth out the mouse following
                    transformStyle: 'preserve-3d' // Ensure children can be popped out in 3D
                }}
            >
                <img
                    src="/Logo.png"
                    alt="Anwar Ispat Logo"
                    style={{
                        marginBottom: '2rem',
                        height: 'clamp(50px, 12vh, 100px)',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 45px rgba(227, 24, 45, 1))',
                        transform: 'translateZ(60px)', // Pop out further than text
                        transition: 'transform 0.3s ease'
                    }}
                />
                <h1 className="video-hero-title" style={{ transform: 'translateZ(40px)' }}>
                    SHAPING THE <span className="accent-text">FUTURE</span>
                </h1>
                <p className="video-hero-subtitle" style={{
                    marginTop: '1.5rem',
                    maxWidth: '600px',
                    color: 'var(--subtext)',
                    fontSize: '1.2rem',
                    transform: 'translateZ(20px)' // Lowest pop out
                }}>
                    Unrelenting strength. Uncompromising quality. The structural backbone of tomorrow's infrastructure.
                </p>
            </div>
        </section>
    )
}

export default VideoHero
