import { useEffect, useState } from "react";
import "./Payment.css";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const amount = 1299;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const orderResponse = await fetch(
        "https://my-app-production-ac5b.up.railway.app/api/v1/payments/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, type: "consultation" }),
        }
      );

      const orderData = await orderResponse.json();

      const options = {
        key: "rzp_test_T38FWB5aedEKc",
        amount: amount * 100,
        currency: "INR",
        name: "SlimRx",
        description: "Consultation Booking",
        order_id: orderData.razorpay_order_id,
        handler: async function () {
          alert("Payment Successful");
          onSuccess();
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-icon">💳</div>

        <h1>Complete Payment</h1>
        <p>Secure payment powered by Razorpay</p>

        <div className="amount-box">₹{amount}</div>

        <button onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
