export const marketInsights = {
  "India": {
    insightsTitle: "India's Real Estate Wealth Creation",
    highlights: [
      "Market valuation projected to cross $1 Trillion by 2033-2034.",
      "Expected to contribute 15.5% to India's GDP by 2047.",
      "Plotted developments witnessing exceptional demand due to limited availability and high appreciation.",
      "Land transactions touching record levels across the nation."
    ],
    bars: [
      { loc: "Rajasthan", val: "High Growth", pct: "85%", change: "↑ Tourism & Ind.", dir: "up" },
      { loc: "Uttar Pradesh", val: "Exceptional", pct: "98%", change: "↑ Infra & Airports", dir: "up" },
      { loc: "Uttarakhand", val: "Emerging", pct: "75%", change: "↑ Lifestyle & Wellness", dir: "up" }
    ],
    trend: [100, 110, 125, 150, 190, 240, 320], // Adjusted to reflect national growth index
    rentals: [
      { lbl: "Infrastructure-led Growth", yield: "Very High", w: "95%" },
      { lbl: "NRI Investment Sentiment", yield: "Strong", w: "85%" },
      { lbl: "Tier-2/3 City Expansion", yield: "Rising", w: "70%" }
    ],
    invTotal: "$1 Trillion (2033)", invYoy: "8-10% CAGR",
    detailedAnalysis: {
      whyPlots: [
        "Limited land availability in growth corridors",
        "Higher appreciation potential vs built-up units",
        "Lower maintenance costs and greater flexibility",
        "Rising infrastructure in Tier-2 and Tier-3 cities"
      ],
      nriAdvantages: [
        "Currency advantage and stable long-term outlook",
        "Transparent regulations through RERA",
        "Easy inheritance and wealth transfer",
        "Future retirement or second-home planning"
      ]
    },
    landInsights: {
      landUseMix: [
        { lbl: 'Infrastructure', val: 40, color: 'var(--ink)' },
        { lbl: 'Industrial', val: 30, color: 'var(--gold)' },
        { lbl: 'Tourism/Spiritual', val: 20, color: 'var(--gold2)' },
        { lbl: 'Residential', val: 10, color: 'var(--ink3)' }
      ],
      roiProjections: [
        { loc: 'UP Expressways', y2: '+45%', y5: '+150%' },
        { loc: 'Rajasthan Corridors', y2: '+30%', y5: '+100%' },
        { loc: 'Uttarakhand Hills', y2: '+20%', y5: '+80%' }
      ],
      infraImpact: [
        { project: 'New Airports (Jewar/Ayodhya)', impact: '+90%' },
        { project: 'Expressways (DMIC/NH-48)', impact: '+75%' },
        { project: 'Smart Cities Expansion', impact: '+60%' }
      ],
      growthPockets: ['Noida', 'Ayodhya', 'Jaipur', 'Neemrana', 'Dehradun']
    }
  },
  'rajasthan': {
    insightsTitle: "Rajasthan Strategic Investment Hub",
    highlights: [
      "Jaipur dominance driven by Ring Road, Metro, and Smart City projects.",
      "Neemrana DMIC corridor emerging as a manufacturing & logistics powerhouse.",
      "Khatu Shyam Ji spiritual corridor witnessing massive hospitality & township demand.",
      "NH-48 (Delhi-Jaipur Highway) transformed into a strategic industrial growth corridor."
    ],
    bars: [
      { loc: "Jaipur (Jagatpura/Ajmer Rd)", val: "High", pct: "95%", change: "↑ Smart City", dir: "up" },
      { loc: "Neemrana (DMIC Hub)", val: "Exceptional", pct: "90%", change: "↑ Japanese Zone", dir: "up" },
      { loc: "Khatu Shyam Ji (Spiritual)", val: "Rising", pct: "80%", change: "↑ Corridor 2.0", dir: "up" }
    ],
    trend: [100, 110, 125, 145, 170, 195, 225, 320], // 2019 to 2030 projections
    rentals: [
      { lbl: "Industrial & Warehousing", yield: "9.2%", w: "95%" },
      { lbl: "Spiritual Hospitality", yield: "8.5%", w: "80%" },
      { lbl: "Jaipur Smart Living", yield: "6.8%", w: "70%" }
    ],
    invTotal: "225 Index (2025)", invYoy: "320 Index (2030)",
    detailedAnalysis: {
      hotspots: [
        "Jaipur: Jagatpura, Ajmer Road, Tonk Road",
        "NH-48 Corridor: Neemrana, Behror, Shahpura, Kotputli",
        "Spiritual: Khatu-Palsana-Ringas corridor"
      ]
    }
  },
  'uttar pradesh': {
    insightsTitle: "Uttar Pradesh Infrastructure Momentum",
    highlights: [
      "UP real estate investments surged over 50% recently.",
      "Jewar International Airport (Noida) driving unprecedented land value appreciation.",
      "Ayodhya spiritual tourism causing prices to multiply rapidly near Ram Mandir.",
      "Massive growth in Yamuna Expressway and Ganga Expressway corridors."
    ],
    bars: [
      { loc: "Noida / Jewar Airport", val: "Exceptional", pct: "100%", change: "↑ Mega Hub", dir: "up" },
      { loc: "Ayodhya Spiritual Zone", val: "Explosive", pct: "95%", change: "↑ Tourism Hub", dir: "up" },
      { loc: "Lucknow & Varanasi", val: "Strong", pct: "80%", change: "↑ Smart Metro", dir: "up" }
    ],
    trend: [100, 112, 130, 155, 185, 230, 275, 400], // 2019 to 2030 projections
    rentals: [
      { lbl: "Airport Logistics", yield: "12.5%", w: "98%" },
      { lbl: "Religious Tourism", yield: "11.2%", w: "90%" },
      { lbl: "Corporate Hubs (Noida)", yield: "7.5%", w: "85%" }
    ],
    invTotal: "275 Index (2025)", invYoy: "400 Index (2030)",
    detailedAnalysis: {
      drivers: [
        "Noida International Airport (Jewar)",
        "Yamuna Expressway Industrial Development",
        "Ayodhya & Varanasi Corridor upgrades",
        "Ganga Expressway connectivity"
      ]
    }
  },
  'uttarakhand': {
    insightsTitle: "Uttarakhand Lifestyle & Appreciation",
    highlights: [
      "Rising demand for wellness tourism, retirement living, and eco-tourism.",
      "Dehradun connectivity with Delhi-NCR driving villa & plotted development.",
      "Limited land supply in premium hill gateways ensuring long-term appreciation.",
      "Rishikesh attracting premium wellness and spiritual hospitality investments."
    ],
    bars: [
      { loc: "Dehradun (Rajpur/Sahastradhara)", val: "Strong", pct: "85%", change: "↑ Delhi E-way", dir: "up" },
      { loc: "Rishikesh (Wellness)", val: "High", pct: "80%", change: "↑ Luxury Second Homes", dir: "up" },
      { loc: "Haridwar & Nainital", val: "Emerging", pct: "70%", change: "↑ Connectivity", dir: "up" }
    ],
    trend: [100, 108, 120, 138, 160, 185, 210, 300], // 2019 to 2030 projections
    rentals: [
      { lbl: "Eco-Tourism & Wellness", yield: "7.8%", w: "85%" },
      { lbl: "Retirement/Second Homes", yield: "6.5%", w: "75%" },
      { lbl: "Hospitality Outskirts", yield: "5.2%", w: "60%" }
    ],
    invTotal: "210 Index (2025)", invYoy: "300 Index (2030)",
    detailedAnalysis: {
      hotspots: [
        "Dehradun, Rishikesh, Haridwar",
        "Haldwani, Nainital Outskirts",
        "Wellness and Spiritual nodes"
      ]
    }
  }
};
