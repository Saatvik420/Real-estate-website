import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const HomePlan = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useApp();

  const handlePlanSelection = (plan) => {
    navigate('/plans');
  };

  const plans = [];

  return (
    <div className="section reveal-full reveal" style={{ background: 'var(--cream2)', borderTop: '1px solid var(--cream3)', borderBottom: '1px solid var(--cream3)' }}>
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="eyebrow" style={{ textAlign: 'center' }}>Tailored Excellence</div>
          <h2 className="sec-title" style={{ textAlign: 'center' }}>The <span>One5 Advantage</span> Plans</h2>
          <p className="sec-sub" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>Choose a membership tier that aligns with your real estate ambitions and investment scale.</p>
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ 
              padding: '3rem 2rem', 
              background: plan.highlight ? 'var(--ink)' : 'var(--white)', 
              color: plan.highlight ? '#fff' : 'var(--ink)',
              borderRadius: '20px', 
              border: plan.highlight ? '2px solid var(--gold2)' : '1px solid var(--cream3)',
              boxShadow: plan.highlight ? '0 20px 40px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.05)',
              position: 'relative',
              transform: plan.highlight ? 'scale(1.05)' : 'none',
              zIndex: plan.highlight ? 2 : 1
            }}>
              {plan.highlight && (
                <div style={{ 
                  position: 'absolute', top: '20px', right: '20px', 
                  background: 'var(--gold2)', color: 'var(--ink)', 
                  fontSize: '10px', fontWeight: 900, padding: '4px 12px', 
                  borderRadius: '100px', textTransform: 'uppercase'
                }}>Most Popular</div>
              )}
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: plan.highlight ? 'var(--gold2)' : 'var(--gold)' }}>{plan.name}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '2rem' }}>{plan.tagline}</div>
              <div style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: '2rem' }}>{plan.price}</div>
              
              <ul style={{ listStyle: 'none', marginBottom: '3rem' }}>
                {plan.features.map((feat, fidx) => (
                  <li key={fidx} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--gold2)' }}>✓</span> {feat}
                  </li>
                ))}
              </ul>
              
              <button 
                className={plan.highlight ? "nav-btn-solid" : "nav-btn-ghost"} 
                style={{ width: '100%', padding: '15px' }}
                onClick={() => handlePlanSelection(plan)}
              >
                {plan.name === 'Starter' ? 'GET STARTED' : 'UPGRADE NOW'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePlan;
