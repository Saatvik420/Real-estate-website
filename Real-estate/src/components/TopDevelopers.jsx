import React, { useEffect, useState } from 'react';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const TopDevelopers = () => {
  const { selectedCity, selectedState, states } = useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const locationId = selectedCity !== 'India' ? selectedCity : selectedState;
      const locationType = selectedCity !== 'India' ? 'city' : (selectedState ? 'state' : 'city');
      
      const res = await apiService.getMarketInsights(locationId, locationType);
      if (res.success) {
          setData(res.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedCity, selectedState]);

  if (loading || !data) return null;

  const stateName = states.find(s => s.id === selectedState)?.name || 'India';
  const cityName = selectedCity === 'India' ? stateName : data.insightsTitle;

  return (
    <div className="dev-sec reveal">
      <div className="dev-inner">
        <div className="sec-header">
          <div>
            <div className="eyebrow">Verified Builders</div>
            <h2 className="sec-title">Top <span>Developers</span> in <span>{cityName}</span></h2>
            <p className="sec-sub" style={{ marginBottom: 0 }}>Trusted Grade-A construction companies with premium portfolios</p>
          </div>
          <a className="view-all" href="#">All Developers →</a>
        </div>
        
        <div className="dev-grid">
          {data.devs && data.devs.slice(0, 4).map((dev, index) => (
            <div key={index} className="dev-card">
              <div className="dev-top">
                <div className="dev-logo">{dev.logo}</div>
                <div>
                  <div className="dev-name">{dev.name}</div>
                  <div className="dev-type">{dev.type}</div>
                  <div className="dev-stars">★★★★★</div>
                </div>
              </div>
              <div className="dev-stats">
                <div className="ds-item"><div className="ds-num">{dev.num}</div><div className="ds-lbl">Projects</div></div>
                <div className="ds-item"><div className="ds-num">{dev.exp}</div><div className="ds-lbl">Yrs Active</div></div>
                <div className="ds-item"><div className="ds-num">{dev.sold}</div><div className="ds-lbl">Units Sold</div></div>
              </div>
              <div className="dev-projects">
                {dev.proj.map((p, i) => <span key={i} className="dev-proj-tag">{p}</span>)}
              </div>
              <div className="dev-rera">BR/RERA/{dev.rera}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDevelopers;
