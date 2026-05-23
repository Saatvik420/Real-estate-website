import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';

const ContractorDashboard = () => {
  const { currentUser, logout, allInquiries, updateProfileAction } = useApp();
  const [activeTab, setActiveTab] = useState('Leads');
  const [editData, setEditData] = useState({ 
    name: currentUser?.name || '', 
    expertise: currentUser?.expertise || '', 
    personalBio: currentUser?.personalBio || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || ''
  });

  const leads = allInquiries.filter(inq => 
    inq.area?.includes(currentUser?.expertise?.split(' ')[0]) || 
    inq.message?.toLowerCase().includes(currentUser?.name?.toLowerCase()) ||
    inq.contractorId === currentUser?.id
  );

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const success = await updateProfileAction(editData);
    if (success) alert('Corporate profile updated successfully!');
  };

  if (!currentUser) return <div style={{ padding: '100px', textAlign: 'center' }}>Please login as a partner.</div>;

  return (
    <div className="section-full" style={{ background: '#fcfaf7', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">Partner Portal</div>
            <h2 className="sec-title">Welcome, <span>{currentUser.name}</span></h2>
            <p className="sec-sub">Managing your {currentUser.expertise} mandates and live leads</p>
          </div>
          <button className="nav-btn-ghost" style={{ borderColor: 'var(--red)', color: 'var(--red)' }} onClick={logout}>SIGNOUT</button>
        </div>

        <div className="dashboard-layout profile-layout">
            <aside className="dashboard-sidebar">
                <div style={{ background: '#fff', padding: 'clamp(1rem, 3vw, 2rem)', borderRadius: '16px', border: '1px solid var(--cream3)', textAlign: 'center' }}>
                    <div style={{ padding: '10px', background: 'var(--ink)', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gold2)', marginBottom: '20px' }}>
                        Platinum Partner
                    </div>
                    <div className="dashboard-tabs" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {['Leads', 'Corporate Profile', 'Analytics'].map(tab => (
                            <div 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                style={{ 
                                    padding: 'clamp(10px, 2vw, 15px)', 
                                    borderBottom: '1px solid #f5f5f5', 
                                    cursor: 'pointer', 
                                    fontWeight: 700, 
                                    fontSize: '0.9rem', 
                                    color: activeTab === tab ? 'var(--gold2)' : 'var(--ink)',
                                    background: activeTab === tab ? 'var(--bg-main)' : 'transparent',
                                    borderRadius: '8px',
                                    textAlign: 'left'
                                }}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="dashboard-main">
                {activeTab === 'Leads' && (
                    <>
                        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '20px', marginBottom: '40px' }}>
                            {[
                                { lbl: 'Total Leads', val: leads.length + 120 },
                                { lbl: 'Profile Views', val: '3.2k' },
                                { lbl: 'Active Listings', val: '8' },
                                { lbl: 'Market Score', val: '98%' }
                            ].map((stat, idx) => (
                                <div key={idx} className="info-card" style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}>
                                    <div className="info-card-title" style={{ fontSize: '0.7rem' }}>{stat.lbl}</div>
                                    <div className="info-card-val" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>{stat.val}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: 'var(--ink)', padding: 'clamp(1rem, 4vw, 2.5rem)', borderRadius: '24px', color: '#fff', marginBottom: '40px' }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', marginBottom: '30px' }}>Live Verified Leads</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {leads.map((lead, idx) => (
                                    <div key={idx} className="leads-row-card" style={{ 
                                        background: 'rgba(255,255,255,0.05)', 
                                        padding: 'clamp(1rem, 3vw, 1.5rem)', 
                                        borderRadius: '16px', 
                                        display: 'grid', 
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                                        alignItems: 'center', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        gap: '20px' 
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--gold2)' }}>{lead.name}</div>
                                            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{lead.email}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>Interest</div>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{lead.area}</div>
                                        </div>
                                        <div className="hide-tablet">
                                            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>Date</div>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{lead.date}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>Status</div>
                                            <div style={{ fontWeight: 600, color: 'var(--gold2)', fontSize: '0.9rem' }}>{lead.status}</div>
                                        </div>
                                        <button style={{ background: 'var(--gold2)', color: 'var(--ink)', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem', width: '100%' }}>MANAGE</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'Corporate Profile' && (
                    <div style={{ background: '#fff', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '24px', border: '1px solid var(--cream3)' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 1.8rem)', marginBottom: '32px' }}>Update Corporate Identity</h3>
                        <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div className="dashboard-main-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                                <div className="pd-form-group">
                                    <label>Company / Brand Name</label>
                                    <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} />
                                </div>
                                <div className="pd-form-group">
                                    <label>Expertise / Specialization</label>
                                    <input type="text" value={editData.expertise} onChange={(e) => setEditData({...editData, expertise: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} />
                                </div>
                            </div>
                            <div className="pd-form-group">
                                <label>Corporate Office Location</label>
                                <input type="text" value={editData.location} onChange={(e) => setEditData({...editData, location: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} />
                            </div>
                            <div className="pd-form-group">
                                <label>Business Bio / Value Proposition</label>
                                <textarea value={editData.personalBio} onChange={(e) => setEditData({...editData, personalBio: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee', height: '120px' }}></textarea>
                            </div>
                            <button className="pd-btn-primary" style={{ width: 'fit-content', padding: '15px 40px' }}>Sync Corporate Details</button>
                        </form>
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;
