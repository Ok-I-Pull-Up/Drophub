import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCube, FaDiscord } from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Funkcja zamykająca menu po kliknięciu
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <FaCube className="logo-icon" />
            Drop<span>Hub</span>
          </Link>
          
          <div 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <nav className={mobileMenuOpen ? 'active' : ''}>
            <ul>
              <li><Link to="/" onClick={closeMenu}>Strona główna</Link></li>
              <li><a href="#features" onClick={closeMenu}>O nas</a></li>
              <li><a href="#blog" onClick={closeMenu}>Blog</a></li>
              <li><a href="#newsletter" onClick={closeMenu}>Newsletter</a></li>
              <li><a href="https://discord.gg/Awx7TMy6UZ" className="join-btn" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                <FaDiscord /> Dołącz do nas
              </a></li>
            </ul>
          </nav>
          
          <a href="https://discord.gg/Awx7TMy6UZ" className="join-btn" target="_blank" rel="noopener noreferrer">
            <FaDiscord /> Dołącz do nas
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;