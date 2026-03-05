"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./details.css";
import { addToCart } from "@/utils/cart";
export default function StickyActionBar({ product }) {
  const router = useRouter();
  const [cartState, setCartState] = useState("idle"); // idle | adding | added
  const [buyState, setBuyState] = useState("idle"); // idle | loading | done
  const [particles, setParticles] = useState([]);

  // ── Cart animation ──
  const handleAddToCart = () => {
    if (cartState !== "idle") return;

    // 🔥 REAL CART FUNCTION
    addToCart({
      productId: product._id,
      id: product._id,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice,
      images: product.images,
      image: product.images?.[0],
      color: product.selectedColor || "Default",
      size: product.selectedSize || "Free",
    });

    setCartState("adding");

    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 120 - 60,
      y: -(Math.random() * 60 + 40),
    }));

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 900);

    setTimeout(() => {
      setCartState("added");
      setTimeout(() => setCartState("idle"), 2200);
    }, 600);
  };

  // ── Buy Now animation ──
  const handleBuyNow = () => {
    if (buyState !== "idle") return;

    const loggedIn = localStorage.getItem("loggedIn");

    // product object for cart
    const item = {
      productId: product._id,
      id: product._id,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice,
      images: product.images,
      image: product.images?.[0],
      color: product.selectedColor || "Default",
      size: product.selectedSize || "Free",
    };

    // add item to cart
    addToCart(item);

    setBuyState("loading");

    setTimeout(() => {
      if (!loggedIn) {
        router.push("/login?redirect=/checkout");
      } else {
        router.push("/checkout");
      }
    }, 600);
  };

  return (
    <>
      {/* ── Floating particles ── */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="d-bar-particle"
          style={{ "--px": `${p.x}px`, "--py": `${p.y}px` }}
        >
          🛍
        </div>
      ))}

      <div className="d-action-bar">
        {/* ── Add to Cart ── */}
        <button
          className={`d-action-cart ${cartState}`}
          onClick={handleAddToCart}
          disabled={cartState !== "idle"}
        >
          <span className="d-action-btn-inner">
            {cartState === "idle" && (
              <>
                <span className="d-action-icon"></span>
                <span>Add to Cart</span>
              </>
            )}
            {cartState === "adding" && <span className="d-action-spinner" />}
            {cartState === "added" && (
              <>
                <span className="d-action-icon d-action-check">✓</span>
                <span>Added!</span>
              </>
            )}
          </span>
        </button>

        {/* ── Buy Now ── */}
        <button
          className={`d-action-buy ${buyState}`}
          onClick={handleBuyNow}
          disabled={buyState !== "idle"}
        >
          <span className="d-action-btn-inner">
            {buyState === "idle" && (
              <>
                <span className="d-action-icon"></span>
                <span>Buy Now</span>
              </>
            )}
            {buyState === "loading" && (
              <span className="d-action-spinner white" />
            )}
            {buyState === "done" && (
              <>
                <span className="d-action-icon d-action-check">✓</span>
                <span>Order Placed!</span>
              </>
            )}
          </span>
        </button>
      </div>

      {/* ── Toast messages ── */}
      <div
        className={`d-bar-toast cart-toast ${cartState === "added" ? "show" : ""}`}
      >
        Item added to your cart!
      </div>
      <div
        className={`d-bar-toast buy-toast ${buyState === "done" ? "show" : ""}`}
      >
        Redirecting to checkout…
      </div>
    </>
  );
}
