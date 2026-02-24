"use client";

import { useState } from "react";

export default function ProductInfo({ product }) {
  const [expanded, setExpanded] = useState(false);

  const discount =
    product.oldPrice && product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* MAIN INFO CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <span className="text-sm px-3 py-1 border rounded-full">
          New Arrival
        </span>

        <h1 className="text-2xl font-semibold leading-snug">{product.title}</h1>

        {!product.inStock && (
          <div className="border border-red-400 text-red-500 p-3 rounded-lg">
            Out of stock
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-3xl font-bold">₹{product.price}</h2>

          {product.oldPrice && (
            <span className="line-through text-gray-400">
              ₹{product.oldPrice}
            </span>
          )}

          {discount > 0 && (
            <span className="bg-orange-100 text-orange-600 px-3 py-1 text-sm rounded-full">
              {discount}% off
            </span>
          )}
          <p>(Incl. of all taxes)</p>
        </div>

        {/* <div className="text-sm text-gray-500">
          ⭐ {product.rating || 0} / 5
        </div> */}

        {/* 🔥 SHORT DESCRIPTION */}
        <div className="relative">
          <p
            className={`text-sm text-gray-600 transition-all duration-500 ${
              expanded ? "max-h-[500px]" : "max-h-[70px]"
            } overflow-hidden`}
          >
            {product.description}
          </p>

          {!expanded && (
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-orange-500 text-sm font-medium mt-2 hover:underline transition"
          >
            {expanded ? "View Less" : "View More"}
          </button>
        </div>
      </div>

      {/* DELIVERY CARD */}
      <div className="bg-[#f3f3f3] rounded-2xl p-5 flex justify-between items-start shadow-sm">
        <div className="space-y-1">
          <p className="text-sm font-medium">Deliver to New Delhi, 110040</p>
          <p className="text-sm text-gray-600">Express Delivery Tomorrow</p>
          <p className="text-sm text-gray-600">Cash on Delivery Available</p>
        </div>

        <button className="border border-orange-500 text-orange-500 px-4 py-1 rounded-lg text-sm hover:bg-orange-50 transition">
          Change
        </button>
      </div>

      {/* WARRANTY CARD */}
      <div className="bg-[#f3f3f3] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div className="bg-black text-white px-3 py-2 rounded-md text-sm">
          Brand
        </div>

        <p className="text-sm font-medium">2-year warranty (India)</p>
      </div>
    </div>
  );
}
