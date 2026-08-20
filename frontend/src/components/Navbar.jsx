import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Heart, Menu, X, Home } from 'lucide-react';

const Navbar = ({ favoritesCount }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-glass">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-box">
            <Home size={20} />
          </div>
          <span className="logo-text">
            Apex<span className="accent-text">Realty</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu-desktop">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Explore
          </Link>
          <Link
            to="/favorites"
            className={`nav-link fav-link ${isActive('/favorites') ? 'active' : ''}`}
          >
            <Heart
              size={16}
              className={favoritesCount > 0 ? 'heart-filled' : 'heart-empty'}
            />
            Favorites
            {favoritesCount > 0 && (
              <span className="badge-count">
                {favoritesCount}
              </span>
            )}
          </Link>
          
          <div className="divider"></div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-btn"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* Mobile Control Buttons */}
        <div className="navbar-menu-mobile-controls">
          <button
            onClick={toggleTheme}
            className="theme-btn-mobile"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="menu-toggle-btn"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="navbar-menu-mobile-dropdown">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Explore Listings
          </Link>
          <Link
            to="/favorites"
            onClick={() => setIsOpen(false)}
            className={`mobile-nav-link mobile-fav-link ${isActive('/favorites') ? 'active' : ''}`}
          >
            <span className="fav-label">
              <Heart size={16} className={favoritesCount > 0 ? 'heart-filled' : 'heart-empty'} />
              Favorites
            </span>
            {favoritesCount > 0 && (
              <span className="badge-count-mobile">
                {favoritesCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
