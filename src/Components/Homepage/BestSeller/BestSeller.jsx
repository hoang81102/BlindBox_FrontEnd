import { Row, Col, Container, Carousel } from "react-bootstrap";
import "./BestSeller.scss";
import LabubuVideo from "../../../Assets/Video/LoginVideo.mp4";
import LabubuSlider1 from "../../../Assets/Image/Labubu1_ImageSlider.jpg";
import LabubuSlider2 from "../../../Assets/Image/Labubu2_ImageSlider.jpg";
import LabubuSlider3 from "../../../Assets/Image/Labubu3_ImageSlider.jpg";
import LabubuSlider4 from "../../../Assets/Image/Labubu4_ImageSlider.jpg";
import LabubuSlider5 from "../../../Assets/Image/Labubu5_ImageSlider.jpg";
const BestSeller = () => {
  return (
    <Container className="best-sellers text-center">
      <h2>Best Sellers</h2>
      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <video
            src={LabubuVideo}
            autoPlay
            muted
            loop
            className="best-sellers-video"
          ></video>
        </Col>
        <Col md={6} className="text-center">
          <Carousel
            interval={3000}
            pause={false}
            className="best-sellers-carousel"
          >
            <Carousel.Item>
              <img
                className="d-block w-100 product-image"
                src={LabubuSlider1}
                alt="Labubu"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 product-image"
                src={LabubuSlider2}
                alt="Baby Three"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 product-image"
                src={LabubuSlider3}
                alt="Blind Box"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 product-image"
                src={LabubuSlider4}
                alt="Labubu"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 product-image"
                src={LabubuSlider5}
                alt="Labubu"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default BestSeller;
