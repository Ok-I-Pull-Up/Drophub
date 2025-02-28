import React, { useEffect } from 'react';
import { FaCalendar, FaClock } from 'react-icons/fa';

const Blog = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.blog-card');
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        if (position.top < window.innerHeight - 150) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Uruchomienie przy załadowaniu
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blogPosts = [
    {
      image: '/images/placeholder-blog-1.jpg',
      category: 'Edukacja',
      title: 'Kryptowaluty dla początkujących - od czego zacząć?',
      description: 'Kompletny przewodnik dla osób stawiających pierwsze kroki w świecie kryptowalut i technologii blockchain.',
      date: '15.02.2023',
      readTime: '10 min czytania'
    },
    {
      image: '/images/placeholder-blog-2.jpg',
      category: 'Airdropy',
      title: 'Top 10 airdropów, na które warto czekać w 2023 roku',
      description: 'Przegląd najbardziej obiecujących airdropów nadchodzących w tym roku i jak się do nich przygotować.',
      date: '27.01.2023',
      readTime: '8 min czytania'
    },
    {
      image: '/images/placeholder-blog-3.jpg',
      category: 'Analiza',
      title: 'Analiza techniczna Bitcoin - co nas czeka w najbliższych miesiącach?',
      description: 'Szczegółowa analiza wykresów i prognoza cenowa dla Bitcoina na nadchodzące miesiące.',
      date: '03.02.2023',
      readTime: '12 min czytania'
    }
  ];

  return (
    <section className="blog" id="blog">
      <div className="container">
        <h2 className="section-title">
          Nasze <span>artykuły</span>
        </h2>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div className="blog-card fade-in" key={index}>
              <img 
                src={`https://via.placeholder.com/800x500?text=Blog+${index+1}`}
                alt={post.title} 
                className="blog-image" 
              />
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h3 className="blog-title">
                  <a href="/">{post.title}</a>
                </h3>
                <p className="blog-description">{post.description}</p>
                <div className="blog-meta">
                  <span>
                    <FaCalendar /> {post.date}
                  </span>
                  <span>
                    <FaClock /> {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;