import React, { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';

const AdminDashboard = () => {
  const { 
    allUsers, logout, 
    adminStats, toggleUserStatus, deleteUserAction, approveContractorAction,
    allInquiries, updateInquiryStatusAction, appointContractorAction,
    navSettings, updateNavSettings
  } = useApp();
  
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // CRM States
  const [leadCategory, setLeadCategory] = useState('Property'); // 'Property' | 'Service'
  const [leadFilter, setLeadFilter] = useState('All');
  const [expandedLeadId, setExpandedLeadId] = useState(null);

  const filteredUsers = allUsers.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPartners = allUsers.filter(u => 
    u.role === 'PARTNER' && (
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredContractors = allUsers.filter(u => 
    u.role === 'CONTRACTOR' && (
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // CRM Logic: Categorize and Filter Leads
  const propertyLeads = allInquiries.filter(i => 
    i.type === 'Property' || i.area?.includes('Sector') || i.area?.includes('Road') || !i.type
  );
  
  const serviceLeads = allInquiries.filter(i => 
    i.type === 'Service' || i.area?.includes('Interior') || i.area?.includes('Design')
  );

  const currentLeads = (leadCategory === 'Property' ? propertyLeads : serviceLeads).filter(i => {
    const matchesSearch = i.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         i.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = leadFilter === 'All' || i.status === leadFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { lbl: 'Platform GMV', val: adminStats.totalGmv, trend: adminStats.growth },
    { lbl: 'Investors', val: allUsers.filter(u => u.role === 'USER').length, trend: '+5%' },
    { lbl: 'Partners/Devs', val: filteredPartners.length, trend: '+2' },
    { lbl: 'Contractors', val: filteredContractors.length, trend: '+4' }
  ];

  const handleAction = async (action, id, extra) => {
      if (action === 'toggle') await toggleUserStatus(id);
      if (action === 'delete') {
          if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
              await deleteUserAction(id);
          }
      }
      if (action === 'approve') await approveContractorAction(id);
      if (action === 'update_status') await updateInquiryStatusAction(id, extra);
      if (action === 'appoint') {
          await appointContractorAction(id, extra);
          await updateInquiryStatusAction(id, 'Assigned');
      }
  };

  const getStatusColor = (status) => {
      switch(status) {
          case 'New': return { bg: '#fff4e6', text: '#e67e22' };
          case 'Contacted': return { bg: '#e7f5ff', text: '#1971c2' };
          case 'Assigned': return { bg: '#f3f0ff', text: '#6741d9' };
          case 'In Progress': return { bg: '#edf2ff', text: '#364fc7' };
          case 'Closed/Won': return { bg: '#ebfbee', text: '#2b8a3e' };
          default: return { bg: '#f1f3f5', text: '#495057' };
      }
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa', flexWrap: 'wrap' }}>
      
      {/* Admin Sidebar */}
      <aside className="admin-sidebar" style={{ width: 'clamp(260px, 20vw, 300px)', background: 'var(--ink)', color: '#fff', position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="logo" style={{ padding: '30px 40px', marginBottom: '40px' }}>
            <div className="logo-mark" style={{ width: '32px', height: '32px', fontSize: '16px' }}>15</div>
            Admin<em>Control</em>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto' }}>
            {[
                { name: 'Overview', icon: '📊' },
                { name: 'Investor Management', icon: '👥' },
                { name: 'Developer Partners', icon: '🏢' },
                { name: 'Service Contractors', icon: '🏗️' },
                { name: 'Lead & Appointment', icon: '📩' },
                { name: 'Market Intelligence', icon: '📉' },
                { name: 'Site Settings', icon: '⚙️' }
            ].map(item => (
                <div 
                    key={item.name} 
                    onClick={() => setActiveTab(item.name)}
                    style={{ 
                        padding: '18px 40px', 
                        cursor: 'pointer', 
                        background: activeTab === item.name ? 'rgba(255,255,255,0.05)' : 'transparent',
                        borderLeft: activeTab === item.name ? '4px solid var(--gold2)' : '4px solid transparent',
                        color: activeTab === item.name ? 'var(--gold2)' : 'rgba(255,255,255,0.5)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        transition: '0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}
                >
                    <span>{item.icon}</span> {item.name}
                </div>
            ))}
        </nav>

        <div className="hide-mobile" style={{ padding: '0 40px' }}>
            <button 
                onClick={logout}
                style={{ 
                    width: '100%', 
                    padding: '15px', 
                    borderRadius: '12px', 
                    background: 'transparent', 
                    border: '1.5px solid rgba(255,255,255,0.15)', 
                    color: '#fff', 
                    fontWeight: 800, 
                    fontSize: '0.85rem', 
                    cursor: 'pointer',
                    transition: '0.3s',
                    marginTop: '20px'
                }}
            >
                LOGOUT SESSION
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', marginBottom: '8px' }}>{activeTab}</h2>
                <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>System Date: {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</div>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #ddd', width: 'clamp(150px, 20vw, 200px)' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                    onClick={logout}
                    style={{ 
                        padding: '10px 20px', 
                        borderRadius: '10px', 
                        background: '#fff', 
                        border: '1.5px solid var(--red)', 
                        color: 'var(--red)', 
                        fontWeight: 700, 
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                    }}
                >
                    LOGOUT
                </button>
            </div>
        </header>

        {activeTab === 'Overview' && (
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="info-card">
                        <div className="info-card-title">
                            <div>{s.lbl}</div>
                            <div style={{ color: '#2b8a3e' }}>{s.trend}</div>
                        </div>
                        <div className="info-card-val">{s.val}</div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'Lead & Appointment' && (
            <div>
                {/* CRM Toolbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: '#fff', padding: '20px 30px', borderRadius: '16px', border: '1px solid #eee', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        {['Property', 'Service'].map(cat => (
                            <button 
                                key={cat}
                                onClick={() => { setLeadCategory(cat); setExpandedLeadId(null); }}
                                style={{ 
                                    padding: '10px 20px', 
                                    borderRadius: '10px', 
                                    border: '1.5px solid',
                                    borderColor: leadCategory === cat ? 'var(--gold2)' : '#eee',
                                    background: leadCategory === cat ? 'var(--gold4)' : 'transparent',
                                    color: leadCategory === cat ? 'var(--ink)' : 'var(--muted)',
                                    fontWeight: 800,
                                    fontSize: '0.75rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {cat.toUpperCase()} LEADS
                            </button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted2)' }}>FILTER:</span>
                        <select 
                            value={leadFilter} 
                            onChange={(e) => setLeadFilter(e.target.value)}
                            style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #eee', fontSize: '0.85rem', fontWeight: 600 }}
                        >
                            <option>All</option>
                            <option>New</option>
                            <option>Contacted</option>
                            <option>Assigned</option>
                            <option>In Progress</option>
                            <option>Closed/Won</option>
                        </select>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="leads-table-container" style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #eee' }}>
                    <table className="leads-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#fcfcfc' }}>
                            <tr style={{ textAlign: 'left' }}>
                                <th style={{ padding: '20px 40px', fontSize: '0.75rem', color: 'var(--muted2)' }}>CLIENT</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: 'var(--muted2)' }}>INTEREST</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: 'var(--muted2)' }}>ASSIGNED</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: 'var(--muted2)' }}>STAGE</th>
                                <th style={{ padding: '20px 40px', fontSize: '0.75rem', color: 'var(--muted2)', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentLeads.length > 0 ? currentLeads.map((inq) => {
                                const isExpanded = expandedLeadId === inq.id;
                                const experts = leadCategory === 'Property' ? filteredPartners : filteredContractors;
                                const appointed = experts.find(e => e.id === inq.appointedContractorId);
                                const statusUI = getStatusColor(inq.status || 'New');

                                return (
                                    <React.Fragment key={inq.id}>
                                        <tr style={{ borderTop: '1px solid #f5f5f5', background: isExpanded ? '#fafafa' : 'transparent', transition: '0.2s' }}>
                                            <td style={{ padding: '20px 40px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <button 
                                                        onClick={() => setExpandedLeadId(isExpanded ? null : inq.id)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--gold)', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)', transition: '0.3s' }}
                                                    >
                                                        ›
                                                    </button>
                                                    <div>
                                                        <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{inq.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{inq.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink3)' }}>{inq.area || 'Direct Inquiry'}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--muted2)', marginTop: '2px' }}>Submitted: {inq.date || inq.createdAt?.split('T')[0]}</div>
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                {appointed ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gold4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>{appointed.name?.substring(0,2).toUpperCase()}</div>
                                                        <div>
                                                            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--ink)' }}>{appointed.name}</div>
                                                            <div style={{ fontSize: '0.65rem', color: 'var(--gold)', fontWeight: 700 }}>{appointed.expertise || 'Expert'}</div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <select 
                                                        onChange={(e) => handleAction('appoint', inq.id, e.target.value)}
                                                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.75rem', fontWeight: 600, background: '#fff' }}
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled>Assign {leadCategory === 'Property' ? 'Partner' : 'Contractor'}</option>
                                                        {experts.map(e => (
                                                            <option key={e.id} value={e.id}>{e.name}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                    <span style={{ padding: '5px 12px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 900, background: statusUI.bg, color: statusUI.text, width: 'fit-content', letterSpacing: '0.5px' }}>
                                                        {(inq.status || 'New').toUpperCase()}
                                                    </span>
                                                    <select 
                                                        onChange={(e) => handleAction('update_status', inq.id, e.target.value)}
                                                        value={inq.status || 'New'}
                                                        style={{ border: 'none', background: 'none', fontSize: '0.65rem', fontWeight: 700, color: 'var(--muted)', cursor: 'pointer', outline: 'none' }}
                                                    >
                                                        <option value="New">Move to New</option>
                                                        <option value="Contacted">Mark Contacted</option>
                                                        <option value="Assigned">Mark Assigned</option>
                                                        <option value="In Progress">Set In Progress</option>
                                                        <option value="Closed/Won">Close as Won</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td style={{ padding: '20px 40px', textAlign: 'right' }}>
                                                <button 
                                                    onClick={() => handleAction('update_status', inq.id, 'Archived')}
                                                    style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #eee', background: '#fff', fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted2)', cursor: 'pointer' }}
                                                >
                                                    Archive
                                                </button>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr style={{ background: '#fcfcfc' }}>
                                                <td colSpan="5" style={{ padding: '30px 80px', borderBottom: '1px solid #eee' }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                                                        <div>
                                                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--muted2)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Requirement / Message</div>
                                                            <div style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--ink2)', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                                                                "{inq.message || 'No specific message provided by the client.'}"
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                                            <div>
                                                                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--muted2)', textTransform: 'uppercase', marginBottom: '5px' }}>Direct Contact</div>
                                                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold)' }}>{inq.phone || '+91 99109 11650'}</div>
                                                            </div>
                                                            <div>
                                                                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--muted2)', textTransform: 'uppercase', marginBottom: '5px' }}>User Role</div>
                                                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>{inq.userId ? 'REGISTERED INVESTOR' : 'GUEST LEAD'}</div>
                                                            </div>
                                                            <button 
                                                                onClick={() => window.open(`mailto:${inq.email}`)}
                                                                className="pd-btn-primary" 
                                                                style={{ padding: '12px', fontSize: '0.8rem', borderRadius: '10px' }}
                                                            >
                                                                SEND DIRECT EMAIL
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '100px', textAlign: 'center', color: 'var(--muted2)' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📁</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>No leads found matching your criteria.</div>
                                        <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>Try switching categories or clearing filters.</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {(activeTab === 'Investor Management' || activeTab === 'Developer Partners' || activeTab === 'Service Contractors') && (
            <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#fcfcfc' }}>
                        <tr style={{ textAlign: 'left' }}>
                            <th style={{ padding: '20px 40px', fontSize: '0.75rem', color: 'var(--muted2)' }}>NAME</th>
                            <th style={{ padding: '20px', fontSize: '0.75rem', color: 'var(--muted2)' }}>IDENTITY / EXPERTISE</th>
                            <th style={{ padding: '20px', fontSize: '0.75rem', color: 'var(--muted2)' }}>STATUS</th>
                            <th style={{ padding: '20px 40px', fontSize: '0.75rem', color: 'var(--muted2)', textAlign: 'right' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(activeTab === 'Investor Management' ? allUsers.filter(u => u.role === 'USER') : 
                          activeTab === 'Developer Partners' ? filteredPartners : 
                          filteredContractors).map((u) => (
                            <tr key={u.id} style={{ borderTop: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '20px 40px' }}>
                                    <div style={{ fontWeight: 700 }}>{u.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{u.email}</div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ fontSize: '0.9rem' }}>{u.expertise || u.role}</div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{u.location || 'Global'}</div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ padding: '6px 12px', borderRadius: '6px', background: u.active ? '#e7f5ed' : '#fff5f5', color: u.active ? '#2b8a3e' : '#c92a2a', fontSize: '0.7rem', fontWeight: 800 }}>
                                        {u.active ? 'ACTIVE' : 'INACTIVE'}
                                    </span>
                                </td>
                                <td style={{ padding: '20px 40px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                        <button onClick={() => handleAction('toggle', u.id)} style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>Toggle Status</button>
                                        <button onClick={() => handleAction('delete', u.id)} style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #ffc9c9', background: '#fff', color: '#c92a2a', fontSize: '0.75rem', fontWeight: 600 }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        {/* ── SITE SETTINGS TAB ──────────────────────────────────────────── */}
        {activeTab === 'Site Settings' && (
            <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Site Settings</h2>
                <p style={{ color: '#868e96', fontSize: '0.85rem', marginBottom: '30px' }}>Control which sections are visible on the public website.</p>

                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e9ecef', padding: '30px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: '#333' }}>Navbar Sections</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>Projects Section</div>
                            <div style={{ fontSize: '0.8rem', color: '#868e96' }}>Show or hide the "Projects" link in the main navigation bar</div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '52px', height: '28px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={navSettings.showProjects}
                                onChange={(e) => updateNavSettings({ showProjects: e.target.checked })}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                borderRadius: '14px',
                                background: navSettings.showProjects ? 'var(--gold, #C59B3C)' : '#ccc',
                                transition: '0.3s'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    width: '22px', height: '22px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    top: '3px',
                                    left: navSettings.showProjects ? '27px' : '3px',
                                    transition: '0.3s',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                                }} />
                            </span>
                        </label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef', marginTop: '16px' }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>Press Section</div>
                            <div style={{ fontSize: '0.8rem', color: '#868e96' }}>Show or hide the "Press" link in the corporate menu</div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '52px', height: '28px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={navSettings.showPress}
                                onChange={(e) => updateNavSettings({ showPress: e.target.checked })}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                borderRadius: '14px',
                                background: navSettings.showPress ? 'var(--gold, #C59B3C)' : '#ccc',
                                transition: '0.3s'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    width: '22px', height: '22px',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    top: '3px',
                                    left: navSettings.showPress ? '27px' : '3px',
                                    transition: '0.3s',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                                }} />
                            </span>
                        </label>
                    </div>

                    <div style={{ marginTop: '16px', padding: '12px 16px', background: (navSettings.showProjects && navSettings.showPress) ? '#e7f5ed' : '#fff4e6', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: (navSettings.showProjects && navSettings.showPress) ? '#2b8a3e' : '#e67e22' }}>
                        Status: Custom visibility settings are currently <strong>ACTIVE</strong>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
