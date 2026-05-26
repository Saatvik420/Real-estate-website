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
        <div className="pd-main-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '50px' }}>
          
          {/* Left Side: Media & Descriptions */}
          <div className="pd-left">
            <div className="pd-section" style={{ marginBottom: '40px' }}>
              <h3 className="pd-sec-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', borderBottom: '2px solid var(--gold2)', display: 'inline-block', paddingBottom: '8px', marginBottom: '25px' }}>
                Project Overview
              </h3>
              <p className="pd-desc" style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '30px' }}>
                {property.extraDescription || `This exceptional ${property.type} represents the pinnacle of luxury living in ${property.location}. Carefully curated for the modern connoisseur, it offers an unparalleled blend of sophistication, comfort, and spiritual harmony. Spanning across vast acres of meticulously planned landscapes, this project is a testament to architectural brilliance and sustainable design.`}
              </p>
              
              <div className="pd-quick-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: 'var(--cream2)', padding: '25px', borderRadius: '15px' }}>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl" style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--muted2)', textTransform: 'uppercase' }}>Price Range</span>
                  <span className="pd-stat-val" style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>{property.priceStr || property.priceRange}</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl" style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--muted2)', textTransform: 'uppercase' }}>Area Coverage</span>
                  <span className="pd-stat-val" style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>{property.area || property.areaRange}</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl" style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--muted2)', textTransform: 'uppercase' }}>Current Status</span>
                  <span className="pd-stat-val" style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>{property.status}</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-lbl" style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--muted2)', textTransform: 'uppercase' }}>Possession Date</span>
                  <span className="pd-stat-val" style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>{property.possession || 'Ready to Move'}</span>
                </div>
              </div>
            </div>

            <div className="pd-section" style={{ marginBottom: '40px' }}>
              <h3 className="pd-sec-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '20px' }}>Premium Amenities</h3>
              <div className="pd-amenities" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {(property.tags || property.amenities || ['Gated Community', '24/7 Security', 'Lush Gardens', 'Modern Infrastructure']).map((item, i) => (
                  <div key={i} className="pd-amenity-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--muted)' }}>
                    <span className="pd-check" style={{ color: 'var(--gold)', fontWeight: '900' }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="pd-section">
              <h3 className="pd-sec-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '20px' }}>Project Visuals</h3>
              <div className="pd-gallery" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                 <img src={property.img} alt="Main Project View" style={{ width: '100%', borderRadius: '10px', height: '180px', objectFit: 'cover' }} />
                 <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800" alt="Interior View" style={{ width: '100%', borderRadius: '10px', height: '180px', objectFit: 'cover' }} />
                 {/* Video Placeholder Box */}
                 <div style={{ width: '100%', height: '180px', background: '#000', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', textAlign: 'center', padding: '20px' }}>
                   🎥 Project Walkthrough<br/>(Video Placeholder)
                 </div>
                 <div style={{ width: '100%', height: '180px', background: 'var(--cream3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '12px', textAlign: 'center', padding: '20px' }}>
                   🏗 Architectural Map<br/>(Coming Soon)
                 </div>
              </div>
            </div>
          </div>

          {/* Right Side: Inquiry Form */}
          <aside className="pd-contact-card" style={{ background: 'var(--white)', padding: '40px', borderRadius: '20px', border: '1px solid var(--cream3)', boxShadow: '0 15px 50px rgba(0,0,0,0.08)', position: 'sticky', top: '100px', height: 'fit-content' }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', marginBottom: '10px' }}>Request Private Viewing</h4>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '30px' }}>Connect with our senior property consultant for a private site visit and portfolio discussion.</p>
            
            <form className="pd-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--cream3)', background: 'var(--bg-main)', outline: 'none' }} />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--cream3)', background: 'var(--bg-main)', outline: 'none' }} />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone Number" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--cream3)', background: 'var(--bg-main)', outline: 'none' }} />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message or Specific Requirements (e.g., preferred floor, budget range...)" style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--cream3)', background: 'var(--bg-main)', minHeight: '120px', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="nav-btn-solid" style={{ width: '100%', padding: '15px', fontSize: '14px', fontWeight: '800' }}>
                SCHEDULE SITE VISIT
              </button>
            </form>
            
            <div className="pd-contact-footer" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--cream3)', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted2)', textTransform: 'uppercase', marginBottom: '8px' }}>Direct Concierge</div>
              <a href="tel:+919910911650" style={{ fontSize: '18px', fontWeight: '800', color: 'var(--gold)', textDecoration: 'none' }}>+91 99109 11650</a>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
