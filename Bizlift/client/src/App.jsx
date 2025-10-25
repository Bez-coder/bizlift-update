import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CashBook from "../components/cashbook.jsx";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import HomePage from "../pages/HomePage.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ContactUs from "../pages/Contactus.jsx";
import SellPage from "../user/sellpage.jsx";
import GuidancePage from "../pages/GuidancePage.jsx";
import BusinessRegistration from "../pages/BusinessRegistration.jsx";
import Marketplace from "../components/MarketPlace.jsx";
import MyGoodsPage from "../pages/MyGoodsPage.jsx";

const App = () => {
  return (
    <>
    <Navbar />
        <Routes>
          <Route path="/dashboard/cashbook" element={<CashBook />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<HomePage />} /> 
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/dashboard/sell" element={<SellPage />} />
          <Route path="/dashboard/guidance" element={<GuidancePage />} />
          <Route path="/guidance/business-registration" element={<BusinessRegistration />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/dashboard/goods" element={<MyGoodsPage />} />
          
        </Routes>
    <Footer />
    </>
  );
};

export default App;
