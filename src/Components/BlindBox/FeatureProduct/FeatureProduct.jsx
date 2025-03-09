import { Container, Row, Col, Button } from "react-bootstrap";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NewYearCollection from "../../../Assets/Image/Labubu_NewYearCollection.png";
import LabubuSlider1 from "../../../Assets/Image/Labubu1_ImageSlider.jpg";
import "./FeatureProduct.scss";
import { fetchBlindBoxes } from "../../../Services/BlindBoxService";

const FeatureProduct = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadBlindBoxes(currentPage);
  }, [currentPage]);

  const loadBlindBoxes = async (page) => {
    setLoading(true);
    try {
      const data = await fetchBlindBoxes(page + 1, itemsPerPage);
      setProducts(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error loading Blind Boxes", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleNavigate = (blindBoxId) => {
    navigate(`/products/${blindBoxId}`);
  };

  return (
    <Container className="featured-products">
      <h2 className="text-center">Featured Products</h2>

      {loading ? (
        <p className="text-waiting">Loading product...</p>
      ) : (
        <Row>
          {products.map((product) => {
            const isHovered = hoveredProductId === product.blindBoxId;

            return (
              <Col
                md={4}
                className="product-card hover-effect colorful-card"
                key={product.blindBoxId}
                onMouseEnter={() => setHoveredProductId(product.blindBoxId)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <div className="product-image-container">
                  <img
                    className="product-image"
                    src={isHovered ? LabubuSlider1 : NewYearCollection}
                    alt={product.blindBoxName}
                  />
                  <div className={`button-group ${isHovered ? "show" : ""}`}>
                    <Button
                      variant="primary"
                      className="view-button"
                      onClick={() => handleNavigate(product.blindBoxId)}
                    >
                      View product
                    </Button>
                  </div>
                </div>
                <h3 className="product-title">{product.blindBoxName}</h3>
                <p className="product-price">
                  {product.price.toLocaleString()} VND
                </p>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Pagination Controls */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName={"prev-button"}
        nextClassName={"next-button"}
      />
    </Container>
  );
};

export default FeatureProduct;
