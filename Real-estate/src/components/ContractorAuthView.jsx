import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const ContractorAuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', expertise: 'Luxury Interior Design', experience: '5-10 Years' });
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

  const toggleForm = (isLogin) => {
    setIsLogin(isLogin);
    setFormData({ name: '', email: '', password: '', phone: '', expertise: 'Luxury Interior Design', experience: '5-10 Years' });
    setError('');
  };

  return (
    <div className="section-full" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#f8f9fa', padding: '40px 0' }}>
      <div className="section-inner" style={{ maxWidth: '1200px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', background: '#fff', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.08)', border: '1px solid var(--cream3)' }}>
        
        {/* Left Side: Form */}
        <div style={{ padding: '80px' }}>
            <div 
              className="eyebrow" 
              onClick={() => navigate('/')} 
              style={{ cursor: 'pointer', marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}
            >
              ← RETURN TO HOME
            </div>
            
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: 'var(--ink)', marginBottom: '16px', lineHeight: '1.1' }}>
                {isLogin ? 'Contractor Login' : 'Expert Registration'}
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '48px', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '450px' }}>
                {isLogin 
                    ? "Access your project leads, manage client inquiries, and update your professional portfolio."
                    : "Join our network of elite contractors and get connected with high-net-worth clients."}
            </p>

            <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', borderBottom: '1px solid var(--bg-main)' }}>
                <button 
                    onClick={() => toggleForm(true)} 
                    style={{ 
                        padding: '12px 0', 
                        background: 'none', 
                        border: 'none', 
                        borderBottom: isLogin ? '3px solid var(--gold2)' : '3px solid transparent', 
                        fontWeight: 800, 
                        fontSize: '0.85rem', 
                        letterSpacing: '1px',
                        cursor: 'pointer', 
                        color: isLogin ? 'var(--ink)' : 'var(--muted2)',
                        transition: 'all 0.3s'
                    }}
                >
                    SIGN IN
                </button>
                <button 
                    onClick={() => toggleForm(false)} 
                    style={{ 
                        padding: '12px 0', 
                        background: 'none', 
                        border: 'none', 
                        borderBottom: !isLogin ? '3px solid var(--gold2)' : '3px solid transparent', 
                        fontWeight: 800, 
                        fontSize: '0.85rem', 
                        letterSpacing: '1px',
                        cursor: 'pointer', 
                        color: !isLogin ? 'var(--ink)' : 'var(--muted2)',
                        transition: 'all 0.3s'
                    }}
                >
                    JOIN AS EXPERT
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {error && (
                    <div style={{ background: '#fff5f5', color: '#c92a2a', padding: '16px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, border: '1px solid #ffc9c9' }}>
                        ✕ {error}
                    </div>
                )}
                
                {!isLogin && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="pd-form-group">
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '10px', display: 'block' }}>Full Name / Brand</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Apex Interiors" 
                                    required 
                                    style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '1rem', outline: 'none' }}
                                    value={formData.name} 
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                />
                            </div>
                            <div className="pd-form-group">
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '10px', display: 'block' }}>Specialization</label>
                                <select 
                                    style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '1rem', outline: 'none', background: '#fff' }}
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
                        </div>
                        <div className="pd-form-group">
                            <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '10px', display: 'block' }}>Contact Number</label>
                            <input 
                                type="tel" 
                                placeholder="+91 99109 11650" 
                                required 
                                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1.5px solid #eee', fontSize: '1rem', outline: 'none' }}
                                value={formData.phone} 
                                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                            />
                        </div>
                    </>
                )}

                <div className="pd-form-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '10px', display: 'block' }}>Email Address</label>
                    <input 
                        type="email" 
                        placeholder="expert@company.com" 
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
                    className="nav-btn-solid" 
                    style={{ width: '100%', padding: '20px', fontSize: '1rem', fontWeight: 800, marginTop: '16px', borderRadius: '14px', boxShadow: '0 10px 30px rgba(181, 153, 107, 0.2)' }}
                    disabled={loading}
                >
                    {loading ? 'AUTHENTICATING...' : (isLogin ? 'ACCESS DASHBOARD' : 'REGISTER AS EXPERT')}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--muted)', marginTop: '8px' }}>
                    Trusted by 200+ Premium Service Providers
                </p>
            </form>
        </div>

        {/* Right Side: Info Panel */}
        <div style={{ background: 'var(--ink)', padding: '80px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'linear-gradient(135deg, rgba(181,153,107,0.1) 0%, transparent 100%)', pointerEvents: 'none' }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '60px', height: '60px', background: 'var(--gold2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: '40px' }}>🛠️</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: 'var(--gold2)', marginBottom: '24px' }}>Expand Your <br />Craft Reach</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '48px' }}>
                    Connect with high-intent property buyers who are looking for premium interiors, landscaping, and construction services for their new luxury homes.
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '4px', color: '#fff' }}>150+</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Leads</div>
                    </div>
                    <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '4px', color: '#fff' }}>Premium</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>Client Base</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorAuthView;
