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

      <div className="landscape-projects-list">
        {companies.map(comp => comp.projects.map(project => (
          <div 
            key={project.id} 
            className="project-landscape-card" 
            onClick={() => handleProjectClick(project.id)}
          >
            {/* Image Section */}
            <div className="project-image-wrap">
              <div 
                className="project-img" 
                style={{ backgroundImage: `url('${project.img}')` }}
              ></div>
              <div className="project-status-badge" style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: project.status === 'Completed' ? 'var(--green)' : 'var(--gold2)',
                color: project.status === 'Completed' ? '#fff' : 'var(--ink)',
                padding: '6px 16px',
                borderRadius: '50px',
                fontSize: '11px',
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
              <div className="project-type" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--gold)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                {project.type} Plot Development
              </div>
              <h3 className="project-name" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 32px)', color: 'var(--ink)', marginBottom: '15px' }}>
                {project.name}
              </h3>
              <div className="project-location" style={{ fontSize: '14px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                📍 {project.location}
              </div>
              
              <div className="project-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div className="p-stat">
                  <div style={{ fontSize: '10px', color: 'var(--muted2)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>Plot Investment From</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>{project.priceRange ? project.priceRange.split(' - ')[0] : 'Contact for Price'}</div>
                </div>
                <div className="p-stat">
                  <div style={{ fontSize: '10px', color: 'var(--muted2)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>Registry / Possession</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>{project.possession === 'Ready' ? 'Immediate' : project.possession}</div>
                </div>
              </div>

              <div className="project-actions" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button 
                  className="nav-btn-solid" 
                  style={{ padding: '12px 25px', fontSize: '13px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project.id);
                  }}
                >
                  VIEW PLOT DETAILS
                </button>
                {project.pdfUrl && (
                  <a 
                    href={project.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="nav-btn-ghost"
                    style={{ padding: '12px 25px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    DOWNLOAD BROCHURE
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
