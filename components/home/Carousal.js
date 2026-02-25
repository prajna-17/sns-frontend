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

  {
    /* 🔥 Banner Carousel */
  }
  return (
    <>
      {/* 🔥 Banner Carousel */}
      <div className="px-4 mt-4">
        <div className="relative overflow-hidden rounded-[28px] shadow-xl bg-white">
          <img
            src={banners[current].src}
            alt="carousel"
            onClick={() =>
              router.push(
                `/products?superCategory=${banners[current].superCategory}`,
              )
            }
            className="w-full h-[190px] object-cover transition-all duration-700 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
          />
        </div>

        {/* Premium Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {banners.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-[6px] rounded-full transition-all duration-500 cursor-pointer ${
                current === index ? "w-8 bg-gray-800" : "w-4 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🔥 Category Grid */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4">
          {categories.map((cat, i) => (
            <div
              key={cat._id}
              onClick={() => router.push(`/products?category=${cat._id}`)}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Card */}
              <div
                className="w-[150px] h-[150px] rounded-[28px] flex items-center justify-center shadow-md transition-all duration-300 
              group-hover:shadow-xl group-hover:-translate-y-1 
              active:scale-95 active:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${
                    colors[i % colors.length]
                  }, #ffffff)`,
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <p className="mt-4 text-sm font-semibold tracking-wide text-gray-800 text-center">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile reverse slider */}
      {/* <div className="slider mobile-only-slider">
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
        </div> */}
      {/* </div> */}
    </>
  );
}
