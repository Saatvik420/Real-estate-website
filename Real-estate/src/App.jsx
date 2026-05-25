import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useApp } from './hooks/useApp';
import useScrollReveal from './hooks/useScrollReveal';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContinueSearch from './components/ContinueSearch';
import TrendingSection from './components/TrendingSection';
import PropertyRecommendations from './components/PropertyRecommendations';
import CompareProperties from './components/CompareProperties';
import Insights from './components/Insights';
import TopDevelopers from './components/TopDevelopers';
import PopularCities from './components/PopularCities';
import Services from './components/Services';
import HomePlan from './components/HomePlan';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import PropertyDetails from './components/PropertyDetails';
import FloatingCompareBar from './components/FloatingCompareBar';
import RentalsView from './components/RentalsView';
import ProjectsView from './components/ProjectsView';
import PlotsView from './components/PlotsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import PressView from './components/PressView';
import SupportView from './components/SupportView';
import PartnerView from './components/PartnerView';
import AuthView from './components/AuthView';
import PartnerAuthView from './components/PartnerAuthView';
import ContractorAuthView from './components/ContractorAuthView';
import UserProfile from './components/UserProfile';
import ContractorDashboard from './components/ContractorDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import AdminDashboard from './components/AdminDashboard';

import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimationTrigger = () => {
  useScrollReveal();
  return null;
};

const Home = () => (
  <>
    <Hero />
    <HomePlan />
    <ContinueSearch />
    <TrendingSection />
    <PropertyRecommendations />
    <TopDevelopers />
    <PopularCities />
    <Services />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimationTrigger />
      <div className="app-container">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/details" element={<PropertyDetails />} />
          <Route path="/compare" element={<CompareProperties />} />
          <Route path="/rent" element={<RentalsView />} />
          <Route path="/projects" element={<ProjectsView />} />
          <Route path="/plots" element={<PlotsView />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/press" element={<PressView />} />
          <Route path="/support" element={<SupportView />} />
          <Route path="/nri-corner" element={<AboutView />} /> {/* Placeholder until dedicated NRI view is created */}
          <Route path="/partner" element={<PartnerView />} />
          <Route path="/auth" element={<AuthView />} />
          <Route path="/partner-auth" element={<PartnerAuthView />} />
          <Route path="/contractor-auth" element={<ContractorAuthView />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/contractor-dashboard" element={<ContractorDashboard />} />
          <Route path="/partner-dashboard" element={<PartnerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <FloatingCompareBar />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
