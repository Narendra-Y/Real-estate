import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="carousel-empty">
        <img 
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80" 
          alt="Placeholder Property" 
          className="carousel-image-fallback"
        />
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      {/* Main Image */}
      <div className="carousel-slide">
        <img 
          src={images[currentIndex].image_url} 
          alt={`Property Image ${currentIndex + 1}`} 
          className="carousel-image"
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button onClick={handlePrev} className="carousel-arrow arrow-left" aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNext} className="carousel-arrow arrow-right" aria-label="Next image">
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyCarousel;
