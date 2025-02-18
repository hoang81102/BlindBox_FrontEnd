import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import Countdown from "react-countdown";
import dealImage1 from "../../../Assets/Image/BlindBoxCollection6.jpg";
import dealImage2 from "../../../Assets/Image/BlindBoxCollection7.avif";
import dealImage3 from "../../../Assets/Image/Labubu_NewYearCollection.png";
import "./ExclusiveDeals.scss";

const ExclusiveDeals = () => {
  const deals = [
    {
      id: 1,
      name: "Labubu Limited Edition",
      price: 29.99,
      image: dealImage1,
      stock: 5,
    },
    {
      id: 2,
      name: "Baby Three Special",
      price: 24.99,
      image: dealImage2,
      stock: 8,
    },
    {
      id: 3,
      name: "Blind Box Mystery Pack",
      price: 19.99,
      image: dealImage3,
      stock: 3,
    },
  ];

  return (
    <Container className="exclusive-deals text-center">
      <h2>🔥 Exclusive Deals of the Day 🔥</h2>
      <Countdown
        date={Date.now() + 1000 * 60 * 60 * 12}
        className="countdown-timer"
      />
      <Row>
        {deals.map((deal) => (
          <Col md={4} className="deal-card" key={deal.id}>
            <div className="deal-image-container">
              <img className="deal-image" src={deal.image} alt={deal.name} />
              <Badge bg="danger" className="limited-stock-badge">
                Limited Stock: {deal.stock}
              </Badge>
            </div>
            <h3>{deal.name}</h3>
            <p>${deal.price.toFixed(2)}</p>
            <Button variant="primary" className="buy-now-btn">
              Buy Now
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExclusiveDeals;
