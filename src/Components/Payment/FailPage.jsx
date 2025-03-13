import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Result.scss";

const FailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="result-payment-container">
      <div className="result-payment-card">
        <div className="result-payment-icon fail-icon">❌</div>
        <h2 className="result-payment-title">Payment Failed!</h2>
        <p className="result-payment-text">
          Something went wrong with your transaction. Please try again.
        </p>
        <button
          className="btn btn-danger result-payment-btn"
          onClick={() => navigate("/payment")}
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default FailPage;
