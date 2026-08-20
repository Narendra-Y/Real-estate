import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import { propertyService } from '../services/api';
import { Heart, Search, ChevronRight } from 'lucide-react';

const Favorites = ({ favorites, onToggleFavorite }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteProperties = async () => {
      if (!favorites || favorites.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        // Fetch details for all favorited property IDs concurrently
        const promises = favorites.map((id) => propertyService.getProperty(id));
        const results = await Promise.all(promises);
        setProperties(results);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorite properties.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProperties();
  }, [favorites]);

  return (
    <div className="favorites-page animate-fade-in container">
      <div className="favs-header-row">
        <h1 className="flex-items-center">
          <Heart className="heart-filled mr-2" size={28} /> My Saved Homes
        </h1>
        <p className="saved-count">
          {favorites.length} saved properties
        </p>
      </div>

      {loading ? (
        <div className="properties-grid grid-responsive">
          {Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)}
        </div>
      ) : error ? (
        <div className="error-card glass">
          <h3>Failed to Load Favorites</h3>
          <p>{error}</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="empty-card favs-empty-card glass">
          <div className="empty-icon-wrapper">
            <Heart size={40} className="heart-empty-big" />
          </div>
          <h3>Your Favorites List is Empty</h3>
          <p>Bookmark your favorite homes while browsing, and they will appear here so you can easily review them later.</p>
          <Link to="/" className="btn btn-primary mt-4 flex-items-center">
            Discover Properties <ChevronRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="properties-grid grid-responsive">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
