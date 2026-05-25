import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const UserProfile = () => {
  const { currentUser, logout, allInquiries, wishlist, toggleWishlist, setView, setSelectedProperty, updateProfileAction } = useApp();
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('My Wishlist');
  const [editData, setEditData] = useState({ 
    name: currentUser?.name || '', 
    phone: currentUser?.phone || '', 
    email: currentUser?.email || '',
    location: currentUser?.location || currentUser?.address || '',
    personalBio: currentUser?.personalBio || currentUser?.bio || '',
    expertise: currentUser?.expertise || currentUser?.specialty || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const userInquiries = allInquiries.filter(inq => inq.email === currentUser?.email);

  useEffect(() => {
    if (currentUser) {
        setEditData({
            name: currentUser.name || '',
            phone: currentUser.phone || '',
            email: currentUser.email || '',
            location: currentUser.location || currentUser.address || '',
            personalBio: currentUser.personalBio || currentUser.bio || '',
            expertise: currentUser.expertise || currentUser.specialty || ''
        });
    }
  }, [currentUser]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateProfileAction(editData);
    setLoading(false);
    if (success) {
        alert('Profile updated successfully!');
        setIsEditing(false);
    }
  };

  if (!currentUser) return <div style={{ padding: '100px', textAlign: 'center' }}>Please login to view your profile.</div>;

  return (
    <div className="section-full" style={{ background: '#fcfaf7', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">Investor Portfolio</div>
            <h2 className="sec-title">Welcome, <span>{currentUser.name}</span></h2>
            <p className="sec-sub">Managing your luxury assets and live inquiries</p>
          </div>
          <button className="nav-btn-ghost" style={{ borderColor: 'var(--red)', color: 'var(--red)' }} onClick={logout}>LOGOUT</button>
        </div>

        <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(1.5rem, 4vw, 3rem)', alignItems: 'start' }}>
            <aside>
                <div style={{ background: '#fff', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '24px', border: '1px solid var(--cream3)', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                    <div style={{ width: 'clamp(80px, 10vw, 100px)', height: 'clamp(80px, 10vw, 100px)', borderRadius: '50%', background: 'var(--gold2)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#fff', fontWeight: 800 }}>
                        {currentUser?.name ? currentUser.name.charAt(0) : '?'}
                    </div>
                    <h3 style={{ margin: '0 0 5px 0', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>{currentUser?.name || 'User'}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '10px' }}>{currentUser.email}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold2)', fontWeight: 700, marginBottom: '25px' }}>{currentUser.role}</div>
                    <div style={{ padding: '12px', background: 'var(--ink)', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gold2)', letterSpacing: '1px' }}>
                        Verified Account
                    </div>
                </div>

                <div style={{ marginTop: '30px', background: '#fff', borderRadius: '24px', border: '1px solid var(--cream3)', overflow: 'hidden' }}>
                    {[
                        { label: 'My Wishlist', icon: '♥' },
                        { label: 'Inquiry History', icon: '📋' },
                        { label: 'Profile Settings', icon: '⚙️' }
                    ].map((tab) => (
                        <div 
                            key={tab.label} 
                            onClick={() => setActiveTab(tab.label)}
                            style={{ 
                                padding: 'clamp(15px, 3vw, 20px) 30px', 
                                borderBottom: '1px solid #f5f5f5', 
                                cursor: 'pointer', 
                                fontWeight: 700, 
                                fontSize: '0.9rem', 
                                color: activeTab === tab.label ? 'var(--gold2)' : 'var(--ink)', 
                                transition: '0.2s',
                                background: activeTab === tab.label ? 'var(--bg-main)' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                        >
                            <span style={{ fontSize: '1.1rem', opacity: 0.7 }}>{tab.icon}</span>
                            {tab.label}
                        </div>
                    ))}
                </div>
            </aside>

            <main className="profile-main">
                {activeTab === 'My Wishlist' && (
                    <div style={{ background: '#fff', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '24px', border: '1px solid var(--cream3)', marginBottom: '40px' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', marginBottom: '24px' }}>My Wishlist</h3>
                        {loading ? <p>Loading assets...</p> : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
                                {wishlistData.map(prop => (
                                    <div key={prop.id} style={{ display: 'flex', gap: '15px', padding: '15px', borderRadius: '16px', background: 'var(--bg-main)', position: 'relative' }}>
                                        <img src={prop.img} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} alt="" />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{prop.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{prop.location}</div>
                                            <div style={{ color: 'var(--gold)', fontWeight: 800, marginTop: '5px' }}>{prop.priceStr}</div>
                                        </div>
                                        <button onClick={() => toggleWishlist(prop.id)} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', position: 'absolute', right: '15px', top: '15px' }}>♥</button>
                                    </div>
                                ))}
                                {wishlistData.length === 0 && <p style={{ color: 'var(--muted2)' }}>Your wishlist is currently empty.</p>}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'Inquiry History' && (
                    <div style={{ background: '#fff', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '24px', border: '1px solid var(--cream3)' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', marginBottom: '24px' }}>Inquiry Pipeline</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #f5f5f5' }}>
                                        <th style={{ padding: '15px 0', fontSize: '0.75rem', color: 'var(--muted2)', textTransform: 'uppercase' }}>Subject / Property</th>
                                        <th style={{ padding: '15px 0', fontSize: '0.75rem', color: 'var(--muted2)', textTransform: 'uppercase' }}>Date</th>
                                        <th style={{ padding: '15px 0', fontSize: '0.75rem', color: 'var(--muted2)', textTransform: 'uppercase' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userInquiries.map((inq, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                            <td style={{ padding: '20px 0' }}>
                                                <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{inq.area || 'General Consultation'}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{inq.message?.substring(0, 40)}...</div>
                                            </td>
                                            <td style={{ padding: '20px 0', fontSize: '0.85rem', color: 'var(--muted)' }}>{inq.date}</td>
                                            <td style={{ padding: '20px 0' }}>
                                                <span style={{ padding: '6px 14px', borderRadius: '20px', background: inq.status === 'New' ? '#fff4e6' : '#e7f5ed', color: inq.status === 'New' ? '#e67e22' : '#2b8a3e', fontSize: '0.7rem', fontWeight: 800 }}>
                                                    {inq.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Profile Settings' && (
                    <div style={{ background: '#fff', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '24px', border: '1px solid var(--cream3)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '15px' }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', margin: 0 }}>Profile Settings</h3>
                            {!isEditing ? (
                                <button className="nav-btn-ghost" onClick={() => setIsEditing(true)}>EDIT PROFILE</button>
                            ) : (
                                <button className="nav-btn-ghost" style={{ borderColor: 'var(--muted)' }} onClick={() => setIsEditing(false)}>CANCEL</button>
                            )}
                        </div>

                        {!isEditing ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
                                <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '16px' }}>
                                    <label style={{ fontSize: '0.7rem', color: 'var(--muted2)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Full Name</label>
                                    <div style={{ fontWeight: 700 }}>{currentUser.name}</div>
                                </div>
                                <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '16px' }}>
                                    <label style={{ fontSize: '0.7rem', color: 'var(--muted2)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Contact Number</label>
                                    <div style={{ fontWeight: 700 }}>{currentUser.phone || 'Not provided'}</div>
                                </div>
                                <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '16px' }}>
                                    <label style={{ fontSize: '0.7rem', color: 'var(--muted2)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Email</label>
                                    <div style={{ fontWeight: 700 }}>{currentUser.email}</div>
                                </div>
                                <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '16px' }}>
                                    <label style={{ fontSize: '0.7rem', color: 'var(--muted2)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Location</label>
                                    <div style={{ fontWeight: 700 }}>{currentUser.location || currentUser.address || 'Not provided'}</div>
                                </div>
                                <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '16px', gridColumn: '1 / -1' }}>
                                    <label style={{ fontSize: '0.7rem', color: 'var(--muted2)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Personal Bio</label>
                                    <div style={{ fontWeight: 500, lineHeight: 1.6 }}>{currentUser.personalBio || currentUser.bio || 'Tell us about yourself...'}</div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleProfileUpdate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' }}>
                                <div className="pd-form-group">
                                    <label>Full Name</label>
                                    <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} required />
                                </div>
                                <div className="pd-form-group">
                                    <label>Contact Number</label>
                                    <input type="tel" value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} />
                                </div>
                                <div className="pd-form-group">
                                    <label>Location</label>
                                    <input type="text" value={editData.location} onChange={(e) => setEditData({...editData, location: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} placeholder="e.g. New Delhi, India" />
                                </div>
                                <div className="pd-form-group">
                                    <label>Expertise</label>
                                    <input type="text" value={editData.expertise} onChange={(e) => setEditData({...editData, expertise: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} placeholder="e.g. Luxury Penthouse Investor" />
                                </div>
                                <div className="pd-form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>Personal Bio</label>
                                    <textarea 
                                        value={editData.personalBio} 
                                        onChange={(e) => setEditData({...editData, personalBio: e.target.value})} 
                                        style={{ background: 'var(--bg-main)', border: '1.5px solid #eee', width: '100%', padding: '15px', borderRadius: '12px', minHeight: '120px', fontFamily: 'inherit' }}
                                        placeholder="Write a brief bio..."
                                    />
                                </div>
                                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
                                    <button type="submit" className="pd-btn-primary" style={{ padding: '15px 40px' }} disabled={loading}>
                                        {loading ? 'SAVING...' : 'SAVE CHANGES'}
                                    </button>
                                    <button type="button" className="nav-btn-ghost" onClick={() => setIsEditing(false)}>CANCEL</button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
