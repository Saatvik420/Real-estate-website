import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const TrendingSection = () => {
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
    const fetchTrending = async () => {
      setLoading(true);
      const locationId = selectedCity !== 'India' ? selectedCity : selectedState;
      const locationType = selectedCity !== 'India' ? 'city' : (selectedState ? 'state' : 'city');
      
      const res = await apiService.getRecommendedProperties(locationId, locationType);
      if (res.success) {
          // For trending, we limit to 4 items on the homepage
          setProperties(res.data.slice(0, 4));
      }
      setLoading(false);
    };
    fetchTrending();
  }, [selectedCity, selectedState]);

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
      trendingOnly: true 
    }));
  };

  return (
    <div className="section-full reveal trending-sec reveal">
      <div className="section-inner">
        <div className="sec-header">
          <div>
            <div className="eyebrow">🔥 Live Activity</div>
            <h2 className="sec-title">Trending Right Now in <span>{locationName}</span></h2>
          </div>
          <Link className="view-all" to="/results" onClick={handleViewAll}>See All Trending →</Link>
        </div>
        <div className="trend-grid">
          {properties.map((prop, index) => (
            <div key={index} className="trend-card" onClick={() => handlePropertyClick(prop.id)}>
              <div className="tc-img" style={{ backgroundImage: `url('${prop.img}')` }}>
                <span className={`tc-badge badge-hot`}>🔥 Hot</span>
              </div>
              <div className="tc-body">
                <div className="tc-name">{prop.title}</div>
                <div className="tc-loc">📍 {prop.location}, {prop.cityId}</div>
                
                <div className="tc-bottom">
                  <div className="tc-price">{prop.priceStr}</div>
                  <button 
                    className={`pc-enq ${comparisonList.includes(prop.id) ? 'active' : ''}`} 
                    style={{ padding: '4px 12px', fontSize: '11px', height: 'auto' }}
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

export default TrendingSection;
