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

  // 🔥 Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`);
        const data = await res.json();

        setProducts(data.data || []);
      } catch (err) {
        console.error(err);
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
    <div className="px-4 mt-8">
      {/* Heading */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold tracking-wide text-gray-900">
          Latest Launches
        </h2>

        <Link
          href="/products"
          className="text-gray-500 text-sm font-medium hover:text-gray-800 transition"
        >
          View All
        </Link>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2"
      >
        {products.map((p) => {
          const discount =
            p.oldPrice && p.oldPrice > p.price
              ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
              : 0;

          return (
            <Link
              href={`/products/${p._id}`}
              key={p._id}
              className="min-w-[200px] bg-white rounded-[24px] shadow-md p-4 snap-start 
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                       active:scale-[0.97] relative"
            >
              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {discount}% OFF
                </div>
              )}

              {/* Image */}
              <div className="w-full h-[160px] flex items-center justify-center mb-4">
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="max-h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Title */}
              <div className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                {p.title}
              </div>

              {/* Rating */}
              <div className="mt-1 flex items-center gap-1 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-base ${
                      star <= 4 ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="mt-1">
                {/* Final Price */}
                <div className="text-xl font-bold text-gray-900">
                  ₹{p.price}
                </div>

                {/* Old Price + Discount */}
                {p.oldPrice && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      MRP
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{p.oldPrice}
                    </span>

                    {/* <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-1 rounded-full">
                      {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                      OFF
                    </span> */}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
