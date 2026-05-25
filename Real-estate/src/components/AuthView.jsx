import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const { login, register, setView, loading } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        if (res.user.role === 'ADMIN') {
            setView('admin');
            navigate('/admin');
        } else {
            setView('profile');
            navigate('/profile');
        }
      } else {
        setError(res.message);
      }
    } else {
      const res = await register(formData, 'USER');
      if (res.success) {
          setView('profile');
          navigate('/profile');
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
        <div className="auth-panel-brand">
          <div className="logo" style={{ marginBottom: '40px' }}>
            <div className="logo-mark" style={{ width: '48px', height: '48px', fontSize: '24px' }}>15</div>
            <span style={{ fontSize: '28px', color: '#fff' }}>One5</span>
          </div>
          
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', marginBottom: '24px', lineHeight: '1.1' }}>
            Elevate Your <br /><span style={{ color: 'var(--gold)' }}>Lifestyle</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '18px', maxWidth: '400px', marginBottom: '48px' }}>
            Access India's most exclusive collection of premium estates and architectural wonders.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Global Portfolio Access', 'Dedicated Portfolio Manager', 'Off-Market Opportunities'].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, opacity: 0.8 }}>
                <span style={{ color: 'var(--gold)' }}>✦</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="auth-panel-form">
          <div className="auth-tab-group">
            <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Sign In</button>
            <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Join One5</button>
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
                  <label className="auth-label">Full Name</label>
                  <input 
                    type="text" 
                    className="auth-input" 
                    placeholder="Enter your name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="auth-input-group">
                  <label className="auth-label">Phone Number</label>
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
              <label className="auth-label">Email Address</label>
              <input 
                type="email" 
                className="auth-input" 
                placeholder="name@email.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Password</label>
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
              {loading ? 'Processing...' : (isLogin ? 'Sign In to Portal' : 'Create Account')}
            </button>

            {isLogin && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <a href="#" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
              </div>
            )}
          </form>

          <div style={{ marginTop: 'auto', paddingTop: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--muted2)', lineHeight: '1.6' }}>
              By continuing, you agree to One5 Realty's <br />
              <a href="#" style={{ color: 'var(--ink)', fontWeight: 700 }}>Terms</a> & <a href="#" style={{ color: 'var(--ink)', fontWeight: 700 }}>Privacy Policy</a>
            </p>          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
