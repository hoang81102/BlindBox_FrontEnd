import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { CartService } from "../../Services/CartService";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBox,
  FaShoppingCart,
  FaHeart,
  FaGift,
  FaQuestionCircle,
  FaSignOutAlt,
  FaWallet,
} from "react-icons/fa";
import LogoSystem from "../../Assets/Image/LogoSystem.jpg";
//import WelcomeVideo from "../../Assets/Video/Animation_Hello1.webm";
import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const { cart, clearCart } = useContext(CartService);
  const cartCount = cart.length;

  useEffect(() => {
    const role = localStorage.getItem("role");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const fullName = localStorage.getItem("fullName");
    if (role && firstName) {
      setUser({ username: `${fullName}`, role });
    }

    const handleScroll = () => setScrolling(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    clearCart();
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${scrolling ? "scrolled" : ""}`}
    >
      <Container className="d-flex flex-column">
        {/* 🟢 Hàng 1: Logo - Hotline - Thông tin user */}
        <Row
          className={`align-items-center top-header ${
            scrolling ? "hidden" : ""
          }`}
        >
          {/*Hotline*/}
          <Col xs={3} md={3} className="d-flex justify-content-start">
            <div className="hotline">Hotline: 1800-123-456</div>
          </Col>

          {/*Logo*/}
          <Col xs={6} md={6} className="d-flex justify-content-center">
            <Navbar.Brand href="/">
              <img src={LogoSystem} className="header-logo-image" alt="Logo" />
            </Navbar.Brand>
          </Col>

          {/*Thông tin user */}
          <Col
            xs={3}
            md={3}
            className="d-flex justify-content-end auth-cart-section"
          >
            {user ? (
              <>
                {/* <video
                  src={WelcomeVideo}
                  autoPlay
                  muted
                  loop
                  className="welcome-hello-video"
                ></video> */}
                <span className="welcome-text">{user.username}</span>

                <NavLink to="/cart" className="cart-link">
                  <div className="cart-icon-container">
                    <FaShoppingCart />
                    {cartCount > 0 && (
                      <span className="cart-count">{cartCount}</span>
                    )}
                  </div>
                </NavLink>

                <NavDropdown
                  title="Account"
                  id="account-dropdown"
                  align="end"
                  data-bs-theme="light"
                >
                  <NavDropdown.Item href="/profile">
                    <FaUser style={{ marginRight: "8px" }} /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/wallet">
                    <FaWallet style={{ marginRight: "8px" }} /> Wallet
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/order-history">
                    <FaBox style={{ marginRight: "8px" }} /> Order History
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/wishlist">
                    <FaHeart style={{ marginRight: "8px" }} /> Wishlist
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/voucher">
                    <FaGift style={{ marginRight: "8px" }} /> Voucher
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item href="/contact">
                    <FaQuestionCircle style={{ marginRight: "8px" }} /> Help &
                    Support
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt
                      style={{ marginRight: "8px", color: "red" }}
                    />{" "}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink to="/login" className="auth-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="auth-link">
                  Register
                </NavLink>
                <NavLink to="/cart" className="cart-link">
                  <div className="cart-icon-container">
                    <FaShoppingCart />
                    {cartCount > 0 && (
                      <span className="cart-count">{cartCount}</span>
                    )}
                  </div>
                </NavLink>
              </>
            )}
          </Col>
        </Row>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* 🔵 Hàng 2: Navigation Menu + Search */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Row className={`bottom-header ${scrolling ? "fixed-nav" : ""}`}>
            <Col className="d-flex justify-content-center">
              {/*Navigation Menu */}
              <Nav className="navbar-nav">
                <NavLink to="/home" className="nav-item">
                  Home
                </NavLink>
                <NavLink to="/about" className="nav-item">
                  About
                </NavLink>
                <NavLink to="/luckyWheel" className="nav-item">
                  Lucky Wheel
                </NavLink>
                <NavLink to="/" className="nav-item">
                  Blind Box
                </NavLink>
                <NavLink to="/faqs" className="nav-item">
                  FAQS
                </NavLink>
                <NavLink to="/contact" className="nav-item">
                  Contact
                </NavLink>
              </Nav>
            </Col>

            {/*Search*/}
            <Col className="search-container">
              <Form className="search-form d-flex">
                <FormControl
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                />
                <Button className="search-button">Search</Button>
              </Form>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
