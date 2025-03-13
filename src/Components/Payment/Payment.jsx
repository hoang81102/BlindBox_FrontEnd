import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Payment.scss";
import { useNavigate } from "react-router-dom";
import { createPaymentDetail } from "../../Services/PaymentService";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [loading, setLoading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const orderInfo = JSON.parse(localStorage.getItem("orderInfo")) || {};

  const handlePayment = async () => {
    setLoading(true);
    const paymentData = {
      orderId: orderInfo.orderId,
      description: orderInfo.note,
      price: orderInfo.priceTotal,
      returnUrl: "http://localhost:3000/payment-success",
      cancelUrl: "http://localhost:3000/payment-fail",
    };

    try {
      const response = await createPaymentDetail(paymentData);
      if (response.success && response.data?.data.checkoutUrl) {
        window.location.href = response.data.data.checkoutUrl;
      } else {
        alert("Payment failed: " + response.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment.");
    }
    setLoading(false);
  };

  return (
    <div className="payment-container container mt-4 p-3 rounded shadow bg-white">
      <h2 className="text-center mb-3">Payment</h2>
      <div className="card p-3 mb-3">
        <h5>Order Summary</h5>
        <p>
          Total:{" "}
          <strong className="text-danger">${orderInfo.priceTotal || 0}</strong>
        </p>
      </div>
      <div className="card p-3 mb-3">
        <h5>Select Payment Method</h5>
        {["wallet", "card", "cod"].map((method) => (
          <div key={method} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
            />
            <label className="form-check-label text-capitalize">{method}</label>
          </div>
        ))}
      </div>
      <button
        className="btn btn-success w-100"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  );
};

export default Payment;
