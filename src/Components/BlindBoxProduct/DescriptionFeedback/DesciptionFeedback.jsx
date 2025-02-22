import React, { useState } from "react";
import avatar1 from "../../../Assets/Image/avatarTest.jpg";
import avatar2 from "../../../Assets/Image/avatarTest2.jpeg";
import { Row, Col, Nav } from "react-bootstrap";
import "./DescriptionFeedback.scss";
const DesciptionFeedback = () => {
  const [activeTab, setActiveTab] = useState("description");
  return (
    <Row className="product-tabs">
      <Col>
        <Nav variant="tabs" defaultActiveKey="description">
          <Nav.Item>
            <Nav.Link
              eventKey="description"
              onClick={() => setActiveTab("description")}
            >
              Description
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="reviews"
              onClick={() => setActiveTab("reviews")}
            >
              Customer Reviews
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === "description" && (
          <div className="tab-content">
            <h3>Product Description</h3>
            <p>
              <strong>Brand:</strong> POPMART
            </p>
            <p>
              <strong>Size: </strong> 7~9cm
            </p>
            <p>
              <strong>Material: </strong> ABS/PVC
            </p>
            <p>
              <strong>Recommended Age: </strong> 15+
            </p>
            <p>
              <strong>Please note:</strong> These products are called "Blind
              boxes" - you will not be able to choose which model you will
              receive. You won't know what you get until you open it. Surprise
              will be an indispensable spice to make the game more interesting.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="tab-content">
            <h3>Customer Reviews</h3>
            <div className="feedback-item">
              <img src={avatar1} alt="Customer Avatar" className="avatar" />
              <div className="feedback-content">
                <span className="customer-name">Do Minh Quang</span>
                <div className="rating"></div>
                <p className="comment">
                  "The product is very beautiful and cute!"
                </p>
              </div>
            </div>

            <div className="feedback-item">
              <img src={avatar2} alt="Customer Avatar" className="avatar" />
              <div className="feedback-content">
                <span className="customer-name">Nguyen Son Tung</span>
                <div className="rating"></div>
                <p className="comment">"Good quality, fast delivery."</p>
              </div>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default DesciptionFeedback;
