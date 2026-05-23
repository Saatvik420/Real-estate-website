import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';
import LeadFormModal from './LeadFormModal';

const RentalsView = () => {
  const { 
    selectedCity, searchFilters, setSearchFilters, 
    setView, setSelectedProperty, agents
  } = useApp();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState(null);
  const [modalMode, setModalMode] = useState('contact');
  const [revealedNumbers, setRevealedNumbers] = useState({});
  
  const navigate = useNavigate();
  
  // Local state for filters to allow batch applying
  const [localFilters, setLocalFilters] = useState({ ...searchFilters });

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const res = await apiService.getProperties({
        cityId: selectedCity,
        ...searchFilters,
        listingType: 'Rent'
      });
      if (res.success) {
          setResults(res.data);
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

  const updateLocalFilter = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setSearchFilters({ ...localFilters });
  };

  const clearFilters = () => {
    const defaultFilters = {
      type: 'Any Type',
      budget: 'Any Budget',
      bhk: 'Any BHK',
      status: 'Any Status'
    };
    setLocalFilters(defaultFilters);
    setSearchFilters(defaultFilters);
  };

  const handleContactClick = (prop, mode) => {
    if (mode === 'view_number' && revealedNumbers[prop.id]) {
      alert(`Agent Number: +91 99999 77777`);
      return;
    }
    setActiveProperty(prop);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleLeadSuccess = () => {
    setIsModalOpen(false);
    if (modalMode === 'view_number' && activeProperty) {
      setRevealedNumbers(prev => ({ ...prev, [activeProperty.id]: true }));
      alert(`Success! Agent Number: +91 99999 77777`);
    } else {
      alert('Thank you! Our rental specialist will contact you shortly.');
    }
  };

  if (loading) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '100px 0' }}>
        <div className="loader-dots">
          <span></span><span></span><span></span>
        </div>
        <h2 style={{ marginTop: '20px', color: 'var(--muted)' }}>Finding your perfect rental...</h2>
      </div>
    );
  }

  return (
    <div className="section-full rec-bg reveal" style={{ minHeight: '80vh' }}>
      <div className="section-inner">
        <div className="sec-header">
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Premium <span>Rentals</span></h2>
            <p className="sec-sub">Showing verified rental collections in your area</p>
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
              <span className="filter-h-sm">Property Type</span>
              <div className="filter-group">
                {['Any Type', 'Luxury Apartment', 'Modern Flat', 'Independent Villa', 'Penthouse'].map(type => (
                  <label key={type} className="filter-opt">
                    <input 
                      type="radio" 
                      name="propType" 
                      checked={localFilters.type === type}
                      onChange={() => updateLocalFilter('type', type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-sec">
              <span className="filter-h-sm">BHK Configuration</span>
              <div className="filter-group">
                {['Any BHK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'].map(bhk => (
                  <label key={bhk} className="filter-opt">
                    <input 
                      type="radio" 
                      name="bhk"
                      checked={localFilters.bhk === bhk}
                      onChange={() => updateLocalFilter('bhk', bhk)}
                    />
                    {bhk}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-sec" style={{ borderBottom: 'none' }}>
              <span className="filter-h-sm">Monthly Rent</span>
              <div className="filter-group">
                <select 
                  className="filter-select-box"
                  value={localFilters.budget}
                  onChange={(e) => updateLocalFilter('budget', e.target.value)}
                >
                  <option>Any Budget</option>
                  <option>₹ 10 K - ₹ 30 K</option>
                  <option>₹ 30 K - ₹ 1 L</option>
                  <option>₹ 1 L+</option>
                </select>
              </div>
            </div>

            <button className="filter-apply-btn" onClick={applyFilters}>
              Apply Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="results-main">
            <div className="results-top-bar">
              <div className="results-count">Found <strong>{results.length}</strong> verified rentals</div>
            </div>

            {results.length === 0 ? (
              <div className="no-results-card">
                <div className="no-res-icon">🔍</div>
                <h3>No rentals found</h3>
                <p>Try relaxing your filters to see more options.</p>
                <button className="nav-btn-solid" onClick={clearFilters} style={{ marginTop: '20px' }}>Reset Filters</button>
              </div>
            ) : (
              <div className="rec-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {results.map(prop => {
                  const agent = agents.find(a => a.id === prop.agentId);
                  return (
                    <div key={prop.id} className="prop-card" onClick={() => handlePropertyClick(prop.id)}>
                      <div className="pc-img" style={{ backgroundImage: `url('${prop.img}')` }}>
                        <span className="pc-status status-nl">{prop.section || 'Verified'}</span>
                      </div>
                      <div className="pc-body">
                        <div className="pc-dev">{prop.developer}</div>
                        <div className="pc-name">{prop.title}</div>
                        <div className="pc-loc">📍 {prop.location}</div>
                        <div className="pc-tags">
                          {prop.tags.map((tag, i) => <span key={i} className="pc-tag">{tag}</span>)}
                        </div>
                        
                        {agent && (
                          <div style={{ marginTop: '20px', padding: '15px', background: 'var(--ink2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                              <img src={agent.img} alt={agent.name} style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold2)' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--gold2)' }}>{agent.name}</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{agent.company}</div>
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleContactClick(prop, 'contact'); }}
                                className="pd-btn-primary"
                                style={{ width: '100%', padding: '10px', fontSize: '0.75rem' }}
                              >
                                Book Now
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleContactClick(prop, 'view_number'); }}
                                className="nav-btn-ghost"
                                style={{ width: '100%', padding: '10px', fontSize: '0.75rem', borderColor: 'var(--gold2)', color: 'var(--gold2)' }}
                              >
                                {revealedNumbers[prop.id] ? '+91 99999 77777' : 'View Number'}
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="pc-footer">
                          <div className="pc-price">{prop.priceStr}<small>{prop.area}</small></div>
                          <button className="pc-enq">View Details</button>
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
        title={modalMode === 'contact' ? 'Book Private Walkthrough' : 'Unlock Rental Contact'}
        subtitle={modalMode === 'contact' ? `Schedule a viewing for ${activeProperty?.title} today.` : "Provide your details to see the direct phone number."}
      />
    </div>
  );
};

export default RentalsView;

