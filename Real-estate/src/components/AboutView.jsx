import React from 'react';
import { useApp } from '../hooks/useApp';

const AboutView = () => {
  const { setView } = useApp();

  return (
    <div className="section-full reveal" style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '60px' }}>
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Corporate <span>Profile</span></h2>
            <p className="sec-sub">Setting the Gold Standard in Bharat’s Luxury Real Estate</p>
          </div>
        </div>

        <div className="grid-2-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 'clamp(2rem, 8vw, 5rem)', alignItems: 'center', marginBottom: 'clamp(3rem, 10vw, 6rem)' }}>
            <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'var(--h2)', marginBottom: '24px', color: 'var(--ink)' }}>Our Philosophy</h3>
                <p style={{ fontSize: 'var(--body-text)', color: '#555', lineHeight: '1.8', marginBottom: '32px' }}>
                    BharatEstates was founded with a singular vision: to create a transparent, high-integrity marketplace dedicated exclusively to the luxury segment 
                    of the Indian property market. We recognize that for our clients, a home is more than an address—it is an asset, a legacy, and a sanctuary.
                </p>
                <p style={{ fontSize: 'var(--body-text)', color: '#555', lineHeight: '1.8' }}>
                    By combining cutting-edge data analytics with a deeply personalized concierge service, we bridge the gap between global standards 
                    and local expertise. Our platform curates only the finest residences and strategic investments, ensuring every listing meets our 
                    rigorous "Grade-A" certification criteria.
                </p>
            </div>
            <div style={{ position: 'relative' }}>
                <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" 
                    alt="BharatEstates Headquarters" 
                    style={{ width: '100%', borderRadius: '16px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                />
                <div style={{ position: 'absolute', bottom: '-20px', left: 'clamp(-40px, -2vw, -10px)', background: 'var(--ink)', color: 'var(--gold2)', padding: 'clamp(1rem, 3vw, 2rem)', borderRadius: '12px', border: '1px solid var(--gold2)', zIndex: 2 }}>
                    <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800 }}>30+</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Premium Cities</div>
                </div>
            </div>
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: 'clamp(3rem, 10vw, 6rem)' }}>
            {[
                { title: 'The Curator', desc: 'Every property on our platform is hand-selected and verified for legal compliance and architectural excellence.' },
                { title: 'The Strategist', desc: 'Our market intelligence reports provide HNIs with data-driven insights to make high-yield investment decisions.' },
                { title: 'The Concierge', desc: 'From private site visits via helicopter to bespoke legal assistance, our service is tailored for your convenience.' }
            ].map((item, idx) => (
                <div key={idx} style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', background: 'var(--bg-main)', borderRadius: '16px', border: '1px solid var(--cream3)' }}>
                    <div style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '20px', opacity: 0.2, fontWeight: 900 }}>0{idx + 1}</div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginBottom: '16px' }}>{item.title}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
            ))}
        </div>

        <div style={{ textAlign: 'center', background: 'var(--ink)', padding: 'clamp(2rem, 8vw, 5rem) var(--container-pad)', borderRadius: '24px', color: '#fff' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'var(--h2)', marginBottom: '24px' }}>Leadership Excellence</h3>
            <p style={{ maxWidth: '700px', margin: '0 auto 48px', color: 'rgba(255,255,255,0.6)', fontSize: 'var(--body-text)' }}>
                Guided by veterans of the real estate and financial services industry, BharatEstates is committed to transforming how Bharat invests in luxury.
            </p>
            <button className="nav-btn-solid" style={{ padding: '16px 40px', fontSize: '1rem' }} onClick={() => setView('contact')}>Inquire with the Advisory Board</button>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
