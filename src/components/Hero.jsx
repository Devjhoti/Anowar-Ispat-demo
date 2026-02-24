import React from 'react'

const Hero = () => {
    return (
        <section className="hero" style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <div className="hero-content" style={{ maxWidth: '50vw', zIndex: 10, position: 'relative' }}>
                <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                    FORGED IN <span className="accent-text">FIRE</span>.
                    <br />
                    ENGINEERED FOR THE <span className="accent-text">FUTURE</span>.
                </h1>
                <p style={{ marginTop: '2rem', maxWidth: '400px', color: 'var(--subtext)', fontSize: '1rem' }}>
                    A cinematic journey of power, precision, and the steel that builds Bangladesh.
                </p>
                <a href="#discover" className="magnetic-btn">DISCOVER THE FORCE</a>
            </div>
        </section>
    )
}

export default Hero
