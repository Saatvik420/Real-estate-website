import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const PopularCities = () => {
  const navigate = useNavigate();
  const { setSelectedCity, setView, setSearchFilters } = useApp();

  const allCities = [
    {
      id: "mumbai",
      name: "Mumbai",
      state: "Maharashtra",
      price: "₹28,200 / sqft",
      listings: "54,200+",
      rank: "#1 PREFERRED",
      badge: "Premium",
      badgeClass: "city-badge-hot",
      img: "https://images.pexels.com/photos/13975198/pexels-photo-13975198.jpeg"
    },
    {
      id: "bengaluru",
      name: "Bengaluru",
      state: "Karnataka",
      price: "₹12,400 / sqft",
      listings: "48,700+",
      rank: "#2 FASTEST GROWING",
      badge: "Tech Hub",
      badgeClass: "city-badge-rising",
      img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80"
    },
    {
      id: "delhi",
      name: "Delhi NCR",
      state: "Delhi / Haryana / UP",
      price: "₹16,800 / sqft",
      listings: "62,000+",
      rank: "#3 TOP VALUE",
      badge: "High ROI",
      badgeClass: "city-badge-hot",
      img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80"
    },
    {
      id: "hyderabad",
      name: "Hyderabad",
      state: "Telangana",
      price: "₹9,200 / sqft",
      listings: "31,400+",
      rank: "#4 EMERGING",
      img: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=600&q=80"
    },
    {
      id: "pune",
      name: "Pune",
      state: "Maharashtra",
      price: "₹9,100 / sqft",
      listings: "28,900+",
      rank: "#5 INDUSTRIAL",
      img: "https://images.pexels.com/photos/32534888/pexels-photo-32534888.jpeg"
    },
    {
      id: "chennai",
      name: "Chennai",
      state: "Tamil Nadu",
      price: "₹8,800 / sqft",
      listings: "22,100+",
      rank: "#6 COMMERCIAL",
      img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80"
    },
    {
      id: "patna",
      name: "Patna",
      state: "Bihar",
      price: "₹4,600 / sqft",
      listings: "8,400+",
      rank: "#7 HIGH POTENTIAL",
      badge: "Tier-2 Pick",
      badgeClass: "city-badge-rising",
      img: "https://images.pexels.com/photos/34205688/pexels-photo-34205688.jpeg"
    },
    {
      id: "kolkata",
      name: "Kolkata",
      state: "West Bengal",
      price: "₹6,400 / sqft",
      listings: "18,700+",
      rank: "#8 HERITAGE",
      img: "https://images.unsplash.com/photo-1558431382-27e303142255?w=600&q=80"
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
