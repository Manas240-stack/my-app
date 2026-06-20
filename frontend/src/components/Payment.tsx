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
  const [method, setMethod] = useState("upi");

  const amount = 1299;
  const consultationFee = 999;
  const platformFee = 300;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (method === "cod") {
      alert("COD Order Confirmed");
      onSuccess();
      return;
    }

    setLoading(true);

    try {
      const orderResponse = await fetch(
        "https://my-app-production-ac5b.up.railway.app/api/v1/payments/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      const orderData = await orderResponse.json();

      const options = {
        key: "rzp_test_T38FWB5aedEKc",
        amount: amount * 100,
        currency: "INR",
        name: "MedVeda",
        description: "Healthcare Consultation",
        order_id: orderData.razorpay_order_id,
        handler: function () {
          alert("Payment Successful");
          onSuccess();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="payment-page">
      <div className="payment-left">
        <h1>Complete Checkout</h1>
        <p>Secure payment for consultation & treatment plan</p>

        <div className="payment-methods">
          <button
            className={method === "upi" ? "method active" : "method"}
            onClick={() => setMethod("upi")}
          >
            UPI
          </button>

          <button
            className={method === "card" ? "method active" : "method"}
            onClick={() => setMethod("card")}
          >
            Card
          </button>

          <button
            className={method === "cod" ? "method active" : "method"}
            onClick={() => setMethod("cod")}
          >
            COD
          </button>
        </div>

        <button
          className="pay-btn"
          disabled={loading}
          onClick={handlePayment}
        >
          {loading ? "Processing..." : "Pay Securely"}
        </button>
      </div>

      <div className="payment-right">
        <div className="summary-card">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Consultation</span>
            <span>₹{consultationFee}</span>
          </div>

          <div className="summary-row">
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
