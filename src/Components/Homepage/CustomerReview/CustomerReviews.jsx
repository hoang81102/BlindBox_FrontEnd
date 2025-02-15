import { Container, Carousel } from "react-bootstrap";
import "./CustomerReviews.scss";

const CustomerReviews = () => {
  return (
    <Container className="customer-reviews text-center">
      <h2>Customer Reviews</h2>
      <Carousel interval={4000} pause={false} className="reviews-carousel">
        {[...Array(5)].map((_, idx) => (
          <Carousel.Item key={idx}>
            <div className="review-card">
              <p>"Amazing quality and fast shipping!"</p>
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <strong>- Customer {idx + 1}</strong>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CustomerReviews;
