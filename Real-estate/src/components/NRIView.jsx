import React from 'react';
import { useApp } from '../hooks/useApp';

const NRIView = () => {
  const { setView } = useApp();

  const nriBenefits = [
    {
      title: 'Project Verification',
      desc: 'Rigorous due diligence on developer credibility, land titles, and RERA compliance.',
      icon: '🛡️'
    },
    {
      title: 'Documentation Support',
      desc: 'End-to-end assistance with legal paperwork, PoA (Power of Attorney), and regulatory filings.',
      icon: '📄'
    },
    {
      title: 'Secure Transactions',
      desc: 'Ensuring transparent fund transfers and compliance with FEMA and RBI guidelines.',
      icon: '🔒'
    },
    {
      title: 'Real-time Updates',
      desc: 'Regular project progress reports, photographs, and site videos shared directly with you.',
      icon: '📹'
    },
    {
      title: 'Market Insights',
      desc: 'Strategic data on micro-market trends to help you identify high-appreciation zones.',
      icon: '📊'
    },
    {
      title: 'Portfolio Management',
      desc: 'Tailored advice to diversify your Indian real estate holdings for long-term wealth.',
      icon: '💼'
    }
  ];

  const handleScheduleConsultation = () => {
    const phoneNumber = "919910911650"; // Based on the footer contact info
    const message = encodeURIComponent("Hello One5 Realty Solutions! I am interested in scheduling a virtual consultation for NRI investment opportunities. Please guide me further.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="section-full reveal" style={{ background: '#faf9f7', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '60px' }}>
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">NRI <span>Corner</span></h2>
            <p className="sec-sub">Bespoke Investment Solutions for Global Investors</p>
          </div>
        </div>

        <div className="nri-hero-card" style={{ 
          background: 'var(--ink)', 
          borderRadius: '24px', 
          padding: '60px', 
          color: '#fff', 
          marginBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0,0,0,0.2)'
        }}>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '24px', color: 'var(--gold2)' }}>
              Investing in Bharat, Simplified.
            </h3>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
              At One5 Realty Solutions, we understand the unique challenges faced by overseas investors. From time-zone differences to regulatory complexities, our mission is to act as your "On-Ground Partners" in India's fast-growing real estate sector.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button className="nav-btn-solid" style={{ padding: '16px 32px' }} onClick={handleScheduleConsultation}>Schedule a Virtual Consultation</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '700', color: 'var(--gold2)' }}>
                <span style={{ fontSize: '20px' }}>🌍</span> Global Client Support 24/7
              </div>
            </div>
          </div>
          <div style={{ 
            position: 'absolute', 
            top: '-50px', 
            right: '-50px', 
            width: '400px', 
            height: '400px', 
            background: 'radial-gradient(circle, rgba(189,168,113,0.1) 0%, transparent 70%)',
            zIndex: 1
          }}></div>
        </div>

        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '16px', color: 'var(--ink)' }}>Our Specialized NRI Services</h3>
          <p style={{ color: 'var(--muted)', maxWidth: '700px', margin: '0 auto' }}>We ensure complete transparency and end-to-end assistance throughout your investment journey.</p>
        </div>

        <div className="nri-services-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '80px'
        }}>
          {nriBenefits.map((item, idx) => (
            <div key={idx} style={{ 
              background: '#fff', 
              padding: '32px', 
              borderRadius: '16px', 
              border: '1px solid var(--cream3)',
              transition: 'all 0.3s'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{item.icon}</div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '12px', color: 'var(--ink)' }}>{item.title}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ 
          background: 'var(--gold4)', 
          padding: '60px', 
          borderRadius: '24px', 
          textAlign: 'center',
          border: '1px solid var(--gold2)'
        }}>
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '20px', color: 'var(--ink)' }}>Ready to unlock India's growth potential?</h4>
          <p style={{ maxWidth: '650px', margin: '0 auto 32px', color: 'var(--text)', fontWeight: '500' }}>
            Our dedicated team stays connected with NRI clients at every stage, ensuring your investments remain safe, informed, and future-ready.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
             <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '5px' }}>Email Us</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>one5realtysolutions@gmail.com</div>
             </div>
             <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '5px' }}>Direct Support</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>+91 99109 11650</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NRIView;
