import { ListGroup, Form } from "react-bootstrap";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <aside className="sidebar colorful-sidebar">
      <h3>Categories</h3>
      <ListGroup>
        <ListGroup.Item>All Products</ListGroup.Item>
        <ListGroup.Item>Labubu</ListGroup.Item>
        <ListGroup.Item>Baby Three</ListGroup.Item>
        <ListGroup.Item>Blind Boxes</ListGroup.Item>
        <ListGroup.Item>Price Range</ListGroup.Item>
        <ListGroup.Item>Brands</ListGroup.Item>
      </ListGroup>

      <div className="category-section">
        <h4>Find by Brand</h4>
        <div className="scrollable-list">
          <Form.Check type="checkbox" label="POP MART" />
          <Form.Check type="checkbox" label="ToyCity" />
          <Form.Check type="checkbox" label="Finding Unicorn (F.UN)" />
          <Form.Check type="checkbox" label="Rolife" />
          <Form.Check type="checkbox" label="52TOYS" />
          <Form.Check type="checkbox" label="MJ Studio" />
          <Form.Check type="checkbox" label="CJOY" />
          <Form.Check type="checkbox" label="IP Station" />
          <Form.Check type="checkbox" label="Babythree" />
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
        <h4>Find by Type</h4>
        <div className="scrollable-list">
          <Form.Check type="checkbox" label="Limited Editions" />
          <Form.Check type="checkbox" label="Seasonal" />
          <Form.Check type="checkbox" label="Classic Series" />
          <Form.Check type="checkbox" label="Exclusive Drops" />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
