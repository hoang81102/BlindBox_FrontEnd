import React, { useState, useEffect } from "react";
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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LabubuLogo from "../../Assets/Image/Labubu_Logo.jpg";
import LabubuIconWelcome from "../../Assets/Image/Labubu_icon_welcome.avif";
import { FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    if (role && username) {
      setUser({ username });
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container className="d-flex flex-column">
        {/* 🟢 Hàng 1: Logo - Tìm kiếm - Thông tin user */}
        <Row className="align-items-center top-header">
          <Col xs={2} md={2} className="d-flex justify-content-start">
            <Navbar.Brand href="/">
              <img src={LabubuLogo} className="logo-image" alt="Logo" />
            </Navbar.Brand>
          </Col>

          <Col xs={6} md={6} className="d-flex justify-content-center">
            <Form className="search-form d-flex">
              <FormControl
                type="text"
                placeholder="Search products..."
                className="search-input"
              />
              <Button className="search-button">Search</Button>
            </Form>
          </Col>

          <Col
            xs={4}
            md={4}
            className="d-flex justify-content-end auth-cart-section"
          >
            {user ? (
              <>
                <span className="welcome-text">
                  <img
                    src={LabubuIconWelcome}
                    alt="Welcome"
                    className="welcome-icon"
                  />
                  {user.username}
                </span>
                <NavLink to="/cart" className="cart-link">
                  <FaShoppingCart />
                </NavLink>
                <NavDropdown title="Account" id="account-dropdown" align="end">
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
                  <FaShoppingCart />
                </NavLink>
              </>
            )}
          </Col>
        </Row>

        {/* 🔵 Hàng 2: Navigation Menu */}
        <Row className="bottom-header">
          <Col className="d-flex justify-content-center">
            <Nav className="navbar-nav">
              <NavLink to="/" className="nav-item">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-item">
                About
              </NavLink>
              <NavLink to="/shop" className="nav-item">
                Shop
              </NavLink>
              <NavLink to="/contact" className="nav-item">
                Contact
              </NavLink>
              <NavLink to="/product" className="nav-item">
                Product
              </NavLink>
              <NavLink to="/news" className="nav-item">
                News
              </NavLink>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
