import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const PopularCities = () => {
  const navigate = useNavigate();
  const { setSelectedCity, setView, setSearchFilters } = useApp();

  const allCities = [
    {
      id: "jaipur",
      name: "Jaipur",
      state: "Rajasthan",
      price: "₹6,500 / sqft",
      listings: "Project Hub",
      rank: "#1 PREFERRED",
      badge: "Pink City",
      badgeClass: "city-badge-hot",
      img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80"
    },
    {
      id: "vrindavan",
      name: "Vrindavan",
      state: "Uttar Pradesh",
      price: "₹4,200 / sqft",
      listings: "Spiritual Hub",
      rank: "#2 SPIRITUAL",
      badge: "Holy City",
      badgeClass: "city-badge-rising",
      img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80"
    },
    {
      id: "khatu_shyam",
      name: "Khatu Shyam",
      state: "Rajasthan",
      price: "₹3,500 / sqft",
      listings: "Rising Demand",
      rank: "#3 SPIRITUAL",
      badge: "Temple Town",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
    },
    {
      id: "dudu",
      name: "Dudu",
      state: "Rajasthan",
      price: "₹2,100 / sqft",
      listings: "Expressway Hub",
      rank: "#4 INDUSTRIAL",
      badge: "High Growth",
      img: "https://images.unsplash.com/photo-1464938532347-1e50a8c29f63?w=600&q=80"
    }
  ];

  const handleCityClick = (cityId) => {
    setSelectedCity(cityId);
    setSearchFilters({ listingType: 'Buy', type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status' });
    setView('results');
    navigate('/results');
  };

  return (
    <div className="cities-sec reveal">
      <div className="cities-inner">
        <div className="eyebrow">National Network</div>
        <h2 className="sec-title" style={{ marginBottom: '6px' }}>Most Popular <span>Investment Hubs</span></h2>
        <p className="sec-sub" style={{ marginBottom: '48px' }}>Explore high-growth metropolitan markets across India — powered by One5 Realty solutions</p>
        
        <div className="cities-grid">
          {allCities.map((city, index) => (
            <div key={index} className="city-card" onClick={() => handleCityClick(city.id)}>
              <div className="city-bg" style={{ backgroundImage: `url('${city.img}')` }}></div>
              {city.badge && <span className={`city-badge ${city.badgeClass}`}>{city.badge}</span>}
              <div className="city-overlay">
                <div className="city-rank">{city.rank}</div>
                <div className="city-name">{city.name}</div>
                <div className="city-state">{city.state}</div>
                <div className="city-meta">
                  <div className="cm-item"><span>Avg. Price</span><span className="cm-val">{city.price}</span></div>
                  <div className="cm-item"><span>Listings</span><span className="cm-val">{city.listings}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '60px', textAlign: 'center', background: 'var(--ink)', padding: '60px', borderRadius: '16px', border: '1px solid var(--gold2)' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: '#fff', marginBottom: '16px' }}>Can't find the perfect location?</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '18px' }}>Our senior investment consultants are ready to assist you with a bespoke portfolio.</p>
          <button className="nav-btn-solid" onClick={() => navigate('/contact')} style={{ padding: '16px 48px', fontSize: '14px', borderRadius: '8px', fontWeight: '800' }}>
            CONNECT WITH AN ADVISOR
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularCities;
