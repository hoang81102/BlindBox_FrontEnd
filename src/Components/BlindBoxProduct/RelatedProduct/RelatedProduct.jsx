import React from "react";
import "./RelatedProduct.scss";
import { Row, Col, Image } from "react-bootstrap";
import Character2 from "../../../Assets/Image/Labubu_NewYearCollection.webp";
import Character3 from "../../../Assets/Image/Labubu2_NewYearCollection.jpg";
import Character4 from "../../../Assets/Image/Labubu3_NewYearCollection.jpg";
import Character5 from "../../../Assets/Image/Labubu4_ImageSlider.jpg";
const RelatedProduct = () => {
  const relatedProducts = [Character2, Character3, Character4, Character5];
  return (
    <Row className="related-products">
      <Col>
        <h3>Related products</h3>
        <div className="related-products-list">
          {relatedProducts.map((product, index) => (
            <Image
              key={index}
              src={product}
              thumbnail
              className="related-product-image"
            />
          ))}
        </div>
      </Col>
    </Row>
  );
};
export default RelatedProduct;
