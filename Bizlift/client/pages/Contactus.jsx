import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setShowPopup(true);
    setFormData({ name: "", email: "", message: "" });

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      {showPopup && (
        <div className="popup-message">
          ✅ Thank you! Your message has been sent successfully.
        </div>
      )}

      <div className="contact-container">
        {/* Left Side: Form */}
        <div className="contact-card contact-form">
          <h2>Contact Us</h2>
          <p>We’d love to hear from you! Send us a message below.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Right Side: Contact Info */}
        <div className="contact-card contact-info">
          <h2>Get in Touch</h2>
          <p>Reach us through the following channels:</p>
          <ul>
            <li><strong>Email:</strong> support@bizlift.com</li>
            <li><strong>Phone:</strong> +251 900 123 456</li>
            <li><strong>Address:</strong> Addis Ababa, Ethiopia</li>
          </ul>
          <div className="contact-icons">
            <i className="fa-solid fa-envelope"></i>
            <i className="fa-solid fa-phone"></i>
            <i className="fa-solid fa-location-dot"></i>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="contact-cta">
        <h3>Ready to grow your business?</h3>
        <p>Join BizLift today and take your business to the next level.</p>
        <a href="/signup" className="cta-btn">Get Started</a>
      </div>
    </div>
  );
};

export default ContactUs;
