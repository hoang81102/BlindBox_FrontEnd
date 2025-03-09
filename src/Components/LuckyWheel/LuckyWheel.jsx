import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./LuckyWheel.scss";
import BlindBox from "../../Assets/Image/BlindBox.png";
import BlindBox1 from "../../Assets/Image/BlindBox1.png";
import "bootstrap/dist/css/bootstrap.min.css";

const initialCollections = {
  Collection1: Array(10).fill({ name: "Mystery Box", image: BlindBox }),
  Collection2: Array(10).fill({ name: "Surprise Box", image: BlindBox1 }),
};

const LuckyWheel = () => {
  const [selectedCollection, setSelectedCollection] = useState("Collection1");
  const [collections, setCollections] = useState(initialCollections);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [balance, setBalance] = useState(100);
  const spinCost = 10;

  const spinWheel = () => {
    if (
      isSpinning ||
      balance < spinCost ||
      collections[selectedCollection].length === 0
    )
      return;
    setIsSpinning(true);
    setBalance((prev) => prev - spinCost);

    const products = collections[selectedCollection];
    const segments = products.length;
    const degreesPerSegment = 360 / segments;
    const randomIndex = Math.floor(Math.random() * segments);

    const targetAngle =
      360 - (randomIndex * degreesPerSegment + degreesPerSegment / 2);
    const extraSpins = 3 * 360;
    const finalRotation = extraSpins + targetAngle;

    setRotation((prev) => prev + finalRotation);

    setTimeout(() => {
      const prize = products[randomIndex];
      setSelectedPrize(prize);
      setIsSpinning(false);

      setCollections((prev) => {
        const updated = { ...prev };
        updated[selectedCollection] = prev[selectedCollection].filter(
          (_, i) => i !== randomIndex
        );
        return updated;
      });
    }, 3000);
  };

  return (
    <Container className="lucky-wheel-container">
      <Row>
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
                    {col} ({collections[col].length} left)
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="right-panel">
          {collections[selectedCollection].length > 0 ? (
            <motion.div
              className="wheel large-wheel"
              animate={{ rotate: rotation }}
              transition={{ type: "tween", duration: 3, ease: "easeOut" }}
            >
              {collections[selectedCollection].map((item, index) => (
                <div
                  key={index}
                  className="segment"
                  style={{
                    transform: `rotate(${
                      (360 / collections[selectedCollection].length) * index
                    }deg)`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="prize-image"
                  />
                  <p className="prize-name">{item.name}</p>
                </div>
              ))}
            </motion.div>
          ) : (
            <p className="no-items">No more items left in this collection!</p>
          )}
          <div className="pointer" />
          <Button
            className="spin-button"
            onClick={spinWheel}
            disabled={
              isSpinning ||
              balance < spinCost ||
              collections[selectedCollection].length === 0
            }
          >
            {isSpinning ? "Spinning..." : `Spin Now $(${spinCost})`}
          </Button>
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
