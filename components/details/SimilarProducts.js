"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { API } from "@/utils/api";
import "./details.css";

export default function SimilarProducts({ currentProductId }) {
  const [products, setProducts] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sliderRef = useRef(null);

  // ── same backend logic (untouched) ──
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
    sliderRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const updateScrollBtns = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateScrollBtns();
    el.addEventListener("scroll", updateScrollBtns);
    return () => el.removeEventListener("scroll", updateScrollBtns);
  }, [products]);

  if (!products.length) return null;

  return (
    <div className="d-similar-wrapper">
      {/* ── Header ── */}
      <div className="d-similar-header">
        <div>
          <p
            className="d-label"
            style={{ color: "var(--d-accent)", marginBottom: "4px" }}
          >
            You might also like
          </p>
          <h2 className="d-similar-title">More Products</h2>
        </div>
        {/* Desktop scroll arrows */}
        <div className="d-similar-arrows">
          <button
            className={`d-similar-arrow ${!canScrollLeft ? "disabled" : ""}`}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            ‹
          </button>
          <button
            className={`d-similar-arrow ${!canScrollRight ? "disabled" : ""}`}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            ›
          </button>
        </div>
      </div>

      {/* ── Slider ── */}
      <div className="d-similar-track-wrap">
        {/* Left fade */}
        <div
          className={`d-similar-fade left ${canScrollLeft ? "visible" : ""}`}
        />
        {/* Right fade */}
        <div
          className={`d-similar-fade right ${canScrollRight ? "visible" : ""}`}
        />

        <div ref={sliderRef} className="d-similar-track">
          {products.map((product, index) => {
            const imgSrc = product.images?.[0]?.startsWith("http")
              ? product.images[0]
              : `${API}/${product.images?.[0]}`;

            const discountPct = product.oldPrice
              ? Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100,
                )
              : 0;

            return (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="d-similar-card"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                {/* Discount badge */}
                {discountPct > 0 && (
                  <div className="d-similar-badge">{discountPct}% OFF</div>
                )}

                {/* Image */}
                <div className="d-similar-img-wrap">
                  <Image
                    src={imgSrc}
                    alt={product.title}
                    fill
                    className="d-similar-img"
                  />
                </div>

                {/* Body */}
                <div className="d-similar-body">
                  <p className="d-similar-name">{product.title}</p>

                  <div className="d-similar-price-row">
                    <span className="d-similar-price">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="d-similar-mrp">₹{product.oldPrice}</span>
                    )}
                  </div>

                  {discountPct > 0 && (
                    <p className="d-similar-saving">
                      Save ₹{product.oldPrice - product.price}
                    </p>
                  )}
                </div>

                {/* Hover CTA */}
                <div className="d-similar-cta">View Product →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
