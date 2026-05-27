import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      // Fetch all plot properties for this state by default
      const res = await apiService.getProperties({ 
        stateId, 
        listingType: 'Plots / Land' 
      });
      if (res.success && Array.isArray(res.data)) {
        setProperties(res.data);
      }
      setLoading(false);

      const stateCities = allCities.filter(c => c.stateId === stateId);
      if (selectedCity && stateCities.find(c => c.id === selectedCity)) {
        setFilterCity(selectedCity);
      } else {
        setFilterCity('All');
      }
    };
    fetchProperties();
    window.scrollTo(0, 0);
    
    setFilterPrice('Any Price');
    setFilterType('Any Type');
  }, [stateId, selectedCity, allCities]);

  const stateCities = allCities.filter(c => c.stateId === stateId);

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

  const propertyTypes = ['Residential', 'Commercial', 'Agricultural'];

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
        <div style={{ maxWidth: '900px', margin: '0 auto 100px', textAlign: 'center', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', 
            top: '-40px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            fontSize: '80px',
            color: 'var(--gold4)',
            opacity: 0.3,
            zIndex: -1,
            fontFamily: "'Playfair Display', serif"
          }}>“</div>
          <div style={{ width: '80px', height: '3px', background: 'linear-gradient(to right, transparent, var(--gold2), transparent)', margin: '0 auto 40px' }}></div>
          <p style={{ 
            fontSize: '24px', 
            lineHeight: '1.8', 
            color: 'var(--ink)', 
            fontWeight: '600', 
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic'
          }}>
            {stateInfo.description}
          </p>
          <div style={{ width: '80px', height: '3px', background: 'linear-gradient(to right, transparent, var(--gold2), transparent)', margin: '40px auto 0' }}></div>
        </div>

        {/* Dynamic Rich Content Sections */}
        <div className="state-sections" style={{ display: 'grid', gap: '100px', marginBottom: '120px' }}>
          {stateInfo.sections.map((section, idx) => (
            <div key={idx} className="rich-section" style={{ animation: `fadeInUp 1s ease ${idx * 0.2}s both` }}>
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: '42px', 
                  color: 'var(--ink)', 
                  marginBottom: '20px',
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  {section.title}
                  <span style={{ 
                    position: 'absolute', 
                    bottom: '-10px', 
                    left: '10%', 
                    right: '10%', 
                    height: '4px', 
                    background: 'var(--gold4)',
                    zIndex: -1
                  }}></span>
                </h2>
                {section.text && <p style={{ fontSize: '18px', color: '#555', maxWidth: '850px', margin: '0 auto', lineHeight: '1.8' }}>{section.text}</p>}
              </div>

              {section.content && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                  {section.content.map((item, i) => (
                    <div key={i} className="info-card" style={{ 
                      padding: '50px', 
                      background: '#fff', 
                      borderRadius: '24px', 
                      border: '1px solid #f2f2f2',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
                      transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 30px 60px rgba(189, 168, 113, 0.15)';
                      e.currentTarget.style.borderColor = 'var(--gold4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.04)';
                      e.currentTarget.style.borderColor = '#f2f2f2';
                    }}>
                      <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        right: 0, 
                        width: '100px', 
                        height: '100px', 
                        background: 'radial-gradient(circle at top right, var(--gold4), transparent 70%)',
                        opacity: 0.5
                      }}></div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--ink)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ width: '30px', height: '2px', background: 'var(--gold2)' }}></span>
                        {item.subtitle}
                      </h3>
                      <p style={{ fontSize: '16px', color: '#444', marginBottom: '24px', lineHeight: '1.7' }}>{item.text}</p>
                      
                      {item.highlights && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                          {item.highlights.map((h, hi) => (
                            <div key={hi} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                              <div style={{ 
                                width: '24px', 
                                height: '24px', 
                                background: 'var(--gold4)', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '2px'
                              }}>
                                <span style={{ color: 'var(--gold)', fontSize: '14px', fontWeight: '900' }}>✓</span>
                              </div>
                              <span style={{ fontSize: '15px', color: '#555', fontWeight: '500' }}>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {item.extra && (
                        <div style={{ 
                          fontSize: '14px', 
                          color: 'var(--muted)', 
                          fontStyle: 'italic', 
                          borderTop: '1px solid #f5f5f5', 
                          paddingTop: '20px',
                          lineHeight: '1.6',
                          background: 'rgba(250,250,250,0.5)',
                          margin: '0 -50px -50px',
                          padding: '20px 50px'
                        }}>
                          {item.extra}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.locations && (
                <div style={{ 
                  marginTop: '60px', 
                  background: 'var(--ink)', 
                  padding: '70px 50px', 
                  borderRadius: '32px', 
                  color: '#fff',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '-50px', 
                    right: '-50px', 
                    width: '300px', 
                    height: '300px', 
                    background: 'radial-gradient(circle, rgba(189,168,113,0.1) 0%, transparent 70%)',
                    zIndex: 0
                  }}></div>
                  <h4 style={{ color: 'var(--gold2)', fontSize: '16px', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '40px', position: 'relative', zIndex: 1 }}>Strategic Growth Corridor Locations</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginBottom: '50px', position: 'relative', zIndex: 1 }}>
                    {section.locations.map((loc, li) => (
                      <span key={li} style={{ 
                        padding: '12px 32px', 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '100px', 
                        fontSize: '15px',
                        fontWeight: '600',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--gold2)';
                        e.currentTarget.style.color = 'var(--ink)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = '#fff';
                      }}>{loc}</span>
                    ))}
                  </div>
                  {section.highlights && (
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '30px', 
                      textAlign: 'left',
                      position: 'relative',
                      zIndex: 1,
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      paddingTop: '40px'
                    }}>
                      {section.highlights.map((h, hi) => (
                        <div key={hi} style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '15px', color: '#ccc', fontWeight: '500' }}>
                          <div style={{ color: 'var(--gold2)', fontSize: '20px' }}>✓</div> {h}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {section.extra && !section.content && (
                 <div style={{ 
                   marginTop: '50px', 
                   padding: '40px', 
                   background: 'linear-gradient(to right, #fafafa, #f5f5f5)', 
                   borderRadius: '20px', 
                   borderLeft: '6px solid var(--gold2)', 
                   fontSize: '17px', 
                   color: '#444', 
                   lineHeight: '1.8',
                   boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                 }}>
                   {section.extra}
                 </div>
              )}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--gold2))', maxWidth: '100px' }}></div>
            <div className="eyebrow" style={{ color: 'var(--gold)', margin: 0 }}>AVAILABLE OPPORTUNITIES</div>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--gold2))', maxWidth: '100px' }}></div>
          </div>
          <h2 className="sec-title" style={{ fontSize: '48px' }}>Premium Plots & Land in <span>{stateInfo.name}</span></h2>
          <p className="sec-sub" style={{ fontSize: '18px' }}>Showing verified land parcels and plotted developments</p>
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
              <div className="no-results-card" style={{ padding: '80px 40px', background: '#fff', borderRadius: '16px', border: '1px dashed #ddd', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏜️</div>
                <h3>Coming Soon to {stateInfo.name}</h3>
                <p>We are currently verifying premium land parcels in this region. Please stay tuned for iconic developments.</p>
                <button className="nav-btn-solid" onClick={clearFilters} style={{ marginTop: '20px' }}>Reset All Filters</button>
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
          marginTop: '120px', 
          padding: '80px 60px', 
          background: 'linear-gradient(135deg, #1a1c20 0%, #26292f 100%)', 
          borderRadius: '32px', 
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
        }}>
          <div style={{ 
            position: 'absolute', 
            bottom: '-100px', 
            left: '-100px', 
            width: '400px', 
            height: '400px', 
            background: 'radial-gradient(circle, rgba(189,168,113,0.05) 0%, transparent 70%)',
            zIndex: 0
          }}></div>
          
          <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 1 }}>
            <div className="eyebrow" style={{ color: 'var(--gold2)', marginBottom: '15px' }}>DUE DILIGENCE & SECURITY</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', color: '#fff', marginBottom: '20px' }}>How Safe Are Land and Plot Investments in India?</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
              Land and plotted developments can be extremely rewarding investments when backed by proper research and due diligence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', position: 'relative', zIndex: 1 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: 'var(--gold2)', fontSize: '22px', fontFamily: "'Playfair Display', serif", marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--gold2)', borderRadius: '50%' }}></span>
                Key Factors That Make Investments Safer
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '18px' }}>
                {[
                  'RERA-approved projects', 
                  'Verified land titles', 
                  'Government-approved layouts', 
                  'Reputed developers', 
                  'Infrastructure-backed growth corridors', 
                  'Clear legal documentation', 
                  'Proper zoning and land-use approvals'
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ color: 'var(--gold2)', fontSize: '18px', fontWeight: '900' }}>✓</div> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: 'var(--gold2)', fontSize: '22px', fontFamily: "'Playfair Display', serif", marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--gold2)', borderRadius: '50%' }}></span>
                Investors should always evaluate:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '18px' }}>
                {[
                  'Ownership history', 
                  'Encumbrance status', 
                  'Future development plans', 
                  'Connectivity and infrastructure pipeline', 
                  'Market demand and liquidity'
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--gold2)', borderRadius: '50%' }}></div> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ 
            marginTop: '60px', 
            padding: '30px 40px', 
            background: 'rgba(189, 168, 113, 0.1)', 
            borderRadius: '16px', 
            textAlign: 'center', 
            border: '1px solid rgba(189, 168, 113, 0.2)', 
            fontSize: '16px', 
            color: 'var(--gold3)', 
            fontStyle: 'italic',
            position: 'relative',
            zIndex: 1,
            lineHeight: '1.6'
          }}>
            "Professional advisory and research-driven investment selection significantly reduce risks and improve long-term returns."
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateView;
