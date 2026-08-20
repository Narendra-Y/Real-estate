import React, { useState, useEffect } from 'react';
import { Filter, RotateCcw, Building, Home, Layout, Briefcase, DollarSign, Calendar, MapPin } from 'lucide-react';
import { propertyService } from '../services/api';

const SearchFilters = ({ filters, onFilterChange, onReset }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await propertyService.getCities();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const handleTypeChange = (type) => {
    onFilterChange('property_type', type);
  };

  const propertyTypes = [
    { value: 'all', label: 'All Types', icon: Layout },
    { value: 'apartment', label: 'Apartment', icon: Building },
    { value: 'villa', label: 'Villa', icon: Home },
    { value: 'independent_house', label: 'House', icon: Home },
    { value: 'commercial', label: 'Commercial', icon: Briefcase },
  ];

  return (
    <div className="filters-glass-card glass animate-fade-in">
      <div className="filters-header">
        <span className="filters-title flex-items-center">
          <Filter size={18} /> Filter Properties
        </span>
        <button onClick={onReset} className="reset-btn flex-items-center">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* 1. Property Type (Horizontal Tabs) */}
      <div className="filter-section">
        <label className="filter-label">Property Type</label>
        <div className="type-tabs-container">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = filters.property_type === type.value;
            return (
              <button
                key={type.value}
                onClick={() => handleTypeChange(type.value)}
                className={`type-tab ${isSelected ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="filters-grid">
        {/* 2. City Dropdown */}
        <div className="input-group">
          <label className="filter-label">City</label>
          <div className="select-wrapper">
            <select
              value={filters.city}
              onChange={(e) => onFilterChange('city', e.target.value)}
              className="input-field select-field"
            >
              <option value="all">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Price Range Dropdown */}
        <div className="input-group">
          <label className="filter-label">Price Range</label>
          <div className="select-wrapper">
            <select
              value={filters.priceRange}
              onChange={(e) => onFilterChange('priceRange', e.target.value)}
              className="input-field select-field"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under ₹50 Lakhs</option>
              <option value="50to100">₹50 Lakhs – ₹1 Crore</option>
              <option value="above100">Above ₹1 Crore</option>
            </select>
          </div>
        </div>

        {/* 4. Bedrooms Dropdown */}
        <div className="input-group">
          <label className="filter-label">Bedrooms</label>
          <div className="select-wrapper">
            <select
              value={filters.bedrooms}
              onChange={(e) => onFilterChange('bedrooms', e.target.value)}
              className="input-field select-field"
            >
              <option value="all">All Bedrooms</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4+">4+ BHK</option>
            </select>
          </div>
        </div>

        {/* 5. Sorting Dropdown */}
        <div className="input-group">
          <label className="filter-label">Sort By</label>
          <div className="select-wrapper">
            <select
              value={filters.sort_by}
              onChange={(e) => onFilterChange('sort_by', e.target.value)}
              className="input-field select-field"
            >
              <option value="newest">Newest Listings</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
