import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { apiService } from '../services/apiService';

const CompareProperties = () => {
  const { comparisonList, setComparisonList, setView } = useApp();
  const [compareData, setCompareData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompareData = async () => {
      const results = await Promise.all(
        comparisonList.map(id => apiService.getPropertyById(id))
      );
      // Filter out only successful responses and extract data
      const actualData = results
        .filter(res => res.success && res.data)
        .map(res => res.data);
        
      setCompareData(actualData);
    };
    if (comparisonList.length > 0) {
      fetchCompareData();
    } else {
      setCompareData([]);
    }
  }, [comparisonList]);

  const removeFromCompare = (id) => {
    setComparisonList(prev => prev.filter(item => item !== id));
  };

  const handleAddMore = () => {
    setView('results');
    navigate('/results');
  };

  if (comparisonList.length === 0) {
    return (
      <div className="compare-sec" id="compare" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="compare-inner" style={{ textAlign: 'center', width: '100%' }}>
          <h2 className="sec-title" style={{ color: '#fff' }}>No Properties <span>Selected</span></h2>
          <p className="sec-sub" style={{ color: 'rgba(255,255,255,.5)' }}>Select up to 3 properties from our results page to compare them side-by-side.</p>
          <button className="nav-btn-solid" onClick={handleAddMore} style={{ marginTop: '20px' }}>Explore Properties</button>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-sec" id="compare" style={{ minHeight: '80vh' }}>
      <div className="compare-inner">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="eyebrow" style={{ textAlign: 'center' }}>Precision Analysis</div>
          <h2 className="sec-title" style={{ color: '#fff', textAlign: 'center' }}>Compare <span>Properties</span></h2>
        </div>

        <div className="compare-wrapper" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table className="compare-table" style={{ minWidth: '600px' }}>
            <thead>
              <tr>
                <th>Features</th>
                {compareData.map(prop => (
                  <th key={prop.id}>
                    <button className="ct-remove" onClick={() => removeFromCompare(prop.id)}>✕</button>
                    <img src={prop.img} className="ct-prop-img" alt={prop.title} />
                    <div className="ct-prop-name">{prop.title}</div>
                    <div className="ct-prop-loc">{prop.location}</div>
                  </th>
                ))}
                {compareData.length < 3 && (
                   <th className="ct-placeholder" onClick={handleAddMore} style={{ cursor: 'pointer' }}>
                     <div className="ct-add-more">+ Add More</div>
                   </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ct-feat">Type</td>
                {compareData.map(prop => <td key={prop.id} className="ct-val">{prop.type}</td>)}
                {compareData.length < 3 && <td className="ct-val" onClick={handleAddMore} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.1)' }}>Select Property</td>}
              </tr>
              <tr>
                <td className="ct-feat">Price</td>
                {compareData.map(prop => <td key={prop.id} className="ct-val highlight" style={{ color: 'var(--gold2)' }}>{prop.priceStr}</td>)}
                {compareData.length < 3 && <td className="ct-val" onClick={handleAddMore} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.1)' }}>—</td>}
              </tr>
              <tr>
                <td className="ct-feat">Area</td>
                {compareData.map(prop => <td key={prop.id} className="ct-val">{prop.area}</td>)}
                {compareData.length < 3 && <td className="ct-val" onClick={handleAddMore} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.1)' }}>—</td>}
              </tr>
              <tr>
                <td className="ct-feat">Developer</td>
                {compareData.map(prop => <td key={prop.id} className="ct-val">{prop.developer}</td>)}
                {compareData.length < 3 && <td className="ct-val" onClick={handleAddMore} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.1)' }}>—</td>}
              </tr>
              <tr>
                <td className="ct-feat">Status</td>
                {compareData.map(prop => <td key={prop.id} className="ct-val">{prop.status}</td>)}
                {compareData.length < 3 && <td className="ct-val" onClick={handleAddMore} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.1)' }}>—</td>}
              </tr>
              <tr>
                <td className="ct-feat">Configuration</td>
                {compareData.map(prop => (
                  <td key={prop.id} className="ct-val">
                    {prop.tags.find(t => t.includes('BHK')) || 'N/A'}
                  </td>
                ))}
                {compareData.length < 3 && <td className="ct-val" onClick={handleAddMore} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.1)' }}>—</td>}
              </tr>
              <tr>
                <td className="ct-feat">RERA ID</td>
                {compareData.map(prop => <td key={prop.id} className="ct-val" style={{ fontSize: '11px' }}>{prop.rera}</td>)}
                {compareData.length < 3 && <td className="ct-val" onClick={handleAddMore} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.1)' }}>—</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareProperties;
