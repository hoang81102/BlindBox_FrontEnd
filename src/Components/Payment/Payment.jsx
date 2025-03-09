import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Payment.scss";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { getBlindBoxDetails } from "../../Services/BlindBoxService";
import CollectionImage from "../../Assets/Image/BlindBoxCollection7.avif";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [showModal, setShowModal] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cartDetails, setCartDetails] = useState([]);
  const [address, setAddress] = useState(
    () =>
      JSON.parse(localStorage.getItem("shippingAddress")) || {
        name: localStorage.getItem("fullName"),
        phone: localStorage.getItem("phoneNumber"),
        detail: localStorage.getItem("address"),
      }
  );
  const [newAddress, setNewAddress] = useState(address);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const fetchDetails = async () => {
      if (cartItems.length === 0) return;
      const blindBoxIds = cartItems.map((item) => item.blindBoxId);

      try {
        const blindBoxDetails = await Promise.all(
          blindBoxIds.map(async (id) => await getBlindBoxDetails(id))
        );

        const updatedCart = cartItems.map((item, index) => ({
          ...item,
          // blindBox: blindBoxDetails[index],
          ...blindBoxDetails[index],
        }));

        // Ex: item = {
        //   cartId: "b446ede8-c977-4653-b4b6-15295457cc4b",
        //   blindBoxId: 5,
        //   quantity: 2,
        //   blindBox: { id: 5, name: "Labubu", price: 200, image: "URL" },
        // };
        setCartDetails(updatedCart);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    fetchDetails();
  }, []);

  const handleSaveAddress = () => {
    setAddress(newAddress);
    localStorage.setItem("shippingAddress", JSON.stringify(newAddress));
    setShowModal(false);
  };

  const handleApplyVoucher = () =>
    setDiscount(voucherCode === "DISCOUNT10" ? 50 : 0);

  const subTotal = cartDetails.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
    0
  );
  const finalTotal = subTotal + 20 - discount;

  return (
    <div className="payment-container container mt-4 p-3 rounded shadow bg-white">
      <h2 className="text-center mb-3">Payment</h2>

      <div className="card p-3 mb-3">
        <h5>Order Details</h5>
        {cartDetails.length ? (
          cartDetails.map((item, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <Image
                src={CollectionImage}
                className="payment-product-image me-3"
                rounded
              />
              <div>
                <p className="fw-bold">
                  {item?.blindBoxName || "Unknown Item"}
                </p>
                <p className="text-danger">{item?.price || 0}$</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items in cart.</p>
        )}
      </div>

      <div className="card p-3 mb-3">
        <h5>Shipping Address</h5>
        <p>
          {address.name} | {address.phone}
        </p>
        <p>{address.detail}</p>
        {(!address.name ||
          !address.phone ||
          !address.detail ||
          address.phone === "Unknown" ||
          address.detail === "Not Provided") && (
          <p className="text-danger mt-2">
            ⚠️ You need to update your shipping address before checkout!
          </p>
        )}

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setShowModal(true)}
        >
          Change
        </button>
      </div>

      <div className="card p-3 mb-3">
        <h5>Payment Method</h5>
        {["wallet", "card", "cod"].map((method) => (
          <Form.Check
            key={method}
            type="radio"
            name="payment"
            label={method.toUpperCase()}
            value={method}
            checked={paymentMethod === method}
            onChange={() => setPaymentMethod(method)}
          />
        ))}
      </div>

      <div className="card p-3 mb-3">
        <h5>Add Voucher</h5>
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Enter voucher code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <Button variant="primary" onClick={handleApplyVoucher}>
            Apply
          </Button>
        </div>
        {discount > 0 && (
          <p className="text-success mt-2">Voucher Applied: -${discount}</p>
        )}
      </div>

      <div className="card p-3 mb-3">
        <h5>Order Summary</h5>
        <div className="d-flex justify-content-between">
          <span>Total Product Price:</span>
          <span>{subTotal}$</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Shipping Fee:</span>
          <span>1.5$</span>
        </div>
        {discount > 0 && (
          <div className="d-flex justify-content-between text-success">
            <span>Voucher Discount:</span>
            <span>-{discount}$</span>
          </div>
        )}
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total Payment:</span>
          <span className="text-danger">{finalTotal}$</span>
        </div>
      </div>

      <button
        className="btn btn-danger w-100"
        disabled={
          !address.name ||
          !address.phone ||
          !address.detail ||
          address.phone === "Unknown" ||
          address.detail === "Not Provided"
        }
      >
        Place Order
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Update Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-2">
            {["name", "phone", "detail"].map((field, index) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label className="fw-bold">
                  {field === "name" && "Full Name"}
                  {field === "phone" && "Phone Number"}
                  {field === "detail" && "Address"}
                </Form.Label>
                <Form.Control
                  type={field === "phone" ? "tel" : "text"}
                  placeholder={
                    field === "name"
                      ? "Enter full name..."
                      : field === "phone"
                      ? "Enter phone number..."
                      : "Enter detailed address..."
                  }
                  className="rounded-3 border border-primary shadow-sm p-2"
                  value={newAddress[field]}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, [field]: e.target.value })
                  }
                />
              </Form.Group>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="rounded-pill px-4"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="rounded-pill px-4"
            onClick={handleSaveAddress}
          >
            Save Address
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Payment;
