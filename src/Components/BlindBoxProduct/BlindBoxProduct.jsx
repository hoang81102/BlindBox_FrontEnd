import React, { useState } from "react";
import "./BlindBoxProduct.scss";
import { Container, Row, Col, Button, Image, Nav } from "react-bootstrap";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import CollectionImage from "../../Assets/Image/BlindBoxCollection7.avif";
import Character1 from "../../Assets/Image/Labubu1_ImageSlider.jpg";
import Character2 from "../../Assets/Image/Labubu_NewYearCollection.webp";
import Character3 from "../../Assets/Image/Labubu2_NewYearCollection.jpg";
import Character4 from "../../Assets/Image/Labubu3_NewYearCollection.jpg";
import Character5 from "../../Assets/Image/Labubu4_ImageSlider.jpg";

const characters = [
  CollectionImage,
  Character1,
  Character2,
  Character3,
  Character4,
  Character5,
];
const relatedProducts = [Character2, Character3, Character4, Character5];

const BlindBoxProduct = () => {
  const [mainImage, setMainImage] = useState(CollectionImage);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const basePrice = 200;
  const [selectedSize, setSelectedSize] = useState("Blindbox");
  const [price, setPrice] = useState(basePrice);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setPrice(size === "Set of 6 Blindbox" ? basePrice * 6 : basePrice);
  };

  return (
    <Container className="blindbox-product">
      <Row>
        <Col md={6} className="collection-image-container">
          <Image src={mainImage} fluid className="collection-image" />
          <div className="character-slider-container">
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              navigation
              loop={true}
              modules={[Navigation]}
              onSlideChange={(swiper) =>
                setMainImage(characters[swiper.realIndex])
              }
            >
              {characters.map((character, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => {
                    setMainImage(character);
                    setActiveIndex(index);
                  }}
                >
                  <Image
                    src={character}
                    thumbnail
                    className={`character-image ${
                      activeIndex === index ? "active" : ""
                    }`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Col>
        <Col md={6} className="product-details">
          <h2 className="product-title">
            THE STARRY STARRY NIGHT BLIND BOX SERIES
          </h2>
          <p className="sku">SKU: PVN5947</p>
          <p className="brand">TRADEMARK: PARTNER TOYS</p>
          <p className="price">{price.toLocaleString()}$</p>
          <p className="status">Status: In stock</p>

          <div className="options">
            <label>Option:</label>
            <div className="size-options">
              <button
                className={`size-btn ${
                  selectedSize === "Blindbox" ? "active" : ""
                }`}
                onClick={() => handleSizeChange("Blindbox")}
              >
                Blindbox
              </button>
              <button
                className={`size-btn ${
                  selectedSize === "Set of 6 Blindbox" ? "active" : ""
                }`}
                onClick={() => handleSizeChange("Set of 6 Blindbox")}
              >
                Set of 6 Blindbox
              </button>
            </div>
          </div>

          <Button className="out-of-stock" disabled>
            🛒 OUT OF STOCK
          </Button>

          <Button className="wishlist">❤️ Add to favorites</Button>
          <div className="purchase-info">
            <p>
              📞 CONTACT: <strong>1800 123 456</strong>
            </p>
            <p>
              🚚 USE SHIPPING CODE: <strong>.....</strong> FOR ORDER{" "}
              <strong>FROM .... </strong>
            </p>
            <p>
              🎖️ GENUINE: <strong>100% COMMITMENT</strong>
            </p>
          </div>
        </Col>
      </Row>

      <Row className="product-tabs">
        <Col>
          <Nav variant="tabs" defaultActiveKey="description">
            <Nav.Item>
              <Nav.Link
                eventKey="description"
                onClick={() => setActiveTab("description")}
              >
                Description
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="reviews"
                onClick={() => setActiveTab("reviews")}
              >
                Customer Reviews
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {activeTab === "description" && (
            <div className="tab-content">
              <h3>Product Description</h3>
              <p>
                <strong>Brand:</strong> POPMART
              </p>
              <p>
                <strong>Size: </strong> 7~9cm
              </p>
              <p>
                <strong>Material: </strong> ABS/PVC
              </p>
              <p>
                <strong>Recommended Age: </strong> 15+
              </p>
              <p>
                <strong>Please note:</strong> These products are called "Blind
                boxes" - you will not be able to choose which model you will
                receive. You won't know what you get until you open it. Surprise
                will be an indispensable spice to make the game more
                interesting.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="tab-content">
              <h3>Customer Reviews</h3>
              <div className="feedback-item">
                <img
                  src="avatar1.jpg"
                  alt="Customer Avatar"
                  className="avatar"
                />
                <div className="feedback-content">
                  <span className="customer-name">Do Minh Quang</span>
                  <div className="rating"></div>
                  <p className="comment">
                    "The product is very beautiful and cute!"
                  </p>
                </div>
              </div>

              <div className="feedback-item">
                <img
                  src="avatar2.jpg"
                  alt="Customer Avatar"
                  className="avatar"
                />
                <div className="feedback-content">
                  <span className="customer-name">Nguyen Son Tung</span>
                  <div className="rating"></div>
                  <p className="comment">"Good quality, fast delivery."</p>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>

      {/* Related Products */}
      <Row className="related-products">
        <Col>
          <h3>Related products</h3>
          <div className="related-products-list">
            {relatedProducts.map((product, index) => (
              <Image
                key={index}
                src={product}
                thumbnail
                className="related-product-image"
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BlindBoxProduct;
