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
    <div className="login-page">
      <div className="login-card">
        <div className="logo-circle">💊</div>

        <h1>SlimRx</h1>
        <p>Secure patient portal for consultations & prescriptions</p>

        {error && <div className="error-box">{error}</div>}

        {step === "phone" ? (
          <>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button onClick={handleSendOTP} disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={handleVerifyOTP} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              className="back-button"
              onClick={() => setStep("phone")}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
