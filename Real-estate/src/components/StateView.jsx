import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';
import { stateDetails } from '../data/stateData';

const StateView = () => {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const { setView, setSelectedProperty, comparisonList, setComparisonList, allCities, selectedCity, setSelectedCity } = useApp();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCity, setFilterCity] = useState('All');
  const [filterPrice, setFilterPrice] = useState('Any Price');
  const [filterType, setFilterType] = useState('Any Type');

  const stateInfo = stateDetails[stateId];
  const stateCities = allCities.filter(c => c.stateId === stateId);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const cityIds = stateCities.map(c => c.id);
      const allProps = [];
      for (const cid of cityIds) {
        const res = await apiService.getProperties({ cityId: cid });
        if (res.success && Array.isArray(res.data)) {
          allProps.push(...res.data);
        }
      }
      setProperties(allProps);
      setLoading(false);
    };
    fetchProperties();
    window.scrollTo(0, 0);
    
    // Check if selectedCity from context belongs to this state
    if (selectedCity && stateCities.find(c => c.id === selectedCity)) {
      setFilterCity(selectedCity);
    } else {
      setFilterCity('All');
    }
    
    setFilterPrice('Any Price');
    setFilterType('Any Type');
  }, [stateId, selectedCity]);

  const filteredProperties = properties.filter(p => {
    if (filterCity !== 'All' && p.cityId !== filterCity) return false;
    if (filterType !== 'Any Type' && p.type !== filterType) return false;
    if (filterPrice !== 'Any Price') {
      if (filterPrice === 'Below ₹ 1 Cr' && p.price >= 10000000) return false;
      if (filterPrice === '₹ 1 Cr - ₹ 3 Cr' && (p.price < 10000000 || p.price > 30000000)) return false;
      if (filterPrice === 'Above ₹ 3 Cr' && p.price <= 30000000) return false;
    }
    return true;
  });

  const propertyTypes = [...new Set(properties.map(p => p.type).filter(Boolean))];

  const handlePropertyClick = (id) => {
    setSelectedProperty(id);
    setView('details');
    navigate(`/property/${id}`);
  };

  const clearFilters = () => {
    setFilterCity('All');
    setSelectedCity('India');
    setFilterPrice('Any Price');
    setFilterType('Any Type');
  };

  if (!stateInfo) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>State not found</h2>
        <button className="nav-btn-ghost" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="section-full rec-bg" style={{ minHeight: '80vh', background: '#fff' }}>
      {/* Premium Hero Section */}
      <div className="state-hero" style={{
        position: 'relative',
        height: '550px',
        overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(15,15,15,0.9), rgba(25,25,25,0.6)), url(${stateInfo.heroImage}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', padding: '0 24px', animation: 'fadeInUp 1s ease' }}>
          <div className="eyebrow" style={{ color: 'var(--gold2)', marginBottom: '16px', letterSpacing: '6px' }}>INVESTMENT OPPORTUNITIES</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '800', marginBottom: '20px' }}>{stateInfo.name}</h1>
          <p style={{ fontSize: '22px', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'var(--gold4)', maxWidth: '700px', margin: '0 auto' }}>{stateInfo.tagline}</p>
        </div>
      </div>

      <div className="section-inner" style={{ padding: '80px 24px' }}>
        {/* Decorative Overview Section */}
        <div style={{ maxWidth: '900px', margin: '0 auto 100px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '2px', background: 'var(--gold2)', margin: '0 auto 30px' }}></div>
          <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#333', fontWeight: '500', fontFamily: "'Montserrat', sans-serif" }}>
            {stateInfo.description}
          </p>
          <div style={{ width: '60px', height: '2px', background: 'var(--gold2)', margin: '30px auto 0' }}></div>
        </div>

        {/* Dynamic Rich Content Sections */}
        <div className="state-sections" style={{ display: 'grid', gap: '80px', marginBottom: '100px' }}>
          {stateInfo.sections.map((section, idx) => (
            <div key={idx} className="rich-section" style={{ animation: `fadeInUp 1s ease ${idx * 0.2}s both` }}>
              <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', color: 'var(--ink)', marginBottom: '16px' }}>{section.title}</h2>
                {section.text && <p style={{ fontSize: '17px', color: '#666', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>{section.text}</p>}
              </div>

              {section.content && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                  {section.content.map((item, i) => (
                    <div key={i} className="info-card" style={{ 
                      padding: '40px', 
                      background: '#fff', 
                      borderRadius: '16px', 
                      border: '1px solid #f0f0f0',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                      transition: 'transform 0.3s ease'
                    }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: 'var(--gold)', marginBottom: '16px' }}>{item.subtitle}</h3>
                      <p style={{ fontSize: '15px', color: '#444', marginBottom: '20px', lineHeight: '1.6' }}>{item.text}</p>
                      
                      {item.highlights && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                          {item.highlights.map((h, hi) => (
                            <div key={hi} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <span style={{ color: 'var(--gold2)', fontWeight: 'bold' }}>•</span>
                              <span style={{ fontSize: '14px', color: '#555' }}>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {item.extra && <p style={{ fontSize: '13px', color: 'var(--muted)', fontStyle: 'italic', borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>{item.extra}</p>}
                    </div>
                  ))}
                </div>
              )}

              {section.locations && (
                <div style={{ 
                  marginTop: '40px', 
                  background: 'var(--ink)', 
                  padding: '50px', 
                  borderRadius: '24px', 
                  color: '#fff',
                  textAlign: 'center'
                }}>
                  <h4 style={{ color: 'var(--gold2)', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>Strategic Growth Corridor Locations</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '30px' }}>
                    {section.locations.map((loc, li) => (
                      <span key={li} style={{ padding: '8px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '14px' }}>{loc}</span>
                    ))}
                  </div>
                  {section.highlights && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'left' }}>
                      {section.highlights.map((h, hi) => (
                        <div key={hi} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#ccc' }}>
                          <span style={{ color: 'var(--gold2)' }}>✓</span> {h}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {section.extra && (
                 <div style={{ marginTop: '40px', padding: '30px', background: '#fafafa', borderRadius: '12px', borderLeft: '4px solid var(--gold2)', fontSize: '15px', color: '#555', lineHeight: '1.7' }}>
                   {section.extra}
                 </div>
              )}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '10px' }}>AVAILABLE OPPORTUNITIES</div>
          <h2 className="sec-title">Premium Plots & Land in <span>{stateInfo.name}</span></h2>
          <p className="sec-sub">Showing verified land parcels and plotted developments</p>
        </div>

        {/* Properties Grid with Filters */}
        <div className="results-layout" style={{ background: 'transparent' }}>
          {/* Enhanced Filter Sidebar */}
          <aside className="filters-sidebar" style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
            <div className="filter-header-row" style={{ marginBottom: '30px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Refine Search</span>
              <button className="filter-clear-btn" onClick={clearFilters}>Reset</button>
            </div>

            <div className="filter-sec">
              <span className="filter-h-sm">Location / City</span>
              <select className="filter-select-box" value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
                <option value="All">All {stateInfo.name} Cities</option>
                {stateCities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
              </select>
            </div>

            {propertyTypes.length > 0 && (
              <div className="filter-sec">
                <span className="filter-h-sm">Investment Type</span>
                <div className="filter-group">
                  {['Any Type', ...propertyTypes].map(t => (
                    <label key={t} className="filter-opt">
                      <input type="radio" name="propType" checked={filterType === t} onChange={() => setFilterType(t)} />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="filter-sec" style={{ borderBottom: 'none' }}>
              <span className="filter-h-sm">Budget Potential</span>
              <select className="filter-select-box" value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
                <option>Any Price</option>
                <option>Below ₹ 1 Cr</option>
                <option>₹ 1 Cr - ₹ 3 Cr</option>
                <option>Above ₹ 3 Cr</option>
              </select>
            </div>
          </aside>

          {/* Properties Grid */}
          <main className="results-main">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <div className="loader-dots"><span></span><span></span><span></span></div>
                <h3 style={{ marginTop: '20px', color: 'var(--muted)' }}>Curating premium listings...</h3>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="no-results-card" style={{ padding: '80px 40px', background: '#fff', borderRadius: '16px', border: '1px dashed #ddd' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏘️</div>
                <h3>No Plots Found for This Criteria</h3>
                <p>We are constantly adding new land parcels. Please check back soon or reset your filters.</p>
                <button className="nav-btn-solid" onClick={clearFilters} style={{ marginTop: '20px' }}>View All Plots</button>
              </div>
            ) : (
              <div className="rec-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
                gap: '30px'
              }}>
                {filteredProperties.map((property, index) => {
                  const isComparing = comparisonList.some(p => (typeof p === 'object' ? p.id : p) === property.id);
                  return (
                    <div key={property.id} className="prop-card" style={{ animation: `fadeInUp 0.6s ease ${index * 0.1}s both` }} onClick={() => handlePropertyClick(property.id)}>
                      <div className="pc-img" style={{ backgroundImage: `url('${property.img}')`, height: '240px' }}>
                        <span className="pc-status" style={{ background: 'var(--ink)', color: 'var(--gold2)' }}>{property.type}</span>
                        <div className="pc-save" onClick={(e) => {
                          e.stopPropagation();
                          if (isComparing) setComparisonList(prev => prev.filter(p => (typeof p === 'object' ? p.id : p) !== property.id));
                          else if (comparisonList.length < 3) setComparisonList(prev => [...prev, property]);
                        }} style={{ color: isComparing ? 'var(--gold)' : '#fff' }}>
                          {isComparing ? '♥' : '♡'}
                        </div>
                      </div>
                      <div className="pc-body" style={{ padding: '25px' }}>
                        <div className="pc-dev" style={{ letterSpacing: '2px' }}>{property.developer}</div>
                        <div className="pc-name" style={{ fontSize: '20px', marginBottom: '8px' }}>{property.title}</div>
                        <div className="pc-loc" style={{ color: '#666' }}>📍 {property.location}</div>
                        <div className="pc-footer" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f5f5f5' }}>
                          <div className="pc-price" style={{ fontSize: '18px' }}>
                            {property.priceStr}
                            <small style={{ display: 'block', fontSize: '11px', color: '#999', marginTop: '4px' }}>{property.area}</small>
                          </div>
                          <button className="pc-enq">DETAILS</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>

        {/* Investment Safety Section */}
        <div style={{ 
          marginTop: '100px', 
          padding: '60px', 
          background: 'linear-gradient(135deg, #fdfbf7 0%, #f5f0e6 100%)', 
          borderRadius: '24px', 
          border: '1px solid var(--gold4)',
          animation: 'fadeInUp 1s ease'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: 'var(--ink)', marginBottom: '16px' }}>How Safe Are Land and Plot Investments in India?</h2>
            <p style={{ fontSize: '16px', color: '#666', maxWidth: '700px', margin: '0 auto' }}>Land and plotted developments can be extremely rewarding investments when backed by proper research and due diligence.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: 'var(--gold)', fontSize: '18px', marginBottom: '20px', borderBottom: '2px solid var(--gold2)', paddingBottom: '10px', display: 'inline-block' }}>Key Factors for Safety</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                {['RERA-approved projects', 'Verified land titles', 'Government-approved layouts', 'Reputed developers', 'Infrastructure-backed growth corridors', 'Clear legal documentation', 'Proper zoning and land-use approvals'].map((item, i) => (
                  <li key={i} style={{ fontSize: '14px', color: '#444', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--gold2)' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--gold)', fontSize: '18px', marginBottom: '20px', borderBottom: '2px solid var(--gold2)', paddingBottom: '10px', display: 'inline-block' }}>Investor Checklist</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                {['Ownership history', 'Encumbrance status', 'Future development plans', 'Connectivity and infrastructure pipeline', 'Market demand and liquidity'].map((item, i) => (
                  <li key={i} style={{ fontSize: '14px', color: '#444', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--gold2)' }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: '#fff', borderRadius: '12px', textAlign: 'center', border: '1px solid #eee', fontSize: '14px', color: 'var(--muted)', fontStyle: 'italic' }}>
            Professional advisory and research-driven investment selection significantly reduce risks and improve long-term returns.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateView;
