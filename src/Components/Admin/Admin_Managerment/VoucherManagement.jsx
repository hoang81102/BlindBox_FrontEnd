import React, { useState, useMemo } from "react";
import { Table, Form, Button, Pagination, InputGroup } from "react-bootstrap";
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { format } from "date-fns";

const StatusToggle = ({ isActive, onToggle }) => {
  return (
    <div className="d-flex justify-content-center">
      <Form.Switch checked={isActive} onChange={onToggle} className="mb-0" />
    </div>
  );
};

const VoucherManagement = () => {
  const initialVouchers = [
    {
      id: 1,
      code: "DISCOUNT10",
      name: "10% Off",
      discountType: "%",
      amount: 10,
      quantity: 100,
      startDate: "2024-02-01",
      endDate: "2024-03-01",
      status: "active",
    },
    {
      id: 2,
      code: "SAVE50",
      name: "$50 Off",
      discountType: "$",
      amount: 50,
      quantity: 50,
      startDate: "2024-02-10",
      endDate: "2024-03-10",
      status: "expired",
    },
  ];

  const [vouchers, setVouchers] = useState(initialVouchers);
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

  const toggleStatus = (id) => {
    setVouchers((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, status: v.status === "active" ? "inactive" : "active" }
          : v
      )
    );
  };

  const sortedVouchers = useMemo(() => {
    return [...vouchers].sort((a, b) => {
      if (!sortConfig.key) return 0;
      return sortConfig.direction === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }, [vouchers, sortConfig]);

  const filteredVouchers = useMemo(() => {
    return sortedVouchers.filter((voucher) =>
      Object.values(voucher).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedVouchers, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredVouchers.slice(
    indexOfLastItem - itemsPerPage,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);

  return (
    <div
      className="container px-5 pt-5"
      style={{ marginLeft: "235px", marginTop: "60px" }}
    >
      <h3>Voucher Management</h3>
      <div className="row mb-4 align-items-center pt-3">
        <div className="col-md-6">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm voucher..."
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
      </div>
      <Table striped bordered hover responsive className="rounded">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th style={{ width: "120px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((voucher) => (
            <tr key={voucher.id}>
              <td>{voucher.code}</td>
              <td>{voucher.name}</td>
              <td>
                {voucher.discountType === "%"
                  ? `${voucher.amount}%`
                  : `$${voucher.amount}`}
              </td>
              <td>{voucher.quantity}</td>
              <td>{format(new Date(voucher.startDate), "MMM dd, yyyy")}</td>
              <td>{format(new Date(voucher.endDate), "MMM dd, yyyy")}</td>
              <td style={{ width: "120px" }}>
                <StatusToggle
                  isActive={voucher.status === "active"}
                  onToggle={() => toggleStatus(voucher.id)}
                />
              </td>
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

export default VoucherManagement;
