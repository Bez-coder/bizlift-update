import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./GuidancePage.css";
const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

const GuidancePage = () => {
  const location = useLocation();

  return (
    <div className="guidance-layout">
      {/* Sidebar */}
      <aside className="guidance-sidebar">
        <div className="guidance-logo">
          <h2>BizLift</h2>
        </div>

        <nav className="guidance-nav">
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/goods"
            className={location.pathname === "/dashboard/goods" ? "active" : ""}
          >
            My Goods
          </Link>
          <Link
            to="/dashboard/cashbook"
            className={location.pathname === "/dashboard/cashbook" ? "active" : ""}
          >
            Cash Book
          </Link>
          <Link
            to="/dashboard/guidance"
            className={location.pathname === "/dashboard/guidance" ? "active" : ""}
          >
            Guidance
          </Link>
          <Link
            to="/dashboard/sell"
            className={location.pathname === "/dashboard/sell" ? "active" : ""}
          >
            Sell
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="guidance-content">
        <h2>Startup Guidance</h2>
        <p className="guidance-intro">
          Learn everything you need to start and manage your business in Ethiopia.
        </p>

        <div className="guidance-cards">
          <div className="guidance-card">
            <h3>Business Registration</h3>
            <p>Learn how to register your business in Ethiopia.</p>
            <Link to="/guidance/business-registration" className="guidance-btn">
              Read More
            </Link>
          </div>

          <div className="guidance-card">
            <h3>TIN Application</h3>
            <p>Step-by-step guide to obtaining a Taxpayer Identification Number.</p>
            <Link to="/guidance/business-registration" className="guidance-btn">
              Read More
            </Link>
          </div>

          <div className="guidance-card">
            <h3>Licensing</h3>
            <p>Understand the licensing requirements for your business.</p>
            <Link to="/guidance/business-registration" className="guidance-btn">
              Read More
            </Link>
          </div>

          <div className="guidance-card">
            <h3>Documentation Templates</h3>
            <p>Access essential templates for your business documents.</p>
            <Link to="/guidance/business-registration" className="guidance-btn">
              Read More
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuidancePage;
