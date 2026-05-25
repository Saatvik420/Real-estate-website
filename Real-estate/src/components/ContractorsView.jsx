import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';
import LeadFormModal from './LeadFormModal';

const ContractorsView = () => {
  const { contractors, setView } = useApp();
  const [filterExpertise, setFilterExpertise] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeContractor, setActiveContractor] = useState(null);
  const [modalMode, setModalMode] = useState('contact'); // 'contact' | 'view_number'
  const [revealedNumbers, setRevealedNumbers] = useState({});

  const allExpertise = ['All', ...new Set(contractors.map(c => c.expertise.split(' & ')[0].split(' / ')[0]))];

  const filteredContractors = filterExpertise === 'All' 
    ? contractors 
    : contractors.filter(c => c.expertise.includes(filterExpertise));

  const handleContactClick = (contractor, mode) => {
    if (mode === 'view_number' && revealedNumbers[contractor.id]) {
      alert(`Contractor's Number: ${contractor.contact}`);
      return;
    }
    setActiveContractor(contractor);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleLeadSuccess = () => {
    setIsModalOpen(false);
    if (modalMode === 'view_number' && activeContractor) {
      setRevealedNumbers(prev => ({ ...prev, [activeContractor.id]: true }));
      alert(`Success! Contractor's Number: ${activeContractor.contact}`);
    } else {
      alert('Thank you! The contractor will contact you shortly to discuss your project.');
    }
  };

  return (
    <div className="section reveal-full reveal" style={{ minHeight: '80vh', padding: '60px 0', background: '#fcfaf7' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '40px' }}>
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Premium <span>Contractors & Designers</span></h2>
            <p className="sec-sub">Verified experts for luxury interiors, construction, and architectural restoration</p>
          </div>
        </div>

        <div className="filter-bar" style={{ marginBottom: '30px', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--ink)' }}>Specialization:</span>
          {allExpertise.slice(0, 8).map(exp => (
            <button 
              key={exp}
              onClick={() => setFilterExpertise(exp)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid var(--gold2)',
                background: filterExpertise === exp ? 'var(--gold2)' : 'transparent',
                color: filterExpertise === exp ? '#fff' : 'var(--gold2)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              {exp}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))', gap: '30px' }}>
          {filteredContractors.map(cont => (
            <div key={cont.id} className="agent-card-landscape" style={{ flexDirection: 'column', height: 'auto' }}>
              <div className="acl-img" style={{ backgroundImage: `url('${cont.img}')`, height: '250px', width: '100%', borderRadius: '16px 16px 0 0' }}>
                <span className="acl-badge">⭐ {cont.rating}</span>
              </div>
              <div className="acl-body" style={{ padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>{cont.name}</div>
                        <div style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{cont.expertise}</div>
                    </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '10px' }}>📍 {cont.location}</div>
                    <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6', height: '75px', overflow: 'hidden' }}>{cont.personalBio}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px', padding: '15px 0', borderTop: '1px solid var(--cream3)', borderBottom: '1px solid var(--cream3)', marginBottom: '25px' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted2)', textTransform: 'uppercase', marginBottom: '5px' }}>Projects Done</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>{cont.completedProjects}+</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted2)', textTransform: 'uppercase', marginBottom: '5px' }}>Verification</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--green)' }}>✓ Platinum Partner</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      className="nav-btn-solid" 
                      style={{ flex: 1, padding: '12px 0', fontSize: '0.85rem' }} 
                      onClick={() => handleContactClick(cont, 'contact')}
                    >
                      Hire for Project
                    </button>
                    <button 
                      className="nav-btn-ghost" 
                      style={{ flex: 1, padding: '12px 0', fontSize: '0.85rem', borderColor: 'var(--gold)', color: 'var(--gold)' }} 
                      onClick={() => handleContactClick(cont, 'view_number')}
                    >
                      {revealedNumbers[cont.id] ? cont.contact : 'View Number'}
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LeadFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleLeadSuccess}
        title={modalMode === 'contact' ? `Work with ${activeContractor?.name}` : `Direct Line: ${activeContractor?.name}`}
        subtitle={modalMode === 'contact' ? "Share your project requirements for a custom quote." : "Verify your identity to unlock premium contractor contacts."}
      />
    </div>
  );
};

export default ContractorsView;
