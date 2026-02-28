"use client";

import { useState } from "react";
import {
  ChevronDown,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const STYLES = `
  .help-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px 16px 80px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .help-container {
    max-width: 650px;
    margin: 0 auto;
  }

  /* ── HEADER ── */
  .help-header {
    text-align: center;
    margin-bottom: 32px;
    animation: help-fade-in 0.6s ease-out;
  }

  .help-title {
    font-size: 28px;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0 0 8px;
  }

  .help-subtitle {
    font-size: 14px;
    color: #666;
    margin: 0;
  }

  @keyframes help-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── QUICK LINKS ── */
  .help-quick-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
    animation: help-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
  }

  @keyframes help-slide-up {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .help-quick-link {
    background: #fff;
    border-radius: 14px;
    padding: 16px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
  }

  .help-quick-link:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  }

  .help-quick-link:active {
    transform: scale(0.97);
  }

  .help-quick-link-icon {
    font-size: 32px;
  }

  .help-quick-link-title {
    font-size: 13px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0;
  }

  .help-quick-link-desc {
    font-size: 11px;
    color: #999;
    margin: 0;
  }

  /* ── SECTION ── */
  .help-section {
    margin-bottom: 28px;
  }

  .help-section-title {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 14px;
    padding-bottom: 12px;
    border-bottom: 2px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── FAQ ACCORDION ── */
  .help-faq-item {
    background: #fff;
    border-radius: 12px;
    margin-bottom: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.3s;
    animation: help-card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .help-faq-item:nth-child(1) { animation-delay: 0.2s; }
  .help-faq-item:nth-child(2) { animation-delay: 0.25s; }
  .help-faq-item:nth-child(3) { animation-delay: 0.3s; }
  .help-faq-item:nth-child(4) { animation-delay: 0.35s; }
  .help-faq-item:nth-child(5) { animation-delay: 0.4s; }

  @keyframes help-card-in {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .help-faq-item.active {
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  }

  .help-faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: #fff;
    border: none;
    width: 100%;
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    color: #1a1a2e;
    transition: all 0.2s;
    text-align: left;
  }

  .help-faq-question:hover {
    background: #f9fafb;
  }

  .help-faq-question-text {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
  }

  .help-faq-icon {
    flex-shrink: 0;
    color: #667eea;
  }

  .help-faq-toggle {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    transition: transform 0.3s;
    flex-shrink: 0;
  }

  .help-faq-item.active .help-faq-toggle {
    transform: rotate(180deg);
  }

  .help-faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .help-faq-item.active .help-faq-answer {
    max-height: 500px;
  }

  .help-faq-answer-content {
    padding: 0 16px 14px;
    font-size: 13px;
    line-height: 1.6;
    color: #666;
    background: #f9fafb;
  }

  /* ── CONTACT CARD ── */
  .help-contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .help-contact-card {
    background: #fff;
    border-radius: 14px;
    padding: 18px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    cursor: pointer;
    animation: help-card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .help-contact-card:nth-child(1) { animation-delay: 0.45s; }
  .help-contact-card:nth-child(2) { animation-delay: 0.5s; }
  .help-contact-card:nth-child(3) { animation-delay: 0.55s; }
  .help-contact-card:nth-child(4) { animation-delay: 0.6s; }

  .help-contact-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  }

  .help-contact-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .help-contact-title {
    font-size: 13px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 4px;
  }

  .help-contact-text {
    font-size: 12px;
    color: #999;
    margin: 0;
    word-break: break-all;
  }

  /* ── NOTICE CARD ── */
  .help-notice {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-left: 4px solid #f59e0b;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    display: flex;
    gap: 12px;
    animation: help-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
  }

  .help-notice-icon {
    flex-shrink: 0;
    font-size: 20px;
  }

  .help-notice-content {
    flex: 1;
  }

  .help-notice-title {
    font-size: 13px;
    font-weight: 700;
    color: #92400e;
    margin: 0 0 2px;
  }

  .help-notice-text {
    font-size: 12px;
    color: #b45309;
    margin: 0;
    line-height: 1.5;
  }

  /* ── GUIDES ── */
  .help-guide-item {
    background: #fff;
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: all 0.3s;
    animation: help-card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .help-guide-item:nth-child(1) { animation-delay: 0.65s; }
  .help-guide-item:nth-child(2) { animation-delay: 0.7s; }
  .help-guide-item:nth-child(3) { animation-delay: 0.75s; }

  .help-guide-item:hover {
    background: #f9fafb;
    transform: translateX(4px);
  }

  .help-guide-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }

  .help-guide-icon {
    font-size: 20px;
    flex-shrink: 0;
  }

  .help-guide-text {
    flex: 1;
    min-width: 0;
  }

  .help-guide-title {
    font-size: 13px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0;
  }

  .help-guide-desc {
    font-size: 11px;
    color: #999;
    margin: 2px 0 0;
  }

  /* Mobile */
  @media (max-width: 480px) {
    .help-quick-links {
      grid-template-columns: 1fr;
    }

    .help-contact-grid {
      grid-template-columns: 1fr;
    }

    .help-faq-question-text {
      font-size: 12px;
    }
  }
`;

const FAQ_DATA = [
  {
    id: 1,
    question: "How can I track my order?",
    answer:
      "You can track your order in real-time from the 'Order History' section in your account. Click on any order to see its current status, location, and estimated delivery date. You'll receive SMS and email updates as your order moves through different stages.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "Currently, we accept Cash on Delivery (COD) for all orders. We're working on adding more payment options like credit/debit cards and digital wallets soon. COD means you can pay when your order is delivered to your doorstep.",
  },
  {
    id: 3,
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3-5 business days from the date of order confirmation. For urgent orders, expedited delivery options may be available in select areas. Delivery times may vary based on location, availability, and current order volume.",
  },
  {
    id: 4,
    question: "What's your return policy?",
    answer:
      "We offer a 7-day return policy from the date of delivery. Items must be in unused condition with original packaging. To initiate a return, go to your order details and click 'Request Return'. Our team will coordinate the pickup from your address.",
  },
  {
    id: 5,
    question: "What if I receive a damaged item?",
    answer:
      "If you receive a damaged or defective item, please contact our support team within 24 hours with photos of the damage. We'll arrange a replacement or full refund at no cost to you. Take photos before opening the package for easier processing.",
  },
];

const CONTACT_DATA = [
  {
    title: "Phone",
    text: "+91 8800-123-456",
  },
  {
    title: "Email",
    text: "support@sns.com",
  },
  {
    title: "Live Chat",
    text: "9 AM - 6 PM IST",
  },
  {
    title: "Available",
    text: "Mon - Fri",
  },
];

export default function HelpSupportPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="help-root">
        <div className="help-container">
          {/* Header */}
          <div className="help-header">
            <h1 className="help-title">Help & Support</h1>
            <p className="help-subtitle">
              Find answers to your questions quickly
            </p>
          </div>

          {/* Quick Links */}

          {/* Notice */}
          <div className="help-notice">
            <div className="help-notice-icon">ℹ️</div>
            <div className="help-notice-content">
              <p className="help-notice-title">Pro Tip</p>
              <p className="help-notice-text">
                Check our FAQ section below before contacting support. You might
                find the answer to your question instantly!
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="help-section">
            <h2 className="help-section-title">
              ❓ Frequently Asked Questions
            </h2>
            {FAQ_DATA.map((faq) => (
              <div
                key={faq.id}
                className={`help-faq-item ${
                  expandedFaq === faq.id ? "active" : ""
                }`}
              >
                <button
                  className="help-faq-question"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                  }
                >
                  <div className="help-faq-question-text">
                    <span className="help-faq-icon">{faq.icon}</span>
                    <span>{faq.question}</span>
                  </div>
                  <div className="help-faq-toggle">
                    <ChevronDown size={18} />
                  </div>
                </button>
                <div className="help-faq-answer">
                  <div className="help-faq-answer-content">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          {/* User Guides */}

          {/* Contact Section */}
          <div className="help-section">
            <h2 className="help-section-title"> Get in Touch</h2>
            <div className="help-contact-grid">
              {CONTACT_DATA.map((contact, idx) => (
                <div key={idx} className="help-contact-card">
                  <div className="help-contact-icon">{contact.icon}</div>
                  <p className="help-contact-title">{contact.title}</p>
                  <p className="help-contact-text">{contact.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
              marginTop: "28px",
              animation:
                "help-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both",
            }}
          >
            <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
              💚 Our support team typically responds within 24 hours
            </p>
            <p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
              Average response time: 2-4 hours during business hours
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
