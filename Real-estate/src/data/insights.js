export const marketInsights = {
  "India": {
    insightsTitle: "North India Corridor",
    bars: [
      { loc: "Noida (Expressway)", val: "₹12,400", pct: "95%", change: "↑ 12.1%", dir: "up" },
      { loc: "Jaipur (C-Scheme)", val: "₹15,000", pct: "85%", change: "↑ 6.2%", dir: "up" },
      { loc: "Dehradun (Rajpur)", val: "₹14,000", pct: "80%", change: "↑ 8.5%", dir: "up" },
      { loc: "Ayodhya (Main)", val: "₹9,600", pct: "65%", change: "↑ 22.4%", dir: "up" },
      { loc: "Vrindavan", val: "₹6,100", pct: "50%", change: "↑ 14.8%", dir: "up" },
      { loc: "Haridwar", val: "₹5,800", pct: "45%", change: "↑ 9.2%", dir: "up" }
    ],
    trend: [30, 55, 85, 120, 160],
    rentals: [
      { lbl: "Noida IT Corporate", yield: "6.2%", w: "95%" },
      { lbl: "Jaipur Heritage", yield: "9.2%", w: "85%" },
      { lbl: "Dehradun Scenic", yield: "4.5%", w: "70%" },
      { lbl: "Vrindavan Spiritual", yield: "5.8%", w: "60%" }
    ],
    invTotal: "42.5K", invYoy: "+11.4%",
    landInsights: {
      landUseMix: [
        { lbl: 'Residential', val: 50, color: 'var(--ink)' },
        { lbl: 'Commercial', val: 20, color: 'var(--gold)' },
        { lbl: 'Spiritual/Eco', val: 20, color: 'var(--gold2)' },
        { lbl: 'Industrial', val: 10, color: 'var(--ink3)' }
      ],
      roiProjections: [
        { loc: 'Ayodhya Corridor', y2: '+45%', y5: '+120%' },
        { loc: 'Noida Ext. (Jewar)', y2: '+30%', y5: '+85%' },
        { loc: 'Jaipur Ajmer Road', y2: '+18%', y5: '+55%' }
      ],
      infraImpact: [
        { project: 'Ram Mandir / Airport', impact: '+85%' },
        { project: 'Jewar Intl. Airport', impact: '+60%' },
        { project: 'Delhi-Doon Eway', impact: '+40%' }
      ],
      growthPockets: ['Ayodhya', 'Greater Noida', 'Ajmer Road', 'Sahastradhara']
    },
    devs: [
      { name: "One5 Realty Group", logo: "15", type: "Ultra Luxury", rera: "RJ/01/2023", num: "12", exp: "25+", sold: "5k+", proj: ["Jewels", "Heights"] },
      { name: "ATS Homekraft", logo: "ATS", type: "Premium Residential", rera: "UP/05/2018", num: "28", exp: "20+", sold: "30k+", proj: ["Tech Heights", "Pristine"] },
      { name: "Pacific Group", logo: "PG", type: "Integrated Living", rera: "UT/02/2019", num: "15", exp: "35+", sold: "20k+", proj: ["Golf Estate", "Residency"] }
    ]
  },
  'jaipur': {
    insightsTitle: "Jaipur JDA",
    bars: [
      { loc: "C-Scheme", val: "₹15,000", pct: "95%", change: "↑ 6.2%", dir: "up" },
      { loc: "Jagatpura", val: "₹6,800", pct: "80%", change: "↑ 12.5%", dir: "up" },
      { loc: "Ajmer Road", val: "₹5,200", pct: "70%", change: "↑ 14.2%", dir: "up" }
    ],
    trend: [20, 45, 85, 130, 185],
    rentals: [{ lbl: "Heritage Stay", yield: "9.2%", w: "98%" }, { lbl: "Luxury Apts", yield: "3.8%", w: "70%" }],
    invTotal: "12.4K", invYoy: "+8.4%",
    devs: [{ name: "Vatika Group", logo: "V", type: "Premium Residential", rera: "RJ/01/2016", num: "22", exp: "20+", sold: "15k+", proj: ["Panorama", "Jewels"] }]
  },
  'noida': {
    insightsTitle: "Noida Municipal",
    bars: [
      { loc: "Sector 150", val: "₹12,400", pct: "95%", change: "↑ 15.2%", dir: "up" },
      { loc: "Expressway", val: "₹9,500", pct: "85%", change: "↑ 11.2%", dir: "up" }
    ],
    trend: [25, 55, 95, 145, 210],
    rentals: [{ lbl: "IT Corporate", yield: "6.2%", w: "95%" }, { lbl: "MNC Housing", yield: "4.1%", w: "75%" }],
    invTotal: "28.7K", invYoy: "+12.8%",
    devs: [{ name: "ATS Homekraft", logo: "ATS", type: "Quality Housing", rera: "UP/01/2016", num: "28", exp: "20+", sold: "30k+", proj: ["Tech Heights", "Imperial"] }]
  }
};
