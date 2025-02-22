import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./LuckyWheel.scss";
import LabubuSlider1 from "../../Assets/Image/Labubu1_ImageSlider.jpg";
import LabubuSlider2 from "../../Assets/Image/Labubu2_ImageSlider.jpg";
import LabubuSlider3 from "../../Assets/Image/Labubu3_ImageSlider.jpg";
import LabubuSlider4 from "../../Assets/Image/Labubu4_ImageSlider.jpg";
import LabubuSlider5 from "../../Assets/Image/Labubu5_ImageSlider.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
const collections = {
  Labubu: [
    { name: "Mystery Box A", image: LabubuSlider1 },
    { name: "Surprise Toy", image: LabubuSlider2 },
    { name: "Rare Collectible", image: LabubuSlider3 },
    { name: "Limited Edition Figure", image: LabubuSlider4 },
    { name: "Special Gift", image: LabubuSlider5 },
  ],
};

const LuckyWheel = () => {
  const [selectedCollection, setSelectedCollection] = useState("Labubu");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [balance, setBalance] = useState(100);
  const spinCost = 10;

  const products = collections[selectedCollection];

  const spinWheel = () => {
    if (isSpinning || balance < spinCost) return;
    setIsSpinning(true);
    setBalance((prev) => prev - spinCost);

    const randomIndex = Math.floor(Math.random() * products.length);
    const degreesPerSegment = 360 / products.length;
    const extraSpins = 3 * 360;
    const newRotation = extraSpins + randomIndex * degreesPerSegment;

    setRotation((prev) => prev + newRotation);
    setTimeout(() => {
      setSelectedPrize(products[randomIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <Container className="lucky-wheel-container">
      z
      <Row>
        {/* Left Side: Wallet, Collection Selection, Spin Cost */}
        <Col md={6} className="left-panel">
          <h1 className="lucky-wheel-title">🎁 Lucky Spin Wheel 🎡</h1>
          <p className="lucky-wheel-balance">Your Balance: ${balance}</p>
          <p className="lucky-wheel-cost">Cost per spin: ${spinCost}</p>
          <Form>
            <Form.Group>
              <Form.Label>Choose your collection:</Form.Label>
              <Form.Select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
              >
                {Object.keys(collections).map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>

        {/* Right Side: Spinning Wheel */}
        <Col md={6} className="right-panel">
          <motion.div
            className="wheel large-wheel"
            animate={{ rotate: rotation }}
            transition={{ type: "tween", duration: 3, ease: "easeOut" }}
          >
            {products.map((item, index) => (
              <div
                key={index}
                className="segment"
                style={{
                  transform: `rotate(${(360 / products.length) * index}deg)`,
                }}
              >
                <img src={item.image} alt={item.name} className="prize-image" />
                <p className="prize-name">{item.name}</p>
              </div>
            ))}
          </motion.div>
          <div className="pointer" />
          <Button
            className="spin-button"
            onClick={spinWheel}
            disabled={isSpinning || balance < spinCost}
          >
            {isSpinning ? "Spinning..." : `Spin Now ($${spinCost})`}
          </Button>

          {/* Popup Result */}
          {selectedPrize && (
            <div className="popup">
              <div className="popup-content">
                <h2>🎉 Congratulations! You won:</h2>
                <img
                  src={selectedPrize.image}
                  alt={selectedPrize.name}
                  className="popup-image"
                />
                <p className="popup-text">{selectedPrize.name}</p>
                <Button onClick={() => setSelectedPrize(null)}>Close</Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LuckyWheel;
