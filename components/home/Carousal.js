"use client";

import { useEffect, useRef, useState } from "react";
import { API } from "@/utils/api";
import { useRouter } from "next/navigation";

const banners = [
  { src: "/img/b1.png", superCategory: "699d7db8b47815543edfa29c" },
  { src: "/img/b2.png", superCategory: "699d7db8b47815543edfa29c" },
  { src: "/img/b5.png", superCategory: "699d8b96faa37050c8fbf346" },
  { src: "/img/b4.png", superCategory: "699d7db8b47815543edfa29c" },
];

export default function Carousel() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API}/categories`);
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const duration = current === 0 ? 8000 : 4000;
    const timer = setTimeout(() => {
      setPrev(current);
      setCurrent((p) => (p + 1) % banners.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [current]);

  const colors = [
    "#FFE8D6",
    "#D6EAF8",
    "#D5F5E3",
    "#FDE8F0",
    "#EDE7F6",
    "#FFF9C4",
    "#E8F8F5",
    "#FADBD8",
    "#EBF5FB",
    "#F9EBEA",
  ];

  return (
    <>
      <style>{`

        /* ── Banner ── */
       .carousel-outer {
  position: relative;
  margin: 0;
  padding: 0;          /* add this */
  border-radius: 20;    /* remove rounded outer gap */
  overflow: hidden;
  height: 280px;      /* increase banner size */
  width: 100%;        /* full width */
  box-shadow: none;   /* optional: removes outer shadow */
}

        .carousel-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;   /* change from contain → cover */
  cursor: pointer;
  transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1),
              transform 0.7s cubic-bezier(0.4,0,0.2,1);
}

        .carousel-slide.entering {
          opacity: 0;
          transform: scale(1.04);
          z-index: 2;
        }

        .carousel-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        .carousel-slide.exiting {
          opacity: 0;
          transform: scale(0.97);
          z-index: 1;
        }

        /* subtle gradient bottom overlay */
        .carousel-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 70px;
          background: linear-gradient(to top, rgba(0,0,0,0.32), transparent);
          border-radius: 0 0 24px 24px;
          z-index: 3;
          pointer-events: none;
        }

        /* ── Dots ── */
        .carousel-dots {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 4;
        }

        .carousel-dot {
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.45);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
          width: 20px;
        }

        .carousel-dot.active {
          width: 36px;
          background: rgba(255,255,255,0.35);
        }

        .carousel-dot.active::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          width: 100%;
          background: #fff;
          border-radius: 2px;
          animation: dotFill var(--fill-time, 4s) linear forwards;
        }

        @keyframes dotFill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Category Slider ── */
        .infinite-slider {
          padding: 22px 0 8px;
          overflow: hidden;
        }

        .slider {
          display: flex;
          gap: 14px;
          padding: 4px 16px 8px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .slider::-webkit-scrollbar { display: none; }

        .slide-wrapper {
          flex: 0 0 72px;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        .slide-wrapper:nth-child(1) { animation-delay: 0.04s; }
        .slide-wrapper:nth-child(2) { animation-delay: 0.09s; }
        .slide-wrapper:nth-child(3) { animation-delay: 0.14s; }
        .slide-wrapper:nth-child(4) { animation-delay: 0.19s; }
        .slide-wrapper:nth-child(5) { animation-delay: 0.24s; }
        .slide-wrapper:nth-child(6) { animation-delay: 0.29s; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .slide-item {
          width: 62px;
          height: 62px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.22s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          position: relative;
        }

        .slide-wrapper:active .slide-item {
          transform: scale(0.88);
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }

        .slide-item::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          border: 1.5px solid rgba(255,255,255,0.7);
          pointer-events: none;
        }

        .slide-item img {
          width: 70%;
          height: 70%;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.12));
          transition: transform 0.3s;
        }

        .slide-wrapper:active .slide-item img {
          transform: scale(0.95);
        }

        .slide-title {
  font-size: 15px;
  font-weight: 500;
  color: #3D3533;
  text-align: center;
  margin: 0;
  line-height: 1.2;
  max-width: 68px;

  white-space: normal;   /* allow multiple lines */
  word-break: break-word; /* break long words */
}
      `}</style>

      {/* ── Banner Carousel ── */}
      <div className="carousel-outer">
        {banners.map((banner, index) => {
          let cls = "";
          if (index === current) cls = "active";
          else if (index === prev) cls = "exiting";
          else cls = "entering";

          return (
            <img
              key={index}
              src={banner.src}
              alt="carousel"
              className={`carousel-slide ${cls}`}
              onClick={() =>
                router.push(`/products?superCategory=${banner.superCategory}`)
              }
            />
          );
        })}

        <div className="carousel-overlay" />

        <div className="carousel-dots">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${current === index ? "active" : ""}`}
              onClick={() => {
                setPrev(current);
                setCurrent(index);
              }}
              style={{ "--fill-time": index === 0 ? "8s" : "4s" }}
            />
          ))}
        </div>
      </div>

      {/* ── Category Slider ── */}
      <div className="infinite-slider" ref={scrollRef}>
        <div className="slider">
          {categories.map((cat, i) => (
            <div
              key={cat._id}
              className="slide-wrapper"
              onClick={() => router.push(`/products?category=${cat._id}`)}
            >
              <div
                className="slide-item"
                style={{ backgroundColor: colors[i % colors.length] }}
              >
                <img src={cat.image} alt={cat.name} />
              </div>
              <p className="slide-title">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
