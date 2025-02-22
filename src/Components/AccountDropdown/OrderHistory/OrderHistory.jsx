import React, { useState } from "react";
import { Table, Form, Container, Badge, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderHistory.scss";
import LabubuSlider3 from "../../../Assets/Image/Labubu3_ImageSlider.jpg";
import LabubuSlider4 from "../../../Assets/Image/Labubu4_ImageSlider.jpg";
const orders = [
  {
    id: 1,
    date: "2024-02-10",
    time: "14:30",
    image: LabubuSlider3,
    name: "Blind Box - Limited Edition",
    quantity: 2,
    price: "$50",
    status: "Delivered",
  },
  {
    id: 2,
    date: "2024-02-12",
    time: "16:00",
    image: LabubuSlider4,
    name: "Surprise Gift Box",
    quantity: 1,
    price: "$30",
    status: "Pending",
  },
];

const OrderHistory = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const filteredOrders = selectedDate
    ? orders.filter((order) => order.date === selectedDate)
    : orders;

  return (
    <Container className="order-history-container">
      <h1 className="order-history-title">📦 Order History</h1>
      <Form className="date-filter-form">
        <Form.Group controlId="dateFilter">
          <Form.Label className="date-filter-label">Filter by Date:</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-filter-input"
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover responsive className="order-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="order-row">
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td className="order-history-product-info">
                <Image
                  src={order.image}
                  rounded
                  className="order-history-product-image"
                />
                <span className="order-history-product-name">{order.name}</span>
              </td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>
                <Badge
                  bg={order.status === "Delivered" ? "success" : "warning"}
                  className="order-history-status-badge"
                >
                  {order.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderHistory;
