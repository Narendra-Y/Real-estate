import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

function App() {
  // Favorites State (load from localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Toasts State for custom notifications
  const [toasts, setToasts] = useState([]);

  // Sync favorites with localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (id) => {
    const propertyId = parseInt(id);
    setFavorites((prev) => {
      const isAlreadyFav = prev.includes(propertyId);
      if (isAlreadyFav) {
        handleAddToast('Property removed from favorites', 'info');
        return prev.filter((favId) => favId !== propertyId);
      } else {
        handleAddToast('Property added to favorites!', 'success');
        return [...prev, propertyId];
      }
    });
  };

  const handleAddToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      handleRemoveToast(id);
    }, 3000);
  };

  const handleRemoveToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const renderToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} className="text-emerald-500" />;
      case 'error':
        return <AlertTriangle size={18} className="text-red-500" />;
      case 'info':
      default:
        return <Info size={18} className="text-indigo-500" />;
    }
  };

  return (
    <Router>
      <div className="app-layout">
        {/* Navigation Bar */}
        <Navbar favoritesCount={favorites.length} />

        {/* Page Content routing */}
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  favorites={favorites} 
                  onToggleFavorite={handleToggleFavorite} 
                />
              } 
            />
            <Route 
              path="/property/:id" 
              element={
                <PropertyDetails 
                  onAddToast={handleAddToast} 
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  favorites={favorites} 
                  onToggleFavorite={handleToggleFavorite} 
                />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast Notifications Overlay */}
        {toasts.length > 0 && (
          <div className="toast-container">
            {toasts.map((toast) => (
              <div key={toast.id} className={`toast ${toast.type}`}>
                {renderToastIcon(toast.type)}
                <span className="toast-message">{toast.message}</span>
                <button 
                  onClick={() => handleRemoveToast(toast.id)} 
                  className="toast-close-btn"
                  aria-label="Close notification"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
