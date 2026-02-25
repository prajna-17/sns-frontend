"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { API } from "@/utils/api";

export default function ProductSlider() {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`);
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Section ── */
        .ps-section {
          padding: 32px 0 16px;
        }

        .ps-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 20px 20px;
        }

        .ps-heading-wrap {}

        .ps-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C4845A;
          margin: 0 0 4px;
        }

        .ps-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          color: #1E1410;
          margin: 0;
          line-height: 1;
        }

        .ps-view-all {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #9B8E85;
          text-decoration: none;
          border-bottom: 1px solid rgba(155,142,133,0.4);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }

        .ps-view-all:hover {
          color: #C4845A;
          border-color: rgba(196,132,90,0.5);
        }

        /* ── Slider ── */
        .ps-strip {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 6px 20px 20px;
          cursor: grab;
        }

        .ps-strip:active { cursor: grabbing; }
        .ps-strip::-webkit-scrollbar { display: none; }

        /* ── Card ── */
        .ps-card {
          flex: 0 0 185px;
          scroll-snap-align: start;
          background: #FFFDF9;
          border-radius: 24px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          position: relative;
          border: 1px solid rgba(210,195,185,0.5);
          box-shadow: 0 2px 12px rgba(61,43,31,0.07);
          animation: psCardIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.22s;
          -webkit-tap-highlight-color: transparent;
        }

        .ps-card:nth-child(1) { animation-delay: 0.04s; }
        .ps-card:nth-child(2) { animation-delay: 0.10s; }
        .ps-card:nth-child(3) { animation-delay: 0.16s; }
        .ps-card:nth-child(4) { animation-delay: 0.22s; }
        .ps-card:nth-child(5) { animation-delay: 0.28s; }
        .ps-card:nth-child(6) { animation-delay: 0.34s; }

        @keyframes psCardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ps-card:active {
          transform: scale(0.95);
          box-shadow: 0 1px 6px rgba(61,43,31,0.08);
        }

        /* ── Discount Badge ── */
        .ps-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #fff;
          background: linear-gradient(135deg, #C4845A, #D4956B);
          border-radius: 20px;
          padding: 4px 9px;
          box-shadow: 0 2px 8px rgba(196,132,90,0.4);
        }

        /* ── Image ── */
        .ps-img-wrap {
          width: 100%;
          height: 148px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F5F0EA;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 12px;
          position: relative;
        }

        .ps-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 18px;
          background: radial-gradient(ellipse at center, rgba(61,43,31,0.12), transparent);
          border-radius: 50%;
          pointer-events: none;
        }

        .ps-img-wrap img {
          max-height: 118px;
          width: 100%;
          object-fit: contain;
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.14));
        }

        .ps-card:hover .ps-img-wrap img,
        .ps-card:active .ps-img-wrap img {
          transform: scale(1.09) translateY(-4px);
        }

        /* ── Title ── */
        .ps-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 16.5px;
          font-weight: 700;
          color: #4A3728;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0 0 8px;
          flex: 1;
        }

        /* ── Stars ── */
        .ps-stars {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-bottom: 8px;
        }

        .ps-star {
          font-size: 11px;
          line-height: 1;
        }

        .ps-star.on  { color: #E8A838; }
        .ps-star.off { color: #DDD3CC; }

        .ps-rating-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: #B0A49C;
          margin-left: 3px;
        }

        /* ── Price ── */
        .ps-price-main {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: #1E1410;
          line-height: 1;
          margin: 0 0 4px;
        }

        .ps-price-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ps-mrp-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: #B0A49C;
        }

        .ps-old-price {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #C0B4AD;
          text-decoration: line-through;
        }

        /* ── Divider line at bottom of card ── */
        .ps-card-line {
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #C4845A, #E8C4A8);
          margin-top: 12px;
          opacity: 0;
          transition: opacity 0.25s;
        }

        .ps-card:hover .ps-card-line,
        .ps-card:active .ps-card-line {
          opacity: 1;
        }

        /* ── Skeleton ── */
        .ps-skeleton {
          flex: 0 0 185px;
          height: 290px;
          border-radius: 24px;
          background: linear-gradient(90deg, #F0EBE5 0%, #FAF7F2 50%, #F0EBE5 100%);
          background-size: 200% 100%;
          animation: skeletonShimmer 1.5s ease-in-out infinite;
        }

        @keyframes skeletonShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="ps-section">
        {/* Header */}
        <div className="ps-header">
          <div className="ps-heading-wrap">
            <p className="ps-eyebrow">Fresh In</p>
            <h2 className="ps-heading">Latest Launches</h2>
          </div>
          <Link href="/products" className="ps-view-all">
            View All
          </Link>
        </div>

        {/* Strip */}
        <div
          className="ps-strip"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {loading &&
            [1, 2, 3, 4].map((i) => <div key={i} className="ps-skeleton" />)}

          {!loading &&
            products.map((p) => {
              const discount =
                p.oldPrice && p.oldPrice > p.price
                  ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
                  : 0;

              return (
                <Link
                  href={`/products/${p._id}`}
                  key={p._id}
                  className="ps-card"
                >
                  {/* Discount badge */}
                  {discount > 0 && (
                    <div className="ps-badge">{discount}% OFF</div>
                  )}

                  {/* Image */}
                  <div className="ps-img-wrap">
                    <img src={p.images?.[0]} alt={p.title} loading="lazy" />
                  </div>

                  {/* Title */}
                  <p className="ps-title">{p.title}</p>

                  {/* Stars */}
                  <div className="ps-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`ps-star ${s <= 4 ? "on" : "off"}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ps-rating-count">(4.0)</span>
                  </div>

                  {/* Price */}
                  <p className="ps-price-main">₹{p.price}</p>

                  {p.oldPrice && (
                    <div className="ps-price-row">
                      <span className="ps-mrp-label">MRP</span>
                      <span className="ps-old-price">₹{p.oldPrice}</span>
                    </div>
                  )}

                  {/* Hover accent line */}
                  <div className="ps-card-line" />
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}
