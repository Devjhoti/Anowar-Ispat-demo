import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import Scene from './components/three/Scene'
import VideoHero from './components/VideoHero'
import Hero from './components/Hero'
import { ProductService, BetterTomorrow, Career, MediaEvents, Blog, Footer } from './components/Sections'
import Navbar from './components/Navbar'
import ContactModal from './components/ContactModal'
import IntroLoader from './components/IntroLoader'

function App() {
    const lenisRef = useRef()
    const [isContactOpen, setIsContactOpen] = useState(false)
    const [introDone, setIntroDone] = useState(false)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
        lenisRef.current = lenis

        return () => {
            lenis.destroy()
        }
    }, [])

    useEffect(() => {
        if (lenisRef.current) {
            if (isContactOpen || !introDone) {
                lenisRef.current.stop()
            } else {
                lenisRef.current.start()
            }
        }
    }, [isContactOpen, introDone])

    return (
        <div className="app-container">
            {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}
            <Navbar onOpenContact={() => setIsContactOpen(true)} />
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            <div className="canvas-wrapper">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 5], fov: 35 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Scene />
                </Canvas>
            </div>

            <main>
                <VideoHero />
                <Hero />
                <ProductService />
                <BetterTomorrow />
                <Career />
                <MediaEvents />
                <Blog />
            </main>

            <Footer onOpenContact={() => setIsContactOpen(true)} />
        </div>
    )
}

export default App
