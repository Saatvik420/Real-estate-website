import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';
import { cityDetails } from '../data/cityData';

const CityView = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const { setView, setSelectedProperty, comparisonList, setComparisonList, allCities, states } = useApp();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleHighlights, setVisibleHighlights] = useState(0);

  const city = allCities.find(c => c.id === cityId);
  const cityInfo = cityDetails[cityId];
  const stateName = city ? states.find(s => s.id === city.stateId)?.name : '';

  useEffect(() => {
    const fetchCityProperties = async () => {
      setLoading(true);
      const res = await apiService.getProperties({ cityId });
      if (res.success) {
        setProperties(res.data);
      }
      setLoading(false);
    };
    fetchCityProperties();
    window.scrollTo(0, 0);
  }, [cityId]);

  useEffect(() => {
    if (!cityInfo) return;
    setVisibleHighlights(0);
    const timer = setInterval(() => {
      setVisibleHighlights(prev => {
        if (prev >= cityInfo.highlights.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [cityId, cityInfo]);

  const handlePropertyClick = (id) => {
    setSelectedProperty(id);
    setView('details');
    navigate('/details');
  };

  const toggleCompare = (property) => {
    const exists = comparisonList.find(p => p.id === property.id);
    if (exists) {
      setComparisonList(comparisonList.filter(p => p.id !== property.id));
    } else if (comparisonList.length < 3) {
      setComparisonList([...comparisonList, property]);
    }
  };

  if (!cityInfo) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>City not found</h2>
        <button className="nav-btn-ghost" onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="section-full rec-bg" style={{ minHeight: '80vh' }}>
      {/* Hero Section */}
      <div className="city-hero" style={{
        position: 'relative',
        height: '420px',
        overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(20,20,20,0.85), rgba(30,30,30,0.7)), url(${cityInfo.heroImage}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="city-hero-content" style={{
          textAlign: 'center',
          maxWidth: '800px',
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
          }}>{stateName}</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '700',
            color: '#fff',
            margin: '0 0 16px',
            lineHeight: '1.1'
          }}>{cityInfo.name}</h1>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px',
            color: 'var(--gold2)',
            fontStyle: 'italic',
            margin: 0
          }}>{cityInfo.tagline}</p>
        </div>
      </div>

      <div className="section-inner" style={{ padding: '60px 24px' }}>
        {/* City Info Section */}
        <div className="city-info-section" style={{
          maxWidth: '900px',
          margin: '0 auto 60px',
          animation: 'cityFadeUp 0.8s ease-out 0.2s both'
        }}>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: 'var(--text-dark)',
            textAlign: 'center',
            marginBottom: '40px',
            fontWeight: '500'
          }}>{cityInfo.description}</p>

          <div style={{
            background: 'linear-gradient(135deg, #faf8f2 0%, #f5f0e6 100%)',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid var(--cream3)'
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '24px',
              textAlign: 'center'
            }}>Why Invest in {cityInfo.name}?</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              {cityInfo.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="city-highlight-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 20px',
                    background: index < visibleHighlights ? '#fff' : 'transparent',
                    borderRadius: '12px',
                    border: index < visibleHighlights ? '1px solid var(--cream3)' : '1px solid transparent',
                    opacity: index < visibleHighlights ? 1 : 0,
                    transform: index < visibleHighlights ? 'translateX(0)' : 'translateX(-30px)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: index < visibleHighlights ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
                  }}
                >
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gold), var(--gold2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: '700',
                    flexShrink: 0
                  }}>✓</span>
                  <span style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: 'var(--text-dark)'
                  }}>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Section */}
        <div style={{ animation: 'cityFadeUp 0.8s ease-out 0.4s both' }}>
          <div className="sec-header" style={{ marginBottom: '32px' }}>
            <div>
              <div className="eyebrow" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>← Back to Home</div>
              <h2 className="sec-title">Properties in <span>{cityInfo.name}</span></h2>
              <p className="sec-sub">
                {loading ? 'Loading properties...' : `Found ${properties.length} premium listing${properties.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div className="loader-dots"><span></span><span></span><span></span></div>
              <h3 style={{ marginTop: '20px', color: 'var(--muted)' }}>Discovering properties...</h3>
            </div>
          ) : properties.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 0',
              background: '#fff',
              borderRadius: '20px',
              border: '1px solid var(--cream3)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏘️</div>
              <h3 style={{ fontSize: '20px', color: 'var(--text-dark)', marginBottom: '8px' }}>Coming Soon</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Premium properties in {cityInfo.name} are being curated.</p>
            </div>
          ) : (
            <div className="results-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '32px'
            }}>
              {properties.map((property, index) => (
                <div
                  key={property.id}
                  className="card"
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid var(--cream3)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    animation: `cityCardIn 0.5s ease-out ${0.1 * index}s both`
                  }}
                  onClick={() => handlePropertyClick(property.id)}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={property.img}
                      alt={property.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: property.status === 'Ready to Move' ? 'var(--text-dark)' : property.status === 'New Launch' ? 'var(--gold)' : '#666',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>{property.status || property.type}</div>
                    {property.listingType === 'Plots / Land' && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: property.type === 'Commercial' ? '#2563eb' : property.type === 'Agriculture' ? '#16a34a' : '#9333ea',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '800',
                        textTransform: 'uppercase'
                      }}>{property.type}</div>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCompare(property); }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: property.listingType === 'Plots / Land' ? 'auto' : '12px',
                        left: property.listingType === 'Plots / Land' ? 'auto' : 'auto',
                        bottom: property.listingType === 'Plots / Land' ? '12px' : 'auto',
                        background: comparisonList.find(p => p.id === property.id) ? 'var(--gold)' : 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        transition: 'all 0.2s ease'
                      }}
                    >{comparisonList.find(p => p.id === property.id) ? '♥' : '♡'}</button>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                      {property.developer}
                    </div>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '18px',
                      fontWeight: '700',
                      color: 'var(--text-dark)',
                      margin: '0 0 8px',
                      lineHeight: '1.3'
                    }}>{property.title}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '12px' }}>
                      📍 {property.location}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {(property.tags || []).slice(0, 3).map((tag, i) => (
                        <span key={i} style={{
                          fontSize: '10px',
                          fontWeight: '700',
                          padding: '4px 10px',
                          background: 'var(--cream2)',
                          borderRadius: '6px',
                          color: 'var(--text-dark)'
                        }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--cream3)', paddingTop: '12px' }}>
                      <div>
                        <div style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '20px',
                          fontWeight: '700',
                          color: 'var(--text-dark)'
                        }}>{property.priceStr}</div>
                        <small style={{ fontSize: '11px', color: 'var(--muted)' }}>{property.area}</small>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handlePropertyClick(property.id); }}
                        style={{
                          background: 'var(--text-dark)',
                          color: '#fff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'background 0.2s ease'
                        }}
                      >Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityView;
