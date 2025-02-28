import React, { useState, useEffect } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.newsletter-container');
      if (!element) return;
      
      const position = element.getBoundingClientRect();
      
      if (position.top < window.innerHeight - 150) {
        element.classList.add('active');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Uruchomienie przy załadowaniu
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Zapisano do newslettera:', email);
    setEmail('');
    alert('Dziękujemy za zapisanie się do newslettera!');
  };
  
  return (
    <section className="newsletter" id="newsletter">
      <div className="container">
        <div className="newsletter-container fade-in">
          <h2 className="newsletter-title">Zapisz się do newslettera</h2>
          <p className="newsletter-description">
            Bądź na bieżąco z najnowszymi informacjami, airdropami i analizami. 
            Nie przegap żadnej okazji!
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Twój adres e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="newsletter-btn">
              Zapisz się
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;