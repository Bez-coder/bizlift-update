import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CashBook from "./components/CashBook";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import GuidancePage from "./pages/GuidancePage";
import BusinessRegistration from "./pages/BusinessRegistration";
import MyGoodsPage from "./pages/MyGoodsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SellPage from "./user/SellPage";
import Marketplace from "./components/MarketPlace";
import ContactUs from "./pages/Contact-us";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/cashbook" element={<CashBook />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
