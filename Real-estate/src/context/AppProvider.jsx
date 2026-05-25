import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppContext } from './AppContext';
import { apiService } from '../services/apiService';
import { rentalProperties as initialRentals } from '../data/rentals';
import { companies as initialCompanies } from '../data/companies';
import { agents as initialAgents } from '../data/agents';
import { plots as initialPlots } from '../data/plots';
import { states as localStates, cities as localCities } from '../data/locations';

export const AppProvider = ({ children }) => {
  const [view, setView] = useState('home'); 
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('India');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [comparisonList, setComparisonList] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    type: 'Any Type', budget: 'Any Budget', bhk: 'Any BHK', status: 'Any Status'
  });
  
  const [states, setStates] = useState(localStates);
  const [cities, setCities] = useState(localCities);
  
  const [rentals, setRentals] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── AUTHENTICATION STATE ──────────────────────────────────────────────────
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // ── ADMIN STATE ───────────────────────────────────────────────────────────
  const [allUsers, setAllUsers] = useState([]);
  const [adminStats, setAdminStats] = useState({ totalGmv: '₹0', growth: '0%' });
  const [allInquiries, setAllInquiries] = useState([]);

  // ── INITIAL DATA BOOTSTRAP ────────────────────────────────────────────────
  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true);
      try {
          // We strictly use the local states for the UI to match the navbar
          setStates(localStates);

          setRentals(initialRentals);
          setCompanies(initialCompanies);
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
        // Strictly filter from our verified local city list
        setCities(localCities.filter(c => c.stateId === selectedState));
      } else {
        // Show all verified cities from our list
        setCities(localCities);
      }
    };
    syncCities();
  }, [selectedState]);

  // ── REFRESH DATA ──────────────────────────────────────────────────────────
  const refreshData = useCallback(async (user) => {
    if (!user) return;
    
    try {
        // Fetch personal inquiries for any logged in user
        const myInqRes = await apiService.getMyInquiries();
        if (myInqRes.success) setUser(prev => ({ ...prev, inquiries: myInqRes.data }));

        if (user.role === 'ADMIN') {
            const usersRes = await apiService.getAllUsers();
            if (usersRes.success) setAllUsers(usersRes.data);

            const inqRes = await apiService.getInquiries();
            if (inqRes.success) setAllInquiries(inqRes.data);

            const metricsRes = await apiService.getPlatformMetrics();
            if (metricsRes.success) setAdminStats(metricsRes.data);
            
            const contRes = await apiService.getContractors();
            if (contRes.success) setContractors(contRes.data);
        }
    } catch (err) {
        console.error("Refresh Data Error:", err);
    }
  }, []);

  // ── AUTH ACTIONS ──────────────────────────────────────────────────────────
  const loginAction = async (email, password) => {
    const res = await apiService.login(email, password);
    if (res.success) {
      setToken(res.token);
      setUser(res.user);
      setIsLoggedIn(true);
      refreshData(res.user);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setView('home');
  };

  const registerAction = async (userData) => {
    const res = await apiService.register(userData);
    if (res.success) {
      setToken(res.token);
      setUser(res.user);
      setIsLoggedIn(true);
      refreshData(res.user);
    }
    return res;
  };

  const updateProfileAction = async (data) => {
    const res = await apiService.updateProfile(data);
    if (res.success) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    return res;
  };

  // ── ADMIN ACTIONS ──────────────────────────────────────────────────────────
  const toggleUserStatus = async (id) => {
    // API call placeholder
    setAllUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  const deleteUserAction = async (id) => {
    // API call placeholder
    setAllUsers(prev => prev.filter(u => u.id !== id));
  };

  const approveContractorAction = async (id) => {
    // API call placeholder
    setAllUsers(prev => prev.map(u => u.id === id ? { ...u, role: 'CONTRACTOR' } : u));
  };

  // ── INQUIRY ACTIONS ────────────────────────────────────────────────────────
  const submitInquiryAction = async (data) => {
    const res = await apiService.submitInquiry(data);
    if (res.success) refreshData(user);
    return res;
  };

  const updateInquiryStatusAction = async (id, status) => {
    const res = await apiService.updateInquiryStatus(id, status);
    if (res.success) refreshData(user);
    return res;
  };

  const appointContractorAction = async (inquiryId, contractorId) => {
    const res = await apiService.appointContractor(inquiryId, contractorId);
    if (res.success) refreshData(user);
    return res;
  };

  // ── CONTEXT VALUE ──────────────────────────────────────────────────────────
  const value = useMemo(() => ({
    view, setView,
    selectedState, setSelectedState,
    selectedCity, setSelectedCity,
    selectedProperty, setSelectedProperty,
    comparisonList, setComparisonList,
    searchFilters, setSearchFilters,
    states, cities, loading, rentals, contractors, companies, plots,
    user, isLoggedIn, loginAction, logout, registerAction, updateProfileAction,
    allUsers, adminStats, allInquiries, toggleUserStatus, deleteUserAction, approveContractorAction,
    submitInquiryAction, updateInquiryStatusAction, appointContractorAction
  }), [
    view, selectedState, selectedCity, selectedProperty, comparisonList, searchFilters,
    states, cities, loading, rentals, contractors, companies, plots,
    user, isLoggedIn, allUsers, adminStats, allInquiries,
    loginAction, logout, registerAction, updateProfileAction,
    submitInquiryAction, updateInquiryStatusAction, appointContractorAction,
    deleteUserAction, toggleUserStatus, approveContractorAction
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
