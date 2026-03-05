"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/app/_store/cartSlice";
import { useRouter } from "next/navigation";
// ── Styles ────────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

.cp-page *,
.cp-page *::before,
.cp-page *::after { box-sizing: border-box; margin: 0; padding: 0; }

.cp-page {
  min-height: 100vh;
  background: #f7f7f8;
  font-family: 'Poppins', sans-serif;
  padding: 32px 16px 80px;
}

/* ── Header ── */
.cp-header {
  max-width: 1100px;
  margin: 0 auto 28px;
  animation: cp-fadeDown 0.5s ease both;
}
.cp-header-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ff6b35;
  margin-bottom: 4px;
}
.cp-header-title {
  font-size: clamp(22px, 5vw, 30px);
  font-weight: 800;
  color: #111;
  letter-spacing: -0.5px;
}
.cp-header-count {
  font-size: 13px;
  color: #9a9aaa;
  font-weight: 400;
  margin-top: 2px;
}

/* ── Layout ── */
.cp-layout {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 1024px) {
  .cp-layout { grid-template-columns: 1fr 360px; align-items: start; }
}

/* ── Cart items list ── */
.cp-items { display: flex; flex-direction: column; gap: 14px; }

/* ── Cart item card ── */
.cp-card {
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 18px;
  display: flex;
  gap: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  animation: cp-cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  position: relative;
  overflow: hidden;
}
.cp-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff6b35, #ffd166);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.cp-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); border-color: #e0e0e0; }
.cp-card:hover::before { opacity: 1; }

/* stagger */
.cp-card:nth-child(1) { animation-delay: 0.05s; }
.cp-card:nth-child(2) { animation-delay: 0.1s; }
.cp-card:nth-child(3) { animation-delay: 0.15s; }
.cp-card:nth-child(4) { animation-delay: 0.2s; }
.cp-card:nth-child(5) { animation-delay: 0.25s; }

/* ── Item image ── */
.cp-img-wrap {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  background: #f5f5f5;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cp-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
  transition: transform 0.35s ease;
}
.cp-card:hover .cp-img-wrap img { transform: scale(1.06); }

/* ── Item details ── */
.cp-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}
.cp-item-title {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.cp-item-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
  flex-wrap: wrap;
}
.cp-stock {
  font-size: 11px;
  font-weight: 600;
  color: #16a34a;
  background: rgba(22,163,74,0.08);
  padding: 2px 8px;
  border-radius: 100px;
}
.cp-shipping {
  font-size: 11px;
  color: #9a9aaa;
  font-weight: 400;
}
.cp-delivery {
  font-size: 11px;
  color: #9a9aaa;
  font-weight: 400;
}
.cp-delivery strong { color: #444; font-weight: 600; }

/* ── Bottom row ── */
.cp-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  flex-wrap: wrap;
  gap: 10px;
}

/* ── Price ── */
.cp-price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.cp-price { font-size: 18px; font-weight: 800; color: #111; letter-spacing: -0.3px; }
.cp-mrp   { font-size: 12px; color: #bbb; text-decoration: line-through; }
.cp-disc  {
  font-size: 10px;
  font-weight: 700;
  background: rgba(255,107,53,0.1);
  color: #ff6b35;
  padding: 3px 8px;
  border-radius: 100px;
}

/* ── Qty + Remove ── */
.cp-actions { display: flex; align-items: center; gap: 12px; }

.cp-qty {
  display: flex;
  align-items: center;
  border: 1.5px solid #e5e5e5;
  border-radius: 10px;
  overflow: hidden;
  background: #fafafa;
}
.cp-qty-btn {
  width: 34px;
  height: 34px;
  background: none;
  border: none;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  transition: all 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.cp-qty-btn:hover { background: #f0f0f0; }
.cp-qty-btn:active { transform: scale(0.88); background: rgba(255,107,53,0.1); color: #ff6b35; }

.cp-qty-val {
  min-width: 32px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #111;
  animation: cp-numPop 0.2s cubic-bezier(0.34,1.56,0.64,1) both;
}

.cp-remove-btn {
  background: none;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #f87171;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.cp-remove-btn:hover { background: rgba(248,113,113,0.08); }
.cp-remove-btn:active { transform: scale(0.93); }

/* ── Empty state ── */
.cp-empty {
  text-align: center;
  padding: 80px 20px;
  animation: cp-fadeUp 0.5s ease both;
}
.cp-empty-icon { font-size: 52px; margin-bottom: 14px; animation: cp-wobble 2.5s ease-in-out infinite; }
.cp-empty-title { font-size: 20px; font-weight: 700; color: #111; margin-bottom: 6px; }
.cp-empty-sub { font-size: 14px; color: #9a9aaa; }

/* ── Summary card ── */
.cp-summary {
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 24px 22px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  position: sticky;
  top: 24px;
  animation: cp-fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both;
}

.cp-summary-title {
  font-size: 17px;
  font-weight: 800;
  color: #111;
  letter-spacing: -0.3px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.cp-summary-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 18px;
  background: linear-gradient(to bottom, #ff6b35, #ffd166);
  border-radius: 2px;
}

.cp-summary-rows { display: flex; flex-direction: column; gap: 13px; }

.cp-summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #555;
  font-weight: 400;
}
.cp-summary-row strong { color: #111; font-weight: 600; }
.cp-summary-row.discount { color: #16a34a; font-weight: 600; }
.cp-summary-row.free { color: #16a34a; font-weight: 600; }

.cp-summary-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 6px 0;
}

.cp-summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}
.cp-summary-total-label { font-size: 15px; font-weight: 700; color: #111; }
.cp-summary-total-val   { font-size: 20px; font-weight: 800; color: #111; letter-spacing: -0.5px; }

.cp-savings-banner {
  margin-top: 14px;
  background: rgba(22,163,74,0.07);
  border: 1px solid rgba(22,163,74,0.18);
  border-radius: 10px;
  padding: 9px 14px;
  font-size: 12px;
  font-weight: 600;
  color: #16a34a;
  text-align: center;
  animation: cp-fadeUp 0.4s ease 0.3s both;
}

.cp-checkout-btn {
  width: 100%;
  margin-top: 18px;
  padding: 15px;
  border-radius: 14px;
  background: linear-gradient(135deg, #ff6b35, #e8522a);
  border: none;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.2px;
  box-shadow: 0 8px 24px rgba(255,107,53,0.3);
  transition: all 0.15s ease;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.cp-checkout-btn:hover { box-shadow: 0 10px 28px rgba(255,107,53,0.4); transform: translateY(-1px); }
.cp-checkout-btn:active { transform: scale(0.97); box-shadow: 0 4px 12px rgba(255,107,53,0.2); }

.cp-secure {
  text-align: center;
  margin-top: 12px;
  font-size: 11px;
  color: #bbb;
  font-weight: 400;
}

/* ── Keyframes ── */
@keyframes cp-fadeDown {
  from { opacity: 0; transform: translateY(-14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cp-fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cp-cardIn {
  from { opacity: 0; transform: translateY(18px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes cp-numPop {
  from { transform: scale(0.75); opacity: 0.5; }
  to   { transform: scale(1);    opacity: 1; }
}
@keyframes cp-wobble {
  0%, 100% { transform: rotate(-6deg); }
  50%       { transform: rotate(6deg); }
}
`;

// ── Component ──────────────────────────────────────────────────────────────────
function CartPage() {
  // ── same backend logic (untouched) ──
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalMrp = cartItems.reduce(
    (mrp, item) => mrp + (item.oldPrice || 0) * item.qty,
    0,
  );
  const finalAmount = cartItems.reduce(
    (price, item) => price + item.price * item.qty,
    0,
  );
  const totalDiscount = totalMrp - finalAmount;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="cp-page">
        {/* ── Header ── */}
        <div className="cp-header">
          <p className="cp-header-eyebrow">Your Basket</p>
          <h1 className="cp-header-title">Shopping Cart</h1>
          <p className="cp-header-count">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
            cart
          </p>
        </div>

        <div className="cp-layout">
          {/* ── LEFT: Cart items ── */}
          <div className="cp-items">
            {cartItems.length === 0 ? (
              <div className="cp-empty">
                <div className="cp-empty-icon">🛒</div>
                <h3 className="cp-empty-title">Your cart is empty</h3>
                <p className="cp-empty-sub">Add some items to get started!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.variantId} className="cp-card">
                  {/* Image */}
                  <div className="cp-img-wrap">
                    <img src={item.image} alt={item.title} />
                  </div>

                  {/* Details */}
                  <div className="cp-details">
                    <div>
                      <h3 className="cp-item-title">{item.title}</h3>
                      <div className="cp-item-meta">
                        <span className="cp-stock">✓ In Stock</span>
                        <span className="cp-shipping">🚚 Free Shipping</span>
                      </div>
                      <p className="cp-delivery" style={{ marginTop: "5px" }}>
                        Delivery by <strong>{item.deliveryDate}</strong>
                      </p>
                    </div>

                    {/* Bottom row */}
                    <div className="cp-bottom">
                      <div className="cp-price-row">
                        {item.oldPrice && (
                          <span className="cp-mrp">₹{item.oldPrice}</span>
                        )}
                        <span className="cp-price">₹{item.price}</span>
                        {item.discount > 0 && (
                          <span className="cp-disc">{item.discount}% OFF</span>
                        )}
                      </div>

                      <div className="cp-actions">
                        <div className="cp-qty">
                          <button
                            className="cp-qty-btn"
                            onClick={() => {
                              dispatch(decreaseQuantity(item.variantId));
                              window.dispatchEvent(new Event("cart-updated"));
                            }}
                          >
                            −
                          </button>
                          <span className="cp-qty-val" key={item.qty}>
                            {item.qty}
                          </span>
                          <button
                            className="cp-qty-btn"
                            onClick={() => {
                              dispatch(increaseQuantity(item.variantId));
                              window.dispatchEvent(new Event("cart-updated"));
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="cp-remove-btn"
                          onClick={() => {
                            dispatch(removeItem(item.variantId));
                            window.dispatchEvent(new Event("cart-updated"));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── RIGHT: Order summary ── */}
          {cartItems.length > 0 && (
            <div className="cp-summary">
              <h2 className="cp-summary-title">Order Summary</h2>

              <div className="cp-summary-rows">
                <div className="cp-summary-row">
                  <span>Total MRP</span>
                  <strong>₹{totalMrp}</strong>
                </div>
                <div className="cp-summary-row discount">
                  <span>Discount</span>
                  <span>− ₹{totalDiscount}</span>
                </div>
                <div className="cp-summary-row free">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
              </div>

              <div className="cp-summary-divider" />

              <div className="cp-summary-total">
                <span className="cp-summary-total-label">Total Amount</span>
                <span className="cp-summary-total-val">₹{finalAmount}</span>
              </div>

              {totalDiscount > 0 && (
                <div className="cp-savings-banner">
                  🎉 You're saving ₹{totalDiscount} on this order!
                </div>
              )}

              <button
                className="cp-checkout-btn"
                onClick={() => {
                  const loggedIn = localStorage.getItem("loggedIn");
                  if (loggedIn) {
                    router.push("/checkout");
                  } else {
                    router.push("/login");
                  }
                }}
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>

              <p className="cp-secure">🔒 Secure checkout · SSL encrypted</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
