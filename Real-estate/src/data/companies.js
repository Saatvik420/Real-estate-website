import sss1Img from '../assets/images_project/Shree shyam sarovar.jpeg';
import sss2Img from '../assets/images_project/Shree Shyam Sarovar II.jpeg';
import anVid from '../assets/images_project/Aadinath nagar 1.mp4';
import mvVid from '../assets/images_project/Mayur Vihar.mp4';
import hvImg from '../assets/images_project/Hanumant_vihar.jpg';

export const companies = [
  {
    id: 'one5-realty',
    name: 'One5 Realty Group',
    logo: '15',
    type: 'Spiritual & Luxury',
    rera: 'RJ/2023/101',
    experience: '28+',
    unitsSold: '2k+',
    activeProjects: 5,
    projects: [
      {
        id: 'proj_sss1',
        cityId: 'khatu_shyam',
        name: 'Shree Shyam Sarovar-I',
        type: 'Residential',
        location: 'Abhawas, Ringas Road, Khatu Shyam',
        areaRange: '100 - 300 sq yards',
        priceRange: '₹15 L - ₹45 L',
        status: 'Completed',
        possession: 'Ready',
        img: sss1Img,
        pdfUrl: '/projects/shree-shyam-sarovar-1.pdf',
        description: 'A meticulously planned gated township near the holy shrine of Khatu Shyam. Features wide black-top roads, modern drainage, and extensive green belts for a premium lifestyle.',
        amenities: ['24/7 Security', 'Wide Roads', 'Water Supply', 'Lush Green Parks']
      },
      {
        id: 'proj_sss2',
        cityId: 'khatu_shyam',
        name: 'Shree Shyam Sarovar-II',
        type: 'Residential',
        location: 'Kerpura, Teh. Danta Ramgarh, Sikar',
        areaRange: '150 - 350 sq yards',
        priceRange: '₹20 L - ₹60 L',
        status: 'New Launch',
        possession: '2025',
        img: sss2Img,
        pdfUrl: '/projects/shree-shyam-sarovar-2.pdf',
        description: 'The second phase of our landmark township series. Designed with a focus on community living, featuring a dedicated clubhouse and children\'s play zones.',
        amenities: ['Clubhouse', 'Play Area', 'Gated Community', 'Street Lighting']
      },
      {
        id: 'proj_an',
        cityId: 'ajmer_road',
        name: 'Aadinath Nagar',
        type: 'Residential',
        location: 'Jaipur-Ajmer Expressway, Dudu',
        areaRange: '100 - 250 sq yards',
        priceRange: '₹10 L - ₹30 L',
        status: 'Ongoing',
        possession: '2024',
        img: anVid,
        pdfUrl: '/projects/aadinath nagar.pdf',
        description: 'Strategically located on the thriving Jaipur-Ajmer Expressway. This development offers premium highway-touch land parcels with immediate access to industrial hubs.',
        amenities: ['Highway Proximity', 'Commercial Zone', 'Green Belts', 'Security Gate']
      },
      {
        id: 'proj_mv',
        cityId: 'jaipur',
        name: 'Mayur Vihar',
        type: 'Residential',
        location: 'Village Panwaliya, Sanganer, Jaipur',
        areaRange: '120 - 300 sq yards',
        priceRange: '₹12 L - ₹35 L',
        status: 'Verified',
        possession: 'Ready',
        img: mvVid,
        pdfUrl: '/projects/mayur-vihar.pdf',
        description: 'A boutique plotted development in the heart of Sanganer. Close to educational and healthcare facilities, providing an ideal base for modern home construction.',
        amenities: ['School Proximity', 'Market Access', 'Underground Utilities', 'Community Center']
      },
      {
        id: 'proj_hv',
        cityId: 'vrindavan',
        name: 'Hanumant Vihar',
        type: 'Residential',
        location: 'Radha Kund-Ral Road, Vrindavan, Mathura',
        areaRange: '150 - 400 sq yards',
        priceRange: '₹25 L - ₹75 L',
        status: 'Premium',
        possession: '2026',
        img: hvImg,
        pdfUrl: '/projects/hanumant-vihar.pdf',
        description: 'Experience spiritual peace in a luxury gated enclave. Located on the sacred Radha Kund-Ral Road, featuring themed parks and meditation spaces.',
        amenities: ['Spiritual Centers Nearby', 'Gated Security', 'Theme Parks', 'Meditation Zones']
      }
    ]
  }
];
