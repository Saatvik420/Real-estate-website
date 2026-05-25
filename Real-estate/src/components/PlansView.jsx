import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const PlansView = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useApp();

  const plans = [
    {
      name: "Starter",
      tagline: "For Individual Buyers",
      price: "Free",
      priceNum: 0,
      features: ["Standard Verification", "Community Support", "Basic Analytics", "View 5 Properties/day"],
      color: "var(--muted2)",
      recommended: false
    },
    {
      name: "Growth",
      tagline: "For Aspiring Investors",
      price: "₹4,999/mo",
      priceNum: 4999,
      features: ["Tier-1 Project Access", "Direct Builder Chat", "ROI Analytics", "Unlimited Property Views", "Priority Support"],
      color: "var(--gold)",
      highlight: true,
      recommended: true
    },
    {
      name: "Legacy",
      tagline: "For Ultra-HNIs",
      price: "₹14,999/mo",
      priceNum: 14999,
      features: ["Private Site Visits", "Legal Concierge", "Priority Allocation", "Dedicated Asset Manager", "Tax Optimization"],
      color: "var(--ink)",
      recommended: false
    }
  ];

  const handleProceed = (plan) => {
    if (!isLoggedIn) {
      navigate('/auth');
    } else {
      navigate('/payment', { state: { plan } });
    }
  };

  return (
    <div className="section-full" style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingTop: '120px' }}>
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="eyebrow" style={{ textAlign: 'center' }}>Membership Tiers</div>
          <h2 className="sec-title" style={{ textAlign: 'center' }}>Elevate Your <span>Real Estate Journey</span></h2>
          <p className="sec-sub" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            Choose the plan that fits your investment scale. All premium plans come with a 30-day money-back guarantee.
          </p>
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ 
              padding: '3.5rem 2.5rem', 
              background: plan.highlight ? 'var(--ink)' : 'var(--white)', 
              color: plan.highlight ? '#fff' : 'var(--ink)',
              borderRadius: '24px', 
              border: plan.highlight ? '2px solid var(--gold2)' : '1px solid var(--cream3)',
              boxShadow: plan.highlight ? '0 30px 60px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.05)',
              position: 'relative',
              transition: 'transform 0.3s ease',
              zIndex: plan.highlight ? 2 : 1
            }}>
              {plan.recommended && (
                <div style={{ 
                  position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--gold)', color: 'var(--ink)', 
                  fontSize: '11px', fontWeight: 900, padding: '6px 16px', 
                  borderRadius: '100px', textTransform: 'uppercase',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>Recommended Choice</div>
              )}

              <div style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: plan.highlight ? 'var(--gold2)' : 'var(--gold)' }}>{plan.name}</div>
              <div style={{ fontSize: '0.95rem', opacity: 0.7, marginBottom: '2.5rem' }}>{plan.tagline}</div>
              
              <div style={{ marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>{plan.price.split('/')[0]}</span>
                <span style={{ fontSize: '1rem', opacity: 0.6 }}>{plan.price.includes('/') ? '/' + plan.price.split('/')[1] : ''}</span>
              </div>
              
              <div style={{ height: '1px', background: plan.highlight ? 'rgba(255,255,255,0.1)' : 'var(--cream3)', marginBottom: '2.5rem' }}></div>

              <ul style={{ listStyle: 'none', marginBottom: '3.5rem', minHeight: '200px' }}>
                {plan.features.map((feat, fidx) => (
                  <li key={fidx} style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1rem' }}>
                    <span style={{ color: 'var(--gold2)', marginTop: '4px' }}>✦</span> 
                    <span style={{ opacity: 0.9 }}>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={plan.highlight ? "nav-btn-solid" : "nav-btn-ghost"} 
                style={{ width: '100%', padding: '18px', fontWeight: 700 }}
                onClick={() => handleProceed(plan)}
              >
                {plan.priceNum === 0 ? 'START FOR FREE' : 'SELECT THIS PLAN'}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Section Placeholder */}
        <div style={{ marginTop: '100px', padding: '60px', background: 'var(--white)', borderRadius: '32px', border: '1px solid var(--cream3)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '40px', fontFamily: "'Playfair Display', serif", fontSize: '32px' }}>Why Upgrade?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            {[
              { title: 'Verified Listings', desc: 'Get access to properties that have been physically verified by our experts.' },
              { title: 'Expert Consultation', desc: 'Direct access to top-tier real estate consultants for personalized advice.' },
              { title: 'Market Insights', desc: 'Exclusive monthly reports on ROI and market trends in your selected areas.' }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--gold)', fontSize: '24px', marginBottom: '15px' }}>★</div>
                <h4 style={{ marginBottom: '10px', fontWeight: 800 }}>{item.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansView;
