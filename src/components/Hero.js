import React from 'react';
import { FaDiscord, FaInfoCircle } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Odkryj świat <span>kryptowalut</span> z polską społecznością
          </h1>
          <p className="hero-description">
            DropHub to miejsce, gdzie entuzjaści kryptowalut spotykają się, by dzielić się wiedzą, 
            doświadczeniami i odkrywać nowe możliwości w świecie blockchain i kryptowalut.
          </p>
          <div className="hero-cta">
            <a href="https://discord.gg/Awx7TMy6UZ" className="join-btn" target="_blank" rel="noopener noreferrer">
              <FaDiscord /> Dołącz do nas
            </a>
            <a href="#features" className="secondary-btn">
              <FaInfoCircle /> Dowiedz się więcej
            </a>
          </div>
        </div>
      </div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
    </section>
  );
};

export default Hero;