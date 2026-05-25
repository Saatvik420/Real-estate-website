export const marketInsights = {
  "India": {
    insightsTitle: "India's Real Estate Market",
    bars: [
      { loc: "Rajasthan", val: "High Growth", pct: "85%", change: "↑ Tourism & Ind.", dir: "up" },
      { loc: "Uttar Pradesh", val: "Exceptional", pct: "98%", change: "↑ Infra & Airports", dir: "up" },
      { loc: "Uttarakhand", val: "Emerging", pct: "75%", change: "↑ Lifestyle & Wellness", dir: "up" }
    ],
    trend: [100, 120, 150, 190, 240, 320],
    rentals: [
      { lbl: "Infrastructure Growth", yield: "Very High", w: "95%" },
      { lbl: "NRI Investments", yield: "High", w: "85%" },
      { lbl: "Tier-2 & Tier-3 Cities", yield: "Emerging", w: "70%" }
    ],
    invTotal: "$1 Trillion", invYoy: "CAGR 8-10%",
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
        { project: 'New Airports', impact: '+90%' },
        { project: 'Expressways', impact: '+75%' },
        { project: 'Smart Cities', impact: '+60%' }
      ],
      growthPockets: ['Noida', 'Ayodhya', 'Jaipur', 'Neemrana', 'Dehradun']
    },
    devs: []
  },
  'rajasthan': {
    insightsTitle: "Rajasthan Market Trend",
    bars: [
      { loc: "Jaipur", val: "Very High", pct: "95%", change: "↑ Smart City", dir: "up" },
      { loc: "Neemrana", val: "High", pct: "85%", change: "↑ DMIC", dir: "up" },
      { loc: "Khatu Shyam Ji", val: "Emerging", pct: "75%", change: "↑ Spiritual Tourism", dir: "up" }
    ],
    trend: [110, 125, 145, 170, 195, 225, 320],
    rentals: [
      { lbl: "Industrial Hubs", yield: "Strong", w: "90%" },
      { lbl: "Spiritual Tourism", yield: "High", w: "80%" }
    ],
    invTotal: "225 Index", invYoy: "2030 Proj: 320",
    devs: []
  },
  'uttar pradesh': {
    insightsTitle: "Uttar Pradesh Market Trend",
    bars: [
      { loc: "Noida / Jewar", val: "Exceptional", pct: "100%", change: "↑ Airport & Infra", dir: "up" },
      { loc: "Ayodhya", val: "Very High", pct: "90%", change: "↑ Religious Tourism", dir: "up" },
      { loc: "Lucknow", val: "Strong", pct: "80%", change: "↑ Metro & Expansion", dir: "up" }
    ],
    trend: [112, 130, 155, 185, 230, 275, 400],
    rentals: [
      { lbl: "Airport Corridors", yield: "Exceptional", w: "98%" },
      { lbl: "Religious Tourism", yield: "Very High", w: "85%" }
    ],
    invTotal: "275 Index", invYoy: "2030 Proj: 400",
    devs: []
  },
  'uttarakhand': {
    insightsTitle: "Uttarakhand Market Trend",
    bars: [
      { loc: "Dehradun", val: "High", pct: "85%", change: "↑ Connectivity", dir: "up" },
      { loc: "Rishikesh", val: "Emerging", pct: "75%", change: "↑ Wellness Tourism", dir: "up" }
    ],
    trend: [108, 120, 138, 160, 185, 210, 300],
    rentals: [
      { lbl: "Second Homes", yield: "High", w: "85%" },
      { lbl: "Eco-tourism", yield: "Growing", w: "70%" }
    ],
    invTotal: "210 Index", invYoy: "2030 Proj: 300",
    devs: []
  }
};
