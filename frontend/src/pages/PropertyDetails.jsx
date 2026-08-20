import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Maximize, Send, Phone, Mail, Award, Clock } from 'lucide-react';
import { propertyService } from '../services/api';
import PropertyCarousel from '../components/PropertyCarousel';
import { formatPrice } from '../components/PropertyCard';

const PropertyDetails = ({ onAddToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inquiry Form State
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property and would like to schedule a viewing.'
  });
  const [submitting, setSubmitting] = useState(false);

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await propertyService.getProperty(id);
        setProperty(data);
        addToRecentlyViewed(data);
      } catch (err) {
        console.error('Error fetching property details:', err);
        setError('Property not found or server is offline.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  // Load recently viewed from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    // Filter out the current property from the display list
    setRecentlyViewed(stored.filter(item => item.id !== parseInt(id)));
  }, [id]);

  const addToRecentlyViewed = (prop) => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    // Remove if already exists to push to front
    const filtered = stored.filter((item) => item.id !== prop.id);
    const mainImage = prop.images && prop.images.length > 0 ? prop.images[0].image_url : '';
    
    const newItem = {
      id: prop.id,
      name: prop.name,
      price: prop.price,
      city: prop.city,
      image: mainImage,
      type: prop.property_type_display
    };

    const updated = [newItem, ...filtered].slice(0, 4); // Keep last 4
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  const handleInquiryChange = (e) => {
    const { name, value } = e.target;
    setInquiry((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await propertyService.submitInquiry({
        property: property.id,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message
      });
      onAddToast('Inquiry sent successfully! The agent will contact you soon.', 'success');
      // Reset form fields
      setInquiry({
        name: '',
        email: '',
        phone: '',
        message: 'I am interested in this property and would like to schedule a viewing.'
      });
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      onAddToast('Failed to submit inquiry. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-loading container">
        <div className="skeleton skeleton-detail-carousel"></div>
        <div className="detail-loading-split">
          <div className="skeleton skeleton-detail-left"></div>
          <div className="skeleton skeleton-detail-right"></div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="detail-error container animate-fade-in">
        <h2>Listing Not Found</h2>
        <p>{error || "We couldn't retrieve the details for this property."}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary flex-items-center">
          <ArrowLeft size={16} /> Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="details-page animate-fade-in">
      <div className="container">
        {/* Back navigation */}
        <button onClick={() => navigate(-1)} className="back-btn flex-items-center">
          <ArrowLeft size={16} /> Back to Listings
        </button>

        {/* Carousel Banner */}
        <div className="details-carousel-section">
          <PropertyCarousel images={property.images} />
        </div>

        {/* Details Grid */}
        <div className="details-layout-grid">
          {/* Left Column: Details, Description, Specs, Amenities */}
          <div className="details-left-col">
            <div className="detail-header-card">
              <div className="detail-title-row">
                <span className="detail-type-badge">{property.property_type_display}</span>
                <span className="detail-price-badge">{formatPrice(property.price)}</span>
              </div>
              <h1 className="detail-title">{property.name}</h1>
              <div className="detail-address-row">
                <MapPin size={18} className="pin-icon" />
                <span>{property.address}</span>
              </div>
            </div>

            {/* Specifications Cards */}
            <div className="specs-flex-row">
              {property.bedrooms > 0 && (
                <div className="detail-spec-card">
                  <Bed size={22} className="spec-icon" />
                  <span className="spec-title">{property.bedrooms} BHK</span>
                  <span className="spec-subtitle">Bedrooms</span>
                </div>
              )}
              <div className="detail-spec-card">
                <Bath size={22} className="spec-icon" />
                <span className="spec-title">{property.bathrooms}</span>
                <span className="spec-subtitle">Bathrooms</span>
              </div>
              <div className="detail-spec-card">
                <Maximize size={22} className="spec-icon" />
                <span className="spec-title">{property.area} sqft</span>
                <span className="spec-subtitle">Total Area</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="detail-block-card">
              <h3>Property Description</h3>
              <p>{property.description}</p>
            </div>

            {/* Amenities Section */}
            <div className="detail-block-card">
              <h3>Key Amenities</h3>
              <div className="amenities-grid">
                {property.amenities && property.amenities.map((amenity, idx) => (
                  <div key={idx} className="amenity-badge">
                    <span className="bullet-dot"></span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Agent Sticky Card & Recently Viewed */}
          <div className="details-right-col">
            {/* Agent Card */}
            <div className="agent-sticky-card glass">
              <div className="agent-profile">
                <img 
                  src={property.agent.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"} 
                  alt={property.agent.name} 
                  className="agent-avatar"
                />
                <div className="agent-info">
                  <h4>{property.agent.name}</h4>
                  <p className="agent-company"><Award size={14} /> {property.agent.company}</p>
                </div>
              </div>

              <div className="agent-contact-details">
                <a href={`tel:${property.agent.phone}`} className="contact-link-row">
                  <Phone size={14} /> <span>{property.agent.phone}</span>
                </a>
                <a href={`mailto:${property.agent.email}`} className="contact-link-row">
                  <Mail size={14} /> <span>{property.agent.email}</span>
                </a>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleInquirySubmit} className="inquiry-form">
                <h5>Contact Agent</h5>
                
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={inquiry.name}
                  onChange={handleInquiryChange}
                  className="input-field"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={inquiry.email}
                  onChange={handleInquiryChange}
                  className="input-field"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={inquiry.phone}
                  onChange={handleInquiryChange}
                  className="input-field"
                />
                
                <textarea
                  name="message"
                  placeholder="Message details"
                  rows="3"
                  required
                  value={inquiry.message}
                  onChange={handleInquiryChange}
                  className="input-field textarea-field"
                ></textarea>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full submit-inquiry-btn"
                >
                  <Send size={16} /> {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>

            {/* Recently Viewed Sidebar Widget */}
            {recentlyViewed.length > 0 && (
              <div className="recently-viewed-sidebar glass">
                <h4 className="flex-items-center">
                  <Clock size={16} /> Recently Viewed
                </h4>
                <div className="recent-items-list">
                  {recentlyViewed.map((item) => (
                    <Link to={`/property/${item.id}`} key={item.id} className="recent-item-row">
                      <img src={item.image} alt={item.name} className="recent-item-img" />
                      <div className="recent-item-meta">
                        <span className="recent-item-name">{item.name}</span>
                        <span className="recent-item-price">{formatPrice(item.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
