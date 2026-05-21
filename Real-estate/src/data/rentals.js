import { agents } from './agents';

export const rentalProperties = [
  // Andaman and Nicobar
  {
    id: 'rent_an_1', cityId: 'port_blair', type: 'Beachfront Flat', title: 'Port Blair Sea View', price: 35000, priceStr: '₹35 K / mo', area: '1200 sqft', location: 'Aberdeen', developer: 'Island Icon', status: 'Ready to Move', tags: ['Sea View', '2 BHK'], img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    agentId: 'agent_5', section: 'Coastal Rentals'
  },
  {
    id: 'rent_an_2', cityId: 'havelock', type: 'Luxury Cabin', title: 'Havelock Island Stay', price: 55000, priceStr: '₹55 K / mo', area: '800 sqft', location: 'Radhanagar Beach', developer: 'Island Icon', status: 'Ready to Move', tags: ['Beachfront', '1 BHK'], img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    agentId: 'agent_5', section: 'Tourism Housing'
  },

  // Andhra Pradesh
  {
    id: 'rent_ap_1', cityId: 'visakhapatnam', type: 'Luxury Apartment', title: 'Vizag Harbor Suites', price: 45000, priceStr: '₹45 K / mo', area: '1800 sqft', location: 'Beach Road', developer: 'Coastal Prop', status: 'Ready to Move', tags: ['Sea View', '3 BHK'], img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    agentId: 'agent_5', section: 'Coastal Living'
  },
  
  // Delhi
  {
    id: 'rent_dl_1', cityId: 'delhi', type: 'Luxury Apartment', title: 'Central Delhi Executive', price: 150000, priceStr: '₹1.5 L / mo', area: '2200 sqft', location: 'Prithviraj Road', developer: 'Capital Dev', status: 'Ready to Move', tags: ['Ultra Luxury', '4 BHK'], img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    agentId: 'agent_2', section: 'Diplomatic Zone'
  },

  // Gurugram
  {
    id: 'rent_hr_1', cityId: 'gurugram', type: 'Corporate Suite', title: 'Golf Course Road Luxury', price: 120000, priceStr: '₹1.2 L / mo', area: '2200 sqft', location: 'Golf Course Road', developer: 'M3M India', status: 'Ready to Move', tags: ['Golf View', '4 BHK'], img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    agentId: 'agent_3', section: 'MNC Housing'
  },

  // Karnataka
  {
    id: 'rent_ka_1', cityId: 'bengaluru', type: 'IT Corridor Suite', title: 'Whitefield Tech Stay', price: 75000, priceStr: '₹75 K / mo', area: '1600 sqft', location: 'Whitefield', developer: 'Prestige Group', status: 'Ready to Move', tags: ['IT Hub', '3 BHK'], img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    agentId: 'agent_4', section: 'Corporate Housing'
  },

  // Maharashtra
  {
    id: 'rent_mh_1', cityId: 'mumbai', type: 'Ultra Luxury Suite', title: 'SoBo Marine Drive Rent', price: 280000, priceStr: '₹2.8 L / mo', area: '3500 sqft', location: 'Marine Drive', developer: 'Lodha Group', status: 'Ready to Move', tags: ['Sea View', '5+ BHK'], img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    agentId: 'agent_1', section: 'Ultra Luxury'
  },

  // West Bengal
  {
    id: 'rent_wb_1', cityId: 'kolkata', type: 'Luxury Apartment', title: 'Kolkata New Town Stay', price: 65000, priceStr: '₹65 K / mo', area: '1800 sqft', location: 'New Town', developer: 'Mani Group', status: 'Ready to Move', tags: ['IT Hub', '3 BHK'], img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    agentId: 'agent_6', section: 'Urban Living'
  }
];

// Ensure all rentals have an agentId
rentalProperties.forEach(r => {
    if (!r.agentId) {
        r.agentId = agents[Math.floor(Math.random() * agents.length)].id;
    }
});
