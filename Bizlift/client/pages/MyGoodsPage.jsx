import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./MyGoodsPage.css";

const MyGoodsPage = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchGoods = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please log in to view your goods.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/mygoods", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoods(res.data.goods || []);
      } catch (err) {
        setMessage("Failed to load goods.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoods();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/mygoods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoods(goods.filter((item) => item._id !== id));
      setMessage("Item deleted successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Error deleting item.");
    }
  };
const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="goods-layout">
      {/* Sidebar */}
      <aside className="goods-sidebar">
        <div className="goods-logo">
          <h2>BizLift</h2>
        </div>

        <nav className="goods-nav">
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
      <main className="goods-content">
        <h2>My Posted Goods</h2>

        {loading ? (
          <p>Loading your goods...</p>
        ) : goods.length === 0 ? (
          <p>You haven’t posted any goods yet.</p>
        ) : (
          <div className="goods-grid">
            {goods.map((item) => (
              <div className="goods-card" key={item._id}>
                <img
                  src={item.photo ? `http://localhost:5000/${item.photo}` : "/placeholder.png"}
                  alt={item.title}
                  className="goods-img"
                />
                <h3>{item.title}</h3>
                <p className="goods-price">ETB {item.price}</p>
                <p className="goods-description">{item.description}</p>
                <div className="goods-actions">
                  <Link to={`/dashboard/edit/${item._id}`} className="edit-btn">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {message && <p className="goods-message">{message}</p>}
      </main>
    </div>
  );
};

export default MyGoodsPage;
