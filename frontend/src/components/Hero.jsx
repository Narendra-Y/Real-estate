import React from 'react';
import { Search, MapPin } from 'lucide-react';

const Hero = ({ searchValue, onSearchChange }) => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <h1 className="hero-title">
          Find Your <span className="gradient-text">Dream Space</span> in India
        </h1>
        <p className="hero-subtitle">
          Explore premium villas, coastal penthouses, smart studios, and boutique commercial properties with ease.
        </p>

        <div className="search-bar-container glass">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by name, city, or location..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="search-action-btn">
            Find Properties
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Properties Listed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Cities Covered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
