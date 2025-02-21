import React, { useState, useMemo } from "react";
import {
  Table,
  Form,
  Button,
  Pagination,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./Admin_Managerment.scss";

const sampleCategories = [
  {
    _id: "1",
    name: "Technology",
    description: "Courses related to technology and IT.",
    totalCourses: 10,
    popularity: 5000,
  },
  {
    _id: "2",
    name: "Business",
    description: "Courses related to business and management.",
    totalCourses: 8,
    popularity: 4000,
  },
  {
    _id: "3",
    name: "Art",
    description: "Courses related to art and design.",
    totalCourses: 12,
    popularity: 6000,
  },
  {
    _id: "4",
    name: "Science",
    description: "Courses related to science and research.",
    totalCourses: 15,
    popularity: 7500,
  },
  {
    _id: "5",
    name: "Health",
    description: "Courses related to health and wellness.",
    totalCourses: 7,
    popularity: 3500,
  },
];

const CategoryManager = () => {
  // Khởi tạo state cho danh mục, cấu hình sắp xếp, tìm kiếm và phân trang.
  const [categories, setCategories] = useState(sampleCategories);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Hàm xử lý sắp xếp theo trường "name".
  const handleSortButton = () => {
    setSortConfig((prev) => {
      if (prev.key !== "name") {
        return { key: "name", direction: "ascending" };
      }
      return {
        key: "name",
        direction: prev.direction === "ascending" ? "descending" : "ascending",
      };
    });
    setCurrentPage(1);
  };

  // Sắp xếp danh mục dựa vào cấu hình sắp xếp.
  const sortedCategories = useMemo(() => {
    let sortableCategories = [...categories];
    if (sortConfig.key !== null) {
      sortableCategories.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCategories;
  }, [categories, sortConfig]);

  // Lọc danh mục dựa trên từ khóa tìm kiếm.
  const filteredCategories = useMemo(() => {
    return sortedCategories.filter((category) =>
      Object.values(category).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedCategories, searchTerm]);

  // Hàm reset các bộ lọc.
  const resetFilters = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
  };

  // Xác định chỉ số của phần tử đầu tiên và cuối cùng trên trang hiện tại.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Hàm để hiển thị icon sắp xếp theo hướng hiện tại.
  const renderSortIcon = () => {
    if (sortConfig.key === "name") {
      return sortConfig.direction === "ascending" ? (
        <FaArrowUp className="ms-2" />
      ) : (
        <FaArrowDown className="ms-2" />
      );
    }
    return null;
  };

  return (
    <div className="container mt-4 pb-4">
      <h3>Quản lý Danh mục</h3>
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-md-6">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Tìm kiếm danh mục"
            />
          </InputGroup>
        </div>
        <div className="col-12 col-md-3 mt-2 mt-md-0">
          <Button
            variant="primary"
            onClick={handleSortButton}
            className="w-100"
          >
            Sắp xếp theo tên {renderSortIcon()}
          </Button>
        </div>
        <div className="col-12 col-md-3 mt-2 mt-md-0 text-md-end">
          <Button onClick={resetFilters} variant="primary" className="w-100">
            Reset Filters
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive className="rounded">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Tổng số khóa học</th>
            <th>Độ phổ biến</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((category) => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.totalCourses}</td>
              <td>{category.popularity}</td>
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

export default CategoryManager;
