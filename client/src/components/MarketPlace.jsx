import React, { useState } from "react";
import "./Marketplace.css";
import Navbar from "./Navbar";
const Marketplace = () => {
  // ✅ Demo products (8 sample goods)
  const [products] = useState([
    {
      id: 1,
      title: "Handmade Scented Candle",
      description: "Beautifully crafted soy wax candle with a calming lavender scent.",
      price: 12.5,
      contactPhone: "+251912345678",
      socialMedia: "https://instagram.com/demo_candles",
      type: "Candle",
      seller: { name: "Sara M." },
      photoUrl: "https://th.bing.com/th/id/OIP.d5KlYb7h0sMUK52JoiSOVAHaH6?w=186&h=199&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3",
    },
    {
      id: 2,
      title: "Traditional Handwoven Basket",
      description: "Colorful basket perfect for home decor or storage.",
      price: 20,
      contactPhone: "+251978654321",
      socialMedia: "",
      type: "Hand Craft",
      seller: { name: "Lidiya K." },
      photoUrl: "https://tse2.mm.bing.net/th/id/OIP.1t8VtWsHTAe6xDG9daXFewHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      title: "Gold-Plated Necklace",
      description: "Elegant gold-plated jewelry ideal for casual and formal occasions.",
      price: 35,
      contactPhone: "+251911223344",
      socialMedia: "https://facebook.com/jewelstore",
      type: "Jewelry",
      seller: { name: "Biniam A." },
      photoUrl: "https://th.bing.com/th?id=OIF.z7GqBggYR1%2bgKbCiJSFflg&cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 4,
      title: "Custom Wooden Lamp",
      description: "Eco-friendly handmade lamp that adds warmth to your living room.",
      price: 50,
      contactPhone: "+251987654321",
      socialMedia: "",
      type: "Home Accessory",
      seller: { name: "Samuel T." },
      photoUrl: "https://th.bing.com/th/id/R.d9d8a1d7e6a188ac10d3f4cfad672c91?rik=g5Sr0m3BnxzTCw&pid=ImgRaw&r=0",
    },
    {
      id: 5,
      title: "Organic Honey Jar",
      description: "Pure organic honey harvested locally with no additives.",
      price: 15,
      contactPhone: "+251923456789",
      type: "Small Business",
      seller: { name: "Hanna D." },
      photoUrl: "https://tse1.mm.bing.net/th/id/OIP.iaShitsqwsjcYDSP0ZJeMgAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 6,
      title: "Leather Wallet",
      description: "Durable handmade leather wallet with multiple compartments.",
      price: 25,
      contactPhone: "+251945678901",
      type: "Hand Craft",
      seller: { name: "Tomas E." },
      photoUrl: "https://th.bing.com/th/id/OIP.UzHyRSJqogl2er-q_YS0KAHaFj?w=302&h=181&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3",
    },
    {
      id: 7,
      title: "Decorative Clay Pot",
      description: "Beautiful clay pot made by local artisans for indoor plants.",
      price: 18,
      contactPhone: "+251900123456",
      socialMedia: "",
      type: "Home Accessory",
      seller: { name: "Marta S." },
      photoUrl: "https://m.media-amazon.com/images/I/71vAWzQi3xL.jpg",
    },
    {
      id: 8,
      title: "Fragrant Essential Oil Set",
      description: "Set of 5 relaxing essential oils for wellness and relaxation.",
      price: 28,
      contactPhone: "+251911998877",
      socialMedia: "https://instagram.com/oilsetdemo",
      type: "Other",
      seller: { name: "Nati B." },
      photoUrl: "https://th.bing.com/th/id/R.1486a88140c3bdf911b5eb45d95a170a?rik=pgiHfUlAklQMJA&pid=ImgRaw&r=0",
    },
  ]);

  return (
    <>
    
    <div className="marketplace">
      <h2> Marketplace</h2>
      <p> <b>Support Local. Shop Smart.</b> 
      <br />Grow Together. Discover handcrafted, high-quality goods made by passionate small business owners.
      <br /> Every purchase fuels a dream, strengthens a community, and brings you closer to products with purpose.
<br />
<br />
💛 When you buy here, you're not just shopping — you're investing in real people, real stories, and real impact.</p>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img
              src={p.photoUrl}
              alt={p.title}
              className="product-image"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/250x180?text=No+Image")
              }
            />
            <div className="product-info">
              <h3>{p.title}</h3>
              <p className="desc">
                {p.description.length > 80
                  ? p.description.slice(0, 80) + "..."
                  : p.description}
              </p>
              <p><strong>💰 Price:</strong> ${p.price}</p>
              <p><strong>📞 Phone:</strong> {p.contactPhone}</p>
              {p.socialMedia && (
                <p>
                  🔗{" "}
                  <a href={p.socialMedia} target="_blank" rel="noreferrer">
                    Social Link
                  </a>
                </p>
              )}
              <p><strong>📂 Category:</strong> {p.type}</p>
              <p className="seller">Seller: {p.seller?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Marketplace;
