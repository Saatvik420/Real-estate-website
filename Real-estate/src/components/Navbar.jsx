import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const Navbar = () => {
  const { setView, states, allCities, setSelectedState, setSelectedCity, setSearchFilters, isLoggedIn, currentUser, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'corporate' | 'account' | 'partners' | 'state-city' | 'plots' | null
  const [activeNestedDropdown, setActiveNestedDropdown] = useState(null); // stateId | null
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
  };

  const toggleDropdown = (name, e) => {
    const isMobile = window.matchMedia("(max-width: 992px)").matches;
    if (!isMobile) return; 
    
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
    setActiveNestedDropdown(null);
  };

  const toggleNestedDropdown = (stateId, e) => {
    const isMobile = window.matchMedia("(max-width: 992px)").matches;
    if (!isMobile) return;

    e.preventDefault();
    e.stopPropagation();
    setActiveNestedDropdown(activeNestedDropdown === stateId ? null : stateId);
  };

  const handleCityClick = (city) => {
    setSelectedState(city.stateId);
    setSelectedCity(city.id);
    setSearchFilters(prev => ({ 
      ...prev, 
      cityId: city.id,
      city: city.name,
      state: states.find(s => s.id === city.stateId)?.name || ''
    }));
    setView('results');
    closeMobileMenu();
  };

  return (
    <nav className="nav">
      {/* ... (nav-left-mobile remains unchanged) ... */}
      <div className="nav-left-mobile">
        <button className="hamburger" onClick={toggleMobileMenu}>
          <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>
        <Link to="/" className="logo" onClick={() => { setView('home'); closeMobileMenu(); }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" width="160" height="48" style={{ display: 'block', maxWidth: '100%', height: 'auto' }}>
            <defs>
              <linearGradient id="navGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#C59B3C" />
                <stop offset="50%" stop-color="#F2DE92" />
                <stop offset="100%" stop-color="#A57A27" />
              </linearGradient>
              <linearGradient id="navGoldSolid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#D4AF37" />
                <stop offset="100%" stop-color="#AA8C2C" />
              </linearGradient>
            </defs>
            <g transform="translate(30, 25)">
              <path d="M50 0 L90 40 L90 100 L10 100 L10 40 Z" fill="none" stroke="url(#navGoldGradient)" stroke-width="6" stroke-linejoin="round"/>
              <path d="M50 0 L50 100" fill="none" stroke="url(#navGoldGradient)" stroke-width="2" opacity="0.5"/>
              <path d="M10 40 L90 40" fill="none" stroke="url(#navGoldGradient)" stroke-width="2" opacity="0.5"/>
              <path d="M30 100 L30 60 L70 60 L70 100" fill="none" stroke="url(#navGoldGradient)" stroke-width="5" stroke-linejoin="round"/>
              <text x="50" y="85" font-family="'Playfair Display', serif, sans-serif" font-size="34" font-weight="900" fill="url(#navGoldSolid)" text-anchor="middle">15</text>
            </g>
            <g transform="translate(140, 80)">
              <text x="0" y="0" font-family="'Montserrat', 'Inter', sans-serif" font-size="52" font-weight="800" fill="#f4edd9" letter-spacing="1">ONE5</text>
              <text x="160" y="0" font-family="'Montserrat', 'Inter', sans-serif" font-size="52" font-weight="300" fill="#ebdcb5" letter-spacing="3">REALTY</text>
              <text x="5" y="32" font-family="'Playfair Display', serif, sans-serif" font-size="16" font-weight="600" fill="#bda871" letter-spacing="10">PREMIUM SOLUTIONS</text>
            </g>
          </svg>
        </Link>
      </div>

      <div className={`nav-center ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className={`professional-dropdown ${activeDropdown === 'corporate' ? 'active' : ''}`} style={{ position: 'relative' }}>
          <span className="nav-link" onClick={(e) => toggleDropdown('corporate', e)} style={{ cursor: 'pointer' }}>Corporate ▾</span>
          <div className="dropdown-menu">
            <Link className="nav-link" to="/about" onClick={() => { setView('about'); closeMobileMenu(); }}>About Us</Link>
            <Link className="nav-link" to="/contact" onClick={() => { setView('contact'); closeMobileMenu(); }}>Contact</Link>
            <Link className="nav-link" to="/press" onClick={() => { setView('press'); closeMobileMenu(); }}>Press</Link>
            <Link className="nav-link" to="/support" onClick={() => { setView('support'); closeMobileMenu(); }}>Support</Link>
          </div>
        </div>

        <Link className="nav-link" to="/insights" onClick={() => { setView('insights'); closeMobileMenu(); }}>Insights</Link>
        <Link className="nav-link" to="/projects" onClick={() => { setView('projects'); closeMobileMenu(); }}>Projects</Link>
        
        <div className={`professional-dropdown ${activeDropdown === 'state-city' ? 'active' : ''}`} style={{ position: 'relative' }}>
          <span className="nav-link" onClick={(e) => toggleDropdown('state-city', e)} style={{ cursor: 'pointer' }}>State / City ▾</span>
          <div className="dropdown-menu">
            {states.map(state => (
              <div key={state.id} className={`nested-dropdown ${activeNestedDropdown === state.id ? 'active' : ''}`}>
                <span className="nav-link" onClick={(e) => toggleNestedDropdown(state.id, e)}>{state.name} <span style={{ fontSize: '10px' }}>▶</span></span>
                <div className="nested-menu">
                  {allCities.filter(c => c.stateId === state.id).map(city => (
                    <Link key={city.id} className="nav-link" to="/results" onClick={() => handleCityClick(city)}>{city.name}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`professional-dropdown ${activeDropdown === 'plots' ? 'active' : ''}`} style={{ position: 'relative' }}>
          <span className="nav-link" onClick={(e) => toggleDropdown('plots', e)} style={{ cursor: 'pointer' }}>Plot / Land ▾</span>
          <div className="dropdown-menu">
            <Link className="nav-link" to="/plots" onClick={() => { 
              setView('plots'); 
              setSelectedCity('India');
              setSearchFilters({ listingType: 'Plots / Land', type: 'Commercial', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
              closeMobileMenu(); 
            }}>Commercial</Link>
            <Link className="nav-link" to="/plots" onClick={() => { 
              setView('plots'); 
              setSelectedCity('India');
              setSearchFilters({ listingType: 'Plots / Land', type: 'Residential', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
              closeMobileMenu(); 
            }}>Residential</Link>
            <Link className="nav-link" to="/plots" onClick={() => { 
              setView('plots'); 
              setSelectedCity('India');
              setSearchFilters({ listingType: 'Plots / Land', type: 'Agriculture', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
              closeMobileMenu(); 
            }}>Agriculture</Link>
          </div>
        </div>

        <Link className="nav-link" to="/nri-corner" onClick={() => { setView('nri'); closeMobileMenu(); }}>NRI Corner</Link>
      </div>
      {/* ... (rest of nav remains unchanged) ... */}

      <div className="nav-right">
        {isLoggedIn ? (
          <div className={`professional-dropdown ${activeDropdown === 'account' ? 'active' : ''}`} style={{ position: 'relative' }}>
            <button className="nav-btn-solid" onClick={(e) => toggleDropdown('account', e)}>ACCOUNT ▾</button>
            <div className="dropdown-menu" style={{ right: '0' }}>
                <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--gold2)', fontWeight: '800' }}>WELCOME</div>
                    <div style={{ fontSize: '13px', color: '#fff', fontWeight: '700' }}>{currentUser?.name ? currentUser.name.split(' ')[0] : 'User'}</div>
                </div>
                <Link className="nav-link" to="/profile" onClick={() => { setView('profile'); closeMobileMenu(); }} style={{ display: 'block' }}>Profile</Link>
                {currentUser?.role === 'ADMIN' && <Link className="nav-link" to="/admin" onClick={() => { setView('admin'); closeMobileMenu(); }} style={{ display: 'block' }}>Admin</Link>}
                {currentUser?.role === 'PARTNER' && <Link className="nav-link" to="/partner-dashboard" onClick={() => { setView('partner'); closeMobileMenu(); }} style={{ display: 'block' }}>Partner</Link>}
                {currentUser?.role === 'CONTRACTOR' && <Link className="nav-link" to="/contractor-dashboard" onClick={() => { setView('contractor'); closeMobileMenu(); }} style={{ display: 'block' }}>Workspace</Link>}
                <button onClick={() => { logout(); closeMobileMenu(); }} className="nav-link" style={{ display: 'block', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--red)' }}>Logout</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to="/auth" className="nav-link hide-mobile" onClick={() => { setView('auth'); closeMobileMenu(); }} style={{ fontWeight: 'bold' }}>Sign in</Link>
            <div className={`professional-dropdown ${activeDropdown === 'partners' ? 'active' : ''}`} style={{ position: 'relative' }}>
              <span className="nav-btn-ghost" onClick={(e) => toggleDropdown('partners', e)} style={{ cursor: 'pointer' }}>Partners ▾</span>
              <div className="dropdown-menu" style={{ right: '0' }}>
                <Link to="/partner-auth" className="nav-link" onClick={() => { setView('auth'); closeMobileMenu(); }} style={{ display: 'block' }}>Partner Login</Link>
                <Link to="/contractor-auth" className="nav-link" onClick={() => { setView('auth'); closeMobileMenu(); }} style={{ display: 'block' }}>Developer Login</Link>
                <Link to="/auth" className="nav-link show-mobile-only" onClick={() => { setView('auth'); closeMobileMenu(); }} style={{ display: 'none' }}>Investor Sign In</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
