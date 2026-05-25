import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const PropertyRecommendations = () => {
  const { 
    selectedCity, selectedState, states, 
    setView, setSelectedProperty,
    comparisonList, setComparisonList,
    setSearchFilters
  } = useApp();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const locationId = selectedCity !== 'India' ? selectedCity : selectedState;
      const locationType = selectedCity !== 'India' ? 'city' : (selectedState ? 'state' : 'city');
      
      const res = await apiService.getRecommendedProperties(locationId, locationType);
      if (res.success) {
          // For recommendations, we limit to 4 items on the homepage
          setProperties(res.data.slice(0, 4));
      }
      setLoading(false);
    };
    fetchRecommendations();
  }, [selectedCity, selectedState]);

  const toggleSave = (id) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, saved: !p.saved } : p
    ));
  };

  const handlePropertyClick = (id) => {
    setSelectedProperty(id);
    setView('details');
    navigate('/details');
  };

  const locationName = selectedCity !== 'India' ? selectedCity : (states.find(s => s.id === selectedState)?.name || 'India');

  if (loading) return null;

  const handleViewAll = () => {
    setSearchFilters(prev => ({ 
      ...prev, 
      listingType: 'Buy',
      featuredOnly: true 
    }));
  };

  return (
    <div className="section-full reveal rec-bg reveal">
      <div className="section-inner">
        <div className="sec-header">
          <div>
            <div className="eyebrow">Curated for You</div>
            <h2 className="sec-title">Recommended <span>Properties</span> in <span>{locationName}</span></h2>
            <p className="sec-sub" style={{ marginBottom: 0 }}>Based on your regional luxury search preferences</p>
          </div>
          <Link className="view-all" to="/results" onClick={handleViewAll}>View All Shortlisted →</Link>
        </div>
        <div className="rec-grid">
          {properties.map(prop => (
            <div key={prop.id} className="prop-card" onClick={() => handlePropertyClick(prop.id)}>
              <div className="pc-img" style={{ backgroundImage: `url('${prop.img}')` }}>
                <span className={`pc-status status-nl`}>{prop.status}</span>
                <div 
                  className="pc-save" 
                  onClick={(e) => { e.stopPropagation(); toggleSave(prop.id); }}
                  style={{ color: prop.saved ? 'var(--red)' : 'inherit' }}
                >
                  {prop.saved ? '♥' : '♡'}
                </div>
              </div>
              <div className="pc-body">
                <div className="pc-dev">{prop.developer}</div>
                <div className="pc-name">{prop.title}</div>
                <div className="pc-loc">📍 {prop.location}</div>
                <div className="pc-tags">
                  {prop.tags.map((tag, i) => <span key={i} className="pc-tag">{tag}</span>)}
                  <span className="pc-tag" style={{ background: 'var(--ink)', color: '#fff' }}>{prop.type}</span>
                </div>
                
                <div className="pc-footer">
                  <div className="pc-price">{prop.priceStr}<small>{prop.area}</small></div>
                  <button 
                    className={`pc-enq ${comparisonList.includes(prop.id) ? 'active' : ''}`} 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (comparisonList.includes(prop.id)) {
                        setComparisonList(prev => prev.filter(id => id !== prop.id));
                      } else {
                        if (comparisonList.length < 3) {
                          setComparisonList(prev => [...prev, prop.id]);
                        } else {
                          alert("You can only compare up to 3 properties.");
                        }
                      }
                    }}
                  >
                    {comparisonList.includes(prop.id) ? 'Comparing' : 'Compare'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyRecommendations;
