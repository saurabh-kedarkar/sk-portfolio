import React from 'react';
import '../../styles/pages/NewsDetailModal.css'; // Create a CSS file for modal styles

const NewsDetailModal = ({ article, onClose }) => {
   if (!article) return null;

   return (
      <div className="modal-overlay" onClick={onClose}>
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={onClose}>Close</button>
            <h2>{article.title.split(' ').slice(0, 10).join(' ')}</h2>
            <img src={article.urlToImage} alt={article.title} />
            <p>{article.content || article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
         </div>
      </div>
   );
};

export default NewsDetailModal;