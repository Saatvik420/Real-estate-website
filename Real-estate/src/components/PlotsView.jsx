import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';
import LeadFormModal from './LeadFormModal';

const PlotsView = () => {
  const { 
    selectedCity, plots, setView,
    setSelectedProperty, comparisonList, setComparisonList
  } = useApp();
  const [filteredPlots, setFilteredPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlot, setActivePlot] = useState(null);
  const navigate = useNavigate();

  // Local filter state for sidebar
  const [filters, setFilters] = useState({
    cityId: selectedCity === 'India' ? 'All' : selectedCity.toLowerCase(),
    zone: 'Any Zone',
    priceRange: 'Any Price'
  });

  const plotCities = [
    { id: 'All', name: 'All Cities' },
    { id: 'jaipur', name: 'Jaipur' },
    { id: 'khatu_shyam', name: 'Khatu Shyam' },
    { id: 'noida', name: 'Noida' },
    { id: 'greater_noida', name: 'Greater Noida' },
    { id: 'dehradun', name: 'Dehradun' },
    { id: 'haridwar', name: 'Haridwar' }
  ];

  useEffect(() => {
    const fetchPlots = async () => {
      setLoading(true);
      const res = await apiService.getProperties({
        cityId: selectedCity,
        listingType: 'Plots / Land'
      });
      
      if (res.success) {
        let results = [...res.data];
        
        if (filters.zone !== 'Any Zone') {
          results = results.filter(p => p.zone === filters.zone);
        }
        if (filters.priceRange !== 'Any Price') {
          if (filters.priceRange === 'Below ₹ 1 Cr') {
            results = results.filter(p => p.price < 10000000);
          } else if (filters.priceRange === '₹ 1 Cr - ₹ 3 Cr') {
            results = results.filter(p => p.price >= 10000000 && p.price <= 30000000);
          } else if (filters.priceRange === 'Above ₹ 3 Cr') {
            results = results.filter(p => p.price > 30000000);
          }
        }
        setFilteredPlots(results);
      }
      setLoading(false);
    };
    fetchPlots();
    window.scrollTo(0, 0);
  }, [filters, selectedCity]);

  const handlePropertyClick = (id) => {
    setSelectedProperty(id);
    setView('details');
    navigate('/details');
  };

  const handleContactClick = (plot) => {
    setActivePlot(plot);
    setIsModalOpen(true);
  };

  const handleLeadSuccess = () => {
    setIsModalOpen(false);
    alert('Thank you! Our land specialist will contact you shortly.');
  };

  const clearFilters = () => {
    setFilters({ cityId: 'All', zone: 'Any Zone', priceRange: 'Any Price' });
  };

  if (loading) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '100px 0' }}>
        <div className="loader-dots">
          <span></span><span></span><span></span>
        </div>
        <h2 style={{ marginTop: '20px', color: 'var(--muted)' }}>Analyzing land opportunities...</h2>
      </div>
    );
  }

  return (
    <div className="section-full rec-bg reveal" style={{ minHeight: '80vh' }}>
      <div className="section-inner">
        <div className="sec-header">
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Premium <span>Plots & Land</span></h2>
            <p className="sec-sub">Verified residential, commercial and agricultural land nationwide</p>
          </div>
        </div>

        <div className="results-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-header-row">
              <span className="filter-h" style={{ marginBottom: 0 }}>Filters</span>
              <button className="filter-clear-btn" onClick={clearFilters}>Clear All</button>
            </div>

            <div className="filter-sec">
              <span className="filter-h-sm">Location</span>
              <div className="filter-group">
                <select 
                  className="filter-select-box"
                  value={filters.cityId}
                  onChange={(e) => setFilters({...filters, cityId: e.target.value})}
                >
                  {plotCities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-sec">
              <span className="filter-h-sm">Land Zone</span>
              <div className="filter-group">
                {['Any Zone', 'Residential', 'Commercial', 'Agricultural', 'Industrial'].map(z => (
                  <label key={z} className="filter-opt">
                    <input 
                      type="radio" 
                      name="zone" 
                      checked={filters.zone === z}
                      onChange={() => setFilters({...filters, zone: z})}
                    />
                    {z}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-sec" style={{ borderBottom: 'none' }}>
              <span className="filter-h-sm">Budget Range</span>
              <div className="filter-group">
                <select 
                  className="filter-select-box"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                >
                  <option>Any Price</option>
                  <option>Below ₹ 1 Cr</option>
                  <option>₹ 1 Cr - ₹ 3 Cr</option>
                  <option>Above ₹ 3 Cr</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="results-main">
            <div className="results-top-bar">
              <div className="results-count">Found <strong>{filteredPlots.length}</strong> premium listings</div>
            </div>

            {filteredPlots.length === 0 ? (
              <div className="no-results-card">
                <div className="no-res-icon">🏜️</div>
                <h3>No matching plots found</h3>
                <p>Try broadening your filters or choosing a different city.</p>
                <button className="nav-btn-solid" onClick={clearFilters} style={{ marginTop: '20px' }}>Reset All Filters</button>
              </div>
            ) : (
              <div className="rec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))', gap: '24px' }}>
                {filteredPlots.map(plot => {
                  const isComparing = comparisonList.includes(plot.id);
                  
                  return (
                    <div key={plot.id} className="prop-card" onClick={() => handlePropertyClick(plot.id)}>
                      <div className="pc-img" style={{ backgroundImage: `url('${plot.img}')` }}>
                        <span className="pc-status status-nl">{plot.zone}</span>
                        <div className="pc-save" onClick={(e) => e.stopPropagation()}>♡</div>
                      </div>
                      <div className="pc-body">
                        <div className="pc-dev">{plot.developer}</div>
                        <div className="pc-name">{plot.title}</div>
                        <div className="pc-loc">📍 {plot.location}</div>
                        
                        <div className="pc-tags" style={{ margin: '12px 0' }}>
                          <span className="pc-tag" style={{ background: 'var(--gold4)', color: 'var(--ink)' }}>{plot.area}</span>
                          <span className="pc-tag">{plot.status}</span>
                        </div>

                        <div className="pc-footer">
                          <div className="pc-price">
                            {plot.priceStr}
                            <small>{plot.pricePerUnit}</small>
                          </div>
                          <button 
                            className={`pc-enq ${isComparing ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isComparing) {
                                setComparisonList(prev => prev.filter(id => id !== plot.id));
                              } else {
                                if (comparisonList.length < 3) {
                                  setComparisonList(prev => [...prev, plot.id]);
                                } else {
                                  alert("You can only compare up to 3 properties.");
                                }
                              }
                            }}
                          >
                            {isComparing ? 'Comparing' : 'Compare'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      <LeadFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleLeadSuccess}
        title="Enquire About Land"
        subtitle={`Interested in ${activePlot?.title}?`}
      />
    </div>
  );
};

export default PlotsView;
