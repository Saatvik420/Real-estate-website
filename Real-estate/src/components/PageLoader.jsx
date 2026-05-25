import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageLoader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start the loading animation when path changes
    setIsVisible(true);
    setIsLoading(true);

    // Simulate network/render loading time (minimum 600ms for visual effect)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Wait for the fade-out CSS transition to finish before unmounting
      setTimeout(() => setIsVisible(false), 500); 
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div className={`page-loader ${isLoading ? 'loading' : 'done'}`}>
      <div className="loader-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="80" height="80">
          <defs>
            <linearGradient id="loadGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#C59B3C" />
              <stop offset="50%" stop-color="#F2DE92" />
              <stop offset="100%" stop-color="#A57A27" />
            </linearGradient>
            <linearGradient id="loadGoldSolid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#D4AF37" />
              <stop offset="100%" stop-color="#AA8C2C" />
            </linearGradient>
          </defs>
          <g>
            <path d="M50 0 L90 40 L90 100 L10 100 L10 40 Z" fill="none" stroke="url(#loadGoldGradient)" stroke-width="6" stroke-linejoin="round"/>
            <path d="M50 0 L50 100" fill="none" stroke="url(#loadGoldGradient)" stroke-width="2" opacity="0.5"/>
            <path d="M10 40 L90 40" fill="none" stroke="url(#loadGoldGradient)" stroke-width="2" opacity="0.5"/>
            <path d="M30 100 L30 60 L70 60 L70 100" fill="none" stroke="url(#loadGoldGradient)" stroke-width="5" stroke-linejoin="round"/>
            <text x="50" y="85" fontFamily="'Playfair Display', serif, sans-serif" fontSize="34" fontWeight="900" fill="url(#loadGoldSolid)" textAnchor="middle">15</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PageLoader;