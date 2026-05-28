import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppContext } from './AppContext';
import { apiService } from '../services/apiService';
import { companies as initialCompanies } from '../data/companies';
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
  
  const [contractors, setContractors] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── AUTHENTICATION STATE ──────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // ── ADMIN STATE ───────────────────────────────────────────────────────────
  const [allUsers, setAllUsers] = useState([]);
  const [adminStats, setAdminStats] = useState({ totalGmv: '₹0', growth: '0%' });
  const [allInquiries, setAllInquiries] = useState([]);

  // ── NAV SETTINGS (Visibility Controls) ──────────────────────────────────
  const [navSettings, setNavSettings] = useState(() => {
    const saved = localStorage.getItem('navSettings');
    return saved ? JSON.parse(saved) : { showProjects: true, showPress: true };
  });

  const updateNavSettings = (newSettings) => {
    const updated = { ...navSettings, ...newSettings };
    setNavSettings(updated);
    localStorage.setItem('navSettings', JSON.stringify(updated));
  };

  // ── INITIAL DATA BOOTSTRAP ────────────────────────────────────────────────
  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true);
      try {
          // Always use local verified states and cities from locations.js
          setStates(localStates);
          setCities(localCities);

          setCompanies(initialCompanies);

          const savedUser = localStorage.getItem('user');
          if (savedUser) setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
          console.error("Bootstrap Error:", err);
          setStates(localStates);
          setCities(localCities);
      } finally {
          setLoading(false);
      }
    };
    bootstrap();
  }, []);

  // ── LOCATION SYNC ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (selectedState) {
      setCities(localCities.filter(c => c.stateId === selectedState));
    } else {
      setCities(localCities);
    }
  }, [selectedState]);

  // ── REFRESH DATA ──────────────────────────────────────────────────────────
  const refreshData = useCallback(async (userObj) => {
    if (!userObj) return;
    
    try {
        // Fetch personal inquiries for any logged in user
        const myInqRes = await apiService.getMyInquiries();
        if (myInqRes.success) setCurrentUser(prev => ({ ...prev, inquiries: myInqRes.data }));

        if (userObj.role === 'ADMIN') {
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
  const login = async (email, password) => {
    const res = await apiService.login(email, password);
    if (res.success) {
      setToken(res.token);
      setCurrentUser(res.user);
      setIsLoggedIn(true);
      refreshData(res.user);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
    setView('home');
  };

  const register = async (userData) => {
    const res = await apiService.register(userData);
    if (res.success) {
      setToken(res.token);
      setCurrentUser(res.user);
      setIsLoggedIn(true);
      refreshData(res.user);
    }
    return res;
  };

  const updateProfileAction = async (data) => {
    const res = await apiService.updateProfile(data);
    if (res.success) {
        const updatedUser = { ...currentUser, ...data };
        setCurrentUser(updatedUser);
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
    if (res.success) refreshData(currentUser);
    return res;
  };

  const updateInquiryStatusAction = async (id, status) => {
    const res = await apiService.updateInquiryStatus(id, status);
    if (res.success) refreshData(currentUser);
    return res;
  };

  const appointContractorAction = async (inquiryId, contractorId) => {
    const res = await apiService.appointContractor(inquiryId, contractorId);
    if (res.success) refreshData(currentUser);
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
    states, cities, allCities: localCities, loading, contractors, companies,
    currentUser, isLoggedIn, login, logout, register, updateProfileAction,
    allUsers, adminStats, allInquiries, toggleUserStatus, deleteUserAction, approveContractorAction,
    submitInquiryAction, updateInquiryStatusAction, appointContractorAction,
    navSettings, updateNavSettings
    }), [
    view, selectedState, selectedCity, selectedProperty, comparisonList, searchFilters,
    states, cities, loading, contractors, companies,
    currentUser, isLoggedIn, allUsers, adminStats, allInquiries,
    login, logout, register, updateProfileAction,
    submitInquiryAction, updateInquiryStatusAction, appointContractorAction,
    deleteUserAction, toggleUserStatus, approveContractorAction,
    navSettings
    ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
