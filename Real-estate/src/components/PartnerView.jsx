import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const PartnerView = () => {
  const { setView } = useApp();
  const navigate = useNavigate();

  return (
    <div className="section-full" style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Developer <span>Portal</span></h2>
            <p className="sec-sub">Partner with Bharat’s most trusted Luxury Real Estate Ecosystem</p>
          </div>
          <button className="nav-btn-ghost" onClick={() => navigate('/partner-auth')} style={{ borderColor: 'var(--gold2)', color: 'var(--ink)', padding: '12px 30px', fontWeight: 800 }}>SIGN IN</button>
        </div>

        <div style={{ background: 'var(--ink)', padding: '80px', borderRadius: '24px', color: '#fff', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '100px' }}>
            <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '24px', color: 'var(--gold2)' }}>Scale Your Reach</h3>
                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '32px' }}>
                    List your Tier-1 projects on BharatEstates and gain direct access to a verified network of 15,000+ HNIs and NRI investors. 
                    Our platform isn't just a listing service—it's a high-intent marketing engine designed for architectural masterpieces.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                        'Direct HNI/NRI Leads with verified KYC',
                        'Premium Project Microsites with 3D Integration',
                        'Market Intelligence & Absorption Analysis',
                        'Exclusive Launch Mandates'
                    ].map((feat, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <div style={{ color: 'var(--gold2)', fontSize: '1.2rem' }}>✓</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{feat}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '50px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>New Partner Inquiry</h4>
                <form className="pd-form" onSubmit={(e) => { e.preventDefault(); alert('Partnership inquiry received. Our developer relations head will contact you.'); }}>
                    <div className="pd-form-group">
                        <label style={{ color: 'rgba(255,255,255,0.6)' }}>Developer Name / Group *</label>
                        <input type="text" placeholder="e.g. Prestige Group" required style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }} />
                    </div>
                    <div className="pd-form-group">
                        <label style={{ color: 'rgba(255,255,255,0.6)' }}>Active RERA Number *</label>
                        <input type="text" placeholder="e.g. MH/2024/0001" required style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }} />
                    </div>
                    <div className="pd-form-group">
                        <label style={{ color: 'rgba(255,255,255,0.6)' }}>Corporate Email *</label>
                        <input type="email" placeholder="e.g. partnerships@lodha.com" required style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }} />
                    </div>
                    <button className="pd-btn-primary" style={{ width: '100%', marginTop: '20px' }}>Submit Credentials</button>
                </form>
            </div>
        </div>

        <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '48px' }}>Our Technology Stack for Partners</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                {[
                    { icon: '📊', title: 'Real-time CRM', desc: 'Manage luxury leads with our proprietary portal.' },
                    { icon: '🗺️', title: 'Inventory Map', desc: 'Live unit-wise status tracking for large projects.' },
                    { icon: '🔐', title: 'Secure Vault', desc: 'Bank-grade document management for registrations.' },
                    { icon: '📱', title: 'Mobile App', desc: 'Stay connected with buyers on the go.' }
                ].map((item, idx) => (
                    <div key={idx} style={{ padding: '30px', border: '1px solid var(--cream3)', borderRadius: '16px' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{item.icon}</div>
                        <h4 style={{ fontWeight: 800, marginBottom: '10px' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerView;
