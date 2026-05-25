import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const Insights = () => {
  const { selectedCity, selectedState, setView } = useApp();
  const [data, setData] = useState(null);
  const [barsWidth, setBarsWidth] = useState([]);
  const [rentalsWidth, setRentalsWidth] = useState([]);
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    if (isVisible && data && data.bars && data.rentals) {
      setBarsWidth(data.bars.map(() => '0%'));
      setRentalsWidth(data.rentals.map(() => '0%'));

      const timer = setTimeout(() => {
        setBarsWidth(data.bars.map(b => b.pct));
        setRentalsWidth(data.rentals.map(r => r.w));
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [data, isVisible]);

  if (loading || !data || !data.bars || !data.rentals) return <div className="section" style={{ textAlign: 'center' }}><h3>Analyzing market data...</h3></div>;

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
    <div className="insights-sec reveal" id="insights-section" ref={sectionRef}>
      <div className="insights-inner">
        <div className="sec-header anim-slide-in-left">
          <div>
            <div className="eyebrow" style={{ color: 'var(--gold)' }}>Strategic Intelligence</div>
            <h2 className="sec-title" style={{ color: 'var(--ink)' }}>Market <span>Insights</span> for <span>{data.insightsTitle}</span></h2>
          </div>
          <Link className="view-all" to="/" onClick={() => setView('home')}>← BACK TO HOME</Link>
        </div>

        <div className="insights-grid">
          <div className="insight-box" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
            <div className="pcc-head">
              <div>
                <div className="pcc-title" style={{ color: 'var(--ink)' }}>Micromarket Benchmarking</div>
                <div className="pcc-sub">Growth potential & key drivers across prime locations</div>
              </div>
              <div className="pcc-pill" style={{ background: 'rgba(189,168,113,0.1)', color: 'var(--gold)', borderColor: 'var(--gold)' }}>LIVE INDEX</div>
            </div>
            <div className="bar-row">
              {data.bars.map((b, i) => (
                <div key={i} className="bar-item">
                  <div className="bar-loc" style={{ fontWeight: '600' }}>{b.loc}</div>
                  <div className="bar-track" style={{ background: 'var(--cream3)', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                    <div className="bar-fill" style={{ width: barsWidth[i] || '0%', height: '100%', background: `linear-gradient(90deg, ${bgColors[i % bgColors.length]}, var(--gold))`, transition: `width ${0.8 + i * 0.2}s cubic-bezier(0.16, 1, 0.3, 1)`, display: 'flex', alignItems: 'center', paddingLeft: '12px', borderRadius: '12px', position: 'relative' }}>
                       <span style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>{b.change}</span>
                    </div>
                  </div>
                  <div className="bar-val" style={{ color: 'var(--ink)', fontSize: '12px', fontWeight: 'bold', marginTop: '4px' }}>{b.val} Potential</div>
                </div>
              ))}
            </div>
          </div>

          <div className="insight-box" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.2s' }}>
            <div className="pcc-head">
              <div>
                <div className="pcc-title" style={{ color: 'var(--ink)' }}>Investment Drivers</div>
                <div className="pcc-sub">Core thematic demand driving real estate capital</div>
              </div>
              <div className="pcc-pill" style={{ background: 'rgba(27,48,34,0.1)', color: 'var(--ink)', borderColor: 'var(--ink)' }}>DEMAND</div>
            </div>
            <div className="rental-list" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.rentals.map((r, i) => (
                <div key={i} className="rental-row">
                  <div className="rental-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--ink)', fontSize: '14px' }}>{r.lbl}</span>
                    <span className="yield" style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '14px' }}>{r.yield}</span>
                  </div>
                  <div className="rental-bar-bg" style={{ background: 'var(--cream3)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="rental-bar-fill" style={{ width: rentalsWidth[i] || '0%', height: '100%', background: 'var(--ink)', transition: `width ${0.8 + i * 0.3}s cubic-bezier(0.16, 1, 0.3, 1)` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="insight-box" style={{ gridColumn: 'span 2', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.3s' }}>
            <div className="pcc-head">
              <div>
                <div className="pcc-title" style={{ color: 'var(--ink)' }}>Real Estate Growth Index</div>
                <div className="pcc-sub">Historical growth trajectory and projections till 2030 (Base 2019=100)</div>
              </div>
            </div>
            <div className="trend-container" style={{ position: 'relative', height: '180px', marginTop: '30px' }}>
              <div className="trend-labels-y" style={{ position: 'absolute', left: 0, top: 0, bottom: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted)', width: '30px' }}>
                <span>400</span><span>300</span><span>200</span><span>100</span><span>0</span>
              </div>
              <svg className="trend-chart-svg" preserveAspectRatio="none" style={{ width: 'calc(100% - 40px)', height: '150px', marginLeft: '40px' }} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                <defs>
                  <linearGradient id="trend-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.05"/>
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} className="trend-grid-line" x1="0" y1={(chartHeight / 4) * i} x2={chartWidth} y2={(chartHeight / 4) * i} stroke="var(--cream3)" strokeDasharray="4 4" />
                ))}
                
                {/* Reveal Animation for Area and Path */}
                <g style={{ strokeDasharray: 2000, strokeDashoffset: isVisible ? 0 : 2000, transition: 'stroke-dashoffset 2.5s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                   <path className="trend-area" d={areaD} fill="url(#trend-grad)" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease 1s' }} />
                   <path className="trend-line" d={pathD} fill="none" stroke="var(--gold)" strokeWidth="3" />
                </g>

                {points.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="5" fill="#fff" stroke="var(--gold)" strokeWidth="2" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0)', transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.5 + (i * 0.2)}s`, transformOrigin: `${p.x}px ${p.y}px` }} />
                ))}
              </svg>
              <div className="trend-labels-x" style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '40px', marginTop: '10px', fontSize: '11px', color: 'var(--ink)', fontWeight: '600' }}>
                <span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span style={{ color: 'var(--gold)' }}>2030(P)</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '16px', fontSize: '11px', fontWeight: '600' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', background: 'var(--gold)', borderRadius: '50%' }}></div> Index Value</span>
            </div>
          </div>
        </div>

        <div className="inventory-grid" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease 0.4s', marginTop: '48px', background: 'var(--ink)', padding: '40px', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'radial-gradient(circle at 100% 50%, rgba(189,168,113,0.15), transparent)', pointerEvents: 'none' }}></div>
          <div className="inv-stat">
            <div className="inv-num" style={{ color: 'var(--gold2)' }}>{data.invTotal || '10,000+'}</div>
            <div className="inv-lbl" style={{ color: 'rgba(255,255,255,0.6)' }}>Total Market Size</div>
          </div>
          <div className="inv-stat">
            <div className="inv-num" style={{ color: 'var(--gold2)' }}>{data.invYoy || 'CAGR 8-10%'}</div>
            <div className="inv-lbl" style={{ color: 'rgba(255,255,255,0.6)' }}>Projected Growth</div>
          </div>
          <div className="inv-stat">
            <div className="inv-num" style={{ color: 'var(--gold2)' }}>High</div>
            <div className="inv-lbl" style={{ color: 'rgba(255,255,255,0.6)' }}>Infrastructure Impact</div>
          </div>
          <div className="inv-stat">
            <div className="inv-num" style={{ color: 'var(--gold2)' }}>RERA</div>
            <div className="inv-lbl" style={{ color: 'rgba(255,255,255,0.6)' }}>Approved Projects</div>
          </div>
        </div>

        <div className="trending-wrap" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.6s ease 0.5s', marginTop: '40px', justifyContent: 'center' }}>
          <span className="tr-label" style={{ color: 'var(--muted)' }}>High-Velocity Growth Nodes:</span>
          {['Jaipur Ajmer Rd', 'Noida Jewar', 'Neemrana DMIC', 'Ayodhya', 'Dehradun Hills', 'Khatu Shyam Ji'].map((pocket, idx) => (
            <div key={idx} className="tr-chip" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(10px)', transition: `all 0.4s ease ${0.6 + idx * 0.1}s`, background: 'var(--ink)', border: '1px solid rgba(189,168,113,0.3)', color: 'var(--gold2)' }}>
              📍 {pocket}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
