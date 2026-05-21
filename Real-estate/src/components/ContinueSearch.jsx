import React from 'react';

const ContinueSearch = () => {
  const lastSearches = [
    { icon: '🏢', title: '4 BHK Sea-Facing · Worli', meta: '₹8Cr–₹15Cr · 12 new results' },
    { icon: '🏠', title: 'Villas for Rent · Whitefield', meta: '₹80k–₹1.5L/mo · 7 new' },
    { icon: '🌍', title: 'Plots · Golf Course Ext.', meta: '₹4Cr–₹10Cr · 5 new listings' },
    { icon: '🏗', title: 'New Launch · Andheri West', meta: '₹3Cr–₹7Cr · 3 new projects' }
  ];

  return (
    <div className="continue-bar">
      <div className="continue-inner">
        <div className="continue-label">Continue Your Last Search</div>
        <div className="continue-cards">
          {lastSearches.map((search, index) => (
            <div key={index} className="continue-card">
              <div className="cc-icon">{search.icon}</div>
              <div className="cc-text">
                <div className="cc-title">{search.title}</div>
                <div className="cc-meta">{search.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueSearch;
