import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const SearchResults = () => {
  const { 
    selectedCity, searchFilters, setSearchFilters, 
    setView, setSelectedProperty, comparisonList, setComparisonList 
  } = useApp();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const res = await apiService.getProperties({
        cityId: selectedCity,
        ...searchFilters
      });
      if (res.success) {
          setProperties(res.data);
      }
      setLoading(false);
    };
    fetchResults();
    window.scrollTo(0, 0);
  }, [selectedCity, searchFilters]);

  const handlePropertyClick = (id) => {
    setSelectedProperty(id);
    setView('details');
    navigate('/details');
  };

  const clearFilters = () => {
    setSearchFilters({
      type: 'Any Type',
      budget: 'Any Budget',
      bhk: 'Any BHK',
      status: 'Any Status'
    });
  };

  if (loading) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '100px 0' }}>
        <div className="loader-dots">
          <span></span><span></span><span></span>
        </div>
        <h2 style={{ marginTop: '20px', color: 'var(--muted)' }}>Scanning the market for excellence...</h2>
      </div>
    );
  }

  return (
    <div className="section-full rec-bg reveal" style={{ minHeight: '80vh' }}>
      <div className="section-inner">
        <div className="sec-header">
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Premium <span>Search Results</span></h2>
            <p className="sec-sub">Discover curated properties in <strong>{selectedCity === 'India' ? 'All India' : selectedCity}</strong></p>
          </div>
          {properties.length > 0 && (
            <button className="nav-btn-ghost" onClick={clearFilters}>Clear Filters</button>
          )}
        </div>

        <div className="results-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px', alignItems: 'start' }}>
          {/* Sidebar Filters */}
          <aside className="filters-sidebar" style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid var(--cream3)', position: 'sticky', top: '100px' }}>
            <div className="filter-sec" style={{ marginBottom: '32px' }}>
              <span className="filter-h-sm" style={{ display: 'block', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Property Type</span>
              <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Any Type', 'Luxury Apartment', 'Independent Villa', 'Penthouse', 'Premium Plot'].map(type => (
                  <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                    <input 
                      type="radio" 
                      name="propType" 
                      checked={searchFilters.type === type}
                      onChange={() => setSearchFilters({...searchFilters, type})}
                      style={{ accentColor: 'var(--gold)' }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-sec" style={{ marginBottom: '32px' }}>
              <span className="filter-h-sm" style={{ display: 'block', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>BHK Configuration</span>
              <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Any BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'].map(bhk => (
                  <label key={bhk} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                    <input 
                      type="radio" 
                      name="bhk" 
                      checked={searchFilters.bhk === bhk}
                      onChange={() => setSearchFilters({...searchFilters, bhk})}
                      style={{ accentColor: 'var(--gold)' }}
                    />
                    {bhk}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-sec">
              <span className="filter-h-sm" style={{ display: 'block', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Possession Status</span>
              <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Any Status', 'Ready to Move', 'Under Construction', 'New Launch'].map(status => (
                  <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
                    <input 
                      type="radio" 
                      name="status" 
                      checked={searchFilters.status === status}
                      onChange={() => setSearchFilters({...searchFilters, status})}
                      style={{ accentColor: 'var(--gold)' }}
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main>
            {properties.length === 0 ? (
              <div className="no-results" style={{ textAlign: 'center', padding: '100px 0', background: '#fff', borderRadius: '16px', border: '1px dotted var(--gold)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏙️</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '10px' }}>No Exclusive Properties Found</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>Try adjusting your filters or search for a different region.</p>
                <button className="nav-btn-solid" onClick={clearFilters}>Reset All Filters</button>
              </div>
            ) : (
              <div className="rec-grid">
                {properties.map(prop => {
                  return (
                    <div key={prop.id} className="prop-card" onClick={() => handlePropertyClick(prop.id)}>
                      <div className="pc-img" style={{ backgroundImage: `url('${prop.img}')`, height: '220px' }}>
                        <span className={`pc-status status-nl`}>{prop.status}</span>
                      </div>
                      <div className="pc-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div className="pc-dev">{prop.developer}</div>
                        </div>
                        <div className="pc-name">{prop.title}</div>
                        <div className="pc-loc">📍 {prop.location}</div>
                        <div className="pc-tags">
                          {prop.tags && prop.tags.map((tag, i) => <span key={i} className="pc-tag">{tag}</span>)}
                        </div>
                        <div className="pc-footer">
                          <div className="pc-price">{prop.priceStr}<small>{prop.area}</small></div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                className="nav-btn-solid" 
                                style={{ padding: '8px 16px', fontSize: '12px' }}
                                onClick={(e) => { e.stopPropagation(); handlePropertyClick(prop.id); }}
                            >
                                Details
                            </button>
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
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
