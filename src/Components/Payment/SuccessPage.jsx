import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Result.scss";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="result-payment-container">
      <div className="result-payment-card">
        <div className="result-payment-icon success-icon">✅</div>
        <h2 className="result-payment-title">Payment Successful!</h2>
        <p className="result-payment-text">
          Your transaction was completed successfully.
        </p>
        <button
          className="btn btn-success result-payment-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
