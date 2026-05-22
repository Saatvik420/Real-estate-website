import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';

const PartnerDashboard = () => {
  const { currentUser, logout, allInquiries, updateProfileAction } = useApp();
  const [activeTab, setActiveTab] = useState('Property Inquiries');
  const [editData, setEditData] = useState({ 
    name: currentUser?.name || '', 
    expertise: currentUser?.expertise || '', 
    personalBio: currentUser?.personalBio || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || ''
  });

  // For Developers (Partners), we show inquiries related to properties or general developer inquiries
  const propertyInquiries = allInquiries.filter(inq => 
    inq.type === 'Property' || inq.message?.toLowerCase().includes('project') || inq.message?.toLowerCase().includes('unit')
  );

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const success = await updateProfileAction(editData);
    if (success) alert('Developer profile updated successfully!');
  };

  if (!currentUser) return <div style={{ padding: '100px', textAlign: 'center' }}>Please login as a Developer Partner.</div>;

  return (
    <div className="section-full" style={{ background: '#fcfaf7', minHeight: '100vh' }}>
      <div className="section-inner">
        <div className="sec-header" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">Developer Portal</div>
            <h2 className="sec-title">Welcome, <span>{currentUser.name}</span></h2>
            <p className="sec-sub">Managing your luxury project mandates and buyer pipelines</p>
          </div>
          <button className="nav-btn-ghost" style={{ borderColor: 'var(--red)', color: 'var(--red)' }} onClick={logout}>SIGNOUT</button>
        </div>

        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
            <aside className="dashboard-sidebar">
                <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid var(--cream3)', textAlign: 'center' }}>
                    <div style={{ padding: '10px', background: 'var(--ink)', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gold2)', marginBottom: '20px' }}>
                        Grade-A Developer
                    </div>
                    <div className="dashboard-tabs" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {['Property Inquiries', 'Project Portfolio', 'Market Insights'].map(tab => (
                            <div 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                style={{ 
                                    padding: '15px', 
                                    borderBottom: '1px solid #f5f5f5', 
                                    cursor: 'pointer', 
                                    fontWeight: 700, 
                                    fontSize: '0.9rem', 
                                    color: activeTab === tab ? 'var(--gold2)' : 'var(--ink)',
                                    background: activeTab === tab ? 'var(--bg-main)' : 'transparent',
                                    borderRadius: '8px'
                                }}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="dashboard-main">
                {activeTab === 'Property Inquiries' && (
                    <>
                        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                            {[
                                { lbl: 'Total Leads', val: propertyInquiries.length + 450 },
                                { lbl: 'Project Views', val: '12.4k' },
                                { lbl: 'Active Units', val: '24' },
                                { lbl: 'Conversion', val: '4.2%' }
                            ].map((stat, idx) => (
                                <div key={idx} style={{ background: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid var(--cream3)' }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--muted2)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '5px' }}>{stat.lbl}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{stat.val}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: 'var(--ink)', padding: '40px', borderRadius: '24px', color: '#fff', marginBottom: '40px', overflowX: 'hidden' }}>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '30px' }}>High-Intent Buyer Leads</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {propertyInquiries.length > 0 ? propertyInquiries.map((lead, idx) => (
                                    <div key={idx} className="leads-row-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '16px', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr auto', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)', gap: '20px' }}>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--gold2)' }}>{lead.name}</div>
                                            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{lead.email}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>Project</div>
                                            <div style={{ fontWeight: 600 }}>{lead.area || 'General'}</div>
                                        </div>
                                        <div className="hide-mobile">
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>Date</div>
                                            <div style={{ fontWeight: 600 }}>{lead.date || 'Today'}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>Status</div>
                                            <div style={{ fontWeight: 600, color: 'var(--gold2)' }}>{lead.status || 'New'}</div>
                                        </div>
                                        <button style={{ background: 'var(--gold2)', color: 'var(--ink)', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}>MANAGE</button>
                                    </div>
                                )) : (
                                    <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>No active property leads at the moment.</div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'Project Portfolio' && (
                    <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid var(--cream3)' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '32px' }}>Update Developer Identity</h3>
                        <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div className="dashboard-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="pd-form-group">
                                    <label>Developer / Group Name</label>
                                    <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} />
                                </div>
                                <div className="pd-form-group">
                                    <label>Specialization</label>
                                    <input type="text" value={editData.expertise} onChange={(e) => setEditData({...editData, expertise: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} />
                                </div>
                            </div>
                            <div className="pd-form-group">
                                <label>Corporate Headquarters</label>
                                <input type="text" value={editData.location} onChange={(e) => setEditData({...editData, location: e.target.value})} style={{ background: 'var(--bg-main)', border: '1.5px solid #eee' }} />
                            </div>
                            <div className="pd-form-group">
                                <label>Corporate Bio & Vision</label>
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

export default PartnerDashboard;
