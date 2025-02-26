import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Payment.scss";
import { Modal, Button, Form, Image } from "react-bootstrap";
import CollectionImage from "../../Assets/Image/BlindBoxCollection7.avif";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [showModal, setShowModal] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState({
    name: "Do Minh Quang",
    phone: "0123 456 789",
    detail: "827, District Binh Tan, Ho Chi Minh City",
  });
  const [newAddress, setNewAddress] = useState({ ...address });

  const handlePaymentChange = (method) => setPaymentMethod(method);
  const handleShowModal = () => {
    setNewAddress({ ...address });
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleSaveAddress = () => {
    setAddress(newAddress);
    handleCloseModal();
  };

  const handleApplyVoucher = () => {
    if (voucherCode === "DISCOUNT10") {
      setDiscount(50); // Giảm giá 50$
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="payment-container container mt-4 p-3 rounded shadow bg-white">
      <h2 className="payment-title text-center mb-3">Payment</h2>

      {/* Order Information */}
      <div className="payment-card card p-3 mb-3">
        <h5 className="payment-section-title">Order Details</h5>
        <div className="d-flex align-items-center">
          <Image
            src={CollectionImage}
            className="payment-product-image me-3"
            rounded
          />
          <div>
            <p className="payment-product-name fw-bold">NEW YEAR COLLECTION</p>
            <p className="payment-product-price text-danger">500$</p>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="payment-card card p-3 mb-3">
        <h5 className="payment-section-title">Shipping Address</h5>
        <p className="payment-address">
          {address.name} | {address.phone}
        </p>
        <p className="payment-address-detail">{address.detail}</p>
        <button
          className="payment-change-btn btn btn-outline-primary btn-sm"
          onClick={handleShowModal}
        >
          Change
        </button>
      </div>

      {/* Payment Method */}
      <div className="payment-card card p-3 mb-3">
        <h5 className="payment-section-title">Payment Method</h5>
        {[
          { id: "wallet", label: "E-Wallet" },
          { id: "card", label: "Credit/Debit Card" },
          { id: "cod", label: "Cash on Delivery (COD)" },
        ].map((method, index) => (
          <div className="form-check" key={index}>
            <input
              type="radio"
              className="form-check-input"
              name="payment"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={() => handlePaymentChange(method.id)}
            />
            <label className="form-check-label">{method.label}</label>
          </div>
        ))}
      </div>

      {/* Add Voucher */}
      <div className="payment-card card p-3 mb-3">
        <h5 className="payment-section-title">Add Voucher</h5>
        <div className="payment-voucher d-flex">
          <Form.Control
            type="text"
            placeholder="Enter voucher code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <Button
            variant="primary"
            className="payment-apply"
            onClick={handleApplyVoucher}
          >
            Apply
          </Button>
        </div>
        {discount > 0 && (
          <p className="text-success mt-2">Voucher Applied: -${discount}</p>
        )}
      </div>

      {/* Order Summary */}
      <div className="payment-card card p-3 mb-3">
        <h5 className="payment-section-title">Order Summary</h5>
        <div className="d-flex justify-content-between">
          <span className="payment-summary-label">Total Product Price:</span>
          <span className="payment-summary-value">500$</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="payment-summary-label">Shipping Fee:</span>
          <span className="payment-summary-value">20$</span>
        </div>
        {discount > 0 && (
          <div className="d-flex justify-content-between text-success">
            <span className="payment-summary-label">Voucher Discount:</span>
            <span className="payment-summary-value">-{discount}$</span>
          </div>
        )}
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span className="payment-total-label">Total Payment:</span>
          <span className="payment-total-value text-danger">
            {520 - discount}$
          </span>
        </div>
      </div>

      {/* Place Order Button */}
      <button className="payment-place-order-btn btn btn-danger w-100">
        Place Order
      </button>

      {/* Address Change Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="payment-modal"
      >
        <Modal.Header closeButton className="payment-modal-header">
          <Modal.Title>Change Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body className="payment-modal-body">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter shipping address"
                value={newAddress.detail}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, detail: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="payment-modal-footer">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAddress}>
            Save Address
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Payment;
