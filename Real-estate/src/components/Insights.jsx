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

  if (loading || !data) return <div className="section" style={{ textAlign: 'center' }}><h3>Generating report...</h3></div>;

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
  const bgColors = ['#1b3022', '#2d4a3a', '#3e5c4a', '#8c6a4a', '#b08968', '#ddb892'];

  return (
    <div className="insights-report" ref={sectionRef} style={{ background: 'var(--bg-main)', color: 'var(--ink)', padding: '60px 20px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '60px', textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--gold)', fontWeight: 800, letterSpacing: '2px', marginBottom: '16px' }}>STRATEGIC INTELLIGENCE REPORT</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.1', fontWeight: 900, marginBottom: '24px' }}>{data.insightsTitle}</h1>
          <div style={{ width: '80px', height: '4px', background: 'var(--gold)', margin: '0 auto 40px' }}></div>
          <Link to="/" onClick={() => setView('home')} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}>← RETURN TO DASHBOARD</Link>
        </header>

        {/* Introduction */}
        <section className="report-section anim-fade-in-up" style={{ marginBottom: '80px' }}>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--ink)', marginBottom: '30px', whiteSpace: 'pre-wrap' }}>{data.introduction}</p>
          {data.marketValuation && (
             <div style={{ background: 'var(--cream2)', padding: '40px', borderRadius: '16px', borderLeft: '6px solid var(--gold)', marginBottom: '40px' }}>
                <p style={{ fontSize: '1.1rem', margin: 0, fontStyle: 'italic', color: 'var(--ink)' }}>{data.marketValuation}</p>
             </div>
          )}
        </section>

        {/* Sections */}
        {data.sections?.map((sec, idx) => (
          <section key={idx} className="report-section anim-fade-in-up" style={{ marginBottom: '80px', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${idx * 0.2}s` }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px', color: 'var(--gold)' }}>{sec.title}</h2>
            {sec.content && <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '24px', whiteSpace: 'pre-wrap' }}>{sec.content}</p>}
            
            {sec.list && (
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {sec.list.map((item, i) => (
                  <li key={i} style={{ padding: '16px', background: '#fff', border: '1px solid var(--cream3)', borderRadius: '12px', fontSize: '0.95rem', display: 'flex', gap: '12px' }}>
                    <span style={{ color: 'var(--gold)' }}>✦</span> {item}
                  </li>
                ))}
              </ul>
            )}

            {sec.subsections?.map((sub, i) => (
              <div key={i} style={{ marginBottom: '30px', paddingLeft: '20px', borderLeft: '2px solid var(--cream3)' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>{sub.name}</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{sub.content}</p>
              </div>
            ))}

            {sec.extra && <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--muted)' }}>{sec.extra}</p>}
          </section>
        ))}

        {/* Charts Section */}
        <section className="charts-report" style={{ marginTop: '100px', padding: '60px', background: 'var(--ink)', borderRadius: '24px', color: '#fff' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '60px', color: 'var(--gold2)' }}>Statistical Growth Projections</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            
            {/* Bars */}
            <div>
              <h4 style={{ marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Market Benchmarking</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {data.bars.map((b, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                      <span style={{ fontWeight: 600 }}>{b.loc}</span>
                      <span style={{ color: 'var(--gold2)' }}>{b.val}</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: barsWidth[i] || '0%', height: '100%', background: 'var(--gold)', transition: `width ${1 + i * 0.2}s cubic-bezier(0.16, 1, 0.3, 1)` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend Chart */}
            <div>
               <h4 style={{ marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Market Growth Index (Base 2019=100)</h4>
               <div style={{ position: 'relative', height: '150px' }}>
                  <svg style={{ width: '100%', height: '150px' }} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="trend-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5"/>
                        <stop offset="100%" stopColor="var(--gold)" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d={areaD} fill="url(#trend-grad)" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease 0.5s' }} />
                    <path d={pathD} fill="none" stroke="var(--gold2)" strokeWidth="3" style={{ strokeDasharray: 1000, strokeDashoffset: isVisible ? 0 : 1000, transition: 'stroke-dashoffset 2s ease' }} />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                    <span>2020</span><span>2022</span><span>2024</span><span>2025</span><span style={{ color: 'var(--gold2)' }}>2030(P)</span>
                  </div>
               </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginTop: '80px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold2)' }}>{data.invTotal}</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>Market Valuation</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold2)' }}>{data.invYoy}</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>Compound Growth</div>
            </div>
          </div>
        </section>

        <footer style={{ marginTop: '100px', textAlign: 'center', borderTop: '1px solid var(--cream3)', paddingTop: '40px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>© 2026 Bharat Estates Market Research Division. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Insights;
