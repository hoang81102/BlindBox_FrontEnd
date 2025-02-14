import { React, useState } from "react";
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
import Countdown from "react-countdown";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import labubuImg from "../../Assets/Image/Labubu_icon.png";
import LabubuVideo from "../../Assets/Video/LoginVideo.mp4";
import LabubuLogo from "../../Assets/Image/Labubu_Logo.jpg";
import LabubuSlider1 from "../../Assets/Image/Labubu1_ImageSlider.jpg";
import LabubuSlider2 from "../../Assets/Image/Labubu2_ImageSlider.jpg";
import LabubuSlider3 from "../../Assets/Image/Labubu3_ImageSlider.jpg";
import LabubuSlider4 from "../../Assets/Image/Labubu4_ImageSlider.jpg";
import LabubuSlider5 from "../../Assets/Image/Labubu5_ImageSlider.jpg";
import BlindBoxCollection1 from "../../Assets/Image/BlindBoxCollection.avif";
import BlindBoxCollection2 from "../../Assets/Image/BlindBoxCollection2.jpg";
import BlindBoxCollection3 from "../../Assets/Image/BlindBoxCollection3.jpg";
import BlindBoxCollectio4 from "../../Assets/Image/BlindBoxCollection4.jpg";
import BlindBoxCollection5 from "../../Assets/Image/BlindBoxCollection5.jpg";
import BlindBoxCollection6 from "../../Assets/Image/BlindBoxCollection6.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const bannerImages = [
  BlindBoxCollection1,
  BlindBoxCollection2,
  BlindBoxCollection3,
  BlindBoxCollectio4,
  BlindBoxCollection5,
  BlindBoxCollection6,
];
const HomePage = () => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const totalProducts = 32;
  const productList = [...Array(totalProducts)].map((_, idx) => ({
    id: idx + 1,
    name: `Product ${idx + 1}`,
    price: (19.99 + idx * 5).toFixed(2),
    imageCollection: BlindBoxCollection1,
    imageItem: BlindBoxCollection2,
  }));
  const navigate = useNavigate(); // Hook để điều hướng
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleNavigate = (productId) => {
    navigate(`/products/${productId}`);
  };

  const offset = currentPage * itemsPerPage;
  const currentProducts = productList.slice(offset, offset + itemsPerPage);
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

          {/* Featured Products with Image Hover Effect */}
          <Container className="featured-products">
            <h2 className="text-center">Featured Products</h2>
            <Row>
              {currentProducts.map((product) => {
                const [isHovered, setIsHovered] = useState(false);
                return (
                  <Col
                    md={4}
                    className="product-card hover-effect colorful-card"
                    key={product.id}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="product-image-container">
                      <img
                        className="product-image"
                        src={
                          isHovered
                            ? product.imageItem
                            : product.imageCollection
                        }
                        alt={product.name}
                      />
                      <div
                        className={`button-group ${isHovered ? "show" : ""}`}
                      >
                        <Button
                          variant="primary"
                          className="view-button"
                          onClick={() => handleNavigate(product.id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="success"
                          className="add-to-cart-button"
                          onClick={() =>
                            console.log(`Added ${product.name} to cart`)
                          }
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-price">${product.price}</p>
                  </Col>
                );
              })}
            </Row>

            {/* Pagination Controls */}
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={Math.ceil(totalProducts / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousClassName={"prev-button"}
              nextClassName={"next-button"}
            />
          </Container>

          {/* Flash Sale Section */}
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
                    className="product-image"
                    src={labubuImg}
                    alt="Product"
                  />
                  <h3>Flash Deal {idx + 1}</h3>
                  <p>${(9.99 + idx * 5).toFixed(2)}</p>
                  <Button variant="danger" className="danger-effect">
                    Buy Now
                  </Button>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Customer Reviews Section */}
          <Container className="customer-reviews text-center">
            <h2>Customer Reviews</h2>
            <Carousel
              interval={4000}
              pause={false}
              className="reviews-carousel"
            >
              {[...Array(5)].map((_, idx) => (
                <Carousel.Item key={idx}>
                  <div className="review-card">
                    <p>"Amazing quality and fast shipping!"</p>
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                    <strong>- Customer {idx + 1}</strong>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
