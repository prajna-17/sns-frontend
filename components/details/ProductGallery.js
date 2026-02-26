"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { API } from "@/utils/api";
import "./details.css";

export default function ProductGallery({ images = [] }) {
  const [active, setActive] = useState(0);
  const [entering, setEntering] = useState(false);

  // ── same backend logic (untouched) ──
  const formattedImages = useMemo(() => {
    return images.map((img) => {
      if (img.startsWith("http")) return img;
      return `${API}/${img}`;
    });
  }, [images]);

  // Animate on image switch
  const switchImage = useCallback(
    (index) => {
      if (index === active) return;
      setEntering(true);
      setActive(index);
      setTimeout(() => setEntering(false), 380);
    },
    [active],
  );

  const prev = () =>
    switchImage((active - 1 + formattedImages.length) % formattedImages.length);
  const next = () => switchImage((active + 1) % formattedImages.length);

  // ── Empty state ──
  if (!formattedImages.length) {
    return (
      <div className="d-gallery">
        <div className="d-gallery-empty">
          <div className="d-gallery-empty-icon">🖼️</div>
          <span>No Image Available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-gallery">
      {/* ── MAIN STAGE ── */}
      <div className="d-gallery-stage">
        {/* Image counter */}
        <div className="d-gallery-counter">
          <strong>{active + 1}</strong> / {formattedImages.length}
        </div>

        {/* Share button */}
        <button
          className="d-gallery-share"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ url: window.location.href });
            } else {
              navigator.clipboard?.writeText(window.location.href);
            }
          }}
          title="Share"
        >
          🔗
        </button>

        {/* Prev / Next arrows (only if multiple images) */}
        {formattedImages.length > 1 && (
          <>
            <button
              className="d-gallery-arrow prev"
              onClick={prev}
              disabled={false}
            >
              ‹
            </button>
            <button
              className="d-gallery-arrow next"
              onClick={next}
              disabled={false}
            >
              ›
            </button>
          </>
        )}

        {/* Main image */}
        <Image
          src={formattedImages[active]}
          alt="product"
          fill
          priority
          className={`d-gallery-img ${entering ? "entering" : ""}`}
        />

        {/* Dot indicators */}
        {formattedImages.length > 1 && (
          <div className="d-gallery-dots">
            {formattedImages.map((_, i) => (
              <div
                key={i}
                className={`d-gallery-dot ${i === active ? "active" : ""}`}
                onClick={() => switchImage(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── THUMBNAILS ── */}
      {formattedImages.length > 1 && (
        <div className="d-gallery-thumbs">
          {formattedImages.map((img, index) => (
            <div
              key={index}
              className={`d-gallery-thumb ${active === index ? "active" : ""}`}
              onClick={() => switchImage(index)}
            >
              <Image src={img} alt={`thumb-${index}`} fill className="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
