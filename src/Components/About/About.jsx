import React from "react";
import "./About.scss";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaGift,
  FaSmile,
  FaShoppingCart,
  FaShippingFast,
  FaBox,
  FaUsers,
  FaBuilding,
  FaBlog,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import blindBoxImage from "../../Assets/Image/BlindBoxCollection.avif";
import surpriseBoxImage from "../../Assets/Image/BlindBoxCollection2.jpg";

const About = () => {
  return (
    <div className="about-us-container container py-5">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-3"
      >
        Welcome to Mystic Blind Box!
      </motion.h1>
      <p className="about-us-subtitle text-center text-muted">
        Discover the thrill of surprise with our exclusive collections.
      </p>

      <div className="row justify-content-center mt-4">
        <motion.div
          className="col-md-4 feature-card card p-4 shadow-sm"
          whileHover={{ scale: 1.05 }}
        >
          <FaBoxOpen className="icon mb-3 text-primary" />
          <h3>Exclusive Collections</h3>
          <p>Get your hands on rare and unique blind boxes.</p>
        </motion.div>

        <motion.div
          className="col-md-4 feature-card card p-4 shadow-sm mx-3"
          whileHover={{ scale: 1.05 }}
        >
          <FaGift className="icon mb-3 text-danger" />
          <h3>Perfect Gifts</h3>
          <p>Surprise your loved ones with mystery and joy.</p>
        </motion.div>

        <motion.div
          className="col-md-4 feature-card card p-4 shadow-sm"
          whileHover={{ scale: 1.05 }}
        >
          <FaSmile className="icon mb-3 text-warning" />
          <h3>100% Fun Guaranteed</h3>
          <p>Experience the excitement of opening every box.</p>
        </motion.div>
      </div>

      <div className="about-us-info mt-5 p-4 bg-light rounded shadow">
        <h2>About Our Business</h2>
        <p>
          Blind Box World was founded with a passion for surprise and
          collectibles. We aim to bring joy to collectors and enthusiasts
          worldwide.
        </p>

        <h2>Our Customers</h2>
        <p>
          We serve collectors, gift buyers, and surprise lovers looking for
          unique and exciting mystery items.
        </p>

        <h2>How It Works</h2>
        <p>Our blind box system operates in a simple and exciting way:</p>
        <ul>
          <li>
            <FaShoppingCart className="icon text-success" /> Choose your
            favorite blind box collection.
          </li>
          <li>
            <FaShippingFast className="icon text-info" /> We carefully package
            and ship your surprise.
          </li>
          <li>
            <FaBox className="icon text-primary" /> Open your blind box and
            enjoy the thrill!
          </li>
        </ul>
      </div>

      <div className="about-us-team mt-5 p-4 bg-dark text-white rounded shadow">
        <h2>Meet Our Team</h2>
        <p>
          Our dedicated team of passionate individuals works tirelessly to bring
          you the best blind box experience.
        </p>
        <FaUsers className="icon mb-3" />
      </div>

      <div className="about-us-content mt-5 p-4 bg-secondary text-white rounded shadow">
        <h2>Explore More</h2>
        <p>
          Check out our blog for the latest updates and stories behind our
          collections.
        </p>
        <FaBlog className="icon mb-3" />
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <motion.img
            src={blindBoxImage}
            alt="Blind Box Collection"
            className="img-fluid rounded shadow"
            whileHover={{ scale: 1.05 }}
          />
        </div>
        <div className="col-md-6">
          <motion.img
            src={surpriseBoxImage}
            alt="Surprise Box"
            className="img-fluid rounded shadow"
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
