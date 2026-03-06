"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { API } from "@/utils/api";

// ─── Inject global styles ───────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

/* Scoped reset — only inside pp-page */
.pp-page *, .pp-page *::before, .pp-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
/* Drawer and toast are fixed/portaled, reset them too */
.pp-drawer *, .pp-drawer *::before, .pp-drawer *::after { box-sizing: border-box; margin: 0; padding: 0; }
.pp-toast * { box-sizing: border-box; }

:root {
  --bg: #0d0d0f;
  --surface: #161618;
  --surface2: #1e1e22;
  --border: rgba(255,255,255,0.07);
  --accent: #ff6b35;
  --accent2: #ff9a5c;
  --gold: #ffd166;
  --text: #f0eff4;
  --muted: #8a8a9a;
  --radius: 18px;
  --radius-sm: 10px;
  --font: 'Poppins', sans-serif;
}

/* ── Page wrapper ── */
.pp-page {
  min-height: 100vh;
  background: var(--bg);
  font-family: var(--font);
  color: var(--text);
  overflow-x: hidden;
  padding-bottom: 40px;
  margin-top: 20px
}

/* ── Hero header ── */
.pp-hero {
  position: relative;
  padding: 52px 24px 36px;
  text-align: center;
  overflow: hidden;
}
.pp-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,53,0.18) 0%, transparent 70%);
  pointer-events: none;
}
.pp-hero-eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(255,107,53,0.12);
  border: 1px solid rgba(255,107,53,0.25);
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 14px;
  animation: fadeSlideDown 0.6s ease both;
}
.pp-hero-title {
  font-size: clamp(28px, 7vw, 40px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.5px;
  animation: fadeSlideDown 0.7s ease both;
}
.pp-hero-title span {
  background: linear-gradient(90deg, var(--accent), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.pp-hero-sub {
  margin-top: 10px;
  font-size: 13px;
  color: var(--muted);
  font-weight: 400;
  animation: fadeSlideDown 0.8s ease both;
}
.pp-hero-orbs {
  position: absolute;
  width: 200px; height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,107,53,0.15), transparent);
  top: -60px; right: -60px;
  pointer-events: none;
  animation: pulse 4s ease-in-out infinite;
}
.pp-hero-orbs2 {
  width: 130px; height: 130px;
  top: 20px; left: -40px;
  background: radial-gradient(circle, rgba(255,166,92,0.1), transparent);
  animation-delay: 2s;
}

/* ── Filter pill bar ── */
.pp-filter-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px 20px;
  animation: fadeSlideDown 0.9s ease both;
}
.pp-filter-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}
.pp-filter-btn:active {
  transform: scale(0.95);
  background: rgba(255,107,53,0.15);
  border-color: var(--accent);
}
.pp-filter-btn svg { width: 15px; height: 15px; }
.pp-active-chips {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.pp-active-chips::-webkit-scrollbar { display: none; }
.pp-chip {
  flex-shrink: 0;
  font-family: var(--font);
  font-size: 11px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 100px;
  background: rgba(255,107,53,0.15);
  border: 1px solid rgba(255,107,53,0.3);
  color: var(--accent2);
  animation: chipPop 0.25s cubic-bezier(0.34,1.56,0.64,1) both;
}

/* ── Results count ── */
.pp-count {
  padding: 0 20px 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
  animation: fadeIn 1s ease both;
}
.pp-count strong { color: var(--text); }

/* ── Products grid ── */
.pp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 0 14px;
}

/* ── Product card ── */
.pp-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease, border-color 0.18s ease;
  animation: cardFadeIn 0.5s ease both;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}
.pp-card:active {
  transform: scale(0.94);
  box-shadow: 0 0 0 2px var(--accent);
  border-color: var(--accent);
}
.pp-card:active .pp-card-img::after {
  opacity: 1;
}

/* stagger cards */
.pp-card:nth-child(1) { animation-delay: 0.05s; }
.pp-card:nth-child(2) { animation-delay: 0.1s; }
.pp-card:nth-child(3) { animation-delay: 0.15s; }
.pp-card:nth-child(4) { animation-delay: 0.2s; }
.pp-card:nth-child(5) { animation-delay: 0.25s; }
.pp-card:nth-child(6) { animation-delay: 0.3s; }
.pp-card:nth-child(7) { animation-delay: 0.35s; }
.pp-card:nth-child(8) { animation-delay: 0.4s; }

.pp-card-img {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: var(--surface2);
  overflow: hidden;
}
.pp-card-img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,107,53,0.18);
  opacity: 0;
  transition: opacity 0.15s ease;
}
.pp-card-img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.pp-card-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, var(--accent), #ff4500);
  color: #fff;
  font-family: var(--font);
  font-size: 10px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 6px;
  z-index: 2;
}

.pp-card-body {
  padding: 10px 10px 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.pp-card-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.pp-card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--gold);
}
.pp-card-rating span { font-size: 10px; color: var(--muted); font-weight: 400; }
.pp-card-price-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 2px;
}
.pp-card-price {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}
.pp-card-mrp {
  font-size: 11px;
  color: var(--muted);
  text-decoration: line-through;
}
.pp-card-offer {
  font-size: 10px;
  font-weight: 700;
  color: #4ade80;
}

/* ── Empty state ── */
.pp-empty {
  grid-column: 1 / -1;
  padding: 60px 20px;
  text-align: center;
  animation: fadeIn 0.5s ease;
}
.pp-empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  animation: wobble 2s ease-in-out infinite;
}
.pp-empty h3 { font-size: 17px; font-weight: 700; margin-bottom: 6px; }
.pp-empty p  { font-size: 13px; color: var(--muted); }

/* ── Pagination ── */
.pp-pagination {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 24px;
}
.pp-page-btn {
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 600;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.pp-page-btn:not(:disabled):active {
  transform: scale(0.9);
  background: var(--accent);
  border-color: var(--accent);
}
.pp-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.pp-page-info {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  min-width: 60px;
  text-align: center;
}
.pp-page-info strong { color: var(--text); }

/* ── Drawer backdrop ── */
.pp-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.pp-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}

/* ── Filter drawer ── */
.pp-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1a1a1e;
  border-radius: 24px 24px 0 0;
  z-index: 101;
  padding: 0 20px 40px;
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1);
  box-shadow: 0 -20px 60px rgba(0,0,0,0.5);
  max-height: 85vh;
  overflow-y: auto;
}
.pp-drawer.open { transform: translateY(0); }

.pp-drawer-handle {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: var(--border);
  margin: 14px auto 20px;
}
.pp-drawer-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pp-drawer-close {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--surface2);
  border: none;
  color: var(--muted);
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font);
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s;
}
.pp-drawer-close:active { transform: scale(0.9); background: var(--accent); color: #fff; }

.pp-filter-section { margin-bottom: 24px; }
.pp-filter-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 10px;
  display: block;
}
.pp-filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pp-filter-pill {
  font-family: var(--font);
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 100px;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.pp-filter-pill:active, .pp-filter-pill.active {
  background: rgba(255,107,53,0.15);
  border-color: var(--accent);
  color: var(--accent2);
}

.pp-apply-btn {
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--accent), #e8522a);
  border: none;
  color: #fff;
  font-family: var(--font);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s ease;
  box-shadow: 0 8px 24px rgba(255,107,53,0.3);
}
.pp-apply-btn:active {
  transform: scale(0.97);
  box-shadow: 0 4px 12px rgba(255,107,53,0.2);
}

/* ── Toast ── */
.pp-toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: #1e1e22;
  border: 1px solid rgba(255,107,53,0.3);
  color: var(--text);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 100px;
  z-index: 200;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  white-space: nowrap;
  box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  pointer-events: none;
}
.pp-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.pp-toast-icon { margin-right: 6px; }

/* ── Skeleton loader ── */
.pp-skeleton {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.pp-skel-img {
  width: 100%;
  padding-top: 100%;
  background: linear-gradient(90deg, var(--surface2) 25%, #2a2a30 50%, var(--surface2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
.pp-skel-line {
  height: 10px;
  border-radius: 6px;
  margin: 10px 10px 6px;
  background: linear-gradient(90deg, var(--surface2) 25%, #2a2a30 50%, var(--surface2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
.pp-skel-line.short { width: 50%; margin-top: 0; margin-bottom: 12px; }

/* ── Keyframes ── */
@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes cardFadeIn {
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes chipPop {
  from { opacity: 0; transform: scale(0.75); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
}
@keyframes wobble {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`;

// ─── Toast component ──────────────────────────────────────────────────────────
function Toast({ message, show }) {
  return (
    <div className={`pp-toast ${show ? "show" : ""}`}>
      <span className="pp-toast-icon">✨</span>
      {message}
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function Skeletons() {
  return Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="pp-skeleton">
      <div className="pp-skel-img" />
      <div className="pp-skel-line" />
      <div className="pp-skel-line short" />
    </div>
  ));
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductsClient() {
  // const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: "" });

  const router = useRouter();
  const searchParams = useSearchParams();

  // ── same backend logic ──
  const page = Number(searchParams.get("page")) || 1;
  const perPage = 8;
  const ratingFilter = Number(searchParams.get("rating")) || 0;
  const discountFilter = Number(searchParams.get("discount")) || 0;
  const maxPriceFilter = Number(searchParams.get("price")) || 0;
  const categoryFilter = searchParams.get("category") || "";
  const superCategoryFilter = searchParams.get("superCategory") || "";
  const searchQuery = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const ratingCache = useRef({});
  const getRating = (id) => {
    if (!ratingCache.current[id]) {
      ratingCache.current[id] = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
    }
    return ratingCache.current[id];
  };

  const filteredItems = useMemo(() => {
    let items = products.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!p.title?.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    if (sort === "low") {
      items = items.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      items = items.sort((a, b) => b.price - a.price);
    }

    if (sort === "popular") {
      items = items.sort(
        (a, b) => Number(getRating(b._id)) - Number(getRating(a._id)),
      );
    }

    return items;
  }, [products, searchQuery, sort]);
  const totalPages = Math.ceil(filteredItems.length / perPage);
  const paginatedItems = filteredItems.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "0") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", 1);
    router.push(`?${params.toString()}`);
  };

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${API}/products`;
        const queryParams = [];
        if (superCategoryFilter)
          queryParams.push(`superCategory=${superCategoryFilter}`);
        if (categoryFilter) queryParams.push(`category=${categoryFilter}`);
        if (queryParams.length > 0) url += `?${queryParams.join("&")}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryFilter, superCategoryFilter]);

  // ── rating helpers ──

  // ── toast helper ──
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2200);
  };

  // ── filter state for pills (local until Apply) ──
  // const [localRating, setLocalRating] = useState(String(ratingFilter));
  // const [localPrice, setLocalPrice] = useState(String(maxPriceFilter));
  // const [localDiscount, setLocalDiscount] = useState(String(discountFilter));

  const openDrawer = () => {
    setLocalRating(String(ratingFilter));
    setLocalPrice(String(maxPriceFilter));
    setLocalDiscount(String(discountFilter));
    setShowFilters(true);
  };
  const applyFilters = () => {
    updateParam("rating", localRating);
    updateParam("price", localPrice);
    updateParam("discount", localDiscount);
    setShowFilters(false);
    showToast("Filters applied!");
  };

  const activeFiltersCount = [
    ratingFilter,
    maxPriceFilter,
    discountFilter,
  ].filter(Boolean).length;

  // active chip labels
  const activeChips = [];
  if (ratingFilter) activeChips.push(`⭐ ${ratingFilter}+`);
  if (maxPriceFilter)
    activeChips.push(`₹ Under ${maxPriceFilter.toLocaleString()}`);
  if (discountFilter) activeChips.push(`🏷 ${discountFilter}%+ off`);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="pp-page">
        {/* HERO */}
        <div className="pp-hero">
          <div className="pp-hero-orbs" />
          <div className="pp-hero-orbs pp-hero-orbs2" />
          <div className="pp-hero-eyebrow">🛍 Shop Now</div>
          <h1 className="pp-hero-title">
            Find Your
            <br />
            <span>Perfect Pick</span>
          </h1>
          <p className="pp-hero-sub">
            {loading
              ? "Loading products…"
              : searchQuery
                ? `${filteredItems.length} results for "${searchQuery}"`
                : `${filteredItems.length} products waiting for you`}
          </p>
        </div>

        {/* FILTER TOGGLE + ACTIVE CHIPS */}
        <div className="pp-filter-toggle">
          <button
            className="pp-filter-btn"
            onClick={() => updateParam("sort", "low")}
          >
            Low → High
          </button>

          <button
            className="pp-filter-btn"
            onClick={() => updateParam("sort", "high")}
          >
            High → Low
          </button>

          <button
            className="pp-filter-btn"
            onClick={() => updateParam("sort", "popular")}
          >
            Popularity
          </button>
        </div>
        {/* PRODUCTS GRID */}
        <div className="pp-grid">
          {loading ? (
            <Skeletons />
          ) : paginatedItems.length === 0 ? (
            <div className="pp-empty">
              <div className="pp-empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            paginatedItems.map((product) => {
              const discountPct = product.oldPrice
                ? Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100,
                  )
                : 0;
              return (
                <Link
                  href={`/products/${product._id}`}
                  className="pp-card"
                  key={product._id}
                  onClick={() => showToast(`Added to your journey ✦`)}
                >
                  {discountPct > 0 && (
                    <div className="pp-card-badge">{discountPct}% OFF</div>
                  )}
                  <div className="pp-card-img">
                    <img src={product.images?.[0]} alt={product.title} />
                  </div>
                  <div className="pp-card-body">
                    <div className="pp-card-title">{product.title}</div>
                    <div className="pp-card-rating">
                      ★ {getRating(product._id)}
                      <span>(reviews)</span>
                    </div>
                    <div className="pp-card-price-row">
                      {product.oldPrice && (
                        <span className="pp-card-mrp">₹{product.oldPrice}</span>
                      )}
                      <span className="pp-card-price">₹{product.price}</span>
                      {discountPct > 0 && (
                        <span className="pp-card-offer">↓{discountPct}%</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}

          {/* PAGINATION */}
          {!loading && filteredItems.length > 0 && (
            <div className="pp-pagination">
              <button
                className="pp-page-btn"
                disabled={page <= 1}
                onClick={() => changePage(page - 1)}
              >
                ‹
              </button>
              <div className="pp-page-info">
                <strong>{page}</strong> / {totalPages || 1}
              </div>
              <button
                className="pp-page-btn"
                disabled={page >= totalPages}
                onClick={() => changePage(page + 1)}
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* BACKDROP */}
        {/* <div
          className={`pp-backdrop ${showFilters ? "open" : ""}`}
          onClick={() => setShowFilters(false)}
        /> */}

        {/* FILTER DRAWER */}
      </div>

      <Toast show={toast.show} message={toast.msg} />
    </>
  );
}
