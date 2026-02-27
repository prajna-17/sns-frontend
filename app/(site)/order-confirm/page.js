"use client";

import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const STYLES = `
  * { box-sizing: border-box; }
  
  .oc-root {
    min-height: 100vh;
background: linear-gradient(135deg, #f7fffb 0%, #e6fff4 100%);   display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 16px 40px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    position: relative;
    overflow: hidden;
    margin-top:20px
  }

  .oc-confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    pointer-events: none;
    z-index: 1;
  }

  .oc-container {
    max-width: 500px;
    width: 100%;
    position: relative;
    z-index: 10;
  }

  /* ── SUCCESS CHECKMARK ── */
  .oc-checkmark-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 28px;
    animation: oc-bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  .oc-checkmark-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    box-shadow: 0 20px 60px rgba(34, 197, 94, 0.4), inset 0 -2px 8px rgba(0,0,0,0.1);
    position: relative;
    animation: oc-scale-pulse 0.7s ease-out 0.3s both;
  }

  .oc-checkmark-circle::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    animation: oc-ring-expand 0.8s ease-out 0.3s;
  }

  @keyframes oc-bounce-in {
    0% {
      opacity: 0;
      transform: scale(0) translateY(40px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes oc-scale-pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes oc-ring-expand {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2.2);
      opacity: 0;
    }
  }

  /* ── HEADER ── */
  .oc-header {
    text-align: center;
    margin-bottom: 32px;
    animation: oc-fade-up 0.8s ease-out 0.2s both;
  }

  .oc-title {
    font-size: clamp(24px, 6vw, 32px);
    font-weight: 800;
    color: linear-gradient(135deg, #ff5c35 0%, #ff9a3c 100%);
    margin: 0 0 8px;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }

  .oc-subtitle {
    font-size: 15px;
    color: linear-gradient(135deg, #ff5c35 0%, #ff9a3c 100%);;
    margin: 0;
    line-height: 1.5;
  }

  @keyframes oc-fade-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ── CARD ── */
  .oc-card {
    background: #fff;
    border-radius: 24px;
    padding: 28px 24px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    animation: oc-slide-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    backdrop-filter: blur(10px);
  }

  .oc-card:nth-child(1) { animation-delay: 0.3s; }
  .oc-card:nth-child(2) { animation-delay: 0.4s; }
  .oc-card:nth-child(3) { animation-delay: 0.5s; }
  .oc-card:nth-child(4) { animation-delay: 0.6s; }

  @keyframes oc-slide-up {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* ── ORDER ID CARD ── */
  .oc-order-id-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    text-align: center;
    padding: 24px !important;
    margin-bottom: 20px !important;
  }

  .oc-order-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.8;
    margin: 0 0 8px;
  }

  .oc-order-id {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 2px;
    margin: 0;
    font-family: 'Monaco', 'Courier New', monospace;
    word-break: break-all;
  }

  .oc-copy-btn {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 12px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .oc-copy-btn:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.25);
  }

  /* ── STATUS SECTION ── */
  .oc-status-section {
    margin-bottom: 24px;
  }

  .oc-section-title {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #999;
    margin: 0 0 16px;
  }

  /* ── TIMELINE ── */
  .oc-timeline {
    position: relative;
    padding-left: 30px;
  }

  .oc-timeline::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #22c55e 0%, #e5e7eb 100%);
  }

  .oc-timeline-item {
    position: relative;
    margin-bottom: 20px;
    animation: oc-fade-in-item 0.6s ease-out both;
  }

  .oc-timeline-item:nth-child(1) { animation-delay: 0.7s; }
  .oc-timeline-item:nth-child(2) { animation-delay: 0.8s; }
  .oc-timeline-item:nth-child(3) { animation-delay: 0.9s; }
  .oc-timeline-item:nth-child(4) { animation-delay: 1s; }

  @keyframes oc-fade-in-item {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .oc-timeline-dot {
    position: absolute;
    left: -18px;
    top: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #22c55e;
    border: 3px solid #fff;
    box-shadow: 0 0 0 2px #22c55e;
    transition: all 0.3s;
  }

  .oc-timeline-item.completed .oc-timeline-dot {
    transform: scale(1.2);
  }

  .oc-timeline-item.pending .oc-timeline-dot {
    background: #e5e7eb;
    border-color: #fff;
    box-shadow: 0 0 0 2px #d1d5db;
  }

  .oc-timeline-content {
    padding: 12px 14px;
    background: #f9fafb;
    border-radius: 12px;
    border-left: 2px solid #e5e7eb;
    transition: all 0.3s;
  }

  .oc-timeline-item.completed .oc-timeline-content {
    background: #f0fdf4;
    border-color: #22c55e;
  }

  .oc-timeline-title {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 2px;
  }

  .oc-timeline-time {
    font-size: 12px;
    color: #aaa;
    margin: 0;
  }

  /* ── DETAILS SECTION ── */
  .oc-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }

  .oc-detail-box {
    background: #f9fafb;
    padding: 16px;
    border-radius: 14px;
    text-align: center;
    transition: all 0.3s;
    animation: oc-detail-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  .oc-detail-box:nth-child(1) { animation-delay: 0.8s; }
  .oc-detail-box:nth-child(2) { animation-delay: 0.85s; }
  .oc-detail-box:nth-child(3) { animation-delay: 0.9s; }
  .oc-detail-box:nth-child(4) { animation-delay: 0.95s; }

  @keyframes oc-detail-pop {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .oc-detail-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .oc-detail-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #999;
    margin: 0 0 4px;
  }

  .oc-detail-value {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0;
  }

  .oc-detail-sub {
    font-size: 12px;
    color: #aaa;
    margin: 0;
    margin-top: 2px;
  }

  /* ── ADDRESS SECTION ── */
  .oc-address-card {
    background: #f9fafb;
    padding: 16px;
    border-radius: 14px;
    border-left: 3px solid #667eea;
  }

  .oc-address-label {
    font-size: 12px;
    font-weight: 600;
    color: #667eea;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 8px;
  }

  .oc-address-name {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 4px;
  }

  .oc-address-text {
    font-size: 13px;
    color: #555;
    line-height: 1.6;
    margin: 0;
  }

  /* ── ORDER ITEMS ── */
  .oc-items-list {
    background: #f9fafb;
    border-radius: 14px;
    overflow: hidden;
  }

  .oc-item {
    display: flex;
    gap: 12px;
    padding: 14px 16px;
    border-bottom: 1px solid #e5e7eb;
    align-items: center;
    animation: oc-item-slide 0.5s ease-out both;
  }

  .oc-item:last-child {
    border-bottom: none;
  }

  .oc-item:nth-child(1) { animation-delay: 0.9s; }
  .oc-item:nth-child(2) { animation-delay: 0.95s; }
  .oc-item:nth-child(3) { animation-delay: 1s; }

  @keyframes oc-item-slide {
    from {
      opacity: 0;
      transform: translateX(-15px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .oc-item-img {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    border: 1px solid #e5e7eb;
    flex-shrink: 0;
    overflow: hidden;
  }

  .oc-item-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .oc-item-info {
    flex: 1;
    min-width: 0;
  }

  .oc-item-name {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .oc-item-qty {
    font-size: 11px;
    color: #aaa;
    margin: 2px 0 0;
  }

  .oc-item-price {
    font-size: 14px;
    font-weight: 700;
    color: #667eea;
    flex-shrink: 0;
  }

  /* ── PRICE BREAKDOWN ── */
  .oc-price-section {
    background: #f9fafb;
    padding: 16px;
    border-radius: 14px;
    margin-top: 16px;
  }

  .oc-price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 13px;
  }

  .oc-price-row.total {
    font-size: 18px;
    font-weight: 800;
    color: #1a1a2e;
    padding-top: 10px;
    border-top: 1px solid #e5e7eb;
    margin-top: 12px;
    margin-bottom: 0;
  }

  .oc-price-value {
    font-weight: 600;
    color: #555;
  }

  .oc-price-row.total .oc-price-value {
    color: #667eea;
    font-size: 20px;
  }

  .oc-free-badge {
    background: #f0fdf4;
    color: #22c55e;
    font-weight: 600;
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 100px;
    border: 1px solid #bbf7d0;
  }

  /* ── ACTION BUTTONS ── */
  .oc-button-group {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    animation: oc-fade-up 0.8s ease-out 1.1s both;
  }

  .oc-btn {
    flex: 1;
    padding: 14px;
    border-radius: 14px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .oc-btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  .oc-btn-primary:active {
    transform: scale(0.97);
  }

  .oc-btn-primary:hover {
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
  }

  .oc-btn-secondary {
    background: #f3f4f6;
    color: #667eea;
    border: 2px solid #667eea;
  }

  .oc-btn-secondary:active {
    transform: scale(0.97);
    background: #e5e7eb;
  }

  /* ── DIVIDER ── */
  .oc-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
    margin: 20px 0;
  }

  /* ── TOAST ── */
  .oc-toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a2e;
    color: #fff;
    padding: 12px 20px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 600;
    z-index: 9999;
    animation: oc-toast-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .oc-toast.exit {
    animation: oc-toast-out 0.3s ease both;
  }

  @keyframes oc-toast-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes oc-toast-out {
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }

  /* ── PULSE ANIMATION ── */
  @keyframes oc-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  .oc-pulse {
    animation: oc-pulse 2s ease-in-out infinite;
  }

  /* Mobile Adjustments */
  @media (max-width: 480px) {
    .oc-card {
      padding: 20px 16px;
    }

    .oc-title {
      font-size: 22px;
    }

    .oc-details-grid {
      grid-template-columns: 1fr;
    }

    .oc-button-group {
      flex-direction: column;
    }
  }
`;

// Confetti particle creation
function createConfetti(x, y) {
  const confetti = document.createElement("div");
  confetti.className = "oc-confetti";
  confetti.style.left = x + "px";
  confetti.style.top = y + "px";

  const colors = [
    "#667eea",
    "#764ba2",
    "#22c55e",
    "#fbbf24",
    "#f87171",
    "#60a5fa",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.backgroundColor = color;

  const size = 4 + Math.random() * 8;
  confetti.style.width = size + "px";
  confetti.style.height = size + "px";
  confetti.style.borderRadius = "50%";

  const tx = (Math.random() - 0.5) * 200;
  const ty = Math.random() * 300 + 100;
  const rotation = Math.random() * 720;
  const duration = 2.5 + Math.random() * 0.5;

  confetti.style.animation = `
    confetti-fall ${duration}s ease-in forwards
  `;

  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), duration * 1000);
}

function triggerConfetti() {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes confetti-fall {
      to {
        transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = -10;
      createConfetti(x, y);
    }, i * 20);
  }
}

// Play success sound
function playSuccessSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.5,
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

// Trigger vibration pattern
function triggerVibration() {
  if (navigator.vibrate) {
    navigator.vibrate([150, 100, 150, 100, 200]);
  }
}

export default function OrderConfirmPage() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);

  const [mounted, setMounted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) setOrderId(id);

    if (!localStorage.getItem("loggedIn")) {
      router.push("/login");
      return;
    }

    // Trigger celebrations
    setTimeout(() => {
      triggerConfetti();
      playSuccessSound();
      triggerVibration();
    }, 600);

    // Update time
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const subtotal = cartItems.reduce((a, i) => a + i.price * i.qty, 0);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setToast("Order ID copied! 📋");
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setToast(""), 2700);
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleTrackOrder = () => {
    router.push(`/track?id=${orderId}`);
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="oc-root">
        <div className="oc-container">
          {/* Success Checkmark */}
          <div className="oc-checkmark-wrapper">
            <div className="oc-checkmark-circle">✓</div>
          </div>

          {/* Header */}
          <div className="oc-header">
            <h1 className="oc-title">Order Confirmed! </h1>
            <p className="oc-subtitle">
              Your order has been placed successfully and is being prepared
            </p>
          </div>

          {/* Order ID Card */}
          <div className="oc-card oc-order-id-card">
            <p className="oc-order-label">Order ID</p>
            <p className="oc-order-id">{orderId}</p>
            <button className="oc-copy-btn" onClick={copyOrderId}>
              {copied ? "✓ Copied!" : "📋 Copy ID"}
            </button>
          </div>

          {/* Details Grid */}
          <div className="oc-card">
            <div className="oc-section-title">Order Details</div>
            <div className="oc-details-grid">
              <div className="oc-detail-box">
                <p className="oc-detail-label">Est. Delivery</p>
                <p className="oc-detail-value">3 Days</p>
                <p className="oc-detail-sub">
                  {estimatedDelivery.toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="oc-card">
            <div className="oc-section-title">Order Status</div>
            <div className="oc-timeline">
              <div className="oc-timeline-item completed">
                <div className="oc-timeline-dot"></div>
                <div className="oc-timeline-content">
                  <p className="oc-timeline-title">✓ Order Confirmed</p>
                  <p className="oc-timeline-time">Just now</p>
                </div>
              </div>
              <div className="oc-timeline-item pending">
                <div className="oc-timeline-dot"></div>
                <div className="oc-timeline-content">
                  <p className="oc-timeline-title">Processing</p>
                  <p className="oc-timeline-time">In progress</p>
                </div>
              </div>
              <div className="oc-timeline-item pending">
                <div className="oc-timeline-dot"></div>
                <div className="oc-timeline-content">
                  <p className="oc-timeline-title">Dispatched</p>
                  <p className="oc-timeline-time">Coming soon</p>
                </div>
              </div>
              <div className="oc-timeline-item pending">
                <div className="oc-timeline-dot"></div>
                <div className="oc-timeline-content">
                  <p className="oc-timeline-title">Delivered</p>
                  <p className="oc-timeline-time">
                    Est.{" "}
                    {estimatedDelivery.toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="oc-card">
            <div className="oc-section-title">
              Order Items ({cartItems.length})
            </div>
            <div className="oc-items-list">
              {cartItems.map((item, idx) => (
                <div key={idx} className="oc-item">
                  <div className="oc-item-img">
                    {item.image ? (
                      <img src={item.image} alt={item.title} />
                    ) : (
                      "🛍️"
                    )}
                  </div>
                  <div className="oc-item-info">
                    <p className="oc-item-name">{item.title}</p>
                    <p className="oc-item-qty">Qty: {item.qty}</p>
                  </div>
                  <p className="oc-item-price">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="oc-price-section">
              <div className="oc-price-row">
                <span>Subtotal</span>
                <span className="oc-price-value">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="oc-price-row">
                <span>Delivery Charges</span>
                <span className="oc-free-badge">FREE</span>
              </div>
              <div className="oc-price-row">
                <span>Taxes & Fees</span>
                <span className="oc-price-value">Included</span>
              </div>
              <div className="oc-price-row total">
                <span>Total Amount</span>
                <span className="oc-price-value">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="oc-card">
            <div className="oc-section-title">Delivery Address</div>
            <div className="oc-address-card">
              <p className="oc-address-label">📍 Delivery To</p>
              <p className="oc-address-name">
                {cartItems[0]?.address?.name || "Your Address"}
              </p>
              <p className="oc-address-text">
                {cartItems[0]?.address?.address || "Address not available"}
                <br />
                {cartItems[0]?.address?.city || "City"} •{" "}
                {cartItems[0]?.address?.state || "State"} -{" "}
                {cartItems[0]?.address?.pincode || "Pincode"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="oc-button-group">
            <button
              className="oc-btn oc-btn-secondary"
              onClick={handleContinueShopping}
            >
              Shop More
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && <div className="oc-toast">{toast}</div>}
      </div>
    </>
  );
}
