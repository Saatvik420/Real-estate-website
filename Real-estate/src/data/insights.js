export const marketInsights = {
  "India": {
    insightsTitle: "All India Avg",
    bars: [
      { loc: "Mumbai (South)", val: "₹55,000", pct: "95%", change: "↑ 6.2%", dir: "up" },
      { loc: "Delhi (Central)", val: "₹42,000", pct: "80%", change: "↑ 5.8%", dir: "up" },
      { loc: "Gurugram (Golf)", val: "₹28,000", pct: "65%", change: "↑ 12.1%", dir: "up" },
      { loc: "Bengaluru (CBD)", val: "₹22,000", pct: "50%", change: "↑ 8.4%", dir: "up" },
      { loc: "Hyderabad (J.H.)", val: "₹16,000", pct: "38%", change: "↑ 9.2%", dir: "up" },
      { loc: "Pune (Koregaon)", val: "₹14,500", pct: "32%", change: "↑ 7.1%", dir: "up" }
    ],
    trend: [20, 45, 60, 95, 125],
    rentals: [
      { lbl: "3 BHK Flats", yield: "4.8%", w: "80%" },
      { lbl: "4 BHK Luxury", yield: "5.2%", w: "60%" },
      { lbl: "Villas/Plots", yield: "3.5%", w: "40%" },
      { lbl: "Commercial", yield: "8.1%", w: "95%" }
    ],
    invTotal: "84.2K", invYoy: "+8.4%",
    landInsights: {
      landUseMix: [
        { lbl: 'Residential', val: 45, color: 'var(--ink)' },
        { lbl: 'Commercial', val: 25, color: 'var(--gold)' },
        { lbl: 'Agricultural', val: 20, color: 'var(--gold2)' },
        { lbl: 'Industrial', val: 10, color: 'var(--ink3)' }
      ],
      roiProjections: [
        { loc: 'North Bengaluru', y2: '+18%', y5: '+55%' },
        { loc: 'New Gurugram', y2: '+22%', y5: '+65%' },
        { loc: 'Navi Mumbai', y2: '+15%', y5: '+48%' }
      ],
      infraImpact: [
        { project: 'Metro Exp.', impact: '+25%' },
        { project: 'Expressway', impact: '+40%' },
        { project: 'New Airport', impact: '+60%' }
      ],
      growthPockets: ['Devanahalli', 'Sohna Road', 'Tellapur', 'Panvel']
    },
    devs: [
      { name: "Lodha Group", logo: "L", type: "Ultra Luxury", rera: "MH/01/2020", num: "42", exp: "40+", sold: "50k+", proj: ["Altamount", "The Park"] },
      { name: "DLF Limited", logo: "DLF", type: "Premium Residential", rera: "HR/05/2018", num: "28", exp: "75+", sold: "100k+", proj: ["Camellias", "Magnolias"] },
      { name: "Prestige Group", logo: "PR", type: "Luxury & Commercial", rera: "KA/02/2019", num: "35", exp: "35+", sold: "80k+", proj: ["Golfshire", "Kingfisher"] }
    ]
  },
  'mumbai': {
    insightsTitle: "Mumbai MMR",
    bars: [
      { loc: "South Mumbai", val: "₹55,000", pct: "95%", change: "↑ 4.2%", dir: "up" },
      { loc: "Bandra / Khar", val: "₹45,000", pct: "82%", change: "↑ 5.1%", dir: "up" },
      { loc: "Juhu / V.Parle", val: "₹38,000", pct: "70%", change: "↑ 3.8%", dir: "up" },
      { loc: "Andheri West", val: "₹24,000", pct: "55%", change: "↑ 6.4%", dir: "up" },
      { loc: "Powai", val: "₹21,000", pct: "48%", change: "↑ 7.2%", dir: "up" },
      { loc: "Thane (Prem)", val: "₹16,000", pct: "35%", change: "↑ 8.1%", dir: "up" }
    ],
    trend: [30, 40, 70, 85, 110],
    rentals: [
      { lbl: "2 BHK Suburbs", yield: "3.8%", w: "95%" },
      { lbl: "3 BHK SoBo", yield: "2.9%", w: "45%" },
      { lbl: "Premium Offices", yield: "7.5%", w: "85%" }
    ],
    invTotal: "22.4K", invYoy: "+6.2%",
    landInsights: {
      landUseMix: [
        { lbl: 'Residential', val: 35, color: 'var(--ink)' },
        { lbl: 'Commercial', val: 40, color: 'var(--gold)' },
        { lbl: 'Industrial', val: 15, color: 'var(--gold2)' },
        { lbl: 'Agri/Eco', val: 10, color: 'var(--ink3)' }
      ],
      roiProjections: [
        { loc: 'Navi Mumbai', y2: '+14%', y5: '+45%' },
        { loc: 'Panvel / Karjat', y2: '+20%', y5: '+60%' },
        { loc: 'Thane Extension', y2: '+12%', y5: '+35%' }
      ],
      infraImpact: [
        { project: 'MTHL Link', impact: '+35%' },
        { project: 'Navi Mumbai Airport', impact: '+55%' },
        { project: 'Coastal Road', impact: '+25%' }
      ],
      growthPockets: ['Panvel', 'Karjat', 'Uran', 'Vasai']
    },
    devs: [
      { name: "Lodha Group", logo: "L", type: "Ultra Luxury", rera: "MH/01/2020", num: "42", exp: "40+", sold: "50k+", proj: ["World Towers", "Trump Tower"] },
      { name: "Godrej Prop.", logo: "GP", type: "Premium Residential", rera: "MH/04/2019", num: "18", exp: "30+", sold: "25k+", proj: ["The Trees", "RK Studios"] },
      { name: "Rustomjee", logo: "R", type: "Luxury Townships", rera: "MH/03/2018", num: "14", exp: "25+", sold: "15k+", proj: ["Crown", "Seasons"] }
    ]
  },
  'bengaluru': {
    insightsTitle: "Bengaluru Urban",
    bars: [
      { loc: "Koramangala", val: "₹22,000", pct: "85%", change: "↑ 7.2%", dir: "up" },
      { loc: "Indiranagar", val: "₹18,500", pct: "75%", change: "↑ 6.8%", dir: "up" },
      { loc: "Whitefield", val: "₹12,000", pct: "60%", change: "↑ 9.4%", dir: "up" },
      { loc: "Sarjapur Rd", val: "₹10,500", pct: "55%", change: "↑ 10.2%", dir: "up" },
      { loc: "Hebbal", val: "₹11,000", pct: "58%", change: "↑ 8.1%", dir: "up" },
      { loc: "Electronic City", val: "₹7,500", pct: "40%", change: "↓ 1.1%", dir: "dn" }
    ],
    trend: [10, 30, 60, 110, 130],
    rentals: [
      { lbl: "IT Corridor 2 BHK", yield: "6.2%", w: "100%" },
      { lbl: "Luxury Villas", yield: "4.1%", w: "30%" },
      { lbl: "Co-working Space", yield: "8.5%", w: "70%" }
    ],
    invTotal: "18.1K", invYoy: "+9.3%",
    landInsights: {
      landUseMix: [
        { lbl: 'Residential', val: 55, color: 'var(--ink)' },
        { lbl: 'IT/Commercial', val: 30, color: 'var(--gold)' },
        { lbl: 'Industrial', val: 10, color: 'var(--gold2)' },
        { lbl: 'Agri', val: 5, color: 'var(--ink3)' }
      ],
      roiProjections: [
        { loc: 'North Bengaluru', y2: '+25%', y5: '+75%' },
        { loc: 'Sarjapur Rd Ext', y2: '+18%', y5: '+50%' },
        { loc: 'Whitefield Ext', y2: '+15%', y5: '+40%' }
      ],
      infraImpact: [
        { project: 'Peripheral Ring Rd', impact: '+45%' },
        { project: 'Airport Metro', impact: '+30%' },
        { project: 'STRR Hwy', impact: '+50%' }
      ],
      growthPockets: ['Devanahalli', 'Bagalur', 'Hoskote', 'Attibele']
    },
    devs: [
      { name: "Prestige Group", logo: "PR", type: "Luxury Townships", rera: "KA/02/2019", num: "35", exp: "35+", sold: "80k+", proj: ["Golfshire", "Lakeside"] },
      { name: "Sobha Limited", logo: "S", type: "Premium Quality", rera: "KA/05/2017", num: "22", exp: "28+", sold: "45k+", proj: ["City", "Dream Acres"] },
      { name: "Brigade Group", logo: "B", type: "Mixed Use", rera: "KA/04/2016", num: "19", exp: "30+", sold: "40k+", proj: ["Gateway", "Exotica"] }
    ]
  },
  'delhi': {
    insightsTitle: "Delhi NCR",
    bars: [
      { loc: "Lutyens Zone", val: "₹1.2L", pct: "98%", change: "↑ 2.2%", dir: "up" },
      { loc: "Golf Cr. Ext", val: "₹28,000", pct: "70%", change: "↑ 14.1%", dir: "up" },
      { loc: "Vasant Vihar", val: "₹35,000", pct: "80%", change: "↑ 4.8%", dir: "up" },
      { loc: "Dwarka Exp.", val: "₹16,000", pct: "50%", change: "↑ 18.4%", dir: "up" },
      { loc: "Noida Sec 150", val: "₹12,000", pct: "40%", change: "↑ 11.2%", dir: "up" },
      { loc: "Greater Noida W", val: "₹7,500", pct: "25%", change: "↑ 8.1%", dir: "up" }
    ],
    trend: [25, 45, 55, 90, 135],
    rentals: [
      { lbl: "Gurugram 3 BHK", yield: "5.5%", w: "80%" },
      { lbl: "Noida 2 BHK", yield: "4.8%", w: "90%" },
      { lbl: "Delhi Independent", yield: "2.5%", w: "20%" }
    ],
    invTotal: "32.5K", invYoy: "+11.8%",
    devs: [
      { name: "DLF Limited", logo: "DLF", type: "Ultra Luxury", rera: "HR/05/2018", num: "28", exp: "75+", sold: "100k+", proj: ["Camellias", "Crest"] },
      { name: "M3M India", logo: "M3M", type: "Premium Commercial", rera: "HR/09/2020", num: "15", exp: "12+", sold: "10k+", proj: ["Golfestate", "Urbana"] },
      { name: "Emaar India", logo: "EM", type: "Luxury Residential", rera: "HR/02/2017", num: "12", exp: "15+", sold: "20k+", proj: ["Marbella", "Palm Drive"] }
    ]
  },
  'patna': {
    insightsTitle: "Patna Municipal",
    bars: [
      { loc: "Boring Road", val: "₹8,500", pct: "85%", change: "↑ 6.2%", dir: "up" },
      { loc: "Patliputra Col", val: "₹7,200", pct: "75%", change: "↑ 5.8%", dir: "up" },
      { loc: "Rajendra Ngr", val: "₹6,500", pct: "65%", change: "↑ 4.1%", dir: "up" },
      { loc: "Kankarbagh", val: "₹5,800", pct: "58%", change: "↑ 3.9%", dir: "up" },
      { loc: "Danapur", val: "₹4,200", pct: "45%", change: "↑ 8.2%", dir: "up" },
      { loc: "Phulwari Shrf", val: "₹3,500", pct: "35%", change: "↑ 9.4%", dir: "up" }
    ],
    trend: [40, 50, 75, 95, 120],
    rentals: [
      { lbl: "2 BHK Suburbs", yield: "4.2%", w: "70%" },
      { lbl: "3 BHK Central", yield: "3.5%", w: "50%" },
      { lbl: "Retail Shops", yield: "7.8%", w: "85%" }
    ],
    invTotal: "8.4K", invYoy: "+6.8%",
    devs: [
      { name: "Satyamev Grp", logo: "SG", type: "Premium Residential", rera: "BR/07/2016", num: "14", exp: "18+", sold: "3k+", proj: ["Heights", "Enclave"] },
      { name: "Venus Star", logo: "VS", type: "Luxury Heights", rera: "BR/07/2019", num: "8", exp: "12+", sold: "1k+", proj: ["Capital H.", "Residency"] },
      { name: "Sai Developers", logo: "SD", type: "Mid-Segment", rera: "BR/07/2018", num: "9", exp: "10+", sold: "2k+", proj: ["Greens", "Towers"] }
    ]
  },
  'port_blair': {
    insightsTitle: "Port Blair Urban",
    bars: [
      { loc: "Aberdeen", val: "₹12,000", pct: "85%", change: "↑ 6.2%", dir: "up" },
      { loc: "Corbyn's Cove", val: "₹8,500", pct: "70%", change: "↑ 4.1%", dir: "up" }
    ],
    trend: [10, 20, 30, 50, 75],
    rentals: [{ lbl: "Tourism Stay", yield: "9.2%", w: "95%" }, { lbl: "Residential", yield: "3.5%", w: "50%" }],
    invTotal: "2.1K", invYoy: "+4.2%",
    devs: [{ name: "Island Realty", logo: "IR", type: "Coastal Residential", rera: "AN/07/2018", num: "5", exp: "10+", sold: "500+", proj: ["Sea View", "Heights"] }]
  },
  'visakhapatnam': {
    insightsTitle: "Vizag Municipal",
    bars: [
      { loc: "Beach Road", val: "₹15,000", pct: "92%", change: "↑ 7.8%", dir: "up" },
      { loc: "Gajuwaka", val: "₹6,500", pct: "65%", change: "↑ 5.4%", dir: "up" }
    ],
    trend: [20, 35, 55, 80, 110],
    rentals: [{ lbl: "Luxury Seaview", yield: "4.5%", w: "80%" }, { lbl: "Industrial Hub", yield: "6.8%", w: "85%" }],
    invTotal: "15.4K", invYoy: "+8.2%",
    devs: [{ name: "Coastal Prop", logo: "CP", type: "Premium Residential", rera: "AP/01/2019", num: "12", exp: "15+", sold: "2k+", proj: ["Bay View", "Garden"] }]
  },
  'itanagar': {
    insightsTitle: "Itanagar Urban",
    bars: [
      { loc: "Ganga Market", val: "₹5,500", pct: "80%", change: "↑ 4.2%", dir: "up" },
      { loc: "Naharlagun", val: "₹4,200", pct: "60%", change: "↑ 3.1%", dir: "up" }
    ],
    trend: [5, 12, 25, 45, 70],
    rentals: [{ lbl: "Govt Housing", yield: "3.2%", w: "60%" }, { lbl: "Commercial", yield: "5.5%", w: "75%" }],
    invTotal: "1.2K", invYoy: "+3.5%",
    devs: [{ name: "Arunachal Reality", logo: "AR", type: "Hill Housing", rera: "AR/02/2020", num: "4", exp: "8+", sold: "300+", proj: ["Heights", "Residency"] }]
  },
  'guwahati': {
    insightsTitle: "Guwahati GMC",
    bars: [
      { loc: "Zoo Road", val: "₹12,500", pct: "90%", change: "↑ 9.5%", dir: "up" },
      { loc: "Dispur", val: "₹9,000", pct: "85%", change: "↑ 6.2%", dir: "up" }
    ],
    trend: [15, 30, 50, 85, 120],
    rentals: [{ lbl: "Corporate Lease", yield: "5.8%", w: "85%" }, { lbl: "Apartments", yield: "4.1%", w: "70%" }],
    invTotal: "12.2K", invYoy: "+10.1%",
    devs: [{ name: "Assam Homes", logo: "AH", type: "City Residential", rera: "AS/01/2018", num: "15", exp: "20+", sold: "4k+", proj: ["Woods", "River View"] }]
  },
  'chandigarh': {
    insightsTitle: "Chandigarh Urban",
    bars: [
      { loc: "Sector 17", val: "₹25,000", pct: "95%", change: "↑ 5.2%", dir: "up" },
      { loc: "Sector 35", val: "₹18,000", pct: "88%", change: "↑ 4.1%", dir: "up" }
    ],
    trend: [25, 45, 75, 100, 135],
    rentals: [{ lbl: "Bungalows", yield: "2.5%", w: "40%" }, { lbl: "Offices", yield: "7.2%", w: "90%" }],
    invTotal: "8.5K", invYoy: "+5.5%",
    devs: [{ name: "Chandigarh Realty", logo: "CR", type: "Planned Residential", rera: "CH/01/2017", num: "20", exp: "25+", sold: "5k+", proj: ["City Beautiful", "Modern"] }]
  },
  'raipur': {
    insightsTitle: "Raipur GMC",
    bars: [
      { loc: "Shankar Nagar", val: "₹7,500", pct: "85%", change: "↑ 8.1%", dir: "up" },
      { loc: "Naya Raipur", val: "₹4,500", pct: "60%", change: "↑ 15.2%", dir: "up" }
    ],
    trend: [10, 25, 45, 75, 105],
    rentals: [{ lbl: "Modern Flats", yield: "4.8%", w: "75%" }, { lbl: "Industrial Lease", yield: "8.2%", w: "85%" }],
    invTotal: "9.2K", invYoy: "+12.4%",
    devs: [{ name: "Avinash Grp", logo: "AG", type: "Townships", rera: "CT/01/2018", num: "18", exp: "22+", sold: "10k+", proj: ["New County", "Heights"] }]
  },
  'silvassa': {
    insightsTitle: "Silvassa Urban",
    bars: [{ loc: "Main City", val: "₹4,500", pct: "75%", change: "↑ 5.5%", dir: "up" }],
    trend: [5, 15, 30, 50, 75],
    rentals: [{ lbl: "Industrial Staff", yield: "6.5%", w: "80%" }],
    invTotal: "1.5K", invYoy: "+4.1%",
    devs: [{ name: "UT Realty", logo: "UR", type: "Affordable Luxury", rera: "DN/01/2020", num: "6", exp: "12+", sold: "800+", proj: ["Smart", "Forest Edge"] }]
  },
  'panaji': {
    insightsTitle: "Panaji Municipal",
    bars: [
      { loc: "Dona Paula", val: "₹18,000", pct: "90%", change: "↑ 6.5%", dir: "up" },
      { loc: "Calangute", val: "₹12,000", pct: "85%", change: "↑ 10.2%", dir: "up" }
    ],
    trend: [20, 40, 70, 100, 140],
    rentals: [{ lbl: "Holiday Homes", yield: "8.8%", w: "95%" }, { lbl: "Luxury Villa", yield: "3.8%", w: "60%" }],
    invTotal: "5.4K", invYoy: "+11.2%",
    devs: [{ name: "Goa Prop", logo: "GP", type: "Lifestyle Housing", rera: "GA/01/2018", num: "10", exp: "15+", sold: "2k+", proj: ["Mandovi River", "Beach View"] }]
  },
  'ahmedabad': {
    insightsTitle: "Ahmedabad AMC",
    bars: [
      { loc: "SG Highway", val: "₹9,500", pct: "88%", change: "↑ 12.1%", dir: "up" },
      { loc: "Gift City", val: "₹12,000", pct: "75%", change: "↑ 22.4%", dir: "up" }
    ],
    trend: [15, 35, 65, 100, 150],
    rentals: [{ lbl: "Offices", yield: "7.5%", w: "90%" }, { lbl: "Premium Flats", yield: "4.2%", w: "70%" }],
    invTotal: "32.4K", invYoy: "+15.2%",
    devs: [{ name: "Adani Realty", logo: "A", type: "Integrated Townships", rera: "GJ/01/2017", num: "25", exp: "20+", sold: "15k+", proj: ["Shantigram", "Aangan"] }]
  },
  'gurugram': {
    insightsTitle: "Gurugram Municipal",
    bars: [
      { loc: "Golf Course Road", val: "₹45,000", pct: "95%", change: "↑ 8.5%", dir: "up" },
      { loc: "Sohna Road", val: "₹9,500", pct: "75%", change: "↑ 14.2%", dir: "up" }
    ],
    trend: [25, 55, 95, 140, 190],
    rentals: [{ lbl: "Fortune 500 HQ", yield: "8.2%", w: "98%" }, { lbl: "Luxury Condos", yield: "3.5%", w: "65%" }],
    invTotal: "55.4K", invYoy: "+12.8%",
    devs: [{ name: "M3M India", logo: "M", type: "Modern Luxury", rera: "HR/01/2016", num: "35", exp: "15+", sold: "20k+", proj: ["Golf Estate", "Heights"] }]
  },
  'shimla': {
    insightsTitle: "Shimla Municipal",
    bars: [{ loc: "The Mall", val: "₹18,500", pct: "92%", change: "↑ 5.1%", dir: "up" }],
    trend: [10, 25, 45, 70, 95],
    rentals: [{ lbl: "Tourism Lease", yield: "7.8%", w: "90%" }],
    invTotal: "3.2K", invYoy: "+4.5%",
    devs: [{ name: "Himalayan Prop", logo: "HP", type: "Hill Luxury", rera: "HP/01/2019", num: "6", exp: "12+", sold: "1k+", proj: ["Heights", "Residency"] }]
  },
  'srinagar': {
    insightsTitle: "Srinagar SMC",
    bars: [{ loc: "Dal Lake Area", val: "₹12,500", pct: "85%", change: "↑ 7.2%", dir: "up" }],
    trend: [8, 20, 40, 65, 90],
    rentals: [{ lbl: "Guest Houses", yield: "8.2%", w: "92%" }],
    invTotal: "4.5K", invYoy: "+6.2%",
    devs: [{ name: "JK Reality", logo: "JK", type: "Premier Housing", rera: "JK/01/2021", num: "5", exp: "10+", sold: "800+", proj: ["Dal View", "Gulmarg Road"] }]
  },
  'ranchi': {
    insightsTitle: "Ranchi Municipal",
    bars: [{ loc: "Bariatu", val: "₹6,500", pct: "82%", change: "↑ 8.4%", dir: "up" }],
    trend: [12, 25, 45, 75, 110],
    rentals: [{ lbl: "Corporate Rent", yield: "5.2%", w: "70%" }],
    invTotal: "7.8K", invYoy: "+9.1%",
    devs: [{ name: "Jharkhand Const.", logo: "JC", type: "Quality Residential", rera: "JH/01/2018", num: "10", exp: "15+", sold: "3k+", proj: ["Karmyogi", "Heritage"] }]
  },
  'kochi': {
    insightsTitle: "Kochi Municipal",
    bars: [
      { loc: "Marine Drive", val: "₹14,500", pct: "90%", change: "↑ 8.8%", dir: "up" },
      { loc: "Kakkanad", val: "₹6,000", pct: "82%", change: "↑ 12.4%", dir: "up" }
    ],
    trend: [20, 45, 75, 110, 150],
    rentals: [{ lbl: "Waterfront", yield: "4.5%", w: "75%" }, { lbl: "IT Hub", yield: "7.2%", w: "85%" }],
    invTotal: "18.2K", invYoy: "+10.4%",
    devs: [{ name: "Sobha Ltd", logo: "S", type: "Quality Luxury", rera: "KL/01/2015", num: "45", exp: "25+", sold: "50k+", proj: ["Marina One", "Enclave"] }]
  },
  'leh': {
    insightsTitle: "Leh Urban",
    bars: [{ loc: "Main Market", val: "₹15,000", pct: "80%", change: "↑ 4.5%", dir: "up" }],
    trend: [5, 15, 30, 55, 85],
    rentals: [{ lbl: "Staycations", yield: "9.5%", w: "90%" }],
    invTotal: "1.1K", invYoy: "+5.2%",
    devs: [{ name: "Ladakh Builders", logo: "LB", type: "Mountain Resorts", rera: "LA/01/2021", num: "3", exp: "10+", sold: "200+", proj: ["Skyline", "Retreat"] }]
  },
  'kavaratti': {
    insightsTitle: "Kavaratti Urban",
    bars: [{ loc: "Island Front", val: "₹25,000", pct: "95%", change: "↑ 3.2%", dir: "up" }],
    trend: [5, 10, 25, 45, 65],
    rentals: [{ lbl: "Eco Tourism", yield: "10.5%", w: "98%" }],
    invTotal: "0.5K", invYoy: "+2.1%",
    devs: [{ name: "Island Builders", logo: "IB", type: "Eco Luxury", rera: "LD/01/2022", num: "2", exp: "5+", sold: "50+", proj: ["Pearl", "Lagoon"] }]
  },
  'indore': {
    insightsTitle: "Indore IMC",
    bars: [
      { loc: "Vijay Nagar", val: "₹8,500", pct: "92%", change: "↑ 11.4%", dir: "up" },
      { loc: "Super Corridor", val: "₹4,200", pct: "65%", change: "↑ 20.1%", dir: "up" }
    ],
    trend: [15, 40, 75, 115, 160],
    rentals: [{ lbl: "Premium Offices", yield: "7.8%", w: "88%" }, { lbl: "Students Hub", yield: "5.5%", w: "85%" }],
    invTotal: "22.4K", invYoy: "+14.2%",
    devs: [{ name: "Apollo Builders", logo: "AB", type: "City Integrated", rera: "MP/01/2016", num: "15", exp: "18+", sold: "5k+", proj: ["DB City", "Heights"] }]
  },
  'imphal': {
    insightsTitle: "Imphal IMC",
    bars: [{ loc: "Khuman Lampak", val: "₹5,200", pct: "80%", change: "↑ 3.8%", dir: "up" }],
    trend: [5, 15, 30, 50, 75],
    rentals: [{ lbl: "City Rent", yield: "3.5%", w: "65%" }],
    invTotal: "2.5K", invYoy: "+4.1%",
    devs: [{ name: "Manipur Realty", logo: "MR", type: "Residential", rera: "MN/01/2021", num: "4", exp: "8+", sold: "400+", proj: ["Valley", "Heights"] }]
  },
  'shillong': {
    insightsTitle: "Shillong Urban",
    bars: [{ loc: "Police Bazar", val: "₹12,500", pct: "90%", change: "↑ 4.5%", dir: "up" }],
    trend: [10, 25, 45, 75, 105],
    rentals: [{ lbl: "Hospitality", yield: "8.5%", w: "95%" }],
    invTotal: "3.5K", invYoy: "+5.4%",
    devs: [{ name: "Meghalaya Realty", logo: "MR", type: "Premium Hillside", rera: "ML/01/2019", num: "6", exp: "10+", sold: "600+", proj: ["Pine View", "Elephant Falls"] }]
  },
  'aizawl': {
    insightsTitle: "Aizawl Urban",
    bars: [{ loc: "Chanmari", val: "₹7,200", pct: "85%", change: "↑ 4.1%", dir: "up" }],
    trend: [8, 20, 40, 65, 95],
    rentals: [{ lbl: "Residential", yield: "3.8%", w: "70%" }],
    invTotal: "2.2K", invYoy: "+4.8%",
    devs: [{ name: "Mizo Realty", logo: "MZ", type: "Hill Housing", rera: "MZ/01/2020", num: "5", exp: "10+", sold: "500+", proj: ["Skyline", "Heights"] }]
  },
  'kohima': {
    insightsTitle: "Kohima Municipal",
    bars: [{ loc: "Razhu Point", val: "₹8,500", pct: "82%", change: "↑ 3.5%", dir: "up" }],
    trend: [10, 25, 50, 80, 110],
    rentals: [{ lbl: "Commercial", yield: "5.5%", w: "80%" }],
    invTotal: "2.8K", invYoy: "+5.1%",
    devs: [{ name: "Naga Reality", logo: "NR", type: "Modern Housing", rera: "NL/01/2021", num: "4", exp: "12+", sold: "400+", proj: ["Heights", "Garden City"] }]
  },
  'bhubaneswar': {
    insightsTitle: "Bhubaneswar BMC",
    bars: [
      { loc: "Patia", val: "₹8,500", pct: "92%", change: "↑ 15.1%", dir: "up" },
      { loc: "Jayadev Vihar", val: "₹11,000", pct: "85%", change: "↑ 9.2%", dir: "up" }
    ],
    trend: [15, 40, 75, 120, 175],
    rentals: [{ lbl: "IT Parks", yield: "6.8%", w: "88%" }, { lbl: "Students PG", yield: "5.2%", w: "80%" }],
    invTotal: "14.2K", invYoy: "+13.5%",
    devs: [{ name: "Z Estates", logo: "ZE", type: "Luxury Premium", rera: "OR/01/2016", num: "15", exp: "20+", sold: "8k+", proj: ["High Garden", "Imperial"] }]
  },
  'puducherry': {
    insightsTitle: "Puducherry Urban",
    bars: [{ loc: "White Town", val: "₹15,500", pct: "95%", change: "↑ 6.4%", dir: "up" }],
    trend: [15, 35, 65, 100, 140],
    rentals: [{ lbl: "Tourism Lease", yield: "8.8%", w: "98%" }],
    invTotal: "4.2K", invYoy: "+7.5%",
    devs: [{ name: "Puducherry Realty", logo: "PR", type: "Heritage Luxury", rera: "PY/01/2018", num: "8", exp: "15+", sold: "1k+", proj: ["French Quarter", "Lagoon"] }]
  },
  'ludhiana': {
    insightsTitle: "Ludhiana Municipal",
    bars: [
      { loc: "Pakhowal Road", val: "₹7,500", pct: "85%", change: "↑ 8.2%", dir: "up" },
      { loc: "Saraba Nagar", val: "₹12,000", pct: "90%", change: "↑ 5.5%", dir: "up" }
    ],
    trend: [20, 45, 80, 120, 165],
    rentals: [{ lbl: "Industrialists", yield: "3.5%", w: "50%" }, { lbl: "Retail Showrooms", yield: "8.5%", w: "95%" }],
    invTotal: "22.4K", invYoy: "+9.2%",
    devs: [{ name: "Omaxe", logo: "O", type: "Mixed Use", rera: "PB/01/2015", num: "45", exp: "25+", sold: "30k+", proj: ["Royal Residency", "Plaza"] }]
  },
  'jaipur': {
    insightsTitle: "Jaipur JDA",
    bars: [
      { loc: "Jagatpura", val: "₹6,800", pct: "88%", change: "↑ 12.5%", dir: "up" },
      { loc: "C-Scheme", val: "₹15,000", pct: "95%", change: "↑ 6.2%", dir: "up" }
    ],
    trend: [20, 45, 85, 130, 185],
    rentals: [{ lbl: "Heritage Stay", yield: "9.2%", w: "98%" }, { lbl: "Luxury Apts", yield: "3.8%", w: "70%" }],
    invTotal: "28.5K", invYoy: "+11.4%",
    devs: [{ name: "Mahima Grp", logo: "MG", type: "Premium Residential", rera: "RJ/01/2016", num: "22", exp: "20+", sold: "15k+", proj: ["Panorama", "Elanza"] }]
  },
  'gangtok': {
    insightsTitle: "Gangtok Urban",
    bars: [{ loc: "MG Marg", val: "₹12,500", pct: "90%", change: "↑ 5.2%", dir: "up" }],
    trend: [10, 25, 45, 75, 110],
    rentals: [{ lbl: "Tourism Rent", yield: "8.5%", w: "95%" }],
    invTotal: "2.1K", invYoy: "+6.1%",
    devs: [{ name: "Sikkim Prop", logo: "SP", type: "Hillside Luxury", rera: "SK/01/2021", num: "4", exp: "8+", sold: "300+", proj: ["View Heights", "Rumtek Hill"] }]
  },
  'chennai': {
    insightsTitle: "Chennai Greater",
    bars: [
      { loc: "OMR Road", val: "₹12,000", pct: "92%", change: "↑ 14.8%", dir: "up" },
      { loc: "Adyar", val: "₹22,000", pct: "95%", change: "↑ 5.2%", dir: "up" }
    ],
    trend: [35, 75, 130, 195, 270],
    rentals: [{ lbl: "IT Corridors", yield: "7.5%", w: "95%" }, { lbl: "Beachfront", yield: "3.1%", w: "55%" }],
    invTotal: "65.4K", invYoy: "+12.2%",
    devs: [{ name: "Casagrand", logo: "C", type: "Lifestyle Housing", rera: "TN/01/2012", num: "85", exp: "20+", sold: "40k+", proj: ["Western Ghats", "First City"] }]
  },
  'hyderabad': {
    insightsTitle: "Hyderabad GHMC",
    bars: [
      { loc: "Gachibowli", val: "₹11,000", pct: "95%", change: "↑ 18.5%", dir: "up" },
      { loc: "Jubilee Hills", val: "₹28,000", pct: "98%", change: "↑ 6.4%", dir: "up" }
    ],
    trend: [40, 85, 145, 220, 310],
    rentals: [{ lbl: "High-tech Park", yield: "8.4%", w: "98%" }, { lbl: "Gated Villas", yield: "3.5%", w: "65%" }],
    invTotal: "75.4K", invYoy: "+20.1%",
    devs: [{ name: "My Home Grp", logo: "MH", type: "Mega Projects", rera: "TG/01/2010", num: "25", exp: "30+", sold: "30k+", proj: ["The Peak", "Avatar"] }]
  },
  'agartala': {
    insightsTitle: "Agartala Urban",
    bars: [{ loc: "Akhaura Road", val: "₹5,500", pct: "80%", change: "↑ 4.2%", dir: "up" }],
    trend: [5, 15, 30, 55, 85],
    rentals: [{ lbl: "Govt Lease", yield: "3.5%", w: "70%" }],
    invTotal: "3.2K", invYoy: "+4.5%",
    devs: [{ name: "Tripura Realty", logo: "TR", type: "City Integrated", rera: "TR/01/2021", num: "5", exp: "10+", sold: "1k+", proj: ["Royal Plaza", "Ujjayanta"] }]
  },
  'lucknow': {
    insightsTitle: "Lucknow LMC",
    bars: [
      { loc: "Gomti Nagar", val: "₹8,500", pct: "90%", change: "↑ 11.2%", dir: "up" },
      { loc: "Noida Sec 150", val: "₹15,000", pct: "85%", change: "↑ 18.4%", dir: "up" }
    ],
    trend: [25, 55, 95, 145, 210],
    rentals: [{ lbl: "Institutional", yield: "6.2%", w: "85%" }, { lbl: "Premium Highrise", yield: "4.1%", w: "75%" }],
    invTotal: "45.4K", invYoy: "+14.8%",
    devs: [{ name: "Eldeco", logo: "E", type: "Quality Housing", rera: "UP/01/2016", num: "65", exp: "35+", sold: "40k+", proj: ["Green Villas", "Imperial"] }]
  },
  'dehradun': {
    insightsTitle: "Dehradun Urban",
    bars: [{ loc: "Rajpur Road", val: "₹14,000", pct: "92%", change: "↑ 8.5%", dir: "up" }],
    trend: [15, 35, 65, 105, 155],
    rentals: [{ lbl: "Retirement Homes", yield: "4.5%", w: "70%" }, { lbl: "Tourism Stay", yield: "8.2%", w: "95%" }],
    invTotal: "8.5K", invYoy: "+10.2%",
    devs: [{ name: "Pacific Grp", logo: "PG", type: "Integrated Living", rera: "UT/01/2017", num: "12", exp: "20+", sold: "5k+", proj: ["Golf Estate", "Residency"] }]
  },
  'kolkata': {
    insightsTitle: "Kolkata KMC",
    bars: [
      { loc: "New Town", val: "₹9,500", pct: "88%", change: "↑ 15.2%", dir: "up" },
      { loc: "Ballygunge", val: "₹22,000", pct: "95%", change: "↑ 4.8%", dir: "up" }
    ],
    trend: [25, 55, 95, 140, 200],
    rentals: [{ lbl: "IT SEZ", yield: "7.8%", w: "90%" }, { lbl: "Luxury Sky", yield: "3.0%", w: "50%" }],
    invTotal: "55.4K", invYoy: "+11.5%",
    devs: [{ name: "Mani Group", logo: "MG", type: "Landmark Projects", rera: "WB/01/2015", num: "35", exp: "40+", sold: "20k+", proj: ["The 42", "Imperial"] }]
  }
};
