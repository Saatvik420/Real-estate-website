import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const FloatingCompareBar = () => {
  const { comparisonList, setComparisonList, setView } = useApp();
  const navigate = useNavigate();

  if (comparisonList.length === 0) return null;

  return (
    <div className="floating-compare-bar">
      <div className="fcb-inner">
        <div className="fcb-left">
          <span className="fcb-count">{comparisonList.length}</span>
          <span className="fcb-text">Properties selected to compare</span>
        </div>
        <div className="fcb-right">
          <button className="fcb-clear" onClick={() => setComparisonList([])}>Clear All</button>
          <button className="fcb-apply" onClick={() => { setView('compare'); navigate('/compare'); }}>
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCompareBar;
