"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Calendar,
  Package,
  Truck,
  DollarSign,
  Search,
} from "lucide-react";
import Link from "next/link";

const STYLES = `
  .ordhis-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px 16px 80px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .ordhis-container {
    max-width: 650px;
    margin: 0 auto;
  }

  /* ── HEADER ── */
  .ordhis-header {
    margin-bottom: 28px;
    animation: ordhis-fade-in 0.6s ease-out;
  }

  .ordhis-title {
    font-size: 28px;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0 0 6px;
  }

  .ordhis-subtitle {
    font-size: 14px;
    color: #666;
    margin: 0;
  }

  @keyframes ordhis-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── SEARCH BAR ── */
  .ordhis-search {
    position: relative;
    margin-bottom: 24px;
    animation: ordhis-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
  }

  @keyframes ordhis-slide-up {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .ordhis-search-input {
    width: 100%;
    padding: 12px 40px 12px 16px;
    border: 1.5px solid #e5e5e5;
    border-radius: 14px;
    font-size: 14px;
    background: #fff;
    outline: none;
    transition: all 0.3s;
  }

  .ordhis-search-input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .ordhis-search-icon {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #ccc;
    pointer-events: none;
  }

  /* ── ORDER CARD ── */
  .ordhis-order-card {
    background: #fff;
    border-radius: 16px;
    padding: 18px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.3s;
    animation: ordhis-card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .ordhis-order-card:nth-child(1) { animation-delay: 0.2s; }
  .ordhis-order-card:nth-child(2) { animation-delay: 0.25s; }
  .ordhis-order-card:nth-child(3) { animation-delay: 0.3s; }
  .ordhis-order-card:nth-child(4) { animation-delay: 0.35s; }
  .ordhis-order-card:nth-child(5) { animation-delay: 0.4s; }

  @keyframes ordhis-card-in {
    from {
      opacity: 0;
      transform: translateY(15px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .ordhis-order-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  }

  .ordhis-order-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14px;
    gap: 10px;
  }

  .ordhis-order-id {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0;
    font-family: 'Monaco', 'Courier New', monospace;
  }

  .ordhis-order-date {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .ordhis-status-badge {
    padding: 6px 12px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .ordhis-status-confirmed {
    background: #f0fdf4;
    color: #22c55e;
    border: 1px solid #bbf7d0;
  }

  .ordhis-status-processing {
    background: #fef3c7;
    color: #f59e0b;
    border: 1px solid #fcd34d;
  }

  .ordhis-status-shipped {
    background: #dbeafe;
    color: #3b82f6;
    border: 1px solid #93c5fd;
  }

  .ordhis-status-delivered {
    background: #e0e7ff;
    color: #667eea;
    border: 1px solid #c7d2fe;
  }

  .ordhis-divider {
    height: 1px;
    background: #f0f0f0;
    margin: 12px 0;
  }

  .ordhis-order-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }

  .ordhis-detail {
    font-size: 13px;
  }

  .ordhis-detail-label {
    font-weight: 600;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-size: 11px;
    margin-bottom: 2px;
  }

  .ordhis-detail-value {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
  }

  .ordhis-detail-sub {
    font-size: 12px;
    color: #666;
    margin-top: 1px;
  }

  .ordhis-order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }

  .ordhis-items-count {
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .ordhis-view-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border: none;
    padding: 8px 14px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.3s;
  }

  .ordhis-view-btn:hover {
    transform: translateX(2px);
  }

  .ordhis-view-btn:active {
    transform: scale(0.95);
  }

  /* ── EMPTY STATE ── */
  .ordhis-empty {
    text-align: center;
    padding: 60px 20px;
    color: #999;
  }

  .ordhis-empty-icon {
    font-size: 60px;
    margin-bottom: 16px;
  }

  .ordhis-empty-title {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 6px;
  }

  .ordhis-empty-text {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
  }

  .ordhis-empty-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-block;
  }

  .ordhis-empty-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  /* ── LOADING ── */
  .ordhis-loading {
    text-align: center;
    padding: 40px 20px;
    color: #999;
  }

  .ordhis-spinner {
    display: inline-block;
    width: 32px;
    height: 32px;
    border: 3px solid #e5e5e5;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: ordhis-spin 0.8s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes ordhis-spin {
    to { transform: rotate(360deg); }
  }

  /* Mobile */
  @media (max-width: 480px) {
    .ordhis-order-details {
      grid-template-columns: 1fr;
    }

    .ordhis-order-card {
      padding: 14px;
    }

    .ordhis-title {
      font-size: 24px;
    }
  }
`;

export default function OrderHistoryPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("loggedIn")) {
      router.push("/login");
      return;
    }

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("userData"));

      const token = localStorage.getItem("lebah-token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/orders/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      const orders = data.data || [];

      const formatted = orders.map((order) => ({
        id: order._id,
        date: new Date(order.createdAt),
        status: order.orderStatus.toLowerCase(),
        items: order.products.length,
        amount: order.totalAmount,
        itemNames: order.products.map((p) => p.title).join(", "),
      }));

      setOrders(formatted);
      setFilteredOrders(formatted);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter(
          (order) =>
            order.id.toLowerCase().includes(term.toLowerCase()) ||
            order.itemNames.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      confirmed: "ordhis-status-confirmed",
      processing: "ordhis-status-processing",
      shipped: "ordhis-status-shipped",
      delivered: "ordhis-status-delivered",
    };
    return statusMap[status] || "ordhis-status-confirmed";
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: "✓",
      processing: "⚙️",
      shipped: "📦",
      delivered: "✓✓",
    };
    return icons[status] || "•";
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (!mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="ordhis-root">
        <div className="ordhis-container">
          {/* Header */}
          <div className="ordhis-header">
            <h1 className="ordhis-title">Order History</h1>
            <p className="ordhis-subtitle">View and track all your orders</p>
          </div>

          {/* Search Bar */}
          <div className="ordhis-search">
            <Search className="ordhis-search-icon" size={18} />
            <input
              type="text"
              className="ordhis-search-input"
              placeholder="Search by Order ID or items..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="ordhis-loading">
              <div className="ordhis-spinner" />
              <p>Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="ordhis-empty">
              <div className="ordhis-empty-icon"></div>
              <p className="ordhis-empty-title">Oops!</p>
              <p className="ordhis-empty-text">{error}</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="ordhis-empty">
              <div className="ordhis-empty-icon"></div>
              <p className="ordhis-empty-title">
                {searchTerm ? "No orders found" : "No orders yet"}
              </p>
              <p className="ordhis-empty-text">
                {searchTerm
                  ? "Try searching with a different order ID"
                  : "Your orders will appear here"}
              </p>
              {!searchTerm && (
                <Link href="/" className="ordhis-empty-btn">
                  Start Shopping
                </Link>
              )}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="ordhis-order-card"
                onClick={() => router.push(`/order-his/${order.id}`)}
              >
                <div className="ordhis-order-header">
                  <div style={{ flex: 1 }}>
                    <p className="ordhis-order-id">{order.id}</p>
                    <div className="ordhis-order-date">
                      <Calendar size={14} />
                      {formatDate(order.date)}
                    </div>
                  </div>
                  <div
                    className={`ordhis-status-badge ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {getStatusIcon(order.status)} {order.status.toUpperCase()}
                  </div>
                </div>

                <div className="ordhis-divider" />

                <div className="ordhis-order-details">
                  <div className="ordhis-detail">
                    <div className="ordhis-detail-label">Items</div>
                    <div className="ordhis-detail-value">{order.items}</div>
                  </div>
                  <div className="ordhis-detail">
                    <div className="ordhis-detail-label">Amount</div>
                    <div className="ordhis-detail-value">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "10px" }}>
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                    {order.itemNames}
                  </p>
                </div>

                <div className="ordhis-order-footer">
                  <div className="ordhis-items-count">
                    <Package size={14} />
                    {order.items} item{order.items !== 1 ? "s" : ""}
                  </div>
                  <button className="ordhis-view-btn">
                    View <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
