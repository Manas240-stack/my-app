import { useState } from "react";
import { authAPI } from "../api";
import "./Login.css";

interface LoginProps {
  onSuccess: () => void;
}

export default function Login({ onSuccess }: LoginProps) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await authAPI.sendOTP(phone);

      if (result.message) {
        setStep("otp");
        alert("OTP sent! Check backend terminal for code");
      } else {
        setError(result.error || "Failed to send OTP");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    }

    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await authAPI.verifyOTP(phone, otp);

      if (result.access_token) {
        alert("Login successful!");
        onSuccess();
      } else {
        setError(result.error?.message || "Invalid OTP");
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="brand-badge">
          <div className="brand-circle">💊</div>
        </div>

        <h1>SlimRx</h1>

        <p className="subtitle">
          Secure patient login for consultations & prescriptions
        </p>

        {error && <div className="error">{error}</div>}

        {step === "phone" ? (
          <>
            <input
              type="tel"
              placeholder="Enter phone (+919876543210)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />

            <button onClick={handleSendOTP} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />

            <button onClick={handleVerifyOTP} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setStep("phone")}
              className="back-btn"
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
