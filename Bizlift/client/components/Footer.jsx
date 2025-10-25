import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>BizLift</h3>
          <p>Empowering small businesses through guidance, marketplace, and smart cashbook tools.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/guidance">Guidance</Link></li>
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/cashbook">Cashbook</Link></li>
          </ul>
        </div>

        <div className="footer-policy">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BizLift. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
