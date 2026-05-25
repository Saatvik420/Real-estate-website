import { agents as localAgents } from '../data/agents';
import { properties as localProperties } from '../data/properties';
import { rentalProperties as localRentals } from '../data/rentals';
import { marketInsights as localInsights } from '../data/insights';
import { plots as localPlots } from '../data/plots';
import { companies as localCompanies } from '../data/companies';

// ── CORE CONFIGURATION ──────────────────────────────────────────────────────
const getApiBaseUrl = () => {
    // In production (Netlify), VITE_API_URL should be set to the Render backend URL
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl) {
        return envUrl.replace(/\/$/, '') + '/api';
    }
    // In development, use relative path to leverage Vite proxy
    return '/api';
};

const API_BASE_URL = getApiBaseUrl();

// ── UTILITY: STANDARDIZED API WRAPPER ────────────────────────────────────────
const handleResponse = async (response) => {
    try {
        const contentType = response.headers.get("content-type");
        let data = null;
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        }

        if (!response.ok) {
            // Priority 1: Backend provided message (e.g., 'Authentication failed: User not found')
            // Priority 2: Standard 401 message
            // Priority 3: Generic server error
            const errorMessage = data?.message || (response.status === 401 ? 'Invalid credentials.' : `Server error: ${response.status}`);
            return { success: false, data: null, error: errorMessage };
        }

        return { success: true, data, error: null };
    } catch (error) {
        console.error("API Response Parsing Error:", error);
        return { success: false, data: null, error: 'Failed to process server response.' };
    }
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

// Helper to handle fetch errors (network issues)
const safeFetch = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        return await handleResponse(response);
    } catch (error) {
        console.warn("Network/Connection Error:", error);
        return { 
            success: false, 
            data: null, 
            error: 'Server unreachable. Falling back to local data.' 
        };
    }
};

// Helper to consolidate ALL local data (Buy, Rent, Plots, Projects)
const getMergedLocalData = () => {
    const normalizedProperties = localProperties.map(p => ({ 
        ...p, 
        listingType: p.listingType || 'Buy' 
    }));
    const normalizedRentals = localRentals.map(p => ({ 
        ...p, 
        listingType: p.listingType || 'Rent' 
    }));
    const normalizedPlots = localPlots.map(p => ({ 
        ...p, 
        listingType: p.listingType || 'Plots / Land' 
    }));
    
    // Extract projects from companies
    const normalizedProjects = [];
    localCompanies.forEach(comp => {
        comp.projects.forEach(proj => {
            normalizedProjects.push({
                ...proj,
                id: proj.id,
                title: proj.name,
                listingType: 'Projects',
                priceStr: proj.priceRange,
                area: proj.areaRange,
                developer: comp.name,
                tags: proj.amenities || []
            });
        });
    });

    return [...normalizedProperties, ...normalizedRentals, ...normalizedPlots, ...normalizedProjects];
};

export const apiService = {
  // ── CORE DATA METHODS ──────────────────────────────────────────────────────

  getStates: async () => {
    const res = await safeFetch(`${API_BASE_URL}/locations/states`);
    if (res.success) return res;
    return { success: true, data: [] }; 
  },

  getCities: async (stateId) => {
    const url = stateId ? `${API_BASE_URL}/locations/cities?stateId=${stateId}` : `${API_BASE_URL}/locations/cities`;
    const res = await safeFetch(url);
    if (res.success) return res;
    return { success: true, data: [] };
  },

  getProperties: async (filters = {}) => {
    let apiData = [];
    const params = new URLSearchParams();
    if (filters.listingType) params.append('listingType', filters.listingType);
    if (filters.cityId) params.append('cityId', filters.cityId);
    if (filters.type) params.append('type', filters.type);
    if (filters.status) params.append('status', filters.status);

    const res = await safeFetch(`${API_BASE_URL}/properties?${params.toString()}`);
    if (res.success && res.data) {
        apiData = res.data;
    }

    const localData = getMergedLocalData();
    const merged = [...apiData];
    
    localData.forEach(localItem => {
        if (!merged.find(apiItem => apiItem.id === localItem.id)) {
            merged.push(localItem);
        }
    });

    let filtered = merged;

    if (filters.listingType) {
        const searchType = filters.listingType.toLowerCase();
        filtered = filtered.filter(p => {
            const pType = (p.listingType || '').toLowerCase();
            
            if (searchType.includes('buy') || searchType.includes('sale')) {
                return pType.includes('buy') || pType.includes('sale') || pType === '';
            }
            if (searchType.includes('plot')) {
                return pType.includes('plot');
            }
            if (searchType.includes('rent')) {
                return pType.includes('rent');
            }
            if (searchType.includes('project')) {
                return pType.includes('project');
            }
            return pType === searchType;
        });
    }

    if (filters.cityId && filters.cityId !== 'India' && filters.cityId !== 'All') {
        filtered = filtered.filter(p => p.cityId?.toLowerCase() === filters.cityId.toLowerCase());
    }
    if (filters.type && filters.type !== 'Any Type') {
        filtered = filtered.filter(p => p.type === filters.type);
    }
    if (filters.status && filters.status !== 'Any Status') {
        filtered = filtered.filter(p => p.status === filters.status);
    }
    if (filters.bhk && filters.bhk !== 'Any BHK') {
        filtered = filtered.filter(p => p.tags && p.tags.some(t => t.includes(filters.bhk)));
    }

    // Handlers for trending/featured if no city/type is specified
    if (filters.trendingOnly && filtered.length === 0) {
        filtered = localData.slice(0, 8);
    }
    if (filters.featuredOnly && filtered.length === 0) {
        filtered = localData.slice(4, 12);
    }

    return { success: true, data: filtered };
  },

  getPropertyById: async (id) => {
    const res = await safeFetch(`${API_BASE_URL}/properties/${id}`);
    if (res.success && res.data) return res;

    const localData = getMergedLocalData();
    const local = localData.find(p => p.id === id);
    return local ? { success: true, data: local } : { success: false, error: 'Property not found.' };
  },

  getRecommendedProperties: async (locationId, type = 'city') => {
    // If no specific location, return a broad set of trending properties
    const res = await apiService.getProperties({ 
        cityId: locationId === 'India' ? '' : locationId 
    });
    
    if (res.success && res.data.length >= 4) return res;
    
    // Fallback to a diverse set of local data
    return { success: true, data: getMergedLocalData().slice(0, 8) };
  },

  getMarketInsights: async (locationId, locationType = 'city') => {
    const res = await safeFetch(`${API_BASE_URL}/insights?locationId=${locationId}&type=${locationType}`);
    // Check both the fetch success and the API's internal success flag
    if (res.success && res.data && res.data.success !== false) return res;
    
    console.log(`Falling back to local insights for ${locationId}`);
    const data = localInsights[locationId] || localInsights['India'];
    return { success: true, data };
  },

  // ── AUTH & USER METHODS ────────────────────────────────────────────────────

  login: async (email, password) => {
      const res = await safeFetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
      });
      if (res.success && res.data) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          return { success: true, user: res.data.user, token: res.data.token };
      }
      return { success: false, message: res.error || 'Login failed' };
  },

  register: async (userData) => {
    const res = await safeFetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (res.success && res.data) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return { success: true, user: res.data.user, token: res.data.token };
    }
    return { success: false, message: res.error || 'Registration failed' };
},

  updateProfile: async (profileData) => {
    return await safeFetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(profileData)
    });
  },

  getCurrentUser: async () => {
    return await safeFetch(`${API_BASE_URL}/users/me`, {
        headers: getHeaders()
    });
  },

  // ── ADMIN & PERSISTENCE METHODS ──────────────────────────────────────────

  getAllUsers: async () => {
    return await safeFetch(`${API_BASE_URL}/admin/users`, {
        headers: getHeaders()
    });
  },

  getContractors: async () => {
    return await safeFetch(`${API_BASE_URL}/inquiries/admin/contractors`, {
        headers: getHeaders()
    });
  },

  // ── INQUIRY & LEAD METHODS ────────────────────────────────────────────────

  submitInquiry: async (inquiryData) => {
    return await safeFetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(inquiryData)
    });
  },

  getInquiries: async () => {
    return await safeFetch(`${API_BASE_URL}/inquiries/admin/all`, {
        headers: getHeaders()
    });
  },

  getMyInquiries: async () => {
    return await safeFetch(`${API_BASE_URL}/inquiries/me`, {
        headers: getHeaders()
    });
  },

  appointContractor: async (inquiryId, contractorId) => {
    return await safeFetch(`${API_BASE_URL}/inquiries/admin/${inquiryId}/appoint/${contractorId}`, {
        method: 'PUT',
        headers: getHeaders()
    });
  },

  updateInquiryStatus: async (id, status) => {
    return await safeFetch(`${API_BASE_URL}/inquiries/${id}/status?status=${status}`, {
        method: 'PUT',
        headers: getHeaders()
      });
  },

  getPlatformMetrics: async () => {
    return await safeFetch(`${API_BASE_URL}/admin/metrics`, {
        headers: getHeaders()
    });
  }
};
