import React from 'react';
import { useApp } from '../hooks/useApp';

const ProjectsView = () => {
  const { companies } = useApp();

  return (
    <div className="projects-view-page section reveal">
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 className="sec-title">Our <span>Projects</span></h2>
        <p className="sec-sub">Coming Soon: A curated collection of premium real estate developments.</p>
      </div>
    </div>
  );
};

export default ProjectsView;
