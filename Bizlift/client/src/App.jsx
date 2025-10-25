import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CashBook from "../components/cashbook";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactUs from "../pages/Contactus";
import SellPage from "../user/sellpage";
import GuidancePage from "../pages/GuidancePage";
import BusinessRegistration from "../pages/BusinessRegistration";
import Marketplace from "../components/MarketPlace";
import MyGoodsPage from "../pages/MyGoodsPage";

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
        <Route
          path="/guidance/business-registration"
          element={<BusinessRegistration />}
        />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/dashboard/goods" element={<MyGoodsPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
