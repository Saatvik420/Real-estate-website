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
           text-transform: uppercase;
        }
        .insight-table {
           width: 100%;
           border-collapse: collapse;
           margin: 30px 0;
           font-size: 0.95rem;
        }
        .insight-table th {
           background: var(--ink);
           color: #fff;
           text-align: left;
           padding: 15px;
           font-family: 'Playfair Display', serif;
        }
        .insight-table td {
           padding: 15px;
           border-bottom: 1px solid var(--cream3);
           color: #444;
        }
        .growth-index-grid {
           display: flex;
           flex-direction: column;
           gap: 12px;
           margin-top: 30px;
        }
        .growth-bar-wrap {
           display: flex;
           align-items: center;
           gap: 15px;
        }
        .growth-label {
           width: 60px;
           font-weight: 700;
           font-size: 0.9rem;
        }
        .growth-track {
           flex: 1;
           height: 24px;
           background: var(--cream2);
           border-radius: 4px;
           overflow: hidden;
           position: relative;
        }
        .growth-fill {
           height: 100%;
           background: var(--ink);
           transition: width 2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .growth-val {
           position: absolute;
           right: 10px;
           top: 50%;
           transform: translateY(-50%);
           font-size: 0.75rem;
           font-weight: 800;
           color: var(--gold2);
        }
      `}</style>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <header style={{ marginBottom: '80px', textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--gold)', fontWeight: 800, letterSpacing: '4px', marginBottom: '20px' }}>STRATEGIC INSIGHTS</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', fontWeight: 900, marginBottom: '24px' }}>{data.insightsTitle}</h1>
          <div style={{ width: '120px', height: '4px', background: 'var(--gold)', margin: '0 auto 40px' }}></div>
          <Link to="/" onClick={() => setView('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px' }}>
            ← RETURN TO DASHBOARD
          </Link>
        </header>

        {/* Overview Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '80px' }}>
           <div className="luxury-card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Market Valuation</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ink)' }}>{data.invTotal}</div>
           </div>
           <div className="luxury-card" style={{ textAlign: 'center', padding: '30px', background: 'var(--ink)', color: '#fff' }}>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Compound Growth</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold2)' }}>{data.invYoy}</div>
           </div>
        </div>

        {/* Introduction */}
        <section className="luxury-card" style={{ marginBottom: '80px' }}>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--ink)', marginBottom: '30px', fontWeight: 500 }}>{data.introduction}</p>
          <div style={{ background: 'var(--cream2)', padding: '30px', borderRadius: '16px', borderLeft: '8px solid var(--gold)' }}>
              <p style={{ fontSize: '1.1rem', margin: 0, fontStyle: 'italic', color: 'var(--ink)', lineHeight: '1.6' }}>{data.marketValuation}</p>
          </div>
        </section>

        {/* Dynamic Sections */}
        {data.sections?.map((sec, idx) => (
          <section key={idx} className="luxury-card" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${idx * 0.2}s` }}>
            <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: '24px', color: 'var(--ink)' }}>{sec.title}</h2>
            
            {sec.subtitle && <div className="stat-badge">{sec.subtitle}</div>}
            
            {sec.content && <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px', color: '#444' }}>{sec.content}</p>}
            
            {sec.list && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '15px', marginBottom: '30px' }}>
                {sec.list.map((item, i) => (
                  <div key={i} style={{ padding: '20px', background: 'var(--cream2)', borderRadius: '12px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>✦</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)', lineHeight: '1.4' }}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {sec.subsections?.map((sub, i) => (
              <div key={i} style={{ marginBottom: '30px', padding: '30px', background: 'linear-gradient(135deg, #fff 0%, #fafafa 100%)', borderRadius: '16px', borderLeft: '4px solid var(--gold2)', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.4rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: '12px' }}>{sub.name}</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#555' }}>{sub.content}</p>
              </div>
            ))}

            {sec.growthIndex && (
               <div className="growth-index-grid">
                  {sec.growthIndex.map((item, i) => {
                    const pct = (parseInt(item.val) / 400) * 100 + '%';
                    return (
                      <div key={i} className="growth-bar-wrap">
                        <span className="growth-label">{item.label}</span>
                        <div className="growth-track">
                          <div className="growth-fill" style={{ width: isVisible ? pct : '0%' }}></div>
                          <span className="growth-val">{item.val}</span>
                        </div>
                      </div>
                    );
                  })}
               </div>
            )}

            {sec.table && (
              <div style={{ overflowX: 'auto' }}>
                <table className="insight-table">
                  <thead>
                    <tr>
                      {sec.table.headers.map((h, i) => <th key={i}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, ci) => <td key={cell}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {sec.extra && (
              <div style={{ marginTop: '30px', padding: '25px', background: 'var(--ink)', color: 'rgba(255,255,255,0.7)', borderRadius: '12px', fontSize: '1rem', lineHeight: '1.7', borderLeft: '5px solid var(--gold)' }}>
                {sec.extra}
              </div>
            )}
          </section>
        ))}

        {/* Footer CTA */}
        <section style={{ textAlign: 'center', marginTop: '100px', paddingBottom: '60px' }}>
           <h3 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Explore Opportunities</h3>
           <p style={{ color: 'var(--muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', fontSize: '1.1rem' }}>Connect with our wealth advisors for strategically selected land investments in infrastructure-backed locations.</p>
           <button className="nav-btn-solid" style={{ padding: '18px 40px' }}>BOOK CONSULTATION</button>
        </section>

      </div>
    </div>
  );
};

export default Insights;
