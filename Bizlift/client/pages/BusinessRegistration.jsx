import React from 'react';
import './BusinessRegistration.css';
import { Link, useLocation } from 'react-router-dom';

const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

const BusinessRegistration = () => {
  const location = useLocation();

  return (
    <div className="business-layout">
      <aside className="sidebar">
        <div className="logo">
    
        </div>
        <nav className="nav-links">
          <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">Dashboard</Link>
          <Link className={location.pathname.includes("/goods") ? "active" : ""} to="/dashboard/goods">My Goods</Link>
          <Link className={location.pathname.includes("/cashbook") ? "active" : ""} to="/dashboard/cashbook">Cash Book</Link>
          <Link className={location.pathname.includes("/guidance") ? "active" : ""} to="/guidance">Guidance</Link>
          <Link className={location.pathname.includes("/sell") ? "active" : ""} to="/dashboard/sell">Sell</Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>

      <div className="guide-container">
        <h2>Business Registration in Ethiopia</h2>
        <p>Follow these steps to register your business:</p>
        <ol>
          <li><strong>Choose Your Business Structure:</strong> Decide whether you want to register as a Sole Proprietorship, Private Limited Company (PLC), or Share Company.</li>
          <li><strong>Reserve Your Business Name:</strong> Submit three preferred names to the Ministry of Trade or Trade Bureau at the sub-city level.</li>
          <li><strong>Prepare Required Documents:</strong> Gather necessary documents, including identification, proof of address, and any sector-specific licenses.</li>
          <li><strong>Submit Application:</strong> Fill out the application form and submit it along with the required documents.</li>
          <li><strong>Obtain Registration Certificate:</strong> Upon approval, you'll receive a commercial registration certificate.</li>
        </ol>
        <p>For more detailed information, refer to the official guide: <a href="https://developer.chapa.co/business-license-in-ethiopia" target="_blank" rel="noopener noreferrer">How to get a business license in Ethiopia</a></p>
        <p>Download the Business Registration Template: <a href="/templates/business-registration-template.pdf" download>Download PDF</a></p>
      </div>
      
    </div>
  );
};

export default BusinessRegistration;
