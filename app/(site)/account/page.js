"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react";

const STYLES = `
  .acc-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px 16px 80px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .acc-container {
    max-width: 600px;
    margin: 0 auto;
  }

  /* ── HEADER ── */
  .acc-header {
    text-align: center;
    margin-bottom: 28px;
    animation: acc-fade-in 0.6s ease-out;
  }

  .acc-title {
    font-size: 28px;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0 0 6px;
  }

  .acc-subtitle {
    font-size: 14px;
    color: #666;
    margin: 0;
  }

  @keyframes acc-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── PROFILE CARD ── */
  .acc-profile-card {
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    animation: acc-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
  }

  @keyframes acc-slide-up {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .acc-avatar-section {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .acc-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  .acc-avatar-info h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 4px;
  }

  .acc-avatar-info p {
    font-size: 13px;
    color: #999;
    margin: 0;
  }

  /* ── FORM SECTION ── */
  .acc-form-group {
    margin-bottom: 18px;
  }

  .acc-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #999;
    margin-bottom: 6px;
  }

  .acc-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .acc-input-icon {
    position: absolute;
    left: 13px;
    color: #ccc;
    font-size: 18px;
    pointer-events: none;
    flex-shrink: 0;
  }

  .acc-input {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border: 1.5px solid #e5e5e5;
    border-radius: 12px;
    font-size: 14px;
    color: #1a1a2e;
    background: #fafafa;
    outline: none;
    transition: all 0.3s;
  }

  .acc-input:focus {
    border-color: #667eea;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .acc-input:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }

  .acc-input-error {
    border-color: #f87171 !important;
    box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1) !important;
  }

  .acc-error-msg {
    font-size: 12px;
    color: #f87171;
    margin-top: 4px;
  }

  .acc-input-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  /* ── TOGGLE PASSWORD ── */
  .acc-toggle-password {
    position: absolute;
    right: 13px;
    background: none;
    border: none;
    cursor: pointer;
    color: #999;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }

  .acc-toggle-password:hover {
    color: #667eea;
  }

  /* ── BUTTON GROUP ── */
  .acc-button-group {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .acc-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .acc-btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  .acc-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
  }

  .acc-btn-primary:active {
    transform: scale(0.97);
  }

  .acc-btn-secondary {
    background: #f0f0f0;
    color: #667eea;
    border: 2px solid #667eea;
  }

  .acc-btn-secondary:hover {
    background: #667eea;
    color: #fff;
  }

  .acc-btn-secondary:active {
    transform: scale(0.97);
  }

  .acc-btn-danger {
    background: #fff;
    color: #f87171;
    border: 2px solid #f87171;
    flex: 0 0 auto;
  }

  .acc-btn-danger:hover {
    background: #f87171;
    color: #fff;
  }

  /* ── ADDRESS SECTION ── */
  .acc-section-title {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 28px 0 16px;
    padding-top: 20px;
    border-top: 2px solid #f0f0f0;
  }

  .acc-address-card {
    background: #f9fafb;
    border-radius: 14px;
    padding: 16px;
    border-left: 3px solid #667eea;
    margin-bottom: 12px;
    animation: acc-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
  }

  .acc-address-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .acc-address-name {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0;
  }

  .acc-address-text {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    margin: 8px 0 0;
  }

  .acc-address-btn {
    background: none;
    border: none;
    color: #667eea;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    padding: 0;
    display: flex;
    gap: 4px;
    align-items: center;
    transition: color 0.2s;
  }

  .acc-address-btn:hover {
    color: #764ba2;
  }

  /* ── MODAL ── */
  .acc-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(26, 26, 46, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    animation: acc-overlay-in 0.3s ease;
  }

  @keyframes acc-overlay-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .acc-modal {
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    animation: acc-modal-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes acc-modal-in {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .acc-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  .acc-modal-title {
    font-size: 20px;
    font-weight: 800;
    color: #1a1a2e;
    margin: 0;
  }

  .acc-close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #999;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }

  .acc-close-btn:hover {
    color: #667eea;
  }

  /* ── TOAST ── */
  .acc-toast {
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
    animation: acc-toast-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .acc-toast.exit {
    animation: acc-toast-out 0.3s ease both;
  }

  @keyframes acc-toast-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes acc-toast-out {
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    .acc-input-row {
      grid-template-columns: 1fr;
    }

    .acc-button-group {
      flex-direction: column;
    }

    .acc-btn-danger {
      flex: 1;
    }
  }
`;

export default function AccountPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
  });

  const STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Puducherry",
  ];

  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") return;

    if (!localStorage.getItem("loggedIn")) {
      router.push("/login");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData")) || {};

    if (userData.role === "ADMIN") {
      setIsAdmin(true);
    }
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      password: userData.password || "",
    });

    setUserEmail(userData.email);

    const savedAddresses =
      JSON.parse(localStorage.getItem(`addresses_${userData.email}`)) || [];
    setAddresses(savedAddresses);
  }, []);
  if (!mounted) return null;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2700);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";
    return newErrors;
  };

  const handleSaveProfile = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("userData", JSON.stringify(formData));
    setIsEditing(false);
    setErrors({});
    showToast("✓ Profile updated successfully!");
  };

  const validateAddress = () => {
    const newErrors = {};
    if (!addressForm.name.trim()) newErrors.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(addressForm.phone))
      newErrors.phone = "Invalid phone";
    if (!/^\d{6}$/.test(addressForm.pincode))
      newErrors.pincode = "Invalid pincode";
    if (!addressForm.city.trim()) newErrors.city = "City is required";
    if (!addressForm.state) newErrors.state = "Select a state";
    if (addressForm.address.trim().length < 10)
      newErrors.address = "Min 10 characters";
    return newErrors;
  };

  const handleAddAddress = () => {
    const newErrors = validateAddress();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const newAddresses = [{ ...addressForm, id: Date.now() }];
    setAddresses(newAddresses);
    const user = JSON.parse(localStorage.getItem("userData"));
    const email = user?.email;

    localStorage.setItem(`addresses_${email}`, JSON.stringify(newAddresses));
    setAddressForm({
      name: "",
      phone: "",
      pincode: "",
      city: "",
      state: "",
      address: "",
    });
    setShowAddressModal(false);
    setErrors({});
    showToast("✓ Address added successfully!");
  };

  const handleDeleteAddress = (id) => {
    const newAddresses = addresses.filter((addr) => addr.id !== id);
    setAddresses(newAddresses);
    const user = JSON.parse(localStorage.getItem("userData"));
    const email = user?.email;

    localStorage.setItem(`addresses_${email}`, JSON.stringify(newAddresses));
    showToast("✓ Address removed!");
  };

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedAddress");
    localStorage.removeItem("userId");

    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }
    localStorage.removeItem("cart_guest");

    window.dispatchEvent(new Event("cart-updated"));
    window.dispatchEvent(new Event("login-updated"));

    router.push("/");
  };

  const initials = formData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="acc-root">
        <div className="acc-container">
          {/* Header */}
          <div className="acc-header">
            <h1 className="acc-title">My Account</h1>
            <p className="acc-subtitle">Manage your profile & addresses</p>
          </div>

          {/* Profile Card */}
          <div className="acc-profile-card">
            <div className="acc-avatar-section">
              <div className="acc-avatar">{initials || "👤"}</div>
              <div className="acc-avatar-info">
                <h3>{formData.name || "User Name"}</h3>
                <p>{formData.email || "email@example.com"}</p>
              </div>
            </div>

            {!isEditing ? (
              <>
                <div className="acc-form-group">
                  <div className="acc-label">Full Name</div>
                  <div className="acc-input-wrapper">
                    <span className="acc-input-icon"></span>
                    <input
                      type="text"
                      className="acc-input"
                      value={formData.name}
                      disabled
                    />
                  </div>
                </div>

                <div className="acc-form-group">
                  <div className="acc-label">Email Address</div>
                  <div className="acc-input-wrapper">
                    <span className="acc-input-icon"></span>
                    <input
                      type="email"
                      className="acc-input"
                      value={formData.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="acc-form-group">
                  <div className="acc-label">Phone Number</div>
                  <div className="acc-input-wrapper">
                    <span className="acc-input-icon"></span>
                    <input
                      type="text"
                      className="acc-input"
                      value={formData.phone}
                      disabled
                    />
                  </div>
                </div>

                <div className="acc-button-group">
                  <button
                    className="acc-btn acc-btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>

                  {isAdmin && (
                    <button
                      className="acc-btn acc-btn-secondary"
                      onClick={() => router.push("/admin")}
                    >
                      Admin Panel
                    </button>
                  )}

                  <button
                    className="acc-btn acc-btn-danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="acc-form-group">
                  <div className="acc-label">Full Name</div>
                  <div className="acc-input-wrapper">
                    <span className="acc-input-icon"></span>
                    <input
                      type="text"
                      className={`acc-input ${errors.name ? "acc-input-error" : ""}`}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  {errors.name && (
                    <div className="acc-error-msg">{errors.name}</div>
                  )}
                </div>

                <div className="acc-form-group">
                  <div className="acc-label">Email Address</div>
                  <div className="acc-input-wrapper">
                    <span className="acc-input-icon"></span>
                    <input
                      type="email"
                      className={`acc-input ${errors.email ? "acc-input-error" : ""}`}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  {errors.email && (
                    <div className="acc-error-msg">{errors.email}</div>
                  )}
                </div>

                <div className="acc-form-group">
                  <div className="acc-label">Phone Number</div>
                  <div className="acc-input-wrapper">
                    <span className="acc-input-icon"></span>
                    <input
                      type="text"
                      className={`acc-input ${errors.phone ? "acc-input-error" : ""}`}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && (
                    <div className="acc-error-msg">{errors.phone}</div>
                  )}
                </div>

                <div className="acc-button-group">
                  <button
                    className="acc-btn acc-btn-primary"
                    onClick={handleSaveProfile}
                  >
                    <Save size={16} /> Save Changes
                  </button>
                  <button
                    className="acc-btn acc-btn-secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Addresses Section */}
          <h2 className="acc-section-title">📍 Saved Addresses</h2>

          {addresses.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "#999",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}></div>
              <p style={{ margin: 0 }}>No addresses saved yet</p>
            </div>
          ) : (
            addresses.map((addr) => (
              <div key={addr.id} className="acc-address-card">
                <div className="acc-address-header">
                  <p className="acc-address-name">{addr.name}</p>
                  <button
                    className="acc-address-btn"
                    onClick={() => handleDeleteAddress(addr.id)}
                  >
                    <X size={14} /> Delete
                  </button>
                </div>
                <p className="acc-address-text">
                  {addr.address}
                  <br />
                  {addr.city} • {addr.state} - {addr.pincode}
                </p>
              </div>
            ))
          )}

          <button
            className="acc-btn acc-btn-primary"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={() => setShowAddressModal(true)}
          >
            <MapPin size={16} /> Add New Address
          </button>
        </div>

        {/* Address Modal */}
        {showAddressModal && (
          <div
            className="acc-modal-overlay"
            onClick={() => setShowAddressModal(false)}
          >
            <div className="acc-modal" onClick={(e) => e.stopPropagation()}>
              <div className="acc-modal-header">
                <h2 className="acc-modal-title">Add Address</h2>
                <button
                  className="acc-close-btn"
                  onClick={() => setShowAddressModal(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="acc-form-group">
                <div className="acc-label">Full Name</div>
                <div className="acc-input-wrapper">
                  <span className="acc-input-icon"></span>
                  <input
                    type="text"
                    className={`acc-input ${errors.name ? "acc-input-error" : ""}`}
                    placeholder="Your name"
                    value={addressForm.name}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, name: e.target.value })
                    }
                  />
                </div>
                {errors.name && (
                  <div className="acc-error-msg">{errors.name}</div>
                )}
              </div>

              <div className="acc-form-group">
                <div className="acc-label">Phone Number</div>
                <div className="acc-input-wrapper">
                  <span className="acc-input-icon"></span>
                  <input
                    type="text"
                    className={`acc-input ${errors.phone ? "acc-input-error" : ""}`}
                    placeholder="10-digit number"
                    value={addressForm.phone}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, phone: e.target.value })
                    }
                    maxLength={10}
                  />
                </div>
                {errors.phone && (
                  <div className="acc-error-msg">{errors.phone}</div>
                )}
              </div>

              <div className="acc-input-row">
                <div className="acc-form-group">
                  <div className="acc-label">Pincode</div>
                  <div className="acc-input-wrapper">
                    <span className="acc-input-icon"></span>
                    <input
                      type="text"
                      className={`acc-input ${errors.pincode ? "acc-input-error" : ""}`}
                      placeholder="6 digits"
                      value={addressForm.pincode}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          pincode: e.target.value,
                        })
                      }
                      maxLength={6}
                    />
                  </div>
                  {errors.pincode && (
                    <div className="acc-error-msg">{errors.pincode}</div>
                  )}
                </div>

                <div className="acc-form-group">
                  <div className="acc-label">City</div>
                  <div className="acc-input-wrapper">
                    <span className="acc-input-icon"></span>
                    <input
                      type="text"
                      className={`acc-input ${errors.city ? "acc-input-error" : ""}`}
                      placeholder="City name"
                      value={addressForm.city}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, city: e.target.value })
                      }
                    />
                  </div>
                  {errors.city && (
                    <div className="acc-error-msg">{errors.city}</div>
                  )}
                </div>
              </div>

              <div className="acc-form-group">
                <div className="acc-label">State</div>
                <div className="acc-input-wrapper">
                  <span className="acc-input-icon"></span>
                  <select
                    className={`acc-input ${errors.state ? "acc-input-error" : ""}`}
                    value={addressForm.state}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, state: e.target.value })
                    }
                  >
                    <option value="">Select state</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && (
                  <div className="acc-error-msg">{errors.state}</div>
                )}
              </div>

              <div className="acc-form-group">
                <div className="acc-label">Full Address</div>
                <div className="acc-input-wrapper">
                  <span className="acc-input-icon"></span>
                  <textarea
                    className={`acc-input ${errors.address ? "acc-input-error" : ""}`}
                    placeholder="House no., Street, Landmark..."
                    value={addressForm.address}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        address: e.target.value,
                      })
                    }
                    style={{ minHeight: "80px", resize: "vertical" }}
                  />
                </div>
                {errors.address && (
                  <div className="acc-error-msg">{errors.address}</div>
                )}
              </div>

              <div className="acc-button-group">
                <button
                  className="acc-btn acc-btn-secondary"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="acc-btn acc-btn-primary"
                  onClick={handleAddAddress}
                >
                  <MapPin size={16} /> Add Address
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className={`acc-toast ${toast ? "" : "exit"}`}>{toast}</div>
        )}
      </div>
    </>
  );
}
