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
import PopularCities from './components/PopularCities';
import Services from './components/Services';
import HomePlan from './components/HomePlan';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import PropertyDetails from './components/PropertyDetails';
import FloatingCompareBar from './components/FloatingCompareBar';
import WhatsAppButton from './components/WhatsAppButton';
import RentalsView from './components/RentalsView';
import ProjectsView from './components/ProjectsView';
import PlotsView from './components/PlotsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import PressView from './components/PressView';
import SupportView from './components/SupportView';
import NRIView from './components/NRIView';
import PartnerView from './components/PartnerView';
import AuthView from './components/AuthView';
import PartnerAuthView from './components/PartnerAuthView';
import ContractorAuthView from './components/ContractorAuthView';
import UserProfile from './components/UserProfile';
import ContractorDashboard from './components/ContractorDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import AdminDashboard from './components/AdminDashboard';
import PaymentView from './components/PaymentView';
import PlansView from './components/PlansView';
import CityView from './components/CityView';
import StateView from './components/StateView';
import PageLoader from './components/PageLoader';

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
    <PopularCities />
    <Services />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimationTrigger />
      <PageLoader />
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
          <Route path="/city/:cityId" element={<CityView />} />
          <Route path="/state/:stateId" element={<StateView />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/press" element={<PressView />} />
          <Route path="/support" element={<SupportView />} />
          <Route path="/nri-corner" element={<NRIView />} />
          <Route path="/partner" element={<PartnerView />} />
          <Route path="/auth" element={<AuthView />} />
          <Route path="/partner-auth" element={<PartnerAuthView />} />
          <Route path="/contractor-auth" element={<ContractorAuthView />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/contractor-dashboard" element={<ContractorDashboard />} />
          <Route path="/partner-dashboard" element={<PartnerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/payment" element={<PaymentView />} />
          <Route path="/plans" element={<PlansView />} />
        </Routes>

        <WhatsAppButton />
        <FloatingCompareBar />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
