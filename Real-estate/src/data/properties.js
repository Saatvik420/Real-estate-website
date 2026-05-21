import { agents } from './agents';

export const properties = [
  // UT - Andaman and Nicobar
  { id: 'an_p1', cityId: 'port_blair', type: 'Beachfront Villa', title: 'Emerald Bay Resort', price: 45000000, priceStr: '₹4.5 Cr', area: '3200 sqft', location: 'Aberdeen', developer: 'Island Icon', status: 'Ready to Move', tags: ['Sea View', 'Private Pool', '4 BHK'], img: 'https://images.unsplash.com/photo-1544161442-e3db36c4f67c?w=600&q=80', rera: 'AN/RERA/2022/01', agentId: 'agent_5' },
  { id: 'an_p2', cityId: 'havelock', type: 'Luxury Resort', title: 'Radhanagar Sands', price: 85000000, priceStr: '₹8.5 Cr', area: '5000 sqft', location: 'Radhanagar Beach', developer: 'Island Icon', status: 'Ready to Move', tags: ['Beachfront', 'Ultra Luxury', '5+ BHK'], img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', rera: 'AN/RERA/2022/05', agentId: 'agent_5' },

  // Andhra Pradesh
  { id: 'ap_p1', cityId: 'visakhapatnam', type: 'Luxury Apartment', title: 'Vizag Bay View', price: 15000000, priceStr: '₹1.5 Cr', area: '2200 sqft', location: 'Beach Road', developer: 'Coastal Prop', status: 'Ready to Move', tags: ['Sea View', '4 BHK'], img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', rera: 'AP/RERA/2021/01', agentId: 'agent_5' },
  { id: 'ap_v1', cityId: 'vijayawada', type: 'Independent Villa', title: 'Krishna Valley Villas', price: 35000000, priceStr: '₹3.5 Cr', area: '3500 sqft', location: 'Benz Circle', developer: 'Skyline Build', status: 'Under Construction', tags: ['Luxury', 'Private Pool', '5+ BHK'], img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', rera: 'AP/RERA/2022/05', agentId: 'agent_5' },

  // Bihar
  { id: 'br_p1', cityId: 'patna', type: 'Luxury Apartment', title: 'Maurya Vihar Residency', price: 12000000, priceStr: '₹1.2 Cr', area: '1800 sqft', location: 'Bailey Road', developer: 'Satyamev Grp', status: 'Ready to Move', tags: ['3 BHK', 'Near Metro'], img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', rera: 'BR/RERA/2021/01', agentId: 'agent_6' },
  
  // Delhi
  { id: 'dl_p1', cityId: 'delhi', type: 'Penthouse', title: 'Lutyens Skyline', price: 250000000, priceStr: '₹25 Cr', area: '5500 sqft', location: 'Prithviraj Road', developer: 'Capital Dev', status: 'Ready to Move', tags: ['Ultra Luxury', 'Prime Location', '5+ BHK'], img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', rera: 'DL/RERA/2019/08', agentId: 'agent_2' },
  
  // Gurugram
  { id: 'hr_p1', cityId: 'gurugram', type: 'Luxury Condominium', title: 'M3M Golf Estate', price: 65000000, priceStr: '₹6.5 Cr', area: '3800 sqft', location: 'Golf Course Road', developer: 'M3M India', status: 'Ready to Move', tags: ['Golf View', '4 BHK'], img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80', rera: 'HR/RERA/2017/22', agentId: 'agent_3' },

  // Karnataka
  { id: 'ka_p1', cityId: 'bengaluru', type: 'Luxury Apartment', title: 'Prestige Kingfisher Towers', price: 350000000, priceStr: '₹35 Cr', area: '8000 sqft', location: 'Lavelle Road', developer: 'Prestige Group', status: 'Ready to Move', tags: ['Penthouse', 'City View', '5+ BHK'], img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', rera: 'KA/RERA/2017/05', agentId: 'agent_4' },

  // Tamil Nadu
  { id: 'tn_p1', cityId: 'chennai', type: 'Luxury Apartment', title: 'Casagrand Zenith', price: 18000000, priceStr: '₹1.8 Cr', area: '2400 sqft', location: 'Medavakkam', developer: 'Casagrand', status: 'Under Construction', tags: ['Modern', 'Gated', '4 BHK'], img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', rera: 'TN/RERA/2022/15', agentId: 'agent_2' },

  // Telangana
  { id: 'ts_p1', cityId: 'hyderabad', type: 'Luxury Villa', title: 'My Home Avatar', price: 42000000, priceStr: '₹4.2 Cr', area: '4500 sqft', location: 'Narsingi', developer: 'My Home Group', status: 'Ready to Move', tags: ['Clubhouse', 'Private Garden', '5+ BHK'], img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', rera: 'TS/RERA/2021/09', agentId: 'agent_6' },

  // Maharashtra
  { id: 'mh_p1', cityId: 'mumbai', type: 'Luxury Apartment', title: 'Lodha World One', price: 240000000, priceStr: '₹24 Cr+', area: '5200 sqft', location: 'Lower Parel', developer: 'Lodha Group', status: 'Ready to Move', tags: ['5+ BHK', 'Sea View'], img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', rera: 'MH/RERA/2018/11', agentId: 'agent_1' },
  { id: 'mh_p2', cityId: 'pune', type: 'Independent Villa', title: 'Koregaon Estates', price: 65000000, priceStr: '₹6.5 Cr', area: '4200 sqft', location: 'Koregaon Park', developer: 'Lodha Group', status: 'Ready to Move', tags: ['Ultra Luxury', '4 BHK'], img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', rera: 'MH/RERA/2019/22', agentId: 'agent_1' },

  // West Bengal
  { id: 'wb_p1', cityId: 'kolkata', type: 'Luxury Apartment', title: 'New Town Heights', price: 15000000, priceStr: '₹1.5 Cr', area: '2200 sqft', location: 'New Town', developer: 'Mani Group', status: 'Ready to Move', tags: ['Modern', 'IT Hub', '3 BHK'], img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', rera: 'WB/RERA/2019/12', agentId: 'agent_6' }
];

// Re-assigning agentId to others to ensure coverage
properties.forEach(p => {
    if (!p.agentId) {
        p.agentId = agents[Math.floor(Math.random() * agents.length)].id;
    }
});
