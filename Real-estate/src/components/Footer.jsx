import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const Footer = () => {
  const { setView, setSearchFilters } = useApp();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-col-main" style={{ gridColumn: 'span 2' }}>
            <div className="footer-logo">
              <div className="logo-mark" style={{ background: 'var(--gold2)', color: 'var(--ink)' }}>B</div>
              <span style={{ color: 'var(--gold2)' }}>Bharat<em>Estates</em></span>
            </div>
            <p className="footer-desc">
              India's premier gateway to ultra-luxury real estate and verified plot investments. 
              Curating the finest living experiences for the world's most discerning clientele. Our dedicated experts bring decades of experience, unmatched local insights, and a global network to help you secure the home or investment of your dreams.
            </p>
            <div className="footer-contact">
              <h4 style={{ color: 'var(--gold2)', fontSize: '14px', marginBottom: '8px' }}>About Us</h4>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '16px' }}>
                At BharatEstates, we bridge the gap between world-class developers and astute buyers. We are more than an agency; we are your strategic partners in luxury real estate, ensuring transparency, security, and exceptional returns.
              </p>
              
              <h4 style={{ color: 'var(--gold2)', fontSize: '14px', marginBottom: '8px' }}>Contact Us</h4>
              <span style={{ display: 'block', marginBottom: '4px' }}>Corporate HQ: 15th Floor, The Capital, BKC, Mumbai, Maharashtra 400051</span>
              <span style={{ display: 'block', marginBottom: '4px' }}>Regional Office: Cyber City, Phase 2, Gurugram, Haryana</span>
              <a href="tel:+919876543210" style={{ display: 'block', marginBottom: '4px' }}>📞 +91 98765 43210 (Sales)</a>
              <a href="tel:+919876543211" style={{ display: 'block', marginBottom: '4px' }}>📞 +91 98765 43211 (Support)</a>
              <a href="mailto:concierge@bharatestates.com" style={{ display: 'block' }}>✉️ concierge@bharatestates.com</a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-h">Portfolios</div>
            <ul className="footer-links">
              <li><Link to="/results" onClick={() => {
                setView('results');
                setSearchFilters({ listingType: 'Buy', type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
              }}>Luxury Residences</Link></li>
              <li><Link to="/rent" onClick={() => setView('rent')}>Premium Rentals</Link></li>
              <li><Link to="/plots" onClick={() => setView('plots')}>Estate Plots</Link></li>
              <li><Link to="/projects" onClick={() => setView('projects')}>New Launches</Link></li>
              <li><Link to="/agents" onClick={() => setView('agents')}>Elite Agents</Link></li>
              <li><Link to="/insights" onClick={() => setView('insights')}>Market Intelligence</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-h">Corporate</div>
            <ul className="footer-links">
              <li><Link to="/about" onClick={() => setView('about')}>Our Heritage</Link></li>
              <li><Link to="/press" onClick={() => setView('press')}>Press Room</Link></li>
              <li><Link to="/contact" onClick={() => setView('contact')}>Global Offices</Link></li>
              <li><Link to="/support" onClick={() => setView('support')}>Client Support</Link></li>
              <li><Link to="/partner" onClick={() => setView('partner')}>Partner Network</Link></li>
              <li><Link to="/auth" onClick={() => setView('auth')}>Client Portal</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-h">Newsletter</div>
            <p style={{ fontSize: '13px', marginBottom: '16px', color: 'rgba(255,255,255,0.7)' }}>Subscribe for private invitations to pre-launch events and exclusive market reports.</p>
            <div className="newsletter-form" style={{ flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Your Full Name" style={{ width: '100%' }} />
              <input type="email" placeholder="Your Work Email" style={{ width: '100%' }} />
              <button style={{ width: '100%', padding: '12px' }}>JOIN EXCLUSIVE LIST</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 BharatEstates Private Limited. All rights reserved.</p>
          <div className="footer-badges">
            <span className="f-badge">RERA Registered</span>
            <span className="f-badge">PCI-DSS Secure</span>
            <span className="f-badge">ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
