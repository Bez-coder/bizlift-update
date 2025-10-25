import React, { useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Link, useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import "./CashBook.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const CashBook = () => {
  const [weeks, setWeeks] = useState([
    { products: [{ name: "", amount: 0, price: 0 }], income: { sold: 0, pricePerItem: 0 } },
  ]);
  const [currency, setCurrency] = useState("Birr");

  // Week-specific handlers
  const handleProductChange = (weekIdx, index, field, value) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIdx].products[index][field] = field === "name" ? value : Number(value);
    setWeeks(updatedWeeks);
  };

  const addProduct = (weekIdx) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIdx].products.push({ name: "", amount: 0, price: 0 });
    setWeeks(updatedWeeks);
  };

  const incrementAmount = (weekIdx, index) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIdx].products[index].amount += 1;
    setWeeks(updatedWeeks);
  };

  const decrementAmount = (weekIdx, index) => {
    const updatedWeeks = [...weeks];
    if (updatedWeeks[weekIdx].products[index].amount > 0) {
      updatedWeeks[weekIdx].products[index].amount -= 1;
    }
    setWeeks(updatedWeeks);
  };

  const handleIncomeChange = (weekIdx, field, value) => {
    const updatedWeeks = [...weeks];
    updatedWeeks[weekIdx].income[field] = Number(value);
    setWeeks(updatedWeeks);
  };

  const addWeek = () => {
    setWeeks([
      ...weeks,
      { products: [{ name: "", amount: 0, price: 0 }], income: { sold: 0, pricePerItem: 0 } },
    ]);
  };

  // Overall growth calculation
  const totalRevenue = weeks.reduce((sum, week) => {
    const totalCost = week.products.reduce((s, p) => s + p.amount * p.price, 0);
    const totalIncome = week.income.sold * week.income.pricePerItem;
    return sum + (totalIncome - totalCost);
  }, 0);

  const totalIncomeAll = weeks.reduce(
    (sum, week) => sum + week.income.sold * week.income.pricePerItem,
    0
  );

  const totalCostAll = weeks.reduce(
    (sum, week) => sum + week.products.reduce((s, p) => s + p.amount * p.price, 0),
    0
  );

  const growthData = {
    labels: weeks.map((_, idx) => `Week ${idx + 1}`),
    datasets: [
      {
        label: `Revenue (${currency})`,
        data: weeks.map((week) => {
          const totalCost = week.products.reduce((s, p) => s + p.amount * p.price, 0);
          const totalIncome = week.income.sold * week.income.pricePerItem;
          return totalIncome - totalCost;
        }),
        fill: false,
        borderColor: "#a8904f",
        backgroundColor: "#0c2656",
        tension: 0.3,
      },
    ],
  };
const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="cashbook-layout">
      <aside className="sidebar">
        <div className="logo">
          
        </div>
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

      {/* ✅ Main Cashbook Content */}
      <div className="cashbook-content">
        <h1>Cash Book</h1>

      <label>
        Select Currency:{" "}
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="Birr">Birr</option>
          <option value="USD">USD</option>
        </select>
      </label>

      {weeks.map((week, weekIdx) => {
        const totalCost = week.products.reduce((sum, p) => sum + p.amount * p.price, 0);
        const totalIncome = week.income.sold * week.income.pricePerItem;
        const revenue = totalIncome - totalCost;

        const pieData = {
          labels: week.products.map((p) => p.name || "Unnamed"),
          datasets: [
            {
              label: "Cost Distribution",
              data: week.products.map((p) => p.amount * p.price),
              backgroundColor: ["#a8904f", "#0c2656", "#ffd700", "#87cefa", "#f08080"],
              borderWidth: 1,
            },
          ],
        };

        const barData = {
          labels: ["Total Income", "Revenue"],
          datasets: [
            {
              label: currency,
              data: [totalIncome, revenue],
              backgroundColor: ["#0c2656", "#a8904f"],
            },
          ],
        };

        return (
          <div key={weekIdx} className="week-section">
            <h2>Week {weekIdx + 1}</h2>
            <div className="main-section">
              <div className="marketplace-section">
                <table className="marketplace-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Price ({currency})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {week.products.map((p, idx) => (
                      <tr key={idx}>
                        <td>
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) => handleProductChange(weekIdx, idx, "name", e.target.value)}
                            placeholder="Product name"
                          />
                        </td>
                        <td>
                          <div className="amount-controls">
                            <button onClick={() => decrementAmount(weekIdx, idx)}>-</button>
                            <span>{p.amount}</span>
                            <button onClick={() => incrementAmount(weekIdx, idx)}>+</button>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            value={p.price}
                            onChange={(e) => handleProductChange(weekIdx, idx, "price", e.target.value)}
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="add-product" onClick={() => addProduct(weekIdx)}>
                  Add Product
                </button>
                <div className="total-cost">
                  Total Cost: {totalCost} {currency}
                </div>
              </div>

              <div className="income-section">
                <div className="calculator income-calculator">
                  <h3>Income Calculator</h3>
                  <label>
                    Sold Amount:{" "}
                    <input
                      type="number"
                      value={week.income.sold}
                      onChange={(e) => handleIncomeChange(weekIdx, "sold", e.target.value)}
                    />
                  </label>
                  <label>
                    Price per Item:{" "}
                    <input
                      type="number"
                      value={week.income.pricePerItem}
                      onChange={(e) => handleIncomeChange(weekIdx, "pricePerItem", e.target.value)}
                    />
                  </label>
                  <p>Total Income: {totalIncome} {currency}</p>
                </div>
              </div>
            </div>

            <div
              className={`revenue-box ${
                revenue > 0 ? "profit" : revenue < 0 ? "loss" : "neutral"
              }`}
            >
              <h3>Revenue</h3>
              <p>
                {revenue > 0
                  ? `✅ Profit: ${revenue} ${currency}`
                  : revenue < 0
                  ? `❌ Loss: ${Math.abs(revenue)} ${currency}`
                  : "⚪ Break-even"}
              </p>
            </div>

            <div className="charts-section">
              <div className="chart pie-chart">
                <h3>Cost Distribution</h3>
                <Pie data={pieData} />
              </div>
              <div className="chart bar-chart">
                <h3>Income vs Revenue</h3>
                <Bar data={barData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
        );
      })}

      <button className="add-week" onClick={addWeek}>
        Add Week
      </button>

      {/* Overall Growth Section */}
      <div className="overall-growth-section">
        <div className="line-chart">
          <h3>Overall Growth (Revenue)</h3>
          <Line data={growthData} options={{ responsive: true }} />
        </div>
        <div className="growth-info">
          <h3>Overall Summary</h3>
          <p>Total Income: {totalIncomeAll} {currency}</p>
          <p>Total Cost: {totalCostAll} {currency}</p>
          <p>Total Revenue: {totalRevenue} {currency}</p>
          <p>
            {totalRevenue > 0
              ? "✅ Overall, your business shows positive growth across the weeks!"
              : totalRevenue < 0
              ? "❌ Overall, your business is in loss across the weeks. Consider reviewing expenses and sales."
              : "⚪ Break-even overall."}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CashBook;
