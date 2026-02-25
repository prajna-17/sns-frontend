"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API } from "@/utils/api";

export default function ShowcaseSlider() {
  const promoImage = "/img/dyson-main.jpeg";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElectronicsProducts = async () => {
      try {
        // 1️⃣ Get all super categories

        const superRes = await fetch(`${API}/super-categories`);
        const superData = await superRes.json();

        const superCategories = superData.data || superData;

        const electronics = superCategories.find(
          (s) => s.name.toLowerCase() === "electronics",
        );

        if (!electronics) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch products with electronics superCategory id
        const productRes = await fetch(
          `${API}/products?superCategory=${electronics._id}`,
        );

        const productData = await productRes.json();

        setProducts(productData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchElectronicsProducts();
  }, []);

  return (
    <div className="-px-1 mt-10">
      <div className="bg-[#2b2b2b] rounded-[30px] p-2 shadow-xl">
        {/* Promo Banner */}
        <div className="rounded-[24px] overflow-hidden mb-3">
          <img
            src={promoImage}
            alt="promo"
            className="w-full h-[290px] object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>

        {/* Products Slider */}
        <div className="overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex gap-2 snap-x snap-mandatory">
            {loading && (
              <p className="text-white px-4 py-6">Loading products...</p>
            )}

            {!loading &&
              products.slice(0, 8).map((p) => (
                <Link
                  key={p._id}
                  href={`/products/${p._id}`}
                  className="min-w-[180px] snap-start flex-shrink-0"
                >
                  <div className="bg-white rounded-[20px] p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95">
                    {/* Product Image */}
                    <div className="bg-gray-100 rounded-[16px] h-[160px] flex items-center justify-center overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="max-h-[200px] object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Title */}
                    {/* Title */}
                    <p className="mt-4 text-sm font-semibold text-gray-800 line-clamp-2">
                      {p.title}
                    </p>

                    {/* Stars */}
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

                    {/* Price Section */}
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

                          <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-1 rounded-full">
                            {Math.round(
                              ((p.oldPrice - p.price) / p.oldPrice) * 100,
                            )}
                            % OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
