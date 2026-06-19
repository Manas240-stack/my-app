import { useEffect, useState } from 'react';
import './Payment.css';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const amount = 1299;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderResponse = await fetch('http://localhost:5000/api/v1/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, type: 'consultation' }),
      });

      const orderData = await orderResponse.json();
      const razorpayOrderId = orderData.razorpay_order_id;

      const options = {
        key: 'rzp_test_T38FWB5aedEKc',
        amount: amount * 100,
        currency: 'INR',
        name: 'SlimRx',
        description: 'Consultation Booking',
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          const verifyResponse = await fetch('http://localhost:5000/api/v1/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: razorpayOrderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (verifyResponse.ok) {
            alert('Payment successful!');
            onSuccess();
          }
        },
        prefill: {
          name: 'Patient',
          email: 'patient@slimrx.in',
          contact: '9876543210',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed');
    }
    setLoading(false);
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Complete Payment</h2>
        <p className="amount">₹{amount}</p>
        <p className="description">Consultation Booking</p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="pay-btn"
        >
          {loading ? 'Processing...' : `Pay ₹${amount} with Razorpay`}
        </button>

        <p className="info">Secure payment powered by Razorpay</p>
      </div>
    </div>
  );
}