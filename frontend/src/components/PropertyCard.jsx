import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Maximize } from 'lucide-react';

export const formatPrice = (price) => {
  const num = parseFloat(price);
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Crore`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
};

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const { id, name, property_type_display, price, location, city, bedrooms, bathrooms, area, images } = property;
  
  // Fallback if no images are provided
  const mainImage = images && images.length > 0 
    ? images[0].image_url 
    : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="property-card animate-fade-in">
      {/* Property Image & Badge */}
      <div className="card-image-wrapper">
        <img src={mainImage} alt={name} loading="lazy" className="card-image" />
        <div className="card-badge">
          {property_type_display}
        </div>
        
        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(id);
          }}
          className="favorite-btn"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            className={isFavorite ? 'heart-filled' : 'heart-empty-card'}
          />
        </button>
      </div>

      {/* Property Content */}
      <div className="card-content">
        <div className="card-header">
          <span className="card-price">{formatPrice(price)}</span>
        </div>
        
        <h3 className="card-title" title={name}>
          <Link to={`/property/${id}`}>{name}</Link>
        </h3>
        
        <div className="card-location">
          <MapPin size={14} className="pin-icon" />
          <span>{location}, {city}</span>
        </div>

        {/* Specs Details */}
        <div className="card-specs">
          {bedrooms > 0 && (
            <div className="spec-item">
              <Bed size={16} />
              <span>{bedrooms} BHK</span>
            </div>
          )}
          <div className="spec-item">
            <Bath size={16} />
            <span>{bathrooms} Bath</span>
          </div>
          <div className="spec-item">
            <Maximize size={16} />
            <span>{area} sqft</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-footer">
          <Link to={`/property/${id}`} className="btn btn-primary w-full view-details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
