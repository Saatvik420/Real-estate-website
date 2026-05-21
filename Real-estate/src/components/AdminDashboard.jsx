import React, { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';

const AdminDashboard = () => {
  const { 
    allUsers, contractors, agents, logout, 
    adminStats, toggleUserStatus, deleteUserAction, approveContractorAction,
    allInquiries, updateInquiryStatusAction, appointContractorAction
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
    <div className="section-full" style={{ background: '#f8f9fa', minHeight: '100vh', padding: 0, display: 'flex' }}>
      
      {/* Admin Sidebar */}
      <aside style={{ width: '300px', background: 'var(--ink)', color: '#fff', padding: '40px 0', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 100 }}>
        <div className="logo" style={{ padding: '0 40px', marginBottom: '60px' }}>
            <div className="logo-mark" style={{ width: '32px', height: '32px', fontSize: '16px' }}>B</div>
            Admin<em>Control</em>
        </div>

        <nav style={{ flex: 1 }}>
            {[
                { name: 'Overview', icon: '📊' },
                { name: 'Investor Management', icon: '👥' },
                { name: 'Developer Partners', icon: '🏢' },
                { name: 'Service Contractors', icon: '🏗️' },
                { name: 'Lead & Appointment', icon: '📩' },
                { name: 'Market Intelligence', icon: '📉' }
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

        <div style={{ padding: '0 40px' }}>
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
                onMouseOver={(e) => {e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'var(--gold2)';}}
                onMouseOut={(e) => {e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.15)';}}
            >
                LOGOUT SESSION
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '60px', marginLeft: '300px' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
            <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', marginBottom: '8px' }}>{activeTab}</h2>
                <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>System Date: {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</div>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #ddd', width: '250px' }}
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
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--gold2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>AD</div>
            </div>
        </header>

        {activeTab === 'Overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
                {stats.map((s, i) => (
                    <div key={i} style={{ background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #eee' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted2)', textTransform: 'uppercase', fontWeight: 800 }}>{s.lbl}</div>
                            <div style={{ color: '#2b8a3e', fontSize: '0.75rem', fontWeight: 800 }}>{s.trend}</div>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)' }}>{s.val}</div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'Lead & Appointment' && (
            <div>
                {/* CRM Toolbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: '#fff', padding: '20px 30px', borderRadius: '16px', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        {['Property', 'Service'].map(cat => (
                            <button 
                                key={cat}
                                onClick={() => { setLeadCategory(cat); setExpandedLeadId(null); }}
                                style={{ 
                                    padding: '10px 25px', 
                                    borderRadius: '10px', 
                                    border: '1.5px solid',
                                    borderColor: leadCategory === cat ? 'var(--gold2)' : '#eee',
                                    background: leadCategory === cat ? 'var(--gold4)' : 'transparent',
                                    color: leadCategory === cat ? 'var(--ink)' : 'var(--muted)',
                                    fontWeight: 800,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    transition: '0.2s'
                                }}
                            >
                                {cat.toUpperCase()} LEADS
                            </button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted2)' }}>FILTER STATUS:</span>
                        <select 
                            value={leadFilter} 
                            onChange={(e) => setLeadFilter(e.target.value)}
                            style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #eee', fontSize: '0.85rem', fontWeight: 600, outline: 'none' }}
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
                <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#fcfcfc' }}>
                            <tr style={{ textAlign: 'left' }}>
                                <th style={{ padding: '20px 40px', fontSize: '0.75rem', color: 'var(--muted2)' }}>CLIENT DETAILS</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: 'var(--muted2)' }}>INTEREST / LOCATION</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: 'var(--muted2)' }}>ASSIGNED {leadCategory === 'Property' ? 'DEVELOPER' : 'EXPERT'}</th>
                                <th style={{ padding: '20px', fontSize: '0.75rem', color: 'var(--muted2)' }}>PIPELINE STAGE</th>
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
                                                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold)' }}>{inq.phone || '+91 90000 00000'}</div>
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
      </main>
    </div>
  );
};

export default AdminDashboard;
