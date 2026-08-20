import React, { useState, useEffect, useCallback } from 'react';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import { propertyService } from '../services/api';
import { LayoutGrid, AlertCircle, RefreshCw } from 'lucide-react';

const Home = ({ favorites, onToggleFavorite }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination State
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    totalPages: 1
  });

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    property_type: 'all',
    priceRange: 'all',
    bedrooms: 'all',
    city: 'all',
    sort_by: 'newest',
    page: 1
  });

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertyService.getProperties(filters);
      setProperties(data.results || []);
      
      const totalCount = data.count || 0;
      const pageSize = 9; // set on backend
      const totalPages = Math.ceil(totalCount / pageSize);
      
      setPagination({
        count: totalCount,
        next: data.next,
        previous: data.previous,
        currentPage: filters.page,
        totalPages: totalPages || 1
      });
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Could not connect to the server. Please verify Django is running.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page on filter change
    }));
  };

  const handleSearchChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      property_type: 'all',
      priceRange: 'all',
      bedrooms: 'all',
      city: 'all',
      sort_by: 'newest',
      page: 1
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setFilters((prev) => ({
        ...prev,
        page: newPage
      }));
      // Scroll to property section
      document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Hero Banner Component */}
      <Hero searchValue={filters.search} onSearchChange={handleSearchChange} />

      {/* Main Exploration Section */}
      <section id="explore-section" className="explore-section container">
        <div className="explore-grid-layout">
          {/* Sidebar / Filter Header */}
          <div className="filter-sidebar">
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Listings Display Area */}
          <div className="listings-area">
            <div className="listings-info">
              <h2 className="section-heading flex-items-center">
                <LayoutGrid size={22} className="text-indigo-600" /> Explore Properties
              </h2>
              <span className="listing-count-badge">
                {loading ? 'Finding...' : `${pagination.count} Listings Available`}
              </span>
            </div>

            {/* Error state */}
            {error && (
              <div className="error-card glass animate-fade-in">
                <AlertCircle size={36} className="text-red-500" />
                <h3>Database Connection Required</h3>
                <p>{error}</p>
                <button onClick={fetchProperties} className="btn btn-primary mt-4 flex-items-center">
                  <RefreshCw size={16} /> Retry Connection
                </button>
              </div>
            )}

            {/* Empty list state */}
            {!loading && !error && properties.length === 0 && (
              <div className="empty-card glass animate-fade-in">
                <AlertCircle size={36} className="text-amber-500" />
                <h3>No Listings Found</h3>
                <p>We couldn't find any properties matching your current search criteria. Try modifying your filters or search term!</p>
                <button onClick={handleResetFilters} className="btn btn-secondary">
                  Reset Filters
                </button>
              </div>
            )}

            {/* Grid of properties (loading skeletons vs cards) */}
            <div className="properties-grid grid-responsive">
              {loading
                ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
                : properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
            </div>

            {/* Pagination Controls */}
            {!loading && !error && pagination.totalPages > 1 && (
              <div className="pagination-wrapper animate-fade-in">
                <button
                  disabled={!pagination.previous}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  className="btn btn-secondary page-btn"
                >
                  Previous
                </button>
                
                <span className="page-indicator">
                  Page <strong>{pagination.currentPage}</strong> of <strong>{pagination.totalPages}</strong>
                </span>

                <button
                  disabled={!pagination.next}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  className="btn btn-secondary page-btn"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
