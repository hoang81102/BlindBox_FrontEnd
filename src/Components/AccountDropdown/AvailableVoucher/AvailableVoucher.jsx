import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AvailableVoucher.scss";

const AvailableVoucher = () => {
  const [filterDate, setFilterDate] = useState("");

  const vouchers = [
    {
      id: 1,
      code: "SAVE20",
      description: "Get 20% off your order!",
      discountMoney: 20,
      money: 100,
      startDate: "2025-02-10",
      endDate: "2025-02-20",
    },
    {
      id: 2,
      code: "FREESHIP",
      description: "Free shipping on all orders over $50!",
      discountMoney: 10,
      money: 50,
      startDate: "2025-02-12",
      endDate: "2025-02-18",
    },
    {
      id: 3,
      code: "LUCKY50",
      description: "Get $50 off when you spend $200!",
      discountMoney: 50,
      money: 200,
      startDate: "2025-02-14",
      endDate: "2025-02-25",
    },
  ];

  const today = new Date();
  const filteredVouchers = vouchers.filter((voucher) => {
    return filterDate ? voucher.endDate >= filterDate : true;
  });

  return (
    <div className="voucher-container container mt-4">
      <h2 className="text-center mb-4">🎟️ Your Vouchers</h2>
      <div className="voucher-filter mb-3 text-center">
        <Form.Control
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-50 mx-auto"
        />
      </div>
      <div className="row">
        {filteredVouchers.map((voucher) => {
          const expiryDate = new Date(voucher.endDate);
          const isExpiringSoon =
            (expiryDate - today) / (1000 * 60 * 60 * 24) < 3;
          return (
            <div key={voucher.id} className="col-md-4 mb-4">
              <Card
                className={`voucher-card shadow-sm ${
                  isExpiringSoon ? "voucher-expiring-soon" : ""
                }`}
              >
                <Card.Body>
                  <Card.Title>{voucher.code}</Card.Title>
                  <Card.Text>{voucher.description}</Card.Text>
                  <h5 className="voucher-text-danger">
                    Save ${voucher.discountMoney} on ${voucher.money}
                  </h5>
                  <p>Valid until: {voucher.endDate}</p>
                  <Button variant="primary" className="voucher-use-button">
                    Use Now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableVoucher;
