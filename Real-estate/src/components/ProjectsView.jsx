import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const ProjectsView = () => {
  const { companies, setView, setSelectedProperty } = useApp();
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    setSelectedProperty(projectId);
    setView('property-details');
    navigate(`/property/${projectId}`);
  };

  return (
    <div className="projects-view-page section reveal">
      <div className="projects-header" style={{ marginBottom: '60px', textAlign: 'center' }}>
        <div className="eyebrow">Iconic Land Developments</div>
        <h2 className="sec-title">Featured <span>Plot Townships</span></h2>
        <p className="sec-sub">Discover our portfolio of premium gated townships and strategic land parcels across India's most spiritual and thriving growth corridors.</p>
      </div>

      <div className="projects-grid-list">
        {companies.map(comp => comp.projects.map(project => (
          <div 
            key={project.id} 
            className="project-grid-card" 
            onClick={() => handleProjectClick(project.id)}
          >
            {/* Media Section */}
            <div className="project-media-wrap">
              {project.img && (typeof project.img === 'string' && (project.img.endsWith('.mp4') || project.img.includes('media'))) ? (
                <video 
                  src={project.img} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div 
                  className="project-img" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundImage: `url('${project.img}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.8s ease'
                  }}
                ></div>
              )}
              <div className="project-status-badge" style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: project.status === 'Completed' ? 'var(--green)' : 'var(--gold2)',
                color: project.status === 'Completed' ? '#fff' : 'var(--ink)',
                padding: '5px 12px',
                borderRadius: '50px',
                fontSize: '10px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                zIndex: 2
              }}>
                {project.status === 'Completed' ? 'Ready for Registry' : project.status}
              </div>
            </div>

            {/* Content Section */}
            <div className="project-content-wrap">
              <div className="project-type" style={{ fontSize: '10px', fontWeight: '800', color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                {project.type} Development
              </div>
              <h3 className="project-name" style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: 'var(--ink)', marginBottom: '10px', lineHeight: '1.3' }}>
                {project.name}
              </h3>
              <div className="project-location" style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                📍 {project.location}
              </div>
              
              <div className="project-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginBottom: '25px', marginTop: 'auto' }}>
                <div className="p-stat">
                  <div style={{ fontSize: '9px', color: 'var(--muted2)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>Registry / Possession</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--ink)' }}>{project.possession === 'Ready' ? 'Immediate' : project.possession}</div>
                </div>
              </div>

              <div className="project-actions" style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="nav-btn-solid" 
                  style={{ padding: '10px 15px', fontSize: '11px', flex: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project.id);
                  }}
                >
                  DETAILS
                </button>
                {project.pdfUrl && (
                  <a 
                    href={project.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="nav-btn-ghost"
                    style={{ padding: '10px 15px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flex: 1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    BROCHURE
                  </a>
                )}
              </div>
            </div>
          </div>
        )))}
      </div>

      <div style={{ marginTop: '80px', padding: '40px', background: 'var(--ink)', borderRadius: '20px', textAlign: 'center', color: '#fff' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', marginBottom: '15px' }}>Interested in our Plot Townships?</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Connect with our land specialists for a private site visit and personalized presentation of our premium plotted developments.
        </p>
        <button className="nav-btn-solid" style={{ background: 'var(--gold2)', color: 'var(--ink)' }}>BOOK SITE VISIT</button>
      </div>
    </div>
  );
};

export default ProjectsView;
