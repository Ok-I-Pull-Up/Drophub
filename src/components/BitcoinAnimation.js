import React, { useEffect, useRef } from 'react';

const BitcoinAnimation = () => {
  const circleRef = useRef(null);
  
  useEffect(() => {
    if (!circleRef.current) return;
    
    const circle = circleRef.current;
    
    // Tworzenie cząsteczek
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('bitcoin-particle');
      
      // Losowa pozycja wewnątrz okręgu
      const angle = Math.random() * Math.PI * 2;
      const radius = 120 * Math.sqrt(Math.random());
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
      
      circle.appendChild(particle);
    }
    
    // Czyszczenie po odmontowaniu komponentu
    return () => {
      const particles = circle.querySelectorAll('.bitcoin-particle');
      particles.forEach(particle => particle.remove());
    };
  }, []);
  
  return (
    <div className="bitcoin-animation">
      <div className="bitcoin-circle" ref={circleRef}>
        <div className="bitcoin-symbol">₿</div>
      </div>
    </div>
  );
};

export default BitcoinAnimation;