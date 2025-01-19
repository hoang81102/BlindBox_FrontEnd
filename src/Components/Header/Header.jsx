import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LabubuLogo from "../../Assets/Image/Labubu_Logo.jpg";
import LabubuIconWelcome from "../../Assets/Image/Labubu_icon_welcome.avif";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = null;

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <div className="main-header">
          <Navbar.Brand href="/">
            <div className="logo-container">
              <img
                src={LabubuLogo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </div>
          </Navbar.Brand>

          <Form className="search-form">
            <FormControl
              type="text"
              placeholder="Search products..."
              className="mr-sm-2 search-input"
            />
            <Button variant="outline-light" className="search-button">
              Search
            </Button>
          </Form>

          <div className="auth-cart-section">
            {user ? (
              <span className="nav-link">
                <img src={LabubuIconWelcome} alt="Welcome" className="icon" />
                Welcome Quang
              </span>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </>
            )}

            <div className="cart-section">
              <NavLink to="/cart" className="nav-link">
                <FaShoppingCart className="cart-icon" />
              </NavLink>
            </div>
          </div>
        </div>

        <Navbar.Collapse id="basic-navbar-nav" className="nav-section">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
