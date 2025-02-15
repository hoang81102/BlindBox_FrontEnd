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
import { CartContext } from "../Cart/CartContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import LogoSystem from "../../Assets/Image/LogoSystem.jpg";
import WelcomeVideo from "../../Assets/Video/Animation_Hello1.webm";
import "./Header.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const { cart } = useContext(CartContext);
  const cartCount = cart.length;

  useEffect(() => {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    if (role && username) {
      setUser({ username });
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
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
          <Col xs={3} md={3} className="d-flex justify-content-start">
            <div className="hotline">Hotline: 1800-123-456</div>
          </Col>

          <Col xs={6} md={6} className="d-flex justify-content-center">
            <Navbar.Brand href="/">
              <img src={LogoSystem} className="logo-image" alt="Logo" />
            </Navbar.Brand>
          </Col>

          <Col
            xs={3}
            md={3}
            className="d-flex justify-content-end auth-cart-section"
          >
            {user ? (
              <>
                <video
                  src={WelcomeVideo}
                  autoPlay
                  muted
                  loop
                  className="welcome-video"
                ></video>
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
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/payment-history">
                    Payment History
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
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

        {/* 🔵 Hàng 2: Navigation Menu + Search */}
        <Row className={`bottom-header ${scrolling ? "fixed-nav" : ""}`}>
          <Col className="d-flex justify-content-center">
            <Nav className="navbar-nav">
              <NavLink to="/" className="nav-item">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-item">
                About
              </NavLink>

              {/* SHOP DROPDOWN */}
              <NavDropdown
                title="Shop"
                id="shop-dropdown"
                className="nav-dropdown"
                onMouseEnter={(e) => e.currentTarget.classList.add("show")}
                onMouseLeave={(e) => e.currentTarget.classList.remove("show")}
              >
                <NavDropdown.Item href="/shop/category1">
                  Category 1
                </NavDropdown.Item>
                <NavDropdown.Item href="/shop/category2">
                  Category 2
                </NavDropdown.Item>
              </NavDropdown>

              {/* PRODUCT DROPDOWN */}
              <NavDropdown
                title="Product"
                id="product-dropdown"
                className="nav-dropdown"
                onMouseEnter={(e) => e.currentTarget.classList.add("show")}
                onMouseLeave={(e) => e.currentTarget.classList.remove("show")}
              >
                <NavDropdown.Item href="/product/new">
                  New Arrivals
                </NavDropdown.Item>
                <NavDropdown.Item href="/product/best-sellers">
                  Best Sellers
                </NavDropdown.Item>
              </NavDropdown>

              <NavLink to="/contact" className="nav-item">
                Contact
              </NavLink>
              <NavLink to="/faqs" className="nav-item">
                FAQS
              </NavLink>
            </Nav>
          </Col>

          {/* 🟡 Ô tìm kiếm mới */}
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
      </Container>
    </Navbar>
  );
};

export default Header;
