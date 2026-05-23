import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const Insights = () => {
  const { selectedCity, selectedState, setView } = useApp();
  const [data, setData] = useState(null);
  const [barsWidth, setBarsWidth] = useState([]);
  const [rentalsWidth, setRentalsWidth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch based on city if selected, otherwise based on state, default to India
      const locationId = selectedCity !== 'India' ? selectedCity : (selectedState || 'India');
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
    if (data && data.bars && data.rentals) {
      setBarsWidth(data.bars.map(() => '0%'));
      setRentalsWidth(data.rentals.map(() => '0%'));

      const timer = setTimeout(() => {
        setBarsWidth(data.bars.map(b => b.pct));
        setRentalsWidth(data.rentals.map(r => r.w));
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [data]);

  if (loading || !data || !data.bars || !data.rentals) return <div className="section" style={{ textAlign: 'center' }}><h3>Analyzing market data...</h3></div>;

  const trendData = data.trend || [20, 40, 60, 80, 100];
  const maxVal = Math.max(...trendData);
  const chartHeight = 150;
  const chartWidth = 400;
  
  const points = trendData.map((v, i) => ({
    x: (i * chartWidth) / (trendData.length - 1),
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
    <div className="insights-sec reveal" id="insights-section">
      <div className="insights-inner">
        <div className="sec-header anim-slide-in-left">
          <div>
            <div className="eyebrow">Strategic Intelligence</div>
            <h2 className="sec-title">Market <span>Insights</span> for <span>{data.insightsTitle}</span></h2>
          </div>
          <Link className="view-all" to="/" onClick={() => setView('home')}>← BACK TO HOME</Link>
        </div>

        <div className="insights-grid">
          <div className="insight-box anim-fade-in-up delay-100">
            <div className="pcc-head">
              <div>
                <div className="pcc-title">Micromarket Benchmarking</div>
                <div className="pcc-sub">Average transacted prices across premium pockets (Per Sq.Ft)</div>
              </div>
              <div className="pcc-pill">LIVE INDEX</div>
            </div>
            <div className="bar-row">
              {data.bars.map((b, i) => (
                <div key={i} className="bar-item">
                  <div className="bar-loc">{b.loc}</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: barsWidth[i] || '0%', background: `linear-gradient(90deg, ${bgColors[i % bgColors.length]}, #fff2)`, transitionDuration: `${0.5 + i * 0.2}s` }}>
                      <span>{b.pct}</span>
                    </div>
                  </div>
                  <div className="bar-val" style={{ color: 'var(--ink)', fontSize: '11px' }}>{b.val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', padding: '12px', background: 'var(--cream2)', borderRadius: '8px', fontSize: '11px', color: 'var(--muted)' }}>
              <strong>Insight:</strong> Top-tier micromarkets are showing a sustained 12-15% premium over secondary hubs due to restricted new supply.
            </div>
          </div>

          <div className="insight-box anim-fade-in-up delay-200">
            <div className="pcc-head">
              <div>
                <div className="pcc-title">Demand & Supply Dynamics</div>
                <div className="pcc-sub">Rental yields vs capital appreciation potential across asset classes</div>
              </div>
              <div className="pcc-pill">RENTAL YIELD</div>
            </div>
            <div className="rental-list">
              {data.rentals.map((r, i) => (
                <div key={i} className="rental-row">
                  <div className="rental-top">
                    <span>{r.lbl} Portfolio</span>
                    <span className="yield">{r.yield} Yield</span>
                  </div>
                  <div className="rental-bar-bg">
                    <div className="rental-bar-fill" style={{ width: rentalsWidth[i] || '0%', transitionDuration: `${0.6 + i * 0.3}s` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '24px', display: 'flex', gap: '16px', borderTop: '1px solid var(--cream3)', paddingTop: '16px' }}>
              <div style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Avg Absorption</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)' }}>45 Days</span>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Vacancy Rate</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--green)' }}>{'< 3.2%'}</span>
              </div>
            </div>
          </div>

          <div className="insight-box anim-scale-up delay-300" style={{ gridColumn: 'span 2' }}>
            <div className="pcc-head">
              <div>
                <div className="pcc-title">5-Year Capital Appreciation Trend</div>
                <div className="pcc-sub">Historical growth trajectory and AI-driven forecast index</div>
              </div>
            </div>
            <div className="trend-container">
              <div className="trend-labels-y">
                <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
              </div>
              <svg className="trend-chart-svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trend-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} className="trend-grid-line" x1="0" y1={(chartHeight / 4) * i} x2={chartWidth} y2={(chartHeight / 4) * i} />
                ))}
                <path className="trend-area" d={areaD} />
                <path className="trend-line" d={pathD} />
                {points.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--gold)" className="anim-scale-up" style={{ animationDelay: `${1 + i * 0.1}s`, transformOrigin: `${p.x}px ${p.y}px` }} />
                ))}
              </svg>
              <div className="trend-labels-x">
                <span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span style={{ color: 'var(--gold)' }}>2026(P)</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '16px', fontSize: '11px', fontWeight: '600' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', background: 'var(--gold)', borderRadius: '50%' }}></div> Actual Growth</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', background: 'var(--cream3)', borderRadius: '50%' }}></div> Projected Growth</span>
            </div>
          </div>
        </div>

        <div className="inventory-grid anim-fade-in-up delay-400" style={{ marginTop: '48px', background: 'var(--ink)', padding: '40px', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'radial-gradient(circle at 100% 50%, rgba(189,168,113,0.1), transparent)', pointerEvents: 'none' }}></div>
          <div className="inv-stat">
            <div className="inv-num" style={{ color: 'var(--gold2)' }}>{data.inventory?.total || '4,280+'}</div>
            <div className="inv-lbl" style={{ color: 'rgba(255,255,255,0.5)' }}>Total Verified Listings</div>
          </div>
          <div className="inv-stat">
            <div className="inv-num" style={{ color: 'var(--gold2)' }}>{data.inventory?.new || '124'}</div>
            <div className="inv-lbl" style={{ color: 'rgba(255,255,255,0.5)' }}>New Estates Added (Last 7 Days)</div>
          </div>
          <div className="inv-stat">
            <div className="inv-num" style={{ color: 'var(--gold2)' }}>{data.inventory?.sold || '82%'}</div>
            <div className="inv-lbl" style={{ color: 'rgba(255,255,255,0.5)' }}>Inventory Absorption Rate</div>
          </div>
          <div className="inv-stat">
            <div className="inv-num" style={{ color: 'var(--gold2)' }}>{data.inventory?.roi || '12.4%'}</div>
            <div className="inv-lbl" style={{ color: 'rgba(255,255,255,0.5)' }}>Avg. Annual ROI (Regional)</div>
          </div>
        </div>

        <div className="trending-wrap anim-fade-in-up delay-500" style={{ marginTop: '40px', justifyContent: 'center' }}>
          <span className="tr-label" style={{ color: 'var(--muted)' }}>High-Velocity Investment Nodes:</span>
          {['Worli Sea Face', 'Golf Course Ext.', 'Bandra West', 'Koramangala 4th Block', 'Whitefield Estates', 'Marine Drive'].map((pocket, idx) => (
            <div key={idx} className="tr-chip anim-scale-up" style={{ animationDelay: `${0.5 + idx * 0.1}s`, background: 'var(--ink)', border: '1px solid var(--gold2)', color: 'var(--gold2)' }}>
              📍 {pocket}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
