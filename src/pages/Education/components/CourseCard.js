import React from 'react';
import { FaStar, FaRegClock, FaSignal, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const CourseCard = ({ course, featured = false }) => {
  const [bookmarked, setBookmarked] = React.useState(false);
  
  const toggleBookmark = (e) => {
    e.preventDefault();
    setBookmarked(!bookmarked);
  };
  
  return (
    <div className={`course-card fade-in ${featured ? 'featured-card' : ''}`}>
      <div className="course-image-container">
        <img 
          src={course.image} 
          alt={course.title} 
          className="course-image"
        />
        <button 
          className="bookmark-btn" 
          onClick={toggleBookmark}
          aria-label={bookmarked ? "Usuń z zapisanych" : "Zapisz kurs"}
        >
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
        <div className="course-category-badge">{course.category}</div>
      </div>
      <div className="course-content">
        <div className="course-meta">
          <div className="course-level">
            <FaSignal />
            <span>{course.level}</span>
          </div>
          <div className="course-duration">
            <FaRegClock />
            <span>{course.duration}</span>
          </div>
        </div>
        <h3 className="course-title">
          <a href={`/education/course/${course.id}`}>{course.title}</a>
        </h3>
        <p className="course-description">{course.description}</p>
        <div className="course-footer">
          <div className="course-author">
            <span>Autor: {course.author}</span>
          </div>
          <div className="course-rating">
            <FaStar className="star-icon" />
            <span>{course.rating}</span>
            <span className="reviews-count">({course.reviews})</span>
          </div>
        </div>
        <a href={`/education/course/${course.id}`} className="course-btn">
          Zobacz kurs
        </a>
      </div>
    </div>
  );
};

export default CourseCard;