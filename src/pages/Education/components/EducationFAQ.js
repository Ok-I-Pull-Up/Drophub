import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const EducationFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqItems = [
    {
      question: "Czy kursy na DropHub są płatne?",
      answer: "Nie, wszystkie materiały edukacyjne na DropHub są całkowicie darmowe. Naszą misją jest szerzenie wiedzy o kryptowalutach i technologii blockchain w polskiej społeczności."
    },
    {
      question: "Jak zacząć naukę, jeśli jestem kompletnym nowicjuszem?",
      answer: "Zalecamy rozpoczęcie od kategorii \"Podstawy kryptowalut\", gdzie znajdziesz kursy przeznaczone specjalnie dla początkujących. Kurs \"Kryptowaluty dla początkujących\" jest idealnym miejscem do startu."
    },
    {
      question: "Czy mogę śledzić postępy w nauce?",
      answer: "Tak, po zarejestrowaniu się na naszej platformie możesz śledzić swoje postępy, oznaczać ukończone kursy i wracać do miejsc, w których przerwałeś naukę."
    },
    {
      question: "Jak często dodawane są nowe materiały edukacyjne?",
      answer: "Regularnie aktualizujemy naszą bibliotekę edukacyjną. Nowe kursy i materiały dodawane są średnio 2-3 razy w miesiącu, a istniejące treści są aktualizowane, gdy tylko pojawią się istotne zmiany."
    },
    {
      question: "Czy mogę zaproponować temat nowego kursu?",
      answer: "Oczywiście! Jesteśmy otwarci na propozycje od naszej społeczności. Możesz przesłać swoje sugestie poprzez formularz kontaktowy lub napisać do nas na Discordzie."
    }
  ];

  return (
    <section className="education-faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title fade-in">
            Często zadawane <span>pytania</span>
          </h2>
          <p className="section-description fade-in">
            Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych materiałów edukacyjnych
          </p>
        </div>
        
        <div className="faq-container fade-in">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleAccordion(index)}
              >
                <h3>{item.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationFAQ;