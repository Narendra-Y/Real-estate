import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="property-card-skeleton">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-location"></div>
        <div className="skeleton-specs">
          <div className="skeleton skeleton-spec-item"></div>
          <div className="skeleton skeleton-spec-item"></div>
          <div className="skeleton skeleton-spec-item"></div>
        </div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
