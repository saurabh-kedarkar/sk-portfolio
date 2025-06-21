import React from 'react';
import '../../styles/pages/SkeletonCard.css'; // Create a CSS file for skeleton styles

const SkeletonCard = () => (
   <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
   </div>
);

export default SkeletonCard;