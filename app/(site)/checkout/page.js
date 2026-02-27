"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const STYLES = `

  .ck2-root {
    box-sizing: border-box;
    min-height: 80vh;
    background: #faf9f7;
    padding: 32px 16px 100px;
    position: relative;
  }
  .ck2-root *, .ck2-root *::before, .ck2-root *::after { box-sizing: border-box; }

  .ck2-stripe {
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #ff5c35, #ff9a3c, #ffcc70);
  }

  .ck2-header {
    max-width: 680px; margin: 0 auto 28px;
    animation: ck2Up 0.55s cubic-bezier(0.22,1,0.36,1) both;
  }
  .ck2-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 600; letter-spacing: 1.2px;
    text-transform: uppercase; color: #ff5c35; margin-bottom: 8px;
  }
  .ck2-eyebrow-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #ff5c35;
    animation: ck2Pulse 1.6s ease-in-out infinite;
  }
  @keyframes ck2Pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.55)} }
  .ck2-title {
    font-size: clamp(26px,5vw,38px); font-weight: 800;
    color: #1a1a2e; letter-spacing: -0.5px; margin: 0 0 4px; line-height: 1.15;
  }
  .ck2-title em { color: #ff5c35; font-style: normal; }
  .ck2-subtitle { font-size: 14px; color: #888; margin: 0; font-weight: 400; }

  .ck2-grid {
    max-width: 680px; margin: 0 auto;
    display: flex; flex-direction: column; gap: 16px;
  }

  .ck2-card {
    background: #fff; border: 1px solid #ece9e4; border-radius: 20px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04);
    animation: ck2Up 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }
  .ck2-card:nth-child(2) { animation-delay: 0.07s; }
  .ck2-card:nth-child(3) { animation-delay: 0.14s; }

  @keyframes ck2Up {
    from { opacity:0; transform: translateY(22px) scale(0.98); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }

  .ck2-card-row {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }
  .ck2-card-left { display: flex; align-items: flex-start; gap: 14px; flex: 1; min-width: 0; }
  .ck2-card-icon-box {
    width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .ck2-card-icon-box.orange { background: linear-gradient(135deg,#fff3ee,#ffe8dc); }
  .ck2-card-title-text {
    font-size: 15px; font-weight: 700; color: #1a1a2e; margin: 0 0 3px;
  }
  .ck2-card-sub { font-size: 12px; color: #aaa; margin: 0; }
  .ck2-addr-summary {
    font-size: 13px; color: #555; line-height: 1.6; margin-top: 2px;
  }
  .ck2-addr-summary strong { color: #1a1a2e; font-weight: 600; }
  .ck2-addr-empty { font-size: 13px; color: #ccc; margin: 2px 0 0; }

  .ck2-edit-btn {
    flex-shrink: 0; padding: 8px 16px; border-radius: 100px;
    border: 1.5px solid #ff5c35; background: none; color: #ff5c35;
    font-size: 12px; font-weight: 600; 
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
  }
  .ck2-edit-btn:hover, .ck2-edit-btn.filled { background: #ff5c35; color: #fff; }

  .ck2-cod-badge {
    display: flex; align-items: center; gap: 12px;
    background: #fff8f5; border: 1.5px solid #ffcfbd;
    border-radius: 14px; padding: 14px 16px;
  }
  .ck2-cod-check {
    width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg,#ff5c35,#ff9a3c);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 14px; font-weight: 700;
    box-shadow: 0 2px 8px rgba(255,92,53,0.3);
  }
  .ck2-cod-label { font-size: 14px; font-weight: 600; color: #1a1a2e; margin: 0 0 2px; }
  .ck2-cod-sub   { font-size: 12px; color: #aaa; margin: 0; }

  .ck2-section-label {
    font-size: 11px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; color: #bbb; margin: 0 0 14px;
  }

  .ck2-items { display: flex; flex-direction: column; }
  .ck2-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 0; border-bottom: 1px solid #f3f1ee;
  }
  .ck2-item:last-child { border-bottom: none; }
  .ck2-item-img {
    width: 54px; height: 54px; border-radius: 14px; flex-shrink: 0;
    background: #f5f3f0; display: flex; align-items: center; justify-content: center;
    font-size: 24px; overflow: hidden; border: 1px solid #ece9e4;
  }
  .ck2-item-img img { width:100%; height:100%; object-fit:cover; }
  .ck2-item-info { flex: 1; min-width: 0; }
  .ck2-item-name {
    font-size: 14px; font-weight: 600; color: #1a1a2e; margin: 0 0 3px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .ck2-item-qty { font-size: 12px; color: #aaa; margin: 0; }
  .ck2-item-price {
    font-size: 15px; font-weight: 700; color: #ff5c35; flex-shrink: 0;
  }

  .ck2-totals { margin-top: 16px; }
  .ck2-total-row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 13px; color: #888; margin-bottom: 9px;
  }
  .ck2-total-row.grand {
    font-size: 20px; font-weight: 800;
    color: #1a1a2e; border-top: 1px solid #ece9e4; padding-top: 14px; margin-top: 6px;
  }
  .ck2-total-row.grand .gval { color: #ff5c35; }
  .ck2-free-tag {
    font-size: 11px; font-weight: 600; color: #22c55e;
    background: #f0fdf4; border: 1px solid #bbf7d0;
    border-radius: 100px; padding: 2px 9px;
  }

  .ck2-place-btn {
    width: 100%; padding: 17px; border-radius: 16px; border: none;
    background: linear-gradient(135deg, #ff5c35, #ff9a3c);
    color: #fff;
    font-size: 15px; font-weight: 700; cursor: pointer;
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 8px 28px rgba(255,92,53,0.35);
    margin-top: 20px; display: block; letter-spacing: 0.2px;
  }
  .ck2-place-btn::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,0.18),transparent);
    opacity:0; transition:opacity 0.2s;
  }
  .ck2-place-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 14px 38px rgba(255,92,53,0.45); }
  .ck2-place-btn:hover::after { opacity:1; }
  .ck2-place-btn:active:not(:disabled) { transform:scale(0.98); }
  .ck2-place-btn:disabled { opacity:0.45; cursor:not-allowed; }
  .ck2-place-btn.loading .ck2-btn-txt { opacity:0; }
  .ck2-btn-spin {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    width:20px; height:20px; border:2px solid rgba(255,255,255,0.35);
    border-top-color:#fff; border-radius:50%; display:none;
    animation:ck2Spin 0.7s linear infinite;
  }
  .loading .ck2-btn-spin { display:block; }
  @keyframes ck2Spin { to{transform:translate(-50%,-50%) rotate(360deg)} }
  .ck2-ripple {
    position:absolute; border-radius:50%; background:rgba(255,255,255,0.3);
    transform:scale(0); animation:ck2Rip 0.6s linear; pointer-events:none;
  }
  @keyframes ck2Rip { to{transform:scale(4);opacity:0} }
  .ck2-secure {
    display:flex; align-items:center; justify-content:center; gap:5px;
    font-size:11.5px; color:#ccc; margin-top:12px;
  }

  /* ── DRAWER ── */
  .ck2-overlay {
    position:fixed; inset:0; z-index:1000;
    background:rgba(26,26,46,0.38); backdrop-filter:blur(4px);
    animation:ck2OvIn 0.25s ease both;
  }
  @keyframes ck2OvIn { from{opacity:0} to{opacity:1} }
  .ck2-overlay.cls { animation:ck2OvOut 0.28s ease both; }
  @keyframes ck2OvOut { to{opacity:0} }

  .ck2-drawer {
    position:absolute; bottom:0; left:0; right:0;
    background:#fff; border-radius:28px 28px 0 0;
    padding:0 0 env(safe-area-inset-bottom,24px);
    max-height:94vh; overflow-y:auto;
    animation:ck2DIn 0.38s cubic-bezier(0.22,1,0.36,1) both;
    box-shadow:0 -8px 40px rgba(0,0,0,0.14);
  }
  @keyframes ck2DIn { from{transform:translateY(100%)} to{transform:translateY(0)} }
  .ck2-drawer.cls { animation:ck2DOut 0.28s ease both; }
  @keyframes ck2DOut { to{transform:translateY(100%)} }

  .ck2-handle { text-align:center; padding:14px 0 6px; cursor:grab; }
  .ck2-handle::before {
    content:''; display:inline-block; width:38px; height:4px;
    background:#e8e4de; border-radius:100px;
  }
  .ck2-d-header {
    display:flex; align-items:center; justify-content:space-between;
    padding:6px 24px 18px; border-bottom:1px solid #f3f1ee;
  }
  .ck2-d-title {
     font-size:20px; font-weight:800;
    color:#1a1a2e; margin:0;
  }
  .ck2-d-close {
    width:34px; height:34px; border-radius:50%;
    border:1.5px solid #ece9e4; background:#faf9f7;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; font-size:14px; color:#888; transition:all 0.2s;
  }
  .ck2-d-close:hover { background:#ff5c35; color:#fff; border-color:#ff5c35; }

  .ck2-d-body { padding:20px 24px 8px; }

  .ck2-steps { display:flex; gap:8px; margin-bottom:22px; }
  .ck2-step-pill {
    flex:1; padding:8px 6px; border-radius:10px; text-align:center;
    font-size:11px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase;
    border:1.5px solid #ece9e4; color:#ccc; transition:all 0.3s;
  }
  .ck2-step-pill.active { border-color:#ff5c35; color:#ff5c35; background:#fff8f5; }
  .ck2-step-pill.done   { border-color:#22c55e; color:#22c55e; background:#f0fdf4; }

  .ck2-fg { margin-bottom:15px; }
  .ck2-flabel {
    display:block; font-size:11px; font-weight:600; letter-spacing:0.6px;
    text-transform:uppercase; color:#aaa; margin-bottom:6px;
  }
  .ck2-fw { position:relative; }
  .ck2-fi {
    position:absolute; left:13px; top:50%; transform:translateY(-50%);
    font-size:14px; pointer-events:none; color:#ccc; transition:color 0.2s;
  }
  .ck2-fw:focus-within .ck2-fi { color:#ff5c35; }
  .ck2-finput, .ck2-fselect, .ck2-ftextarea {
    width:100%; padding:13px 13px 13px 38px; border-radius:12px;
    border:1.5px solid #ece9e4; background:#faf9f7; color:#1a1a2e;
    font-size:14px; outline:none;
    transition:all 0.2s; -webkit-appearance:none; appearance:none; margin:0;
  }
  .ck2-finput::placeholder, .ck2-ftextarea::placeholder { color:#d0cdc9; }
  .ck2-finput:focus, .ck2-fselect:focus, .ck2-ftextarea:focus {
    border-color:#ff5c35; background:#fff; box-shadow:0 0 0 3px rgba(255,92,53,0.1);
  }
  .ck2-finput.err, .ck2-fselect.err, .ck2-ftextarea.err {
    border-color:#f87171; box-shadow:0 0 0 3px rgba(248,113,113,0.08);
  }
  .ck2-ferr { font-size:11px; color:#f87171; margin:4px 0 0 2px; }
  .ck2-frow { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .ck2-selwrap { position:relative; }
  .ck2-selwrap::after {
    content:'▾'; position:absolute; right:13px; top:50%; transform:translateY(-50%);
    color:#aaa; pointer-events:none; font-size:12px;
  }
  .ck2-fselect { padding-right:30px; cursor:pointer; }
  .ck2-fselect option { background:#fff; color:#1a1a2e; }
  .ck2-ftextarea { resize:vertical; min-height:82px; padding-top:13px; }

  .ck2-d-nav { display:flex; gap:10px; margin-top:22px; padding-bottom:20px; }
  .ck2-d-back {
    flex:0 0 auto; padding:13px 20px; border-radius:12px;
    border:1.5px solid #ece9e4; background:none; color:#888;
    font-size:14px; cursor:pointer; transition:all 0.2s;
  }
  .ck2-d-back:hover { border-color:#aaa; color:#555; }
  .ck2-d-next {
    flex:1; padding:14px; border-radius:12px; border:none;
    background:linear-gradient(135deg,#ff5c35,#ff9a3c); color:#fff;
    font-size:14px; font-weight:700; 
    cursor:pointer; transition:all 0.2s; box-shadow:0 6px 20px rgba(255,92,53,0.28);
  }
  .ck2-d-next:hover { transform:translateY(-1px); box-shadow:0 10px 28px rgba(255,92,53,0.38); }
  .ck2-d-next:active { transform:scale(0.98); }

  /* Toasts */
  .ck2-toast-wrap {
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    z-index:9999; display:flex; flex-direction:column; gap:8px; align-items:center;
  }
  .ck2-toast {
    padding:11px 18px; border-radius:100px; font-size:13px; font-weight:500;
    color:#fff;
    display:flex; align-items:center; gap:7px;
    box-shadow:0 6px 24px rgba(0,0,0,0.15); white-space:nowrap;
    animation:ck2TIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
  }
  .ck2-toast.s  { background:linear-gradient(135deg,#22c55e,#16a34a); }
  .ck2-toast.e  { background:linear-gradient(135deg,#ef4444,#dc2626); }
  .ck2-toast.i  { background:linear-gradient(135deg,#3b82f6,#2563eb); }
  .ck2-toast.ex { animation:ck2TOut 0.3s ease both; }
  @keyframes ck2TIn  { from{opacity:0;transform:translateY(16px) scale(0.9)} to{opacity:1;transform:none} }
  @keyframes ck2TOut { to{opacity:0;transform:translateY(12px) scale(0.92)} }

  /* Mobile */
  @media(max-width:480px) {
    .ck2-root     { padding:20px 12px 100px; }
    .ck2-card     { padding:18px; border-radius:16px; }
    .ck2-d-body   { padding:16px 16px 8px; }
    .ck2-d-header { padding:6px 16px 16px; }
    .ck2-frow     { grid-template-columns:1fr; }
    .ck2-steps    { gap:6px; }
    .ck2-step-pill{ font-size:10px; padding:7px 4px; }
  }
`;

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

let _tid = 0;
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type = "i") => {
    const id = ++_tid;
    setToasts((t) => [...t, { id, msg, type, exit: false }]);
    setTimeout(() => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, exit: true } : x)));
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 350);
    }, 2700);
  };
  return { toasts, show };
}

/* ── Address Drawer ── */
function AddressDrawer({ onSave, onClose, initial }) {
  const [step, setStep] = useState(1);
  const [closing, setClosing] = useState(false);
  const [form, setForm] = useState(
    initial || {
      name: "",
      phone: "",
      pincode: "",
      city: "",
      state: "",
      address: "",
    },
  );
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: "" }));
  };
  const close = () => {
    setClosing(true);
    setTimeout(onClose, 280);
  };

  const v1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      e.phone = "Enter valid 10-digit mobile";
    return e;
  };
  const v2 = () => {
    const e = {};
    if (!/^\d{6}$/.test(form.pincode))
      e.pincode = "Enter valid 6-digit pincode";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "Select a state";
    if (form.address.trim().length < 10)
      e.address = "Min 10 characters required";
    return e;
  };

  const next = () => {
    const e = v1();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStep(2);
  };
  const save = () => {
    const e = v2();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave(form);
    close();
  };

  return (
    <div
      className={`ck2-overlay${closing ? " cls" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={`ck2-drawer${closing ? " cls" : ""}`}>
        <div className="ck2-handle" />
        <div className="ck2-d-header">
          <h2 className="ck2-d-title">Delivery Address</h2>
          <button className="ck2-d-close" onClick={close}>
            ✕
          </button>
        </div>
        <div className="ck2-d-body">
          <div className="ck2-steps">
            <div className={`ck2-step-pill ${step === 1 ? "active" : "done"}`}>
              1 · Personal
            </div>
            <div className={`ck2-step-pill ${step === 2 ? "active" : ""}`}>
              2 · Address
            </div>
          </div>

          {step === 1 && (
            <>
              <div className="ck2-fg">
                <label className="ck2-flabel">Full Name *</label>
                <div className="ck2-fw">
                  <span className="ck2-fi">👤</span>
                  <input
                    className={`ck2-finput${errors.name ? " err" : ""}`}
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={set("name")}
                  />
                </div>
                {errors.name && <div className="ck2-ferr">{errors.name}</div>}
              </div>
              <div className="ck2-fg">
                <label className="ck2-flabel">Mobile Number *</label>
                <div className="ck2-fw">
                  <span className="ck2-fi">📱</span>
                  <input
                    className={`ck2-finput${errors.phone ? " err" : ""}`}
                    placeholder="10-digit mobile"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </div>
                {errors.phone && <div className="ck2-ferr">{errors.phone}</div>}
              </div>
              <div className="ck2-d-nav">
                <button className="ck2-d-next" onClick={next}>
                  Continue →
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="ck2-frow">
                <div className="ck2-fg">
                  <label className="ck2-flabel">Pincode *</label>
                  <div className="ck2-fw">
                    <span className="ck2-fi">📌</span>
                    <input
                      className={`ck2-finput${errors.pincode ? " err" : ""}`}
                      placeholder="6 digits"
                      inputMode="numeric"
                      maxLength={6}
                      value={form.pincode}
                      onChange={set("pincode")}
                    />
                  </div>
                  {errors.pincode && (
                    <div className="ck2-ferr">{errors.pincode}</div>
                  )}
                </div>
                <div className="ck2-fg">
                  <label className="ck2-flabel">City *</label>
                  <div className="ck2-fw">
                    <span className="ck2-fi">🏙️</span>
                    <input
                      className={`ck2-finput${errors.city ? " err" : ""}`}
                      placeholder="Your city"
                      value={form.city}
                      onChange={set("city")}
                    />
                  </div>
                  {errors.city && <div className="ck2-ferr">{errors.city}</div>}
                </div>
              </div>
              <div className="ck2-fg">
                <label className="ck2-flabel">State *</label>
                <div className="ck2-fw ck2-selwrap">
                  <span className="ck2-fi">🗺️</span>
                  <select
                    className={`ck2-fselect${errors.state ? " err" : ""}`}
                    value={form.state}
                    onChange={set("state")}
                  >
                    <option value="">Select state…</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && <div className="ck2-ferr">{errors.state}</div>}
              </div>
              <div className="ck2-fg">
                <label className="ck2-flabel">Full Address *</label>
                <div className="ck2-fw">
                  <span
                    className="ck2-fi"
                    style={{ top: 16, transform: "none" }}
                  >
                    🏠
                  </span>
                  <textarea
                    className={`ck2-ftextarea${errors.address ? " err" : ""}`}
                    placeholder="Flat/House no., Street, Landmark…"
                    value={form.address}
                    onChange={set("address")}
                  />
                </div>
                {errors.address && (
                  <div className="ck2-ferr">{errors.address}</div>
                )}
              </div>
              <div className="ck2-d-nav">
                <button className="ck2-d-back" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button className="ck2-d-next" onClick={save}>
                  Save Address ✓
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Ripple Place Order Button ── */
function PlaceBtn({ onClick, loading, disabled }) {
  const ref = useRef();
  const handle = (e) => {
    if (disabled || loading) return;
    const btn = ref.current;
    const rect = btn.getBoundingClientRect();
    const rip = document.createElement("span");
    rip.className = "ck2-ripple";
    const sz = Math.max(rect.width, rect.height);
    rip.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX - rect.left - sz / 2}px;top:${e.clientY - rect.top - sz / 2}px`;
    btn.appendChild(rip);
    setTimeout(() => rip.remove(), 700);
    onClick?.(e);
  };
  return (
    <button
      ref={ref}
      className={`ck2-place-btn${loading ? " loading" : ""}`}
      onClick={handle}
      disabled={disabled || loading}
    >
      <span className="ck2-btn-txt">
        {loading ? "Placing Order…" : "Place Order →"}
      </span>
      <div className="ck2-btn-spin" />
    </button>
  );
}

/* ── MAIN PAGE ── */
export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();
  const { toasts, show } = useToasts();

  const [mounted, setMounted] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("loggedIn")) router.push("/login");
  }, []);

  if (!mounted) return null;

  const subtotal = cartItems.reduce((a, i) => a + i.price * i.qty, 0);

  const handlePlace = async () => {
    if (!address) {
      show("Add a delivery address first 📍", "e");
      return;
    }
    if (!cartItems.length) {
      show("Your cart is empty!", "e");
      return;
    }
    setLoading(true);
    show("Placing your order…", "i");
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    const id =
      "LVO-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/order-confirmed?id=${id}`);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="ck2-root">
        <div className="ck2-stripe" />

        {/* Header */}
        <div className="ck2-header">
          <div className="ck2-eyebrow">
            <span className="ck2-eyebrow-dot" /> Secure Checkout
          </div>
          <h1 className="ck2-title">
            Review & <em>Order</em>
          </h1>
          <p className="ck2-subtitle">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} · Free
            delivery · COD only
          </p>
        </div>

        <div className="ck2-grid">
          {/* Delivery Address Card */}
          <div className="ck2-card">
            <div className="ck2-card-row">
              <div className="ck2-card-left">
                <div className="ck2-card-icon-box orange">📍</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="ck2-card-title-text">Delivery Address</p>
                  {address ? (
                    <div className="ck2-addr-summary">
                      <strong>{address.name}</strong> · {address.phone}
                      <br />
                      {address.address}, {address.city}
                      <br />
                      {address.state} — {address.pincode}
                    </div>
                  ) : (
                    <p className="ck2-addr-empty">No address added yet</p>
                  )}
                </div>
              </div>
              <button
                className={`ck2-edit-btn${address ? " filled" : ""}`}
                onClick={() => setDrawer(true)}
              >
                {address ? "Change" : "+ Add"}
              </button>
            </div>
          </div>

          {/* Payment Card */}
          <div className="ck2-card">
            <p className="ck2-section-label">Payment Method</p>
            <div className="ck2-cod-badge">
              <div className="ck2-cod-check">✓</div>
              <div>
                <p className="ck2-cod-label">Cash on Delivery</p>
                <p className="ck2-cod-sub">
                  Pay when your order arrives at your door
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="ck2-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 4,
              }}
            >
              <div className="ck2-card-icon-box orange">🛒</div>
              <p className="ck2-card-title-text">Order Summary</p>
              <span className="ck2-card-sub" style={{ marginLeft: "auto" }}>
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="ck2-items">
              {cartItems.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "28px 0",
                    color: "#ccc",
                    fontSize: 14,
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🛍️</div>Cart is
                  empty
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <div
                    key={item.variantId}
                    className="ck2-item"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="ck2-item-img">
                      {item.image ? (
                        <img src={item.image} alt={item.title} />
                      ) : (
                        "🛍️"
                      )}
                    </div>
                    <div className="ck2-item-info">
                      <p className="ck2-item-name">{item.title}</p>
                      <p className="ck2-item-qty">Qty: {item.qty}</p>
                    </div>
                    <span className="ck2-item-price">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="ck2-totals">
              <div className="ck2-total-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="ck2-total-row">
                <span>Delivery</span>
                <span className="ck2-free-tag">FREE</span>
              </div>
              <div className="ck2-total-row grand">
                <span>Total</span>
                <span className="gval">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <PlaceBtn
              onClick={handlePlace}
              loading={loading}
              disabled={cartItems.length === 0}
            />
            <div className="ck2-secure">🔒 100% Secure · COD Only</div>
          </div>
        </div>
      </div>

      {/* Address Drawer */}
      {drawer && (
        <AddressDrawer
          initial={address}
          onSave={(addr) => {
            setAddress(addr);
            show("Address saved! 📍", "s");
          }}
          onClose={() => setDrawer(false)}
        />
      )}

      {/* Toasts */}
      <div className="ck2-toast-wrap">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`ck2-toast ${t.type}${t.exit ? " ex" : ""}`}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
