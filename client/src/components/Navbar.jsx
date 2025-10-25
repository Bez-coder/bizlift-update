import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef();

  const isHomePage = location.pathname === "/";

  // Scroll effect for color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled || !isHomePage ? "navbar-blue" : "navbar-transparent"}`}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">BizLift</Link>
        </div>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* Services Dropdown */}
          <li ref={dropdownRef} className="dropdown">
            <span className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Services <FaChevronDown className={`dropdown-icon ${dropdownOpen ? "open" : ""}`} />
            </span>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/marketplace">Buy</Link>
                </li>
                <li>
                  <Link to="/signup">Sell</Link>
                </li>
                <li>
                  <Link to="/signup">Guidance</Link>
                </li>
                <li>
                    <Link to="/signup">Cash Book</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/marketplace">Market</Link>
          </li>
          <li>
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>

        <div className="navbar-buttons">
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
