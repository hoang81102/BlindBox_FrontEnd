import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./BlogSection.scss";
import Blog1 from "../../../Assets/Image/BlindBoxCollection4.jpg";
import Blog2 from "../../../Assets/Image/BlindBoxCollection5.jpg";
import Blog3 from "../../../Assets/Image/BlindBoxCollection6.jpg";

const blogPosts = [
  {
    id: 1,
    title: "How to Start Your Blind Box Collection",
    image: Blog1,
    excerpt:
      "Discover the essential tips and tricks for starting your Blind Box collection.",
  },
  {
    id: 2,
    title: "Top 5 Rare Blind Box Figures You Need",
    image: Blog2,
    excerpt:
      "Check out the rarest and most valuable Blind Box figures you can own.",
  },
  {
    id: 3,
    title: "The Excitement of Blind Box Unboxing",
    image: Blog3,
    excerpt:
      "Experience the thrill of opening a Blind Box and revealing your surprise!",
  },
];

const BlogSection = () => {
  return (
    <section className="blog-section">
      <Container>
        <h2>Latest Blog & Collecting Guides</h2>
        <Row>
          {blogPosts.map((post) => (
            <Col md={4} key={post.id}>
              <Card className="blog-card">
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.excerpt}</Card.Text>
                  <Button variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BlogSection;
