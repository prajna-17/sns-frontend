"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function CardsSection() {
  const furniture = [
    { src: "/img/furniture-1.jpg", title: "Armchair" },
    { src: "/img/furniture-2.jpg", title: "Modern Sofa" },
    {
      src: "/img/furniture-3.jpg",
      title: "Living Room Furniture",
    },
    {
      src: "/img/furniture-4.jpg",
      title: "Wooden Furniture",
    },
  ];

  return (
    <>
      <style>{`
				@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

				:root {
					--cream: #FAF7F2;
					--warm-white: #FFFDF9;
					--bark: #3D2B1F;
					--clay: #C4845A;
					--sage: #8A9E84;
					--gold: #C9A84C;
					--muted: #9B8E85;
					--card-radius: 20px;
				}

			cards-section-cover

				.section-wrapper {
					background: var(--warm-white);
					padding: 0;
					overflow: hidden;
				}

				/* ── Header ── */
				.section-header {
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					padding: 36px 24px 20px;
					position: relative;
				}

				.section-header::after {
					content: '';
					position: absolute;
					bottom: 0; left: 24px;
					width: 40px; height: 2px;
					background: var(--clay);
					border-radius: 2px;
				}

				.section-header h2 {
					font-family: 'Cormorant Garamond', serif;
					font-size: 36px;
					font-weight: 300;
					letter-spacing: -0.5px;
					color: var(--bark);
					margin: 0;
					line-height: 1;
				}

				.section-header h2 span {
					display: block;
					font-size: 12px;
					font-family: 'DM Sans', sans-serif;
					font-weight: 500;
					letter-spacing: 3px;
					text-transform: uppercase;
					color: var(--clay);
					margin-bottom: 4px;
				}

				.view-all-btn {
					font-family: 'DM Sans', sans-serif;
					font-size: 11px;
					font-weight: 500;
					letter-spacing: 2px;
					text-transform: uppercase;
					color: var(--muted);
					text-decoration: none;
					border-bottom: 1px solid var(--muted);
					padding-bottom: 2px;
					transition: color 0.3s, border-color 0.3s;
				}

				.view-all-btn:hover {
					color: var(--clay);
					border-color: var(--clay);
				}

				/* ── Horizontal Scroll Strip ── */
				.section-cards {
					display: flex;
					gap: 16px;
					padding: 24px 24px 32px;
					overflow-x: auto;
					scroll-snap-type: x mandatory;
					-webkit-overflow-scrolling: touch;
					scrollbar-width: none;
				}

				.section-cards::-webkit-scrollbar { display: none; }

				/* ── Card ── */
				.section-card {
					flex: 0 0 200px;
					scroll-snap-align: start;
					border-radius: var(--card-radius);
					overflow: hidden;
					background: var(--cream);
					position: relative;
					cursor: pointer;
					animation: cardReveal 0.6s cubic-bezier(0.22,1,0.36,1) both;
				}

				.section-card:nth-child(1) { animation-delay: 0.05s; }
				.section-card:nth-child(2) { animation-delay: 0.15s; }
				.section-card:nth-child(3) { animation-delay: 0.25s; }
				.section-card:nth-child(4) { animation-delay: 0.35s; }

				@keyframes cardReveal {
					from { opacity: 0; transform: translateY(24px) scale(0.97); }
					to   { opacity: 1; transform: translateY(0) scale(1); }
				}

				.card-img {
					width: 100%;
					height: 230px;
					overflow: hidden;
					position: relative;
				}

				.card-img::after {
					content: '';
					position: absolute;
					inset: 0;
					background: linear-gradient(
						180deg,
						transparent 50%,
						rgba(61,43,31,0.35) 100%
					);
					opacity: 0;
					transition: opacity 0.35s;
				}

				.section-card:active .card-img::after,
				.section-card:hover .card-img::after {
					opacity: 1;
				}

				.card-img img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
					display: block;
				}

				.section-card:active .card-img img,
				.section-card:hover .card-img img {
					transform: scale(1.07);
				}

				/* ── Card Badge (number) ── */
				.card-badge {
					position: absolute;
					top: 12px;
					left: 12px;
					width: 28px; height: 28px;
					background: rgba(255,255,255,0.88);
					backdrop-filter: blur(6px);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-family: 'Cormorant Garamond', serif;
					font-size: 13px;
					font-weight: 600;
					color: var(--bark);
					z-index: 2;
				}

				/* ── Card Info ── */
				.card-info {
					padding: 14px 14px 16px;
				}

				.card-title {
					font-family: 'DM Sans', sans-serif;
					font-size: 13px;
					font-weight: 500;
					color: var(--bark);
					margin: 0 0 4px;
					line-height: 1.3;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.card-price {
					font-family: 'Cormorant Garamond', serif;
					font-size: 17px;
					font-weight: 600;
					color: var(--clay);
					margin: 0;
				}

				/* ── Wishlist Dot ── */
				.card-wish {
					position: absolute;
					top: 12px; right: 12px;
					width: 30px; height: 30px;
					background: rgba(255,255,255,0.88);
					backdrop-filter: blur(6px);
					border-radius: 50%;
					border: none;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					z-index: 2;
					transition: transform 0.2s;
				}

				.card-wish:active { transform: scale(0.85); }

				.card-wish svg {
					width: 14px; height: 14px;
					stroke: var(--bark);
					fill: none;
					transition: fill 0.2s, stroke 0.2s;
				}

				.card-wish.active svg {
					fill: var(--clay);
					stroke: var(--clay);
				}

				/* ── Scroll Dots ── */
				.scroll-dots {
					display: flex;
					gap: 5px;
					justify-content: center;
					padding-bottom: 50px;
				}

				.scroll-dot {
					width: 5px; height: 5px;
					border-radius: 50%;
					background: #D9D1C9;
					transition: background 0.3s, width 0.3s;
				}

				.scroll-dot.active {
					background: var(--clay);
					width: 18px;
					border-radius: 3px;
				}
			`}</style>

      <div className="cards-section-cover mt-5">
        <Card
          bg="#FFFDF9"
          title="Products"
          items={furniture}
          route="/furniture"
        />
      </div>
    </>
  );
}

export default CardsSection;

function Card({ bg, title, items }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = 200 + 16; // card + gap
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const toggleWish = (index, e) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="section-wrapper" style={{ backgroundColor: bg }}>
      <div className="section-header">
        <h2>
          <span>Curated</span>
          {title}
        </h2>
        <Link href="/products" className="view-all-btn">
          View All
        </Link>
      </div>

      <div className="section-cards" ref={scrollRef}>
        {items.map((item, index) => (
          <Link key={index} href="/products" className="section-card">
            {" "}
            <div className="card-img">
              <img src={item.src} alt={item.title} loading="lazy" />
            </div>
            <span className="card-badge">
              {String(index + 1).padStart(2, "0")}
            </span>
            {/* <button
              className={`card-wish ${wishlist[index] ? "active" : ""}`}
              onClick={(e) => toggleWish(index, e)}
              aria-label="Add to wishlist"
            >
              <svg viewBox="0 0 24 24" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button> */}
            <div className="card-info">
              <p className="card-title">{item.title}</p>
              <p className="card-price">{item.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="scroll-dots">
        {items.map((_, i) => (
          <div
            key={i}
            className={`scroll-dot ${i === activeIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
