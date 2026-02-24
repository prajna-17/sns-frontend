"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { API } from "@/utils/api";

export default function SimilarProducts({ currentProductId }) {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API}/products`);
        const data = await res.json();

        const allProducts = Array.isArray(data) ? data : data.data || [];

        const filtered = allProducts.filter(
          (p) => String(p._id) !== String(currentProductId),
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    }

    fetchProducts();
  }, [currentProductId]);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const scrollAmount = 300;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!products.length) return null;

  return (
    <div className="bg-white mt-12 p-6 rounded-2xl shadow-sm relative">
      <h2 className="text-2xl font-semibold mb-6">More Products</h2>

      {/* Desktop Arrows */}
      <button
        onClick={() => scroll("left")}
        className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:scale-105 transition"
      >
        ◀
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:scale-105 transition"
      >
        ▶
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="min-w-[220px] sm:min-w-[240px] bg-white border rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative w-full h-44 bg-[#f5f5f5] rounded-xl overflow-hidden">
              <Image
                src={
                  product.images?.[0]?.startsWith("http")
                    ? product.images[0]
                    : `${API}/${product.images?.[0]}`
                }
                alt={product.title}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <p className="text-sm mt-4 line-clamp-2 text-gray-700">
              {product.title}
            </p>

            <div className="mt-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-lg">₹{product.price}</span>

                {product.oldPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.oldPrice}
                    </span>

                    <span className="text-xs text-orange-500 bg-orange-100 px-2 py-1 rounded-full">
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100,
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
