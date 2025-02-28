import React, { useState, useEffect, useRef } from 'react';

const CryptoAnimations = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const btcRef = useRef(null);
  const ethRef = useRef(null);
  const dogeRef = useRef(null);
  const avaxRef = useRef(null);
  
  // Funkcja tworząca cząsteczki dla kryptowaluty
  const createParticles = (element, count = 15) => {
    if (!element) return;
    
    // Usuń istniejące cząsteczki
    const existingParticles = element.querySelectorAll('.crypto-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Dodaj nowe cząsteczki
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('crypto-particle');
      
      // Losowa pozycja wewnątrz okręgu
      const angle = Math.random() * Math.PI * 2;
      const radius = 100 * Math.sqrt(Math.random());
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      particle.style.left = `calc(50% + ${x}px)`;
      particle.style.top = `calc(50% + ${y}px)`;
      
      // Losowe właściwości animacji
      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200;
      const duration = 3 + Math.random() * 3;
      const delay = Math.random() * 5;
      
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.animation = `particle-animation ${duration}s ${delay}s infinite`;
      
      element.appendChild(particle);
    }
  };
  
  useEffect(() => {
    // Inicjalizacja cząsteczek dla każdej kryptowaluty z opóźnieniem
    setTimeout(() => {
      createParticles(btcRef.current);
      createParticles(ethRef.current);
      createParticles(dogeRef.current);
      createParticles(avaxRef.current);
      
      // Oznacz jako załadowane, aby rozpocząć animacje
      setIsLoaded(true);
    }, 300);
    
    // Czyszczenie po odmontowaniu komponentu
    return () => {
      // Nie potrzeba dodatkowego czyszczenia, React zajmie się usunięciem elementów
    };
  }, []);
  
  return (
    <div className={`crypto-animations ${isLoaded ? 'loaded' : ''}`} ref={containerRef}>
      {/* Bitcoin */}
      <div className="crypto-animation bitcoin-animation" style={{animationDelay: '0.1s'}} data-crypto="Bitcoin">
        <div className="crypto-circle btc-circle" ref={btcRef}>
          <div className="crypto-icon btc-icon"></div>
          <div className="crypto-hover-info">
            <h3>Bitcoin</h3>
            <p>Pierwsza i najpopularniejsza kryptowaluta na świecie</p>
          </div>
        </div>
      </div>
      
      {/* Ethereum */}
      <div className="crypto-animation eth-animation" style={{animationDelay: '0.5s'}} data-crypto="Ethereum">
        <div className="crypto-circle eth-circle" ref={ethRef}>
          <div className="crypto-icon eth-icon"></div>
          <div className="crypto-hover-info">
            <h3>Ethereum</h3>
            <p>Zdecentralizowana platforma z kontraktami smart</p>
          </div>
        </div>
      </div>
      
      {/* Dogecoin */}
      <div className="crypto-animation doge-animation" style={{animationDelay: '0.9s'}} data-crypto="Dogecoin">
        <div className="crypto-circle doge-circle" ref={dogeRef}>
          <div className="crypto-icon doge-icon"></div>
          <div className="crypto-hover-info">
            <h3>Dogecoin</h3>
            <p>Inspirowana memem kryptowaluta z oddaną społecznością</p>
          </div>
        </div>
      </div>
      
      {/* Avalanche */}
      <div className="crypto-animation avax-animation" style={{animationDelay: '1.3s'}} data-crypto="AVAX">
        <div className="crypto-circle avax-circle" ref={avaxRef}>
          <div className="crypto-icon avax-icon"></div>
          <div className="crypto-hover-info">
            <h3>Avalanche</h3>
            <p>Platforma blockchain znana z szybkości i efektywności</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoAnimations;