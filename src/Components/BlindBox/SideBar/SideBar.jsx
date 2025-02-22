import { ListGroup, Form, Container } from "react-bootstrap";
import "./SideBar.scss";

const SideBar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <Container className="sidebar colorful-sidebar">
      <h3>Categories</h3>
      <ListGroup>
        <ListGroup.Item action onClick={() => scrollToSection("best-sellers")}>
          Best Sellers
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => scrollToSection("feature-product")}
        >
          Feature Products
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => scrollToSection("flash-sale")}>
          Flash Sale
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => scrollToSection("exclusive-deals")}
        >
          Exclusive Deals
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => scrollToSection("latest-collections")}
        >
          Latest Collections
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => scrollToSection("blog-section")}>
          Blog & Guides
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => scrollToSection("lucky-box-game")}
        >
          Lucky Box Game
        </ListGroup.Item>
      </ListGroup>

      <div className="category-section">
        <h4>Status</h4>
        <div className="scrollable-list">
          <Form.Check type="checkbox" label="In Stock" />
        </div>
      </div>

      <div className="category-section">
        <h4>Find by Price</h4>
        <Form.Range min={0} max={100} step={5} />
        <p>Price Range: $0 - $100</p>
      </div>

      <div className="category-section">
        <h4>Find by Collection</h4>
        <div className="scrollable-list">
          <Form.Check type="checkbox" label="Limited Editions" />
          <Form.Check type="checkbox" label="Seasonal" />
          <Form.Check type="checkbox" label="Classic Series" />
          <Form.Check type="checkbox" label="Exclusive Drops" />
        </div>
      </div>

      <div className="category-section">
        <h4>Find by Brand</h4>
        <div className="scrollable-list">
          <Form.Check type="checkbox" label="Limited Editions" />
          <Form.Check type="checkbox" label="Seasonal" />
          <Form.Check type="checkbox" label="Classic Series" />
          <Form.Check type="checkbox" label="Exclusive Drops" />
          <Form.Check type="checkbox" label="Exclusive Drops" />
          <Form.Check type="checkbox" label="Exclusive Drops" />
          <Form.Check type="checkbox" label="Exclusive Drops" />
          <Form.Check type="checkbox" label="Exclusive Drops" />
        </div>
      </div>
    </Container>
  );
};

export default SideBar;
