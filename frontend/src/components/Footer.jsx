import React from 'react';
import { Home } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-glass">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-box-small">
                <Home size={16} />
              </div>
              <span className="logo-text-small">
                Apex<span className="accent-text">Realty</span>
              </span>
            </div>
            <p className="footer-description">
              Discover premium homes, luxury villas, and prime commercial spaces across India. Empowering your real estate journey with modern, fluid, and intuitive search platforms.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-column">
              <h4>Quick Links</h4>
              <a href="#">Explore Listings</a>
              <a href="#">Featured Homes</a>
              <a href="#">How it Works</a>
              <a href="#">Book Valuation</a>
            </div>
            
            <div className="footer-links-column">
              <h4>Popular Cities</h4>
              <a href="#">Mumbai Properties</a>
              <a href="#">Pune Residential</a>
              <a href="#">Bangalore Tech Hubs</a>
              <a href="#">Delhi Premium Suites</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} ApexRealty Group. All rights reserved.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
