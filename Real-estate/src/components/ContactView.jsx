import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';

const ContactView = () => {
  const { setView, submitInquiryAction, isLoggedIn, currentUser } = useApp();
  const [formData, setFormData] = useState({ 
    name: currentUser?.name || '', 
    email: currentUser?.email || '', 
    phone: currentUser?.phone || '', 
    address: '', 
    message: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await submitInquiryAction(formData);
    setLoading(false);
    if (success) {
        alert('Thank you! Your inquiry has been logged. A luxury specialist will contact you within 2 hours.');
        setFormData({ ...formData, message: '' });
    }
  };

  return (
    <div className="section-full reveal" style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '60px' }}>
          <div>
            <div className="eyebrow" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>← Back to Home</div>
            <h2 className="sec-title">Contact <span>Us</span></h2>
            <p className="sec-sub">The Luxury Advisory Desk — Dedicated Support for HNIs and NRIs</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
            <div>
                <div style={{ background: 'var(--ink)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '20px', color: '#fff', marginBottom: '30px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', color: 'var(--gold2)', marginBottom: '24px' }}>Office Location</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1rem' }}>
                        <div>
                            <div style={{ fontWeight: 800, color: 'var(--gold2)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '5px' }}>Address</div>
                            <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>Office 705, 7th Floor, <br />Vishal Tower, Janakpuri District Centre,<br />Janakpuri, New Delhi - 110058</p>
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: 'var(--gold2)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '5px' }}>Mobile</div>
                            <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>+91 96933 50546</p>
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: 'var(--gold2)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '5px' }}>Email</div>
                            <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>one5realtysolutions@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: '#fff', padding: 'clamp(1.5rem, 5vw, 3rem)', borderRadius: '24px', border: '1px solid var(--cream3)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '10px' }}>Request a Private Consultation</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: 'var(--body-text)' }}>Please provide your details, and a senior consultant will reach out within 2 hours.</p>

                <form className="pd-form" onSubmit={handleSubmit}>
                    {!isLoggedIn ? (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '20px', marginBottom: '20px' }}>
                                <div className="pd-form-group">
                                    <label>Full Name *</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Rahul Sharma" 
                                        required 
                                        style={{ background: 'var(--bg-main)', color: 'var(--ink)', borderColor: 'var(--cream3)' }} 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="pd-form-group">
                                    <label>Email Address *</label>
                                    <input 
                                        type="email" 
                                        placeholder="e.g. rahul@company.com" 
                                        required 
                                        style={{ background: 'var(--bg-main)', color: 'var(--ink)', borderColor: 'var(--cream3)' }} 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="pd-form-group" style={{ marginBottom: '20px' }}>
                                <label>Phone Number *</label>
                                <input 
                                    type="tel" 
                                    placeholder="+91 96933 50546" 
                                    required 
                                    style={{ background: 'var(--bg-main)', color: 'var(--ink)', borderColor: 'var(--cream3)' }} 
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </>
                    ) : (
                        <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '12px', marginBottom: '30px', border: '1px solid var(--gold2)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Identity Verified</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>{currentUser.name}</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>{currentUser.email}</div>
                        </div>
                    )}

                    <div className="pd-form-group" style={{ marginBottom: '20px' }}>
                        <label>Residential Address (Optional)</label>
                        <input 
                            type="text"
                            placeholder="e.g. 705, Vishal Tower, New Delhi"
                            style={{ background: 'var(--bg-main)', color: 'var(--ink)', borderColor: 'var(--cream3)' }}
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                    </div>
                    <div className="pd-form-group" style={{ marginBottom: '30px' }}>
                        <label>Your Message / Requirements</label>
                        <textarea 
                            placeholder="Tell us more about your investment goals..." 
                            style={{ background: 'var(--bg-main)', color: 'var(--ink)', borderColor: 'var(--cream3)', height: '120px' }}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                    </div>
                    <button className="pd-btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1rem' }} disabled={loading}>
                        {loading ? 'Submitting...' : 'Initiate Consultation'}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
