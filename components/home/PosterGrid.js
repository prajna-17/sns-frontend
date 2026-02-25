import Link from "next/link";

export default function PosterGrid() {
  const ELECTRONICS_ID = "699d8b96faa37050c8fbf346";
  const FURNITURE_ID = "699d7db8b47815543edfa29c";

  const posters = [
    {
      src: "/img/poster-1.jpg",
      title: "ELECTRONICS",
      superCategory: ELECTRONICS_ID,
      tag: "New Arrivals",
    },
    {
      src: "/img/poster-2.jpg",
      title: "LUXURY FURNITURES",
      superCategory: FURNITURE_ID,
      tag: "Bestsellers",
    },
    {
      src: "/img/poster-3.jpg",
      title: "CLASSY FURNITURES",
      superCategory: FURNITURE_ID,
      tag: "Trending",
    },
    {
      src: "/img/poster-4.jpg",
      title: "DEVICES",
      superCategory: ELECTRONICS_ID,
      tag: "Top Picks",
    },
  ];

  const accents = ["#C4845A", "#8A9E84", "#9B8BB4", "#C4845A"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@400;500&display=swap');

        .poster-section {
          padding: 28px 0 12px;
        }

        .poster-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: 0 20px 16px;
        }

        .poster-section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 300;
          color: #2C2018;
          margin: 0;
          line-height: 1;
        }

        .poster-section-heading em {
          font-style: italic;
          font-weight: 300;
          color: #C4845A;
        }

        .poster-section-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #B0A49C;
          text-decoration: none;
        }

        /* ── Scroll Strip ── */
        .poster-strip {
          display: flex;
          gap: 14px;
          padding: 4px 20px 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .poster-strip::-webkit-scrollbar { display: none; }

        /* ── Card ── */
        .poster-card {
          flex: 0 0 150px;
          scroll-snap-align: start;
          display: block;
          text-decoration: none;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          background: #F5F0EA;
          box-shadow: 0 4px 18px rgba(0,0,0,0.09);
          animation: posterReveal 0.55s cubic-bezier(0.22,1,0.36,1) both;
          -webkit-tap-highlight-color: transparent;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.2s;
        }

        .poster-card:nth-child(1) { animation-delay: 0.04s; }
        .poster-card:nth-child(2) { animation-delay: 0.12s; }
        .poster-card:nth-child(3) { animation-delay: 0.20s; }
        .poster-card:nth-child(4) { animation-delay: 0.28s; }

        @keyframes posterReveal {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .poster-card:active {
          transform: scale(0.94);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        /* ── Image ── */
        .poster-img-wrap {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
        }

        .poster-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }

        .poster-card:hover .poster-img-wrap img,
        .poster-card:active .poster-img-wrap img {
          transform: scale(1.06);
        }

        /* gradient over image bottom */
        .poster-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(30,18,10,0.55) 100%
          );
          border-radius: 22px 22px 0 0;
          pointer-events: none;
        }

        /* ── Tag pill ── */
        .poster-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          padding: 4px 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #3D2B1F;
          z-index: 2;
        }

        /* ── Title over image ── */
        .poster-title-over {
          position: absolute;
          bottom: 14px;
          left: 12px;
          right: 12px;
          z-index: 2;
          pointer-events: none;
        }

        .poster-title-over p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 600;
          color: #fff;
          margin: 0;
          line-height: 1.2;
          letter-spacing: 0.3px;
        }

        /* ── Accent Bar ── */
        .poster-accent-bar {
          height: 4px;
          width: 100%;
          border-radius: 0 0 22px 22px;
        }

        /* ── Shop CTA at bottom ── */
        .poster-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 4px 0 8px;
        }

        .poster-cta-row span {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #9B8B83;
        }

        .poster-cta-arrow {
          width: 18px; height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F0E8E0;
        }

        .poster-cta-arrow svg {
          width: 10px; height: 10px;
          stroke: #C4845A;
        }
      `}</style>

      <div className="poster-section">
        {/* Header */}
        <div className="poster-section-header">
          <h2 className="poster-section-heading">
            Shop by <em>Mood</em>
          </h2>
          <Link href="/products" className="poster-section-sub">
            All →
          </Link>
        </div>

        {/* Scroll Strip */}
        <div className="poster-strip">
          {posters.map((item, i) => (
            <Link
              href={`/products?superCategory=${item.superCategory}`}
              key={i}
              className="poster-card"
            >
              {/* Image */}
              <div className="poster-img-wrap">
                <img src={item.src} alt={item.title} loading="lazy" />

                {/* Tag */}
                <div className="poster-tag">{item.tag}</div>

                {/* Title over image */}
                <div className="poster-title-over">
                  <p>{item.title}</p>
                </div>
              </div>

              {/* Accent bar */}
              <div
                className="poster-accent-bar"
                style={{ background: accents[i % accents.length] }}
              />

              {/* Shop CTA */}
              <div className="poster-cta-row">
                <span>Shop</span>
                <div className="poster-cta-arrow">
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
