import React from "react";
import "./Contact.scss";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="title"
      >
        Get in Touch ✨
      </motion.h1>
      <p className="subtitle">
        Have a question? Fill out the form below and we'll get back to you as
        soon as possible! 💌
      </p>

      <form className="contact-form">
        <div className="input-group">
          <input type="text" placeholder="Enter your name" required />
          <input type="email" placeholder="Enter your email" required />
        </div>
        <input type="tel" placeholder="Enter your phone number" required />
        <textarea placeholder="Type your message here..." required></textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="submit-btn"
        >
          Send Message 🚀
        </motion.button>
      </form>

      {/* Contact Info Section */}
      <div className="contact-info">
        <div>
          <FaPhone className="icon" /> <span>+1800-123-456</span>
        </div>
        <div>
          <FaEnvelope className="icon" />{" "}
          <span>blindboxsaleswebsite@gmail.com</span>
        </div>
        <div>
          <FaMapMarkerAlt className="icon" />{" "}
          <span>Thu Duc district, Ho Chi Minh city</span>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-links">
        <a href="#">
          <FaFacebook className="social-icon" />
        </a>
        <a href="#">
          <FaInstagram className="social-icon" />
        </a>
        <a href="#">
          <FaTwitter className="social-icon" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
