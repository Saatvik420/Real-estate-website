import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const PropertyDetails = () => {
  const { propertyId: urlPropertyId } = useParams();
  const { selectedProperty: contextPropertyId, setSelectedProperty } = useApp();
  
  // Prioritize URL parameter (for direct links/refresh), then context
  const propertyId = urlPropertyId || contextPropertyId;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (propertyId) {
        setLoading(true);
        // If we came via direct link, sync the context so other components know what's selected
        if (urlPropertyId && urlPropertyId !== contextPropertyId) {
          setSelectedProperty(urlPropertyId);
        }

        const res = await apiService.getPropertyById(propertyId);
        if (res.success) {
          setProperty(res.data);
        }
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo(0, 0);
  }, [propertyId, urlPropertyId, contextPropertyId, setSelectedProperty]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Estate Details...</div>;
  if (!property) return <div style={{ padding: '100px', textAlign: 'center' }}>Property not found.</div>;

  return (
    <div className="property-details-page">
      {/* Hero Header with Video/Image Placeholder */}
      <div className="pd-header-bg" style={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
        {property.video ? (
          <video autoPlay muted loop playsInline poster={property.img} className="pd-video-bg" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src={property.video} type="video/mp4" />
          </video>
        ) : (
          <div className="pd-image-fallback" style={{ width: '100%', height: '100%', backgroundImage: `url('${property.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        )}
        <div className="pd-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))' }}></div>
        <div className="pd-header-content" style={{ position: 'absolute', bottom: '40px', left: '48px', color: '#fff' }}>
          <div className="pd-meta-top" style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <span className="pd-status-tag" style={{ background: 'var(--gold2)', color: 'var(--ink)', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: '800' }}>{property.status}</span>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>{property.type}</span>
          </div>
          <h1 className="pd-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', marginBottom: '10px' }}>{property.title || property.name}</h1>
          <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--gold2)' }}>📍 {property.location}</div>
        </div>
      </div>

      <div className="section reveal">
        <div className="pd-main-grid">
          
          {/* Left Side: Media & Descriptions */}
          <div className="pd-left">
            <div className="pd-section">
              <h3 className="pd-sec-title">Project Overview</h3>
              <p className="pd-desc">
                {property.description || property.extraDescription || `This exceptional ${property.type} represents the pinnacle of luxury living in ${property.location}. Carefully curated for the modern connoisseur, it offers an unparalleled blend of sophistication, comfort, and spiritual harmony. Spanning across vast acres of meticulously planned landscapes, this project is a testament to architectural brilliance and sustainable design.`}
              </p>
              
              <div className="pd-quick-stats">
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl">Price Range</span>
                  <span className="pd-stat-val">{property.priceStr || property.priceRange}</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl">Area Coverage</span>
                  <span className="pd-stat-val">{property.area || property.areaRange}</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl">Current Status</span>
                  <span className="pd-stat-val">{property.status}</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl">Possession</span>
                  <span className="pd-stat-val">{property.possession || 'Ready to Move'}</span>
                </div>
              </div>
            </div>

            {property.pdf && (
              <div className="pd-section" style={{ background: 'var(--cream2)', padding: '30px', borderRadius: '12px', border: '1px solid var(--gold4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--ink)' }}>Project Brochure</h4>
                    <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: 'var(--muted)' }}>Detailed plans and project specifications.</p>
                  </div>
                  <a 
                    href={property.pdf} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="nav-btn-solid" 
                    style={{ textDecoration: 'none', padding: '12px 30px', display: 'inline-block' }}
                  >
                    DOWNLOAD PDF
                  </a>
                </div>
              </div>
            )}

            <div className="pd-section">
              <h3 className="pd-sec-title">Premium Amenities</h3>
              <div className="pd-amenities">
                {(property.amenities || property.tags || ['Gated Community', '24/7 Security', 'Lush Gardens', 'Modern Infrastructure']).map((item, i) => (
                  <div key={i} className="pd-amenity-item">
                    <span className="pd-check">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="pd-section">
              <h3 className="pd-sec-title">Project Visuals</h3>
              <div className="pd-gallery">
                 <img src={property.img} alt="Main Project View" className="pd-gallery-item" />
                 <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800" alt="Interior View" className="pd-gallery-item" />
                 {/* Video Placeholder Box */}
                 <div className="pd-gallery-item" style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', textAlign: 'center', padding: '20px' }}>
                   🎥 Project Walkthrough<br/>(Video Placeholder)
                 </div>
                 <div className="pd-gallery-item" style={{ background: 'var(--cream3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '12px', textAlign: 'center', padding: '20px' }}>
                   🏗 Architectural Map<br/>(Coming Soon)
                 </div>
              </div>
            </div>
          </div>

          {/* Right Side: Attractive Black Inquiry Form */}
          <aside className="pd-contact-card">
            <h4>Request Private Viewing</h4>
            <p>Connect with our senior property consultant for a private site visit and portfolio discussion.</p>
            
            <form className="pd-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <textarea placeholder="Your Message or Specific Requirements (e.g., preferred floor, budget range...)"></textarea>
              <button type="submit" className="pd-btn-primary">
                SCHEDULE SITE VISIT
              </button>
            </form>
            
            <div className="pd-contact-footer">
              <span>Direct Concierge</span>
              <a href="tel:+919910911650">+91 99109 11650</a>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
