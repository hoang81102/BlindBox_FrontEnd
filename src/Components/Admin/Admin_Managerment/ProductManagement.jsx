import React, { useState, useMemo } from "react";
import {
  Table,
  Form,
  Button,
  Pagination,
  Image,
  InputGroup,
} from "react-bootstrap";
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { format } from "date-fns";

const ProductManagement = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Labubu The Fairy House Blind Box",
      image: "https://example.com/images/labubu_the_fairy_house.jpg",
      price: 15.99,
      quantity: 100,
      releaseDate: "2024-02-01",
    },
    {
      id: 2,
      name: "Doraemon Secret Gadgets Blind Box",
      image: "https://example.com/images/doraemon_secret_gadgets.jpg",
      price: 20.99,
      quantity: 50,
      releaseDate: "2024-02-10",
    },
    {
      id: 3,
      name: "One Piece Sweet Dreams Blind Box",
      image: "https://example.com/images/one_piece_sweet_dreams.jpg",
      price: 25.99,
      quantity: 30,
      releaseDate: "2024-03-01",
    },
    {
      id: 4,
      name: "Baby Three V3 Animal Party Blind Box",
      image: "https://example.com/images/baby_three_v3_animal_party.jpg",
      price: 18.99,
      quantity: 80,
      releaseDate: "2024-03-15",
    },
    {
      id: 5,
      name: "Nommi V3 Fruit Series Blind Box",
      image: "https://example.com/images/nommi_v3_fruit_series.jpg",
      price: 22.99,
      quantity: 60,
      releaseDate: "2024-04-01",
    },
  ];

  const [products] = useState(initialProducts);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSortButton = () => {
    setSortConfig((prev) => ({
      key: "name",
      direction:
        prev.key === "name" && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
    setCurrentPage(1);
  };

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (!sortConfig.key) return 0;
      return sortConfig.direction === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }, [products, sortConfig]);

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedProducts, searchTerm]);

  const resetFilters = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfLastItem - itemsPerPage,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div
      className="container px-5 pt-5"
      style={{ marginLeft: "235px", marginTop: "60px" }}
    >
      <h3>Product Management</h3>
      <div className="row mb-4 align-items-center pt-3">
        <div className="col-md-6">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-3 mt-2 mt-md-0">
          <Button
            variant="primary"
            onClick={handleSortButton}
            className="w-100"
          >
            Sắp xếp{" "}
            {sortConfig.key === "name" &&
              (sortConfig.direction === "ascending" ? (
                <FaArrowUp className="ms-2" />
              ) : (
                <FaArrowDown className="ms-2" />
              ))}
          </Button>
        </div>
        <div className="col-md-3 mt-2 mt-md-0 text-md-end">
          <Button onClick={resetFilters} variant="primary" className="w-100">
            Reset Filters
          </Button>
        </div>
      </div>
      <Table striped bordered hover responsive className="rounded">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Ngày phát hành</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{format(new Date(product.releaseDate), "MMM dd, yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4 d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
