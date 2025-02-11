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
import labubuImg from "../../Assets/Image/Labubu_icon.png";
import LabubuVideo from "../../Assets/Video/LoginVideo.mp4";
import LabubuLogo from "../../Assets/Image/Labubu_Logo.jpg";
import LabubuSlider1 from "../../Assets/Image/Labubu1_ImageSlider.jpg";
import LabubuSlider2 from "../../Assets/Image/Labubu2_ImageSlider.jpg";
import LabubuSlider3 from "../../Assets/Image/Labubu3_ImageSlider.jpg";
import LabubuSlider4 from "../../Assets/Image/Labubu4_ImageSlider.jpg";
import LabubuSlider5 from "../../Assets/Image/Labubu5_ImageSlider.jpg";
import BlindBoxCollection1 from "../../Assets/Image/BlindBoxCollection.avif";
import BlindBoxCollectio2 from "../../Assets/Image/PopMart-Dream-Home.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const bannerImages = [BlindBoxCollection1, BlindBoxCollectio2];

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Banner - Full Width */}
      <section className="banner text-center vibrant-banner">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="banner-swiper"
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="banner-slide"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="banner-overlay">
                  <img src={LabubuLogo} alt="Logo" className="banner-logo" />
                  <h1 className="full-width-title">Blind Box Collection</h1>
                  <p className="full-width-subtitle">
                    Discover the magic of surprise!
                  </p>
                  <Button variant="primary" size="lg" className="glow-effect">
                    Shop Now
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Content Layout - Full Width */}
      <div className="content-layout full-width-content">
        {/* Sidebar */}
        <aside className="sidebar colorful-sidebar">
          <h3>Categories</h3>
          <ListGroup>
            <ListGroup.Item>All Products</ListGroup.Item>
            <ListGroup.Item>Labubu</ListGroup.Item>
            <ListGroup.Item>Baby Three</ListGroup.Item>
            <ListGroup.Item>Blind Boxes</ListGroup.Item>
            <ListGroup.Item>Price Range</ListGroup.Item>
            <ListGroup.Item>Brands</ListGroup.Item>
          </ListGroup>

          <div className="category-section">
            <h4>Find by Brand</h4>
            <div className="scrollable-list">
              <Form.Check type="checkbox" label="POP MART" />
              <Form.Check type="checkbox" label="ToyCity" />
              <Form.Check type="checkbox" label="Finding Unicorn (F.UN)" />
              <Form.Check type="checkbox" label="Rolife" />
              <Form.Check type="checkbox" label="52TOYS" />
              <Form.Check type="checkbox" label="MJ Studio" />
              <Form.Check type="checkbox" label="CJOY" />
              <Form.Check type="checkbox" label="IP Station" />
              <Form.Check type="checkbox" label="Babythree" />
            </div>
          </div>

          <div className="category-section">
            <h4>Find by Price</h4>
            <Form.Range min={0} max={100} step={5} />
            <p>Price Range: $0 - $100</p>
          </div>

          <div className="category-section">
            <h4>Find by Collection</h4>
            <div className="scrollable-list">
              <Form.Check type="checkbox" label="Limited Editions" />
              <Form.Check type="checkbox" label="Seasonal" />
              <Form.Check type="checkbox" label="Classic Series" />
              <Form.Check type="checkbox" label="Exclusive Drops" />
            </div>
          </div>

          <div className="category-section">
            <h4>Find by Type</h4>
            <div className="scrollable-list">
              <Form.Check type="checkbox" label="Limited Editions" />
              <Form.Check type="checkbox" label="Seasonal" />
              <Form.Check type="checkbox" label="Classic Series" />
              <Form.Check type="checkbox" label="Exclusive Drops" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          {/* Best Sellers */}
          <section className="best-sellers text-center">
            <h2>Best Sellers</h2>
            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <video
                  src={LabubuVideo}
                  autoPlay
                  muted
                  loop
                  className="best-sellers-video"
                ></video>
              </Col>
              <Col md={6} className="text-center">
                <Carousel
                  interval={3000}
                  pause={false}
                  className="best-sellers-carousel"
                >
                  <Carousel.Item>
                    <img
                      className="d-block w-100 product-image"
                      src={LabubuSlider1}
                      alt="Labubu"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 product-image"
                      src={LabubuSlider2}
                      alt="Baby Three"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 product-image"
                      src={LabubuSlider3}
                      alt="Blind Box"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 product-image"
                      src={LabubuSlider4}
                      alt="Labubu"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 product-image"
                      src={LabubuSlider5}
                      alt="Labubu"
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
                <Col
                  md={4}
                  className="product-card hover-effect colorful-card"
                  key={idx}
                >
                  <img
                    className="product-image w-50"
                    src={labubuImg}
                    alt="Product"
                  />
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
    </div>
  );
};

export default HomePage;
