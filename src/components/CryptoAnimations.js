import React, { useState, useEffect, useRef } from 'react';

const CryptoAnimations = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Oznacz jako załadowane po krótkiej chwili, aby animacje zaczęły się płynnie
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);
  
  const createParticles = (ref, count = 12) => {
    if (!ref.current) return;
    
    const circle = ref.current;
    
    // Usuń istniejące cząsteczki
    const existingParticles = circle.querySelectorAll('.crypto-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Dodaj nowe cząsteczki
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('crypto-particle');
      
      // Losowa pozycja wewnątrz okręgu
      const angle = Math.random() * Math.PI * 2;
      const radius = 90 * Math.sqrt(Math.random());
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      particle.style.left = `calc(50% + ${x}px)`;
      particle.style.top = `calc(50% + ${y}px)`;
      
      // Losowe właściwości animacji
      const tx = (Math.random() - 0.5) * 180;
      const ty = (Math.random() - 0.5) * 180;
      const duration = 3 + Math.random() * 3;
      const delay = Math.random() * 5;
      
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.animation = `particle-animation ${duration}s ${delay}s infinite`;
      
      circle.appendChild(particle);
    }
  };
  
  // Referencje do elementów kryptowalut
  const btcRef = useRef(null);
  const ethRef = useRef(null);
  const dogeRef = useRef(null);
  const avaxRef = useRef(null);
  
  useEffect(() => {
    if (isLoaded) {
      // Inicjalizacja cząsteczek dla każdej kryptowaluty
      createParticles(btcRef);
      createParticles(ethRef);
      createParticles(dogeRef);
      createParticles(avaxRef);
    }
  }, [isLoaded]);
  
  return (
    <div className={`crypto-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Bitcoin - lewy górny róg */}
      <div className="crypto-animation btc-animation" data-crypto="Bitcoin">
        <div className="crypto-circle btc-circle" ref={btcRef}>
          <div className="crypto-icon btc-icon"></div>
          <div className="crypto-hover-info">
            <h3>Bitcoin</h3>
            <p>Pierwsza i najpopularniejsza kryptowaluta</p>
          </div>
        </div>
      </div>
      
      {/* Ethereum - prawy górny róg */}
      <div className="crypto-animation eth-animation" data-crypto="Ethereum">
        <div className="crypto-circle eth-circle" ref={ethRef}>
          <div className="crypto-icon eth-icon"></div>
          <div className="crypto-hover-info">
            <h3>Ethereum</h3>
            <p>Platforma z kontraktami smart</p>
          </div>
        </div>
      </div>
      
      {/* Dogecoin - lewy dolny róg */}
      <div className="crypto-animation doge-animation" data-crypto="Dogecoin">
        <div className="crypto-circle doge-circle" ref={dogeRef}>
          <div className="crypto-icon doge-icon"></div>
          <div className="crypto-hover-info">
            <h3>Dogecoin</h3>
            <p>Inspirowana memem kryptowaluta</p>
          </div>
        </div>
      </div>
      
      {/* Avalanche - prawy dolny róg */}
      <div className="crypto-animation avax-animation" data-crypto="AVAX">
        <div className="crypto-circle avax-circle" ref={avaxRef}>
          <div className="crypto-icon avax-icon"></div>
          <div className="crypto-hover-info">
            <h3>Avalanche</h3>
            <p>Szybka i efektywna platforma blockchain</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoAnimations;