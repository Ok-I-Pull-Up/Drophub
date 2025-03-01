import React from 'react';
import { 
  FaBitcoin, 
  FaChartLine, 
  FaShieldAlt, 
  FaCode, 
  FaCoins, 
  FaHandHoldingUsd 
} from 'react-icons/fa';

const EducationCategories = () => {
  const categories = [
    {
      id: 'podstawy',
      title: 'Podstawy kryptowalut',
      description: 'Wprowadzenie do świata kryptowalut i blockchain dla początkujących.',
      icon: <FaBitcoin />,
      color: 'rgba(247, 147, 26, 0.15)',
      iconColor: '#f7931a'
    },
    {
      id: 'handel',
      title: 'Giełdy i handel',
      description: 'Jak handlować na giełdach kryptowalutowych i analizować rynek.',
      icon: <FaChartLine />,
      color: 'rgba(98, 126, 234, 0.15)',
      iconColor: '#627eea'
    },
    {
      id: 'bezpieczenstwo',
      title: 'Bezpieczeństwo',
      description: 'Ochrona inwestycji i zabezpieczanie portfeli kryptowalutowych.',
      icon: <FaShieldAlt />,
      color: 'rgba(232, 65, 66, 0.15)',
      iconColor: '#e84142'
    },
    {
      id: 'technologia',
      title: 'Technologia blockchain',
      description: 'Głębsze zrozumienie technologii stojącej za kryptowalutami.',
      icon: <FaCode />,
      color: 'rgba(49, 151, 149, 0.15)',
      iconColor: '#319795'
    },
    {
      id: 'altcoiny',
      title: 'Altcoiny i tokeny',
      description: 'Przegląd alternatywnych monet i tokenów w ekosystemie crypto.',
      icon: <FaCoins />,
      color: 'rgba(128, 90, 213, 0.15)',
      iconColor: '#805ad5'
    },
    {
      id: 'inwestowanie',
      title: 'Inwestowanie i strategie',
      description: 'Długoterminowe strategie inwestycyjne i zarządzanie portfelem.',
      icon: <FaHandHoldingUsd />,
      color: 'rgba(72, 187, 120, 0.15)',
      iconColor: '#48bb78'
    }
  ];

  return (
    <section className="education-categories">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title fade-in">
            Kategorie <span>kursów</span>
          </h2>
          <p className="section-description fade-in">
            Wybierz kategorię, która Cię interesuje i rozpocznij naukę
          </p>
        </div>
        
        <div className="categories-grid">
          {categories.map(category => (
            <a 
              href={`/edukacja/kategoria/${category.id}`} 
              className="category-card fade-in" 
              key={category.id}
              style={{
                background: `linear-gradient(135deg, ${category.color}, rgba(26, 32, 44, 0.7))`
              }}
            >
              <div 
                className="category-icon" 
                style={{ color: category.iconColor }}
              >
                {category.icon}
              </div>
              <h3 className="category-title">{category.title}</h3>
              <p className="category-description">{category.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationCategories;