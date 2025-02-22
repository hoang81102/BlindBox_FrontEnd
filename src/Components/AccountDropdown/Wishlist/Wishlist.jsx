import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Wishlist.scss";
import { useNavigate } from "react-router-dom";
import Character2 from "../../../Assets/Image/Labubu_NewYearCollection.webp";
import Character3 from "../../../Assets/Image/Labubu2_NewYearCollection.jpg";
import Character4 from "../../../Assets/Image/Labubu3_NewYearCollection.jpg";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Blind Box Anime Figure",
      description: "A random anime figure collectible",
      price: "$29.99",
      image: Character2,
    },
    {
      id: 2,
      name: "Mysterious Toy Capsule",
      description: "A surprise capsule toy",
      price: "$14.99",
      image: Character3,
    },
    {
      id: 3,
      name: "Limited Edition Blind Box",
      description: "Special edition with rare items",
      price: "$49.99",
      image: Character4,
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="wishlist-container container mt-4">
      <h2 className="text-center mb-4">Your Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div key={item.id} className="col-md-4 mb-4">
              <Card className="wishlist-card shadow-sm">
                <Card.Img variant="top" src={item.image} alt={item.name} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <h5 className="text-danger">{item.price}</h5>
                  <Button
                    variant="primary"
                    className="wishlist-view-button"
                    onClick={() => handleNavigate(id)}
                  >
                    View product
                  </Button>
                  <Button
                    variant="danger"
                    className="wishlist-remove-button"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
