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
    if (activeTab === 'Plots / Land') {
        setView('plots');
        navigate('/plots');
        return;
    }
    setSearchFilters({ 
      listingType: activeTab,
      type: 'Any Type',
      budget: 'Any Budget',
      bhk: 'Any BHK',
      status: 'Any Status'
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
          <div className="search-row">
            <div className="sf">
              <div className="sf-lbl">State</div>
              <select 
                value={selectedState} 
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('India');
                }}
              >
                <option value="">Select State</option>
                {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="sf">
              <div className="sf-lbl">City</div>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
              >
                <option value="India">Select City</option>
                {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="sf">
              <div className="sf-lbl">Location / Area</div>
              <input type="text" placeholder="Search by locality, area or project name..." />
            </div>
            <button className="search-go" onClick={handleSearch}>SEARCH</button>
          </div>
          <div className="trending-wrap">
            <span className="tr-label">Popular:</span>
            <a className="tr-chip" href="#">Bandra West</a>
            <a className="tr-chip" href="#">Gurugram Sec 42</a>
            <a className="tr-chip" href="#">Koramangala</a>
          </div>
          
          {/* CRITICAL CALL TO ACTION */}
          <div className="fail-safe-contact-container" style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(189,168,113,0.15)', margin: '24px -32px -28px', padding: '24px 32px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', position: 'relative', zIndex: '9999' }}>
            <button 
              className="nav-btn-solid" 
              onClick={() => navigate('/contact')} 
              style={{ 
                padding: '16px 48px', 
                fontSize: '15px', 
                borderRadius: '8px', 
                fontWeight: '900',
                letterSpacing: '1px',
                background: 'var(--gold2)',
                color: 'var(--ink)',
                boxShadow: '0 15px 30px rgba(189,168,113,0.6)',
                border: '2px solid #fff',
                cursor: 'pointer',
                display: 'block !important',
                visibility: 'visible !important',
                opacity: '1 !important'
              }}
            >
              CONTACT US NOW
            </button>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: '800', textShadow: '0 2px 10px rgba(0,0,0,1)' }}>
              Speak with an Investment Expert 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
