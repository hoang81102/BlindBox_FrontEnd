import { Container, Row, Col, Button } from "react-bootstrap";
import { React, useState, useContext } from "react";
import { CartContext } from "../../Cart/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NewYearCollection from "../../../Assets/Image/Labubu_NewYearCollection.png";
import LabubuSlider1 from "../../../Assets/Image/Labubu1_ImageSlider.jpg";
import "./FeatureProduct.scss";
const FeatureProduct = () => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const totalProducts = 60;
  const productList = [...Array(totalProducts)].map((_, idx) => ({
    id: idx + 1,
    name: `Product ${idx + 1}`,
    price: (19.99 + idx * 5).toFixed(2),
    imageCollection: NewYearCollection,
    imageItem: LabubuSlider1,
  }));
  const navigate = useNavigate();
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleNavigate = (productId) => {
    navigate(`/products/${productId}`);
  };

  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  const offset = currentPage * itemsPerPage;
  const currentProducts = productList.slice(offset, offset + itemsPerPage);

  return (
    <Container className="featured-products">
      <h2 className="text-center">Featured Products</h2>
      <Row>
        {currentProducts.map((product) => {
          const [isHovered, setIsHovered] = useState(false);
          return (
            <Col
              md={4}
              className="product-card hover-effect colorful-card"
              key={product.id}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={isHovered ? product.imageItem : product.imageCollection}
                  alt={product.name}
                />
                <div className={`button-group ${isHovered ? "show" : ""}`}>
                  <Button
                    variant="primary"
                    className="view-button"
                    onClick={() => handleNavigate(product.id)}
                  >
                    View product
                  </Button>
                  <Button
                    variant="success"
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">${product.price}</p>
            </Col>
          );
        })}
      </Row>

      {/* Pagination Controls */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={Math.ceil(totalProducts / itemsPerPage)}
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
