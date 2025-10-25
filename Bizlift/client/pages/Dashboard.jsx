import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaWallet, FaChartLine, FaUsers, FaLightbulb, FaBoxOpen } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        alert("Session expired or unauthorized. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">BizLift</div>
        <nav className="nav-links">
          <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
            Dashboard
          </Link>
          <Link className={location.pathname.includes("/goods") ? "active" : ""} to="/dashboard/goods">
            My Goods
          </Link>
          <Link className={location.pathname.includes("/cashbook") ? "active" : ""} to="/dashboard/cashbook">
            Cash Book
          </Link>
          <Link className={location.pathname.includes("/guidance") ? "active" : ""} to="/dashboard/guidance">
            Guidance
          </Link>
          <Link className={location.pathname.includes("/sell") ? "active" : ""} to="/dashboard/sell">
            Sell
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            👋 Hello, Custommer!
            <div style={{ fontSize: "0.9rem", color: "#666" }}>{user.email}</div>
          </div>
          
        </header>

        {/* Welcome Section */}
        <section className="dashboard-welcome">
          <h2>Welcome to your Dashboard</h2>
          <p>
            Here you can manage your business, track revenue, analyze performance, and access guidance for your startup.
          </p>
        </section>

        {/* Services Section */}
        <section className="dashboard-services">
          <h3>Your Services</h3>
          <div className="services-cards">
            <Link to="/dashboard/cashbook" className="service-card">
              <FaWallet className="service-icon" />
              <h4>Revenue Calculator</h4>
              <p>Track your income and calculate revenue effortlessly.</p>
            </Link>
            <Link to="/dashboard/goods" className="service-card">
              <FaChartLine className="service-icon" />
              <h4>Business Analysis</h4>
              <p>Visualize sales trends and understand your business performance.</p>
            </Link>
            <Link to="/dashboard/guidance" className="service-card">
              <FaLightbulb className="service-icon" />
              <h4>Guidance</h4>
              <p>Learn how to register, get a TIN, and apply for licenses in Ethiopia.</p>
            </Link>
            <Link to="/dashboard/sell" className="service-card">
              <FaBoxOpen className="service-icon" />
              <h4>Sell / Posting</h4>
              <p>Post your products for buyers to see and purchase.</p>
            </Link>
          </div>
        </section>

        {/* Nested Routes Render */}
        <div className="dashboard-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
