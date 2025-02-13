import React from "react";
import "./Footer.scss";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-sections">
          <div className="footer-section">
            <h4>About us</h4>
            <p>
              We offer the best blind box collectibles to bring excitement and
              joy to your collection!
            </p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: blindboxsaleswebsite@gmail.com</p>
            <p>Phone: 1800-123-456</p>
            <p>Address: Thu Duc district, Ho Chi Minh city</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li>
                <a href="/">Home Page</a>
              </li>
              <li>
                <a href="/service">Shop</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect with us</h4>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BlindBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
