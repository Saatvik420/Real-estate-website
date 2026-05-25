import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const navigate = useNavigate();
  const { 
    selectedState, setSelectedState, 
    selectedCity, setSelectedCity, 
    states, cities, 
    setView, setSearchFilters 
  } = useApp();

  const cityName = cities.find(c => c.id === selectedCity)?.name || 'India';
  const tabs = ['Buy', 'Rent', 'Projects', 'Plots / Land', 'Commercial'];

  const handleSearch = () => {
    const selectedCityName = cities.find(c => c.id === selectedCity)?.name || 'India';
    
    if (activeTab === 'Plots / Land') {
        setView('plots');
        navigate('/plots');
        return;
    }
    
    setSearchFilters({ 
      listingType: activeTab,
      type: searchFilters.type || 'Any Type',
      budget: 'Any Budget',
      bhk: 'Any BHK',
      status: 'Any Status',
      city: selectedCityName,
      state: states.find(s => s.id === selectedState)?.name || ''
    });
    
    setView('results');
    navigate('/results');
  };

  return (
    <section className="hero">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="hero-bg-video"
      >
        <source src="https://www.pexels.com/download/video/7577611/" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-glow"></div>
      <div className="hero-glow-alt"></div>
      <div className="hero-inner reveal">
        <div className="hero-eyebrow">India's Most Premium Real Estate Platform</div>
        <h1 className="hero-title">Discover Your <span>Sanctuary</span> in <span>{cityName}</span></h1>
        <p className="hero-subtitle">Explore 14,327+ curated forest-facing estates, luxury residences and verified projects — tailored for the discerning few.</p>
        
        <div className="search-card">
          <div className="search-tabs">
            {tabs.map(tab => (
              <button 
                key={tab}
                className={`stab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="search-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 2fr auto', gap: '0' }}>
            <div className="sf">
              <div className="sf-lbl">STATE</div>
              <div className="sf-select-custom">
                <select 
                  value={selectedState} 
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity('India');
                  }}
                  style={{ cursor: 'pointer', appearance: 'none', width: '100%', background: 'transparent', border: 'none', color: '#fff', fontWeight: '700', fontSize: '15px', outline: 'none' }}
                >
                  <option value="" style={{ background: 'var(--ink)' }}>Select State</option>
                  {states.map(s => <option key={s.id} value={s.id} style={{ background: 'var(--ink)' }}>{s.name}</option>)}
                </select>
                <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--gold2)', fontSize: '10px' }}>▼</span>
              </div>
            </div>
            
            <div className="sf">
              <div className="sf-lbl">CITY / REGION</div>
              <div className="sf-select-custom">
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState}
                  style={{ cursor: 'pointer', appearance: 'none', width: '100%', background: 'transparent', border: 'none', color: '#fff', fontWeight: '700', fontSize: '15px', outline: 'none', opacity: selectedState ? 1 : 0.5 }}
                >
                  <option value="India" style={{ background: 'var(--ink)' }}>All Cities</option>
                  {cities.map(c => <option key={c.id} value={c.id} style={{ background: 'var(--ink)' }}>{c.name}</option>)}
                </select>
                <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--gold2)', fontSize: '10px' }}>▼</span>
              </div>
            </div>

            <div className="sf">
              <div className="sf-lbl">PROPERTY TYPE</div>
              <div className="sf-select-custom">
                <select 
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, type: e.target.value }))}
                  style={{ cursor: 'pointer', appearance: 'none', width: '100%', background: 'transparent', border: 'none', color: '#fff', fontWeight: '700', fontSize: '15px', outline: 'none' }}
                >
                  <option value="Any Type" style={{ background: 'var(--ink)' }}>Any Property Type</option>
                  <option value="Luxury Apartment" style={{ background: 'var(--ink)' }}>Luxury Apartment</option>
                  <option value="Independent Villa" style={{ background: 'var(--ink)' }}>Independent Villa</option>
                  <option value="Penthouse" style={{ background: 'var(--ink)' }}>Penthouse</option>
                  <option value="Premium Plot" style={{ background: 'var(--ink)' }}>Premium Plot</option>
                  <option value="Commercial" style={{ background: 'var(--ink)' }}>Commercial Space</option>
                </select>
                <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--gold2)', fontSize: '10px' }}>▼</span>
              </div>
            </div>

            <button className="search-go" onClick={handleSearch} style={{ height: '100%', borderRadius: '0', padding: '0 40px', background: 'var(--gold2)', color: 'var(--ink)', fontWeight: '900', letterSpacing: '1px' }}>
              DISCOVER NOW
            </button>
          </div>
          <div className="trending-wrap">
            <span className="tr-label">Popular:</span>
            <a className="tr-chip" href="#">Bandra West</a>
            <a className="tr-chip" href="#">Gurugram Sec 42</a>
            <a className="tr-chip" href="#">Koramangala</a>
          </div>
          
          {/* CRITICAL CALL TO ACTION */}
          <div className="fail-safe-contact-container">
            <button 
              className="hero-contact-btn" 
              onClick={() => navigate('/contact')} 
            >
              CONTACT US NOW
            </button>
            <div className="hero-contact-text">
              Speak with an Investment Expert 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
