"use client";

import { useEffect, useRef, useState } from "react";
import { API } from "@/utils/api";
import { useRouter } from "next/navigation";

const banners = [
  {
    src: "/img/banner-1.jpg",
    superCategory: "699d8b96faa37050c8fbf346", // Electronics
  },
  {
    src: "/img/banner-3.jpg",
    superCategory: "699d7db8b47815543edfa29c", // Furniture
  },
  {
    src: "/img/banner-2.jpg",
    superCategory: "699d8b96faa37050c8fbf346",
  },
  {
    src: "/img/banner-4.jpg",
    superCategory: "699d7db8b47815543edfa29c",
  },
];
export default function Carousel() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  // ✅ Fetch categories
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

  // ✅ Auto banner change
  useEffect(() => {
    const duration = current === 0 ? 8000 : 4000;

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [current]);

  const colors = [
    "#FDE68A",
    "#FCA5A5",
    "#A5B4FC",
    "#6EE7B7",
    "#F9A8D4",
    "#FBCFE8",
    "#BAE6FD",
    "#FDE2E2",
    "#C7D2FE",
    "#FFD6A5",
  ];

  return (
    <>
      {/* 🔥 Banner Carousel */}
      <div className="image-carousel-wrapper">
        <img
          src={banners[current].src}
          alt="carousel"
          className="image-carousel-image"
          onClick={() =>
            router.push(
              `/products?superCategory=${banners[current].superCategory}`,
            )
          }
          style={{ cursor: "pointer" }}
        />

        <div className="image-carousel-dots">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`dot ${current === index ? "active" : ""}`}
              onClick={() => setCurrent(index)}
              style={{
                "--fill-time": index === 0 ? "8s" : "4s",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 🔥 Category Slider */}
      <div className="infinite-slider" ref={scrollRef}>
        <div className="slider">
          {categories.map((cat, i) => (
            <div
              key={cat._id}
              className="slide-wrapper"
              onClick={() => router.push(`/products?category=${cat._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="slide-item"
                style={{
                  backgroundColor: colors[i % colors.length],
                }}
              >
                <img src={cat.image} alt={cat.name} />
              </div>
              <p className="slide-title">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Mobile reverse slider */}
        <div className="slider mobile-only-slider">
          {categories.map((cat, i) => (
            <div
              key={`${cat._id}-mobile`}
              className="slide-wrapper"
              onClick={() => router.push(`/products?category=${cat._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="slide-item"
                style={{
                  backgroundColor: colors[i % colors.length],
                }}
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
