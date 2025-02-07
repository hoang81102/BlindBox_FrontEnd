import React from "react";
import "./HomePage.scss";
import {
  Container,
  Row,
  Col,
  Button,
  Carousel,
  ListGroup,
  Form,
} from "react-bootstrap";
import labubuImg from "../../Assets/Image/Labubu_Image(Homepage).png";
import babyThreeImg from "../../Assets/Image/Labubu_Image(Homepage).png";
import blindBoxImg from "../../Assets/Image/Labubu_Image(Homepage).png";
import LabubuVideo from "../../Assets/Video/LabubuVideo";
const HomePage = () => {
  return (
    <div className="homepage">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Categories</h3>
        <ListGroup>
          <ListGroup.Item>All Products</ListGroup.Item>
          <ListGroup.Item>Labubu</ListGroup.Item>
          <ListGroup.Item>Baby Three</ListGroup.Item>
          <ListGroup.Item>Blind Boxes</ListGroup.Item>
          <ListGroup.Item>Price Range</ListGroup.Item>
          <ListGroup.Item>Brands</ListGroup.Item>
        </ListGroup>

        <h4>Find by Brand</h4>
        <div className="scrollable-list">
          <Form.Check type="checkbox" label="Brand A" />
          <Form.Check type="checkbox" label="Brand B" />
          <Form.Check type="checkbox" label="Brand C" />
          <Form.Check type="checkbox" label="Brand D" />
          <Form.Check type="checkbox" label="Brand E" />
          <Form.Check type="checkbox" label="Brand F" />
        </div>

        <h4>Find by Price</h4>
        <Form.Check type="checkbox" label="$0 - $20" />
        <Form.Check type="checkbox" label="$21 - $50" />
        <Form.Check type="checkbox" label="$51 - $100" />
        <Form.Check type="checkbox" label="$100+" />
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Banner */}
        <section className="banner text-center">
          <h1>Blind Box Collection</h1>
          <p>Discover the magic of surprise!</p>
          <Button variant="primary" size="lg" className="glow-effect">
            Shop Now
          </Button>
        </section>

        {/* Best Sellers */}
        <section className="best-sellers text-center">
          <h2>Best Sellers</h2>
          <Row>
            <Col md={6}>
              <video className="best-seller-video" controls>
                <source src={LabubuVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Col>
            <Col md={6}>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-75 product-image"
                    src={labubuImg}
                    alt="Labubu"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-75 product-image"
                    src={babyThreeImg}
                    alt="Baby Three"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-75 product-image"
                    src={blindBoxImg}
                    alt="Blind Box"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </section>

        {/* Featured Products */}
        <Container className="featured-products">
          <h2 className="text-center">Featured Products</h2>
          <Row>
            {[...Array(9)].map((_, idx) => (
              <Col md={4} className="product-card hover-effect" key={idx}>
                <img className="product-image" src={labubuImg} alt="Product" />
                <h3>Product {idx + 1}</h3>
                <p>${(19.99 + idx * 5).toFixed(2)}</p>
                <Button variant="success" className="glow-effect">
                  Add to Cart
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
