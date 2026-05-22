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

  const toggleForm = (isLogin) => {
    setIsLogin(isLogin);
    setFormData({ name: '', email: '', password: '', phone: '' });
    setError('');
  };

  return (
    <div className="section-full" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#faf9f6', padding: '60px 0' }}>
      <div className="section-inner auth-layout" style={{ maxWidth: '1150px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', background: '#fff', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,0.07)', border: '1px solid var(--cream3)' }}>
        
        {/* Left Side: Brand Panel */}
        <div className="auth-left-panel" style={{ background: 'var(--ink)', padding: '80px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 0% 0%, rgba(181,153,107,0.15) 0%, transparent 50%)', pointerEvents: 'none' }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="logo" style={{ marginBottom: '60px' }}>
                    <div className="logo-mark" style={{ width: '44px', height: '44px', fontSize: '22px' }}>B</div>
                    <span style={{ fontSize: '1.8rem', fontWeight: 700, marginLeft: '15px', letterSpacing: '-0.5px' }}>Bharat<em style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'normal' }}>Estates</em></span>
                </div>
                
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.2rem', marginBottom: '24px', lineHeight: '1.1' }}>
                    Join the <br /><span style={{ color: 'var(--gold2)' }}>Elite Circle</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '1.15rem', maxWidth: '400px', marginBottom: '48px' }}>
                    {isLogin 
                        ? "Re-enter the world of architectural masterpieces and off-market opportunities." 
                        : "Discover a curated gateway to India's most prestigious residences and land parcels."}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                        'Verified Grade-A Listings',
                        'Direct-to-Developer Channels',
                        'Institutional Grade Market Reports'
                    ].map((feature, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(181,153,107,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold2)', fontSize: '0.8rem', fontWeight: 900 }}>✓</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 600, opacity: 0.9 }}>{feature}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="auth-right-panel" style={{ padding: '80px' }}>
            <div style={{ display: 'flex', gap: '40px', marginBottom: '50px', borderBottom: '1px solid #eee' }}>
                <button 
                    onClick={() => toggleForm(true)} 
                    style={{ 
                        padding: '15px 0', 
                        background: 'none', 
                        border: 'none', 
                        borderBottom: isLogin ? '3px solid var(--gold2)' : '3px solid transparent', 
                        fontWeight: 800, 
                        fontSize: '0.9rem', 
                        letterSpacing: '1px',
                        cursor: 'pointer', 
                        color: isLogin ? 'var(--ink)' : 'var(--muted2)',
                        transition: '0.3s'
                    }}
                >
                    SIGN IN
                </button>
                <button 
                    onClick={() => toggleForm(false)} 
                    style={{ 
                        padding: '15px 0', 
                        background: 'none', 
                        border: 'none', 
                        borderBottom: !isLogin ? '3px solid var(--gold2)' : '3px solid transparent', 
                        fontWeight: 800, 
                        fontSize: '0.9rem', 
                        letterSpacing: '1px',
                        cursor: 'pointer', 
                        color: !isLogin ? 'var(--ink)' : 'var(--muted2)',
                        transition: '0.3s'
                    }}
                >
                    REGISTER
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {error && (
                    <div style={{ background: '#fff5f5', color: '#c92a2a', padding: '16px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 700, border: '1px solid #ffc9c9' }}>
                        ✕ {error}
                    </div>
                )}
                
                {!isLogin && (
                    <>
                        <div className="pd-form-group">
                            <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '10px', display: 'block' }}>Full Legal Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Rahul Sharma" 
                                required 
                                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '1rem', outline: 'none' }}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="pd-form-group">
                            <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '10px', display: 'block' }}>Contact Number</label>
                            <input 
                                type="tel" 
                                placeholder="+91 90000 00000" 
                                required 
                                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '1rem', outline: 'none' }}
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </>
                )}

                <div className="pd-form-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '10px', display: 'block' }}>Professional Email</label>
                    <input 
                        type="email" 
                        placeholder="rahul@example.com" 
                        required 
                        style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '1rem', outline: 'none' }}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>

                <div className="pd-form-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '10px', display: 'block' }}>Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '1rem', outline: 'none' }}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </div>

                <button 
                    className="pd-btn-primary" 
                    style={{ width: '100%', padding: '20px', fontSize: '1rem', fontWeight: 800, borderRadius: '14px', marginTop: '10px', boxShadow: '0 10px 30px rgba(181, 153, 107, 0.2)' }}
                    disabled={loading}
                >
                    {loading ? 'AUTHENTICATING...' : (isLogin ? 'AUTHENTICATE & ENTER' : 'CREATE INVESTOR ACCOUNT')}
                </button>

                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <a href="#" style={{ fontSize: '0.85rem', color: 'var(--muted2)', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
                </div>
            </form>

            <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid #eee', textAlign: 'center' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                    By continuing, you agree to BharatEstates' <br />
                    <a href="#" style={{ color: 'var(--ink)', fontWeight: 700 }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--ink)', fontWeight: 700 }}>Privacy Policy</a>.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
