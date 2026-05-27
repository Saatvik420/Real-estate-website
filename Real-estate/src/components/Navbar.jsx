import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import logoDark from '../../logo/logo-dark.svg';

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
    setView('state');
    closeMobileMenu();
    navigate(`/state/${city.stateId}`);
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
          <img src={logoDark} alt="One5 Realty" style={{ display: 'block', maxWidth: '100%', height: 'auto', width: '160px' }} />
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Link className="nav-link" to={`/state/${state.id}`} onClick={() => { setView('state'); setSelectedState(state.id); setSelectedCity('All'); closeMobileMenu(); }} style={{ flex: 1 }}>{state.name}</Link>
                  <span className="nav-link" onClick={(e) => toggleNestedDropdown(state.id, e)} style={{ paddingLeft: '0', cursor: 'pointer' }}> <span style={{ fontSize: '10px' }}>▶</span></span>
                </div>
                <div className="nested-menu">
                  {allCities.filter(c => c.stateId === state.id).map(city => (
                    <Link key={city.id} className="nav-link" to={`/state/${state.id}`} onClick={() => handleCityClick(city)}>{city.name}</Link>
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
