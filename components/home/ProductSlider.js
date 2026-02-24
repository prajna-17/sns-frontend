"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function ProductSlider() {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [products, setProducts] = useState([]);

  // 🔥 Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        setProducts(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="product-slider-container">
      <div className="ps-heading-container">
        <h2 className="ps-heading">Latest Launches</h2>
        <Link href="/products">View all</Link>
      </div>

      <div
        className="ps-slider"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {products.map((p) => {
          const discount =
            p.oldPrice && p.oldPrice > p.price
              ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
              : 0;

          return (
            <Link
              href={`/products/${p._id}`}
              className="ps-card"
              key={p._id}
              style={{ position: "relative" }}
            >
              {discount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#e53935",
                    color: "white",
                    padding: "4px 8px",
                    fontSize: "12px",
                    fontWeight: "600",
                    borderRadius: "20px",
                  }}
                >
                  {discount}% OFF
                </div>
              )}

              <img src={p.images?.[0]} className="ps-img" />

              <div className="ps-title">{p.title}</div>

              <div className="ps-rating">⭐ 4.5</div>

              <div className="ps-price-row">
                <span className="ps-price-main">₹{p.oldPrice}</span>
                <span className="ps-price-discount">₹{p.price}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
