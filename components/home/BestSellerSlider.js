"use client";

import { useEffect, useState } from "react";
import { API } from "@/utils/api";
import Link from "next/link";

export default function BestSellerGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      const best = (data.data || []).filter(
        (p) => p.productSellingCategory === "best-selling",
      );
      setProducts(best.slice(0, 4));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const ranks = ["01", "02", "03", "04"];
  const labels = ["Top Pick", "Fan Fave", "Trending", "Must Have"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Outer Shell ── */
        .bs-outer {
          margin: 36px 16px 0;
          border-radius: 30px;
          overflow: hidden;
          position: relative;
          padding: 22px 18px 26px;
          background: linear-gradient(150deg, #7B5438 0%, #A0723A 40%, #C09B78 100%);
          box-shadow: 0 16px 56px rgba(100,60,20,0.28);
        }

        /* grain */
        .bs-outer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: 30px;
        }

        /* floating circle decoration */
        .bs-outer::after {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          pointer-events: none;
        }

        .bs-inner { position: relative; z-index: 1; }

        /* ── Header ── */
        .bs-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .bs-heading-wrap {}

        .bs-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: rgba(255,235,210,0.7);
          margin: 0 0 5px;
        }

        .bs-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 300;
          color: #FFF8F0;
          margin: 0;
          line-height: 1;
        }

        .bs-heading em {
          font-style: italic;
          color: #FFD9A8;
        }

        .bs-view-all {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,220,175,0.8);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,220,175,0.35);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }

        .bs-view-all:hover {
          color: #FFD9A8;
          border-color: rgba(255,217,168,0.6);
        }

        /* ── Inner White Card ── */
        .bs-card-container {
          background: rgba(255,252,247,0.96);
          border-radius: 24px;
          padding: 14px;
          box-shadow: inset 0 2px 8px rgba(100,60,20,0.08),
                      0 4px 20px rgba(0,0,0,0.1);
        }

        /* ── 2x2 Grid ── */
        .bs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* ── Product Card ── */
        .bs-card {
          display: block;
          text-decoration: none;
          background: #FAF6F0;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(210,190,170,0.4);
          box-shadow: 0 2px 10px rgba(80,40,10,0.07);
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.22s;
          animation: bsCardIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
          -webkit-tap-highlight-color: transparent;
        }

        .bs-card:nth-child(1) { animation-delay: 0.06s; }
        .bs-card:nth-child(2) { animation-delay: 0.14s; }
        .bs-card:nth-child(3) { animation-delay: 0.22s; }
        .bs-card:nth-child(4) { animation-delay: 0.30s; }

        @keyframes bsCardIn {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .bs-card:active {
          transform: scale(0.93);
          box-shadow: 0 1px 4px rgba(80,40,10,0.05);
        }

        /* shimmer top bar on hover */
        .bs-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #C09B78, #E8C88A, #C09B78);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.25s;
          animation: shimBar 2.5s linear infinite;
        }

        .bs-card:hover::after,
        .bs-card:active::after { opacity: 1; }

        @keyframes shimBar {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        /* ── Rank Badge ── */
        .bs-rank {
          position: absolute;
          top: 9px; left: 9px;
          z-index: 2;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 600;
          color: #7B5438;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(6px);
          border-radius: 10px;
          padding: 2px 7px;
          line-height: 1.4;
        }

        /* ── Label Pill ── */
        .bs-label {
          position: absolute;
          top: 9px; right: 9px;
          z-index: 2;
          font-family: 'DM Sans', sans-serif;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #C09B78, #A0723A);
          border-radius: 10px;
          padding: 3px 7px;
          box-shadow: 0 2px 6px rgba(160,114,58,0.4);
        }

        /* ── Image Area ── */
        .bs-img-wrap {
          width: 100%;
          height: 148px;
          overflow: hidden;
          position: relative;
          background: #F0E8DC;
        }

        /* ground shadow */
        .bs-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 16px;
          background: radial-gradient(ellipse, rgba(80,40,10,0.12), transparent);
          pointer-events: none;
        }

        .bs-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.1));
        }

        .bs-card:hover .bs-img-wrap img,
        .bs-card:active .bs-img-wrap img {
          transform: scale(1.08);
        }

        /* gradient over bottom of image */
        .bs-img-gradient {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 50px;
          background: linear-gradient(to top, rgba(250,246,240,0.9), transparent);
          pointer-events: none;
        }

        /* ── Card Info ── */
        .bs-card-info {
          padding: 10px 10px 12px;
        }

        .bs-card-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 400;
          color: #3D2B1F;
          text-align: center;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0 0 6px;
        }

        .bs-card-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: #7B5438;
          text-align: center;
          margin: 0;
        }

        /* ── Skeleton ── */
        .bs-skeleton-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .bs-skeleton-card {
          border-radius: 20px;
          height: 220px;
          background: linear-gradient(90deg, #EDE3D8 0%, #F5EFE6 50%, #EDE3D8 100%);
          background-size: 200% 100%;
          animation: bsSkeleton 1.6s ease-in-out infinite;
        }

        .bs-skeleton-card:nth-child(2) { animation-delay: 0.15s; }
        .bs-skeleton-card:nth-child(3) { animation-delay: 0.30s; }
        .bs-skeleton-card:nth-child(4) { animation-delay: 0.45s; }

        @keyframes bsSkeleton {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Bottom Tag Row ── */
        .bs-tag-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 16px;
        }

        .bs-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,235,210,0.65);
        }

        .bs-tag-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(255,220,175,0.4);
        }
      `}</style>

      <div className="bs-outer">
        <div className="bs-inner">
          {/* Header */}
          <div className="bs-header">
            <div className="bs-heading-wrap">
              <p className="bs-eyebrow">Customer Favourites</p>
              <h2 className="bs-heading">
                Best <em>Sellers</em>
              </h2>
            </div>
            <Link href="/products" className="bs-view-all">
              View All
            </Link>
          </div>

          {/* Inner Container */}
          <div className="bs-card-container">
            {loading ? (
              <div className="bs-skeleton-grid">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bs-skeleton-card" />
                ))}
              </div>
            ) : (
              <div className="bs-grid">
                {products.map((p, i) => (
                  <Link
                    key={p._id}
                    href={`/products/${p._id}`}
                    className="bs-card"
                  >
                    <div className="bs-rank">{ranks[i]}</div>
                    <div className="bs-label">{labels[i]}</div>

                    <div className="bs-img-wrap">
                      <img src={p.images?.[0]} alt={p.title} loading="lazy" />
                      <div className="bs-img-gradient" />
                    </div>

                    <div className="bs-card-info">
                      <p className="bs-card-title">{p.title}</p>
                      {p.price && <p className="bs-card-price">₹{p.price}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Bottom ambient tags */}
          <div className="bs-tag-row">
            <span className="bs-tag">Handpicked</span>
            <div className="bs-tag-dot" />
            <span className="bs-tag">Top Rated</span>
            <div className="bs-tag-dot" />
            <span className="bs-tag">Editor's Choice</span>
          </div>
        </div>
      </div>
    </>
  );
}
