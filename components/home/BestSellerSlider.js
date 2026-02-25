"use client";

import { useEffect, useState } from "react";
import { API } from "@/utils/api";
import Link from "next/link";

export default function BestSellerGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${API}/products`);
      const data = await res.json();

      const best = (data.data || []).filter(
        (p) => p.productSellingCategory === "best-selling",
      );

      setProducts(best.slice(0, 4)); // only 4 for 2x2 grid
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-2 mt-12">
      <div className="bg-[#c09b78] rounded-[30px] p-5">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">Best Sellers</h2>

          <Link
            href="/products"
            className="text-gray-500 text-sm font-medium hover:text-black transition"
          >
            View All
          </Link>
        </div>

        {/* INNER WHITE CARD CONTAINER */}
        <div className="bg-white rounded-[24px] p-4 shadow-inner">
          {/* GRID */}
          <div className="grid grid-cols-2 gap-2">
            {products.map((p) => (
              <Link
                key={p._id}
                href={`/products/${p._id}`}
                className="bg-[#f3f3f3] rounded-[20px] p-3
                           transition-all duration-300
                           hover:shadow-lg hover:-translate-y-1
                           active:scale-[0.96]"
              >
                <div className="rounded-[16px] overflow-hidden mb-3">
                  <img
                    src={p.images?.[0]}
                    alt={p.title}
                    className="w-full h-[140px] object-cover
                               transition-transform duration-500
                               hover:scale-105"
                  />
                </div>

                <p className="text-center text-sm font-semibold text-gray-800">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
