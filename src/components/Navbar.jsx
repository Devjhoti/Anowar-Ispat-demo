import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ onOpenContact }) => {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLightMode, setIsLightMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('themeMode');
        if (savedTheme === 'dark') {
            setIsLightMode(false);
            document.body.classList.remove('light-mode');
        } else {
            setIsLightMode(true);
            document.body.classList.add('light-mode');
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isLightMode;
        setIsLightMode(newMode);
        document.body.classList.toggle('light-mode', newMode);
        localStorage.setItem('themeMode', newMode ? 'light' : 'dark');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Product & Service', href: '#product-service' },
        { name: 'Better Tomorrow', href: '#better-tomorrow' },
        { name: 'Why Choose Us?', href: '#why-choose-us' },
        { name: 'Media & Events', href: '#media-events' },
        { name: 'Blog', href: '#blog' }
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
                <div className="nav-container">
                    {/* Logo */}
                    <div className="nav-logo">
                        <a href="#">
                            <img src="/Logo.png" alt="Anwar Ispat Logo" style={{ height: 'clamp(30px, 5vw, 50px)', objectFit: 'contain' }} />
                        </a>
                    </div>

                    {/* Desktop Links */}
                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="nav-link"
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Right Side Tools */}
                    <div className="nav-tools">
                        <button
                            className="icon-btn"
                            onClick={toggleTheme}
                            aria-label="Toggle Theme"
                        >
                            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <div className={`search-container ${searchOpen ? 'open' : ''}`}>
                            <button
                                className="icon-btn"
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Toggle Search"
                            >
                                <Search size={20} />
                            </button>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search..."
                                style={{
                                    width: searchOpen ? '150px' : '0',
                                    opacity: searchOpen ? 1 : 0,
                                    pointerEvents: searchOpen ? 'all' : 'none'
                                }}
                            />
                        </div>

                        <button onClick={onOpenContact} className="nav-contact-btn" style={{ cursor: 'pointer', border: 'none' }}>
                            CONTACT
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            className="mobile-toggle icon-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-links">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="mobile-link"
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div style={{ marginTop: '2rem' }}>
                        <a
                            href="#contact"
                            className="nav-contact-btn"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ display: 'inline-block' }}
                        >
                            CONTACT
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
