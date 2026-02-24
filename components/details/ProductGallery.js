"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { API } from "@/utils/api";

export default function ProductGallery({ images = [] }) {
  const [active, setActive] = useState(0);

  // 🔥 Normalize image URLs (handles filename or full URL)
  const formattedImages = useMemo(() => {
    return images.map((img) => {
      if (img.startsWith("http")) return img;
      return `${API}/${img}`;
    });
  }, [images]);

  if (!formattedImages.length) {
    return (
      <div className="bg-white p-6 rounded-2xl">
        <div className="h-[450px] flex items-center justify-center bg-gray-100 rounded-xl">
          No Image Available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      {/* MAIN IMAGE */}
      <div className="relative w-full h-[480px] bg-[#f3f3f3] rounded-2xl overflow-hidden flex items-center justify-center">
        <Image
          src={formattedImages[active]}
          alt="product"
          fill
          priority
          className="object-contain transition-transform duration-300 hover:scale-105"
        />

        {/* SHARE BUTTON */}
        <button className="absolute top-4 right-4 bg-white shadow-md rounded-full p-3 hover:scale-105 transition">
          🔗
        </button>
      </div>

      {/* THUMBNAILS */}
      {formattedImages.length > 1 && (
        <div className="flex gap-4 mt-6 justify-center">
          {formattedImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`relative w-20 h-20 rounded-xl cursor-pointer border transition ${
                active === index ? "border-black scale-105" : "border-gray-200"
              }`}
            >
              <Image
                src={img}
                alt="thumb"
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
