import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Blog from './components/Blog';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Education from './pages/Education/Education';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Blog />
              <Newsletter />
            </>
          } />
          <Route path="/edukacja" element={<Education />} />
          {/* Dodatkowe ścieżki można dodać tutaj */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;