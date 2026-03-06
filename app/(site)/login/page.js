"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

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

    const newValues = [...values];

    if (val === "") {
      newValues[index] = "";
    } else {
      newValues[index] = val.slice(-1);
      if (index < 5) {
        focusInput(index + 1);
      }
    }

    setValues(newValues);
    onChange(newValues.join(""));
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
    const res = await fetch(
      "https://sudhir-and-sons-backend.vercel.app/api/auth/send-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      show(data.message || "Failed to send OTP", "error");
      setLoading(false);
      return;
    }

    show("OTP sent to your email 📧", "success");
    setLoading(false);
    setTimeout(() => setStep(2), 400);
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      show("Please enter all 6 digits 🔢", "error");
      return;
    }

    setLoading(true);
    show("Verifying your code...", "info");
    const res = await fetch(
      "https://sudhir-and-sons-backend.vercel.app/api/auth/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          otp: otp,
          name: form.name,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      show(data.message || "OTP verification failed", "error");
      setLoading(false);
      return;
    }

    show("Verified! Redirecting you... ✅", "success");

    /* save login state */
    localStorage.setItem("loggedIn", "true");

    /* save user details */
    /* save user details */
    localStorage.setItem(
      "userData",
      JSON.stringify({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      }),
    );

    /* save userId separately */
    localStorage.setItem("userId", data.user._id);

    /* save token (important later) */
    localStorage.setItem("token", data.token);

    router.push("/checkout");
  };

  return (
    <>
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
