import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const ContractorAuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    name: '', email: '', password: '', phone: '', 
    expertise: 'Luxury Interior Design', experience: '5-10 Years' 
  });
  const [error, setError] = useState('');
  const { login, register, setView, loading } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const res = await login(formData.email, formData.password);
      if (res.success && res.user.role === 'CONTRACTOR') {
        setView('contractor-dashboard');
        navigate('/contractor-dashboard');
      } else if (res.success) {
        setError('Unauthorized: This portal is for registered Service Contractors only.');
      } else {
        setError(res.message);
      }
    } else {
      const res = await register(formData, 'CONTRACTOR');
      if (res.success) {
          setView('contractor-dashboard');
          navigate('/contractor-dashboard');
      } else {
          setError(res.message);
      }
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-bg-ornament"></div>
      <div className="auth-container-modern">
        
        {/* Left Side: Brand Panel */}
        <div className="auth-panel-brand" style={{ background: '#26292f' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer', marginBottom: '40px', textAlign: 'left', padding: 0 }}
          >
            ← Back to Home
          </button>
          
          <div style={{ width: '56px', height: '56px', background: 'var(--gold)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '32px' }}>🛠️</div>
          
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', marginBottom: '24px', lineHeight: '1.1' }}>
            Expert <br /><span style={{ color: 'var(--gold)' }}>Network</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '17px', maxWidth: '400px', marginBottom: '48px' }}>
            Connect with HNI property buyers looking for premium interiors, landscaping, and construction services.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px' }}>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>200+</div>
              <div style={{ fontSize: '9px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Active Experts</div>
            </div>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>150+</div>
              <div style={{ fontSize: '9px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Monthly Leads</div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="auth-panel-form">
          <div className="auth-tab-group">
            <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Expert Login</button>
            <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Join Network</button>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#fff5f5', color: '#c92a2a', padding: '14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, marginBottom: '24px', border: '1px solid #ffc9c9' }}>
                ✕ {error}
              </div>
            )}

            {!isLogin && (
              <>
                <div className="auth-input-group">
                  <label className="auth-label">Full Name / Brand</label>
                  <input 
                    type="text" 
                    className="auth-input" 
                    placeholder="e.g. Apex Interiors" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="auth-input-group">
                  <label className="auth-label">Specialization</label>
                  <select 
                    className="auth-input"
                    value={formData.expertise} 
                    onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                  >
                    <option>Luxury Interior Design</option>
                    <option>Modular Kitchens</option>
                    <option>Architectural Services</option>
                    <option>Civil Construction</option>
                    <option>Home Automation</option>
                  </select>
                </div>
                <div className="auth-input-group">
                  <label className="auth-label">Contact Number</label>
                  <input 
                    type="tel" 
                    className="auth-input" 
                    placeholder="+91 00000 00000" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </>
            )}

            <div className="auth-input-group">
              <label className="auth-label">Professional Email</label>
              <input 
                type="email" 
                className="auth-input" 
                placeholder="expert@company.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Secure Password</label>
              <input 
                type="password" 
                className="auth-input" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button className="auth-btn-submit" disabled={loading}>
              {loading ? 'Accessing...' : (isLogin ? 'Enter Expert Dashboard' : 'Register as Expert')}
            </button>
          </form>

          <div style={{ marginTop: 'auto', paddingTop: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--muted2)', fontWeight: 600 }}>
              Trusted by 200+ Premium Service Providers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorAuthView;
