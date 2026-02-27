"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  /* ── ALL STYLES SCOPED TO .lp-root — won't touch your header/footer ── */


  .lp-root *, .lp-root *::before, .lp-root *::after {
    box-sizing: border-box;
  }

  /* Blobs */
  .lp-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
    animation: lpBlobFloat 8s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }
  .lp-blob-1 { width: 480px; height: 480px; background: #ff5c35; top: -120px; left: -100px; animation-delay: 0s; }
  .lp-blob-2 { width: 360px; height: 360px; background: #ff9a3c; bottom: -80px; right: -80px; animation-delay: -3s; }
  .lp-blob-3 { width: 280px; height: 280px; background: #c23bff; top: 50%; right: 15%; animation-delay: -5s; opacity: 0.1; }

  @keyframes lpBlobFloat {
    0%, 100% { transform: translate(0,0) scale(1); }
    33%       { transform: translate(30px,-20px) scale(1.05); }
    66%       { transform: translate(-20px,15px) scale(0.97); }
  }

  /* Noise */
  .lp-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  /* Card */
  .lp-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 440px;
    background: #111118;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 28px;
    padding: 40px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 32px 80px rgba(0,0,0,0.6), 0 0 100px rgba(255,92,53,0.08);
    animation: lpCardIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
    margin-top:20px;
  }
  @keyframes lpCardIn {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Brand */
  .lp-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 32px;
  }
  .lp-brand-icon {
    width: 38px; height: 38px;
    background: linear-gradient(135deg,#ff5c35,#ff9a3c);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 20px rgba(255,92,53,0.35);
  }
  .lp-brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #f0f0f5;
    letter-spacing: -0.3px;
    margin: 0;
  }

  /* Progress bar */
  .lp-progress { display: flex; gap: 6px; margin: 0 0 28px; }
  .lp-progress-seg {
    height: 3px; flex: 1; border-radius: 10px;
    background: rgba(255,255,255,0.07);
    transition: background 0.4s;
  }
  .lp-progress-seg.lp-active {
    background: linear-gradient(90deg,#ff5c35,#ff9a3c);
    box-shadow: 0 0 8px rgba(255,92,53,0.35);
  }
  .lp-progress-seg.lp-done { background: rgba(255,92,53,0.4); }

  /* Step header */
  .lp-header { margin: 0 0 28px; animation: lpFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }

  @keyframes lpFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lp-step-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 500;
    color: #ff5c35;
    background: rgba(255,92,53,0.12);
    border: 1px solid rgba(255,92,53,0.2);
    border-radius: 100px;
    padding: 4px 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin: 0 0 12px;
  }
  .lp-step-dot {
    display: inline-block;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #ff5c35;
    animation: lpPulse 1.5s ease-in-out infinite;
  }
  @keyframes lpPulse {
    0%,100% { opacity:1; transform: scale(1); }
    50%      { opacity:0.5; transform: scale(0.7); }
  }

  .lp-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #f0f0f5;
    letter-spacing: -0.5px;
    line-height: 1.2;
    margin: 0 0 6px;
  }
  .lp-sub {
    font-size: 14px;
    color: rgba(240,240,245,0.45);
    font-weight: 300;
    margin: 0;
  }

  /* Fields */
  .lp-field {
    position: relative;
    margin: 0 0 14px;
    animation: lpFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
  }
  .lp-field:nth-child(1){ animation-delay:0.05s; }
  .lp-field:nth-child(2){ animation-delay:0.10s; }
  .lp-field:nth-child(3){ animation-delay:0.15s; }

  .lp-field-icon {
    position: absolute;
    left: 16px; top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
    transition: color 0.2s;
  }

  .lp-input {
    width: 100%;
    padding: 15px 16px 15px 44px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.04);
    color: #f0f0f5;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    margin: 0;
  }
  .lp-input::placeholder { color: rgba(240,240,245,0.45); }
  .lp-input:focus {
    border-color: rgba(255,92,53,0.5);
    background: rgba(255,92,53,0.04);
    box-shadow: 0 0 0 3px rgba(255,92,53,0.1);
  }
  .lp-field:focus-within .lp-field-icon { color: #ff5c35; }

  /* OTP */
  .lp-otp-wrap {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 0 0 14px;
}

.lp-otp-box {
  width: 48px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.04);
  color: #f0f0f5;
  font-size: 20px;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  text-align: center;
  outline: none;
  transition: all 0.25s;
  caret-color: #ff5c35;
}

@media (max-width: 480px) {
  .lp-otp-box {
    width: 42px;
    height: 52px;
    font-size: 18px;
  }
}
  .lp-otp-box:focus {
    border-color: rgba(255,92,53,0.6);
    background: rgba(255,92,53,0.06);
    box-shadow: 0 0 0 3px rgba(255,92,53,0.12);
    transform: scale(1.05);
  }
  .lp-otp-box.lp-filled { border-color: rgba(255,92,53,0.4); color: #ff9a3c; }

  /* Resend */
  .lp-resend {
    font-size: 13px;
    color: rgba(240,240,245,0.45);
    margin: 0 0 20px;
    animation: lpFadeUp 0.5s 0.15s both;
  }
  .lp-resend-link {
    color: #ff5c35;
    cursor: pointer;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;
    background: none;
    border: none;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
  }

  /* Primary button */
  .lp-btn {
    width: 100%;
    padding: 16px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg,#ff5c35 0%,#ff9a3c 100%);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    letter-spacing: 0.2px;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 8px 32px rgba(255,92,53,0.35);
    margin: 8px 0 0;
    display: block;
    animation: lpFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }
  .lp-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg,rgba(255,255,255,0.15),transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .lp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,92,53,0.45); }
  .lp-btn:hover::after { opacity: 1; }
  .lp-btn:active:not(:disabled) { transform: translateY(0) scale(0.98); }
  .lp-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .lp-btn.lp-loading .lp-btn-text { opacity: 0; }
  .lp-spinner {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 20px; height: 20px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    display: none;
    animation: lpSpin 0.7s linear infinite;
  }
  .lp-loading .lp-spinner { display: block; }
  @keyframes lpSpin { to { transform: translate(-50%,-50%) rotate(360deg); } }

  /* Ripple */
  .lp-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    transform: scale(0);
    animation: lpRipple 0.6s linear;
    pointer-events: none;
  }
  @keyframes lpRipple { to { transform: scale(4); opacity: 0; } }

  /* Back button */
  .lp-back-btn {
    width: 100%;
    padding: 13px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.07);
    background: none;
    color: rgba(240,240,245,0.45);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    margin: 0;
    display: block;
  }
  .lp-back-btn:hover { border-color: rgba(255,255,255,0.15); color: #f0f0f5; }

  /* Divider */
  .lp-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    animation: lpFadeUp 0.5s 0.3s both;
  }
  .lp-divider::before, .lp-divider::after {
    content: ''; flex: 1; height: 1px;
    background: rgba(255,255,255,0.07);
  }
  .lp-divider-text { font-size: 12px; color: rgba(240,240,245,0.45); }

  /* Secure note */
  .lp-secure {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 11.5px;
    color: rgba(240,240,245,0.35);
    margin: 20px 0 0;
    animation: lpFadeUp 0.5s 0.35s both;
  }

  /* Toasts */
  .lp-toast-wrap {
    position: fixed;
    bottom: 28px; left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
  .lp-toast {
    padding: 12px 20px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: lpToastIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
    white-space: nowrap;
  }
  .lp-toast.lp-success { background: linear-gradient(135deg,#22c55e,#16a34a); }
  .lp-toast.lp-info    { background: linear-gradient(135deg,#3b82f6,#2563eb); }
  .lp-toast.lp-error   { background: linear-gradient(135deg,#ef4444,#dc2626); }
  .lp-toast.lp-exit    { animation: lpToastOut 0.35s ease both; }

  @keyframes lpToastIn {
    from { opacity:0; transform: translateY(20px) scale(0.9); }
    to   { opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes lpToastOut {
    to { opacity:0; transform: translateY(16px) scale(0.92); }
  }
`;

let toastId = 0;

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type = "info") => {
    const id = ++toastId;
    setToasts((t) => [...t, { id, msg, type, exit: false }]);
    setTimeout(() => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, exit: true } : x)));
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 400);
    }, 2800);
  };
  return { toasts, show };
}

function OtpInput({ onChange }) {
  const refs = useRef([]);
  const [values, setValues] = useState(["", "", "", "", "", ""]);

  const focusInput = (index) => {
    refs.current[index]?.focus();
  };

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, "");

    if (!val) return;

    const newValues = [...values];
    newValues[index] = val.slice(-1);
    setValues(newValues);
    onChange(newValues.join(""));

    if (index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newValues = [...values];

      if (values[index]) {
        newValues[index] = "";
        setValues(newValues);
        onChange(newValues.join(""));
      } else if (index > 0) {
        focusInput(index - 1);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    }

    if (e.key === "ArrowRight" && index < 5) {
      focusInput(index + 1);
    }
  };

  return (
    <div className="lp-otp-wrap">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className={`lp-otp-box ${val ? "lp-filled" : ""}`}
          value={val}
          maxLength={1}
          inputMode="numeric"
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}

function Button({ children, onClick, disabled, loading }) {
  const btnRef = useRef();

  const handleClick = (e) => {
    if (disabled || loading) return;
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "lp-ripple";
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
    onClick?.(e);
  };

  return (
    <button
      ref={btnRef}
      className={`lp-btn${loading ? " lp-loading" : ""}`}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      <span className="lp-btn-text">{children}</span>
      <div className="lp-spinner" />
    </button>
  );
}

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const { toasts, show } = useToasts();
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!form.name.trim()) {
      show("Please enter your name 👤", "error");
      return;
    }
    if (!form.phone.trim() || form.phone.length < 10) {
      show("Enter a valid phone number 📱", "error");
      return;
    }
    if (!form.email.includes("@")) {
      show("Enter a valid email address 📧", "error");
      return;
    }

    setLoading(true);
    show("Sending OTP to your phone...", "info");
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    show("OTP sent successfully! ", "success");
    setTimeout(() => setStep(2), 400);
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      show("Please enter all 6 digits 🔢", "error");
      return;
    }

    setLoading(true);
    show("Verifying your code...", "info");
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);

    if (otp === "000000") {
      show("Invalid OTP. Please try again ❌", "error");
      return;
    }

    show("Verified! Redirecting you... ✅", "success");
    localStorage.setItem("loggedIn", "true");
    await new Promise((r) => setTimeout(r, 900));
    router.push("/checkout");
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="lp-root">
        <div className="lp-blob lp-blob-1" />
        <div className="lp-blob lp-blob-2" />
        <div className="lp-blob lp-blob-3" />
        <div className="lp-noise" />

        <div className="lp-card">
          <div className="lp-brand"></div>

          <div className="lp-progress">
            <div
              className={`lp-progress-seg ${step >= 1 ? (step > 1 ? "lp-done" : "lp-active") : ""}`}
            />
            <div
              className={`lp-progress-seg ${step >= 2 ? "lp-active" : ""}`}
            />
          </div>

          {step === 1 && (
            <div key="step1">
              <div className="lp-header">
                <div className="lp-step-badge">
                  <span className="lp-step-dot" /> Step 1 of 2
                </div>

                <p className="lp-sub">
                  Enter your details and we'll send you an OTP
                </p>
              </div>

              <div className="lp-field">
                <input
                  className="lp-input"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
                <span className="lp-field-icon">👤</span>
              </div>
              <div className="lp-field">
                <input
                  className="lp-input"
                  placeholder="Phone Number"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                />
                <span className="lp-field-icon">📱</span>
              </div>
              <div className="lp-field">
                <input
                  className="lp-input"
                  placeholder="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
                <span className="lp-field-icon">✉️</span>
              </div>

              <Button onClick={handleSendOtp} loading={loading}>
                Send OTP →
              </Button>
              <div className="lp-secure">
                🔒 256-bit encrypted · Your data stays private
              </div>
            </div>
          )}

          {step === 2 && (
            <div key="step2">
              <div className="lp-header">
                <div className="lp-step-badge">
                  <span className="lp-step-dot" /> Step 2 of 2
                </div>
                <h2 className="lp-title">Enter your OTP </h2>
                <p className="lp-sub">
                  We sent a 6-digit code to{" "}
                  <strong style={{ color: "#f0f0f5" }}>+{form.phone}</strong>
                </p>
              </div>

              <OtpInput onChange={setOtp} />

              <p className="lp-resend">
                Didn't receive it?{" "}
                <button
                  className="lp-resend-link"
                  onClick={() => show("OTP resent! 📨", "success")}
                >
                  Resend code
                </button>
              </p>

              <Button
                onClick={handleVerifyOtp}
                loading={loading}
                disabled={otp.length < 6}
              >
                Verify & Continue →
              </Button>

              <div className="lp-divider">
                <span className="lp-divider-text">or</span>
              </div>

              <button
                className="lp-back-btn"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                }}
              >
                ← Back to details
              </button>

              <div className="lp-secure">🔒 OTP expires in 10 minutes</div>
            </div>
          )}
        </div>

        <div className="lp-toast-wrap">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`lp-toast lp-${t.type}${t.exit ? " lp-exit" : ""}`}
            >
              {t.msg}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
