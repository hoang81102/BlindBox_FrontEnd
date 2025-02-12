import { Container, Row, Col, Button } from "react-bootstrap";
import "animate.css";

const Homepage = () => {
  return (
    <section
      className="py-5 overflow-hidden bg-top bg-size-100"
      style={{
        backgroundImage: "url('/src/Assets/Image/pic2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="d-flex flex-column gap-4">
            {/* Title */}
            <div>
              <p
                className="animate__animated animate__fadeInUp fw-semibold fs-1"
                style={{
                  backgroundImage:
                    "linear-gradient(to right,rgb(79, 117, 240) , #f55f8d , rgb(79, 117, 240))",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                We are the Best Choice
              </p>
              <h2 className="animate__animated animate__fadeInUp animate__delay-1s fw-bolder display-5 text-dark">
                Are you looking to buy a blind box?
              </h2>
            </div>

            {/* Description */}
            <p className="animate__animated animate__fadeInUp animate__delay-2s fs-5 mb-0">
              We offer products with many designs to suit you.
            </p>

            {/* Features List */}
            <ul className="animate__animated animate__fadeInUp animate__delay-3s list-unstyled ">
              <li className="d-flex align-items-center gap-2 mb-2">
                <i className="las la-check bg-gradient text-white rounded-circle d-flex justify-content-center align-items-center fs-4 p-2"></i>
                <span className="fs-5">Reasonable price</span>
              </li>
              <li className="d-flex align-items-center gap-2 mb-2">
                <i className="las la-check bg-gradient text-white rounded-circle d-flex justify-content-center align-items-center fs-4 p-2"></i>
                <span className="fs-5">Genuine</span>
              </li>
            </ul>

            {/* Button */}
            <Button
              variant="dark"
              className=" animate__animated animate__fadeInUp animate__delay-3s text-uppercase fw-medium py-3 px-4 rounded-pill text-white"
              style={{
                width: "35%",
                backgroundImage:
                  "linear-gradient(to right, #f55f8d ,rgb(79, 117, 240) , #f55f8d)",
                backgroundSize: "200%",
                transition: "background-position 0.5s ease-in-out",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundPosition = "right center")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundPosition = "left center")
              }
            >
              GET STARTED
            </Button>
          </Col>

          {/* Image Section */}
          <Col md={6} className="text-center">
            <div className="animate__animated animate__fadeInUp animate__delay-3s w-100 ms-5">
              <img
                src="/src/Assets/Image/pic3_1.png"
                alt="Freelance Product Designer"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Homepage;
