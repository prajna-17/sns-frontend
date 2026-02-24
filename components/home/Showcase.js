"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ShowcaseSlider() {
  const promoImage = "/img/dyson-main.jpeg";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElectronicsProducts = async () => {
      try {
        // 1️⃣ Get all super categories
        const superRes = await fetch(
          "http://localhost:5000/api/super-categories",
        );
        const superData = await superRes.json();

        const superCategories = superData.data || superData;

        const electronics = superCategories.find(
          (s) => s.name.toLowerCase() === "electronics",
        );

        if (!electronics) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch products with electronics superCategory id
        const productRes = await fetch(
          `http://localhost:5000/api/products?superCategory=${electronics._id}`,
        );

        const productData = await productRes.json();

        setProducts(productData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchElectronicsProducts();
  }, []);

  return (
    <div className="pgs-wrapper">
      <div className="pgs-left">
        <img src={promoImage} alt="promo" />
      </div>

      <div className="pgs-right">
        <div className="pgs-grid">
          {loading && <p>Loading products...</p>}

          {!loading && products.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "100px 20px",
                position: "relative",
                overflow: "hidden",
                color: "white",
              }}
            >
              {/* Soft animated glow background */}
              <div
                style={{
                  position: "absolute",
                  width: "400px",
                  height: "400px",
                  background:
                    "radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)",
                  animation: "pulseGlow 4s ease-in-out infinite",
                }}
              />

              <div
                style={{
                  textAlign: "center",
                  zIndex: 2,
                  animation: "fadeUp 1s ease forwards",
                }}
              >
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    marginBottom: "12px",
                  }}
                >
                  No Electronics Available
                </h2>

                <p
                  style={{
                    color: "#666",
                    fontSize: "16px",
                    maxWidth: "420px",
                    margin: "0 auto",
                    lineHeight: "1.7",
                  }}
                >
                  We're preparing something exceptional for you. Premium
                  technology products will appear here soon.
                </p>
              </div>

              {/* Animations */}
              <style>
                {`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}
              </style>
            </div>
          )}
          {products.slice(0, 4).map((p) => (
            <Link key={p._id} href={`/products/${p._id}`} className="pgs-card">
              <div className="pgs-img-box">
                <img src={p.images[0]} alt={p.title} />
              </div>

              <p className="pgs-title">{p.title}</p>

              <div
                style={{
                  fontSize: "14px",
                  margin: "6px 0",
                  color: "#f5a623",
                  fontWeight: "500",
                }}
              >
                ⭐ 4.5
              </div>
              <div className="pgs-price-section">
                <span className="pgs-final-price">₹{p.price}</span>

                {p.oldPrice && (
                  <span className="pgs-original-price">₹{p.oldPrice}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
