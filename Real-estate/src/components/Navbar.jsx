import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const Navbar = () => {
  const { setView, setSelectedCity, setSearchFilters, isLoggedIn, currentUser, logout } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Link to="/" className="logo" onClick={() => setView('home')}>
        <div className="logo-mark">B</div>
        <span>Bharat<em>Estates</em></span>
      </Link>

      <div className="nav-center">
        <Link className="nav-link" to="/results" onClick={() => {
          setView('results');
          setSearchFilters({ listingType: 'Buy', type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
        }}>Buy</Link>
        <Link className="nav-link" to="/rent" onClick={() => {
          setView('rent');
          setSearchFilters({ listingType: 'Rent', type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
        }}>Rent</Link>
        <Link className="nav-link" to="/plots" onClick={() => {
          setView('plots');
          setSearchFilters({ listingType: 'Plots / Land', type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
        }}>Plot/Land</Link>
        <Link className="nav-link" to="/agents" onClick={() => setView('agents')}>Agents</Link>
        <Link className="nav-link" to="/projects" onClick={() => setView('projects')}>Projects</Link>
        <Link className="nav-link" to="/insights" onClick={() => setView('insights')}>Insights</Link>
        
        <div className="professional-dropdown" style={{ position: 'relative' }}>
          <span className="nav-link" style={{ cursor: 'pointer' }}>Corporate ▾</span>
          <div className="dropdown-menu" style={{ 
            position: 'absolute', top: '100%', left: '0', background: 'var(--ink)', 
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '10px 0', minWidth: '160px', zIndex: 1000 
          }}>
            <Link className="nav-link" to="/about" onClick={() => setView('about')} style={{ display: 'block' }}>About Us</Link>
            <Link className="nav-link" to="/contact" onClick={() => setView('contact')} style={{ display: 'block' }}>Contact</Link>
            <Link className="nav-link" to="/press" onClick={() => setView('press')} style={{ display: 'block' }}>Press</Link>
            <Link className="nav-link" to="/support" onClick={() => setView('support')} style={{ display: 'block' }}>Support</Link>
          </div>
        </div>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <div className="professional-dropdown" style={{ position: 'relative' }}>
            <button className="nav-btn-solid">MY ACCOUNT</button>
            <div className="dropdown-menu" style={{ 
                position: 'absolute', top: '100%', right: '0', background: 'var(--ink)', 
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '10px 0', minWidth: '180px', zIndex: 1000 
            }}>
                <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--gold2)', fontWeight: '800' }}>WELCOME BACK</div>
                    <div style={{ fontSize: '13px', color: '#fff', fontWeight: '700' }}>{currentUser?.name}</div>
                </div>
                <Link className="nav-link" to="/profile" onClick={() => setView('profile')} style={{ display: 'block' }}>Profile Settings</Link>
                {currentUser?.role === 'ADMIN' && <Link className="nav-link" to="/admin" onClick={() => setView('admin')} style={{ display: 'block' }}>Admin Console</Link>}
                {currentUser?.role === 'PARTNER' && <Link className="nav-link" to="/partner-dashboard" onClick={() => setView('partner')} style={{ display: 'block' }}>Partner Dashboard</Link>}
                {currentUser?.role === 'CONTRACTOR' && <Link className="nav-link" to="/contractor-dashboard" onClick={() => setView('contractor')} style={{ display: 'block' }}>Workspace</Link>}
                <button onClick={logout} className="nav-link" style={{ display: 'block', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--red)' }}>Secure Logout</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to="/auth" className="nav-link" onClick={() => setView('auth')} style={{ fontWeight: 'bold' }}>Sign in</Link>
            
            <div className="professional-dropdown" style={{ position: 'relative' }}>
              <span className="nav-btn-ghost" style={{ cursor: 'pointer' }}>Partners ▾</span>
              <div className="dropdown-menu" style={{ 
                position: 'absolute', top: '100%', right: '0', background: 'var(--ink)', 
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '10px 0', minWidth: '160px', zIndex: 1000 
              }}>
                <Link to="/partner-auth" className="nav-link" onClick={() => setView('auth')} style={{ display: 'block' }}>Partner Login</Link>
                <Link to="/contractor-auth" className="nav-link" onClick={() => setView('auth')} style={{ display: 'block' }}>Developer Login</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
