import { useState, useEffect } from "react";
import { paymentAPI } from "../api";
import "./Payment.css";

interface PaymentProps {
  consultationFee: number;
  doctorName: string;
  consultationDate: string;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Payment = ({
  consultationFee,
  doctorName,
  consultationDate,
  onPaymentSuccess,
  onCancel,
}: PaymentProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Load Razorpay script
  useEffect(() => {
    // Check if script already loaded
    if (window.Razorpay) {
      console.log("✅ Razorpay script already loaded");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("❌ Failed to load Razorpay script");
      setError("Failed to load payment gateway");
    };

    document.body.appendChild(script);

    return () => {
      // Don't remove script
    };
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("💳 Starting payment process...");

      const token = localStorage.getItem("access_token");

      // Create order on backend
      console.log("📍 Creating Razorpay order...");
      const orderResult = await paymentAPI.createOrder(
        token || "",
        consultationFee,
        "consultation"
      );

      console.log("✅ Order created:", orderResult);

      if (!orderResult.razorpay_order_id) {
        throw new Error("Failed to create order - no order ID returned");
      }

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error("Razorpay not loaded. Please refresh and try again.");
      }

      console.log("🎯 Opening Razorpay checkout...");

      // Razorpay options with YOUR actual key
      const options = {
        key: "rzp_test_T38FW4B5aedEKc", // Your actual test key
        amount: consultationFee * 100, // Amount in paise
        currency: "INR",
        name: "SlimRx",
        description: `Consultation with ${doctorName}`,
        order_id: orderResult.razorpay_order_id,
        handler: async (response: any) => {
          try {
            console.log("✅ Payment completed by user");
            console.log("   Payment Response:", response);

            // Verify payment on backend
            const verifyResult = await paymentAPI.verifyPayment(
              token || "",
              orderResult.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            console.log("🔐 Verification result:", verifyResult);

            if (verifyResult.success) {
              setPaymentStatus("success");
              setTimeout(() => {
                onPaymentSuccess();
              }, 2000);
            } else {
              setError("Payment verification failed");
              setPaymentStatus("failed");
            }
          } catch (err: any) {
            console.error("❌ Payment verification error:", err);
            setError(err.message || "Payment verification failed");
            setPaymentStatus("failed");
          }
        },
        prefill: {
          name: "Patient Name",
          email: "patient@slimrx.in",
          contact: "9876543210",
        },
        theme: {
          color: "#667eea",
        },
        modal: {
          ondismiss: () => {
            console.log("⚠️ Payment modal closed by user");
            setLoading(false);
          },
        },
      };

      const paymentWindow = new window.Razorpay(options);
      paymentWindow.open();

      setLoading(false);
    } catch (err: any) {
      console.error("❌ Payment error:", err);
      setError(err.message || "Failed to initiate payment");
      setPaymentStatus("failed");
      setLoading(false);
    }
  };

  // Success State
  if (paymentStatus === "success") {
    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal payment-success">
          <div className="success-icon">✅</div>
          <h2>Payment Successful!</h2>
          <p>Your consultation has been booked successfully.</p>
          <div className="receipt-details">
            <div className="receipt-item">
              <span>Doctor:</span>
              <span>{doctorName}</span>
            </div>
            <div className="receipt-item">
              <span>Date & Time:</span>
              <span>{new Date(consultationDate).toLocaleString()}</span>
            </div>
            <div className="receipt-item">
              <span>Amount Paid:</span>
              <span>₹{consultationFee}</span>
            </div>
          </div>
          <p className="redirecting">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (paymentStatus === "failed") {
    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal payment-failed">
          <div className="failed-icon">❌</div>
          <h2>Payment Failed</h2>
          <p>{error || "Something went wrong. Please try again."}</p>
          <div className="modal-actions">
            <button className="btn-primary" onClick={handlePayment}>
              Retry Payment
            </button>
            <button className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Payment Form
  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <button className="modal-close" onClick={onCancel}>
          ✕
        </button>

        <h2>Complete Payment</h2>

        <div className="payment-details">
          <div className="detail-section">
            <h3>Consultation Details</h3>
            <div className="detail-item">
              <span>Doctor:</span>
              <span className="highlight">{doctorName}</span>
            </div>
            <div className="detail-item">
              <span>Date & Time:</span>
              <span className="highlight">
                {new Date(consultationDate).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Payment Information</h3>
            <div className="detail-item">
              <span>Consultation Fee:</span>
              <span>₹{consultationFee}</span>
            </div>
            <div className="detail-item">
              <span>Taxes (0%):</span>
              <span>₹0</span>
            </div>
            <div className="detail-item total">
              <span>Total Amount:</span>
              <span>₹{consultationFee}</span>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Payment Method</h3>
            <div className="method-info">
              <span>💳 Credit/Debit Card</span>
              <span>🏦 Net Banking</span>
              <span>📱 UPI</span>
              <span>🔐 Powered by Razorpay</span>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="modal-actions">
          <button
            className="btn-primary"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          <button className="btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        </div>

        <div className="payment-footer">
          <p>🔒 Secure payment powered by Razorpay</p>
        </div>
      </div>
    </div>
  );
};