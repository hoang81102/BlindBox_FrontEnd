import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./LatestCollections.scss";
import Collection1 from "../../../Assets/Image/BlindBoxCollection.avif";
import Collection2 from "../../../Assets/Image/BlindBoxCollection2.jpg";
import Collection3 from "../../../Assets/Image/BlindBoxCollection3.jpg";
import Collection4 from "../../../Assets/Image/BlindBoxCollection4.jpg";

const collections = [
  { id: 1, name: "Mystery Labubu", image: Collection1 },
  { id: 2, name: "ToyCity Special", image: Collection2 },
  { id: 3, name: "Exclusive POP MART", image: Collection3 },
  { id: 4, name: "Limited Edition", image: Collection4 },
];

const LatestCollections = () => {
  return (
    <Container className="latest-collections">
      <h2>Latest Collections</h2>
      <div className="latest-collections-container">
        {collections.map((collection) => (
          <div key={collection.id} className="latest-collection-card">
            <img
              src={collection.image}
              alt={collection.name}
              className="latest-collection-image"
            />
            <h3>{collection.name}</h3>
            <Button className="latest-view-button-btn">View Collection</Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default LatestCollections;
