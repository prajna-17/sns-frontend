"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Download,
  MessageCircle,
  Share2,
  MapPin,
  Calendar,
  Package,
  Truck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { API } from "@/utils/api";
import jsPDF from "jspdf";
const STYLES = `
  .orddetail-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px 16px 80px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .orddetail-container {
    max-width: 650px;
    margin: 0 auto;
  }

  /* ── HEADER ── */
  .orddetail-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    animation: orddetail-fade-in 0.6s ease-out;
  }

  .orddetail-back-btn {
    background: #fff;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #667eea;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .orddetail-back-btn:hover {
    background: #667eea;
    color: #fff;
  }

  .orddetail-title-section h1 {
    font-size: 24px;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0;
  }

  .orddetail-title-section p {
    font-size: 13px;
    color: #999;
    margin: 2px 0 0;
  }

  @keyframes orddetail-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── STATUS CARD ── */
  .orddetail-status-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    animation: orddetail-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
  }

  @keyframes orddetail-slide-up {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .orddetail-status-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }

  .orddetail-status-title {
    font-size: 20px;
    font-weight: 800;
    margin: 0 0 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .orddetail-status-desc {
    font-size: 13px;
    opacity: 0.9;
    margin: 0;
  }

  /* ── INFO CARD ── */
  .orddetail-card {
    background: #fff;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    animation: orddetail-card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .orddetail-card:nth-child(2) { animation-delay: 0.2s; }
  .orddetail-card:nth-child(3) { animation-delay: 0.25s; }
  .orddetail-card:nth-child(4) { animation-delay: 0.3s; }
  .orddetail-card:nth-child(5) { animation-delay: 0.35s; }

  @keyframes orddetail-card-in {
    from {
      opacity: 0;
      transform: translateY(15px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .orddetail-card-title {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #999;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* ── TIMELINE ── */
  .orddetail-timeline {
    position: relative;
    padding-left: 30px;
  }

  .orddetail-timeline::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #667eea 0%, #e5e7eb 100%);
  }

  .orddetail-timeline-item {
    position: relative;
    margin-bottom: 20px;
  }

  .orddetail-timeline-dot {
    position: absolute;
    left: -18px;
    top: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #667eea;
    border: 3px solid #fff;
    box-shadow: 0 0 0 2px #667eea;
  }

  .orddetail-timeline-item.pending .orddetail-timeline-dot {
    background: #e5e7eb;
    box-shadow: 0 0 0 2px #d1d5db;
  }

  .orddetail-timeline-content {
    padding: 12px 14px;
    background: #f9fafb;
    border-radius: 10px;
    border-left: 2px solid #e5e7eb;
  }

  .orddetail-timeline-item.completed .orddetail-timeline-content {
    background: #f0f9ff;
    border-color: #667eea;
  }

  .orddetail-timeline-title {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 2px;
  }

  .orddetail-timeline-time {
    font-size: 12px;
    color: #aaa;
    margin: 0;
  }

  /* ── DELIVERY ADDRESS ── */
  .orddetail-address-box {
    background: #f9fafb;
    border-radius: 12px;
    padding: 14px;
    border-left: 3px solid #667eea;
  }

  .orddetail-address-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #667eea;
    margin-bottom: 6px;
  }

  .orddetail-address-name {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 4px;
  }

  .orddetail-address-text {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    margin: 0;
  }

  /* ── ITEMS ── */
  .orddetail-items-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .orddetail-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: #f9fafb;
    border-radius: 12px;
    align-items: center;
  }

  .orddetail-item-img {
    width: 56px;
    height: 56px;
    border-radius: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border: 1px solid #e5e7eb;
    flex-shrink: 0;
  }

  .orddetail-item-info {
    flex: 1;
    min-width: 0;
  }

  .orddetail-item-name {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .orddetail-item-qty {
    font-size: 12px;
    color: #999;
    margin: 2px 0 0;
  }

  .orddetail-item-price {
    font-size: 14px;
    font-weight: 700;
    color: #667eea;
    flex-shrink: 0;
  }

  /* ── PRICE BREAKDOWN ── */
  .orddetail-price-breakdown {
    background: #f9fafb;
    border-radius: 12px;
    padding: 14px;
  }

  .orddetail-price-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 13px;
    color: #666;
  }

  .orddetail-price-row.total {
    font-size: 16px;
    font-weight: 800;
    color: #1a1a2e;
    padding-top: 8px;
    border-top: 1px solid #e5e7eb;
    margin-top: 8px;
    margin-bottom: 0;
  }

  .orddetail-price-value {
    font-weight: 600;
    color: #1a1a2e;
  }

  .orddetail-price-row.total .orddetail-price-value {
    color: #667eea;
  }

  /* ── ACTION BUTTONS ── */
  .orddetail-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 20px;
  }

  .orddetail-action-btn {
    background: #fff;
    border: 1.5px solid #e5e5e5;
    padding: 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: #667eea;
    transition: all 0.3s;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .orddetail-action-btn:hover {
    background: #667eea;
    color: #fff;
    border-color: #667eea;
    transform: translateY(-1px);
  }

  .orddetail-action-btn:active {
    transform: scale(0.97);
  }

  /* Mobile */
  @media (max-width: 480px) {
    .orddetail-actions {
      grid-template-columns: 1fr;
    }

    .orddetail-card {
      padding: 16px;
    }
  }
`;

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id;

  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("loggedIn")) {
      router.push("/login");
      return;
    }

    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/orders/order-details/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const order = data?.data;

      if (!order) {
        setOrder(null);
        setLoading(false);
        return;
      }
      const formatted = {
        id: order._id,
        status: order.orderStatus,
        statusIcon: "📦",
        statusDesc: "Your order is being processed",
        date: new Date(order.createdAt),

        items: order.products.map((p, i) => ({
          id: i,
          title: p.title,
          qty: p.quantity,
          price: p.price,
          image: "📦",
        })),

        subtotal: order.totalAmount,
        delivery: 0,
        total: order.totalAmount,

        address: {
          name: order.shippingAddress.fullName,
          phone: order.shippingAddress.phone,
          address: order.shippingAddress.addressLine,
          city: order.shippingAddress.city,
          state: order.shippingAddress.state,
          pincode: order.shippingAddress.postalCode,
        },

        timeline: order.statusTimeline.map((t) => ({
          title: t.status,
          time: new Date(t.date),
          completed: true,
        })),
      };

      setOrder(formatted);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const downloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 35);
    doc.text(`Date: ${formatDate(order.date)}`, 20, 45);

    doc.text("Customer:", 20, 60);
    doc.text(order.address.name, 20, 70);
    doc.text(`${order.address.address}, ${order.address.city}`, 20, 80);
    doc.text(`${order.address.state} - ${order.address.pincode}`, 20, 90);

    let y = 110;

    doc.text("Items:", 20, y);
    y += 10;

    order.items.forEach((item) => {
      doc.text(
        `${item.title}  x${item.qty}  - ₹${item.price * item.qty}`,
        20,
        y,
      );
      y += 10;
    });

    y += 10;
    doc.text(`Subtotal: ₹${order.subtotal}`, 20, y);
    y += 10;
    doc.text(`Delivery: FREE`, 20, y);
    y += 10;
    doc.text(`Total: ₹${order.total}`, 20, y);

    doc.save(`invoice_${order.id}.pdf`);
  };
  if (!mounted || loading) {
    return (
      <div className="orddetail-root">
        <div
          className="orddetail-container"
          style={{ textAlign: "center", paddingTop: "60px" }}
        >
          <div
            style={{
              display: "inline-block",
              width: "32px",
              height: "32px",
              border: "3px solid #e5e5e5",
              borderTopColor: "#667eea",
              borderRadius: "50%",
              animation: "orddetail-spin 0.8s linear infinite",
            }}
          />
          <p style={{ color: "#999", marginTop: "16px" }}>
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="orddetail-root">
        <div
          className="orddetail-container"
          style={{ textAlign: "center", paddingTop: "60px" }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
          <p style={{ color: "#999" }}>Order not found</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="orddetail-root">
        <div className="orddetail-container">
          {/* Header */}
          <div className="orddetail-header">
            <button
              className="orddetail-back-btn"
              onClick={() => router.back()}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="orddetail-title-section">
              <h1>{order.id}</h1>
              <p>Ordered on {formatDate(order.date)}</p>
            </div>
          </div>

          {/* Status Card */}
          <div className="orddetail-status-card">
            <div className="orddetail-status-icon">{order.statusIcon}</div>
            <h2 className="orddetail-status-title">{order.status}</h2>
            <p className="orddetail-status-desc">{order.statusDesc}</p>
          </div>

          {/* Timeline */}
          <div className="orddetail-card">
            <h3 className="orddetail-card-title">
              <Package size={16} /> Order Timeline
            </h3>
            <div className="orddetail-timeline">
              {order.timeline.map((event, idx) => (
                <div
                  key={idx}
                  className={`orddetail-timeline-item ${
                    event.completed ? "completed" : "pending"
                  }`}
                >
                  <div className="orddetail-timeline-dot" />
                  <div className="orddetail-timeline-content">
                    <p className="orddetail-timeline-title">
                      {event.completed ? "✓" : "•"} {event.title}
                    </p>
                    <p className="orddetail-timeline-time">
                      {formatDate(event.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="orddetail-card">
            <h3 className="orddetail-card-title">
              <MapPin size={16} /> Delivery Address
            </h3>
            <div className="orddetail-address-box">
              <p className="orddetail-address-label">📍 Delivering To</p>
              <p className="orddetail-address-name">{order.address.name}</p>
              <p className="orddetail-address-text">
                {order.address.address}
                <br />
                {order.address.city} • {order.address.state} -{" "}
                {order.address.pincode}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="orddetail-card">
            <h3 className="orddetail-card-title">
              <Package size={16} /> Order Items ({order.items.length})
            </h3>
            <div className="orddetail-items-list">
              {order.items.map((item) => (
                <div key={item.id} className="orddetail-item">
                  <div className="orddetail-item-img">{item.image}</div>
                  <div className="orddetail-item-info">
                    <p className="orddetail-item-name">{item.title}</p>
                    <p className="orddetail-item-qty">Qty: {item.qty}</p>
                  </div>
                  <p className="orddetail-item-price">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div style={{ marginTop: "16px" }}>
              <div className="orddetail-price-breakdown">
                <div className="orddetail-price-row">
                  <span>Subtotal</span>
                  <span className="orddetail-price-value">
                    ₹{order.subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="orddetail-price-row">
                  <span>Delivery</span>
                  <span
                    className="orddetail-price-value"
                    style={{ color: "#22c55e" }}
                  >
                    FREE
                  </span>
                </div>
                <div className="orddetail-price-row total">
                  <span>Total Amount</span>
                  <span className="orddetail-price-value">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="orddetail-actions">
            <button className="orddetail-action-btn" onClick={downloadInvoice}>
              <Download size={14} /> Invoice
            </button>
            <button
              className="orddetail-action-btn"
              onClick={() => router.push("/help-support")}
            >
              <MessageCircle size={14} /> Support
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orddetail-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
