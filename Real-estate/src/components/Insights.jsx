import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

// Asset Imports
import sss1Img from '../assets/images_project/Shree shyam sarovar.jpeg';
import sss2Img from '../assets/images_project/Shree Shyam Sarovar II.jpeg';
import hvImg from '../assets/images_project/Hanumant_vihar.jpg';
import anVid from '../assets/images_project/Aadinath nagar 1.mp4';
import mvVid from '../assets/images_project/Mayur Vihar.mp4';
import heroVid from '../assets/14308843_3840_2160_30fps.mp4';

const Insights = () => {
  const { setView } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const GrowthChart = ({ title, data, color = "var(--ink)", max = 400 }) => {
    return (
      <div className="growth-chart-box reveal">
        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '25px', color: 'var(--ink)', fontFamily: "'Playfair Display', serif" }}>{title}</h4>
        <div className="growth-index-grid">
          {data.map((item, i) => {
            const pct = (parseInt(item.val) / max) * 100 + '%';
            return (
              <div key={i} className="growth-bar-wrap">
                <span className="growth-label">{item.label}</span>
                <div className="growth-track">
                  <div className="growth-fill" style={{ width: isVisible ? pct : '0%', background: color }}></div>
                  <span className="growth-val">{item.val}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="insights-report" ref={sectionRef} style={{ background: 'var(--bg-main)', color: 'var(--ink)', padding: '0', minHeight: '100vh', position: 'relative' }}>
      <style>{`
        .insights-report {
          --gold: #c5a059;
          --gold2: #d4af37;
          --ink: #1a1a1a;
          --muted: #666;
          --cream: #f9f6f0;
          --cream2: #f2ede4;
          --cream3: #e8e0d5;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        .luxury-card {
           background: #fff;
           border-radius: 24px;
           padding: 50px;
           box-shadow: 0 20px 60px rgba(0,0,0,0.03);
           border: 1px solid var(--cream3);
           margin-bottom: 60px;
           transition: all 0.4s ease;
           position: relative;
           overflow: hidden;
        }
        .luxury-card:hover {
          box-shadow: 0 30px 80px rgba(0,0,0,0.06);
          transform: translateY(-5px);
        }
        .stat-badge {
           display: inline-block;
           padding: 8px 20px;
           background: var(--gold);
           color: #fff;
           border-radius: 50px;
           font-size: 0.8rem;
           font-weight: 800;
           letter-spacing: 2px;
           margin-bottom: 25px;
           text-transform: uppercase;
        }
        .insight-table {
           width: 100%;
           border-collapse: collapse;
           margin: 40px 0;
           font-size: 0.95rem;
           border-radius: 16px;
           overflow: hidden;
           box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }
        .insight-table th {
           background: var(--ink);
           color: #fff;
           text-align: left;
           padding: 20px;
           font-family: 'Playfair Display', serif;
           font-weight: 700;
           letter-spacing: 0.5px;
        }
        .insight-table td {
           padding: 20px;
           border-bottom: 1px solid var(--cream2);
           color: #444;
           background: #fff;
        }
        .insight-table tr:last-child td {
          border-bottom: none;
        }
        .growth-index-grid {
           display: flex;
           flex-direction: column;
           gap: 15px;
        }
        .growth-bar-wrap {
           display: flex;
           align-items: center;
           gap: 20px;
        }
        .growth-label {
           width: 70px;
           font-weight: 800;
           font-size: 0.9rem;
           color: var(--ink);
        }
        .growth-track {
           flex: 1;
           height: 30px;
           background: var(--cream2);
           border-radius: 6px;
           overflow: hidden;
           position: relative;
        }
        .growth-fill {
           height: 100%;
           transition: width 2.5s cubic-bezier(0.16, 1, 0.3, 1);
           position: relative;
        }
        .growth-fill::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }
        .growth-val {
           position: absolute;
           right: 12px;
           top: 50%;
           transform: translateY(-50%);
           font-size: 0.8rem;
           font-weight: 900;
           color: #fff;
           text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .hero-section {
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: var(--ink);
          color: #fff;
          position: relative;
          padding: 20px;
          overflow: hidden;
        }
        .hero-video {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.4;
          z-index: 0;
        }
        .content-container {
          max-width: 1200px;
          margin: -100px auto 0;
          padding: 0 20px 100px;
          position: relative;
          z-index: 2;
        }
        .info-section {
          margin-bottom: 100px;
        }
        .info-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem;
          font-weight: 900;
          margin-bottom: 30px;
          line-height: 1.2;
        }
        .info-section p {
          font-size: 1.15rem;
          line-height: 1.9;
          color: #444;
          margin-bottom: 25px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
        }
        .bullet-list {
          list-style: none;
          padding: 0;
        }
        .bullet-list li {
          padding: 15px 0 15px 40px;
          position: relative;
          font-size: 1.05rem;
          font-weight: 600;
          border-bottom: 1px solid var(--cream2);
        }
        .bullet-list li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: var(--gold);
          font-size: 1.2rem;
        }
        .quote-box {
          background: var(--cream);
          padding: 40px;
          border-radius: 20px;
          border-left: 10px solid var(--gold);
          margin: 40px 0;
        }
        .state-card {
          border-left: 5px solid var(--gold);
          padding-left: 30px;
          margin-bottom: 50px;
        }
        .state-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          margin-bottom: 20px;
        }
        .sub-city {
          background: var(--cream2);
          padding: 25px;
          border-radius: 12px;
          margin-top: 20px;
          position: relative;
          overflow: hidden;
        }
        .sub-city h4 {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          margin-bottom: 10px;
          color: var(--ink);
        }
        .asset-container {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          margin: 20px 0;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        .asset-container video, .asset-container img {
          width: 100%;
          display: block;
          transition: transform 0.5s ease;
        }
        .asset-container:hover img, .asset-container:hover video {
          transform: scale(1.03);
        }
      `}</style>

      {/* Hero Header */}
      <section className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={heroVid} type="video/mp4" />
        </video>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <div className="stat-badge" style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)' }}>Market Intelligence Report 2026</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1', fontWeight: 900, marginBottom: '30px' }}>
            India’s Real Estate Market: A Powerful Wealth Creation Opportunity
          </h1>
          <Link to="/" onClick={() => setView('home')} style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, letterSpacing: '2px', fontSize: '0.9rem' }}>
            ← BACK TO HOME
          </Link>
        </div>
      </section>

      <div className="content-container">
        
        {/* Market Overview */}
        <section className={`luxury-card reveal ${isVisible ? 'active' : ''}`}>
          <div className="info-section">
            <p>The Indian real estate sector has emerged as one of the fastest-growing sectors of the economy, driven by rapid urbanization, infrastructure expansion, industrial growth, rising incomes, and increasing investor confidence. Today, real estate is not only considered a lifestyle asset but also one of the most reliable long-term wealth creation tools for investors across the globe.</p>
            <div className="asset-container">
               <img src={sss1Img} alt="Real Estate Growth" />
            </div>
            <div className="quote-box">
              <p style={{ margin: 0, fontStyle: 'italic', fontWeight: 600 }}>According to industry reports, the Indian real estate market was valued between USD 530–600 billion in 2025 and is projected to cross USD 1 trillion by 2033–2034, growing at a strong CAGR of 8–10%. The sector is expected to contribute nearly 15.5% to India’s GDP by 2047, highlighting its massive long-term growth potential.</p>
            </div>
          </div>
        </section>

        {/* Why Plots and Land */}
        <section className={`luxury-card reveal ${isVisible ? 'active' : ''}`}>
          <h2>Why Plots and Land Investments Are Growing Rapidly</h2>
          <div className="grid-2">
            <div>
              <p>Among all real estate asset classes, plots and land investments are witnessing exceptional demand because of:</p>
              <ul className="bullet-list">
                <li>Limited land availability</li>
                <li>Higher appreciation potential compared to built-up properties</li>
                <li>Lower maintenance costs</li>
                <li>Greater flexibility for future residential or commercial development</li>
                <li>Rising infrastructure-led growth in Tier-2 and Tier-3 cities</li>
                <li>Growing investor preference for tangible and safer long-term assets</li>
              </ul>
            </div>
            <div style={{ background: 'var(--ink)', color: '#fff', padding: '40px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>Land has historically delivered strong returns in areas where infrastructure, highways, airports, industrial corridors, tourism, and urban expansion are taking place. As India develops new economic zones, expressways, smart cities, and industrial hubs, plotted developments are becoming one of the most attractive investment categories.</p>
              <p style={{ color: 'var(--gold2)', fontWeight: 800, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '20px' }}>Recent land transactions across India have also touched record levels, reflecting strong investor confidence in the sector.</p>
            </div>
          </div>
          <div className="asset-container" style={{ marginTop: '40px' }}>
             <img src={sss2Img} alt="Strategic Land Investment" />
          </div>
        </section>

        {/* Rajasthan Deep Dive */}
        <section className={`luxury-card reveal ${isVisible ? 'active' : ''}`}>
          <h2>Rajasthan: Emerging Hub for Strategic Land Investments</h2>
          <p>Rajasthan has become one of India’s most promising states for land and plot investments due to large-scale infrastructure development, industrial growth, tourism expansion, and increasing connectivity.</p>
          
          <div className="state-card">
            <h3>Key Investment Cities in Rajasthan</h3>
            <div className="grid-2">
              <div className="sub-city">
                <h4>Jaipur</h4>
                <p style={{fontSize: '0.95rem'}}>Jaipur continues to dominate Rajasthan’s plotted development market because of: Ring road expansion, Metro connectivity, Smart City projects, IT and education hubs, and a growing tourism and hospitality sector.</p>
                <div className="asset-container" style={{ margin: '15px 0' }}>
                   <video autoPlay loop muted playsInline style={{ height: '200px', objectFit: 'cover' }}>
                      <source src={mvVid} type="video/mp4" />
                   </video>
                </div>
                <p style={{fontSize: '0.9rem'}}>Areas such as Jagatpura, Ajmer Road, Tonk Road, and Ring Road corridors are witnessing significant appreciation in land values.</p>
              </div>
              <div className="sub-city">
                <h4>Neemrana</h4>
                <p style={{fontSize: '0.95rem'}}>Neemrana has emerged as a major industrial and investment hotspot because of: Delhi-Mumbai Industrial Corridor (DMIC), Japanese industrial zone, Manufacturing and logistics growth, and excellent Delhi-NCR connectivity.</p>
                <div className="asset-container" style={{ margin: '15px 0' }}>
                   <video autoPlay loop muted playsInline style={{ height: '200px', objectFit: 'cover' }}>
                      <source src={anVid} type="video/mp4" />
                   </video>
                </div>
              </div>
            </div>
          </div>

          <div className="state-card">
            <h3>Khatu Shyam Ji – A Rapidly Emerging Spiritual & Real Estate Hub</h3>
            <p>Khatu Shyam Ji Temple and the surrounding Khatu–Ringas belt have rapidly emerged as one of Rajasthan’s most promising land and plotted development destinations. Traditionally known as one of India’s largest spiritual tourism centers, the region is now witnessing strong real estate momentum driven by increasing tourist footfall, infrastructure upgrades, hospitality demand, and township developments.</p>
            <div className="asset-container">
               <img src={sss1Img} alt="Khatu Shyam Ji Hub" />
            </div>
            <p>Millions of devotees visit Khatu Shyam Ji every year, creating continuous demand for Hotels and hospitality projects, Commercial spaces, Residential townships, Farmhouses and second homes, and Retail and rental infrastructure.</p>
            <p>The Rajasthan government is also actively working on the development of the Khatu Shyam Corridor under the Swadesh Darshan 2.0 scheme, aimed at improving tourism infrastructure, traffic management, parking, and world-class pilgrim facilities. This large-scale development is expected to further accelerate economic and real estate activity in the region.</p>
            <p>Several developers and plotted township projects are already entering the region, reflecting growing investor confidence in the market.</p>
            <h5 style={{ fontWeight: 800, marginTop: '20px', color: 'var(--gold)' }}>Investors are particularly attracted because:</h5>
            <ul className="bullet-list">
              <li>Land prices are still comparatively affordable</li>
              <li>Religious tourism ensures year-round activity</li>
              <li>Infrastructure development is increasing rapidly</li>
              <li>Long-term appreciation potential is strong</li>
              <li>Demand for hospitality and rental properties is rising</li>
            </ul>
            <p style={{ marginTop: '20px', padding: '20px', background: 'var(--cream2)', borderRadius: '10px' }}>The Khatu–Palsana–Ringas corridor is increasingly being viewed as a long-term wealth creation zone for investors seeking early-stage growth opportunities. Community discussions and investor sentiment also indicate rising interest in plotted developments around the region.</p>
          </div>

          <div className="state-card">
            <h3>Delhi–Jaipur Highway (NH-8 / NH-48) – Rajasthan’s Growth Corridor</h3>
            <p>Delhi–Jaipur Highway, now part of NH-48, has become one of North India’s most strategic real estate and industrial growth corridors. Stretching across key regions connecting Delhi-NCR and Rajasthan, the highway has transformed into a major hub for: Industrial development, Warehousing and logistics, Commercial projects, Residential townships, Hospitality and tourism investments, and large-scale plotted developments.</p>
            
            <div className="quote-box">
              <h5 style={{ fontWeight: 800, marginBottom: '15px' }}>Why NH-8 / NH-48 Corridor Is a Strong Investment Destination</h5>
              <ul className="bullet-list" style={{ columns: 2 }}>
                <li>Excellent connectivity with Delhi-NCR and Jaipur</li>
                <li>Industrial and commercial expansion</li>
                <li>Increasing demand for plotted townships</li>
                <li>Strong warehousing and logistics growth</li>
                <li>Rising demand for hospitality projects</li>
                <li>Future infrastructure-led appreciation</li>
                <li>High investor confidence from domestic and NRI buyers</li>
              </ul>
            </div>
            <p>Neemrana, in particular, has become one of the strongest industrial and land investment destinations in North India because of multinational manufacturing investments and the growing industrial ecosystem. Strong investor interest in industrial and commercial plots in Rajasthan is visible through increasing applications for industrial land allotments.</p>
          </div>

          <div className="state-card">
             <h3>Major Growth Drivers & Hotspots (Rajasthan)</h3>
             <div className="grid-2">
                <div>
                   <h5 style={{ fontWeight: 800 }}>Major Growth Drivers</h5>
                   <ul className="bullet-list">
                      <li>Delhi–Mumbai Industrial Corridor (DMIC)</li>
                      <li>Jaipur Smart City expansion</li>
                      <li>NH-8 / NH-48 development corridor</li>
                      <li>Khatu Shyam Ji spiritual tourism growth</li>
                      <li>Industrial and warehousing demand</li>
                      <li>Rising plotted township developments</li>
                   </ul>
                </div>
                <div>
                   <h5 style={{ fontWeight: 800 }}>Key Investment Hotspots</h5>
                   <ul className="bullet-list">
                      <li>Jaipur</li>
                      <li>Neemrana</li>
                      <li>Khatu Shyam Ji</li>
                      <li>Ringas</li>
                      <li>Ajmer Road Corridor</li>
                      <li>Udaipur</li>
                      <li>Jodhpur</li>
                   </ul>
                </div>
             </div>
             <p style={{ marginTop: '20px', fontStyle: 'italic' }}>The Rajasthan government’s increasing focus on tourism, industrialization, and infrastructure is expected to continue driving long-term land appreciation.</p>
          </div>
        </section>

        {/* Uttar Pradesh Deep Dive */}
        <section className={`luxury-card reveal ${isVisible ? 'active' : ''}`}>
          <h2>Uttar Pradesh: One of India’s Fastest Growing Real Estate Markets</h2>
          <p>Uttar Pradesh has transformed into a high-growth real estate destination driven by expressways, airports, industrial corridors, religious tourism, and large-scale government investments.</p>
          <div className="asset-container">
             <img src={hvImg} alt="UP Growth Corridor" />
          </div>
          <div className="quote-box" style={{ background: 'var(--ink)', color: '#fff', borderLeftColor: '#00ffcc' }}>
             <p style={{ margin: 0, fontWeight: 700 }}>UP’s real estate investments surged over 50% recently, reflecting unprecedented market momentum.</p>
          </div>

          <div className="state-card">
            <h3>Key Investment Cities in Uttar Pradesh</h3>
            <div className="grid-2">
              <div className="sub-city">
                <h4>Noida and Greater Noida</h4>
                <p>Noida remains one of India’s strongest land investment destinations because of: Upcoming Noida International Airport (Jewar Airport), Metro expansion, IT and commercial growth, Expressway connectivity, and strong demand for residential and commercial plots. The airport-led growth is significantly increasing land values in the Yamuna Expressway and Jewar region.</p>
              </div>
              <div className="sub-city">
                <h4>Ayodhya</h4>
                <p>Ayodhya is witnessing extraordinary real estate growth after the Ram Mandir development, new airport, tourism infrastructure, and highway expansion. Property prices in prime locations have multiplied rapidly in recent years.</p>
              </div>
            </div>
          </div>

          <div className="state-card">
             <h3>Major Growth Drivers & Hotspots (Uttar Pradesh)</h3>
             <div className="grid-2">
                <div>
                   <h5 style={{ fontWeight: 800 }}>Major Growth Drivers</h5>
                   <ul className="bullet-list">
                      <li>Noida International Airport (Jewar)</li>
                      <li>Yamuna Expressway Industrial Development</li>
                      <li>Ganga Expressway</li>
                      <li>Religious tourism in Ayodhya & Varanasi</li>
                      <li>Smart city and metro expansion</li>
                      <li>Industrial and logistics growth</li>
                   </ul>
                </div>
                <div>
                   <h5 style={{ fontWeight: 800 }}>Key Investment Hotspots</h5>
                   <ul className="bullet-list">
                      <li>Noida</li>
                      <li>Greater Noida</li>
                      <li>Jewar</li>
                      <li>Ayodhya</li>
                      <li>Lucknow</li>
                      <li>Varanasi</li>
                      <li>Prayagraj</li>
                   </ul>
                </div>
             </div>
             <p style={{ marginTop: '20px', fontStyle: 'italic' }}>UP has seen record property registrations and rapid appreciation in land values around expressways and airport corridors.</p>
          </div>
        </section>

        {/* Uttarakhand Deep Dive */}
        <section className={`luxury-card reveal ${isVisible ? 'active' : ''}`}>
          <h2>Uttarakhand: Lifestyle and Long-Term Appreciation Market</h2>
          <p>Uttarakhand is increasingly becoming a preferred destination for lifestyle investments, retirement homes, eco-tourism projects, and premium land investments.</p>
          <div className="asset-container">
             <img src={sss2Img} alt="Uttarakhand Premium Land" />
          </div>
          <div className="state-card">
            <h3>Key Investment Cities in Uttarakhand</h3>
            <div className="grid-2">
              <div className="sub-city">
                <h4>Dehradun</h4>
                <p>Dehradun is among the fastest-growing Tier-2 investment destinations due to: Excellent connectivity with Delhi-NCR, Educational institutions and healthcare infrastructure, Rising demand for villas and plotted developments, and limited land supply because of geographical constraints. Experts and local investors expect strong long-term appreciation in well-connected land parcels.</p>
              </div>
              <div className="sub-city">
                <h4>Rishikesh</h4>
                <p>Rishikesh is attracting wellness tourism, hospitality investments, spiritual tourism, and luxury second-home buyers.</p>
              </div>
            </div>
          </div>

          <div className="state-card">
             <h3>Major Growth Drivers & Hotspots (Uttarakhand)</h3>
             <div className="grid-2">
                <div>
                   <h5 style={{ fontWeight: 800 }}>Major Growth Drivers</h5>
                   <ul className="bullet-list">
                      <li>Growing demand for second homes</li>
                      <li>Tourism and hospitality expansion</li>
                      <li>Wellness and spiritual tourism</li>
                      <li>Better road and rail connectivity</li>
                      <li>Rising villa and plotted development projects</li>
                   </ul>
                </div>
                <div>
                   <h5 style={{ fontWeight: 800 }}>Key Investment Hotspots</h5>
                   <ul className="bullet-list">
                      <li>Dehradun</li>
                      <li>Rishikesh</li>
                      <li>Haridwar</li>
                      <li>Haldwani</li>
                      <li>Nainital outskirts</li>
                   </ul>
                </div>
             </div>
             <p style={{ marginTop: '20px', fontStyle: 'italic' }}>Limited land availability in premium hill and gateway cities is expected to support long-term appreciation.</p>
          </div>
        </section>

        {/* Safety & NRIs */}
        <div className="grid-2">
           <section className={`luxury-card reveal ${isVisible ? 'active' : ''}`}>
              <h2>How Safe Are Land and Plot Investments in India?</h2>
              <p>Land and plotted developments can be extremely rewarding investments when backed by proper research and due diligence.</p>
              <h5 style={{ fontWeight: 800, color: 'var(--gold)' }}>Key Factors That Make Investments Safer</h5>
              <ul className="bullet-list">
                <li>RERA-approved projects</li>
                <li>Verified land titles</li>
                <li>Government-approved layouts</li>
                <li>Reputed developers</li>
                <li>Infrastructure-backed growth corridors</li>
                <li>Clear legal documentation</li>
                <li>Proper zoning and land-use approvals</li>
              </ul>
              <h5 style={{ fontWeight: 800, marginTop: '30px' }}>Investors should always evaluate:</h5>
              <ul className="bullet-list">
                <li>Ownership history</li>
                <li>Encumbrance status</li>
                <li>Future development plans</li>
                <li>Connectivity and infrastructure pipeline</li>
                <li>Market demand and liquidity</li>
              </ul>
              <p style={{ marginTop: '20px', fontStyle: 'italic' }}>Professional advisory and research-driven investment selection significantly reduce risks and improve long-term returns.</p>
           </section>

           <section className={`luxury-card reveal ${isVisible ? 'active' : ''}`}>
              <h2>Why NRIs Should Invest in Indian Real Estate</h2>
              <p>India has become one of the most attractive global investment destinations for NRIs because of its: Fast-growing economy, stable long-term growth outlook, strong infrastructure development, currency advantage, rising property appreciation, expanding urbanization, and transparent regulations through RERA.</p>
              <h5 style={{ fontWeight: 800, color: 'var(--gold)' }}>Why Land Investments Are Attractive for NRIs</h5>
              <ul className="bullet-list">
                <li>Lower maintenance compared to apartments</li>
                <li>Strong long-term appreciation potential</li>
                <li>Easy inheritance and wealth transfer</li>
                <li>Opportunity to diversify global portfolios</li>
                <li>Increasing demand in emerging cities</li>
                <li>Future retirement or second-home planning</li>
              </ul>
              <p style={{ marginTop: '20px' }}>Many NRIs are now actively investing in plotted developments near airports, expressways, tourism hubs, industrial corridors, and spiritual destinations where long-term growth visibility remains very strong. India’s rapidly evolving infrastructure ecosystem — including expressways, industrial corridors, airports, logistics parks, smart cities, and tourism projects — is expected to continue driving land appreciation across multiple states for the next decade. This makes Indian land and plot investments one of the most compelling long-term wealth creation opportunities for both domestic and global investors.</p>
           </section>
        </div>

        {/* Data & Trends */}
        <section className={`luxury-card reveal ${isVisible ? 'active' : ''}`}>
          <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>Market Growth Trends & Projections</h2>
          
          <div className="grid-2">
            <GrowthChart 
              title="Rajasthan Real Estate Market Growth Index (2019=100)"
              color="var(--gold)"
              data={[
                { label: "2020", val: "110" },
                { label: "2021", val: "125" },
                { label: "2022", val: "145" },
                { label: "2023", val: "170" },
                { label: "2024", val: "195" },
                { label: "2025", val: "225" },
                { label: "2030*", val: "320" }
              ]}
            />
            <GrowthChart 
              title="Uttar Pradesh Real Estate Market Growth Index (2019=100)"
              color="#1a1a1a"
              data={[
                { label: "2020", val: "112" },
                { label: "2021", val: "130" },
                { label: "2022", val: "155" },
                { label: "2023", val: "185" },
                { label: "2024", val: "230" },
                { label: "2025", val: "275" },
                { label: "2030*", val: "400" }
              ]}
            />
          </div>

          <div style={{ marginTop: '40px' }}>
            <GrowthChart 
              title="Uttarakhand Real Estate Market Growth Index (2019=100)"
              color="#666"
              data={[
                { label: "2020", val: "108" },
                { label: "2021", val: "120" },
                { label: "2022", val: "138" },
                { label: "2023", val: "160" },
                { label: "2024", val: "185" },
                { label: "2025", val: "210" },
                { label: "2030*", val: "300" }
              ]}
            />
          </div>

          <div style={{ marginTop: '80px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', textAlign: 'center', marginBottom: '30px' }}>Comparative Future Growth Potential</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="insight-table">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Current Momentum</th>
                    <th>Main Investment Theme</th>
                    <th>Long-Term Potential</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 800 }}>Rajasthan</td>
                    <td>Strong</td>
                    <td>Industrial + Tourism + Spiritual Corridors</td>
                    <td style={{ color: 'green', fontWeight: 800 }}>Very High</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 800 }}>Uttar Pradesh</td>
                    <td>Extremely Strong</td>
                    <td>Infrastructure + Expressways + Airports</td>
                    <td style={{ color: 'darkgreen', fontWeight: 900 }}>Exceptional</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 800 }}>Uttarakhand</td>
                    <td>Emerging Strong</td>
                    <td>Lifestyle + Wellness + Second Homes</td>
                    <td style={{ color: '#c5a059', fontWeight: 800 }}>High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Final Summary */}
        <section className={`luxury-card reveal ${isVisible ? 'active' : ''}`} style={{ background: 'var(--ink)', color: '#fff', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: '30px' }}>Why Land & Plot Investments Continue to Rise in India</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
             {["Rising urbanization", "Infrastructure-led growth", "Limited land supply", "Growing NRI investments", "Better transparency through RERA", "Strong long-term appreciation potential", "Increasing demand in Tier-2 and Tier-3 cities"].map((item, i) => (
               <div key={i} style={{ padding: '10px 20px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>{item}</div>
             ))}
          </div>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>For investors seeking long-term wealth creation, strategically selected land investments in infrastructure-backed locations continue to remain one of the most attractive opportunities in the Indian real estate sector.</p>
          <div style={{ marginTop: '50px' }}>
            <button className="nav-btn-solid" style={{ padding: '20px 50px', fontSize: '1rem', letterSpacing: '2px' }}>CONSULT AN EXPERT</button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Insights;
