"use client";

import { useEffect, useState, useRef } from "react";
import { API } from "@/utils/api";
import Link from "next/link";

export default function CategoryShowcase() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const sliderRef = useRef(null);

  // Fetch categories
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

  // Fetch products
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

  return (
    <div className="px-1 mt-10">
      <div className="bg-[#fce0d4] rounded-[20px] p-2 pt-2 shadow-xl overflow-hidden">
        {/* TOP SECTION */}
        <div className="flex justify-between items-center mb-5">
          {/* <div>
            <h2 className="text-2xl font-bold text-black">Under ₹1,499</h2>
            <p className="text-gray-800 mt-1">Budget friendly headphones</p>
          </div> */}

          <div className="w-[340px] flex-shrink-0 rounded-[20px]">
            <img
              src="/img/cat1.jpg"
              alt="banner"
              className="w-full h-auto object-contain drop-shadow-lg rounded-[20px]"
            />
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat._id
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "bg-white text-gray-700 shadow"
              } active:scale-95`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* PRODUCT SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {filteredProducts.slice(0, 10).map((p) => {
            const discount =
              p.oldPrice && p.oldPrice > p.price
                ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
                : 0;

            return (
              <Link
                href={`/products/${p._id}`}
                key={p._id}
                className="min-w-[220px] bg-white rounded-[28px] p-4 snap-start
                         shadow-md transition-all duration-300
                         hover:shadow-2xl hover:-translate-y-1
                         active:scale-[0.96]"
              >
                {/* IMAGE */}
                <div className="h-[150px] flex items-center justify-center mb-4 bg-gray-50 rounded-[20px] overflow-hidden">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="max-h-full object-contain transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* TITLE */}
                <div className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                  {p.title}
                </div>

                {/* RATING */}
                <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
                  ⭐⭐⭐⭐☆
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-black">
                    ₹{p.price}
                  </span>

                  {p.oldPrice && p.oldPrice > p.price && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{p.oldPrice}
                      </span>

                      <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded-full">
                        {discount}% off
                      </span>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* VIEW MORE */}
        <div className="flex justify-center mt-6">
          <Link
            href={`/products?category=${activeCategory}`}
            className="bg-white px-10 py-3 rounded-xl shadow-md text-gray-900 font-semibold
                     hover:bg-gray-100 transition-all duration-300
                     active:scale-95"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}
