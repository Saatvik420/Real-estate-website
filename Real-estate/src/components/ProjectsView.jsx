import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const ProjectsView = () => {
  const { companies, setView, setSelectedProperty } = useApp();
  const navigate = useNavigate();

  const handleProjectClick = (id) => {
    setSelectedProperty(id);
    setView('details');
    navigate('/details');
  };

  return (
    <div className="section-full" style={{ minHeight: '100vh', padding: '80px 0', background: '#f8f9fa' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '60px' }}>
          <div>
            <div className="eyebrow" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Luxury Developer <span>Portfolios</span></h2>
            <p className="sec-sub"> Landmark architectural marvels and upcoming premium estates</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {companies.map(comp => (
            <div key={comp.id} className="developer-profile-card" style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid var(--cream3)' }}>
              {/* Developer Info Header */}
              <div style={{ padding: '40px', background: 'linear-gradient(to right, var(--ink), #1a1a1a)', color: '#fff', display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: '0 0 120px' }}>
                    <img src={comp.logo} alt={comp.name} style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover', border: '3px solid var(--gold2)' }} />
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <h3 style={{ fontSize: '2.2rem', margin: '0 0 10px 0', color: 'var(--gold2)', fontFamily: "'Playfair Display', serif" }}>{comp.name}</h3>
                            <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', opacity: 0.8 }}>
                                <span>📍 HQ: {comp.headquarters}</span>
                                <span>🏗️ Est. {comp.established}</span>
                            </div>
                        </div>
                        <button className="nav-btn-ghost" style={{ borderColor: 'var(--gold2)', color: 'var(--gold2)', padding: '10px 25px' }}>Visit Website</button>
                    </div>
                    <p style={{ marginTop: '20px', fontSize: '1.1rem', lineHeight: '1.6', opacity: 0.9, maxWidth: '900px' }}>{comp.description}</p>
                </div>
              </div>

              {/* Projects Grid */}
              <div style={{ padding: '40px' }}>
                <h4 style={{ fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '30px', borderLeft: '4px solid var(--gold2)', paddingLeft: '15px' }}>Signature Projects</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                  {comp.projects.map(proj => (
                    <div key={proj.id} className="project-detail-card" onClick={() => handleProjectClick(proj.id)} style={{ border: '1px solid #f0f0f0', borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s', background: '#fff', cursor: 'pointer' }}>
                        <div style={{ height: '220px', backgroundImage: `url('${proj.img || 'https://via.placeholder.com/400x220?text=Project+Image'}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', padding: '5px 12px', borderRadius: '4px', background: proj.status === 'Completed' ? 'var(--green)' : (proj.status === 'Ongoing' ? 'var(--gold2)' : 'var(--ink)'), color: '#fff', fontSize: '0.75rem', fontWeight: 800 }}>
                                {proj.status}
                            </div>
                        </div>
                        <div style={{ padding: '25px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <div>
                                    <h5 style={{ fontSize: '1.25rem', margin: '0 0 5px 0', color: 'var(--ink)' }}>{proj.name}</h5>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--muted2)' }}>📍 {proj.location}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>{proj.priceRange || 'Price on Request'}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--muted2)' }}>{proj.areaRange || 'TBD'}</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', padding: '15px 0', borderTop: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5' }}>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Type</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{proj.type}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Possession</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{proj.possession || 'TBD'}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {proj.amenities?.map((amenity, idx) => (
                                    <span key={idx} style={{ fontSize: '0.7rem', padding: '4px 10px', background: '#f8f9fa', borderRadius: '20px', color: '#666', border: '1px solid #eee' }}>{amenity}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsView;
