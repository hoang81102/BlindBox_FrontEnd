import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartAnimation from "../../../Assets/Video/Animation_Cart.webm";
import "./CartPage.scss";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const subTotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * item.quantity,
    0
  );
  const shippingCost = subTotal > 0 ? 5.0 : 0;
  const grandTotal = subTotal + shippingCost;

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
          {/* Bên trái: Cart Table */}
          <Col md={8} className="cart-items-container">
            <Table responsive bordered className="cart-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Price</th>
                  <th>Quantity</th>

                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="cart-product-details">
                      <img
                        src={item.imageCollection}
                        alt={item.name}
                        className="cart-img"
                      />
                      <div>
                        <p className="cart-name">{item.name}</p>
                        <p className="cart-description">{item.description}</p>
                      </div>
                    </td>
                    <td>${parseFloat(item.price).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        className="cart-quantity-button"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        ➖
                      </Button>
                      <span className="cart-quantity">{item.quantity}</span>
                      <Button
                        variant="outline-success"
                        className="cart-quantity-button"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        ➕
                      </Button>
                    </td>

                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="danger"
                        className="cart-delete-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ❌
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          {/* Bên phải: Tổng tiền + Mã giảm giá */}
          <Col md={4} className="cart-summary-container">
            <Card className="cart-summary-card">
              <Card.Body>
                <h5 className="discount-title">Discount Codes</h5>
                <p className="discount-subtitle">
                  Enter your coupon code if you have one.
                </p>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button variant="dark" className="apply-coupon">
                    Apply Coupon
                  </Button>
                </Form.Group>
                <hr />
                <div className="price-summary">
                  <p>
                    Sub Total <span>${subTotal.toFixed(2)}</span>
                  </p>
                  <p>
                    Shipping <span>${shippingCost.toFixed(2)}</span>
                  </p>
                  <hr />
                  <p className="grand-total">
                    Grand Total <span>${grandTotal.toFixed(2)}</span>
                  </p>
                </div>
                <Button
                  variant="info"
                  className="proceed-checkout"
                  onClick={() => {
                    if (
                      !localStorage.getItem("fullName") &&
                      !localStorage.getItem("email")
                    ) {
                      localStorage.setItem("redirectPath", "/cart");
                      navigate("/login");
                    } else {
                      navigate("/checkout");
                    }
                  }}
                >
                  Proceed To Checkout
                </Button>
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
