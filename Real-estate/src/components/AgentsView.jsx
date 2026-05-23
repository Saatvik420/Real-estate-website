import React, { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const AgentsView = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      const res = await apiService.getAgents();
      if (res.success) {
        setAgents(res.data);
      }
      setLoading(false);
    };
    fetchAgents();
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Consulting our network of experts...</div>;

  return (
    <div className="section-full bg-main reveal" style={{ minHeight: '100vh', paddingTop: '40px' }}>
      <div className="section-inner">
        <div className="sec-header">
          <div>
            <div className="eyebrow">Elite Network</div>
            <h2 className="sec-title">Our Senior <span>Consultants</span></h2>
            <p className="sec-sub">Expert advisors for your high-value real estate transitions</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {agents.map(agent => (
            <div key={agent.id} className="agent-card-landscape">
              <div className="acl-img" style={{ backgroundImage: `url('${agent.img}')`, width: '380px', minWidth: '380px' }}>
                <span className="acl-badge">VERIFIED ADVISOR</span>
                <div className="acl-company">{agent.company}</div>
              </div>
              <div className="acl-body" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--ink)' }}>{agent.name}</div>
                    <div style={{ fontSize: '1rem', color: 'var(--gold)', fontWeight: '700', marginTop: '4px' }}>{agent.designation}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--green)' }}>★ {agent.rating}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '700' }}>{agent.experience} Exp</div>
                  </div>
                </div>
                
                <p style={{ fontSize: '1rem', color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.6' }}>
                  <strong>Expertise:</strong> {agent.specialization || 'Prime Residential & Commercial Estates'}<br/>
                  <span style={{ fontSize: '0.9rem', display: 'block', marginTop: '8px' }}>Specializing in high-yield assets and luxury portfolio management across India's most prestigious micromarkets.</span>
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '30px' }}>
                  {['Global Network', 'RERA Certified', 'Portfolio Mgmt', 'Market Analysis'].map((tag, i) => (
                    <span key={i} style={{ fontSize: '11px', background: 'var(--gold4)', color: 'var(--ink)', padding: '6px 14px', border: '1px solid var(--gold3)', borderRadius: '6px', fontWeight: '700', textTransform: 'uppercase' }}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 'auto', maxWidth: '400px' }}>
                  <a href={`tel:${agent.contact}`} className="nav-btn-ghost" style={{ textAlign: 'center', textDecoration: 'none', padding: '12px' }}>CONTACT AGENT</a>
                  <a href={`mailto:${agent.email}`} className="nav-btn-solid" style={{ textAlign: 'center', textDecoration: 'none', padding: '12px' }}>REQUEST PORTFOLIO</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsView;
