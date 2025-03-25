import React, { useState, useEffect } from "react";
import { FiEdit2, FiSearch, FiArrowUp, FiArrowDown } from "react-icons/fi";
import {
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Alert,
  InputGroup,
  Form,
  Button,
  Pagination,
  Modal,
} from "react-bootstrap";

import {
  getAllCompletedOrder,
  updateOrderStatus,
} from "../../../APIHandler/OrderManagermentAPIHanlder";

const OrderCompleteManagerment = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "orderId",
    direction: "ascending",
  });
  const itemsPerPage = 6;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchOrders = async (page = currentPage) => {
    setLoading(true);
    try {
      const data = await getAllCompletedOrder(page, itemsPerPage);
      const orderData = data.items || data || [];
      setOrders(orderData);
      setTotalPages(
        data.totalPages || Math.ceil(data.totalCount / itemsPerPage) || 1
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handleSortButton = () => {
    setSortConfig((prev) => ({
      key: "orderId",
      direction: prev.direction === "ascending" ? "descending" : "ascending",
    }));
  };

  const renderSortIcon = () => {
    return sortConfig.direction === "ascending" ? (
      <FiArrowUp style={{ marginLeft: "5px" }} />
    ) : (
      <FiArrowDown style={{ marginLeft: "5px" }} />
    );
  };

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a.orderId - b.orderId;
    }
    return b.orderId - a.orderId;
  });

  // Thêm hàm xử lý cập nhật status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders(currentPage); // Refresh lại danh sách
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order status");
    }
  };

  // Thêm hàm đóng modal
  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  // Thêm hàm xác nhận cập nhật
  const handleConfirmUpdate = async () => {
    if (selectedOrder && newStatus !== "") {
      await handleUpdateStatus(selectedOrder.orderId, parseInt(newStatus));
      handleCloseModal();
    }
  };

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        paddingTop: "5rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        backgroundColor: "#FAFAFB",
      }}
    >
      <Row>
        <Container>
          <Row className="mb-4 align-items-center">
            <Col>
              <h1
                style={{
                  background: "linear-gradient(to right, #ff8153, #ffa98f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "28px",
                  fontWeight: 600,
                  padding: "5px",
                }}
              >
                Order Management
              </h1>
            </Col>
          </Row>

          <Row className="mb-4 align-items-center">
            <Col md={10}>
              <InputGroup>
                <InputGroup.Text
                  style={{
                    background: "linear-gradient(to right, #ff8153, #ffa98f)",
                  }}
                >
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Button
                style={{
                  background: "linear-gradient(to right, #ff8153, #ffa98f)",
                  border: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "6px 12px",
                }}
                onClick={handleSortButton}
              >
                Sort by code {renderSortIcon()}
              </Button>
            </Col>
          </Row>

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : sortedOrders.length === 0 ? (
            <Alert variant="info">No orders found.</Alert>
          ) : (
            <>
              <Table
                responsive
                bordered
                hover
                className="shadow-sm"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Code</th>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>Note</th>
                    <th>Created Date</th>
                    <th>Discount</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "#fff", color: "#333" }}>
                  {sortedOrders.map((order) => (
                    <tr
                      key={order.orderId}
                      style={{ transition: "background-color 0.3s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff5f2")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff")
                      }
                    >
                      <td>{order.orderId}</td>
                      <td>{order.orderCode}</td>
                      <td>{order.account?.userName || "N/A"}</td>
                      <td>{order.phoneNumber}</td>
                      <td>{order.note}</td>
                      <td>
                        {new Date(order.createdDate).toLocaleDateString()}
                      </td>
                      <td>{order.discountMoney} VND</td>
                      <td>{order.priceTotal} VND</td>
                      <td>
                        {order.orderStatus === 3
                          ? "COMPLETED"
                          : order.orderStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                  <Pagination>
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                    />
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    />
                  </Pagination>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </Row>
    </Container>
  );
};

export default OrderCompleteManagerment;
