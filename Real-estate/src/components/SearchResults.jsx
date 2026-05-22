import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const SearchResults = () => {
  const { 
    searchFilters, setSearchFilters, selectedCity,
    comparisonList, setComparisonList, setSelectedProperty, setView 
  } = useApp();
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const res = await apiService.getProperties({ ...searchFilters, cityId: selectedCity });
      if (res.success) {
          setProperties(res.data);
          
          const agentRes = await apiService.getAgents();
          if (agentRes.success) {
              const agentMap = {};
              agentRes.data.forEach(a => agentMap[a.id] = a);
              setAgents(agentMap);
          }
      }
      setLoading(false);
    };
    fetchResults();
  }, [searchFilters, selectedCity]);

  const handlePropertyClick = (id) => {
    setSelectedProperty(id);
    setView('details');
    navigate('/details');
  };

  return (
    <div className="section-full bg-main" style={{ minHeight: '100vh', paddingTop: '40px' }}>
      <div className="section-inner">
        <div className="results-top-bar">
          <div className="results-count">
            Found {properties.length} Exclusive Properties in {selectedCity}
          </div>
          <div className="results-sort">
            <label>Sort by: </label>
            <select>
              <option>Price (High to Low)</option>
              <option>Price (Low to High)</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        <div className="results-layout">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filter-header-row">
              <span className="filter-h">Refine Search</span>
              <button className="filter-clear-btn" onClick={() => setSearchFilters({})}>Clear All</button>
            </div>

            <div className="filter-sec">
              <span className="filter-h-sm">Listing Type</span>
              <select 
                className="filter-select-box"
                value={searchFilters.listingType || ''} 
                onChange={(e) => setSearchFilters({...searchFilters, listingType: e.target.value})}
              >
                <option value="">All Types</option>
                <option value="Buy">For Sale</option>
                <option value="Rent">For Rent</option>
                <option value="Plots">Land / Plots</option>
              </select>
            </div>

            <div className="filter-sec">
              <span className="filter-h-sm">Property Status</span>
              <div className="filter-group">
                {['Ready to Move', 'Under Construction', 'Verified'].map(status => (
                  <label key={status} className="filter-opt">
                    <input 
                      type="checkbox" 
                      checked={searchFilters.status === status}
                      onChange={() => setSearchFilters({...searchFilters, status: searchFilters.status === status ? '' : status})}
                    /> {status}
                  </label>
                ))}
              </div>
            </div>

            <button className="filter-apply-btn">Update Results</button>
          </aside>

          {/* Main Results Grid */}
          <main className="results-main">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <div className="loader-dots"><span></span><span></span><span></span></div>
                <p style={{ marginTop: '20px', color: 'var(--muted)', fontWeight: '700' }}>Curating your selection...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="no-results-card">
                <div className="no-res-icon">🏠</div>
                <h3>No exact matches found</h3>
                <p>We couldn't find properties matching your specific filters. Try expanding your search criteria.</p>
                <button className="nav-btn-solid" onClick={() => setSearchFilters({})}>RESET FILTERS</button>
              </div>
            ) : (
              <div className="rec-grid">
                {properties.map(prop => {
                  const agent = agents[prop.agentId];
                  return (
                    <div key={prop.id} className="prop-card" onClick={() => handlePropertyClick(prop.id)}>
                      <div className="pc-img" style={{ backgroundImage: `url('${prop.img}')`, height: '220px' }}>
                        <span className={`pc-status status-nl`}>{prop.status}</span>
                      </div>
                      <div className="pc-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div className="pc-dev">{prop.developer}</div>
                          {agent && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <img src={agent.img} alt={agent.name} style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
                              <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--muted)' }}>{agent.name.split(' ')[0]}</span>
                            </div>
                          )}
                        </div>
                        <div className="pc-name">{prop.title}</div>
                        <div className="pc-loc">📍 {prop.location}</div>
                        <div className="pc-tags">
                          {prop.tags && prop.tags.map((tag, i) => <span key={i} className="pc-tag">{tag}</span>)}
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
