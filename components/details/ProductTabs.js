"use client";

import { useState } from "react";

export default function ProductTabs({ product }) {
  const [active, setActive] = useState("description");
  const [expanded, setExpanded] = useState(false);

  const tabs = ["description", "reviews", "return & refund"];

  return (
    <div className="bg-white mt-6 p-6 rounded-2xl shadow-sm">
      {/* TAB BUTTONS */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-5 py-2 rounded-full text-sm capitalize transition-all duration-300 ${
              active === tab
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DESCRIPTION TAB */}
      {active === "description" && (
        <div className="relative">
          <p
            className={`text-gray-600 transition-all duration-500 ease-in-out ${
              expanded ? "max-h-[1000px]" : "max-h-[100px]"
            } overflow-hidden`}
          >
            {product.description}
          </p>

          {!expanded && (
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm hover:bg-orange-50 transition"
          >
            {expanded ? "View Less" : "View More"}
          </button>
        </div>
      )}

      {/* REVIEWS TAB */}
      {active === "reviews" && (
        <div className="space-y-4">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="border rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {review.user || "Anonymous"}
                  </span>
                  <span className="text-sm text-gray-500">
                    ⭐ {review.rating}
                  </span>
                </div>

                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              ⭐ No reviews yet
            </div>
          )}
        </div>
      )}

      {/* RETURN & REFUND TAB */}
      {active === "return & refund" && (
        <div className="text-gray-600 space-y-3 text-sm">
          <p>We offer a 7-day return policy from the date of delivery.</p>
          <p>The product must be unused and in original packaging.</p>
          <p>Refunds are processed within 5–7 business days after approval.</p>
          <p>For assistance, contact customer support through your account.</p>
        </div>
      )}
    </div>
  );
}
