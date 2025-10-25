import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaWallet, 
  FaChartLine, 
  FaUsers, 
  FaTruck, 
  FaStar, 
  FaChevronLeft, 
  FaChevronRight 
} from "react-icons/fa";
import "../pages/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [currentReview, setCurrentReview] = useState(0);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    { question: "How do I become a seller?", answer: "Simply click the 'Seller' button on the homepage and create your account to start listing products." },
    { question: "Can I buy products without an account?", answer: "Yes! Buyers can purchase products directly from the marketplace without creating an account." },
    { question: "How do I track my income?", answer: "Use our CashBook feature to automatically calculate and visualize your income and revenue over time." },
    { question: "Is my data secure?", answer: "Yes, we prioritize user security with encrypted transactions and secure data storage." }
  ];

  const reviews = [
    { name: "Marta G.", text: "BizLift helped me organize my small shop finances. Super easy to use and reliable!", rating: 5 },
    { name: "Abel T.", text: "The marketplace is smooth and I can buy without registration. Loved the simplicity.", rating: 4 },
    { name: "Samiya K.", text: "Perfect for new entrepreneurs. I can monitor my growth and expenses easily.", rating: 5 }
  ];

  // Auto-slide reviews every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to BizLift</h1>
          <h2>Track, Sell, Legalize, Grow.</h2>
          <p>Manage your products, track your revenue, and grow your business easily.
            <br />Easily manage your daily business expenses and income. <br />Track costs, calculate profits, and make data-driven decisions — all in one place.
          </p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/signup")} className="btn-primary">Seller</button>
            <button onClick={() => navigate("/marketplace")} className="btn-secondary">Buyer</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-cards">
          <div className="service-card">
            <FaWallet className="service-icon" />
            <h3>Guidance</h3>
            <p>We will guide you through yor business starting journey.</p>
          </div>
          <div className="service-card">
            <FaChartLine className="service-icon" />
            <h3>Cash Book</h3>
            <p>Track income and revenue effortlessly with automated calculations.</p>
          </div>
          <div className="service-card">
            <FaUsers className="service-icon" />
            <h3>Market Place</h3>
            <p>This is a place where Sellers can sell thier product and Buyers can purches easily</p>
          </div>
          <div className="service-card">
            <FaTruck className="service-icon" />
            <h3>Smooth user interaction</h3>
            <p>Our system is easy to use with smooth user interface</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-cards">
          <div className="feature-card">
            <h3>Real-time Dashboard</h3>
            <p>Monitor your sales and revenue in real-time without hassle.</p>
          </div>
          <div className="feature-card">
            <h3>Multi-week Tracking</h3>
            <p>Organize your products and revenue by week or month easily.</p>
          </div>
          <div className="feature-card">
            <h3>No Account Needed</h3>
            <p>Buyers can start purchasing immediately without registration.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Start Growing Your Business Today!</h2>
        <button className="btn-primary" onClick={() => navigate("/signup")}>Get Started</button>
        <button className="btn-secondary" onClick={() => navigate("/marketplace")}>Buy Products</button>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFAQ === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <h4>{faq.question}</h4>
              {activeFAQ === index && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="reviews-carousel">
        <h2>What Our Customers Say</h2>
        <div className="carousel-container">
          <button
            className="carousel-btn left"
            onClick={() =>
              setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
            }
          >
            <FaChevronLeft />
          </button>

          <div className="review-slide">
            <p className="review-text">"{reviews[currentReview].text}"</p>
            <div className="review-rating">
              {[...Array(reviews[currentReview].rating)].map((_, i) => (
                <FaStar key={i} color="#a8904f" />
              ))}
            </div>
            <p className="review-name">— {reviews[currentReview].name}</p>
          </div>

          <button
            className="carousel-btn right"
            onClick={() =>
              setCurrentReview((prev) => (prev + 1) % reviews.length)
            }
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="carousel-dots">
          {reviews.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentReview ? "active" : ""}`}
              onClick={() => setCurrentReview(index)}
            ></span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
