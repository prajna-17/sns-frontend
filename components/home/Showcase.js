"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API } from "@/utils/api";

export default function ShowcaseSlider() {
  const promoImage = "/img/poster-3.jpg";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElectronicsProducts = async () => {
      try {
        const superRes = await fetch(`${API}/super-categories`);
        const superData = await superRes.json();
        const superCategories = superData.data || superData;
        const furniture = superCategories.find(
          (s) => s.name.toLowerCase() === "furniture",
        );

        if (!furniture) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const productRes = await fetch(
          `${API}/products?superCategory=${furniture._id}`,
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

  const discount = (old, cur) => Math.round(((old - cur) / old) * 100);

  return (
    <>
      <style>{`

        /* ── Wrapper ── */
        .showcase-outer {
margin: 10px 10px 0;          border-radius: 28px;
          background: #1A1A1A;
          padding: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
          position: relative;
          overflow: hidden;
        }

        /* subtle noise texture overlay */
        .showcase-outer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          border-radius: 28px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Section Label ── */
        .showcase-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 6px 10px;
          position: relative;
          z-index: 1;
        }

        .showcase-label-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .showcase-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #C4845A;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196,132,90,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(196,132,90,0); }
        }

        .showcase-label h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888;
          margin: 0;
        }

        .showcase-view-all {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #C4845A;
          text-decoration: none;
          border-bottom: 1px solid rgba(196,132,90,0.35);
          padding-bottom: 1px;
        }

        /* ── Promo Banner ── */
        .showcase-banner {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 14px;
          z-index: 1;
        }

        .showcase-banner img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }

        .showcase-banner:hover img,
        .showcase-banner:active img {
          transform: scale(1.04);
        }

        /* gradient on banner */
        .showcase-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(196,132,90,0.18) 0%,
            transparent 50%,
            rgba(0,0,0,0.45) 100%
          );
          pointer-events: none;
        }

        .showcase-banner-badge {
          position: absolute;
          bottom: 14px;
          left: 14px;
          z-index: 2;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 14px;
          padding: 6px 14px;
        }

        .showcase-banner-badge p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin: 0;
          line-height: 1;
        }

        .showcase-banner-badge span {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }

        /* ── Product Strip ── */
        .showcase-strip {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 2px 2px 6px;
          position: relative;
          z-index: 1;
        }

        .showcase-strip::-webkit-scrollbar { display: none; }

        /* ── Product Card ── */
        .showcase-card {
          flex: 0 0 168px;
          scroll-snap-align: start;
          background: #242424;
          border-radius: 20px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.06);
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.22s,
                      border-color 0.22s;
          animation: cardIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        .showcase-card:nth-child(1) { animation-delay: 0.05s; }
        .showcase-card:nth-child(2) { animation-delay: 0.12s; }
        .showcase-card:nth-child(3) { animation-delay: 0.19s; }
        .showcase-card:nth-child(4) { animation-delay: 0.26s; }
        .showcase-card:nth-child(5) { animation-delay: 0.33s; }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .showcase-card:active {
          transform: scale(0.94);
          border-color: rgba(196,132,90,0.3);
          box-shadow: 0 0 0 1px rgba(196,132,90,0.2);
        }

        /* ── Product Image ── */
        .showcase-card-img {
          background: #2E2E2E;
          border-radius: 14px;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .showcase-card-img img {
          max-height: 110px;
          width: 100%;
          object-fit: contain;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4));
        }

        .showcase-card:hover .showcase-card-img img,
        .showcase-card:active .showcase-card-img img {
          transform: scale(1.08) translateY(-3px);
        }

        /* ── Card Info ── */
        .showcase-card-title {
          font-size: 12px;
          font-weight: 400;
          color: #CCC;
          margin: 10px 0 4px;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        /* ── Stars ── */
        .showcase-stars {
          display: flex;
          gap: 1px;
          margin-bottom: 6px;
        }

        .showcase-star {
          font-size: 11px;
          line-height: 1;
        }

        .showcase-star.filled { color: #F5C842; }
        .showcase-star.empty  { color: #444; }

        /* ── Price ── */
        .showcase-price-main {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
        }

        .showcase-price-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .showcase-old-price {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #555;
          text-decoration: line-through;
        }

        .showcase-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #C4845A;
          background: rgba(196,132,90,0.15);
          border: 1px solid rgba(196,132,90,0.25);
          border-radius: 20px;
          padding: 2px 7px;
        }

        /* ── Loading Skeletons ── */
        .showcase-skeleton {
          flex: 0 0 168px;
          border-radius: 20px;
          background: #242424;
          height: 260px;
          animation: shimmer 1.4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>

      <div className="showcase-outer">
        {/* Label row */}
        <div className="showcase-label">
          <div className="showcase-label-left">
            <div className="showcase-dot" />
            <h3>FURNITURES</h3>
          </div>
          <Link href="/products" className="showcase-view-all">
            View All
          </Link>
        </div>

        {/* Promo Banner */}
        <div className="showcase-banner">
          <img src={promoImage} alt="promo" />
          <div className="showcase-banner-badge">
            <span>Top Pick</span>
            <p>Furniture Collection</p>
          </div>
        </div>

        {/* Product Strip */}
        <div className="showcase-strip">
          {loading && (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="showcase-skeleton" />
              ))}
            </>
          )}

          {!loading &&
            products.slice(0, 8).map((p, idx) => (
              <Link
                key={p._id}
                href={`/products/${p._id}`}
                className="showcase-card"
              >
                {/* Image */}
                <div className="showcase-card-img">
                  <img src={p.images[0]} alt={p.title} loading="lazy" />
                </div>

                {/* Title */}
                <p className="showcase-card-title">{p.title}</p>

                {/* Stars */}
                <div className="showcase-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`showcase-star ${s <= 4 ? "filled" : "empty"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Price */}
                <p className="showcase-price-main">₹{p.price}</p>

                {p.oldPrice && (
                  <div className="showcase-price-row">
                    <span className="showcase-old-price">₹{p.oldPrice}</span>
                    <span className="showcase-badge">
                      {discount(p.oldPrice, p.price)}% OFF
                    </span>
                  </div>
                )}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
