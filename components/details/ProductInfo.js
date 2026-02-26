"use client";

import { useState } from "react";
import "./details.css";

export default function ProductInfo({ product }) {
  const [expanded, setExpanded] = useState(false);

  // ── same backend logic (untouched) ──
  const discount =
    product.oldPrice && product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0;

  return (
    <div className="d-info-wrapper">
      {/* ── MAIN INFO CARD ── */}
      <div className="d-info-card">
        {/* Top row: badge + stock */}
        <div className="d-info-top-row">
          <span className="d-badge d-badge-accent">✦ New Arrival</span>
          {!product.inStock && (
            <span className="d-badge d-badge-oos">Out of Stock</span>
          )}
        </div>

        {/* Title */}
        <h1 className="d-info-title">{product.title}</h1>

        {/* Price row */}
        <div className="d-info-price-row">
          <span className="d-info-price">₹{product.price}</span>
          {product.oldPrice && (
            <span className="d-info-mrp">₹{product.oldPrice}</span>
          )}
          {discount > 0 && (
            <span className="d-badge d-badge-discount">{discount}% OFF</span>
          )}
        </div>
        <p className="d-info-tax-note">Inclusive of all taxes</p>

        <div className="d-divider" />

        {/* Description */}
        <div className="d-info-desc-wrap">
          <p className={`d-info-desc ${expanded ? "expanded" : ""}`}>
            {product.description}
          </p>
          {!expanded && <div className="d-info-desc-fade" />}
          <button
            className="d-info-toggle-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "View Less ↑" : "View More ↓"}
          </button>
        </div>
      </div>

      {/* ── DELIVERY CARD ── */}
      <div className="d-info-delivery-card">
        <div className="d-info-delivery-icon">🚚</div>
        <div className="d-info-delivery-body">
          <p className="d-info-delivery-title">Deliver to New Delhi, 110040</p>
          <p className="d-info-delivery-sub">⚡ Express Delivery Tomorrow</p>
          <p className="d-info-delivery-sub">💵 Cash on Delivery Available</p>
        </div>
        <button className="d-info-change-btn">Change</button>
      </div>

      {/* ── WARRANTY CARD ── */}
      <div className="d-info-warranty-card">
        <div className="d-info-warranty-icon">🛡️</div>
        <div className="d-info-warranty-body">
          <p className="d-info-warranty-brand">{product.brand || "Brand"}</p>
          <p className="d-info-warranty-text">2-year warranty (India)</p>
        </div>
        <span className="d-badge d-badge-green">Verified</span>
      </div>
    </div>
  );
}
