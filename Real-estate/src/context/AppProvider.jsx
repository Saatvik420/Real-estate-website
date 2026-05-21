import React, { useState, useEffect, useCallback } from 'react';
import { AppContext } from './AppContext';
import { apiService } from '../services/apiService';
import { rentalProperties as initialRentals } from '../data/rentals';
import { contractors as initialContractors } from '../data/contractors';
import { companies as initialCompanies } from '../data/companies';
import { agents as initialAgents } from '../data/agents';
import { plots as initialPlots } from '../data/plots';

export const AppProvider = ({ children }) => {
  const [view, setView] = useState('home'); 
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('India');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [comparisonList, setComparisonList] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status'
  });
  
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Authentication & Session
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); 
  const [authToken, setAuthToken] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  // Data Persistence
  const [rentals, setRentals] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [agents, setAgents] = useState([]);
  const [plots, setPlots] = useState([]);
  const [allInquiries, setAllInquiries] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Admin Metrics
  const [adminStats, setAdminStats] = useState({
      totalGmv: '₹14,200 Cr', activeUsers: 0, pendingApprovals: 0, conversionRate: '0%', growth: '0%'
  });

  // ── DATA REFRESH ────────────────────────────────────────────────────────
  const refreshData = useCallback(async (user) => {
    if (!user) return;
    
    try {
        // Fetch personal inquiries for any logged in user
        const myInqRes = await apiService.getMyInquiries();
        if (myInqRes.success) {
            setAllInquiries(myInqRes.data || []);
        }

        // Fetch admin-specific data if applicable
        if (user.role === 'ADMIN') {
            const [inqRes, contRes, metricsRes, usersRes] = await Promise.all([
                apiService.getInquiries(),
                apiService.getContractors(),
                apiService.getPlatformMetrics(),
                apiService.getAllUsers()
            ]);

            if (inqRes.success) setAllInquiries(inqRes.data || []);
            if (contRes.success) setContractors(contRes.data || []);
            if (metricsRes.success) setAdminStats({ ...metricsRes.data });
            if (usersRes.success) setAllUsers(usersRes.data || []);
        }
    } catch (err) {
        console.error("Data refresh error:", err);
    }
  }, []);

  // ── SESSION RECOVERY ──────────────────────────────────────────────────────
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const savedWishlist = JSON.parse(localStorage.getItem('be_wishlist')) || [];
    if (savedToken && savedUser) {
        setAuthToken(savedToken);
        setCurrentUser(savedUser);
        setIsLoggedIn(true);
        refreshData(savedUser); // Fetch data for recovered session
    }
    setWishlist(savedWishlist);
  }, [refreshData]);

  // ── INITIAL DATA BOOTSTRAP ────────────────────────────────────────────────
  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true);
      try {
          const stateRes = await apiService.getStates();
          if (stateRes.success) setStates(stateRes.data);

          setRentals(initialRentals);
          setCompanies(initialCompanies);
          setAgents(initialAgents);
          setPlots(initialPlots);
      } catch (err) {
          console.error("Bootstrap Error:", err);
      } finally {
          setLoading(false);
      }
    };
    bootstrap();
  }, []);

  // ── LOCATION SYNC ─────────────────────────────────────────────────────────
  useEffect(() => {
    const syncCities = async () => {
      if (selectedState) {
        const res = await apiService.getCities(selectedState);
        if (res.success) setCities(res.data);
      } else {
        const res = await apiService.getCities();
        if (res.success) setCities(res.data);
      }
    };
    syncCities();
  }, [selectedState]);

  // ── AUTH ACTIONS ──────────────────────────────────────────────────────────
  const loginAction = async (email, password) => {
    setLoading(true);
    const res = await apiService.login(email, password);
    setLoading(false);
    
    if (res.success) {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        setAuthToken(res.token);
        await refreshData(res.user); // Fetch data immediately after login
    }
    return res;
  };

  const logoutAction = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setView('home');
    window.location.href = '/'; // Force immediate redirect to homepage
  }, []);

  const registerAction = async (userData, role = 'USER') => {
    setLoading(true);
    const res = await apiService.register({ ...userData, role });
    setLoading(false);
    if (res.success) {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        setAuthToken(res.token);
        await refreshData(res.user); // Fetch data immediately after registration
    }
    return res;
  };

  // ── BUSINESS ACTIONS ──────────────────────────────────────────────────────
  const toggleWishlist = (propertyId) => {
      setWishlist(prev => {
          const updated = prev.includes(propertyId) 
            ? prev.filter(id => id !== propertyId) 
            : [...prev, propertyId];
          localStorage.setItem('be_wishlist', JSON.stringify(updated));
          return updated;
      });
  };

  const submitInquiryAction = async (data) => {
      const res = await apiService.submitInquiry(data);
      if (res.success) {
          setAllInquiries(prev => [res.data, ...prev]);
          return true;
      }
      return false;
  };

  const updateInquiryStatusAction = async (id, status) => {
      const res = await apiService.updateInquiryStatus(id, status);
      if (res.success) {
          setAllInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
      }
  };

  const appointContractorAction = async (inquiryId, contractorId) => {
      const res = await apiService.appointContractor(inquiryId, contractorId);
      if (res.success) {
          setAllInquiries(prev => prev.map(i => i.id === inquiryId ? res.data : i));
          return true;
      }
      return false;
  };

  // ── PROFILE ACTIONS ──────────────────────────────────────────────────────
  const updateProfileAction = async (data) => {
      setLoading(true);
      const res = await apiService.updateProfile(data);
      if (res.success) {
          setCurrentUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
      }
      setLoading(false);
      return res.success;
  };

  // ── ADMIN ACTIONS ──────────────────────────────────────────────────────────
  const deleteUserAction = async (userId) => {
    const res = await apiService.deleteUser(userId);
    if (res.success) {
        setAllUsers(prev => prev.filter(u => u.id !== userId));
        return true;
    }
    return false;
  };

  const toggleUserStatus = async (userId) => {
    const res = await apiService.updateUserStatus(userId, 'Toggled');
    if (res.success) {
        // Refresh users list if needed
    }
  };

  const approveContractorAction = async (contId) => {
    const res = await apiService.approvePartner(contId);
    if (res.success) {
        setContractors(prev => prev.map(c => c.id === contId ? { ...c, status: 'Active' } : c));
        return true;
    }
    return false;
  };

  const value = {
    view, setView,
    selectedState, setSelectedState,
    selectedCity, setSelectedCity,
    selectedProperty, setSelectedProperty,
    comparisonList, setComparisonList,
    searchFilters, setSearchFilters,
    states, cities,
    loading, setLoading,
    rentals, contractors, companies, agents, plots,
    isLoggedIn, currentUser, authToken,
    login: loginAction, register: registerAction, logout: logoutAction,
    allUsers, adminStats, allInquiries, wishlist, toggleWishlist,
    submitInquiryAction, updateInquiryStatusAction, appointContractorAction,
    deleteUserAction, toggleUserStatus, approveContractorAction, updateProfileAction
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
