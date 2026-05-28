import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const { setView, setSearchFilters } = useApp();

  return (
    <footer className="reveal">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-col-main">
            <div className="footer-logo">
              <div className="logo-mark" style={{ background: 'var(--gold2)', color: 'var(--ink)' }}>15</div>
              <span style={{ color: 'var(--gold2)' }}>One5<em style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'normal', fontWeight: 400 }}>Realty solutions</em></span>
            </div>
            <p className="footer-desc">
              India's premier gateway to ultra-luxury real estate and verified plot investments. 
              Curating the finest living experiences for the world's most discerning clientele. Our dedicated experts bring decades of experience, unmatched local insights, and a global network to help you secure the home or investment of your dreams.
            </p>
            
            <div className="footer-socials" style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {[
                { icon: FaInstagram, label: 'Instagram' },
                { icon: FaFacebookF, label: 'Facebook' },
                { icon: FaLinkedinIn, label: 'LinkedIn' },
                { icon: FaXTwitter, label: 'X (Twitter)' },
                { icon: FaYoutube, label: 'YouTube' }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="social-icon" 
                  aria-label={social.label}
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#fff', 
                    textDecoration: 'none', 
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--gold2)';
                    e.currentTarget.style.color = 'var(--ink)';
                    e.currentTarget.style.borderColor = 'var(--gold2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <div className="footer-contact" style={{ marginTop: '32px' }}>
              <h4 style={{ color: 'var(--gold2)', fontSize: '14px', marginBottom: '8px' }}>About Us</h4>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '16px' }}>
                At One5 Realty solutions, we bridge the gap between world-class developers and astute buyers. We are more than an agency; we are your strategic partners in luxury real estate, ensuring transparency, security, and exceptional returns.
              </p>
              
              <h4 style={{ color: 'var(--gold2)', fontSize: '14px', marginBottom: '8px' }}>Contact Us</h4>
              <span style={{ display: 'block', marginBottom: '4px' }}>Office 705, 7th Floor, Vishal Tower, Janakpuri District Centre, New Delhi - 110058</span>
              <a href="tel:+919910911650" style={{ display: 'block', marginBottom: '4px' }}>📞 +91 99109 11650 (Advisory)</a>
              <a href="mailto:one5realtysolutions@gmail.com" style={{ display: 'block' }}>✉️ one5realtysolutions@gmail.com</a>
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
              <li><Link to="/insights" onClick={() => setView('insights')}>Market Intelligence</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-h">Corporate</div>
            <ul className="footer-links">
              <li><Link to="/about" onClick={() => setView('about')}>Our Heritage</Link></li>
              {navSettings?.showPress !== false && <li><Link to="/press" onClick={() => setView('press')}>Press Room</Link></li>}
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
          <p>© 2026 One5 Realty solutions Private Limited. All rights reserved.</p>
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
