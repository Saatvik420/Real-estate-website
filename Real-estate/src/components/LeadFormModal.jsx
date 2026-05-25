import React, { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';

const LeadFormModal = ({ isOpen, onClose, onSuccess, title, subtitle, contractorId }) => {
  const { isLoggedIn, currentUser, submitInquiryAction } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (isLoggedIn && currentUser) {
          setFormData({
              name: currentUser.name || '',
              email: currentUser.email || '',
              phone: currentUser.phone || '',
              message: ''
          });
      }
  }, [isLoggedIn, currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
        ...formData,
        contractorId: contractorId || null,
        source: title
    };

    const success = await submitInquiryAction(payload);
    setLoading(false);
    if (success) {
        onSuccess();
    } else {
        alert('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-header">
          <h3 className="modal-title">{title || 'Unlock Premium Access'}</h3>
          <p className="modal-subtitle">{subtitle || 'Please provide your details to continue.'}</p>
        </div>
        <form onSubmit={handleSubmit} className="pd-form">
          {!isLoggedIn || !currentUser ? (
            <>
              <div className="pd-form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="pd-form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="pd-form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 XXXXX XXXXX" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </>
          ) : (
            <div style={{ padding: '15px', background: 'var(--bg-main)', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--gold2)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '5px' }}>Verified Account</div>
                <div style={{ fontWeight: 700 }}>{currentUser.name}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{currentUser.email}</div>
            </div>
          )}

          <div className="pd-form-group">
            <label>Your Message (Optional)</label>
            <textarea 
              placeholder="Tell us about your requirements..." 
              style={{ minHeight: '80px', resize: 'none' }}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
          <button type="submit" className="pd-btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Submitting...' : 'Confirm Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadFormModal;
