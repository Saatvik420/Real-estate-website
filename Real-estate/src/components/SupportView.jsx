import React from 'react';
import { useApp } from '../hooks/useApp';

const SupportView = () => {
  const { setView } = useApp();

  const faq = [
    { q: 'How does BharatEstates verify property listings?', a: 'Every listing undergoes a 3-tier verification process: Legal Due Diligence, RERA Authenticity Check, and On-site Physical Audit by our regional hubs.' },
    { q: 'Are there any fees for initial consultation?', a: 'Our primary advisory desk provides complimentary consultation for HNIs and NRIs. Bespoke legal and registration concierge services are available on a fixed-fee basis.' },
    { q: 'Can you assist with home loans for NRIs?', a: 'Yes, we have exclusive partnerships with 15+ banks offering specialized interest rates and streamlined processing for non-resident investors.' },
    { q: 'Do you handle property management for secondary homes?', a: 'Absolutely. Our Portfolio Management team handles everything from tenant vetting to maintenance for our global clients.' }
  ];

  return (
    <div className="section-full" style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '60px' }}>
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Advisory <span>Support</span></h2>
            <p className="sec-sub">Expert Guidance through every stage of your Luxury Investment</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '80px' }}>
            <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '32px' }}>Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {faq.map((item, idx) => (
                        <div key={idx} style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid var(--cream3)' }}>
                            <div style={{ fontWeight: 800, marginBottom: '10px', color: 'var(--ink)' }}>Q: {item.q}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.6' }}>{item.a}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div style={{ background: 'var(--ink)', padding: '50px', borderRadius: '24px', color: '#fff' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '15px' }}>Help Center</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Can't find what you're looking for? Reach out to our 24/7 client happiness team.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gold2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📞</div>
                            <div>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6 }}>Toll-Free (India)</div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>1800-LUX-BHRT</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gold2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>✉️</div>
                            <div>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6 }}>Client Support</div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>care@bharatestates.com</div>
                            </div>
                        </div>
                    </div>

                    <button className="nav-btn-solid" style={{ width: '100%', marginTop: '40px', padding: '16px' }} onClick={() => setView('contact')}>Raise a Support Ticket</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SupportView;
