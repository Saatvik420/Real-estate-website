import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const Insights = () => {
  const { selectedCity, selectedState, setView } = useApp();
  const [data, setData] = useState(null);
  const [barsWidth, setBarsWidth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const locationId = selectedCity !== 'India' ? selectedCity.toLowerCase() : (selectedState ? selectedState.toLowerCase() : 'india');
      const locationType = selectedCity !== 'India' ? 'city' : (selectedState ? 'state' : 'city');
      
      const res = await apiService.getMarketInsights(locationId, locationType);
      if (res.success) {
          setData(res.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedCity, selectedState]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    if (isVisible && data && data.bars) {
      setBarsWidth(data.bars.map(() => '0%'));
      const timer = setTimeout(() => {
        setBarsWidth(data.bars.map(b => b.pct));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data, isVisible]);

  if (loading || !data) return <div className="section reveal" style={{ textAlign: 'center' }}><h3>Generating report...</h3></div>;

  const trendData = data.trend || [20, 40, 60, 80, 100];
  const maxVal = Math.max(...trendData);
  const chartHeight = 150;
  const chartWidth = 400;
  
  const points = trendData.map((v, i) => ({
    x: (i * chartWidth) / (Math.max(1, trendData.length - 1)),
    y: chartHeight - (v / maxVal) * chartHeight * 0.8 - 20
  }));

  const generateSmoothPath = (pts) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const cp1x = curr.x + (next.x - curr.x) / 2;
      const cp2x = curr.x + (next.x - curr.x) / 2;
      d += ` C ${cp1x},${curr.y} ${cp2x},${next.y} ${next.x},${next.y}`;
    }
    return d;
  };

  const pathD = generateSmoothPath(points);
  const areaD = `${pathD} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <div className="insights-report" ref={sectionRef} style={{ background: 'var(--bg-main)', color: 'var(--ink)', padding: '60px 20px', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes pulse-glow {
          0% { r: 4; opacity: 0.6; stroke-width: 0; }
          50% { r: 6; opacity: 1; stroke-width: 4; }
          100% { r: 4; opacity: 0.6; stroke-width: 0; }
        }
        @keyframes shimmer-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float-stat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .shimmer-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer-bar 3s infinite;
        }
        .luxury-card {
           background: #fff;
           border-radius: 24px;
           padding: 40px;
           box-shadow: 0 20px 60px rgba(0,0,0,0.03);
           border: 1px solid var(--cream3);
           margin-bottom: 40px;
           transition: transform 0.4s ease;
        }
        .luxury-card:hover {
           transform: translateY(-5px);
        }
        .stat-badge {
           display: inline-block;
           padding: 6px 16px;
           background: var(--gold4);
           color: var(--ink);
           border-radius: 50px;
           font-size: 0.75rem;
           font-weight: 800;
           letter-spacing: 1px;
           margin-bottom: 20px;
        }
      `}</style>
      
      {/* Background Decorative Elements */}
      <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, var(--gold4) 0%, transparent 70%)', opacity: 0.2, zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, var(--gold4) 0%, transparent 70%)', opacity: 0.1, zIndex: 0 }}></div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <header style={{ marginBottom: '80px', textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--gold)', fontWeight: 800, letterSpacing: '4px', marginBottom: '20px' }}>MARKET INTELLIGENCE 2026</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1', fontWeight: 900, marginBottom: '24px' }}>{data.insightsTitle}</h1>
          <div style={{ width: '120px', height: '4px', background: 'var(--gold)', margin: '0 auto 40px' }}></div>
          <Link to="/" onClick={() => setView('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px' }}>
            <span style={{ fontSize: '1.2rem' }}>←</span> RETURN TO DASHBOARD
          </Link>
        </header>

        {/* Global Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '80px' }}>
           <div className="luxury-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Market Valuation</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ink)' }}>{data.invTotal}</div>
           </div>
           <div className="luxury-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Compound Growth</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold2)' }}>{data.invYoy}</div>
           </div>
           <div className="luxury-card" style={{ textAlign: 'center', padding: '30px', background: 'var(--ink)', color: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Growth Potential</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold2)' }}>HIGH</div>
           </div>
        </div>

        {/* Introduction */}
        <section className="report-section anim-fade-in-up" style={{ marginBottom: '100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
             <div>
                <p style={{ fontSize: '1.35rem', lineHeight: '1.8', color: 'var(--ink)', marginBottom: '30px', fontWeight: 500 }}>{data.introduction}</p>
                {data.marketValuation && (
                  <div style={{ background: 'var(--cream2)', padding: '30px', borderRadius: '16px', borderLeft: '8px solid var(--gold)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                      <p style={{ fontSize: '1.1rem', margin: 0, fontStyle: 'italic', color: 'var(--ink)', lineHeight: '1.6' }}>{data.marketValuation}</p>
                  </div>
                )}
             </div>
             
             {/* Dynamic Chart Overlay */}
             <div style={{ background: 'var(--ink)', padding: '50px', borderRadius: '32px', color: '#fff', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
                <h4 style={{ marginBottom: '30px', color: 'var(--gold2)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Market Performance Index</h4>
                <div style={{ position: 'relative', height: '180px' }}>
                    <svg style={{ width: '100%', height: '180px' }} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="trend-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5"/>
                          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d={areaD} fill="url(#trend-grad)" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1.5s ease 1.5s' }} />
                      <path d={pathD} fill="none" stroke="var(--gold2)" strokeWidth="4" style={{ strokeDasharray: 2000, strokeDashoffset: isVisible ? 0 : 2000, transition: 'stroke-dashoffset 4s cubic-bezier(0.4, 0, 0.2, 1) 1s' }} />
                      {points.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="6" fill="var(--gold)" stroke="var(--ink)" strokeWidth="2" style={{ 
                          opacity: isVisible ? 1 : 0, 
                          transition: `opacity 0.5s ease ${1.5 + (i * 0.2)}s`,
                          animation: isVisible ? `pulse-glow 2s infinite ${1.5 + (i * 0.2)}s` : 'none'
                        }} />
                      ))}
                    </svg>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                      <span>2020</span><span>2022</span><span>2024</span><span>2025</span><span style={{ color: 'var(--gold2)' }}>2030(P)</span>
                    </div>
                </div>
             </div>
          </div>
        </section>

        {/* Dynamic Rich Content Sections */}
        {data.sections?.map((sec, idx) => (
          <section key={idx} className="luxury-card" style={{ marginBottom: '80px', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${idx * 0.2}s` }}>
            <div className="stat-badge">{idx + 1} / {data.sections.length} STRATEGIC PILLAR</div>
            <h2 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: '30px', color: 'var(--ink)' }}>{sec.title}</h2>
            {sec.content && <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '40px', color: '#444' }}>{sec.content}</p>}
            
            {sec.list && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px', marginBottom: '40px' }}>
                {sec.list.map((item, i) => (
                  <div key={i} style={{ padding: '24px', background: 'var(--cream2)', borderRadius: '16px', display: 'flex', gap: '15px', alignItems: 'flex-start', border: '1px solid transparent', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--gold4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream2)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span style={{ color: 'var(--gold)', fontSize: '1.5rem', lineHeight: 1 }}>✦</span>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' }}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {sec.subsections?.map((sub, i) => (
              <div key={i} style={{ marginBottom: '40px', padding: '40px', background: 'linear-gradient(135deg, #fff 0%, #fafafa 100%)', borderRadius: '20px', borderLeft: '4px solid var(--gold2)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.6rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: '15px' }}>{sub.name}</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#555' }}>{sub.content}</p>
              </div>
            ))}

            {sec.extra && (
              <div style={{ marginTop: '40px', padding: '30px', background: 'var(--ink)', color: 'rgba(255,255,255,0.7)', borderRadius: '16px', fontSize: '1.1rem', lineHeight: '1.8', borderLeft: '6px solid var(--gold)' }}>
                {sec.extra}
              </div>
            )}
          </section>
        ))}

        {/* Benchmarking Section */}
        <section className="luxury-card" style={{ background: 'var(--ink)', color: '#fff', border: 'none', padding: '60px' }}>
           <h2 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", textAlign: 'center', marginBottom: '60px', color: 'var(--gold2)' }}>Regional Benchmarking</h2>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {data.bars.map((b, i) => (
                <div key={i} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.1}s` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.1rem' }}>
                    <span style={{ fontWeight: 700, letterSpacing: '1px' }}>{b.loc}</span>
                    <span style={{ color: 'var(--gold2)', fontWeight: 800 }}>{b.val} INDEX POINTS</span>
                  </div>
                  <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ width: barsWidth[i] || '0%', height: '100%', background: 'linear-gradient(to right, var(--gold), var(--gold2))', transition: `width 2s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + i * 0.1}s`, position: 'relative' }}>
                       <div className="shimmer-overlay"></div>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* Footer CTA */}
        <section style={{ textAlign: 'center', marginTop: '100px', paddingBottom: '60px' }}>
           <h3 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Ready to build your legacy?</h3>
           <p style={{ color: 'var(--muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', fontSize: '1.1rem' }}>Connect with our wealth advisors for a private consultation on strategic land acquisitions across India's growth corridors.</p>
           <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button className="nav-btn-solid" style={{ padding: '18px 40px' }}>BOOK CONSULTATION</button>
              <button className="nav-btn-ghost" style={{ padding: '18px 40px' }}>DOWNLOAD FULL REPORT</button>
           </div>
        </section>

      </div>
    </div>
  );
};

export default Insights;
