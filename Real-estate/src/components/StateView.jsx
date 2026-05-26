import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';
import { stateDetails } from '../data/stateData';

const StateView = () => {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const { setView, setSelectedProperty, comparisonList, setComparisonList, allCities } = useApp();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCity, setFilterCity] = useState('All');
  const [filterPrice, setFilterPrice] = useState('Any Price');
  const [filterType, setFilterType] = useState('Any Type');
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

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
    setFilterCity('All');
    setFilterPrice('Any Price');
    setFilterType('Any Type');
  }, [stateId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.dataset.city]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [stateInfo]);

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
    navigate('/details');
  };

  const clearFilters = () => {
    setFilterCity('All');
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

  const cityKeys = Object.keys(stateInfo.cities);

  return (
    <div className="section-full rec-bg reveal" style={{ minHeight: '80vh' }}>
      {/* Hero Section */}
      <div className="city-hero" style={{
        position: 'relative',
        height: '460px',
        overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(20,20,20,0.88), rgba(30,30,30,0.7)), url(${stateInfo.heroImage}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 24px',
          animation: 'cityFadeUp 0.8s ease-out'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '12px'
          }}>Investment Destination</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '700',
            color: '#fff',
            margin: '0 0 16px',
            lineHeight: '1.1'
          }}>{stateInfo.name}</h1>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px',
            color: 'var(--gold2)',
            fontStyle: 'italic',
            margin: 0
          }}>{stateInfo.tagline}</p>
        </div>
      </div>

      <div className="section-inner" style={{ padding: '60px 24px' }}>
        {/* State Overview */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 60px',
          animation: 'cityFadeUp 0.8s ease-out 0.2s both'
        }}>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: 'var(--text-dark)',
            textAlign: 'center',
            fontWeight: '500'
          }}>{stateInfo.description}</p>
        </div>

        {/* City Sections */}
        {cityKeys.map((cityKey, cityIndex) => {
          const cityInfo = stateInfo.cities[cityKey];
          const isVisible = visibleSections[cityKey];

          return (
            <div
              key={cityKey}
              ref={el => sectionRefs.current[cityKey] = el}
              data-city={cityKey}
              style={{
                maxWidth: '900px',
                margin: '0 auto 50px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {cityInfo.subtitle && cityIndex === 0 && (
                <div style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '10px'
                }}>{cityInfo.subtitle}</div>
              )}

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: '700',
                color: 'var(--text-dark)',
                marginBottom: '12px'
              }}>{cityInfo.name}</h2>

              <p style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'var(--text-dark)',
                marginBottom: '20px'
              }}>{cityInfo.description}</p>

              {cityInfo.detailParagraphs && cityInfo.detailParagraphs.map((para, i) => (
                <p key={i} style={{
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: '#555',
                  marginBottom: '14px'
                }}>{para}</p>
              ))}

              {/* Highlights */}
              <div style={{
                background: 'linear-gradient(135deg, #faf8f2 0%, #f5f0e6 100%)',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid var(--cream3)',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {cityInfo.highlights.map((h, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 16px',
                      background: '#fff',
                      borderRadius: '10px',
                      border: '1px solid var(--cream3)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * i}s`
                    }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--gold), var(--gold2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#fff',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>✓</span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--text-dark)'
                      }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {cityInfo.extraNote && (
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: '#666',
                  fontStyle: 'italic',
                  padding: '0 4px'
                }}>{cityInfo.extraNote}</p>
              )}
            </div>
          );
        })}

        {/* Corridor Section */}
        {stateInfo.corridors && stateInfo.corridors.map((corridor, idx) => (
          <div key={idx} style={{
            maxWidth: '900px',
            margin: '0 auto 60px',
            padding: '40px',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderRadius: '24px',
            color: '#fff',
            animation: 'cityFadeUp 0.8s ease-out 0.4s both'
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              fontWeight: '700',
              color: 'var(--gold2)',
              marginBottom: '16px'
            }}>{corridor.title}</h3>

            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#ccc',
              marginBottom: '20px'
            }}>{corridor.description}</p>

            {corridor.locations && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '10px'
                }}>Key Locations</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {corridor.locations.map((loc, i) => (
                    <span key={i} style={{
                      padding: '6px 14px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '20px',
                      fontSize: '13px',
                      color: '#e0d6c2',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}>{loc}</span>
                  ))}
                </div>
                {corridor.locationNote && (
                  <p style={{ fontSize: '13px', color: '#999', marginTop: '8px', fontStyle: 'italic' }}>{corridor.locationNote}</p>
                )}
              </div>
            )}

            {corridor.details && (
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#bbb', marginBottom: '20px' }}>{corridor.details}</p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {corridor.highlights.map((h, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px'
                }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gold), var(--gold2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    color: '#fff',
                    fontWeight: '700',
                    flexShrink: 0
                  }}>✓</span>
                  <span style={{ fontSize: '14px', color: '#ddd' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Properties Section with Filter */}
        <div style={{ animation: 'cityFadeUp 0.8s ease-out 0.4s both' }}>
          <div className="sec-header" style={{ marginBottom: '32px' }}>
            <div>
              <div className="eyebrow" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>← Back to Home</div>
              <h2 className="sec-title">Properties in <span>{stateInfo.name}</span></h2>
              <p className="sec-sub">
                {loading ? 'Loading properties...' : `Found ${filteredProperties.length} premium listing${filteredProperties.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          <div className="results-layout">
            {/* Filter Sidebar */}
            <aside className="filters-sidebar">
              <div className="filter-header-row">
                <span className="filter-h" style={{ marginBottom: 0 }}>Filters</span>
                <button className="filter-clear-btn" onClick={clearFilters}>Clear All</button>
              </div>

              <div className="filter-sec">
                <span className="filter-h-sm">City</span>
                <div className="filter-group">
                  <select
                    className="filter-select-box"
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                  >
                    <option value="All">All Cities</option>
                    {stateCities.map(city => (
                      <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {propertyTypes.length > 1 && (
                <div className="filter-sec">
                  <span className="filter-h-sm">Property Type</span>
                  <div className="filter-group">
                    {['Any Type', ...propertyTypes].map(t => (
                      <label key={t} className="filter-opt">
                        <input
                          type="radio"
                          name="propType"
                          checked={filterType === t}
                          onChange={() => setFilterType(t)}
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="filter-sec" style={{ borderBottom: 'none' }}>
                <span className="filter-h-sm">Budget Range</span>
                <div className="filter-group">
                  <select
                    className="filter-select-box"
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                  >
                    <option>Any Price</option>
                    <option>Below ₹ 1 Cr</option>
                    <option>₹ 1 Cr - ₹ 3 Cr</option>
                    <option>Above ₹ 3 Cr</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Properties Grid */}
            <main className="results-main">
              <div className="results-top-bar">
                <div className="results-count">Found <strong>{filteredProperties.length}</strong> premium listings</div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div className="loader-dots"><span></span><span></span><span></span></div>
                  <h3 style={{ marginTop: '20px', color: 'var(--muted)' }}>Discovering properties...</h3>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="no-results-card">
                  <div className="no-res-icon">🏘️</div>
                  <h3>No matching properties found</h3>
                  <p>Try broadening your filters or choosing a different city.</p>
                  <button className="nav-btn-solid" onClick={clearFilters} style={{ marginTop: '20px' }}>Reset All Filters</button>
                </div>
              ) : (
                <div className="rec-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
                  gap: '24px'
                }}>
                  {filteredProperties.map((property, index) => {
                    const isComparing = Array.isArray(comparisonList)
                      ? comparisonList.some(p => (typeof p === 'object' ? p.id : p) === property.id)
                      : false;

                    return (
                      <div
                        key={property.id}
                        className="prop-card"
                        style={{ animation: `cityCardIn 0.5s ease-out ${0.08 * index}s both` }}
                        onClick={() => handlePropertyClick(property.id)}
                      >
                        <div className="pc-img" style={{ backgroundImage: `url('${property.img}')` }}>
                          <span className="pc-status status-nl">{property.status || property.type}</span>
                          <div className="pc-save" onClick={(e) => {
                            e.stopPropagation();
                            if (isComparing) {
                              setComparisonList(prev => prev.filter(p => (typeof p === 'object' ? p.id : p) !== property.id));
                            } else if (comparisonList.length < 3) {
                              setComparisonList(prev => [...prev, property]);
                            }
                          }} style={{ color: isComparing ? 'var(--gold)' : '#fff' }}>
                            {isComparing ? '♥' : '♡'}
                          </div>
                        </div>
                        <div className="pc-body">
                          <div className="pc-dev">{property.developer}</div>
                          <div className="pc-name">{property.title}</div>
                          <div className="pc-loc">📍 {property.location}</div>
                          <div className="pc-tags" style={{ margin: '12px 0' }}>
                            {property.tags && property.tags.map((tag, i) => (
                              <span key={i} className="pc-tag">{tag}</span>
                            ))}
                          </div>
                          <div className="pc-footer">
                            <div className="pc-price">
                              {property.priceStr}
                              <small>{property.area}</small>
                            </div>
                            <button
                              className="pc-enq"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePropertyClick(property.id);
                              }}
                            >Details</button>
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
    </div>
  );
};

export default StateView;
