import React from "react";
import "./SortOptions.scss";
import { Container } from "react-bootstrap";

const SortOptions = ({ setSortOption }) => {
  return (
    <Container className="sort-options-container">
      <span className="sort-options-label">Sort by:</span>
      <label>
        <input
          type="radio"
          name="sort-options"
          value="name-asc"
          onChange={(e) => setSortOption(e.target.value)}
          defaultChecked
        />
        Name: A-Z
      </label>
      <label>
        <input
          type="radio"
          name="sort-options"
          value="name-desc"
          onChange={(e) => setSortOption(e.target.value)}
        />
        Name: Z-A
      </label>
      <label>
        <input
          type="radio"
          name="sort-options"
          value="newest"
          onChange={(e) => setSortOption(e.target.value)}
        />
        New Blind Box
      </label>
      <label>
        <input
          type="radio"
          name="sort-options"
          value="price-asc"
          onChange={(e) => setSortOption(e.target.value)}
        />
        Price: Low to High
      </label>
      <label>
        <input
          type="radio"
          name="sort-options"
          value="price-desc"
          onChange={(e) => setSortOption(e.target.value)}
        />
        Price: High to Low
      </label>
    </Container>
  );
};

export default SortOptions;
