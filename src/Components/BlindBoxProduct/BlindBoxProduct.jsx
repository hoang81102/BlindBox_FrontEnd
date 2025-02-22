import React, { useState, useContext } from "react";
import "./BlindBoxProduct.scss";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Nav,
  Modal,
} from "react-bootstrap";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { CartService } from "../../Services/CartService";
import DesciptionFeedback from "./DescriptionFeedback/DesciptionFeedback";
import RelatedProduct from "./RelatedProduct/RelatedProduct";
import CollectionImage from "../../Assets/Image/BlindBoxCollection7.avif";
import Character1 from "../../Assets/Image/Labubu1_ImageSlider.jpg";
import Character2 from "../../Assets/Image/Labubu_NewYearCollection.webp";
import Character3 from "../../Assets/Image/Labubu2_NewYearCollection.jpg";
import Character4 from "../../Assets/Image/Labubu3_NewYearCollection.jpg";
import Character5 from "../../Assets/Image/Labubu4_ImageSlider.jpg";

const BlindBoxProduct = () => {
  const [mainImage, setMainImage] = useState(CollectionImage);
  const [activeIndex, setActiveIndex] = useState(0);
  const basePrice = 200;
  const [selectedBoxType, setSelectedBoxType] = useState("Blindbox");
  const [selectedSize, setSelectedSize] = useState("100%");
  const [price, setPrice] = useState(basePrice);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const { addToCart } = useContext(CartService);
  const navigate = useNavigate();

  const handleBoxTypeChange = (type) => {
    setSelectedBoxType(type);
    setPrice(type === "Set of 6 Blindbox" ? basePrice * 6 : basePrice);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const characters = [
    CollectionImage,
    Character1,
    Character2,
    Character3,
    Character4,
    Character5,
  ];

  const product = {
    id: "blindbox123",
    name: "THE STARRY STARRY NIGHT BLIND BOX SERIES",
    image: mainImage,
    price: price,
    size: selectedSize,
    quantity: quantity,
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add product to cart.");
      return;
    }

    const productToAdd = {
      blindBoxId: 1,
      packageId: 0,
      name: "THE STARRY STARRY NIGHT BLIND BOX SERIES",
      image: mainImage,
      price: price,
      size: selectedSize,
    };

    try {
      await addToCart(userId, productToAdd, quantity);
      setIsAdded(true);
      setShowModal(false);
      setShowMiniCart(true);

      setTimeout(() => setIsAdded(false), 1000);
      setTimeout(() => setShowMiniCart(false), 3000);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <Container className="blindbox-product">
      {/* Blind Box Detail */}
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
          <div className="box-type-selection">
            <label>Type:</label>
            {["Blindbox", "Set of 6 Blindbox"].map((type) => (
              <button
                key={type}
                className={`box-type-btn ${
                  selectedBoxType === type ? "active" : ""
                }`}
                onClick={() => handleBoxTypeChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="cart-buttons">
            <Button
              className={`add-to-cart ${isAdded ? "added" : ""}`}
              onClick={() => setShowModal(true)}
            >
              {isAdded ? "✔ Added" : "🛒 Add to Cart"}
            </Button>
            <Button
              className="buy-now"
              onClick={() => {
                handleAddToCart();
                navigate("/checkout");
              }}
            >
              ⚡ Buy now
            </Button>
          </div>
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

      {/* Description/Feedback */}
      <DesciptionFeedback />

      {/* RelatedProduct */}
      <RelatedProduct />

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="blind-box-modal"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">🛒 Add to Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <div className="modal-product-info">
            <Image src={product.image} fluid className="product-image" />
            <div className="product-details">
              <h5 className="product-name">{product.name}</h5>
              <p className="product-price">
                <span className="old-price">
                  {(product.price * 1.1).toLocaleString()}$
                </span>
                <span className="new-price">
                  {product.price.toLocaleString()}$
                </span>
              </p>
              <p className="stock-info">Stock: Available</p>
            </div>
          </div>

          <hr className="divider" />

          <div className="size-selection-container">
            <span className="size-guide">Size Guide</span>
            <div className="size-selection-container">
              <label className="size-label">Size</label>
              <div className="size-selection">
                {["100%", "200%", "300%", "400%", "500%", "1000%"].map(
                  (size) => (
                    <button
                      key={size}
                      className={`size-btn ${
                        selectedSize === size ? "active" : ""
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="quantity-container">
            <label className="quantity-label">Quantity</label>
            <div className="quantity-box">
              <button
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Mini Cart Popup */}
      {showMiniCart && (
        <div className="mini-cart">
          <Image
            src={mainImage}
            alt="Added Product"
            className="mini-cart-image"
          />
          <div className="mini-cart-details">
            <p className="mini-cart-title">
              THE STARRY STARRY NIGHT BLIND BOX SERIES
            </p>
            <p className="mini-cart-price">{product.price.toLocaleString()}$</p>
            <Button
              variant="primary"
              className="mini-cart-button"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default BlindBoxProduct;
