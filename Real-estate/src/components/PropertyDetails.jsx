import React, { useEffect, useState } from 'react';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const PropertyDetails = () => {
  const { selectedProperty } = useApp();
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedProperty) {
        setLoading(true);
        const res = await apiService.getPropertyById(selectedProperty);
        if (res.success) {
          setProperty(res.data);
          
          if (res.data.agentId) {
            const agentRes = await apiService.getAgentById(res.data.agentId);
            if (agentRes.success) {
              setAgent(agentRes.data);
            }
          }
        }
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo(0, 0);
  }, [selectedProperty]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Estate Details...</div>;
  if (!property) return <div style={{ padding: '100px', textAlign: 'center' }}>Property not found.</div>;

  return (
    <div className="property-details-page">
      <div className="pd-header-bg" style={{ backgroundImage: `url('${property.img}')` }}>
        <div className="pd-overlay"></div>
        <div className="pd-header-content">
          <div className="pd-meta-top">
            <span className="pd-status-tag">{property.status}</span>
            <span>{property.type}</span>
            <span>RERA: {property.rera || 'Applied'}</span>
          </div>
          <h1 className="pd-title">{property.title}</h1>
          <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>📍 {property.location}, {property.cityId}</div>
        </div>
      </div>

      <div className="section">
        <div className="pd-main-grid">
          <div className="pd-left">
            <div className="pd-section">
              <h3 className="pd-sec-title">Estate Overview</h3>
              <p className="pd-desc">
                This exceptional {property.type} by {property.developer} represents the pinnacle of luxury living in {property.location}. 
                Carefully curated for the modern connoisseur, it offers an unparalleled blend of sophistication and comfort.
              </p>
              <div className="pd-quick-stats">
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl">Price</span>
                  <span className="pd-stat-val">{property.priceStr}</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl">Area</span>
                  <span className="pd-stat-val">{property.area}</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl">Configuration</span>
                  <span className="pd-stat-val">{property.tags?.find(t => t.includes('BHK')) || 'Premium'}</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl">Possession</span>
                  <span className="pd-stat-val">{property.status}</span>
                </div>
              </div>
            </div>

            <div className="pd-section">
              <h3 className="pd-sec-title">Premium Amenities</h3>
              <div className="pd-amenities">
                {['Concierge Service', 'Private Infinity Pool', 'Smart Home Integration', 'Forest View Terrace', '24/7 Elite Security', 'Designer Clubhouse'].map((item, i) => (
                  <div key={i} className="pd-amenity-item">
                    <span className="pd-check">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {agent && (
              <div className="pd-section">
                <h3 className="pd-sec-title">Listing Agent</h3>
                <div className="agent-card-landscape">
                  <div className="acl-img" style={{ backgroundImage: `url('${agent.img}')` }}>
                    <span className="acl-badge">VERIFIED AGENT</span>
                    <div className="acl-company">{agent.company}</div>
                  </div>
                  <div className="acl-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--ink)' }}>{agent.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--gold)', fontWeight: '700' }}>{agent.designation}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--green)' }}>★ {agent.rating}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '700' }}>{agent.experience} Experience</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.5' }}>{agent.personalBio}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: 'auto' }}>
                      <a href={`tel:${agent.contact}`} className="nav-btn-ghost" style={{ textAlign: 'center', textDecoration: 'none' }}>CALL AGENT</a>
                      <a href={`mailto:${agent.email}`} className="nav-btn-solid" style={{ textAlign: 'center', textDecoration: 'none' }}>EMAIL AGENT</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pd-section">
              <h3 className="pd-sec-title">Image Gallery</h3>
              <div className="pd-gallery">
                 <img src={property.img} alt="Gallery 1" />
                 <img src="https://images.unsplash.com/photo-1600607687940-c52af0144198?w=800" alt="Gallery 2" />
              </div>
            </div>
          </div>

          <aside className="pd-contact-card">
            <h4>Interested in this Estate?</h4>
            <p>Connect with our senior property consultant for a private viewing and portfolio discussion.</p>
            <form className="pd-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <textarea placeholder="Your Message or Specific Requirements"></textarea>
              <button type="submit" className="pd-btn-primary">Request Private Viewing</button>
            </form>
            <div className="pd-contact-footer">
              <span>Direct Concierge</span>
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
