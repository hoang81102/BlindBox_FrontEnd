import React, { useState, useEffect, useMemo } from "react";
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

const UserManager = () => {
  const initialUsers = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john.doe@example.com",
      dateOfBirth: "1990-05-15",
      totalCourses: 5,
      balance: 499.99,
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      dateOfBirth: "1992-08-22",
      totalCourses: 3,
      balance: 299.99,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: 3,
      fullName: "Michael Johnson",
      email: "michael.j@example.com",
      dateOfBirth: "1988-12-10",
      totalCourses: 7,
      balance: 699.99,
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    {
      id: 4,
      fullName: "David Wilson",
      email: "david.wilson@example.com",
      dateOfBirth: "1985-03-12",
      totalCourses: 6,
      balance: 599.99,
      avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
    },
    {
      id: 5,
      fullName: "Emma Taylor",
      email: "emma.taylor@example.com",
      dateOfBirth: "1993-11-05",
      totalCourses: 2,
      balance: 399.99,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSortButton = () => {
    // Luôn sắp xếp theo cột "fullName"
    setSortConfig((prev) => {
      if (prev.key !== "fullName") {
        return { key: "fullName", direction: "ascending" };
      }
      return {
        key: "fullName",
        direction: prev.direction === "ascending" ? "descending" : "ascending",
      };
    });
    setCurrentPage(1);
  };

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter((user) => {
      return Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [sortedUsers, searchTerm]);

  const resetFilters = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Hàm xác định icon sắp xếp dựa theo hướng hiện tại
  const renderSortIcon = () => {
    if (sortConfig.key === "fullName") {
      return sortConfig.direction === "ascending" ? (
        <FaArrowUp className="ms-2" />
      ) : (
        <FaArrowDown className="ms-2" />
      );
    }
    return null;
  };

  return (
    <div className="container p-4">
      {/* Gộp thanh tìm kiếm, nút sắp xếp và nút reset filter trong 1 hàng */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-md-6">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search users"
            />
          </InputGroup>
        </div>
        <div className="col-12 col-md-3 mt-2 mt-md-0">
          <Button
            variant="primary"
            onClick={handleSortButton}
            className="w-100"
          >
            Sắp xếp {renderSortIcon()}
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
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Total Courses</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <td>
                <Image
                  src={user.avatar}
                  alt={user.fullName}
                  roundedCircle
                  style={{ width: "45px", height: "45px" }}
                  onError={(e) => {
                    e.target.onerror = null;
                  }}
                />
              </td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{format(new Date(user.dateOfBirth), "MMM dd, yyyy")}</td>
              <td>{user.totalCourses}</td>
              <td>${user.balance.toFixed(2)}</td>
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

export default UserManager;
