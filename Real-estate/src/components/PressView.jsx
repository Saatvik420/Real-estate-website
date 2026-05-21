import React from 'react';
import { useApp } from '../hooks/useApp';

const PressView = () => {
  const { setView } = useApp();

  const releases = [
    { date: 'May 14, 2026', title: 'BharatEstates Crosses ₹5,000 Cr in Luxury Transaction Volume', category: 'Corporate' },
    { date: 'April 22, 2026', title: 'New "Market Intelligence 2.0" Dashboard Launched for Global NRIs', category: 'Product' },
    { date: 'March 05, 2026', title: 'Exclusively Mandated: DLF’s Most Expensive Penthouse Collection', category: 'Partnership' },
    { date: 'Feb 18, 2026', title: 'BharatEstates Expands to Dubai with Strategic Business Bay Hub', category: 'Expansion' }
  ];

  return (
    <div className="section-full" style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '60px' }}>
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Press & <span>Media</span></h2>
            <p className="sec-sub">Official Announcements and Global Media Presence</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
            <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '32px' }}>Latest Newsroom</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {releases.map((item, idx) => (
                        <div key={idx} style={{ padding: '32px 0', borderBottom: '1px solid var(--cream3)', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                            <div style={{ minWidth: '120px' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--gold)' }}>{item.date}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--muted2)', textTransform: 'uppercase', marginTop: '4px' }}>{item.category}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--ink)', cursor: 'pointer' }}>{item.title}</h4>
                                <a href="#" style={{ fontSize: '0.8rem', color: 'var(--gold)', textDecoration: 'none', fontWeight: 800, display: 'inline-block', marginTop: '12px' }}>Read Release →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div style={{ background: 'var(--bg-main)', padding: '40px', borderRadius: '16px', border: '1px solid var(--cream3)' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '20px' }}>Media Kit</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '24px', lineHeight: '1.6' }}>Download our brand assets, leadership bios, and high-resolution corporate photography.</p>
                    <button className="nav-btn-ghost" style={{ width: '100%', borderColor: 'var(--ink)', color: 'var(--ink)' }}>Download Kit (.ZIP)</button>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <h4 style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: 'var(--muted2)' }}>Media Contacts</h4>
                    <div style={{ fontSize: '0.95rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--ink)' }}>Sanjana Mehta</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Head of Communications</div>
                        <a href="mailto:press@bharatestates.com" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>press@bharatestates.com</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PressView;
