import { useContext, useState, useEffect } from "react";
import { CartService } from "../../../Services/CartService";
import { getBlindBoxDetails } from "../../../Services/BlindBoxService";
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
import CollectionImage from "../../../Assets/Image/BlindBoxCollection7.avif";
import "./CartPage.scss";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartService);
  const navigate = useNavigate();
  const [cartDetails, setCartDetails] = useState([]);
  const [coupon, setCoupon] = useState("");
  const userId = localStorage.getItem("userId");

  const subTotal = cartDetails.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
    0
  );
  const grandTotal = subTotal;

  useEffect(() => {
    if (!cart.length) return;
    const fetchBlindBoxDetails = async () => {
      const updatedCart = await Promise.all(
        cart.map(async (item) => {
          if (!item.blindBoxId) return item;
          try {
            const response = await getBlindBoxDetails(item.blindBoxId);
            return { ...item, ...response };
          } catch (error) {
            console.error(
              `Error fetching blind box ${item.blindBoxId}:`,
              error
            );
            return item;
          }
        })
      );
      setCartDetails(updatedCart);
    };
    fetchBlindBoxDetails();
  }, [cart]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container className="cart-page-container">
      <div className="cart-title-container">
        <video
          src={CartAnimation}
          autoPlay
          muted
          loop
          className="cart-icon-video"
        />
        <h2 className="cart-title">Your Cart Is Here !!!</h2>
      </div>

      {cart.length ? (
        <Row className="cart-content">
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
                {cartDetails.map((item) => (
                  <tr key={item.cartId}>
                    <td className="cart-product-details">
                      <img
                        src={CollectionImage}
                        alt={item.blindBoxName}
                        className="cart-img"
                      />
                      <div>
                        <p className="cart-name">{item.blindBoxName}</p>
                        <p className="cart-description">{item.description}</p>
                      </div>
                    </td>
                    <td>${parseFloat(item.price).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        className="cart-quantity-button"
                        onClick={() => decreaseQuantity(item.cartId, userId)}
                      >
                        {" "}
                        -{" "}
                      </Button>
                      <span className="cart-quantity">{item.quantity}</span>
                      <Button
                        variant="outline-success"
                        className="cart-quantity-button"
                        onClick={() => increaseQuantity(item.cartId, userId)}
                      >
                        {" "}
                        +{" "}
                      </Button>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="danger"
                        className="cart-delete-button"
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        {" "}
                        ❌{" "}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col md={4} className="cart-summary-container">
            <Card className="cart-summary-card">
              <Card.Body>
                {/* <h5 className="shipping-title">Shipping Offer</h5>
                {subTotal >= 500 ? (
                  <p className="free-shipping">
                    Congrats! You got Free Shipping!
                  </p>
                ) : (
                  <p className="spend-more">
                    Spend ${(500 - subTotal).toFixed(2)} more to get Free
                    Shipping!
                  </p>
                )}

                <hr /> */}

                <div className="support-section">
                  <h5>Need Help?</h5>
                  <p>Contact our support team or check the FAQ.</p>
                  <Button variant="info" onClick={() => navigate("/faq")}>
                    Visit FAQ
                  </Button>
                </div>
                <hr />
                <div className="price-summary">
                  <p>
                    Sub Total <span>${subTotal.toFixed(2)}</span>
                  </p>
                  <hr />
                  <p className="grand-total">
                    Grand Total <span>${grandTotal.toFixed(2)}</span>
                  </p>
                </div>
                <Button
                  variant="info"
                  className="proceed-checkout"
                  onClick={handleCheckout}
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
