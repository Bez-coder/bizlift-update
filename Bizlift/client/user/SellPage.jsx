import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./SellPage.css";

const SellPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "small business",
    price: "",
    contactPhone: "",
    socialMedia: "",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (photo) data.append("photo", photo);

    try {
      const res = await axios.post("http://localhost:5000/sell", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message);
      setFormData({
        title: "",
        description: "",
        type: "small business",
        price: "",
        contactPhone: "",
        socialMedia: "",
      });
      setPhoto(null);
      setPreview(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.error || "Error submitting form.");
    }
  };
const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sell-layout">
      {/* Sidebar */}
      <aside className="sell-sidebar">
        <div className="sell-logo">
          
        </div>

        <nav className="sell-nav">
          <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
            Dashboard
          </Link>
          <Link className={location.pathname === "/dashboard/goods" ? "active" : ""} to="/dashboard/goods">
            My Goods
          </Link>
          <Link className={location.pathname === "/dashboard/cashbook" ? "active" : ""} to="/dashboard/cashbook">
            Cash Book
          </Link>
          <Link className={location.pathname === "/dashboard/guidance" ? "active" : ""} to="/dashboard/guidance">
            Guidance
          </Link>
          <Link className="active" to="/dashboard/sell">
            Sell
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Sell Page */}
      <main className="sell-content">
        <h1>Sell Your Product</h1>
        {message && <p className="sell-message">{message}</p>}

        <form onSubmit={handleSubmit} className="sell-form">
          <label>Photo *</label>
          <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} required />
          {preview && <img src={preview} alt="Preview" className="sell-preview" />}

          <label>Title *</label>
          <input name="title" value={formData.title} onChange={handleChange} required />

          <label>Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Price *</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Phone Number *</label>
          <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} required />

          <label>Social Media (optional)</label>
          <input name="socialMedia" value={formData.socialMedia} onChange={handleChange} />

          <label>Category *</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="small business">Small Business</option>
            <option value="candle">Candle</option>
            <option value="hand craft">Hand Craft</option>
            <option value="jewelry">Jewelry</option>
            <option value="home accessory">Home Accessory</option>
            <option value="other">Other</option>
          </select>

          <button type="submit" className="sell-submit-btn">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default SellPage;
