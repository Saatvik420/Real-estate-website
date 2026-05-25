import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const Navbar = () => {
  const { setView, setSelectedCity, setSearchFilters, isLoggedIn, currentUser, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'corporate' | 'account' | 'partners' | null
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name, e) => {
    const isMobile = window.matchMedia("(max-width: 992px)").matches;
    if (!isMobile) return; 
    
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav className="nav">
      <div className="nav-left-mobile">
        <button className="hamburger" onClick={toggleMobileMenu}>
          <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>
        <Link to="/" className="logo" onClick={() => { setView('home'); closeMobileMenu(); }}>
          <div className="logo-mark">15</div>
          <span>One5<em style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'normal', fontWeight: 400 }}>Realty solutions</em></span>
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
            <div className="nested-dropdown">
              <span className="nav-link">Rajasthan <span style={{ fontSize: '10px' }}>▶</span></span>
              <div className="nested-menu">
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Khatu Shyam'); closeMobileMenu(); }}>Khatu Shyam</Link>
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Paota'); closeMobileMenu(); }}>Paota</Link>
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Behror'); closeMobileMenu(); }}>Behror</Link>
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Neemrana'); closeMobileMenu(); }}>Neemrana</Link>
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Jaipur'); closeMobileMenu(); }}>Jaipur</Link>
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Ajmer Road'); closeMobileMenu(); }}>Ajmer Road</Link>
              </div>
            </div>
            <div className="nested-dropdown">
              <span className="nav-link">U.P. <span style={{ fontSize: '10px' }}>▶</span></span>
              <div className="nested-menu">
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Noida'); closeMobileMenu(); }}>Noida</Link>
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Greater Noida'); closeMobileMenu(); }}>Greater Noida</Link>
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Vrindavan'); closeMobileMenu(); }}>Vrindavan</Link>
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Ayodhya'); closeMobileMenu(); }}>Ayodhya</Link>
              </div>
            </div>
            <div className="nested-dropdown">
              <span className="nav-link">Uttarakhand <span style={{ fontSize: '10px' }}>▶</span></span>
              <div className="nested-menu">
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Dehradun'); closeMobileMenu(); }}>Dehradun</Link>
                <Link className="nav-link" to="/results" onClick={() => { setView('results'); setSelectedCity('Haridwar'); closeMobileMenu(); }}>Haridwar</Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`professional-dropdown ${activeDropdown === 'plots' ? 'active' : ''}`} style={{ position: 'relative' }}>
          <span className="nav-link" onClick={(e) => toggleDropdown('plots', e)} style={{ cursor: 'pointer' }}>Plot / Land ▾</span>
          <div className="dropdown-menu">
            <Link className="nav-link" to="/results" onClick={() => { 
              setView('results'); 
              setSearchFilters({ listingType: 'Plots / Land', type: 'Commercial', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
              closeMobileMenu(); 
            }}>Commercial</Link>
            <Link className="nav-link" to="/results" onClick={() => { 
              setView('results'); 
              setSearchFilters({ listingType: 'Plots / Land', type: 'Residential', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
              closeMobileMenu(); 
            }}>Residential</Link>
            <Link className="nav-link" to="/results" onClick={() => { 
              setView('results'); 
              setSearchFilters({ listingType: 'Plots / Land', type: 'Agriculture', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
              closeMobileMenu(); 
            }}>Agriculture</Link>
          </div>
        </div>

        <Link className="nav-link" to="/nri-corner" onClick={() => { setView('nri'); closeMobileMenu(); }}>NRI Corner</Link>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <div className={`professional-dropdown ${activeDropdown === 'account' ? 'active' : ''}`} style={{ position: 'relative' }}>
            <button className="nav-btn-solid" onClick={(e) => toggleDropdown('account', e)}>ACCOUNT ▾</button>
            <div className="dropdown-menu" style={{ right: '0' }}>
                <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--gold2)', fontWeight: '800' }}>WELCOME</div>
                    <div style={{ fontSize: '13px', color: '#fff', fontWeight: '700' }}>{currentUser?.name?.split(' ')[0]}</div>
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
