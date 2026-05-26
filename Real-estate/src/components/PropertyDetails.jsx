import React, { useEffect, useState } from 'react';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const PropertyDetails = () => {
  const { selectedProperty } = useApp();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedProperty) {
        setLoading(true);
        const res = await apiService.getPropertyById(selectedProperty);
        if (res.success) {
          setProperty(res.data);
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
      <div className="pd-header-bg">
        {property.video ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            poster={property.img}
            className="pd-video-bg"
          >
            <source src={property.video} type="video/mp4" />
          </video>
        ) : (
          <div className="pd-image-fallback" style={{ backgroundImage: `url('${property.img}')` }}></div>
        )}
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

      <div className="section reveal">
        <div className="pd-main-grid">
          <div className="pd-left">
            <div className="pd-section">
              <h3 className="pd-sec-title">Estate Overview</h3>
              <p className="pd-desc">
                {property.extraDescription || `This exceptional ${property.type} by ${property.developer} represents the pinnacle of luxury living in ${property.location}. Carefully curated for the modern connoisseur, it offers an unparalleled blend of sophistication and comfort.`}
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

              {property.pdfUrl && (
                <div style={{ marginTop: '30px' }}>
                  <a 
                    href={property.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="pd-btn-primary" 
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--gold2)', color: 'var(--ink)' }}
                  >
                    📄 Download Project Brochure (PDF)
                  </a>
                </div>
              )}
            </div>

            <div className="pd-section">
              <h3 className="pd-sec-title">Premium Amenities</h3>
              <div className="pd-amenities">
                {(property.tags || ['Concierge Service', 'Private Infinity Pool', 'Smart Home Integration', 'Forest View Terrace', '24/7 Elite Security', 'Designer Clubhouse']).map((item, i) => (
                  <div key={i} className="pd-amenity-item">
                    <span className="pd-check">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

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
              <a href="tel:+919910911650">+91 99109 11650</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
