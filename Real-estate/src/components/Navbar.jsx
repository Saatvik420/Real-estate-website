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
          <div className="logo-mark">B</div>
          <span>Bharat<em>Estates</em></span>
        </Link>
      </div>

      <div className={`nav-center ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link className="nav-link" to="/results" onClick={() => {
          setView('results');
          setSearchFilters({ listingType: 'Buy', type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
          closeMobileMenu();
        }}>Buy</Link>
        <Link className="nav-link" to="/rent" onClick={() => {
          setView('rent');
          setSearchFilters({ listingType: 'Rent', type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
          closeMobileMenu();
        }}>Rent</Link>
        <Link className="nav-link" to="/plots" onClick={() => {
          setView('plots');
          setSearchFilters({ listingType: 'Plots / Land', type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
          closeMobileMenu();
        }}>Plot/Land</Link>
        <Link className="nav-link" to="/agents" onClick={() => { setView('agents'); closeMobileMenu(); }}>Agents</Link>
        <Link className="nav-link" to="/projects" onClick={() => { setView('projects'); closeMobileMenu(); }}>Projects</Link>
        <Link className="nav-link" to="/insights" onClick={() => { setView('insights'); closeMobileMenu(); }}>Insights</Link>
        
        <div className={`professional-dropdown ${activeDropdown === 'corporate' ? 'active' : ''}`} style={{ position: 'relative' }}>
          <span className="nav-link" onClick={(e) => toggleDropdown('corporate', e)} style={{ cursor: 'pointer' }}>Corporate ▾</span>
          <div className="dropdown-menu">
            <Link className="nav-link" to="/about" onClick={() => { setView('about'); closeMobileMenu(); }}>About Us</Link>
            <Link className="nav-link" to="/contact" onClick={() => { setView('contact'); closeMobileMenu(); }}>Contact</Link>
            <Link className="nav-link" to="/press" onClick={() => { setView('press'); closeMobileMenu(); }}>Press</Link>
            <Link className="nav-link" to="/support" onClick={() => { setView('support'); closeMobileMenu(); }}>Support</Link>
          </div>
        </div>
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
