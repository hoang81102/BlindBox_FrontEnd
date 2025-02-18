import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import BlindBoxCollection1 from "../../Assets/Image/BlindBoxCollection.avif";
import BlindBoxCollection2 from "../../Assets/Image/BlindBoxCollection2.jpg";
import BlindBoxCollection3 from "../../Assets/Image/BlindBoxCollection3.jpg";
import BlindBoxCollection4 from "../../Assets/Image/BlindBoxCollection4.jpg";
const HomePage = () => {
  const navigate = useNavigate();
  const handleNavigateBlindBox = () => {
    navigate("/");
  };
  const handleNavigateLuckyWheel = () => {
    navigate("/luckyWheel");
  };
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-page-hero-section">
        <div className="container text-center py-5">
          <h1 className="display-4 text-white">
            Welcome to the Mystic Blind Box!
          </h1>
          <p className="lead text-white">
            Unlock surprise boxes filled with amazing products! Shop now and
            discover what awaits you.
          </p>
          <button
            className="btn btn-warning btn-lg"
            onClick={handleNavigateBlindBox}
          >
            Start Shopping
          </button>
        </div>
      </section>

      {/* Exclusive Deal Section */}
      <section className="home-page-exclusive-deal py-5">
        <div className="container text-center">
          <h2 className="mb-4 text-danger">Exclusive Deals of the Day</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="home-page-deal-card p-3">
                <h3>Limited Stock</h3>
                <p>
                  Hurry up! Get your hands on the latest blind boxes with
                  exclusive discounts.
                </p>
                <button className="btn home-page-btn-danger">Grab Now</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="home-page-deal-card p-3">
                <h3>Daily Special</h3>
                <p>
                  New surprise items available today! Don't miss out on these
                  limited edition boxes.
                </p>
                <button className="btn home-page-btn-danger">
                  Explore More
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="home-page-deal-card p-3">
                <h3>Flash Sale</h3>
                <p>
                  24-hour flash sale! Get your box before the timer runs out!
                  Take your time before our flash sale is end !
                </p>
                <button className="btn home-page-btn-danger">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Collections Section */}
      <section className="home-page-new-collections py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">Check Out Our Latest Collections</h2>
          <div className="row">
            <div className="col-md-3">
              <div className="home-page-collection-card">
                <img
                  src={BlindBoxCollection1}
                  alt="Collection 1"
                  className="img-fluid"
                />
                <h4>Collection 1</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="home-page-collection-card">
                <img
                  src={BlindBoxCollection2}
                  alt="Collection 2"
                  className="img-fluid"
                />
                <h4>Collection 2</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="home-page-collection-card">
                <img
                  src={BlindBoxCollection3}
                  alt="Collection 3"
                  className="img-fluid"
                />
                <h4>Collection 3</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="home-page-collection-card">
                <img
                  src={BlindBoxCollection4}
                  alt="Collection 4"
                  className="img-fluid"
                />
                <h4>Collection 4</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini-Game Section */}
      <section className="home-page-mini-game py-5">
        <div className="container text-center">
          <h2 className="mb-4">Play the Lucky Wheel Game!</h2>
          <p>Spin the wheel and win amazing discounts or even a free box!</p>
          <button
            className="btn home-page-btn-success btn-lg"
            onClick={handleNavigateLuckyWheel}
          >
            Spin the Wheel
          </button>
        </div>
      </section>

      {/* Blog Section */}
      <section className="home-page-blog py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">Latest Blog Posts</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="home-page-blog-card">
                <h4>How to Collect Blind Boxes Like a Pro</h4>
                <p>
                  Learn the best tips and tricks for maximizing your blind box
                  collection.
                </p>
                <button className="btn home-page-btn-info">Read More</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="home-page-blog-card">
                <h4>Top 10 Blind Boxes You Must Have</h4>
                <p>
                  Check out our top 10 list of blind boxes that are guaranteed
                  to impress!
                </p>
                <button className="btn home-page-btn-info">Read More</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="home-page-blog-card">
                <h4>How We Curate Our Mystic Blind Boxes</h4>
                <p>
                  Discover how we carefully select the best items for our blind
                  boxes.
                </p>
                <button className="btn home-page-btn-info">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
