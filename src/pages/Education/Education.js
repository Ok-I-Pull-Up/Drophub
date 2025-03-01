import React, { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import EducationHeader from './components/EducationHeader';
import CourseCard from './components/CourseCard';
import EducationCategories from './components/EducationCategories';
import EducationFAQ from './components/EducationFAQ';
import './Education.css';

const Education = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Animation on scroll for elements
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        if (position.top < window.innerHeight - 100) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    setTimeout(handleScroll, 200);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample featured courses data
  const featuredCourses = [
    {
      id: 1,
      title: 'Kryptowaluty dla początkujących',
      description: 'Kompletny przewodnik dla osób, które dopiero zaczynają swoją przygodę z kryptowalutami.',
      level: 'Początkujący',
      duration: '2 godziny',
      rating: 4.8,
      reviews: 134,
      image: 'https://via.placeholder.com/400x250?text=Kurs+Podstawy',
      author: 'Mateusz Kowalski',
      category: 'podstawy'
    },
    {
      id: 2,
      title: 'Handel na giełdach kryptowalut',
      description: 'Naucz się skutecznie handlować na popularnych giełdach kryptowalutowych.',
      level: 'Średniozaawansowany',
      duration: '3 godziny',
      rating: 4.6,
      reviews: 98,
      image: 'https://via.placeholder.com/400x250?text=Kurs+Handel',
      author: 'Anna Nowak',
      category: 'handel'
    },
    {
      id: 3,
      title: 'Bezpieczeństwo portfeli kryptowalutowych',
      description: 'Jak zabezpieczyć swoje kryptowaluty przed hakerami i oszustami.',
      level: 'Średniozaawansowany',
      duration: '1.5 godziny',
      rating: 4.9,
      reviews: 156,
      image: 'https://via.placeholder.com/400x250?text=Kurs+Bezpieczeństwo',
      author: 'Piotr Wiśniewski',
      category: 'bezpieczenstwo'
    }
  ];

  // Sample latest courses
  const latestCourses = [
    {
      id: 4,
      title: 'Smart kontrakty na Ethereum',
      description: 'Wprowadzenie do tworzenia i używania smart kontraktów w sieci Ethereum.',
      level: 'Zaawansowany',
      duration: '4 godziny',
      rating: 4.7,
      reviews: 87,
      image: 'https://via.placeholder.com/400x250?text=Kurs+Smart+Kontrakty',
      author: 'Kamil Adamski',
      category: 'technologia'
    },
    {
      id: 5,
      title: 'DeFi - zdecentralizowane finanse',
      description: 'Wszystko co musisz wiedzieć o ekosystemie DeFi i jego potencjale.',
      level: 'Średniozaawansowany',
      duration: '2.5 godziny',
      rating: 4.5,
      reviews: 65,
      image: 'https://via.placeholder.com/400x250?text=Kurs+DeFi',
      author: 'Joanna Dąbrowska',
      category: 'inwestowanie'
    },
    {
      id: 6,
      title: 'NFT - sztuka i kolekcjonerstwo',
      description: 'Jak tworzyć, kupować i sprzedawać tokeny NFT w świecie sztuki cyfrowej.',
      level: 'Początkujący',
      duration: '2 godziny',
      rating: 4.4,
      reviews: 42,
      image: 'https://via.placeholder.com/400x250?text=Kurs+NFT',
      author: 'Marcin Kowalczyk',
      category: 'technologia'
    }
  ];

  return (
    <div className="education-page">
      <EducationHeader />
      
      {/* Search and filters */}
      <section className="education-search">
        <div className="container">
          <div className="search-container fade-in">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Szukaj kursów, materiałów..." 
                className="search-input"
              />
            </div>
            <div className="search-filters">
              <select className="filter-select">
                <option value="">Poziom</option>
                <option value="beginner">Początkujący</option>
                <option value="intermediate">Średniozaawansowany</option>
                <option value="advanced">Zaawansowany</option>
              </select>
              <select className="filter-select">
                <option value="">Kategoria</option>
                <option value="basics">Podstawy</option>
                <option value="trading">Handel</option>
                <option value="security">Bezpieczeństwo</option>
                <option value="technology">Technologia</option>
                <option value="investing">Inwestowanie</option>
              </select>
              <select className="filter-select">
                <option value="">Czas trwania</option>
                <option value="short">{'<'} 1 godzina</option>
                <option value="medium">1-3 godziny</option>
                <option value="long">{'>'} 3 godziny</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories section */}
      <EducationCategories />
      
      {/* Featured courses */}
      <section className="featured-courses">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title fade-in">
              Polecane <span>kursy</span>
            </h2>
            <p className="section-description fade-in">
              Najlepsze kursy wybrane przez naszych ekspertów, idealne aby rozpocząć naukę.
            </p>
          </div>
          
          <div className="courses-grid">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} featured={true} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest courses */}
      <section className="latest-courses">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title fade-in">
              Najnowsze <span>materiały</span>
            </h2>
            <p className="section-description fade-in">
              Świeża porcja wiedzy na temat aktualnych trendów i technologii.
            </p>
          </div>
          
          <div className="courses-grid">
            {latestCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <EducationFAQ />
    </div>
  );
};

export default Education;