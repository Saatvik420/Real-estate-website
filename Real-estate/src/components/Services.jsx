import React from 'react';

const Services = () => {
  const services = [
    { icon: "🏛️", name: "Estate Planning", desc: "Strategic asset management for high-net-worth families." },
    { icon: "📜", name: "Legal Diligence", desc: "Expert verification of land titles and regulatory compliance." },
    { icon: "🏗️", name: "Land Dev", desc: "End-to-end consulting for large scale plot development." },
    { icon: "🎨", name: "Interior Design", desc: "Curation of living spaces by award-winning architects." },
    { icon: "📈", name: "Market Reports", desc: "Data-driven insights for real estate investment portfolios." },
    { icon: "🤝", name: "Private Concierge", desc: "Bespoke property search and acquisition services." }
  ];

  return (
    <div className="services-sec reveal">
      <div className="services-inner">
        <div className="serv-grid">
          {services.map((serv, index) => (
            <div key={index} className="serv-item">
              <span className="serv-icon">{serv.icon}</span>
              <div className="serv-name">{serv.name}</div>
              <div className="serv-desc">{serv.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
