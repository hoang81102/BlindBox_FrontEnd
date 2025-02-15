import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Container, Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartAnimation from "../../Assets/Video/Animation_Cart.webm";
import "./CartPage.scss";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * item.quantity,
    0
  );

  return (
    <Container className="cart-page-container">
      <div className="cart-title-container">
        <video
          src={CartAnimation}
          autoPlay
          muted
          loop
          className="cart-icon-video"
        ></video>
        <h2 className="cart-title">Your Cart Is Here !!!</h2>
      </div>

      {cart.length > 0 ? (
        <Row className="cart-content">
          {/* Bên trái: Danh sách sản phẩm */}
          <Col md={8} className="cart-items-container">
            <ListGroup className="cart-list-container">
              {cart.map((item) => (
                <ListGroup.Item key={item.id} className="cart-item-container">
                  <div className="cart-item-content">
                    <img
                      src={item.imageCollection}
                      alt={item.name}
                      className="cart-img-container"
                    />
                    <div className="cart-details-container">
                      <p className="cart-name-container">{item.name}</p>
                      <p className="cart-price-container">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                      <p className="cart-description-container">
                        {item.description}
                      </p>
                      <div className="cart-quantity-container">
                        <Button
                          variant="outline-danger"
                          className="quantity-button"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          ➖
                        </Button>
                        <span className="quantity">{item.quantity}</span>
                        <Button
                          variant="outline-success"
                          className="quantity-button"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          ➕
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    className="delete-button-container"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ❌
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Bên phải: Tổng tiền + Nút Checkout */}
          <Col md={4} className="cart-summary-container">
            <Card className="cart-summary-card">
              <Card.Body>
                <h4 className="cart-total-title">
                  Total: ${totalPrice.toFixed(2)}
                </h4>
                <div className="buttons-container">
                  <Button
                    variant="secondary"
                    className="continue-shopping-container"
                    onClick={() => navigate("/")}
                  >
                    ⬅️ Continue Shopping
                  </Button>
                  <Button
                    variant="primary"
                    className="checkout-button-container"
                    onClick={() => {
                      if (!localStorage.getItem("username")) {
                        localStorage.setItem("redirectPath", "/cart");
                        navigate("/login");
                      } else {
                        navigate("/checkout");
                      }
                    }}
                  >
                    Checkout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p className="empty-cart-container">Your cart is empty. 😢</p>
      )}
    </Container>
  );
};

export default CartPage;
