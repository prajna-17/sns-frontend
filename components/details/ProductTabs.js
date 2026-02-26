"use client";

import { useState } from "react";
import "./details.css";

export default function ProductTabs({ product }) {
  const [active, setActive] = useState("description");
  const [expanded, setExpanded] = useState(false);

  // ── same backend logic (untouched) ──
  const tabs = ["description", "reviews", "return & refund"];

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? (
          product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          product.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="d-tabs-wrapper">
      {/* ── TAB BAR ── */}
      <div className="d-tabs-bar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActive(tab);
              setExpanded(false);
            }}
            className={`d-tab-btn ${active === tab ? "active" : ""}`}
          >
            {tab === "description" && <span className="d-tab-icon"></span>}
            {tab === "reviews" && <span className="d-tab-icon"></span>}
            {tab === "return & refund" && <span className="d-tab-icon"></span>}
            <span className="d-tab-label">{tab}</span>
            {tab === "reviews" && avgRating && (
              <span className="d-tab-pill">{avgRating}</span>
            )}
            {tab === "reviews" && product.reviews?.length > 0 && (
              <span className="d-tab-pill">{product.reviews.length}</span>
            )}
          </button>
        ))}
        {/* sliding ink bar */}
        <div
          className="d-tab-ink"
          style={{ "--tab-index": tabs.indexOf(active) }}
        />
      </div>

      {/* ── CONTENT PANEL ── */}
      <div className="d-tabs-panel">
        {/* DESCRIPTION */}
        {active === "description" && (
          <div className="d-tab-content d-tab-desc" key="description">
            <div className="d-tab-desc-body">
              <p className={`d-tab-desc-text ${expanded ? "expanded" : ""}`}>
                {product.description}
              </p>
              {!expanded && <div className="d-tab-fade" />}
            </div>
            <button
              className="d-tab-expand-btn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less ↑" : "Read Full Description ↓"}
            </button>
          </div>
        )}

        {/* REVIEWS */}
        {active === "reviews" && (
          <div className="d-tab-content" key="reviews">
            {product.reviews && product.reviews.length > 0 ? (
              <>
                {/* summary row */}
                <div className="d-reviews-summary">
                  <div className="d-reviews-avg">{avgRating}</div>
                  <div className="d-reviews-meta">
                    <div className="d-reviews-stars">
                      {"★".repeat(Math.round(avgRating))}
                      {"☆".repeat(5 - Math.round(avgRating))}
                    </div>
                    <p className="d-reviews-count">
                      {product.reviews.length} review
                      {product.reviews.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="d-divider" />
                <div className="d-reviews-list">
                  {product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="d-review-card"
                      style={{ animationDelay: `${index * 0.07}s` }}
                    >
                      <div className="d-review-header">
                        <div className="d-review-avatar">
                          {(review.user || "A")[0].toUpperCase()}
                        </div>
                        <div className="d-review-user-info">
                          <span className="d-review-name">
                            {review.user || "Anonymous"}
                          </span>
                          <div className="d-review-stars-small">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>
                        </div>
                        <span className="d-review-rating-badge">
                          {review.rating}/5
                        </span>
                      </div>
                      <p className="d-review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="d-reviews-empty">
                <div className="d-reviews-empty-icon">💬</div>
                <p className="d-reviews-empty-title">No reviews yet</p>
                <p className="d-reviews-empty-sub">
                  Be the first to share your thoughts
                </p>
              </div>
            )}
          </div>
        )}

        {/* RETURN & REFUND */}
        {active === "return & refund" && (
          <div className="d-tab-content" key="return">
            <div className="d-refund-list">
              {[
                {
                  icon: "📦",
                  title: "7-Day Returns",
                  body: "Return within 7 days of delivery, no questions asked.",
                },
                {
                  icon: "✅",
                  title: "Original Condition",
                  body: "Product must be unused and in its original packaging.",
                },
                {
                  icon: "💳",
                  title: "Fast Refunds",
                  body: "Refunds processed within 5–7 business days after approval.",
                },
                {
                  icon: "🎧",
                  title: "Need Help?",
                  body: "Contact customer support through your account anytime.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="d-refund-item"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="d-refund-icon">{item.icon}</div>
                  <div className="d-refund-body">
                    <p className="d-refund-title">{item.title}</p>
                    <p className="d-refund-text">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
