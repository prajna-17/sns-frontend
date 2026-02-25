"use client";

import { useEffect, useState, useRef } from "react";
import { API } from "@/utils/api";
import Link from "next/link";

export default function CategoryShowcase() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [animating, setAnimating] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${API}/categories`);
      const data = await res.json();
      const cats = data.data || [];
      setCategories(cats);
      if (cats.length > 0) setActiveCategory(cats[0]._id);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data.data || []);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) => p.category?._id === activeCategory,
  );

  const handleCategoryChange = (id) => {
    if (id === activeCategory) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveCategory(id);
      setAnimating(false);
      if (sliderRef.current) sliderRef.current.scrollLeft = 0;
    }, 220);
  };

  return (
    <>
      <style>{`

        /* ── Outer Shell ── */
        .cs-outer {
          margin: 2px 2px 0;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(145deg, #F5E6D8 0%, #FAEADE 50%, #F0D9C8 100%);
          box-shadow: 0 12px 48px rgba(140,80,40,0.16);
          padding: 20px 16px 24px;
        }

        /* grain texture */
        .cs-outer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .cs-inner { position: relative; z-index: 1; }

        /* ── Top Row: banner + heading ── */
        .cs-top {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .cs-heading-block {}

        .cs-eyebrow {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #C4845A;
          margin: 0 0 6px;
        }

        .cs-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 300;
          color: #2C1A0E;
          margin: 0 0 6px;
          line-height: 1.05;
        }

        .cs-heading em {
          font-style: italic;
          color: #C4845A;
        }

        .cs-subtext {
          font-size: 11.5px;
          font-weight: 300;
          color: #9B7B68;
          margin: 0;
        }

        .cs-banner-img {
          width: 120px;
          flex-shrink: 0;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(140,80,40,0.2);
        }

        .cs-banner-img img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }

        .cs-banner-img:hover img { transform: scale(1.06); }

        /* ── Divider ── */
        .cs-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,132,90,0.3), transparent);
          margin: 0 0 18px;
        }

        /* ── Category Tabs ── */
        .cs-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 4px;
          margin-bottom: 18px;
        }

        .cs-tabs::-webkit-scrollbar { display: none; }

        .cs-tab {
          flex-shrink: 0;
          padding: 7px 16px;
          border-radius: 20px;
          border: none;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.5px;
          white-space: nowrap;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1),
                      background 0.25s, color 0.25s, box-shadow 0.25s;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(6px);
          color: #7A5E50;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .cs-tab.active {
          background: linear-gradient(135deg, #C4845A, #D4956B);
          color: #fff;
          box-shadow: 0 4px 14px rgba(196,132,90,0.4);
          transform: scale(1.05);
        }

        .cs-tab:active { transform: scale(0.92); }

        /* ── Product Slider ── */
        .cs-strip {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 6px 2px 8px;
          transition: opacity 0.22s ease;
        }

        .cs-strip.fading { opacity: 0; transform: translateX(8px); }
        .cs-strip::-webkit-scrollbar { display: none; }

        /* ── Product Card ── */
        .cs-card {
          flex: 0 0 175px;
          scroll-snap-align: start;
          background: #FFFDF9;
          border-radius: 22px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border: 1px solid rgba(210,190,175,0.5);
          box-shadow: 0 3px 14px rgba(80,40,20,0.08);
          position: relative;
          overflow: hidden;
          animation: csCardIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.22s;
          -webkit-tap-highlight-color: transparent;
        }

        .cs-card:nth-child(1) { animation-delay: 0.04s; }
        .cs-card:nth-child(2) { animation-delay: 0.10s; }
        .cs-card:nth-child(3) { animation-delay: 0.16s; }
        .cs-card:nth-child(4) { animation-delay: 0.22s; }
        .cs-card:nth-child(5) { animation-delay: 0.28s; }

        @keyframes csCardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cs-card:active {
          transform: scale(0.94);
          box-shadow: 0 1px 6px rgba(80,40,20,0.06);
        }

        /* warm shimmer top accent */
        .cs-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #C4845A, #E8C4A8, #C4845A);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.25s;
          animation: shimmerLine 2.5s linear infinite;
        }

        .cs-card:hover::before,
        .cs-card:active::before { opacity: 1; }

        @keyframes shimmerLine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Discount Badge ── */
        .cs-badge {
          position: absolute;
          top: 10px; right: 10px;
          font-size: 9px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #C4845A, #D4956B);
          border-radius: 20px;
          padding: 3px 8px;
          box-shadow: 0 2px 8px rgba(196,132,90,0.4);
          letter-spacing: 0.3px;
        }

        /* ── Card Image ── */
        .cs-img-wrap {
          height: 138px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F5EDE4;
          border-radius: 15px;
          overflow: hidden;
          margin-bottom: 11px;
          position: relative;
        }

        .cs-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 15%; right: 15%;
          height: 14px;
          background: radial-gradient(ellipse, rgba(80,40,20,0.1), transparent);
          pointer-events: none;
        }

        .cs-img-wrap img {
          max-height: 110px;
          width: 100%;
          object-fit: contain;
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
          filter: drop-shadow(0 5px 12px rgba(0,0,0,0.12));
        }

        .cs-card:hover .cs-img-wrap img,
        .cs-card:active .cs-img-wrap img {
          transform: scale(1.1) translateY(-4px);
        }

        /* ── Card Title ── */
        .cs-card-title {
          font-size: 12px;
          font-weight: 400;
          color: #4A3325;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0 0 7px;
          flex: 1;
        }

        /* ── Stars ── */
        .cs-stars {
          display: flex;
          gap: 1px;
          margin-bottom: 8px;
        }

        .cs-star { font-size: 10px; line-height: 1; }
        .cs-star.on  { color: #E8A838; }
        .cs-star.off { color: #DDD3CC; }

        /* ── Price ── */
        .cs-price-main {
          font-size: 21px;
          font-weight: 600;
          color: #1E1008;
          line-height: 1;
          margin: 0 0 4px;
        }

        .cs-price-row {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .cs-old-price {
          font-size: 11px;
          color: #C0B0A4;
          text-decoration: line-through;
        }

        /* ── View More Button ── */
        .cs-view-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 22px;
        }

        .cs-view-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(196,132,90,0.3);
          border-radius: 20px;
          padding: 11px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #3D2B1F;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.2s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .cs-view-more:hover {
          background: rgba(255,255,255,0.9);
          box-shadow: 0 4px 18px rgba(196,132,90,0.2);
        }

        .cs-view-more:active { transform: scale(0.95); }

        .cs-arrow {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #C4845A, #D4956B);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cs-arrow svg {
          width: 10px; height: 10px;
          stroke: #fff;
        }

        /* ── Empty State ── */
        .cs-empty {
          flex: 0 0 100%;
          text-align: center;
          padding: 32px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #9B7B68;
        }
      `}</style>

      <div className="cs-outer">
        <div className="cs-inner">
          {/* Top Row */}
          <div className="cs-top">
            <div className="cs-heading-block">
              <p className="cs-eyebrow">Browse by Category</p>
              <h2 className="cs-heading">
                Shop by <em>Style</em>
              </h2>
              <p className="cs-subtext">Find what fits your vibe</p>
            </div>
            <div className="cs-banner-img">
              <img src="/img/cat1.jpg" alt="banner" />
            </div>
          </div>

          <div className="cs-divider" />

          {/* Category Tabs */}
          <div className="cs-tabs">
            {categories.map((cat) => (
              <button
                key={cat._id}
                className={`cs-tab ${activeCategory === cat._id ? "active" : ""}`}
                onClick={() => handleCategoryChange(cat._id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product Strip */}
          <div
            ref={sliderRef}
            className={`cs-strip ${animating ? "fading" : ""}`}
          >
            {filteredProducts.length === 0 && !animating && (
              <div className="cs-empty">No products in this category yet.</div>
            )}

            {filteredProducts.slice(0, 10).map((p) => {
              const discount =
                p.oldPrice && p.oldPrice > p.price
                  ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
                  : 0;

              return (
                <Link
                  href={`/products/${p._id}`}
                  key={p._id}
                  className="cs-card"
                >
                  {discount > 0 && (
                    <div className="cs-badge">{discount}% OFF</div>
                  )}

                  <div className="cs-img-wrap">
                    <img src={p.images?.[0]} alt={p.title} loading="lazy" />
                  </div>

                  <p className="cs-card-title">{p.title}</p>

                  <div className="cs-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`cs-star ${s <= 4 ? "on" : "off"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="cs-price-main">₹{p.price}</p>

                  {p.oldPrice && p.oldPrice > p.price && (
                    <div className="cs-price-row">
                      <span className="cs-old-price">₹{p.oldPrice}</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* View More */}
          <div className="cs-view-more-wrap">
            <Link
              href={`/products?category=${activeCategory}`}
              className="cs-view-more"
            >
              View More
              <div className="cs-arrow">
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
