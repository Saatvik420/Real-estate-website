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
      price: "₹8,500 / sqft",
      listings: "12,400+",
      rank: "#1 PREFERRED",
      badge: "Cultural Capital",
      badgeClass: "city-badge-hot",
      img: "https://images.pexels.com/photos/28426012/pexels-photo-28426012.jpeg"
    },
    {
      id: "noida",
      name: "Noida",
      state: "Uttar Pradesh",
      price: "₹12,400 / sqft",
      listings: "28,700+",
      rank: "#2 FASTEST GROWING",
      badge: "Tech Hub",
      badgeClass: "city-badge-rising",
      img: "https://images.pexels.com/photos/25466317/pexels-photo-25466317.jpeg"
    },
    {
      id: "dehradun",
      name: "Dehradun",
      state: "Uttarakhand",
      price: "₹7,800 / sqft",
      listings: "8,200+",
      rank: "#3 TOP VALUE",
      badge: "Scenic Living",
      badgeClass: "city-badge-hot",
      img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&q=80"
    },
    {
      id: "neemrana",
      name: "Neemrana",
      state: "Rajasthan",
      price: "₹4,200 / sqft",
      listings: "3,400+",
      rank: "#4 EMERGING",
      badge: "Industrial Hub",
      img: "https://images.pexels.com/photos/33797765/pexels-photo-33797765.jpeg"
    },
    {
      id: "vrindavan",
      name: "Vrindavan",
      state: "Uttar Pradesh",
      price: "₹6,100 / sqft",
      listings: "5,900+",
      rank: "#5 SPIRITUAL",
      img: "https://images.pexels.com/photos/29651458/pexels-photo-29651458.jpeg"
    },
    {
      id: "haridwar",
      name: "Haridwar",
      state: "Uttarakhand",
      price: "₹5,800 / sqft",
      listings: "4,100+",
      rank: "#6 HERITAGE",
      img: "https://images.pexels.com/photos/27418789/pexels-photo-27418789.jpeg"
    },
    {
      id: "ayodhya",
      name: "Ayodhya",
      state: "Uttar Pradesh",
      price: "₹9,600 / sqft",
      listings: "2,400+",
      rank: "#7 HIGH POTENTIAL",
      badge: "Rising Star",
      badgeClass: "city-badge-rising",
      img: "https://images.pexels.com/photos/12058309/pexels-photo-12058309.jpeg"
    },
    {
      id: "ajmer_road",
      name: "Ajmer Road",
      state: "Rajasthan",
      price: "₹6,400 / sqft",
      listings: "1,700+",
      rank: "#8 CONNECTIVITY",
      img: "https://images.pexels.com/photos/9390151/pexels-photo-9390151.jpeg"
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
