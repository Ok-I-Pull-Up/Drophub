import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Blog from './components/Blog';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CryptoAnimations from './components/CryptoAnimations';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <CryptoAnimations /> {/* Dodane poza sekcjami treści */}
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Blog />
              <Newsletter />
            </>
          } />
          {/* Dodatkowe ścieżki można dodać tutaj */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;