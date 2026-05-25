import React from 'react';
import { useApp } from '../hooks/useApp';

const AboutView = () => {
  const { setView } = useApp();

  return (
    <div className="section reveal-full reveal" style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '60px' }}>
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">About <span>One5 Realty Solutions</span></h2>
            <p className="sec-sub">Trusted Real Estate Investment Advisory & Solutions</p>
          </div>
        </div>

        <div className="about-hero-text" style={{ marginBottom: '80px' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--ink)', lineHeight: '1.8', marginBottom: '32px', fontWeight: '500' }}>
            Welcome to One5 Realty Solutions, a trusted real estate investment advisory and solutions company owned by <strong>One5 Knowledge Ventures Pvt. Ltd.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '40px' }}>
            <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.8' }}>
              We specialize in offering premium land and plot investment opportunities across different states of India, helping investors identify the right opportunities that align with their financial goals, vision, and long-term wealth creation strategies.
            </p>
            <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.8' }}>
              At One5 Realty Solutions, we believe that real estate is one of the most powerful wealth creators in the world. With India witnessing rapid infrastructure growth, urban expansion, industrial development, and evolving government policies, the land and plotting sector presents immense opportunities for investors from India and across the globe.
            </p>
          </div>
        </div>

        <div className="grid-2-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 'clamp(2rem, 8vw, 5rem)', alignItems: 'center', marginBottom: 'clamp(3rem, 10vw, 6rem)' }}>
            <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '24px', color: 'var(--ink)' }}>The One5 Difference</h3>
                <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.8', marginBottom: '24px' }}>
                  What sets us apart is our in-depth research and strategic approach. Before recommending any project, our team conducts extensive analysis of the developer’s credibility, project authenticity, legal clearances, location potential, government initiatives, future infrastructure and development plans, market trends, and estimated future returns.
                </p>
                <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.8' }}>
                  This comprehensive evaluation ensures that every investment opportunity we present carries strong growth potential and long-term value. We tailor solutions according to individual needs, ensuring transparency and market expertise at every step.
                </p>
            </div>
            <div style={{ position: 'relative' }}>
                <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" 
                    alt="One5 Realty Solutions Headquarters" 
                    style={{ width: '100%', borderRadius: '16px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                />
                <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--ink)', color: 'var(--gold2)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--gold2)', zIndex: 2 }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>Reliable</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Research Driven</div>
                </div>
            </div>
        </div>

        <div className="nri-section" style={{ background: 'var(--bg-main)', padding: '60px', borderRadius: '24px', marginBottom: '80px', border: '1px solid var(--cream3)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '24px', color: 'var(--ink)', textAlign: 'center' }}>Specialized NRI Services</h3>
            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', textAlign: 'center', marginBottom: '32px' }}>
              We ensure complete transparency, secure transactions, and end-to-end assistance for NRI investors. From project verification and documentation support to regular updates and market insights, our dedicated team ensures your investments remain safe, informed, and future-ready.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '20px' }}>
              {['Project Verification', 'Documentation Support', 'Regular Updates', 'Market Insights'].map((service, i) => (
                <div key={i} style={{ padding: '15px', background: '#fff', borderRadius: '10px', textAlign: 'center', fontSize: '0.9rem', fontWeight: '700', color: 'var(--gold)', border: '1px solid var(--gold4)' }}>{service}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', background: 'var(--ink)', padding: 'clamp(2rem, 8vw, 5rem) 48px', borderRadius: '24px', color: '#fff' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '24px' }}>Our Mission</h3>
            <p style={{ maxWidth: '850px', margin: '0 auto 48px', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              At One5 Realty Solutions, we are not just selling plots or land — we are helping individuals and businesses build secure futures, create wealth, and unlock the true potential of real estate investments in India.
            </p>
            <button className="nav-btn-solid" style={{ padding: '16px 40px', fontSize: '1rem' }} onClick={() => setView('contact')}>Build Your Future With Us</button>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
