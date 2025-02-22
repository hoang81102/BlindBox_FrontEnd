import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import "./FlashSale.scss";
import LabubuSlider3 from "../../../Assets/Image/Labubu3_ImageSlider.jpg";
import Countdown from "react-countdown";
const FlashSale = () => {
  return (
    <Container className="flash-sale text-center">
      <h2>Flash Sale</h2>
      <Countdown
        date={Date.now() + 1000 * 60 * 60 * 24}
        className="countdown-timer"
      />
      <Row>
        {[...Array(4)].map((_, idx) => (
          <Col md={3} className="flash-sale-card" key={idx}>
            <img
              className="flash-sale-product-image"
              src={LabubuSlider3}
              alt="Product"
            />
            <h3>Flash Deal {idx + 1}</h3>
            <p>${(9.99 + idx * 5).toFixed(2)}</p>
            <Button variant="danger" className="flash-sale-danger-effect">
              Buy Now
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FlashSale;
